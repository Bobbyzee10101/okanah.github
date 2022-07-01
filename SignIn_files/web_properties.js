var Cof_sic = Cof_sic || {};
(function() {
  Cof_sic.webProperties = function() {
    var web = {};
    //web.deviceFingerPrint = encode_deviceprint();
    //web.browserFingerPrint = count_devicefingerprint();
    //alert(typeof collectLocalDFP);
    //alert(typeof collectDFP);
    if (typeof collectDFP === 'function') {
      web.deviceFingerPrint = collectDFP();
    } else {
      web.deviceFingerPrint = collectDFPAH();
    }

    return web;
  };
  //Centralized Javascript to read Domain dynamically
  Cof_sic.readDomain = function() {
    var root_domain = document.domain;
    var temp = root_domain.split('.').reverse();
    if (temp.length > 1) {
      root_domain = temp[1] + '.' + temp[0];
    } else {
      root_domain = '.capitalone.com';
    }
    return root_domain;
  };

  Cof_sic.readCookie = function(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  };

  Cof_sic.setCookie = function(name, value) {
    var cookiedomain = Cof_sic.readDomain();
    document.cookie =
      name + '=' + value + '; path =/' + '; domain=' + cookiedomain;
  };

  Cof_sic.del_cookie = function(name) {
    document.cookie =
      name +
      '=; path =/' +
      '; domain=.capitalone.com; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  };

  Cof_sic.clearCookiesOnSignInPageLoad = function() {
    Cof_sic.del_cookie('C1_CCID');
    Cof_sic.clearCookiesOnPageLoad();
  };

  Cof_sic.clearCookiesOnPageLoad = function() {
    Cof_sic.del_cookie('SIC_AP');
    var uidCookie = Cof_sic.readCookie('C1_UID');
    if (uidCookie == null || uidCookie == undefined) {
      Cof_sic.del_cookie('C1_TGT');
      Cof_sic.del_cookie('C1_DEEPLINK');
    }
    Cof_sic.del_cookie('SIC_signin');
    //del_cookie('SIC_lock');
    Cof_sic.del_cookie('SIC_REDIRECT');
    Cof_sic.del_cookie('ssotgt');
    Cof_sic.del_cookie('ISSO_PAGE_IDT');
    Cof_sic.del_cookie('deviceType');
    Cof_sic.del_cookie('SIC_SI');
  };

  Cof_sic.createC1CCIDCookie = function(clientName) {
    var d = new Date().getTime();
    // prettier-ignore
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
        c
      ) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      });
    if (clientName == null || clientName == undefined) {
      clientName = 'Client';
    }
    uuid = 'SIC-' + clientName + '-' + uuid;
    Cof_sic.setCookie('C1_CCID', uuid);
  };
})();

webProperties_on_sic = function() {
  return Cof_sic.webProperties();
};

clearCookiesOnSignInPageLoad_on_sic = function() {
  Cof_sic.clearCookiesOnSignInPageLoad();
};

createC1CCIDCookie_on_sic = function(clientName) {
  Cof_sic.createC1CCIDCookie(clientName);
};

/**
 * Browser fingerprint
 */

