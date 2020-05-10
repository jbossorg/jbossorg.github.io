module.exports = ({node}) => `
    ${ node.document.getAttribute('docname') && node.document.getAttribute('docname').indexOf('index') < 0 ? '' : `<div class="preamble"><h2>${node.document.getAttribute('heading')}</h2>`}
    ${ node.document.getAttribute('docname') && node.document.getAttribute('docname').indexOf('index') < 0 ? '' : '</div>'}
    ${ node.document.getAttribute('docname') && node.document.getAttribute('docname').indexOf('index') < 0 ? '' : `
    <div class="author ">
        <pfe-avatar pfe-shape="circle" pfe-pattern="squares" pfe-name="Apple Cinnamon"></pfe-avatar>
        ${node.document.getAttribute('author') ? `<span>${node.document.getAttribute('author')}</span>` : ''}
    </div>`}
    ${node.getContent()}`;