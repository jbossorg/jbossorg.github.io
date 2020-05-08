const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const util = require('util');
const copyPromise = util.promisify(fsExtra.copy);
const asciidoctor = require('asciidoctor')();
const jbosstmpl = require('./src/jbosstmpl');
const pages = ['index','twitter','blogs']

function copyDirs(srcDir, destDir, fileDirs) {
    return Promise.all(fileDirs.map(f => {
        return copyPromise(path.join(srcDir, f), path.join(destDir, f));
    }));
}

asciidoctor.ConverterFactory.register(new jbosstmpl(), ['html5']);
let options = { 
    base_dir: '.', 
    mkdirs: true,
    standalone: true, 
    template_dirs: ['src'], 
    to_dir: 'gh-pages',
    attributes: { stylesheet: 'theme/css/jboss.css', linkcss: true, title: '' }
};

pages.forEach((page) => {
    let doc = asciidoctor.loadFile(`content/${page}.adoc`, options);
    //console.log(doc.getAttributes());
    doc.setAttribute('heading', doc.getAttribute('doctitle')); 
    //console.log(doc.getAttribute('heading'));
    doc.write(doc.convert(), `gh-pages/${page}.html`);
}) 

// fs.mkdir('gh-pages/css', {recursive: true}, (err) => { if (err) throw err; });
// fs.mkdir('gh-pages/js', {recursive: true}, (err) => { if (err) throw err; });
copyDirs('src', 'gh-pages', ['css']).then(() => {
    console.log('done');
}).catch(err => {
    console.log(err);
});
