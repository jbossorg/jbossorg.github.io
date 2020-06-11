const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const util = require('util');
const YAML = require('yaml');
const { JSDOM } = require('jsdom');
const copyPromise = util.promisify(fsExtra.copy);
const asciidoctor = require('asciidoctor')();
const Feed = require('feed').Feed;
const pageDir = 'src/content/pages/';
const pageOutDir = 'gh-pages/';
const contentDir = 'src/content/posts/';
const contentOutDir = 'gh-pages/posts/';
const peopleDir = 'src/data/people/';
const peopleOutDir = 'gh-pages/data/people/';
let posts = fs.readdirSync(contentDir)
            .map(v => ({ name:v, time:fs.statSync(contentDir + v).mtime.getTime()}))
            .sort((a, b) => (b.name.replace(/[a-zA-Z]|-?-/g,'') - a.name.replace(/[a-zA-Z]|-?-/g,'')))
            .map(v => v.name);
const feed = new Feed({
    title: 'Weekly Editorial',
    description: 'JBoss.org Weekly Editorial',
    id: 'https://www.jboss.org/posts',
    link: 'https://www.jboss.org/posts',
    favicon: 'https://www.jboss.org/img/favicon.ico',
});

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

posts.forEach((post) => {
    let doc = asciidoctor.loadFile(`${contentDir}${post}`, options);
    let content = doc.convert();
    let dom = new JSDOM(content);
    //console.log(doc.getAttribute('tags').split(',').map(tag => { return {name:tag.trim(), term: tag.trim()}; }));
    //console.log(doc.getAttributes());
    let item = {
        title: doc.getAttribute('doctitle'),
        id: `https://www.jboss.org/posts/${doc.getAttribute('docname')}.html`,
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
    
    feed.addItem(item);
    doc.write(doc.convert(), `${contentOutDir}${post.replace('adoc','html')}`);
});

fs.writeFile('gh-pages/atom.xml', feed.atom1(), () => {}); //console.log(feed.atom1());

fs.readdir(pageDir, (err, files) => {
    if (err) console.log(err);
    files.map( (file) => {
        if(file.indexOf('index') >= 0) {
            let f = fs.readFileSync(`${pageDir}${file}`, 'utf8');
            fs.writeFileSync(`${pageDir}${file}`, f.replace(/^include.*$/m,`include::posts/${posts[0]}[]`))
        }
        //include::posts/weekly20200501.adoc[]
        let doc = asciidoctor.loadFile(`${pageDir}${file}`, options);
        doc.setAttribute('short-name', doc.getAttribute('docname').indexOf('index') < 0 ? `${doc.getAttribute('docname')}-page` : 'this-week');
        doc.write(doc.convert(), `${pageOutDir}${file.replace('adoc','html')}`);
    })
})

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