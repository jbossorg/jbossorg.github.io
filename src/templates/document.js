module.exports = ({node}) => `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; base-uri 'self'; form-action 'self'; 
    script-src https://www.stage.jboss.org/ https://www.jboss.org/ https://www.redhat.com/ https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com 
    https://assets.adobedtm.com https://img.en25.com https://ds-aksb-a.akamaihd.net/ https://s1795.t.eloqua.com https://consent.trustarc.com/ 
    https://kit.fontawesome.com/ https://sjs.bizographics.com
    https://kit-free.fontawesome.com/ https://cdnjs.cloudflare.com https://static.redhat.com https://static.hotjar.com https://in.ml314.com 'unsafe-inline' 'unsafe-eval'; 
    style-src https: 'unsafe-inline'; 
    img-src 'self' https://developers.redhat.com https://consent.trustarc.com https://smetrics.jboss.org 
    https://s1795.t.eloqua.com https://cm.everesttech.net https://ds-aksb-a.akamaihd.net; 
    frame-src https://redhat.demdex.net/;
    connect-src https://dpm.demdex.net https://redhat.tt.omtrdc.net https://dcp2.jboss.org;
    font-src https://fonts.googleapis.com/ https://fonts.gstatic.com/ https://consent.trustarc.com">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="/img/favicon.ico">
    <title>${node.getAttribute('doctitle')} - JBoss.org</title>
    <script type="text/javascript">
    dataLayer = [{'channel' : 'developer'}];
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NJWS5L');
    </script>
    <script id="dpal" src="https://www.redhat.com/ma/dpal.js"></script>
    <script src="https://kit.fontawesome.com/f7383166fb.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.4.3/custom-elements-es5-adapter.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.4.3/webcomponents-bundle.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;500;600&family=Montserrat&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/css/jbossorg.css">
</head>
<body class="${node.getAttribute('short-name')}">
  <noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-NJWS5L" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <header>
      <a class="site-home ${node.getAttribute('docname') !== 'index' ? '' : 'active'}" href="/">JBoss<strong>.ORG</strong></a>
      <nav>
          <a ${node.getAttribute('docname') !== 'blogs' ? '' : 'class="active"'} href="/blogs.html">Blogs</a>
          <!--<a ${node.getAttribute('docname') !== 'twitter' ? '' : 'class="active"'} href="/tweets.html">Twitter</a>-->
          <a href="https://redhatofficial.github.io/">Projects <span class="icon"><i class="fas fa-external-link-alt fa-xs"></i></span></a>
      </nav>
  </header>
  ${ node.getAttribute('docname').indexOf('index') >= 0 ? `
      <div class="rhd-banner">
        <h2>Stay in touch with Red Hat Developer</h2>
        <div class="three-cols">
        <p>Red Hat uses the best and most effective ideas from the community projects to build 
        enterprise products. These products remain open and are being used all around the world 
        by corporations, governments, and non-profit organizations.</p>
        <a href="https://developers.redhat.com/middleware/?referrer=jbd">Learn more at developers.redhat.com</a>
        <a href="https://twitter.com/rhdevelopers"><i class="fab fa-twitter"></i> @rhdevelopers</a>
        </div>
      </div>` : ''}
  <main id="main-content">
      <article class="" data-tags="${node.getAttribute('tags') ? node.getAttribute('tags') : ''}">
      ${ node.getAttribute('docname').indexOf('index') >= 0 ? `
        <div class="convo"><h2>${node.getAttribute('doctitle')}</h2></div>
        <div class="author">
            <pfe-avatar pfe-shape="circle" pfe-pattern="squares" ${node.getAttribute('author') ? `pfe-src="/img/people/${node.getAttribute('author').toLowerCase().replace(' ','-')}.png"` : ''}></pfe-avatar>
            ${node.getAttribute('author') ? `<span>${node.getAttribute('author')}</span>` : ''}
        </div>`: `<h1>${node.getAttribute('doctitle')}</h1>` }
      ${node.getContent()}
      ${ node.getAttribute('short-name') ? '':`
      <div class="author">
        <pfe-avatar pfe-shape="circle" pfe-pattern="squares" ${node.getAttribute('author') ? `pfe-src="/img/people/${node.getAttribute('author').toLowerCase().replace(' ','-')}.png"` : ''}></pfe-avatar>
        ${node.getAttribute('author') ? `<span>${node.getAttribute('author')}</span>` : ''}
    `}
      </article>
  </main>
  <footer>
    ${ node.getAttribute('docname').indexOf('index') >= 0 ? `` : ''}
  </footer>
  <script type="module" src="/js/cpx-search/cpx-results.js"></script>
  <script type="module" src="/js/cpx-search/cpx-query.js"></script>
  <script type="module" src="/js/cpx-search/cpx-search-box.js"></script>
  <script type="module" src="/js/pfe-avatar/dist/pfe-avatar.js"></script>
  <script type="module" src="/js/pfe-datetime/dist/pfe-datetime.js"></script>
  <script type="module" src="/js/cpx-footer.js"></script>
  <script src="/js/jbossorg.js"></script>
</body>
</html>
`;
