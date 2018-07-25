<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#" itemscope itemtype="http://schema.org/Thing" lang="es-MX" class="no-js">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/> -->

    <title>Goplek Boilerplate</title>
    <meta name="description" content="page-description">
    <meta name="keywords" content="page-keywords">
    <meta name="author" content="Goplek">
    <!--<meta name="robots" content="INDEX, FOLLOW, ARCHIVE">-->
    <meta name="robots" content="NOINDEX, NOFOLLOW, NOARCHIVE">

    <!-- Href lang -->
    <link rel="alternate" hreflang="es" href="page-url" />

    <!-- Favicons -->
    <link rel="icon" href="favicons/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" sizes="72x72" href="favicons/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="favicons/apple-touch-icon-114x114.png">

    <!-- Schema properties -->
    <meta itemprop="name" content="page-title">
    <meta itemprop="description" content="page-description">
    <meta itemprop="url" content="page-url">
    <meta itemprop="image" content="image-url">

    <!-- Open Graph properties -->
    <meta property="fb:app_id" content="app-id">
    <meta property="og:site_name" content="name">
    <meta property="og:title" content="page-title">
    <meta property="og:description" content="page-description">
    <meta property="og:url" content="page-url">
    <meta property="og:image" content="image-url">
    <meta property="og:type" content="website">

    <!-- Twitter integration -->
    <meta name="twitter:title" content="page-title">
    <meta name="twitter:url" content="page-url">
    <meta name="twitter:image" content="image-url">
    <meta name="twitter:card" content="summary">

    <!-- Sets whether a web application runs in full-screen mode. -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">

    <!-- Chrome, Firefox OS and Opera -->
    <meta name="theme-color" content="#f1f1f1">
    <!-- Windows Phone -->
    <meta name="msapplication-navbutton-color" content="#f1f1f1">
    <!-- iOS Safari -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <!-- <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"> -->

    <!-- Disable automatic detection of possible phone numbers in a webpage in Safari on iOS. -->
    <meta name="format-detection" content="telephone=no">

    <!-- Bootstrap Styles -->
    <!-- <link href="design/css/vendor/bootstrap.css" rel="stylesheet"> -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.5.0-rc.2/dist/css/foundation.min.css" integrity="sha256-iJQ8dZac/jUYHxiEnZJsyVpKcdq2sQvdA7t02QFmp30= sha384-SplqNBo/0ZlvSdwrP/riIPDozO5ck8+yIm++KVqyMAC53S6m3BaV+2OLpi7ULOOh sha512-ho6hK4sAWdCeqopNZWNy1d9Ok2hzfTLQLcGSr8ZlRzDzh6tNHkVoqSl6wgLsqls3yazwiG9H9dBCtSfPuiLRCQ==" crossorigin="anonymous">
    <link href='https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css' rel='stylesheet' type='text/css'>
    <!-- Page Styles (dev) -->
    <link href="fragment/themes/foundation/design/css/styles.css" rel="stylesheet">
    <!-- Page Styles (production) -->
<!--    <link href="design/css/styles.css" rel="stylesheet"> -->

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Google Analytics -->
    <!-- <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-XXXXX-X', 'auto');
        ga('send', 'pageview');
    </script> -->
</head>
<body>

<!-- Navigation -->
<?php include_once 'partials/navigation.php'?>
<!-- /Navigation -->

<article class="grid-container main-container">
    <h2>XY Grid Gutter Example</h2>
    <p>Cells have background red, content inside has background blue. </p>
    <h4>Margin Gutters</h4>
    <div class="grid-x grid-margin-x">
        <div class="medium-6 large-4 cell"><div class="demo">12/6/4 cells</div></div>
        <div class="medium-6 large-8 cell"><div class="demo">12/6/8 cells</div></div>
    </div>
    <h4>Padding Gutters</h4>
    <div class="grid-x grid-padding-x">
        <div class="medium-6 large-4 cell"><div class="demo">12/6/4 cells</div></div>
        <div class="medium-6 large-8 cell"><div class="demo">12/6/8 cells</div></div>
    </div>
</article>

<footer>
    <div class="grid-x">
        <div class="medium-6 cell">
            <ul class="menu align-center">
                <li><a href="#">Legal</a></li>
                <li><a href="#">Partner</a></li>
                <li><a href="#">Explore</a></li>
            </ul>
        </div>

        <div class="medium-6 cell">
            <ul class="menu align-center">
                <li class="menu-text">Copyright 2018</li>
            </ul>
        </div>
    </div>
</footer>



<!-- Include jQuery -->
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="https://dhbhdrzi4tiry.cloudfront.net/cdn/sites/foundation.js"></script>
<!-- Contact Script (dev) -->


<!--<script src="design/js/pl-contact-form.js"></script>-->
<!-- Page Scripts (dev) -->
<!--<script src="design/js/scripts.js"></script>-->
<!-- Page Scripts (production) -->
<!-- <script src="design/js/scripts.min.js"></script> -->
</body>
</html>