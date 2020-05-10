const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const util = require('util');
const YAML = require('yaml');
const copyPromise = util.promisify(fsExtra.copy);
const asciidoctor = require('asciidoctor')();
//const jbosstmpl = require('./src/jbosstmpl');
const pages = ['index','twitter','blogs']

function copyDirs(srcDir, destDir, fileDirs) {
    if (typeof fileDirs !== 'undefined') {
        return Promise.all(fileDirs.map(f => {
            return copyPromise(path.join(srcDir, f), path.join(destDir, f));
        }));
    } else {
        return copyPromise(srcDir, destDir);
    }
}

let options = { 
    base_dir: '.', 
    mkdirs: true,
    standalone: true, 
    template_dirs: ['src/templates'], 
    to_dir: 'gh-pages',
    attributes: { stylesheet: 'css/jbossorg.css', linkcss: true }
};

pages.forEach((page) => {
    let doc = asciidoctor.loadFile(`src/content/${page}.adoc`, options);
    //console.log(doc.getAttributes());
    doc.setAttribute('heading', doc.getAttribute('doctitle')); 
    //console.log(doc.getAttribute('heading'));
    doc.write(doc.convert(), `gh-pages/${page}.html`);
});

fs.readdir('src/data/authors', (err,files) => {
    if (err) console.log(err);
    files.map( (file) => {
        let f = fs.readFileSync(`src/data/authors/${file}`, 'utf8');
        let doc = YAML.parseDocument(f, {schema:'core'});
        //console.log(JSON.stringify(doc.toJSON()));
        fs.mkdirSync('gh-pages/data/authors', {recursive: true});
        fs.writeFileSync(`gh-pages/data/authors/${file.split('.')[0]}.json`, JSON.stringify(doc.toJSON()));
    });
});

// fs.mkdir('gh-pages/css', {recursive: true}, (err) => { if (err) throw err; });
// fs.mkdir('gh-pages/js', {recursive: true}, (err) => { if (err) throw err; });
copyDirs('src', 'gh-pages', ['css','img']).then(() => {
    console.log('done');
}).catch(err => {
    console.log(err);
});

copyDirs('node_modules/@patternfly', 'gh-pages/js').then(() => {
    console.log('done');
}).catch(err => {
    console.log(err);
});
