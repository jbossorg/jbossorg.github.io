const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const util = require('util');
const YAML = require('yaml');
const { JSDOM } = require('jsdom');
const copyPromise = util.promisify(fsExtra.copy);
const asciidoctor = require('asciidoctor')();
const Feed = require('feed').Feed;
const {htmlToText} = require('html-to-text');
const dateFormat = require('dateformat');
const pageDir = 'src/content/pages/';
const pageOutDir = 'gh-pages/';
const contentDir = 'src/content/posts/';
const contentAggregatorDir = 'src/content/posts-aggregator/';
const contentOutDir = 'gh-pages/posts/';
const peopleDir = 'src/data/people/';
const peopleOutDir = 'gh-pages/data/people/';
let posts = fs.readdirSync(contentDir)
            .map(v => ({ name:v, time:fs.statSync(contentDir + v).mtime.getTime()}))
            .sort((a, b) => (b.name.replace(/[a-zA-Z]|-?-/g,'') - a.name.replace(/[a-zA-Z]|-?-/g,'')))
            .map(v => v.name);
let postsAggregator = fs.readdirSync(contentAggregatorDir);

let options = {
    base_dir: './src/content',
    mkdirs: true,
    standalone: true,
    safe: 'unsafe',
    template_dirs: ['src/templates'],
    to_dir: contentOutDir,
    attributes: { stylesheet: '/css/jbossorg.css', linkcss: true }
};

fs.mkdir(contentOutDir, {recursive: true}, err => { if (err) throw err; });
fs.mkdirSync(peopleOutDir, {recursive: true});
// fs.mkdir('gh-pages/css', {recursive: true}, (err) => { if (err) throw err; });
// fs.mkdir('gh-pages/js', {recursive: true}, (err) => { if (err) throw err; });

let feedItems = [];

posts.forEach((post) => {
    let doc = asciidoctor.loadFile(`${contentDir}${post}`, options);
    let content = doc.convert();
    let dom = new JSDOM(content);
    //console.log(doc.getAttribute('tags').split(',').map(tag => { return {name:tag.trim(), term: tag.trim()}; }));
    //console.log(doc.getAttributes());
    let item = {
        title: doc.getAttribute('doctitle'),
        id: `https://www.jboss.org/posts/${doc.getAttribute('docname')}.html`,
        link: `https://www.jboss.org/posts/${doc.getAttribute('docname')}.html`,
        description: '',
        author: [
            {
                name: doc.getAttribute('author'),
                email: 'do-not-reply@jboss.com',
                link: `https://www.jboss.org/people/${doc.getAttribute('author').toLowerCase().replace(' ','-')}`
            }
        ],
        date: new Date(doc.getAttribute('docname').replace(/[a-zA-Z]+-?-/g,'')),
        image: doc.getAttribute('image'),
        content: dom.window.document.querySelector('main').innerHTML,
        category: doc.getAttribute('tags').split(',').map(tag => { return {name:tag.trim(), term: tag.trim()}; })
    };
    feedItems.push(item);
    doc.write(doc.convert(), `${contentOutDir}${post.replace('adoc','html')}`);
});

postsAggregator.forEach(filename => {
    let json = fs.readFileSync(contentAggregatorDir + filename);
    let item = JSON.parse(json);
    item.date = new Date(item.date);
    feedItems.push(item);
});

feedItems = sortPosts(feedItems, 'date', 'title');

const feed = new Feed({
    title: 'JBoss Blogs',
    description: 'aggregation of various JBoss blogs',
    id: 'https://www.jboss.org/blogs.html',
    link: 'https://www.jboss.org/blogs.html',
    favicon: 'https://www.jboss.org/img/favicon.ico',
    updated: feedItems[0].date
});

feedItems.forEach(function(item) {
    feed.addItem(item);
})

fs.writeFile('gh-pages/atom.xml', feed.atom1(), () => {}); //console.log(feed.atom1());

