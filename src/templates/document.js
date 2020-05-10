module.exports = ({node}) => `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${node.getAttribute('heading')} - JBoss.org</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.4.3/custom-elements-es5-adapter.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.4.3/webcomponents-bundle.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;500;600&family=Montserrat&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/jbossorg.css">
</head>
<body class="${node.getAttribute('short-name')}">
  <header>
      <a class="site-home ${node.getAttribute('docname') !== 'index' ? '' : 'active'}" href="/">JBoss<strong>.ORG</strong></a>
      <nav>
          <a ${node.getAttribute('docname') !== 'blogs' ? '' : 'class="active"'} href="blogs.html">Blogs</a>
          <a ${node.getAttribute('docname') !== 'twitter' ? '' : 'class="active"'} href="twitter.html">Twitter</a>
          <a href="#">Projects</a>
      </nav>
  </header>
  <main id="main-content">
      <article class="">
      ${ node.getAttribute('docname').indexOf('index') < 0 ? `<h1>${node.getAttribute('heading')}</h1>` : '' }
      ${node.getContent()}
      </article>
      ${ node.getAttribute('docname').indexOf('index') < 0 ? '' : `
      <article class="twitter-feed">
      <div class="preamble">
        <h2>Latest Upstream Posts</h2>
      </div>
      <cpx-results>
        <template>
        <div>
            <p>
                <pfe-datetime datetime="{{created}}" type="local" day="numeric" month="long" year="numeric">{{created}}</pfe-datetime>
                <span>| {{author}}</span>
            </p>
            <h4><a href="{{url}}">{{title}}</a></h4>
        </div>
        </template>
      </cpx-results>
      <cpx-query auto url="https://dcp2.jboss.org/v2/rest/search/middlewareblogs"></cpx-query>
      `}
  </main>
  <script type="module" src="js/cpx-search/cpx-query.js"></script>
  <script type="module" src="js/cpx-search/cpx-results.js"></script>
  <script type="module" src="js/pfe-avatar/dist/pfe-avatar.js"></script>
  <script type="module" src="js/pfe-datetime/dist/pfe-datetime.js"></script>
  <script src="js/jbossorg.js"></script>
</body>
</html>
`;
