import YAML from './node_modules/yaml/browser/index.js';
// import Asciidoctor from './node_modules/@asciidoctor/core/dist/node/asciidoctor.js';

// const asciidoctor = Asciidoctor();
// const contentDir = 'src/content/';
const authorDir = 'src/data/authors/';
// let pages = await Deno.readDir(contentDir);
let authors = await Deno.readDir(authorDir);
// let options = { 
//     base_dir: '.', 
//     mkdirs: true,
//     standalone: true, 
//     template_dirs: ['src/templates'], 
//     to_dir: 'gh-pages',
//     attributes: { stylesheet: 'css/jbossorg.css', linkcss: true }
// };

// async function parseAdoc(dir:string, pages:AsyncIterable<Deno.DirEntry>) {
//     for await (const page of pages) {
//         let doc = asciidoctor.loadFile(`${dir}${page.name}`, options);
//         //console.log(doc.getAttributes());
//         //doc.setAttribute('heading', doc.getAttribute('doctitle')); 
//         //console.log(doc.getAttribute('heading'));
//         doc.write(doc.convert(), `gh-pages/blogs/${page}.html`);
        
//         // let decoder = new TextDecoder('utf-8');
//         // let data = await Deno.readFile(`${dir}${page.name}`);
//         //console.log(decoder.decode(data));
//         //let doc = asciidoctor.loadFile()decoder.decode(data));
//         //console.log(doc.convert())
//     }
// }

async function parseYAML(dir:string, authors:AsyncIterable<Deno.DirEntry>) {
    for await (const author of authors) {
        console.log(`${dir}${author.name}`);
        let decoder = new TextDecoder('utf-8');
        let encoder = new TextEncoder();
        let data = await Deno.readFile(`${dir}${author.name}`);
        //console.log(decoder.decode(data));
        let doc = YAML.parseDocument(decoder.decode(data), {schema: 'core'});
        console.log(doc.convert());
        //Deno.writeFile(`gh-pages/data/authors/${author.name.replace('yaml','json')}`, encoder.encode(JSON.stringify(doc.toJSON())));
    }
}

// parseAdoc(contentDir, pages);
parseYAML(authorDir, authors);