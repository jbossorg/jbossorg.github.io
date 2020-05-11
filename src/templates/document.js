module.exports = ({node}) => `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${node.getAttribute('doctitle')} - JBoss.org</title>
    <script src="https://kit.fontawesome.com/f7383166fb.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.4.3/custom-elements-es5-adapter.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.4.3/webcomponents-bundle.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;500;600&family=Montserrat&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/css/jbossorg.css">
</head>
<body class="${node.getAttribute('short-name')}">

  <header>
      <a class="site-home ${node.getAttribute('docname') !== 'index' ? '' : 'active'}" href="/">JBoss<strong>.ORG</strong></a>
      <nav>
          <a ${node.getAttribute('docname') !== 'blogs' ? '' : 'class="active"'} href="blogs.html">Blogs</a>
          <a ${node.getAttribute('docname') !== 'twitter' ? '' : 'class="active"'} href="twitter.html">Twitter</a>
          <a href="https://redhatofficial.github.io/">Projects <span class="icon"><i class="fas fa-external-link-alt fa-xs"></i></span></a>
      </nav>
  </header>
  <main id="main-content">
      <article class="" data-tags="${node.getAttribute('tags') ? node.getAttribute('tags') : ''}">
      ${ node.getAttribute('docname').indexOf('index') >= 0 ? `
        <div class="convo"><h2>${node.getAttribute('doctitle')}</h2></div>
        <div class="author">
            <pfe-avatar pfe-shape="circle" pfe-pattern="squares" ${node.getAttribute('author') ? `pfe-src="/img/people/${node.getAttribute('author').toLowerCase().replace(' ','-')}.png"` : ''}></pfe-avatar>
            ${node.getAttribute('author') ? `<span>${node.getAttribute('author')}</span>` : ''}
        </div>`: `<h1>${node.getAttribute('doctitle')}</h1>` }
      ${node.getContent()}
      </article>
  </main>
  <footer>
    ${ node.getAttribute('docname').indexOf('index') >= 0 ? `` : ''}
    <div class="redhat-footer">
        <span class="licence">
          <i class="fab fa-creative-commons"></i><i class="fab fa-creative-commons-by"></i> <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank">CC by 3.0</a> | <a href="https://www.redhat.com/en/about/privacy-policy">Privacy Policy</a>
        </span>
        <span class="redhat">
          Sponsored by
        </span>
        <span class="redhat-logo">
          <a href="https://www.redhat.com/" target="_blank"><img src="/img/redhat_reversed.svg"></a>
        </span>
    </div>
  </footer>
  <script type="module" src="/js/cpx-search/cpx-query.js"></script>
  <script type="module" src="/js/cpx-search/cpx-results.js"></script>
  <script type="module" src="/js/pfe-avatar/dist/pfe-avatar.js"></script>
  <script type="module" src="/js/pfe-datetime/dist/pfe-datetime.js"></script>
  <script src="/js/jbossorg.js"></script>
</body>
</html>
`;