var InstalledFontDetector = function() {
  var e, g, f, c, b, a;
  b = '48px';
  a = 'i ll wwww';
  e = document.getElementsByTagName('body')[0];
  c = document.createElement('br');
  g = document.createElement('span');
  g.style.fontSize = b;
  g.innerHTML = a;
  f = document.createElement('span');
  f.style.fontSize = b;
  f.innerHTML = a;
  function d(i) {
    g.style.fontFamily = '"' + i + '", monospace';
    f.style.fontFamily = '"' + i + '", sans-serif';
    e.appendChild(g);
    e.appendChild(c);
    e.appendChild(f);
    var h =
      g.offsetWidth === f.offsetWidth && g.offsetHeight === f.offsetHeight;
    e.removeChild(f);
    e.removeChild(c);
    e.removeChild(g);
    return h;
  }
  this.detect = d;
};
function fnBrowserDevicePrintVersion() {
  return '2.0.0';
}
function fnZeroPad(b, a) {
  var c = '' + b;
  while (c.length < a) {
    c = '0' + c;
  }
  return c;
}
function fnBrowserCurrentTimeStamp() {
  try {
    return new Date().toJSON();
  } catch (a) {
    try {
      var b = new Date();
      return (
        fnZeroPad(b.getUTCFullYear(), 4) +
        '-' +
        fnZeroPad(b.getUTCMonth(), 2) +
        '-' +
        fnZeroPad(b.getUTCDate(), 2) +
        'T' +
        fnZeroPad(b.getUTCHours(), 2) +
        ':' +
        fnZeroPad(b.getUTCMinutes(), 2) +
        ':' +
        fnZeroPad(b.getUTCSeconds(), 2) +
        '.' +
        fnZeroPad(b.getUTCMilliseconds(), 3) +
        'Z'
      );
    } catch (a) {
      return '';
    }
  }
}
function fnBrowserUserAgent() {
  var a;
  try {
    a = navigator.userAgent.toLowerCase();
  } catch (b) {}
  return a;
}
Date.prototype.deviceprint_stdTimezoneOffset = function() {
  var d, c;
  c = new Date(this.getFullYear(), 0, 1);
  d = new Date(this.getFullYear(), 6, 1);
  return Math.max(c.getTimezoneOffset(), d.getTimezoneOffset());
};
Date.prototype.isDST = function() {
  return this.getTimezoneOffset() < this.deviceprint_stdTimezoneOffset();
};
function fnBrowserTimeZone() {
  var e, d, b, a;
  a = {};
  try {
    d = new Date().getTimezoneOffset();
    e = Math.abs(d);
    b = new Date();
    if (b.isDST()) {
      e += 60;
    }
    d =
      (d < 0 ? '+' : '-') +
      ('00' + Math.floor(e / 60)).slice(-2) +
      ':' +
      ('00' + (e % 60)).slice(-2);
    a.timezone = d;
  } catch (c) {}
  return a;
}
function fnBrowserScreen() {
  var a,
    c = {};
  try {
    if (screen) {
      if (screen.width) {
        c.width = screen.width + '';
      }
      if (screen.height) {
        c.height = screen.height + '';
      }
      if (screen.colorDepth) {
        c.colorDepth = screen.colorDepth + '';
      }
    }
    a = fnBrowserFontSmoothingEnabled();
    if (!fnIsBlank(a)) {
      c.fontSmoothingEnabled = a;
    }
  } catch (b) {}
  return c;
}
function fnBrowserFontSmoothingEnabled() {
  var a, c, b, e, d, h, g;
  try {
    if (screen && typeof screen.fontSmoothingEnabled !== 'undefined') {
      if (screen.fontSmoothingEnabled) {
        return 'true';
      } else {
        return 'false';
      }
    } else {
      try {
        a = 'false';
        c = document.createElement('canvas');
        c.width = '35';
        c.height = '35';
        c.style.display = 'none';
        document.body.appendChild(c);
        b = c.getContext('2d');
        b.textBaseline = 'top';
        b.font = '32px Arial';
        b.fillStyle = 'black';
        b.strokeStyle = 'black';
        b.fillText('O', 0, 0);
        for (d = 8; d <= 32; d = d + 1) {
          for (e = 1; e <= 32; e = e + 1) {
            h = b.getImageData(e, d, 1, 1).data;
            g = h[3];
            if (g !== 255 && g !== 0) {
              return 'true';
            }
          }
        }
        return 'false';
      } catch (f) {
        return a;
      }
    }
  } catch (f) {}
  return a;
}
function fnBrowserLanguage() {
  var b = {};
  try {
    if (navigator) {
      if (navigator.language) {
        b.language = navigator.language;
      }
      if (navigator.userLanguage) {
        b.userLanguage = navigator.userLanguage;
      }
      if (navigator.browserLanguage) {
        b.browserLanguage = navigator.browserLanguage;
      }
      if (navigator.systemLanguage) {
        b.systemLanguage = navigator.systemLanguage;
      }
    }
  } catch (a) {}
  return b;
}
function fnBrowserFonts() {
  var f, c, a, e, b;
  e = { installedFonts: [] };
  try {
    f = [
      'Abadi MT Condensed Light',
      'Adobe Fangsong Std',
      'Adobe Hebrew',
      'Adobe Ming Std',
      'Agency FB',
      'Aharoni',
      'Andalus',
      'Angsana New',
      'AngsanaUPC',
      'Aparajita',
      'Arab',
      'Arabic Transparent',
      'Arabic Typesetting',
      'Arial Baltic',
      'Arial Black',
      'Arial CE',
      'Arial CYR',
      'Arial Greek',
      'Arial TUR',
      'Arial',
      'Batang',
      'BatangChe',
      'Bauhaus 93',
      'Bell MT',
      'Bitstream Vera Serif',
      'Bodoni MT',
      'Bookman Old Style',
      'Braggadocio',
      'Broadway',
      'Browallia New',
      'BrowalliaUPC',
      'Calibri Light',
      'Calibri',
      'Californian FB',
      'Cambria Math',
      'Cambria',
      'Candara',
      'Castellar',
      'Casual',
      'Centaur',
      'Century Gothic',
      'Chalkduster',
      'Colonna MT',
      'Comic Sans MS',
      'Consolas',
      'Constantia',
      'Copperplate Gothic Light',
      'Corbel',
      'Cordia New',
      'CordiaUPC',
      'Courier New Baltic',
      'Courier New CE',
      'Courier New CYR',
      'Courier New Greek',
      'Courier New TUR',
      'Courier New',
      'DFKai-SB',
      'DaunPenh',
      'David',
      'DejaVu LGC Sans Mono',
      'Desdemona',
      'DilleniaUPC',
      'DokChampa',
      'Dotum',
      'DotumChe',
      'Ebrima',
      'Engravers MT',
      'Eras Bold ITC',
      'Estrangelo Edessa',
      'EucrosiaUPC',
      'Euphemia',
      'Eurostile',
      'FangSong',
      'Forte',
      'FrankRuehl',
      'Franklin Gothic Heavy',
      'Franklin Gothic Medium',
      'FreesiaUPC',
      'French Script MT',
      'Gabriola',
      'Gautami',
      'Georgia',
      'Gigi',
      'Gisha',
      'Goudy Old Style',
      'Gulim',
      'GulimChe',
      'GungSeo',
      'Gungsuh',
      'GungsuhChe',
      'Haettenschweiler',
      'Harrington',
      'Hei S',
      'HeiT',
      'Heisei Kaku Gothic',
      'Hiragino Sans GB',
      'Impact',
      'Informal Roman',
      'IrisUPC',
      'Iskoola Pota',
      'JasmineUPC',
      'KacstOne',
      'KaiTi',
      'Kalinga',
      'Kartika',
      'Khmer UI',
      'Kino MT',
      'KodchiangUPC',
      'Kokila',
      'Kozuka Gothic Pr6N',
      'Lao UI',
      'Latha',
      'Leelawadee',
      'Levenim MT',
      'LilyUPC',
      'Lohit Gujarati',
      'Loma',
      'Lucida Bright',
      'Lucida Console',
      'Lucida Fax',
      'Lucida Sans Unicode',
      'MS Gothic',
      'MS Mincho',
      'MS PGothic',
      'MS PMincho',
      'MS Reference Sans Serif',
      'MS UI Gothic',
      'MV Boli',
      'Magneto',
      'Malgun Gothic',
      'Mangal',
      'Marlett',
      'Matura MT Script Capitals',
      'Meiryo UI',
      'Meiryo',
      'Menlo',
      'Microsoft Himalaya',
      'Microsoft JhengHei',
      'Microsoft New Tai Lue',
      'Microsoft PhagsPa',
      'Microsoft Sans Serif',
      'Microsoft Tai Le',
      'Microsoft Uighur',
      'Microsoft YaHei',
      'Microsoft Yi Baiti',
      'MingLiU',
      'MingLiU-ExtB',
      'MingLiU_HKSCS',
      'MingLiU_HKSCS-ExtB',
      'Miriam Fixed',
      'Miriam',
      'Mongolian Baiti',
      'MoolBoran',
      'NSimSun',
      'Narkisim',
      'News Gothic MT',
      'Niagara Solid',
      'Nyala',
      'PMingLiU',
      'PMingLiU-ExtB',
      'Palace Script MT',
      'Palatino Linotype',
      'Papyrus',
      'Perpetua',
      'Plantagenet Cherokee',
      'Playbill',
      'Prelude Bold',
      'Prelude Condensed Bold',
      'Prelude Condensed Medium',
      'Prelude Medium',
      'PreludeCompressedWGL Black',
      'PreludeCompressedWGL Bold',
      'PreludeCompressedWGL Light',
      'PreludeCompressedWGL Medium',
      'PreludeCondensedWGL Black',
      'PreludeCondensedWGL Bold',
      'PreludeCondensedWGL Light',
      'PreludeCondensedWGL Medium',
      'PreludeWGL Black',
      'PreludeWGL Bold',
      'PreludeWGL Light',
      'PreludeWGL Medium',
      'Raavi',
      'Rachana',
      'Rockwell',
      'Rod',
      'Sakkal Majalla',
      'Sawasdee',
      'Script MT Bold',
      'Segoe Print',
      'Segoe Script',
      'Segoe UI Light',
      'Segoe UI Semibold',
      'Segoe UI Symbol',
      'Segoe UI',
      'Shonar Bangla',
      'Showcard Gothic',
      'Shruti',
      'SimHei',
      'SimSun',
      'SimSun-ExtB',
      'Simplified Arabic Fixed',
      'Simplified Arabic',
      'Snap ITC',
      'Sylfaen',
      'Symbol',
      'Tahoma',
      'Times New Roman Baltic',
      'Times New Roman CE',
      'Times New Roman CYR',
      'Times New Roman Greek',
      'Times New Roman TUR',
      'Times New Roman',
      'TlwgMono',
      'Traditional Arabic',
      'Trebuchet MS',
      'Tunga',
      'Tw Cen MT Condensed Extra Bold',
      'Ubuntu',
      'Umpush',
      'Univers',
      'Utopia',
      'Utsaah',
      'Vani',
      'Verdana',
      'Vijaya',
      'Vladimir Script',
      'Vrinda',
      'Webdings',
      'Wide Latin',
      'Wingdings',
    ];
    b = new InstalledFontDetector();
    a = [];
    for (c = 0; c < f.length; c = c + 1) {
      if (b.detect(f[c])) {
        a.push(f[c]);
      }
    }
    try {
      a.sort();
    } catch (d) {}
    e.installedFonts = a;
  } catch (d) {}
  return e;
}
function fnBrowserFontsOld() {
  var b, n, h, o, k, m, f, c, a, g, p, j, l;
  h = 0;
  f = 0;
  l = { installedFonts: [] };
  n = [
    'cursive',
    'monospace',
    'serif',
    'sans-serif',
    'fantasy',
    'default',
    'Arial',
    'Arial Black',
    'Arial Narrow',
    'Arial Rounded MT Bold',
    'Bookman Old Style',
    'Bradley Hand ITC',
    'Century',
    'Century Gothic',
    'Comic Sans MS',
    'Courier',
    'Courier New',
    'Georgia',
    'Gentium',
    'Impact',
    'King',
    'Lucida Console',
    'Lalit',
    'Modena',
    'Monotype Corsiva',
    'Papyrus',
    'Tahoma',
    'TeX',
    'Times',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana',
    'Verona',
  ];
  try {
    b = 'position: absolute; visibility: hidden; display: block !important';
    h = n.length;
    o =
      '<b style="display:inline !important; width:auto !important; font:normal 10px/1 \'X\',sans-serif !important">ww</b><b style="display:inline !important; width:auto !important; font:normal 10px/1 \'X\',monospace !important">ww</b>';
    k = document.createDocumentFragment();
    m = [];
    for (f = 0; f < h; f = f + 1) {
      c = n[f];
      a = document.createElement('div');
      c = c.replace(/['"<>]/g, '');
      a.innerHTML = o.replace(/X/g, c);
      a.style.cssText = b;
      k.appendChild(a);
      m.push(a);
    }
    g = document.body;
    g.insertBefore(k, g.firstChild);
    p = [];
    for (f = 0; f < h; f = f + 1) {
      j = m[f].getElementsByTagName('b');
      if (j[0].offsetWidth === j[1].offsetWidth) {
        p.push(n[f]);
      }
    }
    for (f = 0; f < h; f = f + 1) {
      g.removeChild(m[f]);
    }
    try {
      p.sort();
    } catch (d) {}
    l.installedFonts = p;
  } catch (d) {}
  return l;
}
function fnBrowserPlugins() {
  var c, a, e, b, g, f;
  a = [];
  e = { installedPlugins: [] };
  try {
    if (navigator && navigator.plugins) {
      b = navigator.plugins;
      if (b.length > 0) {
        for (c = 0; c < b.length; c++) {
          f = b[c].name;
          if (!fnIsBlank(f)) {
            a.push(f);
          }
        }
      }
    } else {
      if (navigator && navigator.mimeTypes) {
        g = navigator.mimeTypes;
        if (g.length > 0) {
          for (c = 0; c < g.length; c++) {
            f = g[c].description;
            if (!fnIsBlank(f)) {
              a.push(f);
            }
          }
        }
      }
    }
    try {
      a = a.filter(function(j, i, h) {
        return h.indexOf(j) == i;
      });
    } catch (d) {}
    try {
      a.sort();
    } catch (d) {}
    e.installedPlugins = a;
  } catch (d) {}
  return e;
}
function fnBrowserPluginsOld() {
  var c, a, e, b, g, f;
  a = [];
  e = { installedPlugins: [] };
  try {
    if (navigator && navigator.plugins) {
      b = navigator.plugins;
      if (b.length > 0) {
        for (c = 0; c < b.length; c++) {
          f = fnStripExtension(b[c].filename, '.');
          if (!fnIsBlank(f)) {
            a.push(f);
          }
        }
      }
    } else {
      if (navigator && navigator.mimeTypes) {
        g = navigator.mimeTypes;
        if (g.length > 0) {
          for (c = 0; c < g.length; c++) {
            f = g[c].description;
            if (!fnIsBlank(f)) {
              a.push(f);
            }
          }
        }
      }
    }
    try {
      a = a.filter(function(j, i, h) {
        return h.indexOf(j) == i;
      });
    } catch (d) {}
    try {
      a.sort();
    } catch (d) {}
    e.installedPlugins = a;
  } catch (d) {}
  return e;
}
function fnBrowserCookieEnabled() {
  var b;
  try {
    b = navigator.cookieEnabled ? 'true' : 'false';
    if (typeof navigator.cookieEnabled === 'undefined' && !b) {
      document.cookie = 'testcookie';
      b = document.cookie.indexOf('testcookie') !== -1 ? 'true' : 'false';
    }
  } catch (a) {}
  return b;
}
function fnBrowserJavaEnabled() {
  var b;
  try {
    if (navigator.javaEnabled()) {
      b = 'true';
    } else {
      b = 'false';
    }
  } catch (a) {}
  return b;
}
function fnBrowserTouchEnabled() {
  var a;
  try {
    if (document.createEvent('TouchEvent')) {
      a = 'true';
    } else {
      a = 'false';
    }
  } catch (b) {}
  return a;
}
function fnBrowserSilverLightDetails() {
  var a, c, b;
  try {
    try {
      a = new ActiveXObject('AgControl.AgControl');
      if (a.IsVersionSupported('5.0')) {
        b = '5.x';
      } else {
        if (a.IsVersionSupported('4.0')) {
          b = '4.x';
        } else {
          if (a.IsVersionSupported('3.0')) {
            b = '3.x';
          } else {
            if (a.IsVersionSupported('2.0')) {
              b = '2.x';
            } else {
              b = '1.x';
            }
          }
        }
      }
      a = null;
    } catch (f) {
      c = navigator.plugins['Silverlight Plug-In'];
      if (c) {
        if (c.description === '1.0.30226.2') {
          b = '2.x';
        } else {
          b = parseInt(c.description[0], 10);
        }
      }
    }
  } catch (d) {}
  return b;
}
function fnBrowserFlashDetails() {
  var d, a, c;
  d = null;
  a = null;
  try {
    d = swfobject.getFlashPlayerVersion();
    a = d.major + '.' + d.minor + '.' + d.release;
    if (a === '0.0.0') {
      return c;
    }
    c = a;
    return c;
  } catch (b) {
    return c;
  }
}
function fnBrowserCanvasHash() {
  var e, b, d, a, f;
  e;
  b = null;
  d = null;
  a =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/";
  f = null;
  try {
    b = document.createElement('canvas');
    d = b.getContext('2d');
    d.textBaseline = 'top';
    d.font = "14px 'Arial'";
    d.textBaseline = 'alphabetic';
    d.fillStyle = '#f60';
    d.fillRect(125, 1, 62, 20);
    d.fillStyle = '#069';
    d.fillText(a, 2, 15);
    d.fillStyle = 'rgba(102, 204, 0, 0.7)';
    d.fillText(a, 4, 17);
    f = fnCSM(b.toDataURL());
    return f;
  } catch (c) {
    return e;
  }
}
function fnBrowserTrueAgent() {
  var b, a, c;
  b = 'Unknown';
  a = null;
  c = null;
  a = navigator.userAgent.toLowerCase();
  if (
    document.all &&
    document.getElementById &&
    navigator.savePreferences &&
    a.indexOf('Netfront') < 0 &&
    navigator.appName !== 'Blazer'
  ) {
    b = 'Escape 5';
  } else {
    if (navigator.vendor === 'KDE') {
      b = 'Konqueror';
    } else {
      if (
        document.childNodes &&
        !document.all &&
        !navigator.taintEnabled &&
        !navigator.accentColorName
      ) {
        b = 'Safari';
      } else {
        if (
          document.childNodes &&
          !document.all &&
          !navigator.taintEnabled &&
          navigator.accentColorName
        ) {
          b = 'OmniWeb 4.5+';
        } else {
          if (navigator.__ice_version) {
            b = 'ICEBrowser';
          } else {
            if (
              window.ScriptEngine &&
              ScriptEngine().indexOf('InScript') + 1 &&
              document.createElement
            ) {
              b = 'iCab 3+';
            } else {
              if (
                window.ScriptEngine &&
                ScriptEngine().indexOf('InScript') + 1
              ) {
                b = 'iCab 2-';
              } else {
                if (
                  a.indexOf('hotjava') + 1 &&
                  navigator.accentColorName === 'undefined'
                ) {
                  b = 'HotJava';
                } else {
                  if (document.layers && !document.classes) {
                    b = 'Omniweb 4.2-';
                  } else {
                    if (document.layers && !navigator.mimeTypes['*']) {
                      b = 'Escape 4';
                    } else {
                      if (document.layers) {
                        b = 'Netscape 4';
                      } else {
                        if (window.opera && document.getElementsByClassName) {
                          b = 'Opera 9.5+';
                        } else {
                          if (window.opera && window.getComputedStyle) {
                            b = 'Opera 8';
                          } else {
                            if (window.opera && document.childNodes) {
                              b = 'Opera 7';
                            } else {
                              if (window.opera) {
                                b = 'Opera ' + window.opera.version();
                              } else {
                                if (navigator.appName.indexOf('WebTV') + 1) {
                                  b = 'WebTV';
                                } else {
                                  if (a.indexOf('netgem') + 1) {
                                    b = 'Netgem NetBox';
                                  } else {
                                    if (a.indexOf('opentv') + 1) {
                                      b = 'OpenTV';
                                    } else {
                                      if (a.indexOf('ipanel') + 1) {
                                        b = 'iPanel MicroBrowser';
                                      } else {
                                        if (
                                          document.getElementById &&
                                          !document.childNodes
                                        ) {
                                          b = 'Clue browser';
                                        } else {
                                          if (
                                            navigator.product &&
                                            navigator.product.indexOf('Hv') ===
                                              0
                                          ) {
                                            b = 'Tkhtml Hv3+';
                                          } else {
                                            if (
                                              typeof InstallTrigger !==
                                              'undefined'
                                            ) {
                                              b = 'Firefox';
                                            } else {
                                              if (window.atob) {
                                                b = 'Internet Explorer 10+';
                                              } else {
                                                if (
                                                  XDomainRequest &&
                                                  window.performance
                                                ) {
                                                  b = 'Internet Explorer 9';
                                                } else {
                                                  if (XDomainRequest) {
                                                    b = 'Internet Explorer 8';
                                                  } else {
                                                    if (
                                                      document.documentElement &&
                                                      document.documentElement
                                                        .style.maxHeight !==
                                                        'undefined'
                                                    ) {
                                                      b = 'Internet Explorer 7';
                                                    } else {
                                                      if (
                                                        document.compatMode &&
                                                        document.all
                                                      ) {
                                                        b =
                                                          'Internet Explorer 6';
                                                      } else {
                                                        if (
                                                          window.createPopup
                                                        ) {
                                                          b =
                                                            'Internet Explorer 5.5';
                                                        } else {
                                                          if (
                                                            window.attachEvent
                                                          ) {
                                                            b =
                                                              'Internet Explorer 5';
                                                          } else {
                                                            if (
                                                              document.all &&
                                                              navigator.appName !==
                                                                'Microsoft Pocket Internet Explorer'
                                                            ) {
                                                              b =
                                                                'Internet Explorer 4';
                                                            } else {
                                                              // prettier-ignore
                                                              if (
                                                                a.indexOf(
                                                                  'msie'
                                                                ) + 1 &&
                                                                window.ActiveXObject
                                                              ) {
                                                                b =
                                                                  'Pocket Internet Explorer';
                                                              } else {
                                                                 // prettier-ignore
                                                                if (
                                                                  document.getElementById &&
                                                                  (a.indexOf(
                                                                    'netfront'
                                                                  ) + 1 ||
                                                                    navigator.appName ===
                                                                      'Blazer' ||
                                                                    navigator.product ===
                                                                      'Gecko' ||
                                                                    navigator.appName.indexOf(
                                                                      'PSP'
                                                                    ) + 1 ||
                                                                    navigator.appName.indexOf(
                                                                      'PLAYSTATION 3'
                                                                    ) + 1)
                                                                ) {
                                                                  b =
                                                                    'NetFront 3+';
                                                                } else {
                                                                  if (
                                                                    navigator.product ===
                                                                      'Gecko' &&
                                                                    !navigator.savePreferences
                                                                  ) {
                                                                    b =
                                                                      'Gecko engine (Mozilla, Netscape 6+ etc.)';
                                                                  } else {
                                                                    if (
                                                                      window.chrome
                                                                    ) {
                                                                      b =
                                                                        'Chrome';
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  c = b;
  return c;
}
function fnBrowserConnectionInfo() {
  var a;
  try {
    a = navigator.connection.type;
  } catch (b) {}
  return a;
}
function fnBrowserLatency() {
  var a, c;
  c = {};
  try {
    a = window.performance.timing;
    c.requestTime = a.responseStart - a.requestStart + '';
    c.networkLatency = a.responseEnd - a.fetchStart + '';
  } catch (b) {}
  return c;
}
function fnBrowserInfo() {
  var f, g, b, h, i, a, j, c, d;
  f = {};
  try {
    if (navigator) {
      g = navigator.userAgent;
      b = g.toLowerCase();
      h = navigator.appName;
      i = '' + parseFloat(navigator.appVersion);
      a = parseInt(navigator.appVersion, 10);
      if ((c = b.indexOf('opera')) != -1) {
        h = 'Opera';
        i = g.substring(c + 6);
        if ((c = b.indexOf('version')) != -1) {
          i = g.substring(c + 8);
        }
      }
      if ((c = b.indexOf('opr')) != -1) {
        h = 'Opera';
        i = g.substring(c + 4);
      } else {
        if ((c = b.indexOf('edge')) != -1) {
          h = 'Microsoft Edge';
          i = g.substring(c + 5);
        } else {
          if ((c = b.indexOf('msie')) != -1) {
            h = 'Internet Explorer';
            i = g.substring(c + 5);
          } else {
            if ((c = b.indexOf('chrome')) != -1) {
              h = 'Chrome';
              i = g.substring(c + 7);
            } else {
              if ((c = b.indexOf('safari')) != -1) {
                h = 'Safari';
                i = g.substring(c + 7);
                if ((c = b.indexOf('version')) != -1) {
                  i = g.substring(c + 8);
                }
              } else {
                if ((c = b.indexOf('firefox')) != -1) {
                  h = 'Firefox';
                  i = g.substring(c + 8);
                } else {
                  if (b.indexOf('trident/') != -1) {
                    h = 'Internet Explorer';
                    i = g.substring(g.indexOf('rv:') + 3);
                  } else {
                    if (
                      (j = g.lastIndexOf(' ') + 1) < (c = g.lastIndexOf('/'))
                    ) {
                      h = g.substring(j, c);
                      i = g.substring(c + 1);
                      if (h.toLowerCase() == h.toUpperCase()) {
                        h = navigator.appName;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      if ((d = i.indexOf(';')) != -1) {
        i = i.substring(0, d);
      }
      if ((d = i.indexOf(' ')) != -1) {
        i = i.substring(0, d);
      }
      if ((d = i.indexOf(')')) != -1) {
        i = i.substring(0, d);
      }
      a = parseInt('' + i, 10);
      if (isNaN(a)) {
        i = '' + parseFloat(navigator.appVersion);
        a = parseInt(navigator.appVersion, 10);
      }
      if (h && h != null && typeof h !== 'undefined') {
        f.name = h;
      }
      if (a && a != null && typeof a !== 'undefined') {
        f.majorVersion = (a + '').replace(/_/gi, '.');
      }
    }
  } catch (e) {}
  return f;
}
function fnBrowserSystemInfo() {
  var j, l, g, c, d, h, k, e, a, f, i;
  j = {};
  try {
    l = navigator.appVersion;
    g = navigator.userAgent;
    i = [
      { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/gi },
      { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/gi },
      { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/gi },
      { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/gi },
      { s: 'Windows Vista', r: /Windows NT 6.0/gi },
      { s: 'Windows Server 2003', r: /Windows NT 5.2/gi },
      { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/gi },
      { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/gi },
      { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/gi },
      { s: 'Windows 98', r: /(Windows 98|Win98)/gi },
      { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/gi },
      {
        s: 'Windows NT 4.0',
        r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/gi,
      },
      { s: 'Windows CE', r: /Windows CE/gi },
      { s: 'Windows 3.11', r: /Win16/gi },
      { s: 'Android', r: /Android/gi },
      { s: 'BlackBerry', r: /BlackBerry/gi },
      { s: 'Open BSD', r: /OpenBSD/gi },
      { s: 'Sun OS', r: /SunOS/gi },
      { s: 'Linux', r: /(Linux|X11)/gi },
      { s: 'iOS', r: /(iPhone|iPad|iPod)/gi },
      { s: 'Mac OS X', r: /Mac OS X/gi },
      { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/gi },
      { s: 'QNX', r: /QNX/gi },
      { s: 'UNIX', r: /UNIX/gi },
      { s: 'BeOS', r: /BeOS/gi },
      { s: 'OS/2', r: /OS\/2/gi },
      { s: 'Kindle', r: /kindle/gi },
      { s: 'PlayStation', r: /PlayStation/gi },
      { s: 'Wii', r: /wii/gi },
      {
        s: 'Bot',
        r: /(bot|robot|crawler|crawling|spider|nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/gi,
      },
    ];
    for (a in i) {
      f = i[a];
      if (f.r.test(g)) {
        c = f.s;
        break;
      }
    }
    if (/Windows/gi.test(c)) {
      d = fnGetArrIndexValue(/Windows (.*)/gi.exec(c), 1);
      c = 'Windows';
    }
    switch (c) {
      case 'Mac OS X':
        d = fnGetArrIndexValue(/Mac OS X (10[\.\_\d]+)/gi.exec(g), 1);
        break;
      case 'Android':
        d = fnGetArrIndexValue(/Android ([\.\_\d]+)/gi.exec(g), 1);
        e = fnGetArrIndexValue(/Android.*;(.*)Build/gi.exec(g), 1);
        break;
      case 'BlackBerry':
        d = fnGetArrIndexValue(/Version\/([\.\_\d]{1,5})/gi.exec(g), 1);
        if (fnIsBlank(d)) {
          d = fnGetArrIndexValue(/\/([\.\_\d]{1,5})/gi.exec(g), 1);
        }
        e = fnGetArrIndexValue(/;.*BlackBerry(.*);/gi.exec(g), 1);
        if (fnIsBlank(e)) {
          e = fnGetArrIndexValue(/BlackBerry([\d]+)/gi.exec(g), 1);
        }
        break;
      case 'iOS':
        h = /OS (\d+)_(\d+)_?(\d+)?/gi.exec(g);
        k = fnGetArrIndexValue(h, 1);
        d = '';
        if (!fnIsBlank(k)) {
          d = k;
        }
        k = fnGetArrIndexValue(h, 2);
        if (!fnIsBlank(k)) {
          if (fnIsBlank(d)) {
            d = k;
          } else {
            d = d + '.' + k;
          }
        }
        k = fnGetArrIndexValue(h, 3);
        if (!fnIsBlank(k)) {
          if (fnIsBlank(d)) {
            d = k;
          } else {
            d = d + '.' + k;
          }
        }
        break;
    }
    if (c && c != null && typeof c !== 'undefined') {
      j.operatingSystem = c;
    }
    if (d && d != null && typeof d !== 'undefined') {
      if (d.trim().length > 0) {
        j.osVersion = d.trim().replace(/_/gi, '.');
      }
    }
    if (navigator) {
      if (navigator.platform) {
        j.platform = navigator.platform;
        lcPlatform = navigator.platform.toLowerCase();
        if (lcPlatform.indexOf('x64') !== -1) {
          j.cpuBits = '64 bits';
        } else {
          if (lcPlatform.indexOf('wow64') !== -1) {
            j.cpuBits = '64 bits';
          } else {
            if (lcPlatform.indexOf('win64') !== -1) {
              j.cpuBits = '64 bits';
            } else {
              if (lcPlatform.indexOf('win32') !== -1) {
                j.cpuBits = '32 bits';
              } else {
                if (lcPlatform.indexOf('x64') !== -1) {
                  j.cpuBits = '64 bits';
                } else {
                  if (lcPlatform.indexOf('x32') !== -1) {
                    j.cpuBits = '32 bits';
                  } else {
                    if (lcPlatform.indexOf('x86') !== -1) {
                      j.cpuBits = '32 bits*';
                    } else {
                      if (lcPlatform.indexOf('ppc') !== -1) {
                        j.cpuBits = '64 bits';
                      } else {
                        if (lcPlatform.indexOf('alpha') !== -1) {
                          j.cpuBits = '64 bits';
                        } else {
                          if (lcPlatform.indexOf('68k') !== -1) {
                            j.cpuBits = '64 bits';
                          } else {
                            if (lcPlatform.indexOf('iphone') !== -1) {
                              j.cpuBits = '32 bits';
                            } else {
                              if (lcPlatform.indexOf('android') !== -1) {
                                j.cpuBits = '32 bits';
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (e && e != null && typeof e !== 'undefined') {
      if (e.trim().length > 0) {
        j.model = e.trim();
      }
    }
  } catch (b) {}
  return j;
}
function fnBrowserFormFields() {
  var g, f, a, c, h, l, k, d, b;
  d = { url: '', formInputs: [] };
  b = { name: '', inputs: [] };
  a = 0;
  c = 0;
  h = '';
  l = new Array();
  k = '';
  try {
    h = document.getElementsByTagName('form');
    a = h.length;
    d.url = window.location.href;
    for (g = 0; g < a; g = g + 1) {
      b.name = h[g].name;
      k = h[g].getElementsByTagName('input');
      c = k.length;
      l = new Array();
      for (f = 0; f < c; f = f + 1) {
        if (k[g].type !== 'hidden') {
          l.push(k[f].name);
        }
      }
      d.formInputs.push({ name: b.name, inputs: l });
    }
  } catch (e) {}
  return d;
}
var B64 = {
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  encode: function(c) {
    var k, h, f, j, g, e, d, a, b;
    a = '';
    b = 0;
    c = B64._utf8_encode(c);
    while (b < c.length) {
      k = c.charCodeAt(b++);
      h = c.charCodeAt(b++);
      f = c.charCodeAt(b++);
      j = k >> 2;
      g = ((k & 3) << 4) | (h >> 4);
      e = ((h & 15) << 2) | (f >> 6);
      d = f & 63;
      if (isNaN(h)) {
        e = d = 64;
      } else {
        if (isNaN(f)) {
          d = 64;
        }
      }
      a =
        a +
        this._keyStr.charAt(j) +
        this._keyStr.charAt(g) +
        this._keyStr.charAt(e) +
        this._keyStr.charAt(d);
    }
    return a;
  },
  decode: function(c) {
    var k, h, f, j, g, e, d, a, b;
    a = '';
    b = 0;
    c = c.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    while (b < c.length) {
      j = this._keyStr.indexOf(c.charAt(b++));
      g = this._keyStr.indexOf(c.charAt(b++));
      e = this._keyStr.indexOf(c.charAt(b++));
      d = this._keyStr.indexOf(c.charAt(b++));
      k = (j << 2) | (g >> 4);
      h = ((g & 15) << 4) | (e >> 2);
      f = ((e & 3) << 6) | d;
      a = a + String.fromCharCode(k);
      if (e != 64) {
        a = a + String.fromCharCode(h);
      }
      if (d != 64) {
        a = a + String.fromCharCode(f);
      }
    }
    a = B64._utf8_decode(a);
    return a;
  },
  _utf8_encode: function(b) {
    var a, e;
    a = '';
    b = b.replace(/\r\n/g, '\n');
    for (var d = 0; d < b.length; d++) {
      e = b.charCodeAt(d);
      if (e < 128) {
        a += String.fromCharCode(e);
      } else {
        if (e > 127 && e < 2048) {
          a += String.fromCharCode((e >> 6) | 192);
          a += String.fromCharCode((e & 63) | 128);
        } else {
          a += String.fromCharCode((e >> 12) | 224);
          a += String.fromCharCode(((e >> 6) & 63) | 128);
          a += String.fromCharCode((e & 63) | 128);
        }
      }
    }
    return a;
  },
  _utf8_decode: function(a) {
    var e, g, f, d, b;
    b = '';
    e = 0;
    g = 0;
    f = 0;
    d = 0;
    while (e < a.length) {
      g = a.charCodeAt(e);
      if (g < 128) {
        b += String.fromCharCode(g);
        e++;
      } else {
        // prettier-ignore
        if (g > 191 && g < 224) {
          d = a.charCodeAt(e + 1);
          b += String.fromCharCode(((g & 31) << 6) | (d & 63));
          e += 2;

        } else {
          d = a.charCodeAt(e + 1);
          c3 = a.charCodeAt(e + 2);
          b += String.fromCharCode(
            ((g & 15) << 12) | ((d & 63) << 6) | (c3 & 63)
          );
          e += 3;
        }
      }
    }
    return b;
  },
};
function fnB64Enc(a) {
  if (typeof btoa === 'undefined') {
    return B64.encode(a);
  } else {
    return window.btoa(a);
  }
}

function fnStripExtension(b, c) {
  var a = b.indexOf(c);
  if (a >= 0) {
    b = b.slice(0, a);
  }
  return b;
}
function fnIsBlank(a) {
  return !a || /^\s*$/.test(a);
}
function fnGetArrIndexValue(a, c) {
  var b;
  if (a && typeof a !== 'undefined' && a.length > c) {
    return a[c];
  }
  return b;
}

function fnB64Dec(a) {
  if (typeof atob === 'undefined') {
    return B64.decode(a);
  } else {
    return window.atob(a);
  }
}
// prettier-ignore
eval(
  fnB64Dec(
    'ZnVuY3Rpb24gY29sbGVjdERGUEFIKCl7dmFyIGEsZCxpLGYsYzthPXt9O2Q9W107aT1mbkdldFRpbWUoKTtmPWZuR2V0VGltZSgpO3ZhciBiPWZuQnJvd3NlckN1cnJlbnRUaW1lU3RhbXAoKTthLnVzZXJBZ2VudD1mbkJyb3dzZXJVc2VyQWdlbnQoKTtjPWZuR2V0VGltZSgpO2QucHVzaCgoYy1mKSsiIik7YS50aW1lem9uZT1mbkJyb3dzZXJUaW1lWm9uZSgpO2Y9Zm5HZXRUaW1lKCk7ZC5wdXNoKChmLWMpKyIiKTthLnNjcmVlbj1mbkJyb3dzZXJTY3JlZW4oKTtjPWZuR2V0VGltZSgpO2QucHVzaCgoYy1mKSsiIik7YS5sYW5ndWFnZT1mbkJyb3dzZXJMYW5ndWFnZSgpO2Y9Zm5HZXRUaW1lKCk7ZC5wdXNoKChmLWMpKyIiKTthLmZvbnRzPWZuQnJvd3NlckZvbnRzT2xkKCk7Yz1mbkdldFRpbWUoKTtkLnB1c2goKGMtZikrIiIpO2EucGx1Z2lucz1mbkJyb3dzZXJQbHVnaW5zT2xkKCk7Zj1mbkdldFRpbWUoKTtkLnB1c2goKGYtYykrIiIpO2EuY29va2llRW5hYmxlZD1mbkJyb3dzZXJDb29raWVFbmFibGVkKCk7Yz1mbkdldFRpbWUoKTtkLnB1c2goKGMtZikrIiIpO2EuamF2YUVuYWJsZWQ9Zm5Ccm93c2VySmF2YUVuYWJsZWQoKTtmPWZuR2V0VGltZSgpO2QucHVzaCgoZi1jKSsiIik7YS50b3VjaEVuYWJsZWQ9Zm5Ccm93c2VyVG91Y2hFbmFibGVkKCk7Yz1mbkdldFRpbWUoKTtkLnB1c2goKGMtZikrIiIpO2Euc2lsdmVyTGlnaHQ9Zm5Ccm93c2VyU2lsdmVyTGlnaHREZXRhaWxzKCk7Zj1mbkdldFRpbWUoKTtkLnB1c2goKGYtYykrIiIpO2EuZmxhc2g9Zm5Ccm93c2VyRmxhc2hEZXRhaWxzKCk7Yz1mbkdldFRpbWUoKTtkLnB1c2goKGMtZikrIiIpO2EuY2FudmFzPWZuQnJvd3NlckNhbnZhc0hhc2goKTtmPWZuR2V0VGltZSgpO2QucHVzaCgoZi1jKSsiIik7YS50cnVlQnJvd3Nlcj1mbkJyb3dzZXJUcnVlQWdlbnQoKTtjPWZuR2V0VGltZSgpO2QucHVzaCgoYy1mKSsiIik7dmFyIGg9SlNPTi5zdHJpbmdpZnkoYSk7YS50Y249Zm5UQ04oYikrIiI7Zj1mbkdldFRpbWUoKTtkLnB1c2goKGYtYykrIiIpO2EuYnJvd3Nlcj1mbkJyb3dzZXJJbmZvKCk7Yz1mbkdldFRpbWUoKTtkLnB1c2goKGMtZikrIiIpO2Euc3lzdGVtPWZuQnJvd3NlclN5c3RlbUluZm8oKTtmPWZuR2V0VGltZSgpO2QucHVzaCgoZi1jKSsiIik7YS5jb25uZWN0aW9uSW5mbz1mbkJyb3dzZXJDb25uZWN0aW9uSW5mbygpO2M9Zm5HZXRUaW1lKCk7ZC5wdXNoKChjLWYpKyIiKTthLmxhdGVuY3k9Zm5Ccm93c2VyTGF0ZW5jeSgpO2Y9Zm5HZXRUaW1lKCk7ZC5wdXNoKChmLWMpKyIiKTthLmZvcm1GaWVsZHM9Zm5Ccm93c2VyRm9ybUZpZWxkcygpO2M9Zm5HZXRUaW1lKCk7ZC5wdXNoKChjLWYpKyIiKTthLnZlcnNpb249Zm5Ccm93c2VyRGV2aWNlUHJpbnRWZXJzaW9uKCk7Zj1mbkdldFRpbWUoKTtkLnB1c2goKGYtYykrIiIpO2EudGltZXN0YW1wPWI7Yz1mbkdldFRpbWUoKTtkLnB1c2goKGMtZikrIiIpO2EuY2hlY2tzdW09Zm5DU00oaCk7Zj1mbkdldFRpbWUoKTtkLnB1c2goKGYtYykrIiIpO2QucHVzaCgoZi1pKSsiIik7YS5ydD1kO3ZhciBnPWZuQjY0RW5jKEpTT04uc3RyaW5naWZ5KGEpKTt2YXIgZT1lbmNvZGVVUklDb21wb25lbnQoZykucmVwbGFjZSgvXH4vZywiJTdFIikucmVwbGFjZSgvXCEvZywiJTIxIikucmVwbGFjZSgvXCovZywiJTJBIikucmVwbGFjZSgvXCgvZywiJTI4IikucmVwbGFjZSgvXCkvZywiJTI5IikucmVwbGFjZSgvXCcvZywiJTI3IikucmVwbGFjZSgvXC0vZywiJTJEIikucmVwbGFjZSgvXF8vZywiJTVGIikucmVwbGFjZSgvXC4vZywiJTJFIik7cmV0dXJuIGV9ZnVuY3Rpb24gZm5HZXRUaW1lKCl7cmV0dXJuKG5ldyBEYXRlKCkpLmdldFRpbWUoKX1mdW5jdGlvbiBmbkNTTShhKXt2YXIgYzt0cnl7Yz1TaGEyNTYuaGFzaChhKX1jYXRjaChiKXt9cmV0dXJuIGN9ZnVuY3Rpb24gbWF0aEV2YWwoYixnKXt2YXIgYSxjLGU9MCxmPTA7dHJ5e2lmKGI9PT11bmRlZmluZWR8fGI9PT1udWxsKXtyZXR1cm4gMX1hPWIuc3BsaXQoZyk7aWYoYT09PXVuZGVmaW5lZHx8YT09PW51bGx8fGEubGVuZ3RoPDEpe3JldHVybiAxfXRyeXtlPXBhcnNlSW50KGFbMF0pO2lmKGlzTmFOKGUpKXtlPTB9fWNhdGNoKGQpe2U9MH1mb3IoYz0xO2M8YS5sZW5ndGg7YysrKXt0cnl7Zj1wYXJzZUludChhW2NdKTtpZihpc05hTihmKSl7Zj0wfX1jYXRjaChkKXtmPTB9aWYoZz09IisiKXtlPWUrZn1lbHNle2lmKGc9PSItIil7ZT1lLWZ9fX1yZXR1cm4gZX1jYXRjaChkKXtyZXR1cm4gMX19ZnVuY3Rpb24gZm5UQ04oYSl7dmFyIGUsZCxiPTE7dHJ5e2lmKGE9PT11bmRlZmluZWR8fGE9PT1udWxsKXthPSIifWU9bWF0aEV2YWwoYS5yZXBsYWNlKC9bXHRcclxuXHZcZiEiXCMkJSYnKCkqKyxcLS4vOjs8PT4/QFxbXFxcXV5fYHt8fX4gMGEtekEtWl18Xig/IVtcc1xTXSkvZ2ksIis5IikucmVwbGFjZSgvXCt7Mix9L2dpLCIrIikucmVwbGFjZSgvXlwrKnxcKyokfFteXGQrXS9naSwiIiksIisiKTtpZihlJTM9PTEpe2Q9ZSsiKyIrKGUrIiIpLnNwbGl0KCIiKS5qb2luKCIrIik7Yj1tYXRoRXZhbChkLCIrIil9ZWxzZXtpZihlJTM9PTIpe2Q9ZSsiLSIrKGUrIiIpLnNwbGl0KCIiKS5qb2luKCItIik7Yj1tYXRoRXZhbChkLCItIil9ZWxzZXtiPWV9fX1jYXRjaChjKXtiPS0xfXJldHVybiBiKyIifWlmKHR5cGVvZiBPYmplY3QuYXNzaWduIT0iZnVuY3Rpb24iKXtPYmplY3QuYXNzaWduPWZ1bmN0aW9uKGQpe2lmKGQ9PW51bGwpe3Rocm93IG5ldyBUeXBlRXJyb3IoIkNhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCIpfWQ9T2JqZWN0KGQpO2Zvcih2YXIgYT0xO2E8YXJndW1lbnRzLmxlbmd0aDthKyspe3ZhciBjPWFyZ3VtZW50c1thXTtpZihjIT1udWxsKXtmb3IodmFyIGIgaW4gYyl7aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGMsYikpe2RbYl09Y1tiXX19fX1yZXR1cm4gZH19dmFyIFNoYTI1Nj17fTtTaGEyNTYuaGFzaD1mdW5jdGlvbihxLHApe3ZhciB2PXttc2dGb3JtYXQ6InN0cmluZyIsb3V0Rm9ybWF0OiJoZXgifTt2YXIgbT1PYmplY3QuYXNzaWduKHYscCk7c3dpdGNoKG0ubXNnRm9ybWF0KXtkZWZhdWx0OmNhc2Uic3RyaW5nIjpxPVNoYTI1Ni51dGY4RW5jb2RlKHEpO2JyZWFrO2Nhc2UiaGV4LWJ5dGVzIjpxPVNoYTI1Ni5oZXhCeXRlc1RvU3RyaW5nKHEpO2JyZWFrfXZhciB1PVsxMTE2MzUyNDA4LDE4OTk0NDc0NDEsMzA0OTMyMzQ3MSwzOTIxMDA5NTczLDk2MTk4NzE2MywxNTA4OTcwOTkzLDI0NTM2MzU3NDgsMjg3MDc2MzIyMSwzNjI0MzgxMDgwLDMxMDU5ODQwMSw2MDcyMjUyNzgsMTQyNjg4MTk4NywxOTI1MDc4Mzg4LDIxNjIwNzgyMDYsMjYxNDg4ODEwMywzMjQ4MjIyNTgwLDM4MzUzOTA0MDEsNDAyMjIyNDc3NCwyNjQzNDcwNzgsNjA0ODA3NjI4LDc3MDI1NTk4MywxMjQ5MTUwMTIyLDE1NTUwODE2OTIsMTk5NjA2NDk4NiwyNTU0MjIwODgyLDI4MjE4MzQzNDksMjk1Mjk5NjgwOCwzMjEwMzEzNjcxLDMzMzY1NzE4OTEsMzU4NDUyODcxMSwxMTM5MjY5OTMsMzM4MjQxODk1LDY2NjMwNzIwNSw3NzM1Mjk5MTIsMTI5NDc1NzM3MiwxMzk2MTgyMjkxLDE2OTUxODM3MDAsMTk4NjY2MTA1MSwyMTc3MDI2MzUwLDI0NTY5NTYwMzcsMjczMDQ4NTkyMSwyODIwMzAyNDExLDMyNTk3MzA4MDAsMzM0NTc2NDc3MSwzNTE2MDY1ODE3LDM2MDAzNTI4MDQsNDA5NDU3MTkwOSwyNzU0MjMzNDQsNDMwMjI3NzM0LDUwNjk0ODYxNiw2NTkwNjA1NTYsODgzOTk3ODc3LDk1ODEzOTU3MSwxMzIyODIyMjE4LDE1MzcwMDIwNjMsMTc0Nzg3Mzc3OSwxOTU1NTYyMjIyLDIwMjQxMDQ4MTUsMjIyNzczMDQ1MiwyMzYxODUyNDI0LDI0Mjg0MzY0NzQsMjc1NjczNDE4NywzMjA0MDMxNDc5LDMzMjkzMjUyOThdO3ZhciB3PVsxNzc5MDMzNzAzLDMxNDQxMzQyNzcsMTAxMzkwNDI0MiwyNzczNDgwNzYyLDEzNTk4OTMxMTksMjYwMDgyMjkyNCw1Mjg3MzQ2MzUsMTU0MTQ1OTIyNV07cSs9U3RyaW5nLmZyb21DaGFyQ29kZSgxMjgpO3ZhciBBPXEubGVuZ3RoLzQrMjt2YXIgcj1NYXRoLmNlaWwoQS8xNik7dmFyIHM9bmV3IEFycmF5KHIpO2Zvcih2YXIgQz0wO0M8cjtDKyspe3NbQ109bmV3IEFycmF5KDE2KTtmb3IodmFyIEI9MDtCPDE2O0IrKyl7c1tDXVtCXT0ocS5jaGFyQ29kZUF0KEMqNjQrQio0KTw8MjQpfChxLmNoYXJDb2RlQXQoQyo2NCtCKjQrMSk8PDE2KXwocS5jaGFyQ29kZUF0KEMqNjQrQio0KzIpPDw4KXwocS5jaGFyQ29kZUF0KEMqNjQrQio0KzMpKX19dmFyIEY9KChxLmxlbmd0aC0xKSo4KS9NYXRoLnBvdygyLDMyKTt2YXIgaz0oKHEubGVuZ3RoLTEpKjgpPj4+MDtzW3ItMV1bMTRdPU1hdGguZmxvb3IoRik7c1tyLTFdWzE1XT1rO2Zvcih2YXIgQz0wO0M8cjtDKyspe3ZhciBuPW5ldyBBcnJheSg2NCk7Zm9yKHZhciB5PTA7eTwxNjt5Kyspe25beV09c1tDXVt5XX1mb3IodmFyIHk9MTY7eTw2NDt5Kyspe25beV09KFNoYTI1Ni5nMShuW3ktMl0pK25beS03XStTaGEyNTYuZzAoblt5LTE1XSkrblt5LTE2XSk+Pj4wfXZhciBQPXdbMF0sTz13WzFdLEw9d1syXSxKPXdbM10sST13WzRdLEc9d1s1XSxFPXdbNl0sRD13WzddO2Zvcih2YXIgeT0wO3k8NjQ7eSsrKXt2YXIgej1EK1NoYTI1Ni5lMShJKStTaGEyNTYuQ2goSSxHLEUpK3VbeV0rblt5XTt2YXIgeD1TaGEyNTYuZTAoUCkrU2hhMjU2Lk1haihQLE8sTCk7RD1FO0U9RztHPUk7ST0oSit6KT4+PjA7Sj1MO0w9TztPPVA7UD0oeit4KT4+PjB9d1swXT0od1swXStQKT4+PjA7d1sxXT0od1sxXStPKT4+PjA7d1syXT0od1syXStMKT4+PjA7d1szXT0od1szXStKKT4+PjA7d1s0XT0od1s0XStJKT4+PjA7d1s1XT0od1s1XStHKT4+PjA7d1s2XT0od1s2XStFKT4+PjA7d1s3XT0od1s3XStEKT4+PjB9Zm9yKHZhciBEPTA7RDx3Lmxlbmd0aDtEKyspe3dbRF09KCIwMDAwMDAwMCIrd1tEXS50b1N0cmluZygxNikpLnNsaWNlKC04KX12YXIgbz1tLm91dEZvcm1hdD09ImhleC13Ij8iICI6IiI7cmV0dXJuIHcuam9pbihvKX07U2hhMjU2LlJPVFI9ZnVuY3Rpb24oYixhKXtyZXR1cm4oYT4+PmIpfChhPDwoMzItYikpfTtTaGEyNTYuZTA9ZnVuY3Rpb24oYSl7cmV0dXJuIFNoYTI1Ni5ST1RSKDIsYSleU2hhMjU2LlJPVFIoMTMsYSleU2hhMjU2LlJPVFIoMjIsYSl9O1NoYTI1Ni5lMT1mdW5jdGlvbihhKXtyZXR1cm4gU2hhMjU2LlJPVFIoNixhKV5TaGEyNTYuUk9UUigxMSxhKV5TaGEyNTYuUk9UUigyNSxhKX07U2hhMjU2LmcwPWZ1bmN0aW9uKGEpe3JldHVybiBTaGEyNTYuUk9UUig3LGEpXlNoYTI1Ni5ST1RSKDE4LGEpXihhPj4+Myl9O1NoYTI1Ni5nMT1mdW5jdGlvbihhKXtyZXR1cm4gU2hhMjU2LlJPVFIoMTcsYSleU2hhMjU2LlJPVFIoMTksYSleKGE+Pj4xMCl9O1NoYTI1Ni5DaD1mdW5jdGlvbihhLGMsYil7cmV0dXJuKGEmYyleKH5hJmIpfTtTaGEyNTYuTWFqPWZ1bmN0aW9uKGEsYyxiKXtyZXR1cm4oYSZjKV4oYSZiKV4oYyZiKX07U2hhMjU2LnV0ZjhFbmNvZGU9ZnVuY3Rpb24oYSl7cmV0dXJuIHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChhKSl9O1NoYTI1Ni5oZXhCeXRlc1RvU3RyaW5nPWZ1bmN0aW9uKGIpe2I9Yi5yZXBsYWNlKCIgIiwiIik7dmFyIGM9IiI7Zm9yKHZhciBhPTA7YTxiLmxlbmd0aDthKz0yKXtjKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGIuc2xpY2UoYSxhKzIpLDE2KSl9cmV0dXJuIGN9O2lmKHR5cGVvZiBtb2R1bGUhPSJ1bmRlZmluZWQiJiZtb2R1bGUuZXhwb3J0cyl7bW9kdWxlLmV4cG9ydHM9U2hhMjU2fTs='
  )
);
