var Cof_sic = Cof_sic || {};

Cof_sic.iOSAppID = {
  CA: '808215470',
  USA: '407558537',
};

Cof_sic.kochavaSmartLink = {
  CA: '5ceea3249c15c',
  USA: '5d51ac4b497a7',
};

Cof_sic.createKochavaImg = function(servicingCountry) {
  const kochavaImg = new Image(1, 1);
  kochavaImg.src =
    'https://smart.link/' + Cof_sic.kochavaSmartLink[servicingCountry];
  kochavaImg.style = 'position: absolute;';
  kochavaImg.alt = '';
  document.getElementsByTagName('body')[0].appendChild(kochavaImg);
};

Cof_sic.createIOSMetaTag = function(servicingCountry) {
  const smartBanner = document.createElement('meta');
  smartBanner.name = 'apple-itunes-app';
  smartBanner.content = 'app-id=' + Cof_sic.iOSAppID[servicingCountry];
  smartBanner.alt = '';
  document.getElementsByTagName('head')[0].appendChild(smartBanner);
};

Cof_sic.createManifestLink = function() {
  const manifest = document.createElement('link');
  manifest.rel = 'manifest';
  manifest.href = 'assets/json/web-app-manifest.json';
  manifest.crossOrigin = 'use-credentials';
  document.getElementsByTagName('head')[0].appendChild(manifest);
};

Cof_sic.createSmartBanner = function() {
  let countryCode = decodeURIComponent(document.cookie).replace(
    /(?:(?:^|.*;\s*)ISSO_CNTRY_CODE\s*\=\s*([^;]*).*$)|^.*$/,
    '$1',
  );

  // check that language is set and the app is not in a mobile webview
  if (
    countryCode === 'USA' &&
    /Android|iPhone|iPod|iPad/i.test(navigator.userAgent)
  ) {
    Cof_sic.createIOSMetaTag(countryCode);
    Cof_sic.createManifestLink();
    Cof_sic.createKochavaImg(countryCode);
  }
};

Cof_sic.createSmartBanner();