fs.readdir(pageDir, (err, files) => {
    if (err) console.log(err);
    files.map( (file) => {
        let fileContent = fs.readFileSync(`${pageDir}${file}`, 'utf8');
        let docname = file.replace('.adoc', '');
        if(docname === 'index') {
            //include::posts/weekly20200501.adoc[]
            fileContent = fileContent.replace(/^include.*$/m,`include::posts/${posts[0]}[]`);

            let blogsAdoc = '';
            for (let i = 0; i < 10; i++) {
                let item = feedItems[i];
                blogsAdoc+="\n\n=== " + dateFormat(item.date, "d mmmm yyyy") + " | " + getCommunityAuthor(item)
                    + "\n\nlink:++" + item.link + "++[" + item.title+ "]";
            }
            blogsAdoc += '\n\n+++<p class="end-of-results">- End of Results -</p>+++';
            fileContent = fileContent.replace("GENERATEDBLOGS",blogsAdoc);
        } else if(docname === 'blogs') {
            let blogsAdoc = '';
            for (let i = 0; i < 20; i++) {
                let item = feedItems[i];
                let author = getCommunityAuthor(item);
                let authorImg = getPostAuthorImgUrl(item);
                blogsAdoc += "=== link:++" + item.link + "++[" + item.title+ "]"
                    + "\n++++"
                    + "\n<p class='byline'>" + dateFormat(item.date, "d mmmm yyyy") + "</p>"
                    + "\n<div class=\"author\">\n" +
                    "        <pfe-avatar pfe-shape=\"circle\" pfe-pattern=\"squares\" pfe-name=\"" + author + "\" " + (authorImg === "" ? "": "pfe-src=\"" + authorImg + "\"") + " class=\"PFElement\" pfelement=\"\"></pfe-avatar>\n" +
                    "        <span>By " + author + "</span>\n" +
                    "    </div>"
                    + "\n++++"
                    + "\n\n" + getContentPreview(item.content)
                    + "\n\n'''\n\n";
            }
            blogsAdoc += '\n\n+++<p class="end-of-results">- End of Results -</p>+++';
            fileContent = fileContent.replace("GENERATEDBLOGS",blogsAdoc);
        }

        let doc = asciidoctor.load(fileContent, options);
        doc.setAttribute('docname',docname);
        doc.setAttribute('short-name', file.indexOf('index.adoc') < 0 ? `${docname}-page` : 'this-week');
        doc.write(doc.convert(), `${pageOutDir}${file.replace('adoc','html')}`);
    })
});
function getCommunityAuthor(post) {
    let author = post.author[0].name;
    if (author == null || author === '' || author.toUpperCase() === "UNKNOWN") {
        author = post.feed_title;
    }
    return author;
}
function getPostAuthorImgUrl(post) {
    if (post.link.indexOf('//www.jboss.org/posts/') > 0) {
        return "/img/people/" + post.author[0].name.toLowerCase().replace(' ','-') + ".png";
    }
    let avatar = post.author[0].avatar;
    if (avatar != null) {
        return avatar
    } else if (post.feed_avatar != null) {
        return post.feed_avatar;
    }
    return '/img/people/default_usericon.png';
}

function getContentPreview(html) {
    const max = 250;
    let str = htmlToText(html, {
        tags: {
            'a': {format: 'skip'},
            'p': {options: {leadingLineBreaks: 0, trailingLineBreaks: 0}},
            'pre': {options: {leadingLineBreaks: 0, trailingLineBreaks: 0}},
            'img': {format: 'skip'}
        }
    });

    str = str.split('\n').join(' ');

    if (str.length > max) {
        str = str.substr(0, max-1) + '&hellip;';
    }

    return str;
}

fs.readdir(peopleDir, (err,files) => {
    if (err) console.log(err);
    files.map( (file) => {
        let f = fs.readFileSync(`${peopleDir}${file}`, 'utf8');
        let doc = YAML.parseDocument(f, {schema:'core'});
        fs.writeFileSync(`${peopleOutDir}${file.replace('yaml','json')}`, JSON.stringify(doc.toJSON()));
    });
});

copyDirs('src', 'gh-pages', ['css','img']).then(() => {
    console.log('Copied CSS and Images');
}).catch(err => {
    console.log(err);
});

copyDirs('node_modules/@patternfly', 'gh-pages/js').then(() => {
    console.log('Copied Patternfly and JS');
}).catch(err => {
    console.log(err);
});

function copyDirs(srcDir, destDir, fileDirs) {
    if (typeof fileDirs !== 'undefined') {
        return Promise.all(fileDirs.map(f => {
            return copyPromise(path.join(srcDir, f), path.join(destDir, f));
        }));
    } else {
        return copyPromise(srcDir, destDir);
    }
}

function sortPosts(array, attr1, attr2) {
    return array.sort((a, b) => {
        const x = a[attr1];
        const y = b[attr1];

        let compare = x < y ? 1 : (x > y ? -1 : 0);
        if (compare === 0) {
            const x2 = b[attr2];
            const y2 = a[attr2];
            compare = x2 < y2 ? 1 : (x2 > y2 ? -1 : 0);
        }
        return compare;
    });
}