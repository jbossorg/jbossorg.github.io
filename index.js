const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const util = require('util');
const YAML = require('yaml');
const copyPromise = util.promisify(fsExtra.copy);
const asciidoctor = require('asciidoctor')();
const pageDir = 'src/content/pages/';
const pageOutDir = 'docs/';
const contentDir = 'src/content/posts/';
const contentOutDir = 'docs/posts/';
const peopleDir = 'src/data/people/';
const peopleOutDir = 'docs/data/people/';
let posts = fs.readdirSync(contentDir)
            .map(v => ({ name:v, time:fs.statSync(contentDir + v).mtime.getTime()}))
            .sort((a, b) => (a.time - b.time))
            .map(v => v.name);

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
    doc.write(doc.convert(), `${contentOutDir}${post.replace('adoc','html')}`);
});

// let idx = asciidoctor.loadFile('src/content/index.adoc', options);
// idx.setAttribute('short-name', 'this-week');
// idx.write(idx.convert(), 'gh-pages/index.html');

fs.readdir(pageDir, (err, files) => {
    if (err) console.log(err);
    files.map( (file) => {
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

copyDirs('src', 'docs', ['css','img']).then(() => {
    console.log('Copied CSS and Images');
}).catch(err => {
    console.log(err);
});

copyDirs('node_modules/@patternfly', 'docs/js').then(() => {
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