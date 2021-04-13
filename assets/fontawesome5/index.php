<!doctype html>
<html>

<head>
    <meta name="ac:base" content="/schoolmug">
    <base href="/schoolmug/banners/">
    <script src="../dmxAppConnect/dmxAppConnect.js"></script>
    <meta charset="UTF-8">
    <title>OOPS!</title>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="../bootstrap/4/css/bootstrap.min.css" />
    <link rel="stylesheet" href="../fontawesome5/css/all.min.css" />
    <link rel="stylesheet" href="../assets/mdb/css/mdb.min.css" />
    <link rel="stylesheet" href="../assets/css/single_page.css" />

    <script src="../dmxAppConnect/dmxBrowser/dmxBrowser.js" defer=""></script>
    <link rel="stylesheet" href="../dmxAppConnect/dmxNotifications/dmxNotifications.css" />
    <script src="../dmxAppConnect/dmxNotifications/dmxNotifications.js" defer=""></script>
    <script src="../dmxAppConnect/dmxScheduler/dmxScheduler.js" defer=""></script>
</head>
<style>
    body {
        font-family: 'M PLUS Rounded 1c', sans-serif;
        height: 100%;
        background-image: url('../assets/images/mug_background.png') !important;
    }
</style>

<body is="dmx-app" id="index">
    <dmx-notifications id="notifies1"></dmx-notifications>
   
    <div is="dmx-browser" id="browser1"></div>
    <div class="container form-content-container z-depth-1" style="background-color:#fff !important;">
        <div class="form-content">
            <div class="container wappler-block pt-5 pb-5">
                <div class="row">
                    <div class="text-center col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                        <div class="d-block p-4 bg-light">
                            <h4>Oops! ERROR<br><small class="text-muted">NOT AUTHORIZED</small></h4>
                            <p>You are not Authorized to Visit this Page.</p>
                            <button dmx-on:click="browser1.goto(browser1.referrer)" class="btn btn-primary"><i class="fa fa-chevron-left"></i>&nbsp;Go Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <script src="../bootstrap/4/js/popper.min.js"></script>
    <script src="../bootstrap/4/js/bootstrap.min.js"></script>
</body>

</html>