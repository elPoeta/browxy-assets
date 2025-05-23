var tiposat,
  lastdatetime,
  defaults,
  maxsatfreq,
  saveaoslosid,
  sunlon,
  sunlat,
  adjust,
  zx1,
  zy1,
  zl1,
  zx2,
  zy2,
  zl2,
  zx3,
  zy3,
  zl3,
  zx4,
  zy4,
  zl4,
  satelitename,
  satazimuth,
  satelevation,
  dlink,
  ulink,
  beacon,
  muplink,
  mdolink,
  mbeacon,
  doppler_factor,
  satselected,
  recoversat,
  sattochange,
  popup,
  tt,
  add,
  del,
  newcycle,
  popupwin,
  popupwi,
  flash,
  xmlHttp,
  ventana,
  bip = !0,
  birdsw = !0;
rotorsw = !0;
for (
  var localtime = !0,
    tiposel = 5,
    deltaminutes = 0,
    bipset = !1,
    localat = "0",
    localon = "0",
    savesatid = "",
    prevsatid = "",
    saveclickid = "",
    dir = "",
    lastrange = 0,
    speedc = 299792.458,
    satfreq = [],
    x = 0;
  x < 30;
  x++
) {
  satfreq[x] = [];
  for (var y = 0; y < 30; y++) satfreq[x][y] = x * y;
}
var satfreqpointer = 0,
  slant_range_new = [],
  slant_range_old = [],
  icons = [],
  aostime = [],
  aostt = [],
  lostt = [],
  delta = new MakeArray(0),
  displacement = new MakeArray(0),
  selsatsave = [],
  satactivity = "",
  firstclick = !0,
  autoclick = !1,
  aumento = 1,
  errorMsg = "",
  lineNumber = "",
  url = "",
  leyen = "",
  tablelasttime = new Date(),
  zoom = 1,
  timespan = 864e5 / 2.3,
  shorttimespan = 3456e4,
  longtimespan = 3456e5,
  wispmode = "bn",
  wispazimuth = 0,
  wispelevation = 0,
  dir = "&#x25BC;",
  uldeltad = 0,
  dldeltad = 0,
  bndeltad = 0,
  savebox = "",
  borrarbox = !0,
  DopplerchangeUplink = !0,
  DopplerchangeDownlink = !0,
  refresh = !0,
  selectoptions =
    "<option value=0>CW</option><option value=1>LSB</option><option value=2>USB</option><option value=3>FM</option><option value=4>FM-N</option><option value=5>FM-W</option><option value=6>AM</option><option value=7>CW-N</option><option value=7>CW-R</option><option value=7>DIG</option><option value=8>PKT</option>",
  vbasic = !1,
  dshow = "",
  birds = "",
  zoom = "1",
  order = 1,
  sortm = [],
  tiposatswitch = !1,
  dst = 0,
  indst = !1,
  dstinfo = "",
  warntoken = 0,
  vbasice = !1,
  elevationset = 0,
  eleva = 0,
  azisw = "&nbsp;N&nbsp;",
  progsw = "&nbsp;N&nbsp;",
  wispextra = "",
  dateset = !1,
  yellowcount = 0,
  losMeses = "EneFebMarAbrMayJunJulAgoSetOctNovDic",
  birdhelp =
    "<a href='#' title='Click for additional\nfrequency changes' onclick='if(vbasice){vbasice=false}else{vbasice=true}'>Zoom</a><br><a href=# onclick=\"changeorder();\" title=\"- Change Order -&#13 0: By AGE asc.&#13 1: By NAME asc.&#13 2: By NAME desc&#13 3: By AGE desc\" style=\"color:#00ffff;cursor:pointer;\">Sort";
(help =
  '<center><a href="#english" onclick="document.getElementById(\'lenguaje\').innerHTML=english">English</a>&nbsp;&nbsp;'),
  (help +=
    '<a href="#espanol" onclick="document.getElementById(\'lenguaje\').innerHTML=espanol">Espa&ntilde;ol</a>&nbsp;&nbsp;'),
  (help +=
    '<a href="#portugues" onclick="document.getElementById(\'lenguaje\').innerHTML=portugues">Portugu&eacute;s</a>&nbsp;&nbsp;'),
  (help +=
    '<a href="#deutsche" onclick="document.getElementById(\'lenguaje\').innerHTML=deutsche">Deutsch</a>&nbsp;&nbsp;'),
  (help +=
    '<a href="#italiano" onclick="document.getElementById(\'lenguaje\').innerHTML=italiano">Italiano</a>&nbsp;&nbsp;'),
  (help +=
    '<a href="#frances" onclick="document.getElementById(\'lenguaje\').innerHTML=frances">Fran&ccedil;ais</a>&nbsp;&nbsp;'),
  (help +=
    '<a href="#russian" onclick="document.getElementById(\'lenguaje\').innerHTML=russian">Russian</a>&nbsp;&nbsp;'),
  (help +=
    '<a href="#turkish" onclick="document.getElementById(\'lenguaje\').innerHTML=turkish">Turkish</a>&nbsp;&nbsp;'),
  (help +=
    '<a href="#chinesse" onclick="document.getElementById(\'lenguaje\').innerHTML=chinesse">Chinese</a>&nbsp;&nbsp;'),
  (help +=
    '<a href="#japanese" onclick="document.getElementById(\'lenguaje\').innerHTML=japanese">Japanese</a></center><br>\n'),
  (window.name = "pass");
var enchat = "",
  rando = ("00" + Math.floor(100 * Math.random())).slice(-2),
  iconos = [
    "saticon5.gif",
    "saticon4.gif",
    "saticon2.gif",
    "saticon3.gif",
    "satnoa.gif",
    "iss.gif",
    "mon.gif",
    "saticony.gif",
    "unknown.gif",
  ];
if (
  ((document.onkeydown = function (e) {
    27 != (e = e || window.event).keyCode ||
      firstclick ||
      onlysat(PLib.sat[savesatid - 1].name);
  }),
  (window.onerror = function (e, a, l) {
    alert("Error: " + e + " Script: " + a + " Line: " + l);
  }),
  -1 != window.navigator.userAgent.indexOf("Android 2.3.6"))
)
  var graficos = !1;
else var graficos = !0;
-1 == window.navigator.userAgent.indexOf("iPhone") ||
  gqs("locator") ||
  alert(
    "  To use Pass with iPhone, start with:\r\nhttp://amsat.org.ar/pass?locator=xxxxxx\r\n  Using your own locator for xxxxxx",
  ),
  -1 == window.navigator.userAgent.indexOf("iPad") ||
    gqs("locator") ||
    alert(
      "  To use Pass with iPad, start with:\r\nhttp://amsat.org.ar/pass?locator=xxxxxx\r\n  Using your own locator for xxxxxx",
    );
var isChrome =
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
  isOpera =
    window.navigator.userAgent.indexOf("OPR") > -1 ||
    window.navigator.userAgent.indexOf("Opera") > -1;
if (isChrome || isOpera) var NavAdj = 19;
else NavAdj = 19;
gqs("localat") && gqs("localon")
  ? (isNumeric((localat = gqs("localat"))) || (localat = 0),
    isNumeric((localon = gqs("localon"))) || (localon = 0))
  : (loadMapState(),
    localat || "Microsoft Internet Explorer" == navigator.appName || getip(),
    localat ||
      ((localat = "-34.5696"),
      (localon = "-58.4581"),
      (satactivity += "LocBad/"),
      alert(
        "Home Location Set to default\nClick Locator to fix and\nAllow Cookies to Save\n\n Click OK to Continue..",
      ))),
  isNumeric(localon) || (localon = 0),
  isNumeric(localat) || (localat = 0),
  ((0 == localat && 0 == localon) ||
    (-34.5696 == localat && -58.4581 == localon) ||
    (35.3841 == localat && 139.6101 == localon) ||
    (35.3841 == localat && 0 == localon) ||
    (-34.5696 == localat && -58.4581 == localon)) &&
    ((satactivity += "LocBad/"),
    alert(
      "Home Location Set to default\nClick Locator to fix and\nAllow Cookies to Save\n\n Click OK to Continue..",
    )),
  (Date.prototype.addHours = function (e) {
    return this.setHours(this.getHours() + e), this;
  }),
  (husohoras = new Date().getTimezoneOffset() / 60);
var ahora = new Date().addHours(husohoras),
  ahora = ahora.addHours(-3);
function poneimg(e) {
  "" != e && birdsw
    ? ((e = e.replace(/ /, "")),
      (document.getElementById("satimage").innerHTML =
        "<img class=disp src='https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/sat" +
        e +
        ".gif'>"))
    : (document.getElementById("satimage").innerHTML = "");
}
function cambiofecha() {
  isNumeric(
    (nuevafecham = (nuevafecha = (nuevafecha = (nuevafecha =
      document.tstest.timestamp.value).replace(/-/g, " ")).replace(
      /:/g,
      " ",
    )).split(" "))[3],
  ) &&
  isNumeric(nuevafecham[4]) &&
  isNumeric(nuevafecham[5]) &&
  1 * nuevafecham[3] > -1 &&
  1 * nuevafecham[3] < 25 &&
  1 * nuevafecham[4] > -1 &&
  1 * nuevafecham[4] < 60 &&
  1 * nuevafecham[5] > -1 &&
  1 * nuevafecham[5] < 60
    ? (MockDate.set(
        new Date(
          nuevafecham[2],
          1 * nuevafecham[1] - 1,
          nuevafecham[0],
          nuevafecham[3],
          nuevafecham[4],
          nuevafecham[5],
        ),
      ),
      (dateset = !0),
      (satactivity =
        satactivity +
        "CALE" +
        ("0" + 1 * nuevafecham[1]).slice(-2) +
        ("0" + nuevafecham[0]).slice(-2) +
        ("0" + nuevafecham[3]).slice(-2) +
        ("0" + nuevafecham[4]).slice(-2) +
        "/"),
      dateset &&
        ((document.getElementById("changedate").style.left = "190px"),
        (document.getElementById("cal").style.width = "52px")),
      Orb.generateTable(document.getElementById("passes")),
      (tablelasttime = new Date()),
      (document.getElementById("Div1").innerHTML = ""),
      (document.getElementById("Div1").innerHTML =
        "Next passes at your location. Starting at " +
        tablelasttime.toTimeString()))
    : alert(document.tstest.timestamp.value + " > Correct Time");
}
function show_calendar(e, a) {
  var l = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    c = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    u = 0,
    g = null == a || "" == a ? new Date() : str2dt(a),
    b = new Date(g);
  b.setMonth(g.getMonth() - 1);
  var $ = new Date(g);
  $.setMonth(g.getMonth() + 1);
  var y = new Date(g);
  y.setDate(1),
    y.setDate(1 - ((7 + y.getDay() - u) % 7)),
    new Date($).setDate(0);
  var _ = new String(
      '<html>\n<head>\n	<title>Calendar</title>\n</head>\n<body style="margin-top:0px;margin-bottom:0px;margin-left:0px;margin-right:0px;overflow-x:hidden;" bgcolor="#87CEFA">\n<table class="clsOTable" cellspacing="0" cellpadding="0" border="0" width="100%">\n<tr><td bgcolor="#4682B4">\n<table cellspacing="1" cellpadding="3" border="0" width="100%">\n<tr>\n	<td bgcolor="#4682B4"><a href="javascript:window.opener.show_calendar(\'' +
        e +
        "', '" +
        dt2dtstr(b) +
        '\'+document.cal.time.value);"><img src="https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/prev.gif" width="16" height="16" border="0" alt="previous month"></a></td>\n	<td align="center" bgcolor="#4682B4" colspan="5"><font color="white" face="tahoma, verdana" size="3">' +
        l[g.getMonth()] +
        " " +
        g.getFullYear() +
        '</font></td>\n	<td bgcolor="#4682B4" align="right"><a href="javascript:window.opener.show_calendar(\'' +
        e +
        "', '" +
        dt2dtstr($) +
        '\'+document.cal.time.value);"><img src="https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/next.gif" width="16" height="16" border="0" alt="next month"></a></td>\n</tr>\n',
    ),
    w = new Date(y);
  _ += "<tr>\n";
  for (var E = 0; E < 7; E++)
    _ +=
      '	<td align="center" bgcolor="#87CEFA"><font color="white" style="font-weight:bold;" face="tahoma, verdana" size="2">' +
      c[(u + E) % 7] +
      "</font></td>\n";
  for (
    _ += "</tr>\n";
    w.getMonth() == g.getMonth() || w.getMonth() == y.getMonth();

  ) {
    _ += "<tr>\n";
    for (var S = 0; S < 7; S++)
      w.getDate() == g.getDate() && w.getMonth() == g.getMonth()
        ? (_ += '	<td bgcolor="#FFB6C1" align="center">')
        : 0 == w.getDay() || 6 == w.getDay()
          ? (_ += '	<td bgcolor="#DBEAF5" align="center">')
          : (_ += '	<td bgcolor="white" align="center">'),
        w.getMonth() == g.getMonth()
          ? (_ +=
              '<a href="javascript:window.opener.' +
              e +
              ".value='" +
              dt2dtstr(w) +
              '\'+document.cal.time.value; window.opener.cambiofecha(); window.close();"><font color="black" face="tahoma, verdana" size="2">')
          : (_ +=
              '<a href="javascript:window.opener.' +
              e +
              ".value='" +
              dt2dtstr(w) +
              '\'+document.cal.time.value; window.opener.cambiofecha(); window.close();"><font color="gray" face="tahoma, verdana" size="2">'),
        (_ += w.getDate() + "</font></a></td>\n"),
        w.setDate(w.getDate() + 1);
    _ += "</tr>\n";
  }
  (_ +=
    '<script language=javascript type=text/javascript>ff=new Date();savetime=(\'0\'+ff.getHours()).slice(-2)+\':\'+(\'0\'+ff.getMinutes()).slice(-2)+\':00\';function checknumeric(valor){oldvalue=valor;valor=valor.replace(/:/g,\'\');if(!opener.isNumeric(valor)){alert(\'Invalid Time\\n\'+oldvalue+\'\\n..Reenter..\');document.getElementById(\'time\').value=savetime;};}<\/script><form name="cal" style="margin-bottom:0;margin-top:0;">\n<tr style="border-color:#ffffff;border-width:0px;"><td align="center" style="border-color:#ffffff;border-width:0px;" colspan="7" bgcolor="#87CEFA"><font color="White" face="tahoma, verdana" size="3">Time: <input type="text" id="time" name="time" value="' +
    dt2tmstr(g) +
    '" size="6" onchange="checknumeric(this.value);" style="text-align:center;" maxlength="8"></font>&nbsp;<input type=button style="borde-style:outset;border-width:2px;border-color:#999999;" id="salir" name="salir" onclick="opener.MockDate.reset();opener.Orb.generateTable(opener.document.getElementById(\'passes\'));opener.tablelasttime = new(Date);opener.dateset=false;opener.document.getElementById(\'changedate\').style.left=\'211px\';opener.document.getElementById(\'cal\').style.width=\'16px\';opener.satactivity=opener.satactivity+\'CALERESET/\';self.close();" value=Reset></td></tr>\n</form>\n</table>\n</tr>\n</td>\n</table><font color="White" face="tahoma, verdana" size="3"><center>Set Time & Click Day</center></font></body>\n</html>\n'),
    (altura = navigator.userAgent.match(/Opera|OPR\//) ? "328" : "236");
  var I = window.open(
    "",
    "Calendar",
    "width=200,height=" +
      altura +
      ",status=no,resizable=no,top=200,left=200,dependent=yes,z-lock=yes,directories=0,titlebar=no,toolbar=no,scrollbars=no,location=0,status=0,menubar=no",
  );
  I.setTimeout("document.getElementById('salir').click()", 18e4);
  var T = I.document;
  T.write(_), T.close();
}
function str2dt(e) {
  return /^(\d+)\-(\d+)\-(\d+)\s+(\d+)\:(\d+)\:(\d+)$/.exec(e)
    ? new Date(
        RegExp.$3,
        RegExp.$2 - 1,
        RegExp.$1,
        RegExp.$4,
        RegExp.$5,
        RegExp.$6,
      )
    : alert("Invalid Datetime format: " + e);
}
function dt2dtstr(e) {
  return new String(
    e.getDate() + "-" + (e.getMonth() + 1) + "-" + e.getFullYear() + " ",
  );
}
function dt2tmstr(e) {
  return new String(
    ("0" + e.getHours()).slice(-2) +
      ":" +
      ("0" + e.getMinutes()).slice(-2) +
      ":" +
      ("0" + e.getSeconds()).slice(-2),
  );
}
function printpr() {
  (satactivity += "Print/"), window.print();
}
(DiayMes =
  losMeses.substring(3 * ahora.getMonth(), 3 * ahora.getMonth() + 3) +
  "-" +
  ("0" + ahora.getDate()).slice(-2) +
  " "),
  (hora = 10 > ahora.getHours() ? "0" + ahora.getHours() : ahora.getHours()),
  (horainicio =
    DiayMes +
    hora +
    ":" +
    (min =
      10 > ahora.getMinutes() ? "0" + ahora.getMinutes() : ahora.getMinutes())),
  "-" != (huso = (-1 * husohoras).toString()).substring(0, 1) &&
    (huso = "%2B" + huso),
  ((Image0 = new Image(20, 18)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/printicon.gif"),
  ((Image1 = new Image(540, 270)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/world1.jpg"),
  ((Image2 = new Image(22, 22)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/speakeron.gif"),
  ((Image3 = new Image(22, 22)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/speakeroff.gif"),
  ((Image4 = new Image(24, 24)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/home.gif"),
  ((Image5 = new Image(36, 24)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/mon.gif"),
  ((Image6 = new Image(19, 11)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/sun1.gif"),
  ((Image7 = new Image(36, 24)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/satnoa.gif"),
  ((Image8 = new Image(36, 24)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/aticon2.gif"),
  ((Image9 = new Image(36, 24)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/saticon3.gif"),
  ((Image10 = new Image(36, 24)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/iss.gif"),
  ((Image11 = new Image(36, 24)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/saticon4.gif"),
  ((Image12 = new Image(36, 24)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/saticony.gif"),
  ((Image13 = new Image(36, 24)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/unknown.gif"),
  ((Image14 = new Image(118, 19)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/box.gif"),
  ((Image15 = new Image(16, 16)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/favicon.gif"),
  ((Image16 = new Image(128, 128)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/cal.gif"),
  ((Image17 = new Image(22, 22)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/birdon.gif"),
  ((Image18 = new Image(22, 22)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/birdoff.gif"),
  ((Image19 = new Image(200, 186)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/ft.gif"),
  ((Image20 = new Image(180, 180)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/arrow.jpg"),
  ((Image21 = new Image(170, 60)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/bubble.gif"),
  ((Image22 = new Image(24, 18)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/mail.gif"),
  ((Image23 = new Image(810, 405)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/world1.5.jpg"),
  ((Image24 = new Image(22, 22)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/chat.gif"),
  ((Image26 = new Image(54, 16)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/donate.gif"),
  ((Image27 = new Image(16, 16)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/chati.gif"),
  ((Image28 = new Image(190, 88)).src =
    "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/et.gif");
var Orb = {
  satelliteMarkers: [],
  startTracking: function (e, a, l) {
    (Orb.map = e),
      Orb.crossBrowserSetStyle(
        e,
        "background-image: url(https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/world" +
          zoom +
          ".jpg); background-position: 0 0; overflow: hidden;",
        !0,
      );
    var c = document.createDocumentFragment(),
      u = document.createElement("div");
    (u.id = "home"),
      Orb.crossBrowserSetStyle(
        u,
        "position:relative; cursor:pointer; width: 24px; height: 24px; background-image: url(https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/home.gif); z-index: 2;",
        !1,
      ),
      (u.alt =
        "Your Location\nGrid: " +
        document.wwl.loc.value +
        "\n To change\nClick Locator"),
      (u.title =
        "Your Location\nGrid: " +
        document.wwl.loc.value +
        "\n To change\nClick Locator"),
      (u.onclick = function () {
        alert(
          "Your Location Grid: " +
            document.wwl.loc.value +
            "    \n To change: Click Locator    ",
        ),
          (savesatid = ""),
          (document.getElementById("graphics").innerHTML =
            '<img src="https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/arrow.jpg" border=2 style="border-color:#ffffff;width:180px;height:180px;border-radius: 6px 6px 6px 6px;" width=180 height=180 title="Tracking satellites" alt="Tracking satellites">'),
          (document.getElementById("trackingdata").innerHTML =
            '<center>Click <img src=saticon2.gif border=0 width="25px" style="width:25px;"> Satellite<br>To see Az/El/Freq<br>Click <a href=#change><img src="https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/home.gif" title="Click to change Grid Locator" width=18px height="18px" border=0 style="width:18px;height:18px;"></a> to set QTH</center>'),
          (document.getElementById("azel").innerHTML = ""),
          (document.getElementById("uplinkdownlink").style.top = "268px");
      }),
      c.appendChild(u),
      Orb.map.appendChild(c),
      (Orb.home = document.getElementById("home")),
      PLib.InitializeData(),
      Orb.setHomeCoordinates(a, l),
      Orb.createSatelliteMarkers(),
      Orb.updateSatellites();
  },
  setHomeCoordinates: function (e, a) {
    PLib.configureGroundStation(e, a),
      1 == zoom
        ? ((Orb.home.style.top = (-e + 90) * 1.5 - 14 + "px"),
          (Orb.home.style.left = (parseInt(a) + 180) * 1.5 - 15 + "px"))
        : ((Orb.home.style.top = "121px"), (Orb.home.style.left = "255px")),
      getMapPosition(e, a, zoom),
      (document.getElementById("map").style.backgroundPosition =
        displacement.x + "px " + displacement.y + "px");
  },
  crossBrowserSetStyle: function (e, a, l) {
    var c,
      u,
      g = e.style.setAttribute;
    (c = g ? e.style : e),
      (u = g ? "cssText" : "style"),
      l && (a += c.getAttribute(u)),
      c.setAttribute(u, a);
  },
  createOneMarker: function (e, a) {
    var l = document.createDocumentFragment(),
      c = Orb.satelliteMarkers.length,
      u = document.createElement("div");
    for (
      u.id = "satelliteMarker" + c,
        navigator.onLine &&
          ((u.onmouseover = function () {
            "" != PLib.sat[a - 1].name &&
              birdsw &&
              (document.getElementById("satimage").innerHTML =
                '<img class="disp" src="https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/sat"' +
                PLib.sat[a - 1].name.toLowerCase().replace(/ /, "") +
                ".gif>");
          }),
          (u.onmouseout = function () {
            document.getElementById("satimage").innerHTML = "";
          })),
        u.onclick = function () {
          sh(a, "noclick"),
            (dir = ""),
            (savesatid = a),
            (satInfo = PLib.QuickFind(PLib.sat[a - 1].name)),
            (document.getElementById("trackingdata").innerHTML =
              "<center>" + PLib.sat[a - 1].azel + "</center>"),
            (lastrange = satInfo.slantRange),
            (lastdatetime = satInfo.dateTime),
            (satfreqpointer = 0),
            (satactivity = satactivity + PLib.sat[a - 1].name + "/"),
            (firstclick = !0),
            (document.getElementById("Logging").innerHTML =
              document.getElementById("Logging").innerHTML +
              PLib.sat[a - 1].name +
              "/"),
            (wispmode = "bn"),
            (uldeltad = 0),
            (dldeltad = 0),
            (bndeltad = 0),
            (mmdolink = ""),
            (mmuplink = ""),
            (mmbeacon = ""),
            (u.ondblclick = function () {
              (satactivity += "ONLY/"), onlysat(PLib.sat[a - 1].name);
            }),
            (adjust = 0),
            graficos && graficar(a);
          var e = 0,
            l = !1;
          for (f = 0; f < freq.length; f++)
            freq[f][0] == PLib.sat[a - 1].catnum &&
              ((satfreq[e][0] = freq[f][2]),
              (satfreq[e][1] = freq[f][3]),
              (satfreq[e][2] = freq[f][4]),
              (satfreq[e][3] = freq[f][5]),
              (satfreq[e][4] = freq[f][6]),
              (satfreq[e][5] = freq[f][7]),
              (satfreq[e][6] = freq[f][11]),
              (satfreq[e][7] = freq[f][12]),
              (satfreq[e][8] = freq[f][8]),
              (satfreq[e][9] = freq[f][9]),
              (satfreq[e][10] = freq[f][10]),
              (satselected = f),
              (e += 1),
              (l = !0));
          l ||
            ((satfreq[e][0] = ""),
            (satfreq[e][1] = ""),
            (satfreq[e][2] = ""),
            (satfreq[e][3] = ""),
            (satfreq[e][4] = ""),
            (satfreq[e][5] = ""),
            (satfreq[e][6] = ""),
            (satfreq[e][7] = ""),
            (satfreq[e][10] = ""),
            (leyen = "")),
            (maxsatfreq = e - 1),
            firstclick ||
              ((document.getElementById("bubble").innerHTML =
                "<br>&nbsp;&nbsp;" + PLib.sat[a - 1].name + " info Click"),
              (document.getElementById("bubble").style.visibility = "visible")),
            navigator.appName;
        },
        c == PLib.tleData.length && (c = 0),
        u.alt = PLib.tleData[c][3],
        u.title = PLib.tleData[c][3],
        seticon = "unknown.gif",
        k = 0;
      k < freq.length;
      k++
    )
      if (PLib.tleData[a - 1][1].substring(2, 7) === freq[k][0]) {
        seticon = iconos[freq[k][9]];
        break;
      }
    Orb.crossBrowserSetStyle(
      u,
      "position:absolute; cursor:pointer; width: 36px; height: 24px; z-index: 2; background-image: url(https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/" +
        seticon +
        ");",
      !1,
    ),
      (icons[a] = "url(" + seticon + ")");
    var g = document.createElement("div");
    "ISS" != e
      ? "TITA " != e && "AO-7 " != e
        ? Orb.crossBrowserSetStyle(
            g,
            "position:absolute; left: 0px; top: 6px;font-size:10px;font-family:Tahoma,Arial;font-weight:bold;white-space:nowrap;",
          )
        : Orb.crossBrowserSetStyle(
            g,
            "position:absolute; left: 4px; top: 6px;font-size:10px;font-family:Tahoma,Arial;font-weight:bold;white-space:nowrap;",
          )
      : Orb.crossBrowserSetStyle(
          g,
          "position:absolute; left: 9px; top: 6px;font-size:10px;font-family:Tahoma,Arial;font-weight:bold;white-space:nowrap;",
        );
    var e = document.createTextNode(e);
    g.appendChild(e),
      u.appendChild(g),
      l.appendChild(u),
      Orb.map.appendChild(l),
      (Orb.satelliteMarkers[c] = document.getElementById(u.id)),
      -1 != document.getElementById(u.id).innerHTML.indexOf("MOON") &&
        (document.getElementById(u.id).innerHTML = document
          .getElementById(u.id)
          .innerHTML.replace(/MOON/, ""));
  },
  createSatelliteMarkers: function () {
    (birds = birdhelp + 1 * order + "</a><br>"),
      (birdsb =
        "<a href='https://www.amsat.org/status/' target='_blank' title='See Active Sats' onclick=\"javascript:satactivity=satactivity+'LIVE/';\" style='color:cyan;'>Live?</a><br>");
    for (var e = 1; e <= PLib.sat.length; e++)
      Orb.createOneMarker(PLib.tleData[e - 1][0], e),
        "MOON " != PLib.tleData[e - 1][0] &&
          ((birds += newlink =
            "<a href=# id='sh" +
            e +
            "' onmouseout = \"poneimg('')\" onmouseover = \"poneimg('" +
            PLib.tleData[e - 1][0].toLowerCase() +
            "')\" onclick='sh(" +
            e +
            ")'>" +
            PLib.tleData[e - 1][0] +
            "</a><br>"),
          (sortm[e] =
            PLib.tleData[e - 1][0] +
            "," +
            PLib.tleData[e - 1][1].substring(2, 7) +
            "," +
            newlink));
    if (((birdsa = ""), (birdsm = birds.split("<br>")).length > 50)) {
      for (h = 0; h < Math.ceil(birdsm.length / 2); h++)
        birdsa = birdsa + birdsm[h] + "<br>";
      for (
        birdsb =
          "<a href='https://www.amsat.org/status/' target='_blank' title='See Active Sats' onclick=\"javascript:satactivity=satactivity+'LIVE/';\" style='color:cyan;'>Live?</a><br>",
          desde = Math.floor((birdsm.length / 2 + 1) * 1),
          hasta = 1 * birdsm.length,
          h = desde;
        h < hasta;
        h++
      )
        birdsb = birdsb + birdsm[h] + "<br>";
      (document.getElementById("birds").innerHTML = birdsa),
        (document.getElementById("birds1").innerHTML = birdsb);
    } else
      (document.getElementById("birds1").innerHTML =
        "<a href='https://www.amsat.org/status/' title='See Active Sats' title='See Active Sats' onclick=\"javascript:satactivity=satactivity+'LIVE/';\" target='_blank' style='color:cyan;'>Live?</a>"),
        (document.getElementById("birds").innerHTML = birds);
  },
  updateSatellites: function () {
    (yellowcount = 0), (wispextra = "");
    var satInfo,
      segs = new Date().getSeconds();
    if (
      (0 == segs || 15 == segs || 30 == segs || 45 == segs) &&
      navigator.onLine
    ) {
      if (
        (xmlHttp.open("GET", "chat/luser.php"),
        xmlHttp.send(null),
        xmlHttp.open("GET", "chat/users.html?rnd=" + Math.random(1e3)),
        xmlHttp.send(null),
        nasabare.length > 3)
      ) {
        var toolt = "At Chat\n";
        // (nasabare = nasabare.replace(/<br>/g, "")).substring(
        //   0,
        //   nasabare.length - 2,
        // );
        "t.gif" == (urlright = document.getElementById("chat").src.slice(-5)) &&
          !0 == bip &&
          jBeep("Beep.wav"),
          (document.getElementById("chat").alt = toolt),
          (document.getElementById("chat").title = toolt),
          (document.getElementById("chat").src =
            "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/chati.gif"),
          (nasabare = "");
      } else
        "i.gif" == (urlright = document.getElementById("chat").src.slice(-5)) &&
          !0 == bip &&
          jBeep("bell1.wav"),
          (document.getElementById("chat").alt = "Chat"),
          (document.getElementById("chat").title = "Chat"),
          (document.getElementById("chat").src =
            "https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/chat.gif");
    }
    if (localtime) var zulu = "&nbsp;";
    else var zulu = "z";
    var uptext =
      "&nbsp;" +
      PLib.formatDateOnly(addMinutes(new Date(), deltaminutes)) +
      " " +
      PLib.formatTimeWithSeconds(addMinutes(new Date(), deltaminutes)) +
      zulu +
      "&nbsp;Loc:" +
      document.wwl.loc.value;
    (document.getElementById("hora").innerHTML = uptext),
      getsunpos(),
      getxy(sunlat, sunlon, zoom),
      delta.y >= 0 && delta.y <= 270 && delta.x >= 0 && delta.x <= 540
        ? ((sunpixy = delta.y - 3 + "px"),
          (sunpixx = delta.x - 3 + "px"),
          (document.getElementById("Sunpos").style.visibility = "visible"),
          (document.getElementById("Sunpos").style.left = sunpixx),
          (document.getElementById("Sunpos").style.top = sunpixy))
        : (document.getElementById("Sunpos").style.visibility = "hidden"),
      (document.getElementById("Sun").title =
        "- I am the Sun -\n Click day/night\nLat:" +
        parseInt(sunlat) +
        " Lon:" +
        parseInt(sunlon) +
        "\nAzim:" +
        parseInt(PLib.sun_azi) +
        " Elev:" +
        parseInt(PLib.sun_ele)),
      navigator.onLine &&
        ((document.getElementById("Sun").onmouseover = function () {
          birdsw &&
            (document.getElementById("satimage").innerHTML =
              '<center><img class="disp" src="https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/sun0.gif"></center>');
        }),
        (document.getElementById("Sun").onmouseout = function () {
          document.getElementById("satimage").innerHTML = "";
        }));
    for (var i = 0; i < PLib.sat.length; i++) {
      if (
        ((satInfo = PLib.QuickFind(PLib.sat[i].name)),
        (slant_range_new[i] = satInfo.slantRange),
        savesatid == i + 1 &&
          graficos &&
          ((document.getElementById("graphics").innerHTML = ""),
          Draw(satInfo.azimuth, satInfo.elevation),
          firstclick || ((prevsatid = ""), graficar(savesatid))),
        satInfo.elevation < 0)
      )
        var setredinitial = '<font style="color:#ff9966;">',
          setredfinal = "</font>";
      else
        var setredinitial = "",
          setredfinal = "";
      PLib.sat[i].elevation &&
        savesatid &&
        savesatid == i + 1 &&
        slant_range_new[i] != slant_range_old[i] &&
        (dir =
          slant_range_new[i] > slant_range_old[i] ? "&#x25BC;" : "&#x25B2;"),
        (PLib.sat[i].elevation = satInfo.elevation);
      var Saturl = "sat" + PLib.sat[i].name.toLowerCase().substr(0, 5) + ".htm";
      "XW2F" == PLib.sat[i].name && (Saturl = "satxw-2f.htm"),
        "XW2E" == PLib.sat[i].name && (Saturl = "satxw-2e.htm"),
        "ARISS" == PLib.sat[i].name && (Saturl = "satiss.htm");
      var altexto =
        " If connected to Internet\nClick to show " +
        PLib.sat[i].name +
        " data";
      if (
        ((PLib.sat[i].azel =
          '<span style="font-size:20px;line-height:21px;">Tracking: <a href=\'' +
          Saturl +
          "' onclick=\"javascript:satactivity=satactivity+'INFO/';\" target='satinfo' Alt='" +
          altexto +
          "' Title='" +
          altexto +
          "' target='Satellite'><span style='cursor:pointer; text-decoration: underline; border-bottom: 1px solid #172447; color: #ffffff;'>" +
          PLib.sat[i].name.substr(0, 5).toUpperCase() +
          "</span></a></span><br><span id='nr' onmouseover=\"this.style.backgroundColor='yellow';this.style.color='red';\" title='Click to view Azimuth\nas Normal or Reverse' onclick=\"reverseazimuth();\" style='font-family:Arial;font-size:12px;font-weight:bold;background-color:#123456;color:#eeeeee;border:0px;border-width:1px;border-style:outset;cursor:pointer;align:center;'>" +
          azisw +
          "</span>Azimuth: "),
        "&nbsp;N&nbsp;" == azisw)
      )
        var newaz = satInfo.azimuth,
          newel = satInfo.elevation;
      else {
        var newaz = satInfo.azimuth + 180;
        "&nbsp;I&nbsp;" == azisw && (newaz = satInfo.azimuth - 180),
          newaz > 360 && (newaz = (newaz - 360).toFixed(0)),
          newaz < 0 && (newaz = (newaz + 360).toFixed(0));
        var newel = 180 - satInfo.elevation;
        "&nbsp;I&nbsp;" == azisw && (newel = 180 - newel);
      }
      if (
        ((putsun =
          "*" === satInfo.visibility
            ? " <img src='https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/sun1.gif' title='SUNLIT' style='cursor:pointer;visibility:visible;' onclick='graficarsuncoverage();'>"
            : " <img src='https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/sun1.gif' title='SUNLIT' style='cursor:pointer;visibility:hidden;'"),
        (PLib.sat[i].azel =
          PLib.sat[i].azel +
          newaz +
          "&deg;" +
          putsun +
          "<br><span id='ps' title='Click to Enable Prog Data\nas Normal or Program &\nSee table bottom for info' onmouseover=\"this.style.backgroundColor='yellow';this.style.color='red';\" onclick=\"setprog();\" style='font-family:Arial;font-size:12px;font-weight:bold;background-color:#123456;color:#eeeeee;border:0px;border-width:1px;border-style:outset;cursor:pointer;align:center;'>" +
          progsw +
          "</span>Elevation: " +
          setredinitial +
          newel +
          "&deg;" +
          dir +
          setredfinal),
        PLib.sat[i].meanmo < 1.5 &&
          "MOON" != PLib.sat[i].name.substring(0, 4) &&
          ((newtilt = tilt(PLib.sat_lon, localat, localon).toFixed(1)),
          (PLib.sat[i].azel =
            PLib.sat[i].azel +
            '<br><span style="font-size:14px;">&nbsp;Long:&nbsp;' +
            setredinitial +
            PLib.sat_lon.toFixed(1) +
            "&deg;" +
            setredfinal),
          (PLib.sat[i].azel =
            PLib.sat[i].azel +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tilt:&nbsp;" +
            setredinitial +
            newtilt +
            "&deg;" +
            setredfinal +
            "</span>")),
        (satelitename = PLib.sat[i].name.toUpperCase()),
        getxy(satInfo.latitude, satInfo.longitude, zoom),
        delta.y >= 0 && delta.y <= 270 && delta.x >= 0 && delta.x <= 540
          ? ((Orb.satelliteMarkers[i].style.top = delta.y - 12 + "px"),
            (Orb.satelliteMarkers[i].style.left = delta.x - 18 + "px"),
            (Orb.satelliteMarkers[i].style.visibility = "visible"))
          : (Orb.satelliteMarkers[i].style.visibility = "hidden"),
        "" != savesatid && savesatid - 1 == i)
      ) {
        if (
          ((fuplink = 1 * satfreq[satfreqpointer][0]),
          (fdolink = 1 * satfreq[satfreqpointer][1]),
          (fbeacon = 1 * satfreq[satfreqpointer][2]),
          (muplink = satfreq[satfreqpointer][3]),
          (mdolink = satfreq[satfreqpointer][4]),
          (mbeacon = satfreq[satfreqpointer][5]),
          (subtone = satfreq[satfreqpointer][10]),
          (mrev = satfreq[satfreqpointer][8]),
          "" != satfreq[satfreqpointer][6] &&
            (leyen = satfreq[satfreqpointer][6]),
          (comentario = satfreq[satfreqpointer][7]),
          (secondselapsed = satInfo.dateTime - lastdatetime),
          dateset && (secondselapsed = 1),
          (range_rate = satInfo.slantRange - lastrange),
          (lastdatetime = satInfo.dateTime),
          (lastrange = satInfo.slantRange),
          (doppler_factor = (range_rate / speedc / secondselapsed) * 1e3),
          "NOR" == mrev && (doppler_factor *= -1),
          (dldeltadc = 0),
          (uldeltadc = 0),
          DopplerchangeDownlink || DopplerchangeUplink)
        ) {
          if (
            (dldeltad > 1e5 &&
              (uldeltad = dldeltad = -((1e3 * fdolink - 1e3 * dldeltad) * 1)),
            DopplerchangeDownlink)
          )
            dlink = (
              (1 - doppler_factor) *
              (1 * fdolink + 0.001 * dldeltad)
            ).toFixed(2);
          else {
            var dldeltadc =
              (1 - doppler_factor) * (1 * fdolink + 0.001 * dldeltad) -
              1 * dlink;
            ulink = (
              (1 + doppler_factor) *
              (1 * fuplink + (0.001 * uldeltad + dldeltadc))
            ).toFixed(2);
          }
          if (0 == dldeltadc) {
            if (DopplerchangeUplink)
              ulink = (
                (1 + doppler_factor) *
                (1 * fuplink + 0.001 * uldeltad)
              ).toFixed(2);
            else {
              var uldeltadc =
                (1 + doppler_factor) * (1 * fuplink + 0.001 * uldeltad) -
                1 * ulink;
              dlink = (
                (1 - doppler_factor) *
                (1 * fdolink + (0.001 * dldeltad + uldeltadc))
              ).toFixed(2);
            }
          }
        }
        if (
          ((beacon = (
            (1 - doppler_factor) *
            (1 * fbeacon + 0.001 * bndeltad)
          ).toFixed(2)),
          (satelevation = satInfo.elevation),
          (satazimuth = satInfo.azimuth),
          satInfo.elevation > -1 &&
            ((wispazimuth = 3 * Math.round(satInfo.azimuth / 3)),
            (wispelevation =
              "&#x25BC;" == dir
                ? 3 * Math.floor(satInfo.elevation / 3)
                : 3 * Math.ceil(satInfo.elevation / 3)) < 0 &&
              (wispelevation = 0)),
          satInfo.elevation > -1 &&
            PLib.sat_alt > 3e3 &&
            !firstclick &&
            ((wispelevation = satInfo.elevation),
            (wispazimuth = satInfo.azimuth)),
          !firstclick && satInfo.elevation > -1)
        )
          var WispData =
            "SN" +
            document
              .getElementById("satelliteMarker" + i)
              .alt.replace(/ /g, ".") +
            " ";
        else var WispData = "NO SATELLITE SEL ";
        if (
          (!firstclick &&
            satInfo.elevation > -1 &&
            (rotorsw
              ? (WispData =
                  WispData + "AZ" + wispazimuth + " EL" + wispelevation + " ")
              : (WispData += "      ")),
          ulink > 10
            ? (WispData = WispData + "UP" + (1e3 * ulink).toFixed(0) + " ")
            : (WispData += "UP "),
          (linkwhat = "bn" == wispmode ? dlink : beacon),
          dlink > 10
            ? (WispData = WispData + "DN" + (1e3 * linkwhat).toFixed(0) + " ")
            : beacon > 10
              ? (WispData = WispData + "DN" + (1e3 * beacon).toFixed(0) + " ")
              : (WispData += "DN "),
          (mmuplink = muplink),
          isNumeric(mmuplink.substr(0, 1)) && (mmuplink = "FM"),
          "" != mmuplink
            ? (WispData = WispData + "UM" + mmuplink + " ")
            : (WispData += "UM- "),
          ("9k6" == (mmdolink = "bn" == wispmode ? mdolink : mbeacon) ||
            "9K6" == mmdolink) &&
            (mmdolink = "FM-W"),
          ("1k2" == mmdolink || "1K2" == mmdolink) && (mmdolink = "FM"),
          ("SSTV" == mmdolink || "DIGIT" == mmdolink || "CW/PK" == mmdolink) &&
            (mmdolink = "FM"),
          ("CW/AX" == (mmbeacon = mbeacon) || "CW/Ax" == mmbeacon) &&
            (mmbeacon = "CW"),
          "" != mmdolink
            ? (WispData = WispData + "DM" + mmdolink)
            : "" != mmbeacon
              ? (WispData = WispData + "DM" + mmbeacon)
              : (WispData += "DM-"),
          0 != subtone && (WispData = WispData + " ST" + subtone),
          "" != savesatid)
        ) {
          if (
            ("SN" != WispData.substring(0, 2) &&
              (WispData = "NO SATELLITE SELECTED"),
            (document.getElementById("Tracking").innerHTML = WispData),
            navigator.cookieEnabled && setCookie("trackCookie", WispData, 1),
            navigator.onLine &&
              "SN" == WispData.substring(0, 2) &&
              "&nbsp;P&nbsp;" == progsw)
          ) {
            var xhr = new XMLHttpRequest(),
              urlpost =
                "http://lu7aa.org/track.asp?filename=" +
                rando +
                "&data=" +
                WispData +
                wispextra,
              params = "filename=" + rando + "&data=" + WispData + wispextra;
            xhr.open("POST", urlpost, !0),
              xhr.send(params),
              (document.getElementById("lu7aaurl").innerHTML =
                "<br>Following data at: <a href=http://lu7aa.org/" +
                rando +
                ".txt target=tracking>http://lu7aa.org/" +
                rando +
                ".txt</a><br><br>" +
                WispData +
                wispextra),
              (document.getElementById("lu7aaurl").style.visibility =
                "visible");
          } else
            document.getElementById("lu7aaurl").style.visibility = "hidden";
        } else
          (WispData = ""),
            (document.getElementById("Tracking").innerHTML = null),
            (document.getElementById("lu7aaurl").innerHTML = "");
        if (
          ((document.getElementById("azel").style.height = "100px"),
          satInfo.elevation < 0)
        ) {
          document.getElementById("azel").style.color = "ff9966";
          var setredinitial = '<font style="color:#ff9966;">',
            setredfinal = "</font>";
        } else
          (document.getElementById("azel").style.color = "ffffff"),
            (setredinitial = ""),
            (setredfinal = "");
        if (
          ("" != leyen
            ? (dshow =
                "<center><b>" +
                setredinitial +
                leyen +
                setredfinal +
                "</b></center>")
            : (leyen =
                "For " +
                document.getElementById("satelliteMarker" + i).alt +
                '<br>Uplink/Downlink<br>or Beacon Freqs.<br>are not available<br><a href="http://space.skyrocket.de" target=_blank style="color:#00ffff;font-weight:normal;">Search on Internet</a>'),
          (sattochange =
            maxsatfreq > 0
              ? satselected - maxsatfreq + satfreqpointer
              : satselected),
          ulink > 1 &&
            ((showup = DopplerchangeUplink ? "&#9632;" : "&#9633;"),
            (dshow =
              dshow +
              "&nbsp;U&#x25B2;<a href='#' id='upsw' title='Uplink Doppler=" +
              DopplerchangeUplink +
              "\n * Click to Change *' onclick=\"flipsw(this)\" style='cursor:pointer;color:inherit;text-decoration:none;'>" +
              showup +
              '</a><a href=# onclick="enterfreq(\'UpLink\')" style="color:inherit;" title="Adjust UPLink Freq." alt="Adjust UPLink Freq.">' +
              setredinitial +
              ulink +
              setredfinal +
              "</a>&nbsp;" +
              muplink +
              "<br>")),
          ulink > 1 &&
            (vbasic || vbasice) &&
            (dshow =
              dshow +
              '<center><span id=ulbox style="arrow"><span style="cursor:pointer" title="Decrement uplink frequency\nClick Freq to reflect Dlink" onclick="uldeltad=uldeltad-500;document.getElementById(\'uldelta\').value=uldeltad;">&#x25C4;</span>&nbsp;<input type=text onclick="enterfreq(\'UpLink\');" id=uldelta name=uldelta size=4 style="background-color:#172447;color:#ffffff;border:0;font-weight:bold;font-size:18px;" value=\'' +
              uldeltad +
              '\'>&nbsp;<span id=ulbox style="arrow"><span style="cursor:pointer" title="Increment Uplink Frequency\nClick Freq to reflect Dlink" onclick="uldeltad=uldeltad+500;document.getElementById(\'uldelta\').value=uldeltad;">&#x25BA;</span>'),
          ulink > 1 &&
            vbasic &&
            (dshow =
              dshow +
              "&nbsp;<select id=uldeltam name=uldeltam onclick=\"refresh=false;\" onchange=\"freq[sattochange][5] = document.getElementById('uldeltam').options[document.getElementById('uldeltam').selectedIndex].text ; selectItemByValue(document.getElementById('uldeltam'),freq[sattochange][5]);var cualsat='SatelliteMarker'+(savesatid-1)*1;document.getElementById(cualsat).click();document.getElementById(cualsat).click();\" style=\"background-color:#172447;color:#ffffff;font-weight:bold;\">" +
              selectoptions +
              "</select></span>"),
          ulink > 1 && (vbasic || vbasice) && (dshow += "</center>"),
          dlink > 1 &&
            ((showdo = DopplerchangeDownlink ? "&#9632;" : "&#9633;"),
            (dshow =
              dshow +
              "&nbsp;<span id=dl onclick=\"changewisp('dl');\">D&#x25BC;</span><a href='#' id='dosw' title='Downlink Doppler=" +
              DopplerchangeDownlink +
              "\n * Click to Change *' onclick=\"flipsw(this)\" style='cursor:pointer;color:inherit;text-decoration:none;'>" +
              showdo +
              '</a><a href=# onclick="enterfreq(\'DownLink\')" style="color:inherit" title="Adjust DownLink Freq." alt="Adjust DownLink Freq.">' +
              setredinitial +
              dlink +
              setredfinal +
              "</a>&nbsp;" +
              mdolink +
              "<br>")),
          dlink > 1 &&
            (vbasic || vbasice) &&
            (dshow =
              dshow +
              '<center><span id=dlbox style="arrow"><span style="cursor:pointer" title="Decrement downlink frequency\nClick Freq to reflect Uplink" onclick="dldeltad=dldeltad-500;document.getElementById(\'dldelta\').value=dldeltad;">&#x25C4;</span>&nbsp;<input type=text onclick="enterfreq(\'DownLink\');" id=dldelta name=dldelta size=4 style="background-color:#172447;color:#ffffff;border:0;font-weight:bold;font-size:18px;" value=\'' +
              dldeltad +
              '\'>&nbsp;<span id=dlbox style="arrow"><span style="cursor:pointer" title="Increment Downklink Frequency\nClick Freq to reflect Uplink" onclick="dldeltad=dldeltad+500;document.getElementById(\'dldelta\').value=dldeltad;">&#x25BA;</span>'),
          dlink > 1 &&
            vbasic &&
            (dshow =
              dshow +
              "&nbsp;<select id=dldeltam name=dldeltam onclick=\"refresh=false;\" onchange=\"freq[sattochange][6] = document.getElementById('dldeltam').options[document.getElementById('dldeltam').selectedIndex].text ; selectItemByValue(document.getElementById('dldeltam'),freq[sattochange][6]);var cualsat='SatelliteMarker'+(savesatid-1)*1;document.getElementById(cualsat).click();document.getElementById(cualsat).click();\" style=\"background-color:#172447;color:#ffffff;font-weight:bold;\">" +
              selectoptions +
              "</select></span>"),
          dlink > 1 && (vbasic || vbasice) && (dshow += "</center>"),
          beacon > 1 &&
            (dshow =
              dshow +
              '&nbsp;<span style="white-space:nowrap;"><span id=bn onclick="changewisp(\'bn\');">B<span style="font-size:11px;font-weight:bold;vertical-align:20%;"> )))))</span></span>&nbsp;<a href=# onclick="enterfreq(\'Beacon\')" style="color:inherit;" title="Adjust Beacon Freq." alt="Adjust Beacon Freq.">' +
              setredinitial +
              beacon +
              setredfinal +
              "</a>&nbsp;" +
              mbeacon +
              "</span><br>"),
          beacon > 1 &&
            (vbasic || vbasice) &&
            (dshow =
              dshow +
              '<center><span id=bnbox style="arrow"><span style="cursor:pointer" title="decrement Beacon frequency" onclick="bndeltad=bndeltad-100;document.getElementById(\'bndelta\').value=bndeltad;">&#x25C4;</span>&nbsp;<input type=text onclick="enterfreq(\'Beacon\');" id=bndelta name=bndelta size=4 style="background-color:#172447;color:#ffffff;border:0;font-weight:bold;font-size:18px;" value=\'' +
              bndeltad +
              '\'>&nbsp;<span id=bnbox style="arrow"><span style="cursor:pointer" title="Increment Beacon Frequency" onclick="bndeltad=bndeltad+100;document.getElementById(\'bndelta\').value=bndeltad;">&#x25BA;</span>'),
          beacon > 1 &&
            vbasic &&
            (dshow =
              dshow +
              "&nbsp;<select id=bndeltam name=bndeltam onclick=\"refresh=false;\" onchange=\"freq[sattochange][7] = document.getElementById('bndeltam').options[document.getElementById('bndeltam').selectedIndex].text ; selectItemByValue(document.getElementById('bndeltam'),freq[sattochange][7]);var cualsat='SatelliteMarker'+(savesatid-1)*1;document.getElementById(cualsat).click();document.getElementById(cualsat).click();\" style=\"background-color:#172447;color:#ffffff;font-weight:bold;\">" +
              selectoptions +
              "</select></span>"),
          beacon > 1 && (vbasic || vbasice) && (dshow += "</center>"),
          "" != comentario &&
            (dshow = dshow + "<center>" + comentario + "</center>"),
          "NOR" == satfreq[satfreqpointer][8])
        )
          var ene =
            "<span style='font-size:12px;font-weight:bold;'>&nbsp;&nbsp;NOR</span>";
        else var ene = "";
        maxsatfreq > 0 &&
          (dshow =
            dshow +
            '<center><a href=# alt="See more options" title="See more options" onclick="gonext()"><font style="color:#00ffff;font-size:16px;font-family:Arial;font-weight:bold;line-height:16px;"><u> Next Option </u></font></a>' +
            ene +
            "</center>"),
          refresh &&
            (document.getElementById("azel").innerHTML =
              calcaos(satelitename, aostime[savesatid - 1], savesatid) + dshow),
          ulink > 1 &&
            vbasic &&
            selectItemByValue(document.getElementById("uldeltam"), mmuplink),
          dlink > 1 &&
            vbasic &&
            selectItemByValue(document.getElementById("dldeltam"), mmdolink),
          beacon > 1 &&
            vbasic &&
            selectItemByValue(document.getElementById("bndeltam"), mmbeacon),
          beacon > 1 &&
            dlink > 1 &&
            ("dl" == wispmode
              ? ((document.getElementById("bn").style.textDecoration =
                  "underline"),
                (document.getElementById("bn").title =
                  "Click to Select Downlink for WispDDE"),
                (document.getElementById("bn").style.cursor = "pointer"))
              : ((document.getElementById("dl").style.textDecoration =
                  "underline"),
                (document.getElementById("dl").title =
                  "Click to Select Beacon for WispDDE"),
                (document.getElementById("dl").style.cursor = "pointer"))),
          (moveto = vbasic || vbasice ? "476px" : "398px"),
          leyen
            ? (document.getElementById("uplinkdownlink").style.top = moveto)
            : (document.getElementById("uplinkdownlink").style.top = "268px"),
          (document.getElementById("trackingdata").innerHTML =
            "<center>" + PLib.sat[savesatid - 1].azel + "</center>");
      }
      if (
        (0 == satInfo.elevation &&
          bip &&
          "MOON" != PLib.sat[i].name.substring(0, 4) &&
          (slant_range_new[i] < slant_range_old[i]
            ? jBeep("Beep.wav")
            : jBeep("bell1.wav")),
        0 == satInfo.elevation &&
          "MOON" != PLib.sat[i].name.substring(0, 4) &&
          (slant_range_new[i] < slant_range_old[i]
            ? (blink(PLib.sat[i].name + " &#x25B2;"),
              (saveaoslosid = i),
              -1 !=
                (isimg = document
                  .getElementById("graphics")
                  .innerHTML.substring(0, 8)
                  .toLowerCase()).indexOf("<img") &&
                ((satactivity += "Auto/"),
                document.getElementById("satelliteMarker" + i).click(),
                (autoclick = !0),
                (saveclickid = i)))
            : (blink(PLib.sat[i].name.toUpperCase() + " &#x25BC;"),
              (saveaoslosid = 0),
              autoclick &&
                saveclickid == i &&
                (document
                  .getElementById("satelliteMarker" + saveclickid)
                  .click(),
                (document.getElementById("graphics").innerHTML =
                  '<img src="https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/arrow.jpg" border=2 style="border-color:#ffffff;width:180px;height:180px;border-radius: 6px 6px 6px 6px;" width=180 height=180 title="Tracking satellites" alt="Tracking satellites">'),
                (document.getElementById("trackingdata").innerHTML =
                  '<center>Click <img src="https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/saticon2.gif" border=0 width="25px" style="width:25px;"> Satellite<br>To see Az/El/Freq<br>Click <a href=#change><img src="https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/home.gif" title="Click to change Grid Locator" width=18px height="18px" border=0 style="width:18px;height:18px;"></a> to set QTH</center>'),
                (document.getElementById("azel").innerHTML = ""),
                (document.getElementById("uplinkdownlink").style.top = "268px"),
                (autoclick = !1),
                (savesatid = ""),
                (saveclickid = "")))),
        satInfo.elevation >= 0 &&
          "MOON" !=
            document.getElementById("satelliteMarker" + i).alt.substring(0, 4))
      ) {
        if (
          ((yellowcount += 1),
          "url(saticony.gif)" !=
            document.getElementById("satelliteMarker" + i).style
              .backgroundImage)
        ) {
          if (
            "MOON" ==
            document.getElementById("satelliteMarker" + i).alt.substring(0, 4)
          )
            document.getElementById(
              "satelliteMarker" + i,
            ).style.backgroundImage = "url(mon.gif)";
          else {
            for (
              k = 2,
                document.getElementById(
                  "satelliteMarker" + i,
                ).style.backgroundImage = "url(saticony.gif)",
                saten = PLib.tleData[i][0].toUpperCase();
              k < PLib.tleData.length + 1;
              k++
            )
              document.getElementById("sh" + k) &&
                saten ===
                  document.getElementById("sh" + k).innerHTML.toUpperCase() &&
                (document.getElementById("sh" + k).style.backgroundColor =
                  "#007400");
            navigator.onLine &&
              "&nbsp;P&nbsp;" == progsw &&
              (wispextra =
                (wispextra =
                  (wispextra = wispextra + "<br>SN" + PLib.sat[i].name + " ") +
                  "AZ" +
                  satInfo.azimuth +
                  " ") +
                "EL" +
                satInfo.elevation);
          }
        }
      } else {
        for (
          k = 2, saten = PLib.tleData[i][0].toUpperCase();
          k < PLib.tleData.length + 1;
          k++
        )
          document.getElementById("sh" + k) &&
            saten ===
              document.getElementById("sh" + k).innerHTML.toUpperCase() &&
            (document.getElementById("sh" + k).style.backgroundColor =
              "#172447");
        document.getElementById("satelliteMarker" + i).style.backgroundImage =
          icons[i + 1];
      }
      slant_range_old[i] = slant_range_new[i];
    }
    new Date() - tablelasttime > 3e4 &&
      (0 != document.getElementById("daynight").innerHTML.length &&
        ((document.getElementById("daynight").innerHTML = ""),
        graficarsuncoverage()),
      Orb.generateTable(document.getElementById("passes")),
      (tablelasttime = new Date()),
      document.getElementById("daynight").innerHTML.length > 30 &&
        graficos &&
        (graficarsuncoverage(), graficarsuncoverage()),
      new Date() - ahora < 864e5
        ? (document.getElementById("Div1").innerHTML =
            "Next passes at your location. Starting at " +
            tablelasttime.toTimeString())
        : ((document.getElementById("Div1").innerHTML =
            '<a href=\'#\' onclick="location.reload()"><b><u><font style="color:#FF0000;background-color:#FFFFFF;font-size:12px;font-weight:bold;">&nbsp;Keps are old, click Reload.</font></u></b></a> Starting at ' +
            tablelasttime.toTimeString()),
          (warntoken += 1) < 2 && (satactivity += "KepsOld/"))),
      (timespan = ((864e5 / 2.3) * 42) / (1.27 * PLib.tleData.length + 1)),
      document.getElementById("ty5") &&
        (document.getElementById("ty5").innerHTML = yellowcount),
      PLib.tleData.length < 5 && (timespan = 667e6),
      vbasic &&
        (document.getElementById("rotorimg").style.visibility = "visible"),
      (parar = vbasic = eval(document.getElementById("vbasic").innerHTML)),
      (newcycle = setTimeout("Orb.updateSatellites()", 1e3)),
      (document.getElementById("bubble").style.visibility = "hidden");
  },
  createCell: function (e, a, l) {
    var c = document.createElement("td");
    (c.className = a),
      (l = document.createTextNode(l)),
      c.appendChild(l),
      e.appendChild(c);
  },
  createHeaderColumn: function (e, a) {
    var l = document.createElement("th");
    (l.className = "orb-header"),
      (a = document.createTextNode(a)),
      l.appendChild(a),
      e.appendChild(l);
  },
  createHeaderColumn1: function (e, a) {
    var l = document.createElement("th");
    (l.className = "orb-header1"),
      (a = document.createTextNode(a)),
      l.appendChild(a),
      e.appendChild(l);
  },
  generateTable: function (e) {
    for (n = 0; n < aostime.length; n++) aostime[n] = null;
    document.getElementById("linkeos").innerHTML = "";
    var a,
      l,
      c,
      u = document.createDocumentFragment(),
      g = PLib.getTodaysPasses();
    function b() {
      for (m = 0; m < g.length - 1; m++)
        for (n = m; n < g.length; n++)
          (fecha1 = g[m].dateTimeStart) > (fecha2 = g[n].dateTimeStart) &&
            ((savefecha = g[m]), (g[m] = g[n]), (g[n] = savefecha));
    }
    for (b(); e.childNodes.length > 0; ) e.removeChild(e.firstChild);
    var $ = document.createElement("table");
    Orb.crossBrowserSetStyle(
      $,
      "border-collapse: collapse; margin-left: auto; margin-right: auto;text-align:center;width:100%;",
      !1,
    );
    var y = document.createElement("thead");
    (a = document.createElement("tr")),
      Orb.createHeaderColumn1(a, "h:mm"),
      Orb.createHeaderColumn(a, "Satell."),
      Orb.createHeaderColumn(a, "Orbit#"),
      Orb.createHeaderColumn(a, "Da  te"),
      0 == deltaminutes
        ? Orb.createHeaderColumn(a, "-Local Time-")
        : Orb.createHeaderColumn(a, "-UTC Time-"),
      Orb.createHeaderColumn(a, "Ele."),
      Orb.createHeaderColumn(a, "Azimuths"),
      y.appendChild(a),
      $.appendChild(y);
    var _ = document.createElement("tbody");
    satlen = g.length > 55 ? 55 : g.length;
    for (var w = 0; w < satlen; w++)
      if (
        "MOON" != g[w].name.substring(0, 4) &&
        g[w].peakElevation >= elevationset
      ) {
        (a = document.createElement("tr")),
          (aostt[w] = addMinutes(g[w].dateTimeStart, deltaminutes)),
          (lostt[w] = addMinutes(g[w].dateTimeEnd, deltaminutes)),
          (c =
            "-" == (countdown = calcaost(aostt[w], lostt[w])).substring(0, 1)
              ? "orb-detailVisible"
              : "orb-detail"),
          (detailClassNameunderline =
            "-" == countdown.substring(0, 1)
              ? "orb-detailVisible-underline"
              : "orb-detail-underline"),
          (detailClassNameright =
            "-" == countdown.substring(0, 1)
              ? "orb-detailVisibleright"
              : "orb-detailright"),
          (detailClassNamecenter =
            "-" == countdown.substring(0, 1)
              ? "orb-detailVisiblecenter"
              : "orb-detailcenter"),
          Orb.createCell(a, c, countdown),
          Orb.createCell(
            a,
            detailClassNameunderline,
            g[w].name.substr(0, 5).toUpperCase(),
          ),
          (Orb.coco = linkeos);
        var u = document.createDocumentFragment(),
          E = document.createElement("div");
        switch (
          ((E.id = w),
          Orb.crossBrowserSetStyle(
            E,
            "position:relative; cursor:pointer; width: 536px; height: " +
              NavAdj +
              "px;",
            !1,
          ),
          (E.alt = g[w].number - 1),
          (E.title = g[w].name.toUpperCase()),
          navigator.onLine &&
            ((E.onmouseover = function () {
              birdsw &&
                (document.getElementById("satimage").innerHTML =
                  '<img class="disp" src="https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/sat"' +
                  this.title.toLowerCase().replace(/ /, "") +
                  ".gif>");
            }),
            (E.onmouseout = function () {
              document.getElementById("satimage").innerHTML = "";
            })),
          u.appendChild(E),
          Orb.coco.appendChild(u),
          (E.onclick = function () {
            document.getElementById("satelliteMarker" + this.alt).click();
          }),
          (E.ondblclick = function () {
            (satactivity += "ONLY/"), onlysat(this.title);
          }),
          g[w].orbitNumber >= 0
            ? Orb.createCell(a, c, g[w].orbitNumber - 1)
            : ((saveClassName = c),
              (c = "orb-detailred"),
              Orb.createCell(a, c, g[w].orbitNumber - 1),
              (c = saveClassName)),
          savebox == E.title &&
            ((E.style.backgroundRepeat = "no-repeat"),
            (E.style.backgroundImage = "url(box.gif)")),
          null == aostime[g[w].number - 1] &&
            (aostime[g[w].number - 1] = addMinutes(
              g[w].dateTimeStart,
              deltaminutes,
            )),
          Orb.createCell(
            a,
            c,
            PLib.formatDateOnly(addMinutes(g[w].dateTimeStart, deltaminutes)),
          ),
          Orb.createCell(
            a,
            detailClassNamecenter,
            PLib.formatTimeOnly(addMinutes(g[w].dateTimeStart, deltaminutes)) +
              " - " +
              PLib.formatTimeOnly(addMinutes(g[w].dateTimeEnd, deltaminutes)),
          ),
          Orb.createCell(
            a,
            detailClassNameright,
            Math.round(g[w].peakElevation) + "\xb0",
          ),
          Orb.createCell(
            a,
            detailClassNamecenter,
            Math.round(g[w].riseAzimuth) +
              ", " +
              Math.round(g[w].peakAzimuth) +
              ", " +
              Math.round(g[w].decayAzimuth),
          ),
          g[w].visibility)
        ) {
          case "+":
            l = "Visible";
            break;
          case "*":
            l = "Not Visible";
            break;
          default:
            l = "Eclipsed";
        }
        _.appendChild(a);
      }
    $.appendChild(_), u.appendChild($), e.appendChild(u);
  },
};
function changeorder(e) {
  4 == (order = 1 * order + 1) && (order = 0), sortm.splice(0, sortm.length);
  for (var a = 1; a <= PLib.tleData.length; a++)
    "MOON " != PLib.tleData[a - 1][0] &&
      ((newlink =
        "<a href=# id='sh" +
        a +
        "' onmouseout = \"poneimg('')\" onmouseover = \"poneimg('" +
        PLib.tleData[a - 1][0].toLowerCase() +
        "')\" onclick='sh(" +
        a +
        ")'>" +
        PLib.tleData[a - 1][0] +
        "</a><br>"),
      (sortm[a] =
        PLib.tleData[a - 1][0] +
        "," +
        PLib.tleData[a - 1][1].substring(2, 7) +
        "," +
        newlink));
  for (
    "nolog" != e && (satactivity = satactivity + "Order" + 1 * order + "/"),
      birds = birdhelp + 1 * order + "</a><br>",
      0 == order &&
        sortm.sort(function (e, a) {
          var l = e.substr(6, 5),
            c = a.substr(6, 5);
          return l == c ? 0 : l < c ? -1 : 1;
        }),
      1 == order &&
        sortm.sort(function (e, a) {
          var l = e.substr(0, 5),
            c = a.substr(0, 5);
          return l == c ? 0 : l < c ? -1 : 1;
        }),
      2 == order &&
        sortm.sort(function (e, a) {
          var l = e.substr(0, 5),
            c = a.substr(0, 5);
          return l == c ? 0 : l > c ? -1 : 1;
        }),
      3 == order &&
        sortm.sort(function (e, a) {
          var l = e.substr(6, 5),
            c = a.substr(6, 5);
          return l == c ? 0 : l > c ? -1 : 1;
        }),
      a = 0;
    a < sortm.length;
    a++
  )
    sortm[a] &&
      (birds += sortm[a].substring(sortm[a].indexOf("<"), sortm[a].length));
  if (((birdsa = ""), (birdsm = birds.split("<br>")).length > 50)) {
    for (h = 0; h < Math.ceil(birdsm.length / 2); h++)
      birdsa = birdsa + birdsm[h] + "<br>";
    for (
      birdsb =
        "<a href='https://www.amsat.org/status/' target='_blank' title='See Active Sats' onclick=\"javascript:satactivity=satactivity+'LIVE/';\" style='color:cyan;'>Live?</a><br>",
        0 == order && (birdsb += "&#x25B2;Age&#x25B2;"),
        1 == order && (birdsb += "Name&#x25B2;"),
        2 == order && (birdsb += "Name&#x25BC;"),
        3 == order && (birdsb += "&#x25BC;Age&#x25BC;"),
        birdsb += "<br>",
        desde = Math.floor((birdsm.length / 2) * 1),
        hasta = 1 * birdsm.length,
        h = desde;
      h < hasta;
      h++
    )
      birdsb = birdsb + birdsm[h] + "<br>";
    (document.getElementById("birds").innerHTML = birdsa),
      (document.getElementById("birds1").innerHTML = birdsb);
  } else
    (document.getElementById("birds1").innerHTML =
      "<a href='https://www.amsat.org/status/' title='See Active Sats' target='_blank' style='color:cyan;'>Live?</a>"),
      (document.getElementById("birds").innerHTML = birds);
}
function satnogs() {
  (catnumber = PLib.sat[savesatid - 1].line1.substring(2, 7)),
    navigator.onLine
      ? catnumber > 1e3
        ? ((satactivity = satactivity + "SNOG" + catnumber + "/"),
          (preferences =
            "toolbar=yes,location=yes,fullscreen=no,width=1280px,height=560px,center,margintop=0,top=30,left=20,status=no,scrollbars=yes,resizable=yes,dependent=no,z-lock=yes"),
          null != popupwi && popupwi.close(),
          (popupwi = window.open(
            "https://network.satnogs.org/observations/?norad=" + catnumber,
            "win1",
            preferences,
          )))
        : alert("Moon & Sun not available on SatNogs")
      : alert("Satnogs is available when Online");
}
function aoslosclick() {
  saveaoslosid &&
    saveaoslosid > 0 &&
    document.getElementById("satelliteMarker" + saveaoslosid).click();
}
function setzoom(e) {
  (zoom = e),
    (document.getElementById("z1").style.backgroundColor = "#172447"),
    (document.getElementById("z1").style.color = "#ffffff"),
    (document.getElementById("z1.5").style.backgroundColor = "#172447"),
    (document.getElementById("z1.5").style.color = "#ffffff"),
    (document.getElementById("z2.2").style.backgroundColor = "#172447"),
    (document.getElementById("z2.2").style.color = "#ffffff"),
    (document.getElementById("z3.5").style.backgroundColor = "#172447"),
    (document.getElementById("z3.5").style.color = "#ffffff"),
    (document.getElementById("z5.3").style.backgroundColor = "#172447"),
    (document.getElementById("z5.3").style.color = "#ffffff"),
    (document.getElementById("z8").style.backgroundColor = "#172447"),
    (document.getElementById("z8").style.color = "#ffffff"),
    (document.getElementById("z16").style.backgroundColor = "#172447"),
    (document.getElementById("z16").style.color = "#ffffff"),
    (document.getElementById("z" + e).style.backgroundColor = "yellow"),
    (document.getElementById("z" + e).style.color = "red"),
    (satactivity = satactivity + "ZOOM" + zoom + "/"),
    (document.getElementById("map").style.backgroundImage =
      "url(https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/world" +
      zoom +
      ".jpg)"),
    Orb.setHomeCoordinates(localat, localon),
    1 == zoom
      ? (document.getElementById("Div1").style.color = "#000000")
      : (document.getElementById("Div1").style.color = "#ffffff"),
    document.getElementById("daynight").innerHTML.length > 30 &&
      graficos &&
      (graficarsuncoverage(), graficarsuncoverage());
}
function graficarsuncoverage() {
  if (0 == document.getElementById("daynight").innerHTML.length && graficos) {
    for (
      "SUNON/" != satactivity.substr(satactivity.length - 6) &&
        (satactivity += "SUNON/"),
        document.getElementById("daynight").innerHTML = "",
        radio = 15e7,
        prevlon = 0,
        changecov = 0,
        cov1 = "[",
        bearing = 0;
      bearing < 361;
      bearing++
    )
      getlatlon(sunlat, sunlon, bearing, radio),
        getxy(out.lat2, out.lon2, zoom),
        (pixlon = delta.x),
        (pixlat = delta.y),
        pixlon > 540 && 1 == zoom && (pixlon -= 540),
        pixlon < 0 && 1 == zoom && (pixlon += 540),
        (sunlatcheck = sunlat > 0 ? 530 : 270),
        Math.abs(prevlon - pixlon) > sunlatcheck &&
          (sunlat < 0
            ? (cov1 += "new jxPoint(540, 270), new jxPoint(0, 270), ")
            : (cov1 += "new jxPoint(0, 0), new jxPoint(540, 0), ")),
        (prevlon = pixlon),
        (cov1 = cov1 + "new jxPoint(" + pixlon + ", " + pixlat + "), ");
    cov1 = cov1.substring(0, cov1.length - 2) + "]";
    var sunpix = new jxGraphics(document.getElementById("daynight")),
      penOrange = new jxPen(new jxColor("#226644"), "2px"),
      brushOrange = new jxBrush(new jxColor("#88ffcc"));
    if (cov1.length > 38) {
      var curve,
        curvePoints = eval(cov1);
      new jxPolygon(curvePoints, penOrange, brushOrange).draw(sunpix);
    }
    (document.getElementById("daynight").style.visibility = "visible"),
      (document.getElementById("daynight").style.zIndex = "0");
  } else
    (satactivity += "SUNOFF/"),
      (document.getElementById("daynight").innerHTML = "");
}
function graficar(e) {
  if (prevsatid != e) {
    (prevsatid = e), PLib.PreCalc(e - 1);
    var a =
      Math.sqrt(Math.pow(1e3 * PLib.sat_alt + 6378137, 2) - 40680631590769) /
      1e3 /
      2;
    for (
      a > 18e3 && (a = 4880),
        a > 5e3 && (a /= 1.45),
        changecov = 0,
        cov1 = "[",
        cov2 = "[",
        cov3 = "[",
        cov4 = "[",
        cov5 = "[",
        bearing = 0,
        prevlon = getlatlon(PLib.sat_lat, PLib.sat_lon, bearing, a),
        prevlon = 0,
        bearing = 0;
      bearing < 361;
      bearing += 1
    )
      getlatlon(PLib.sat_lat, PLib.sat_lon, bearing, a),
        getxy(out.lat2, out.lon2, zoom),
        (pixlon = delta.x),
        (pixlat = delta.y),
        pixlon < 0 && 1 == zoom && (pixlon = 540 + pixlon),
        pixlon > 540 && 1 == zoom && (pixlon -= 540),
        Math.abs(prevlon - pixlon) > 530 && (changecov += 1),
        (prevlon = pixlon),
        0 == changecov &&
          (cov1 = cov1 + "new jxPoint(" + pixlon + ", " + pixlat + "), "),
        1 == changecov &&
          (cov2 = cov2 + "new jxPoint(" + pixlon + ", " + pixlat + "), "),
        2 == changecov &&
          (cov3 = cov3 + "new jxPoint(" + pixlon + ", " + pixlat + "), "),
        3 == changecov &&
          (cov4 = cov4 + "new jxPoint(" + pixlon + ", " + pixlat + "), "),
        4 == changecov &&
          (cov5 = cov5 + "new jxPoint(" + pixlon + ", " + pixlat + "), ");
    for (
      h = -70,
        cov1 = cov1.substring(0, cov1.length - 2) + "]",
        cov2 = cov2.substring(0, cov2.length - 2) + "]",
        cov3 = cov3.substring(0, cov3.length - 2) + "]",
        cov4 = cov4.substring(0, cov4.length - 2) + "]",
        cov5 = cov5.substring(0, cov4.length - 2) + "]",
        PLib.daynum = PLib.daynum - 0.0042,
        tray1 = "[",
        tray2 = "[",
        tray3 = "[",
        visi1 = "[",
        visi2 = "[",
        visi3 = "[",
        prevlon = PLib.Calc(),
        changetray = 0,
        deltaday =
          PLib.sat[e - 1].meanmo > 2
            ? 0.00297 / PLib.sat[e - 1].meanmo
            : 0.0029,
        cuenta = 0,
        zx1 = "",
        zx2 = "",
        zx3 = "",
        zx4 = "",
        zy1 = "",
        zy2 = "",
        zy3 = "",
        zy4 = "",
        zl1 = "",
        zl2 = "",
        zl3 = "",
        zl4 = "",
        ajustar =
          0 == deltaminutes ? 1e7 : new Date().getTimezoneOffset() / 1440 + 1e7;
      h < 267;
      h++
    ) {
      (PLib.daynum = PLib.daynum + deltaday), PLib.Calc();
      var l,
        c,
        u = Julian2Date(PLib.daynum + ajustar),
        g =
          ("0" + u.getHours()).slice(-2) +
          ":" +
          ("0" + u.getMinutes()).slice(-2);
      if (
        (getxy(PLib.sat_lat, PLib.sat_lon, zoom),
        (pixlon = delta.x),
        (pixlat = delta.y),
        (PLib.sat_ele > 0 && 0 == cuenta) ||
          (PLib.sat_ele < 0 && 1 == cuenta) ||
          (PLib.sat_ele > 0 && 2 == cuenta) ||
          (PLib.sat_ele < 0 && 3 == cuenta))
      ) {
        updatehours(pixlat + 16, pixlon + 1, g), cuenta++;
      }
      Math.abs(prevlon - pixlon) > 500 && (changetray += 1),
        (prevlon = pixlon),
        PLib.sat_ele >= 0 &&
          0 == changetray &&
          (visi1 = visi1 + "new jxPoint(" + pixlon + ", " + pixlat + "), "),
        PLib.sat_ele >= 0 &&
          1 == changetray &&
          (visi2 = visi2 + "new jxPoint(" + pixlon + ", " + pixlat + "), "),
        PLib.sat_ele >= 0 &&
          2 == changetray &&
          (visi3 = visi3 + "new jxPoint(" + pixlon + ", " + pixlat + "), "),
        0 == changetray &&
          (tray1 = tray1 + "new jxPoint(" + pixlon + ", " + pixlat + "), "),
        1 == changetray &&
          (tray2 = tray2 + "new jxPoint(" + pixlon + ", " + pixlat + "), "),
        2 == changetray &&
          (tray3 = tray3 + "new jxPoint(" + pixlon + ", " + pixlat + "), ");
    }
    (tray1 = tray1.substring(0, tray1.length - 2) + "]"),
      (tray2 = tray2.substring(0, tray2.length - 2) + "]"),
      (tray3 = tray3.substring(0, tray3.length - 2) + "]"),
      (visi1 = visi1.substring(0, visi1.length - 2) + "]"),
      (visi2 = visi2.substring(0, visi2.length - 2) + "]"),
      (visi3 = visi3.substring(0, visi3.length - 2) + "]"),
      (document.getElementById("trayecto").innerHTML = ""),
      (document.getElementById("trayecto").style.visibility = "hidden"),
      DrawTray(
        tray1,
        tray2,
        tray3,
        visi1,
        visi2,
        visi3,
        cov1,
        cov2,
        cov3,
        cov4,
        cov5,
        zx1,
        zy1,
        zl1,
        zx2,
        zy2,
        zl2,
        zx3,
        zy3,
        zl3,
        zx4,
        zy4,
        zl4,
      ),
      (document.getElementById("trayecto").style.visibility = "visible"),
      (document.getElementById("trayecto").style.zIndex = "0"),
      (firstclick = !1);
  } else
    (prevsatid = ""),
      (document.getElementById("trayecto").innerHTML = ""),
      (document.getElementById("trayecto").style.visibility = "hidden");
}
function updatehours(e, a, l) {
  0 == cuenta && ((zx1 = e), (zy1 = a), (zl1 = l)),
    1 == cuenta && ((zx2 = e), (zy2 = a), (zl2 = l)),
    2 == cuenta && ((zx3 = e), (zy3 = a), (zl3 = l)),
    3 == cuenta && ((zx4 = e), (zy4 = a), (zl4 = l));
}
function DrawTray(
  tray1,
  tray2,
  tray3,
  visi1,
  visi2,
  visi3,
  cov1,
  cov2,
  cov3,
  cov4,
  cov5,
  zy1,
  zx1,
  zl1,
  zy2,
  zx2,
  zl2,
  zy3,
  zx3,
  zl3,
  zy4,
  zx4,
  zl4,
) {
  var text,
    text1,
    text2,
    text3,
    pixeles = new jxGraphics(document.getElementById("trayecto")),
    penYellow = new jxPen(new jxColor("#00ffff"), "2px"),
    penRed = new jxPen(new jxColor("#ffff00"), "3px"),
    penWhite = new jxPen(new jxColor("#dddddd"), "2px"),
    penPink = new jxPen(new jxColor("#ff99ff"), "1px");
  if (tray1.length > 38) {
    var curvePoints = eval(tray1),
      curve = new jxCurve(curvePoints, penYellow);
    curve.draw(pixeles);
  }
  if (tray2.length > 38) {
    var curvePoints = eval(tray2),
      curve = new jxCurve(curvePoints, penYellow);
    curve.draw(pixeles);
  }
  if (tray3.length > 38) {
    var curvePoints = eval(tray3),
      curve = new jxCurve(curvePoints, penYellow);
    curve.draw(pixeles);
  }
  if (visi1.length > 38) {
    var curvePoints = eval(visi1),
      curve = new jxCurve(curvePoints, penRed);
    curve.draw(pixeles);
  }
  if (visi2.length > 38) {
    var curvePoints = eval(visi2),
      curve = new jxCurve(curvePoints, penRed);
    curve.draw(pixeles);
  }
  if (visi3.length > 38) {
    var curvePoints = eval(visi3),
      curve = new jxCurve(curvePoints, penRed);
    curve.draw(pixeles);
  }
  if (cov1.length > 38) {
    var curvePoints = eval(cov1),
      curve = new jxCurve(curvePoints, penWhite);
    curve.draw(pixeles);
  }
  if (cov2.length > 38) {
    var curvePoints = eval(cov2),
      curve = new jxCurve(curvePoints, penWhite);
    curve.draw(pixeles);
  }
  if (cov3.length > 38) {
    var curvePoints = eval(cov3),
      curve = new jxCurve(curvePoints, penWhite);
    curve.draw(pixeles);
  }
  if (cov4.length > 38) {
    var curvePoints = eval(cov4),
      curve = new jxCurve(curvePoints, penWhite);
    curve.draw(pixeles);
  }
  if (cov5.length > 38) {
    var curvePoints = eval(cov5),
      curve = new jxCurve(curvePoints, penWhite);
    curve.draw(pixeles);
  }
  var penText = new jxPen(new jxColor("#bbffbb"), "1px"),
    penTextOut = new jxPen(new jxColor("#ffccaa"), "1px"),
    brushText = new jxBrush(new jxColor("#ffffff")),
    font = new jxFont("arial");
  (font.size = "14px"),
    "" != zl1 &&
      new jxText(
        new jxPoint(zx1 + 2, zy1 - 9),
        zl1,
        font,
        penText,
        brushText,
        0,
      ).draw(pixeles),
    "" != zl2 &&
      new jxText(
        new jxPoint(zx2 + 2, zy2 - 9),
        zl2,
        font,
        penTextOut,
        brushText,
        0,
      ).draw(pixeles),
    "" != zl3 &&
      new jxText(
        new jxPoint(zx3 + 2, zy3 - 9),
        zl3,
        font,
        penText,
        brushText,
        0,
      ).draw(pixeles),
    "" != zl4 &&
      new jxText(
        new jxPoint(zx4 + 2, zy4 - 9),
        zl4,
        font,
        penTextOut,
        brushText,
        0,
      ).draw(pixeles);
}
function Draw(e, a) {
  var l = Math.PI / 180,
    c = new jxGraphics(document.getElementById("graphics")),
    u = new jxPen(new jxColor("red"), "8px"),
    g = new jxPen(new jxColor("yellow"), "8px");
  new jxPen(new jxColor("green"), "8px");
  var b = new jxPen(new jxColor("white"), "2px");
  new jxPen(new jxColor("blue"), "2px");
  var $ = new jxPen(new jxColor("#ffcc00"), "3px"),
    y = new jxPen(new jxColor("#00CC66"), "7px"),
    _ = new jxPen(new jxColor("#FF9966"), "7px");
  (new jxBrush(new jxColor("yellow")).fillType = "linear-gradient"),
    (new jxBrush(new jxColor("blue")).fillType = "linear-gradient"),
    (new jxBrush(new jxColor("red")).fillType = "linear-gradient"),
    new jxBrush(new jxColor("black"));
  var w = new jxBrush(new jxColor("black")),
    E = 92 - 7.9 * Math.sqrt(Math.abs(a));
  if (a > -1) var S = y;
  else (S = _), (E = 183 - E);
  new jxLine(new jxPoint(34, E), new jxPoint(180, E), S).draw(c);
  var I = new jxFont("Tahoma");
  (I.size = "17px"), (I.weight = "normal");
  var b = new jxPen(new jxColor("white"), "1px"),
    T = new jxText(new jxPoint(101, 13), "N", I, b, w, 0);
  T.draw(c);
  var T = new jxText(new jxPoint(101, 184), "S", I, b, w, 0);
  T.draw(c);
  var T = new jxText(new jxPoint(14, 100), "W", I, b, w, 0);
  T.draw(c);
  var T = new jxText(new jxPoint(185, 100), "E", I, b, w, 0);
  T.draw(c);
  var b = new jxPen(new jxColor("white"), "2px"),
    M = new jxCircle(new jxPoint(107, 93), 76, b);
  M.draw(c), (e = 180 - e) < 0 && (e += 360);
  var C = 76 * Math.sin((e *= l)) + 106;
  (posiy = 76 * Math.cos(e) + 93),
    (pencolor = a > -1 ? g : u),
    new jxLine(new jxPoint(106, 92), new jxPoint(C, posiy), pencolor).draw(c);
  var M = new jxCircle(new jxPoint(106, 92), 5, $, w);
  if ((M.draw(c), PLib.iel >= 0)) {
    var I = new jxFont("arial narrow");
    I.size = "14px";
    var B = new jxPen(new jxColor("#ffffff"), "0px"),
      O = new jxBrush(new jxColor("#ffffff"));
  } else {
    var I = new jxFont("arial narrow");
    I.size = "14px";
    var B = new jxPen(new jxColor("#ff9966"), "0px"),
      O = new jxBrush(new jxColor("#ff9966"));
  }
  var T = new jxText(
      new jxPoint(116, 182),
      "Alt:" + parseInt(PLib.sat_alt) + " Km",
      I,
      B,
      O,
      0,
    ),
    L = new jxText(
      new jxPoint(6, 182),
      "Dist:" + parseInt(100 * parseInt(lastrange / 100)) + " Km",
      I,
      B,
      O,
      0,
    ),
    F = new jxText(new jxPoint(52, 116), "CLICK TO CHECK", I, B, O, 0),
    Z = new jxText(new jxPoint(54, 133), satname + " SATNOGS", I, B, O, 0);
  T.draw(c), L.draw(c), F.draw(c), Z.draw(c);
}
function Julian2Date(e) {
  var a = parseFloat(e),
    l = Math.floor(a),
    c = a - l,
    u = Math.floor((l - 1867216.25) / 36524.25),
    g = l + 1 + u - Math.floor(u / 4) + 1524,
    b = Math.floor((g - 122.1) / 365.25),
    $ = Math.floor(365.25 * b),
    y = Math.floor((g - $) / 30.6001),
    _ = y < 13.5 ? y - 1 : y - 13,
    w = _ < 2.5 ? b - 4715 : b - 4716;
  _ -= 1;
  var E = g - $ - Math.floor(30.6001 * y) + c,
    S = Math.floor(E);
  (E -= Math.floor(E)), (E *= 24);
  var I = Math.floor(E);
  (E -= Math.floor(E)), (E *= 60);
  var T = Math.floor(E);
  (E -= Math.floor(E)), (E *= 60);
  var M = Math.round(E);
  return new Date(Date.UTC(w, _, S, I, T, M));
}
function sleep(e) {
  for (
    var a = new Date().getTime(), l = 0;
    l < 1e7 && !(new Date().getTime() - a > e);
    l++
  );
}
function saveMapState(e) {
  (urlsola = (urlfuncion = (urlmatrix = window.location.href.split("/"))[
    urlmatrix.length - 1
  ]).split("?")),
    (urlreal = urlmatrix[urlmatrix.length - 2] + "/" + urlsola[0]),
    (biptext = !0 == bip ? "Bipon" : "Bipoff"),
    !0 == birdsw ? (biptext += "/Birdon") : (biptext += "/Birdoff"),
    !0 == localtime ? (biptext += "/Localtime") : (biptext += "/UTCtime"),
    (biptext =
      (biptext =
        (biptext = biptext + "/Tipo" + tiposel) + "/Order" + 1 * order) +
      "/Elev" +
      1 * elevationset),
    (activity =
      "Con " +
      urlreal +
      "/Loc;" +
      document.getElementById("loc").value +
      "/Lat:" +
      (1 * localat).toFixed(4) +
      "/Lon:" +
      (1 * localon).toFixed(4) +
      "/Z" +
      zoom +
      "/" +
      biptext +
      "/" +
      screen.width +
      "x" +
      screen.height +
      "/" +
      satactivity);
  var a = localat + "_" + localon;
  if (
    (!0 == bip ? (a += "_bipon") : (a += "_bipoff"),
    (a = a + "_" + zoom),
    !0 == birdsw ? (a += "_birdon") : (a += "_birdoff"),
    !0 == localtime ? (a += ",localtime") : (a += ",utctime"),
    (a = (a = a + ",Tipo" + tiposel) + ",Order" + 1 * order),
    elevationset || (elevationset = 0),
    (a =
      (a = a + ",Elev" + 1 * elevationset) +
      ",Aumento" +
      (1e3 * aumento).toFixed(0)),
    defaults && defaults.length > 5
      ? (a = a + "_" + defaults.replace(/,/g, ""))
      : (a += "_"),
    activity.split("/Auto").length > 5)
  ) {
    var l = activity.indexOf("/Auto"),
      c = activity.lastIndexOf("/Auto");
    activity =
      activity.slice(0, l) + "/Autos/" + activity.slice(c + 6, activity.length);
  }
  if ("Microsoft Internet Explorer" == navigator.appName)
    navigator.onLine &&
      "yes" == e &&
      "Microsoft Internet Explorer" != navigator.appName &&
      (document.location.href =
        "http://lu7aa.org/satlog.asp?datos=" +
        encodeURIComponent(activity) +
        "&hi=" +
        encodeURIComponent(horainicio) +
        "&TZ=TZ:" +
        huso);
  else if (
    navigator.onLine &&
    "yes" == e &&
    "Microsoft Internet Explorer" != navigator.appName
  ) {
    var u = new XMLHttpRequest(),
      g =
        "http://lu7aa.org/satlog.asp?datos=" +
        encodeURIComponent(activity) +
        "&hi=" +
        encodeURIComponent(horainicio) +
        "&TZ=TZ:" +
        huso,
      b =
        "datos=" +
        encodeURIComponent(activity) +
        "&hi=" +
        encodeURIComponent(horainicio) +
        "&TZ=TZ:" +
        huso;
    u.open("GET", g, !0),
      u.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
      u.setRequestHeader("Content-length", b.length),
      u.send(b);
  }
  setCookie("passCookie", a, 30), sleep(2e3);
}
function logactivity() {
  if (navigator.onLine) {
    if (
      ((urlsola = (urlfuncion = (urlmatrix = window.location.href.split("/"))[
        urlmatrix.length - 1
      ]).split("?")),
      (urlreal = urlmatrix[urlmatrix.length - 2] + "/" + urlsola[0]),
      (biptext = !0 == bip ? "Bipon" : "Bipoff"),
      !0 == birdsw ? (biptext += "/Birdon") : (biptext += "/Birdoff"),
      !0 == localtime ? (biptext += "/Localtime") : (biptext += "/UTCtime"),
      tiposel && (biptext = biptext + "/Tipo" + tiposel),
      order && (biptext = biptext + "/Order" + 1 * order),
      elevationset > 0 && (biptext = biptext + "/Elev" + 1 * elevationset),
      (activity =
        "Hourly/Con " +
        urlreal +
        "/Loc;" +
        document.getElementById("loc").value +
        "/Lat:" +
        (1 * localat).toFixed(4) +
        "/Lon:" +
        (1 * localon).toFixed(4) +
        "/Z" +
        zoom +
        "/" +
        biptext +
        "/" +
        screen.width +
        "x" +
        screen.height +
        "/" +
        satactivity).split("/Auto").length > 5)
    ) {
      var e = activity.indexOf("/Auto"),
        a = activity.lastIndexOf("/Auto");
      activity =
        activity.slice(0, e) +
        "/Autos/" +
        activity.slice(a + 6, activity.length);
    }
    if (
      (dateset &&
        (MockDate.reset(),
        Orb.generateTable(document.getElementById("passes")),
        (tablelasttime = new Date()),
        (dateset = !1),
        (document.getElementById("changedate").style.left = "211px"),
        (document.getElementById("cal").style.width = "16px"),
        (satactivity += "CALERESET/")),
      !vbasic)
    ) {
      var l = new XMLHttpRequest(),
        c =
          "http://lu7aa.org/satlog.asp?datos=" +
          encodeURIComponent(activity) +
          encodeURIComponent(horainicio) +
          "&TZ=TZ:" +
          huso,
        u =
          "datos=" +
          encodeURIComponent(activity) +
          "&hi=" +
          encodeURIComponent(horainicio) +
          "&TZ=TZ:" +
          huso;
      l.open("POST", c, !0),
        l.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
        l.setRequestHeader("Content-length", u.length),
        l.send(u);
    }
  }
}
function setCookie(e, a, l) {
  var c = new Date();
  c.setDate(c.getDate() + l);
  var u = a + (null == l ? "" : "; expires=" + c.toUTCString());
  document.cookie = e + "=" + u;
}
function calcaos(e, a, l) {
  if (!((diff = a - new Date() - 6e4 * deltaminutes) > 0)) return "";
  var c = (diff = Math.floor(diff / 1e3)) % 60,
    u = (diff = Math.floor(diff / 60)) % 60,
    g = (diff = Math.floor(diff / 60)) % 24;
  return (
    (diff = Math.floor(diff / 24)),
    1 * u < 10 && (u = "0" + u),
    1 * c < 10 && (c = "0" + c),
    '<font style="font-family:Arial;font-size:18px;font-weight:bold;line-height:16px;vertical-align:10%;"><center>' +
      e +
      " AOS in " +
      (deltatime = g + ":" + u + ":" + c) +
      "</center></font>"
  );
}
function tilt(e, a, l) {
  return (
    (longdiffr = (e - l) / 57.29578),
    (eslatr = a / 57.29578),
    (poltilt = -57.29578 * Math.atan(Math.sin(longdiffr) / Math.tan(eslatr)))
  );
}
function getip() {
  try {
    var e = new XMLHttpRequest();
    if (
      (e.open("GET", "https://api.ipify.org", !1),
      e.send(null),
      sleep(200),
      200 == e.status &&
        ((myip = e.responseText),
        (urllatlon =
          "https://api.ipdata.co/" +
          myip +
          "?api-key=fa181ab6aec1e3b1b2bcda4d2ca1d29d997b34358ce8cfd79473fd55"),
        e.open("GET", urllatlon, !1),
        e.send(null),
        sleep(200),
        (latf = 0),
        (lonf = 0),
        200 == e.status))
    ) {
      for (
        h = 0, resu1m = (resu1 = e.responseText).split(",");
        h < resu1m.length;
        h++
      )
        (resu2 = resu1m[h].replace(/\"/g, "")).indexOf("latitude") > -1 &&
          (latf = resu2.replace(/latitude: /, "")),
          resu2.indexOf("longitud") > -1 &&
            (lonf = resu2.replace(/longitude: /, ""));
      (localat = latf), (localon = lonf);
    }
  } catch (a) {
    (localat = 0),
      (localon = 0),
      alert(
        "Please set your location\nClicking to Location\nWill be saved for next run",
      );
  }
}
function calcaost(e, a) {
  if ((diff = e - new Date() - 6e4 * deltaminutes) > 0) {
    var l = (diff = Math.floor((diff = Math.floor(diff / 1e3)) / 60)) % 60,
      c = (diff = Math.floor(diff / 60));
    return 1 * l < 10 && (l = "0" + l), (deltatime = c + ":" + l);
  }
  var l =
      (diff = Math.floor(
        (diff = Math.floor(
          (diff = a - new Date() + 6e4 * deltaminutes) / 1e3,
        )) / 60,
      )) % 60,
    c = (diff = Math.floor(diff / 60));
  return 1 * l < 10 && (l = "0" + l), "-" + (deltadiff = l) + "'";
}
function flipsw(e) {
  var a = "";
  "dosw" == e.id &&
    (DopplerchangeDownlink
      ? ((DopplerchangeDownlink = !1), (a = "=OFF"))
      : ((DopplerchangeDownlink = !0), (a = "=ON"))),
    "upsw" == e.id &&
      (DopplerchangeUplink
        ? ((DopplerchangeUplink = !1), (a = "=OFF"))
        : ((DopplerchangeUplink = !0), (a = "=ON"))),
    (satactivity = satactivity + e.id.toUpperCase() + a + "/");
}
function enterfreq(e) {
  if ("UpLink" == e || "DownLink" == e) {
    "UpLink" == e && ((other = "DownLink"), (setdelta = uldeltad)),
      "DownLink" == e && ((other = " UpLink "), (setdelta = dldeltad)),
      (signo = -1),
      "NOR" == satfreq[satfreqpointer][8] && (signo = 1),
      (also = "NOT"),
      0 == satfreq[satfreqpointer][9] && (also = "also");
    var a = prompt(
      "Enter +/- displacement in Hertz for " +
        e +
        " Frequency\nWill " +
        also +
        " change " +
        other +
        " frequency (includes Doppler)\nOr as alternative could enter absolute frequency in KHz",
      setdelta,
    );
    null != a &&
      isNumeric(a) &&
      ("UpLink" == e &&
        ((uldeltad = 1 * a), "NOT" != also && (dldeltad = 1 * a * signo)),
      "DownLink" == e &&
        ((dldeltad = 1 * a), "NOT" != also && (uldeltad = 1 * a * signo)));
  }
  if ("Beacon" == e) {
    setdelta = bndeltad;
    var a = prompt(
      "Enter +/- displacement in Hertz for " + e + " Frequency",
      setdelta,
    );
    null != a && isNumeric(a) && (bndeltad = parseInt(1 * a));
  }
  satactivity = satactivity + e.substring(0, 3) + a + "/";
}
function test() {
  alert("test");
}
function loadMapState() {
  if (
    ((localat = (splitStr = getCookie("passCookie").split("_"))[0]),
    (localon = splitStr[1]),
    (bipset = !(splitStr.length > 2) || "bipon" == (bipcookie = splitStr[2])),
    (zoom = splitStr.length > 3 ? splitStr[3] : "1"),
    (birdsw = !0),
    splitStr.length > 4)
  ) {
    if (isNumeric(splitStr[4])) {
      if (((selsatsave = selsat.slice()), splitStr.length > 4)) {
        if ((selectnewsats = splitStr[4]).length > 1)
          for (
            k = 0, defaults = selectnewsats, selsat.length = 0;
            k < selectnewsats.length;
            k += 5
          )
            selsat.push(selectnewsats.substring(k, k + 5));
        else selsat = selsatsave.slice();
      } else selectnewsats = "";
    } else
      (birdsw = !0),
        splitStr[4].indexOf("birdoff") > -1 && (birdsw = !1),
        (localtime = !0),
        (deltaminutes = 0),
        splitStr[4].indexOf("utctime") > -1 &&
          ((localtime = !1), (deltaminutes = new Date().getTimezoneOffset())),
        splitStr[4].indexOf("Tipo") > -1 &&
          (tiposel = splitStr[4].substr(splitStr[4].indexOf("Tipo") + 4, 1)),
        splitStr[4].indexOf("Order") > -1 &&
          (order = splitStr[4].substr(splitStr[4].indexOf("Order") + 5, 1)),
        (elevationset = 0),
        splitStr[4].indexOf("Elev") > -1 &&
          !isNumeric(
            (elevationset = splitStr[4]
              .substr(splitStr[4].indexOf("Elev") + 4, 2)
              .replace(/,/, "")
              .replace(/_/, "")),
          ) &&
          (elevationset = 0),
        (aumento = 1),
        splitStr[4].indexOf("Aumento") > -1 &&
          (aumento =
            splitStr[4].substr(splitStr[4].indexOf("Aumento") + 7, 4) / 1e3);
  }
  if (splitStr.length > 5) {
    if (
      ((selsatsave = selsat.slice()), (selectnewsats = splitStr[5]).length > 1)
    )
      for (
        k = 0, defaults = selectnewsats, selsat.length = 0;
        k < selectnewsats.length;
        k += 5
      )
        selsat.push(selectnewsats.substring(k, k + 5));
    else selsat = selsatsave.slice();
  } else selectnewsats = "";
}
function getCookie(e) {
  var a,
    l,
    c,
    u = document.cookie.split(";");
  for (a = 0; a < u.length; a++)
    if (
      ((l = u[a].substr(0, u[a].indexOf("="))),
      (c = u[a].substr(u[a].indexOf("=") + 1)),
      (l = l.replace(/^\s+|\s+$/g, "")) == e)
    )
      return unescape(c);
  return "";
}
function gqs(e) {
  if ((q = (document.location + "").split("?"))[1]) {
    var a = q[1].split("&");
    for (i = 0; i < a.length; i++) {
      var l = a[i].split("=");
      if (l[0] == e) var c = l[1];
    }
  }
  return c;
}
function replacesatname(e) {
  var a = e;
  for (t = 0; t < replacetable.length; t++)
    replacetable[t][0] == e && (a = replacetable[t][1]);
  return a;
}
function gonext() {
  (satfreqpointer += 1) > maxsatfreq && (satfreqpointer = 0);
}
function changewisp(e) {
  wispmode = "dl" == e ? "dl" : "bn";
}
function blink(e) {
  function a() {
    document.getElementById("AOSLOS").innerHTML = "";
  }
  clearInterval(flash),
    "BC;" == e.substr(-3)
      ? (document.getElementById("AOSLOS").innerHTML =
          '<font style="color:#ffcc77;">' + e + "</font>")
      : (document.getElementById("AOSLOS").innerHTML =
          '<font style="color:#ccffcc;">' + e + "</font>"),
    (flash = setInterval(a, 400));
}
function chatbox() {
  (satactivity += "CHAT/"),
    (preferences =
      "toolbar=no,width=550px,height=455px,center,margintop=0,top=30,left=3,status=no,scrollbars=no,resizable=no,dependent=yes,z-lock=yes"),
    null != popup && popup.close(),
    (popupwi = window.open("chat/index.php", "win1", preferences)).setTimeout(
      "self.close()",
      864e5,
    );
}
function countarray(e) {
  var a = 0;
  for (o = 0; o < freq.length; o++) freq[o][9] == e && a++;
  return a;
}
function IEVersion() {
  var e = -1;
  if ("Microsoft Internet Explorer" == navigator.appName) {
    var a = navigator.userAgent;
    null != RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(a) &&
      (e = parseFloat(RegExp.$1));
  }
  return e;
}
function isOpera() {
  return null !== window.navigator.userAgent.match(/Opr\//);
}
function isIE() {
  return null !== window.navigator.userAgent.match(/MSIE|Trident/);
}
function detectIE() {
  return window.navigator.userAgent.indexOf("Edge/") > 0;
}
function versats(e) {
  for (
    omito = !!(5 != tiposel && (isIE() || detectIE())),
      !0 ==
        (IE7 = !!(
          "Microsoft Internet Explorer" == navigator.appName && IEVersion() > 0
        )) && (omito = !1),
      isOpera && (omito = !0),
      omito && (e = tiposel),
      null != popupwin && popupwin.close(),
      satactivity = satactivity + "SATS" + e + "/",
      k = 0,
      arr1 = [],
      arr2 = [],
      s = 0;
    s < alljs.length;
    s++
  )
    arr1[s] = ("0" + alljs[s][1].substring(2, 7).replace(/ /, "")).slice(-5);
  for (s = 0; s < freq.length; s++)
    arr2[s] = ("0" + freq[s][0].replace(/ /, "")).slice(-5);
  for (
    cuentafff = 0,
      ifff =
        '<center><table border=0 cellpadding=1 cellspacing=0 style="font-size:12px;font-family:Courier;line-height:10px;font-weight:bold;width:460px;"></tr>',
      ifff +=
        "<tr><td id='kepa' id=kepa></td><td colspan=12 id=kepi style=\"font-family:courier;font-size:12px;font-weight:bold;line-height:10px;\"></td></tr>",
      ifff =
        ifff +
        (encabe1 =
          '<tr style="color:#ffffff;background-color:#000000;"><td align=center>Cat #</td><td align=center>&nbsp;Desig.</td><td align=center>Launch&nbsp;</td><td align=center>Orbit#</td><td>&nbsp;H.Km.</td><td align=center>Inclin.</td><td align=center>Orb/Day</td><td style="white-space:nowrap;">Satellite Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>') +
        "<tr>",
      fff = "",
      trc = "<tr>",
      p = 0;
    p < alljs.length;
    p++
  ) {
    for (q = 0, found = !1; q < freq.length; q++)
      arr1[p] == arr2[q] && (found = !0);
    if (!found) {
      for (
        r = 0,
          anio = 1 * alljs[p][1].substring(9, 11) > 50 ? "19" : "20",
          trc =
            cuentafff % 2 == 0
              ? "<tr style='background-color:#e4e4e4;'>"
              : "<tr style='background-color:#ffffff;'>",
          altu = (maltura =
            Math.pow(
              (numerador =
                (c11 = 0x9306132f11f) *
                (orbseg2 =
                  (orbsegundos =
                    86400 / (periodo = 1 * alljs[p][2].substring(52, 60))) *
                  orbsegundos)),
              0.33333333333,
            ) /
              1e3 -
            6378).toFixed(0);
        r < alljs.length;
        r++
      )
        alljs[r][1].substring(2, 7) == alljs[p][1].substring(2, 7) &&
          (kepis =
            alljs[r][0].replace(/ /g, "&nbsp;") +
            "<br>" +
            alljs[r][1].replace(/ /g, "&nbsp;") +
            "<br>" +
            alljs[r][2].replace(/ /g, "&nbsp;"));
      (cuentafff += 1),
        (fff =
          fff +
          trc +
          "<td align=center><a href='#' onclick=\"document.getElementById('kepa').innerHTML='SAT<br>KEPs<br>TLE';document.getElementById('kepi').innerHTML='" +
          kepis +
          "'\">" +
          alljs[p][1].substring(2, 7) +
          "</a></td><td align=center>" +
          alljs[p][1].substring(8, 15) +
          "</td><td align=center>" +
          anio +
          alljs[p][1].substring(9, 11) +
          "</td><td align=center>" +
          1 * alljs[p][2].substring(63, 68) +
          "&nbsp;</td><td align=right>" +
          altu +
          '</td><td style="text-align:right;">' +
          alljs[p][2].substring(9, 13) +
          '&nbsp;</td><td style="text-align:right;">' +
          alljs[p][2].substring(52, 58) +
          "&nbsp;&nbsp;</td><td>" +
          alljs[p][0] +
          "</td></tr>\n");
    }
  }
  var a = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"> \n';
  for (
    a += "<html><head>\n",
      a +=
        '<meta http-equiv="Content-Type" content="text/html;charset=ISO-8859-1"> \n',
      a += "<title>Sats List</title> \n",
      a +=
        "<style>.botonch {text-decoration: none;border:outset;border-radius: 9px 9px 9px 9px;border-width:2px;background-color:lightblue;color:#000000;font-family:tahoma,arial,trebuchet;font-size:12px;font-weight:bold;line-height:18px;white-space:nowrap;}a hover{background-color: yellow;}</style>",
      a +=
        "</head><body bgcolor='#f0e8dc' style=\"margin-top:2px;margin-left:0px;margin-right:0px;overflow-x:hidden;\">\n",
      a += "<center>\n",
      !0 == omito ||
        ((a +=
          "<a href=# class='botonch' style=\"background-color:#9fef86\" onclick='opener.versats(0)'>\n"),
        (a +=
          "&nbsp;SSB Linear&nbsp;</a>&nbsp;&nbsp;&nbsp;<a href=# class='botonch' style=\"background-color:#ffff62;\" onclick='opener.versats(7)'>\n"),
        (a +=
          '&nbsp;SSB + FM&nbsp;</a>&nbsp;&nbsp;&nbsp;<a href=# class=\'botonch\' style="background-color:#ff6af7;" onclick="opener.versats(1);">\n'),
        (a +=
          "&nbsp;FM Voice&nbsp;</a>&nbsp;&nbsp;&nbsp;<a href=# class='botonch' style=\"background-color:#ffb084;\" onclick='opener.versats(2)'>\n"),
        (a +=
          "&nbsp;FM Digital&nbsp;</a>&nbsp;&nbsp;&nbsp;<a href=# class='botonch' style=\"background-color:#9ae1ff;\" onclick='opener.versats(3)'>\n"),
        (a +=
          "&nbsp;XMT Only&nbsp;</a>&nbsp;&nbsp;&nbsp;<a href=# class='botonch' style=\"background-color:#61c761;\" onclick='opener.versats(4)'>\n"),
        (a +=
          "&nbsp;Weather&nbsp;</a>&nbsp;&nbsp;&nbsp;<a href=# class='botonch' style=\"background-color:#e2e2e2;\" onclick='opener.versats(6)'>\n"),
        (a +=
          "&nbsp;ALL Sats&nbsp;</a>&nbsp;&nbsp;&nbsp;<a href=# class='botonch' style=\"background-color:#222222;color:#ffffff;\" onclick='opener.versats(9)'>\n"),
        (a += "&nbsp;UnClasif&nbsp;&nbsp;</a>&nbsp;&nbsp;&nbsp;")),
      a +=
        "<a href='#' onclick=\"self.close();\" style=\"font-family:Tahoma,Arial;font-size:14px;font-weight:bold;\">Go Back</a><br><span id=tit style='font-size:22px;font-weight:bold;font-family:Tahoma;color:#555555;'></span>\n",
      a +=
        "<span id=tit style='font-size:22px;font-weight:bold;font-family:Tahoma;color:#555555;'>",
      0 == e && (a = a + countarray(0) + " SSB LINEAR SATS"),
      7 == e &&
        (a =
          a +
          (1 * countarray(0) + 1 * countarray(1)) +
          " SSB LINEAR AND FM VOICE SATS"),
      1 == e && (a = a + +countarray(1) + " FM VOICE SATS"),
      2 == e && (a = a + countarray(2) + " FM & SSB DIGITAL SATS"),
      3 == e && (a = a + countarray(3) + " TRANSMIT ONLY SATS"),
      4 == e && (a = a + countarray(4) + " WEATHER METEOROLOGICAL SATS"),
      6 == e && (a = a + "ALL SATS (" + alljs.length + ")"),
      9 == e && (a = a + "UNCLASIFIED SATS (" + cuentafff + ")"),
      a += "</span ><br>",
      9 != e &&
        ((a +=
          '<table border="0" cellpadding="0" cellspacing="0" style="font-family:\'Arial Narrow\',Tahoma, Arial, \'Times New Roman\';font-size:11px;line-height:10px;align:center;width:auto;">'),
        (a +=
          '<tr><td id=kepa></td><td colspan=12 id=kepi style="font-family:courier;font-size:12px;font-weight:bold;line-height:10px;"></td></tr>'),
        (a +=
          '<tr style=\'font-size:bold;color:#ffffff;background-color:#000000;height:12px;\'><td align=center style="white-space:nowrap;cursor:pointer;" title="*=Selected&#13& Catalog #"><b>I CAT#</b></td><td align=center><b>NAME</b></td><td align=center style="cursor:pointer;" title="Center Frequency"><b>&nbsp;Uplink</b></td><td align=center style="cursor:pointer;" title="Center Frequency"><b>&nbsp;Dwlink</b></td><td align=center><b>&nbsp;Beacon</b></td><td align=center style="cursor:pointer;" title="Uplink Mode"><b>&nbsp;UM&nbsp;</b></td><td align=center style="cursor:pointer;" title="Downlink Mode"><b>&nbsp;&nbsp;DM&nbsp;&nbsp;</b></td><td align=center style="cursor:pointer;" title="Beacon Mode"><b>&nbsp;BM</b></td><td align=center><b>&nbsp;R/N</b></td><td align=center><b>&nbsp;T</b></td><td align=center style="cursor:pointer;" title="Subtone CTCSS"><b>&nbsp;ST</b></td><td align=center style=\'white-space:nowrap;\'><b>&nbsp;&nbsp;&nbsp;&nbsp;Emission Type&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td align=center><b>&nbsp;Comments&nbsp;</b></td></tr>')),
      i = 0;
    i < freq.length;
    i++
  ) {
    if (e < 6 && (freq[i][9] == e || 5 == freq[i][9])) {
      for (
        k % 2 == 0
          ? (a += "<tr style='background-color:#e4e4e4;'>")
          : (a += "<tr style='background-color:#ffffff;'>"),
          j = 0;
        j < 13;
        j++
      ) {
        1 == j
          ? (a += '<td align=center style="font-weight:bold;">')
          : (a += "<td align=center>");
        var l = !1;
        for (v = 0; v < selsat.length; v++)
          selsat[v] == freq[i][0].substr(0, 5) && (l = !0);
        if (
          (0 == j &&
            ("NA-" == freq[i][1].substring(0, 3) || l
              ? (a += "*")
              : (a += "&nbsp;")),
          1 == j)
        ) {
          for (r = 0; r < alljs.length; r++)
            alljs[r][1].substring(2, 7) == freq[i][0] &&
              (kepis =
                alljs[r][0].replace(/ /g, "&nbsp;") +
                "<br>" +
                alljs[r][1].replace(/ /g, "&nbsp;") +
                "<br>" +
                alljs[r][2].replace(/ /g, "&nbsp;"));
          a =
            a +
            "&nbsp;<a href='#' onclick=\"document.getElementById('kepa').innerHTML='SAT<br>KEPs<br>TLE';document.getElementById('kepi').innerHTML='" +
            kepis +
            "'\">" +
            freq[i][j]
              .replace(/height:76px;/, "height:4px;")
              .replace(/background-image: url/, "")
              .replace(/<br>Still <i>'Calling Home..'/, "")
              .replace(/LUSAT has survived<br>30 Years in Space/, "")
              .replace(/<br>/g, "&nbsp;")
              .replace(/&nbsp;&nbsp;/g, "&nbsp;") +
            "</a>";
        } else
          a =
            a +
            "&nbsp;" +
            freq[i][j]
              .replace(/height:76px;/, "height:4px;")
              .replace(/background-image: url/, "")
              .replace(/<br>Still <i>'Calling Home..'/, "")
              .replace(/LUSAT has survived<br>30 Years in Space/, "")
              .replace(/<br>/g, "&nbsp;")
              .replace(/&nbsp;&nbsp;/g, "&nbsp;");
        (a += "</td>"), (k += 1);
      }
      a += "</tr><tr>";
    }
    if (7 == e && (0 == freq[i][9] || 1 == freq[i][9] || 5 == freq[i][9])) {
      for (
        k % 2 == 0
          ? (a += "<tr style='background-color:#e4e4e4;'>")
          : (a += "<tr style='background-color:#ffffff;'>"),
          j = 0;
        j < 13;
        j++
      ) {
        1 == j
          ? (a += '<td align=center style="font-weight:bold;">')
          : (a += "<td align=center>");
        var l = !1;
        for (v = 0; v < selsat.length; v++)
          selsat[v] == freq[i][0].substr(0, 5) && (l = !0);
        if ((0 == j && (l ? (a += "*") : (a += "&nbsp;")), 1 == j)) {
          for (r = 0; r < alljs.length; r++)
            alljs[r][1].substring(2, 7) == freq[i][0] &&
              (kepis =
                alljs[r][0].replace(/ /g, "&nbsp;") +
                "<br>" +
                alljs[r][1].replace(/ /g, "&nbsp;") +
                "<br>" +
                alljs[r][2].replace(/ /g, "&nbsp;"));
          a =
            a +
            "&nbsp;<a href='#' onclick=\"document.getElementById('kepa').innerHTML='SAT<br>KEPs<br>TLE';document.getElementById('kepi').innerHTML='" +
            kepis +
            "'\">" +
            freq[i][j] +
            "</a>";
        } else a = a + "&nbsp;" + freq[i][j];
        (a += "</td>"), (k += 1);
      }
      a += "</tr><tr>";
    }
    if (6 == e) {
      for (
        k % 2 == 0
          ? (a += "<tr style='background-color:#e4e4e4;'>")
          : (a += "<tr style='background-color:#ffffff;'>"),
          j = 0;
        j < 13;
        j++
      ) {
        1 == j
          ? (a += '<td align=center style="font-weight:bold;">')
          : (a += "<td align=center>");
        var l = !1;
        for (v = 0; v < selsat.length; v++)
          selsat[v] == freq[i][0].substr(0, 5) && (l = !0);
        if (
          (0 == j &&
            ("NA-" == freq[i][1].substring(0, 3) || l
              ? (a += "*")
              : (a += "&nbsp;")),
          1 == j)
        ) {
          for (r = 0; r < alljs.length; r++)
            alljs[r][1].substring(2, 7) == freq[i][0] &&
              (kepis =
                alljs[r][0].replace(/ /g, "&nbsp;") +
                "<br>" +
                alljs[r][1].replace(/ /g, "&nbsp;") +
                "<br>" +
                alljs[r][2].replace(/ /g, "&nbsp;"));
          a =
            a +
            "&nbsp;<a href='#' onclick=\"document.getElementById('kepa').innerHTML='SAT<br>KEPs<br>TLE';document.getElementById('kepi').innerHTML='" +
            kepis +
            "'\">" +
            freq[i][j]
              .replace(/height:76px;/, "height:22px;")
              .replace(/background-image: url/, "")
              .replace(/<br>Still <i>'Calling Home..'/, "")
              .replace(/LUSAT has survived<br>30 Years in Space/, "")
              .replace(/<br>/, "") +
            "</a>";
        } else
          a =
            a +
            "&nbsp;" +
            freq[i][j]
              .replace(/height:76px;/, "height:22px;")
              .replace(/background-image: url/, "")
              .replace(/<br>Still <i>'Calling Home..'/, "")
              .replace(/LUSAT has survived<br>30 Years in Space/, "")
              .replace(/<br>/, "");
        (a += "</td>"), (k += 1);
      }
      k % 13 == 0 && (a += "</tr><tr>");
    }
  }
  9 != e
    ? ((a +=
        '<tr style=\'font-size:bold;color:#ffffff;background-color:#000000;height:12px;\'><td align=center style="white-space:nowrap;cursor:pointer;" title="*=Selected&#13& Catalog #"><b>I CAT#</b></td><td align=center><b>NAME</b></td><td align=center style="cursor:pointer;" title="Center Frequency"><b>&nbsp;Uplink</b></td><td align=center style="cursor:pointer;" title="Center Frequency"><b>&nbsp;Dwlink</b></td><td align=center><b>&nbsp;Beacon</b></td><td align=center style="cursor:pointer;" title="Uplink Mode"><b>&nbsp;UM&nbsp;</b></td><td align=center style="cursor:pointer;" title="Downlink Mode"><b>&nbsp;&nbsp;DM&nbsp;&nbsp;</b></td><td align=center style="cursor:pointer;" title="Beacon Mode"><b>&nbsp;BM</b></td><td align=center><b>&nbsp;R/N</b></td><td align=center><b>&nbsp;T</b></td><td align=center style="cursor:pointer;" title="Subtone CTCSS"><b>&nbsp;ST</b></td><td align=center style=\'white-space:nowrap;\'><b>&nbsp;&nbsp;&nbsp;&nbsp;Emission Type&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td align=center><b>&nbsp;Comments&nbsp;</b></td></tr>'),
      (a += "</table></center>"))
    : (a = a + ifff + fff + "</td></tr>" + encabe1 + "</table>"),
    (a += "</body></html>"),
    (preferences =
      "toolbar=no,width=800px,height=540px,center,margintop=0,top=75,left=65,status=no,scrollbars=yes,resizable=no,dependent=yes,z-lock=yes"),
    (popupwin = window.open("", "win", preferences)).document.write(a),
    popupwin.setTimeout("self.close()", 18e4);
}
function showhelp() {
  (satactivity += "HELP/"),
    (preferences =
      "toolbar=no,width=718px,height=583px,center,margintop=0,top=120,left=10,status=no,scrollbars=yes,resizable=no,dependent=yes,z-lock=yes"),
    null != popupwin && popupwin.close(),
    (popupwin = window.open("", "win", preferences)),
    (helpi =
      '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">\n'),
    (helpi += "<html><head>\n"),
    (helpi +=
      '<meta http-equiv="Content-Type" content="text/html;charset=ISO-8859-1">\n'),
    (helpi +=
      '<style type="text/css">li {list-style-position: outside;margin-left: 1em;} a:link {color: #ffffff;background-color:transparent;}a:visited {color: #ffffff;background-color:transparent;}a:hover {color: #ffffff ;background-color: red ;} a:active {color:#ffffff;background-color:#ff0000;} a:focus {color:#ffffff;background-color:#ff0000;}</style>\n'),
    (helpi += '<script language="javascript" type="text/javascript">\n'),
    (helpi +=
      "var english=\"<center><b>* This application predicts and tracks amateur satellites in real time (local or GMT)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<\\/b><\\/center><ul><li>Should set your location automatically, if not, click on blue <u>'Locator'<\\/u> label on top.<\\/li><li>Click on any colored icon, you'll see a intuitive graph showing actual Azim/Elev.<\\/li><li>Frequencies and modes of selected Satellite are shown with actual doppler.<\\/li><li>When sat clicked, shows path+coverage. Yellow icon marks Sat is in range.<\\/li><li>Table shows passes times/duration. Insure having correct time and timezone.<\\/li><li>Click on SUN will show day/night line, same for MOON, with usual EME freqs.<\\/li><li>By clicking on numbers at upper right, several zoomed maps are available.<\\/li><li>If sound enabled (red X), beep alerts for any Satellite approaching or leaving.<\\/li><li>Keps are updated daily (no need to update), most active Satellites are provided.<\\/li><li>Additional satellites can be added or deleted by clicking on '<u>+Sats<\\/u>' label on top.<\\/li><li>Application could be used in the field, runs even without Internet on any device.<\\/li><li>If <a href='pass.exe' Title='Download or Execute pass.exe program' target=_blank style='color:#facc2e;'>PASS.EXE<\\/a> runs concurrently with <a href='wispdde.exe' Title='Download or Execute wispDDE Driver' target=_blank style='color:#facc2e;'>wispDDE<\\/a> will control rotor and rig dopplers.<\\/li><li>If need <a href='MSCOMM32.OCX' Title='Download MSCOMM32.OCX' target=_blank style='color:#facc2e;'>MSCOMM32.OCX<\\/a> or <a href='mscomctl.OCX' Title='Download mscomctl.OCX' target=_blank style='color:#facc2e;'>mscomctl.OCX<\\/a>. Use admin regsvr32 on syswow64.<\\/li><li>If your locator not taken, start adding to url ?localat=xx.xxxx&localon=yy.yyyy .<\\/li><li>If using iPad or IOS and locator not taken, start adding to url ?locator=XXXXXX .<\\/li><li>To select a group add to url ?type= and any FM, SSB, SSBFM, NOAA, XMT, digital.<\\/li><li>If you want to start Pass with a specific satellite add to url ?sat=XXXXX .<\\/li><li>If you want to start Pass with only one satellite add to url ?satx=YYYYY .<\\/li><li>Or double click on a satellite, to see all sats again double click again.<\\/li><\\/ul><center><i>Enjoy!! Best 73 from LU7ABF, Pedro Converso, lu7abf at amsat.org.ar<\\/i><\\/center><br>\";\n"),
    (helpi +=
      "var espanol=\"<center><b>* Esta aplicaci&oacute;n predice y trackea Sat&eacute;lites amateur en tiempo real (local o GMT)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<\\/b><\\/center><ul><li>Deber&iacute;a poner autom&aacute;tico tu ubicaci&oacute;n, si no es as&iacute; clicke&aacute; arriba leyenda <u>Locator<\\/u>.<\\/li><li>Clicke&aacute; cualquier icono de color, ver&aacute;s gr&aacute;fico mostrando azimut y elevaci&oacute;n.<\\/li><li>Al seleccionar te muestra frecuencias y modos del Sat&eacute;lite y su Doppler real.<\\/li><li>Se muestran &oacute;rbita y cubrimiento, el icono amarillo indica Sat&eacute;lite al alcance.<\\/li><li>La tabla d&aacute; horario\\/duraci&oacute;n\\/azimuts. Asegur&aacute; tener bi&eacute;n d&iacute;a/hora/huso en tu PC.<\\/li><li>Al clickear el Sol, muestra l&iacute;nea d&iacute;a\\/noche y en la Luna frecuencias usuales TLT.<\\/li><li>Clickeando en n&uacute;meros arriba/derecha, podr&aacute;s ver varios acercamientos del mapa.<\\/li><li>Deshabilitando anuncios (X roja) un beep alerta Sat&eacute;lites apareci&eacute;ndo o y&eacute;ndose.<\\/li><li>Los Keplerianos se actualizan solos, se muestran los usuales Sat&eacute;lites activos.<\\/li><li>Dando click en '<u>+Sats<\\/u>' arriba en la pantalla, pod&eacute;s agregar o quitar Sat&eacute;lites.<\\/li><li>Pass puede usarse en el campo, corre a&uacute;n sin Internet en cualquier dispositivo.<\\/li><li>Si utiliz&aacute;s el <a href='pass.exe' Title='Bajar o Ejecutar el programa pass.exe' target=_blank style='color:#facc2e;'>PASS.EXE<\\/a> junto con el <a href='wispdde.exe' Title='Bajar o Ejecutar el Driver wispDDE' target=_blank style='color:#facc2e;'>wispDDE<\\/a> , pod&eacute;s controlar rotores y equipos.<\\/li><li>Si necesita <a href='MSCOMM32.OCX' Title='Download MSCOMM32.OCX' target=_blank style='color:#facc2e;'>MSCOMM32.OCX<\\/a> o <a href='mscomctl.OCX' Title='Download mscomctl.OCX' target=_blank style='color:#facc2e;'>mscomctl.OCX<\\/a>. Use admin regsvr32 en syswow64.<\\/li><li>Si no toma tu locator, arranca agregando a la url ?localat=xx.xxxx&localon=yy.yyyy .<\\/li><li>Si usas iPad o IOS y no toma tu locator, arranca agregando a la url ?locator=XXXXXX .<\\/li><li>Selecc. un grupo: agregar a url ?type= y cualquier FM, SSB, SSBFM, NOAA, XMT, digital.<\\/li><li>Si quiere empezar el Pass con un satelite especifico agregue a la url ?sat=YYYYY .<\\/li><li>Si quiere empezar el Pass con solo un satelite agregue a la url ?satx=XXXXX .<\\/li><li>O de doble click en un satelite, para ver de nuevo todos los sats, doble click de nuevo.<\\/li><\\/ul><center><i>Que lo disfrutes, 73 de LU7ABF, Pedro Converso, lu7abf arroba amsat.org.ar<\\/i><\\/center><br>\";\n"),
    (helpi +=
      "var portugues=\"&nbsp;&nbsp;&nbsp;&nbsp;<b>* Esta aplica&ccedil;&atilde;o prev&ecirc; e mostra sat&eacute;lites do radioamador em tempo real (local ou GMT)<\\/b><\\/center><font style='font-size:13px;'><ul style='padding:0;margin:16;'><li>Deve colocar a sua localiza&ccedil;&atilde;o automaticamente, se n&atilde;o clique acima lenda <b><u>Locator<\\/u><\\/b>.<\\/li><li>Clique em qualquer &iacute;cone de cor, voc&ecirc; vai ver gr&aacute;fico mostrando azimute e eleva&ccedil;&atilde;o.<\\/li><li>Ao selecionar, mostra freq&uuml;&ecirc;ncias e modos do sat&eacute;lite alem da sua Doppler real.<\\/li><li>Se mostra orbita e cobertura. Se o &iacute;cone e amarelo indica que o sat&eacute;lite e ao alcance.<\\/li><li>A tabela d&aacute; tempo/dura&ccedil;&atilde;o/azimutes. Certifique-se de ter bom dia/hora/fuso no seu PC.<\\/li><li>Ao clicar o &iacute;cone do Sol mostra linha dia/noite e da Lua frequ&ecirc;ncias habituais TLT.<\\/li><li>Clicando em n&uacute;meros acima/direita, voc&ecirc; ver&aacute; v&aacute;rias abordagens do mapa.<\\/li><li>Avisa com sinal sonoro se um sat&eacute;lite aparece ou vai, clique no X vermelho para parar o som.<\\/li><li>Keplers s&atilde;o atualizados sozinho, os sat&eacute;lites ativos usuais s&atilde;o mostrados.<\\/li><li>Clicando em <b><u>'+Sats'<\\/u><\\/b> acima na tela, voc&ecirc; pode adicionar ou remover sat&eacute;lites.<\\/li><li>PASS pode ser usada no campo, at&eacute; mesmo sem Internet. Opera em qualquer dispositivo.<\\/li><li>Se voc&ecirc; usar o <a href='pass.exe' Title='Bajar o Ejecutar el programa pass.exe' target=_blank style='color:#facc2e;'>PASS.EXE<\\/a> com o <a href='wispdde.exe' Title='Bajar o Ejecutar el Driver wispDDE' target=_blank style='color:#facc2e;'>wispDDE<\\/a>, voc&ecirc; pode controlar seus rotores e equipamentos.<\\/li><li>Se voc&ecirc; precisa <a href='MSCOMM32.OCX' Title='Download MSCOMM32.OCX' target=_blank style='color:#facc2e;'>MSCOMM32.OCX<\\/a> o <a href='mscomctl.OCX' Title='Download mscomctl.OCX' target=_blank style='color:#facc2e;'>mscomctl.OCX<\\/a>. Use admin regsvr32 en syswow64.<\\/li><li>Si localizador nao e tomado proba acrescentando a url com ?localat=xx.xxxx&localon=yy.yyyy .<\\/li><li>Para um gruppo, adicionar ao url ?type= e qualquer FM, SSB, SSBFM, NOAA, XMT, digital.<\\/li><li>Se voc&ecirc; quer come&ccedil;ar com um satelite especifico, adicionar ao url ?sat=YYYYY .<\\/li><li>Se voc&ecirc; quer come&ccedil;ar so com un satelite, adicionar ao url ?satx=XXXXX .<\\/li><li>Ou clique duas vezes em um sat, para ver todos os sats novamente, clique duas vezes.<\\/li><\\/ul><center><i>Apreci&aacute;-lo, 73 LU7ABF, Pedro Converso, lu7abf arroba amsat.org.ar<\\/i><\\/center><\\/font><br>\";\n"),
    (helpi +=
      "var deutsche=\"<div style='font-size:16px;line-height:16px;font-weight:normal;font-family:Arial Narrow,Tahoma;'><b>&nbsp;&nbsp;&nbsp;* Diese Anwendung sagt Flugbahnen von Amateurfunk-Satelliten in Echtzeit voraus (Lokalzeit oder GMT)<\\/b><br><br><ul style='padding:0;margin:0;'><li>Deine Position sollte automatisch gesetzt werden, falls nicht, klicke oben auf das blaue <u>'Locator'<\\/u>-Symbol.<\\/li><li>Klicke auf eines der farbigen Symbole um den Horizontalwinkel (Azimut) und Vertikalwinkel (Elevation) graphisch darzustellen.<\\/li><li>Es werden Betriebsart und Frequenzen (inklusive Doppler-Verschiebung) des ausgew&auml;hlten Satelliten angezeigt.<\\/li><li>Ist ein Satellit ausgew&auml;hlt, wird dessen Bahn und dessen (Funk-)Abdeckung angezeigt. Ein gelbes Symbol bedeutet, dass der Satellit in Reichweite ist.<\\/li><li>Die Tabelle zeigt eine &Uuml;bersicht der &Uuml;berflugzeiten und der &Uuml;berflugdauer. Stelle dazu sicher, dass auf deinem Computer die korrekte Zeit eingestellt ist.<\\/li><li>Klicke auf 'SUN' um die Tages- und Nachtlinie anzuzeigen, dasselbe gilt f&uuml;r 'Moon' f&uuml;r die &uuml;blichen EME (Erde-Mond-Erde) Frequenzen.<\\/li><li>Durch Anklicken der Zahlen oben rechts k&ouml;nnen verschiedene Kartenma&szlig;st&auml;be ausgew&auml;hlt werden.<\\/li><li>Wenn der Ton aktiviert ist (rotes X), werden Piept&ouml;ne f&uuml;r jeden Satelliten ausgegeben, der in Reichweite kommt oder diese verl&auml;sst.<\\/li><li>Die Kepler-Daten werden t&auml;glich aktualisiert (keine manuelle Aktualisierung notwendig) - die meisten aktiven Satelliten sind bereits eingetragen.<\\/li><li>Weitere Satelliten k&ouml;nnen durch klicken auf das <u>'+Sats'<\\/u>-Symbol hinzugef&uuml;gt oder gel&ouml;scht werden (oben auf der Seite).&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wenn du mit einem bestimmten Satelliten anfangen willst, fugst du zu url ?sat=XXXXX<\\/li><li>Die Anwendung kann auch im Feld eingesetzt werden, sie l&auml;uft auch ohne Internet auf jedem Ger&auml;t.<\\/li><li>Wenn Sie nicht Ihre Locator nehmen, starten Sie auf die URL hinzuzufugen ?localat=xx.xxxx&localon=yy.yyyy .<\\/li><li>Wenn <a href='pass.exe' Title='Download or Execute pass.exe program' target=_blank style='color:#facc2e;'><b>PASS.EXE<\\/b><\\/a> zusammen mit <a href='wispdde.exe' Title='Download or Execute wispDDE Driver' target=_blank style='color:#facc2e;'><b>wispDDE<\\/b><\\/a> ausgef&uuml;hrt wird, wird der Rotor und die Dopplerverschiebung des Funkger&auml;ts eingestellt.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Vielen Dank f&uuml;r die deutsche &Uuml;bersetzung, Hauke, DH4CK<\\/i><\\/li><li>Um einen einzelnen Satelliten zu sehen, doppelklicken Sie auf einen Satelliten. Um wieder alle Satelliten zu sehen, doppelklicken wieder.<\\/li><\\/ul><br><center><i>Viel Spass!!! Beste 73 von LU7ABF, Pedro Converso, lu7abf at amsat.org.ar<\\/i><\\/center><br><\\/div>\";\n"),
    (helpi +=
      "var italiano=\"<div style='font-size:14px;line-height:18px;font-weight:normal;'><b>* Questa applicazione prevede a tracciare satelliti radio amatoriali in tempo reale (locale/GMT)<\\/b><\\/font><font style='font-size:15px;'><br><ul style='padding:0;margin:8;'><li>Dovrebbe mettere automaticamente tua posizione, se clicchi sopra <u>Locator<\\/u> potrai inserire il tuo.<\\/li><li>Fare clic su qualsiasi icona di colore, vedi il grafico che mostra l&#39;azimut ed elevazione.<\\/li><li>Quando si selezionano i satelliti, si vedono le frequenze e  modalit&agrave;, con il suo effettivo Doppler.<\\/li><li>Sono indicati orbita e copertura, Un'icona gialla indica che il satellite &egrave; a portata di mano.<\\/li><li>La tabella d&agrave; il tempo/durata/azimut. Contiene inoltre di avere ora e giorno sul tuo PC.<\\/li><li>Quando si clicca il Sole viene mostrato il giorno\\/notte e le solite frequenze Luna TLT.<\\/li><li>Cliccando sui numeri sopra a destra, vedrete diversi ingrandimenti della mappa.<\\/li><li>Annunci e disattivazione (rosso X) avviso acustico ingresso e uscita del satellite.<\\/li><li>L&#39;aggiornamento dei dati Kepleriani avviene in automatico, vengono mostrati il satelliti attivi.<\\/li><li>Cliccando su <u>&#39;+ Sats&#39;<\\/u> sullo schermo, &egrave; possibile aggiungere o rimuovere i satelliti.<\\/li><li>Pass pu&ograve; essere utilizzato anche senza collegamento a Internet su qualsiasi dispositivo.<\\/li><li>Se si utilizza insieme <a href='wispdde.exe' Title='Download or Execute wispDDE Driver' target=_blank style='color:#facc2e;'>wispDDE<\\/a> e <a href='pass.exe' Title='Download or Execute pass.exe program' target=_blank style='color:#facc2e;'>PASS.EXE<\\/a>, &egrave; possibile controllare rotori e ricetrasmettitore.<\\/li><li>Se non si prendono il vostro locator, aggiungere alla url ?localat=xx.xxxx&localon=yy.yyyy .<\\/li><li>Se si vuole iniziare con un satellite specifica, aggiungere alla URL ?sat=XXXXX .<\\/li><li>Se si vuole iniziare con solo un satelite, aggiungere alla URL ?satx=YYYYY .<\\/li><li>Oppure fai doppio clic su un satellite, per vedere di nuovo tutti i sats, doppio clic recentemente.<\\/li><\\/ul><center><i>Grazie IZ5TEP, Filippo per l'aiuto in italiano e IK8XLD, Rocco per i preziosi suggerimenti<br><br>Godere!! Miglior 73 da LU7ABF, Pedro Converso, lu7abf a amsat.org.ar<\\/i><\\/center><br><\\/div>\";\n"),
    (helpi +=
      "var frances=\"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>* Cette application pr&eacute;dit et montre Satellites Amateur de temps r&eacute;el (local ou GMT)<\\/b><br><ul style='padding:0;margin:16;'><li>Devriez mettre votre position automatiquement, sinon cliquez dessus l&eacute;gende <b><u>Locator<\\/u><\\/b>.<\\/li><li>Cliquez sur l'ic&ocirc;ne de couleur, vous verrez graphique montrant azimut et le &eacute;l&eacute;vation.<\\/li><li>Lorsque les fr&eacute;quences de s&eacute;lection et modes vous montre le satellite et son Doppler r&eacute;elle.<\\/li><li>Ils sont repr&eacute;sent&eacute;s les orbites et la couverture. L'ic&ocirc;ne jaune indique la port&eacute;e satellite.<\\/li><li>Le tableau donne le temps/dur&eacute;e/azimuths. pr&eacute;tend &eacute;galement avoir jour/heure/fuseau de votre PC.<\\/li><li>En cliquant sur l'ic&ocirc;ne Soleil montre jour/nuit et sur la Lune fr&eacute;quences habituelles TLT.<\\/li><li>En cliquant sur les num&eacute;ros ci-dessus/droite, vous verrez plusieurs approches de la carte.<\\/li><li>Annonces D&eacute;sactivation (X rouge) Satellite Apparaissant bip d'avertissement ou de quitter.<\\/li><li>Keplerian sont mis &agrave; jour seul, les satellites actifs habituels sont pr&eacute;sent&eacute;s.<\\/li><li>En cliquant sur <b><u>'+Sats'<\\/u><\\/b> sur l'&eacute;cran, vous pouvez ajouter ou supprimer des satellites.<\\/li><li>PASS peut &ecirc;tre utilis&eacute; dans le domaine, m&ecirc;me sans internet fonctionne sur tout appareil.<\\/li><li>Si utilisez le <a href='pass.exe' Title='T&eacute;l&eacute;charger ou Execut&eacute;r pass.exe program' target=_blank style='color:#facc2e;'>PASS.EXE<\\/a> avec <a href='wispdde.exe' Title='T&eacute;l&eacute;charger ou Execut&eacute;r wispDDE Driver' target=_blank style='color:#facc2e;'>wispDDE<\\/a>, pouvez contr&ocirc;ler les rotors et votre &eacute;metteurs-r&eacute;cepteurs.<\\/li><li>Si ne prenez pas le locator, commencer a ajouter a l'url ?localat=xx.xxxx&localon=yy.yyyy .<\\/li><li>Si vous voulez commencer avec un satellite sp&eacute;cifique ajouter &agrave; l'url ?sat=XXXXX .<\\/li><li>Pour voir un seul sat double-cliquer sur un sat, pour revoir tous, double-cliquer encore.<\\/li><\\/ul><center><i>Profitez !!, 73 LU7ABF, Pedro Converso, lu7abf a amsat.org.ar<\\/i><\\/center><br>\";\n"),
    (helpi +=
      "var russian=\"<img alt='russian.gif' src='data:image\\/gif;base64,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'><br><br>\";\n"),
    (helpi +=
      "var turkish=\"<font style='font-size:16px;font-family:Arial Narrow,Tahoma;line-height:16px;font-weight:normal;'>&nbsp;<b>* Bu uygulama tahmini ve ger&#xe7;ek zamanl&#x131; olarak (yerel veya GMT saatiyle) amat&#xf6;r uydular&#x131; izler.<\\/b><br><br><ul style='padding:0;margin:0;'><li>Konumunuzun otomatik olarak ayarlam&#x131;&#x15f; olmas&#x131; gerekiyor. Ayarlanmam&#x131;&#x15f; ise &#xfc;stteki mavi <u><b>'Locator'<\\/b><\\/u> linkini t&#x131;klay&#x131;n&#x131;z.<\\/li><li>Renkli simgelerden herhangi birine t&#x131;klad&#x131;&#x11f;&#x131;n&#x131;zda, ger&#xe7;ek zamanl&#x131; bir Az/El grafi&#x11f;i g&#xf6;receksiniz.<\\/li><li>Se&#xe7;ilen uydunun frekans ve modlar&#x131; doppler'i verilmi&#x15f; olarak g&#xf6;sterilir.<\\/li><li>Uyduya t&#x131;klad&#x131;&#x11f;&#x131;n&#x131;zda, uydunun ge&#xe7;i&#x15f; yolu ve kapsama alan&#x131; g&#xf6;z&#xfc;k&#xfc;r. Sar&#x131; i&#x15f;aretli olanlar g&#xf6;r&#xfc;&#x15f; alan&#x131;n&#x131;zdaki uydulard&#x131;r.<\\/li><li>Tablo, uydular&#x131;n ge&#xe7;i&#x15f; zaman ve s&#xfc;relerini g&#xf6;sterir. Do&#x11f;ru zaman diliminde olmas&#x131;na dikkat ediniz.<\\/li><li>Gece-g&#xfc;nd&#xfc;z hatt&#x131; i&#xe7;in G&#xfc;NE&#x15f;'e, EME frekanslar&#x131; i&#xe7;in de AY'a t&#x131;klayabilirsiniz.<\\/li><li>Sa&#x11f; &#xfc;stteki say&#x131;lara t&#x131;klay&#x131;p harita &#xf6;l&#xe7;e&#x11f;ini de&#x11f;i&#x15f;tirebilirsiniz.<\\/li><li>Alarm &#xf6;zelli&#x11f;ini aktif etti&#x11f;inizde (K&#x131;rm&#x131;z&#x131; X), kapsama alan&#x131;n&#x131;za giren ve &#xe7;&#x131;kan uydular i&#xe7;in sesli uyar&#x131;lar alabilirsiniz.<\\/li><li>Aktif olarak kullan&#x131;lan uydular&#x131;n keps verileri (ayr&#x131;ca g&#xfc;ncellemenize gerek kalmaks&#x131;z&#x131;n) her g&#xfc;n otomatik olarak g&#xfc;ncellenir.<\\/li><li>Yukar&#x131;daki <u><b>'+Sats'<\\/b><\\/u> linkine t&#x131;klay&#x131;p tabloya uydu ekleyebilir veya &#xe7;&#x131;kartabilirsiniz.<\\/li><li>Uygulama herhangi bir cihazda, internet olmasa bile &#xe7;al&#x131;&#x15f;abilir.<\\/li><li>E&#x11f;er <a href='pass.exe' Title='Indirmek veya Y&uuml;r&uuml;tme pass.exe program' target=_blank style='color:#facc2e;'>PASS.EXE<\\/a> uygulamas&#x131;n&#x131; <a href='wispdde.exe' Title='Indirmek veya Y&uuml;r&uuml;tme wispDDE Driver' target=_blank style='color:#facc2e;'>wispDDE<\\/a> ile birlikte kullan&#x131;rsan&#x131;z, rotor ve cihaz/doppler kontrol&#xfc; yapabilirsiniz.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Te&#x15f;ekk&#xfc;rler !!! T&#xfc;rk &#xc7;eviri i&#xc7;in Fuat Volkan YAL&#xc7;INER, TA1IFV<\\/li><\\/ul><br><center>Keyifli kullan&#x131;mlar. 73 de LU7ABF, Pedro Converso, lu7abf{at}amsat.org.ar<\\/i><\\/center><\\/font><br>\";\n"),
    (helpi +=
      "var chinesse=\"<img alt='chin1.gif' src='data:image\\/gif;base64,R0lGODlhvQLWAYAAAP\\/\\/\\/wAAACH5BAUUAAEALAAAAAC9AtYBAAL\\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'><\\/div>\";\n"),
    (helpi +=
      "var japanese=\"<img alt='japan.gif' src='data:image/gif;base64,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'><\\/div>\";\n"),
    (helpi += "<\/script>"),
    (helpi +=
      '<title>Pass Help</title></head><body style="margin-top:0px;margin-left:0px;margin-right:0;" bgcolor="#172447">\n'),
    (helpi +=
      '<center><table border=0 cellpadding=0 cellspacing=0 style="font-family:Tahoma, Arial;font-size:14px;line-height:22px;color:#ffffff;font-weight:bold;">\n<tr><td style="font-family:Tahoma, Arial;font-size:14px;line-height:18px;font-weight:bold;width:700px;">\n'),
    (helpf =
      '<div id="lenguaje"><center><b>* This application predicts and tracks amateur satellites in real time (local or GMT)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></center><ul><li>Should set your location automatically, if not, click on blue <u>\'Locator\'</u> label on top.</li><li>Click on any colored icon, you\'ll see a intuitive graph showing actual Azim/Elev.</li><li>Frequencies and modes of selected Satellite are shown with actual doppler.</li><li>When sat clicked, shows path+coverage. Yellow icon marks Sat is in range.</li><li>Table shows passes times/duration. Insure having correct time and timezone.</li><li>Click on SUN will show day/night line, same for MOON, with usual EME freqs.</li><li>By clicking on numbers at upper right, several zoomed maps are available.</li><li>If sound enabled (red X), beep alerts for any Satellite approaching or leaving.</li><li>Keps are updated daily (no need to update), most active Satellites are provided.</li><li>Additional satellites can be added or deleted by clicking on \'<u>+Sats</u>\' label on top.</li><li>Application could be used in the field, runs even without Internet on any device.</li><li>If <a href=\'pass.exe\' Title=\'Download or Execute pass.exe program\' target=_blank style=\'color:#facc2e;\'>PASS.EXE</a> runs concurrently with <a href=\'wispdde.exe\' Title=\'Download or Execute wispDDE Driver\' target=_blank style=\'color:#facc2e;\'>wispDDE</a> will control rotor and rig dopplers.</li><li>If need <a href=\'MSCOMM32.OCX\' Title=\'Download MSCOMM32.OCX\' target=_blank style=\'color:#facc2e;\'>MSCOMM32.OCX</a> or <a href=\'mscomctl.OCX\' Title=\'Download mscomctl.OCX\' target=_blank style=\'color:#facc2e;\'>mscomctl.OCX</a>. Use admin regsvr32 on syswow64.</li><li>If your locator not taken, start adding to url ?localat=xx.xxxx&localon=yy.yyyy .</li><li>If using iPad or IOS and locator not taken, start adding to url ?locator=XXXXXX .</li><li>To select a sat group add to url ?type= and any FM, SSB, SSBFM, NOAA, XMT, digital.</li><li>If you want to start Pass with a specific satellite add to url ?sat=XXXXX .</li><li>If you want to start Pass with only a satellite add to url ?satx=YYYYY .</li><li>Or double click on a satellite, to see all sats again double click again.</li></ul><center><i>Enjoy!! Best 73 from LU7ABF, Pedro Converso, lu7abf at amsat.org.ar</i></center><br></div><center><input type=button style="font-weight:bold;" value="Exit Help" onclick="self.close()">&nbsp;&nbsp;<input type=button style="font-weight:bold;" value="Users Locations" onclick="opener.satactivity=opener.satactivity+\'LOCUSER/\';document.location.href=\'http://lu7aa.org/passlog.asp\'">&nbsp;&nbsp;<input type="button" onclick="document.location.href=\'http://lu7aa.org/satloglist.asp\'" style="font-weight:bold;" value="Users Usage" target=\'_self\'>&nbsp;&nbsp;<input type="button" onclick="document.location.href=\'http://lu7aa.org/decay.asp\'" style="font-weight:bold;" value="Decay" target=\'_self\'>&nbsp;&nbsp;<input type=button style="font-weight:bold;" value="Graphic Help" onclick="opener.graphichelp();">&nbsp;&nbsp;<input type=button style="font-weight:bold;" value="Comment & Grid Map" onclick="opener.comment();">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</center>\n'),
    (helpf += "</td></tr></table></center>\n"),
    (helpf += "</body></html>"),
    (helpt = helpi + help + helpf),
    popupwin.document.write(helpt),
    popupwin.setTimeout("self.close()", 12e4);
}
function birdimage() {
  birdsw
    ? ((document.bimg.src = "birdoff.gif"),
      (birdsw = !1),
      (satactivity += "BIRDON/"))
    : ((document.bimg.src = "birdon.gif"),
      (birdsw = !0),
      (satactivity += "BIRDOFF/"));
}
function rotorimage() {
  rotorsw
    ? ((document.rimg.src = "rotoroff.gif"),
      (rotorsw = !1),
      (satactivity += "ROTORON/"))
    : ((document.rimg.src = "rotoron.gif"),
      (rotorsw = !0),
      (satactivity += "ROTOROFF/"));
}
function speak() {
  bip
    ? ((document.spk.src = "speakeroff.gif"),
      (bip = !1),
      (satactivity += "BIPON/"))
    : ((document.spk.src = "speakeron.gif"),
      (bip = !0),
      (satactivity += "BIPOFF/"));
}
function MakeArray(e) {
  this.length = e;
  for (var a = 1; a <= e; a++) this[a] = 0;
  return this;
}
function getMapPosition(e, a, l) {
  1 == l
    ? ((displacement.x = 0), (displacement.y = 0))
    : ((displacement.y = -((-e + 90) * 1.5) * l + 135),
      (displacement.x = -((parseInt(a) + 180) * 1.5) * l * 1 + 270)),
    (borde = 0),
    displacement.y > 0 && (borde = -displacement.y),
    -displacement.y + 270 - 270 * l > 0 &&
      (borde = -displacement.y + 270 - 270 * l),
    0 != borde &&
      ((displacement.y = displacement.y + borde),
      (document.getElementById("home").style.top = 123 + borde + "px"));
}
function getxy(e, a, l) {
  (delta.x = parseInt((a + 180) * 1.5 * l + displacement.x)),
    (delta.y = parseInt((-e + 90) * 1.5 * l + displacement.y));
}
function getlatlon(e, a, l, c) {
  var u = 3440.07,
    g = 0.01745329252,
    b = 57.29577951308;
  (lata1 = e * g), (lona1 = a * g), (bearing2 = l * g);
  var $ = Math.asin(
      Math.sin(lata1) * Math.cos(c / u) +
        Math.cos(lata1) * Math.sin(c / u) * Math.cos(bearing2),
    ),
    y =
      lona1 +
      Math.atan2(
        Math.sin(bearing2) * Math.sin(c / u) * Math.cos(lata1),
        Math.cos(c / u) - Math.sin(lata1) * Math.sin($),
      );
  return ((out = new MakeArray(0)).lat2 = $ * b), (out.lon2 = y * b), out;
}
function getsunpos() {
  date = new Date();
  var e = 0.017453292519943295,
    a = (60 * date.getUTCHours() + date.getUTCMinutes()) / 1440,
    l = (date.getTime() / 864e5 + 2440587.5 - 2451545) / 36525,
    c = (280.46646 + l * (36000.76983 + 3032e-7 * l)) % 360,
    u = 357.52911 + l * (35999.05029 - 1537e-7 * l),
    g =
      c +
      (Math.sin(e * u) * (1.914602 - l * (0.004817 + 14e-6 * l)) +
        Math.sin(2 * e * u) * (0.019993 - 101e-6 * l) +
        289e-6 * Math.sin(3 * e * u)) -
      0.00569 -
      0.00478 * Math.sin(125.04 * e - 1934.136 * l),
    b =
      23 +
      (26 + (21.448 - l * (46.815 + l * (59e-5 - 0.001813 * l))) / 60) / 60 +
      0.00256 * Math.cos(125.04 * e - 1934.136 * l),
    $ = Math.asin(Math.sin(e * b) * Math.sin(e * g)) / e,
    y = 0.016708634 - l * (42037e-9 + 1267e-10 * l),
    _ = Math.tan(e * (b / 2)) * Math.tan(e * (b / 2)),
    w =
      (1440 * a +
        4 *
          ((_ * Math.sin(2 * e * c) -
            2 * y * Math.sin(e * u) +
            4 * y * _ * Math.sin(e * u) * Math.cos(2 * e * c) -
            0.5 * _ * _ * Math.sin(4 * e * c) -
            1.25 * y * y * Math.sin(2 * e * u)) /
            e)) %
      1440;
  (sunlon = -(w / 4 < 0 ? w / 4 + 180 : w / 4 - 180)), (sunlat = $);
}
function selectItemByValue(e, a) {
  for (var l = 0; l < e.options.length; l++)
    e.options[l].text == a && ((e.selectedIndex = l), (refresh = !0));
}
function kepschange(e, a) {
  clearTimeout(newcycle),
    (add = e),
    (del = a),
    kepsdeladd(),
    "Microsoft Internet Explorer" == navigator.appName
      ? (PLib.sat.length = PLib.tleData.length)
      : (PLib.sat.length = 0),
    (cualdiv = "home");
  var l = document.getElementById(cualdiv);
  for (
    l.parentNode.removeChild(l), r = 0;
    r < Orb.satelliteMarkers.length;
    r++
  ) {
    cualdiv = "satelliteMarker" + r;
    for (var l = document.getElementById(cualdiv); l.firstChild; )
      l.removeChild(l.firstChild);
    l.parentNode.removeChild(l);
  }
  (Orb.satelliteMarkers = []), arranque();
}
function fixcrc(e) {
  var a,
    l,
    c = 0;
  for (a = 0; a < 68; a++)
    (l = e.substring(a, a + 1)) >= "1" && l <= "9"
      ? (c += parseFloat(l))
      : "-" == l && c++;
  var u = c.toString().slice(-1);
  return e.substring(0, 68) + u;
}
function kepsupdate(e) {
  for (
    h = 0,
      newkepsm = (e = (e = (e = (e = (e = e.replace(/\n\n/g, "\n")).replace(
        /\n\n/g,
        "\n",
      )).replace(/\n\n/g, "\n")).replace(/\n\n/g, "\n")).replace(
        /\n\n/g,
        "\n",
      )).split("\n"),
      checkstart = !0,
      loginsert = "I:",
      starth = 0;
    h < newkepsm.length;
    h++
  )
    newkepsm[h].length > 3 &&
      newkepsm[h].length < 30 &&
      checkstart &&
      ((starth = h), (checkstart = !1));
  for (h = starth; h < newkepsm.length; h += 3)
    h + 1 <= newkepsm.length &&
      h + 2 <= newkepsm.length &&
      newkepsm[h].length > 3 &&
      newkepsm[h + 1].length < 71 &&
      newkepsm[h + 1].length > 68 &&
      newkepsm[h + 2].length < 71 &&
      newkepsm[h + 2].length > 68 &&
      "1 " == newkepsm[h + 1].substr(0, 2) &&
      "2 " == newkepsm[h + 2].substr(0, 2) &&
      newkepsm[h + 1].substr(2, 5) == newkepsm[h + 2].substr(2, 5) &&
      isNumeric(
        newkepsm[h + 1]
          .substr(16, 65)
          .replace(/ /g, "")
          .replace(/-/g, "")
          .replace(/\./g, "")
          .replace(/\+/g, ""),
      ) &&
      isNumeric(
        newkepsm[h + 2]
          .substr(8, 65)
          .replace(/ /g, "")
          .replace(/-/g, "")
          .replace(/\./g, "")
          .replace(/\+/g, ""),
      ) &&
      (" " == newkepsm[h].substr(1, 1) &&
        (newkepsm[h] = newkepsm[h].substr(2, newkepsm[h].length)),
      alljs.splice(alljs.length, 0, [
        newkepsm[h],
        fixcrc(newkepsm[h + 1]),
        fixcrc(newkepsm[h + 2]),
      ]),
      (loginsert = loginsert + newkepsm[h + 1].substr(2, 5) + ","));
  loginsert.length > 4 &&
    (satactivity += loginsert =
      loginsert.substr(0, loginsert.length - 1) + "/"),
    popupwin.close(),
    loginsert.length > 4 && setTimeout("showkeps('gotokeps')", 500);
}
function showkeps(e) {
  satactivity += "KEPS/";
  for (var a, l = "", c = 0, u = 0; u < alljs.length; u++)
    alljs[u][1].substr(18, 12) > l &&
      "999" != alljs[u][1].substr(3, 3) &&
      "5" > alljs[u][1].substr(18, 1) &&
      ((l = alljs[u][1].substr(18, 12)), (c = u));
  fech =
    (fecha = new Date(
      "20" + alljs[c][1].substr(18, 2),
      0,
      1 * alljs[c][1].substr(20, 3),
    )) + " ";
  var g = "";
  (d =
    "dated: " +
    fech.substring(4, 7) +
    "-" +
    fech.substring(8, 10) +
    " 20" +
    alljs[c][1].substr(18, 2) +
    " " +
    ("0" + parseInt(24 * alljs[c][1].substr(23, 3))).slice(-2) +
    " hs."),
    (g += '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">\n'),
    (g += "<html><head><title>Keps Add/Del/Insert</title>\n"),
    (g += '<style type="text/css">\n'),
    screen.availWidth < 801
      ? ((g +=
          ".tdtit {font-family: 'Courier New'; line-height:15px; font-size:12px; font-weight:bold; white-space: nowrap;}\n"),
        (g +=
          ".tddet {font-family: 'Courier New'; white-space: nowrap; font-size:12px; line-height:10px;cursor:pointer;font-weight:bold;}table{border-collapse: collapse;}tr {border:none;}td{border-right: solid 1px #000000;}\n"),
        (g +=
          ".tdch {font-family: monospace; white-space: nowrap; font-size:11px; line-height:9px;cursor:pointer;font-weight:bold;}</style>\n"))
      : ((g +=
          ".tdtit {font-family: 'Courier New'; line-height:17px; font-size:15px; font-weight:bold; white-space: nowrap;}\n"),
        (g +=
          ".tddet {font-family: 'Courier New'; white-space: nowrap; font-size:15px; line-height:10px;cursor:pointer;font-weight:bold;}table{border-collapse: collapse;}tr {border:none;}td{border-right: solid 1px #000000;}\n"),
        (g +=
          ".tdch {font-family: 'Courier New'; white-space: nowrap; font-size:13px; line-height:10px;cursor:pointer;font-weight:bold;}</style>\n")),
    (g +=
      '<meta http-equiv="Content-Type" content="text/html;charset=ISO-8859-1">\n'),
    (g += '<script language="javascript" type="text/javascript">\n'),
    (g += "function clearall(){\n"),
    (g += "document.getElementById('del').value='';\n"),
    (g += "document.getElementById('add').value='';\n"),
    (g += 'var table = document.getElementById("satelites");\n'),
    (g += 'var rows = table.getElementsByTagName("td");\n'),
    (g += "for(k = 5; k < rows.length-4; k++){\n"),
    (g +=
      "if (rows[k].style.backgroundColor==='rgb(187, 255, 170)'||rows[k].style.backgroundColor==='#bbffaa')\n{rows[k].style.backgroundColor=\"\";document.getElementById('del').value=document.getElementById('del').value+rows[k].innerHTML.substring(0,5)+',';}\n"),
    (g += "}\n"),
    (g += "}\n"),
    (g += "function markall()\n{"),
    (g += "document.getElementById('del').value='';\n"),
    (g += "document.getElementById('add').value='';\n"),
    (g += 'var table = document.getElementById("satelites");\n'),
    (g += 'var rows = table.getElementsByTagName("td");\n'),
    (g += "for(k = 5; k < rows.length-4; k++){\n"),
    (g +=
      "if (rows[k].style.backgroundColor==''){rows[k].style.backgroundColor='#bbffaa';document.getElementById('add').value=document.getElementById('add').value+rows[k].innerHTML.substring(0,5)+',';}\n"),
    (g += "}"),
    (g += "}\n"),
    (g += "function collect()\n{"),
    (g += 'var table = document.getElementById("satelites");\n'),
    (g += 'var rows = table.getElementsByTagName("td");\n'),
    (g += 'defaults = "00000,";\n'),
    (g +=
      "for(k = 5; k < rows.length-4; k++){if (rows[k].style.backgroundColor!=''){defaults=defaults+rows[k].innerHTML.substring(0,5)+',';}}\n"),
    (g +=
      'defaultm = defaults.split(",");defaultm.sort();defaults="";for (h=1;h<defaultm.length;h++){defaults=defaults+defaultm[h]+",";}opener.defaults=defaults;}\n'),
    (g += "function cambio(what,catalog){\n"),
    (g += "if (what.style.backgroundColor=='')\n"),
    (g +=
      "{what.style.backgroundColor=\"#bbffaa\";document.getElementById('add').value=document.getElementById('add').value+catalog+',';tochange=catalog+',';document.getElementById('del').value = document.getElementById('del').value.replace(tochange,\"\");}else{what.style.backgroundColor='';document.getElementById('del').value=document.getElementById('del').value+catalog+',';tochange=catalog+',';document.getElementById('add').value = document.getElementById('add').value.replace(tochange,\"\");}\n"),
    (g += "}\n"),
    (g += "function buscar(){\n"),
    (g += "if (busco.value.length>0)\n"),
    (g += "{buscando=busco.value.toLowerCase();\n"),
    (g += "opener.satactivity=opener.satactivity+\"S:\"+buscando+'/';\n"),
    (g += "var tds = document.getElementsByTagName('td');\n"),
    (g += "for (j=4;j<tds.length;j++){\n"),
    (g += "if (tds[j].innerHTML.toLowerCase().indexOf(buscando)>-1)\n"),
    (g += "{tds[j].style.color='ff2200';}\n"),
    (g += "else{tds[j].style.color='000000';}\n"),
    (g += "}}}\n"),
    (g += "<\/script>\n"),
    (g +=
      '</head><body style="margin-top:0;margin-bottom:0;margin-left:1px;margin-right:0px;">'),
    (g += "\n"),
    (g += '<center id="adddel" style="white-space: nowrap;">\n');
  var b,
    $ = window.parent.add;
  (g +=
    "<font style=\"font-family: 'Courier New'; line-height:14px; font-size:14px; font-weight:bold; white-space: nowrap;\">\n"),
    (g +=
      '<input type=text name="busco" id="busco" maxlength="15" size="5" onchange="buscar();" oninput="buscar();" style="height:18px;text-transform:uppercase;"><input type=button name=buscobutton id=buscobutton value="Search" onclick="buscar()" style="font-size:13px;font-weight:normal;line-height:13px;height:20px;">\n'),
    (g += "&nbsp;Click Sats to Add/Del from predictions and click \n"),
    (g +=
      '<input type="button" style="font-weight:bold;line-height:14px;height:20px;" onclick="opener.kepschange(document.getElementById(\'add\').value,document.getElementById(\'del\').value);self.close();" name="Submit" value="Submit">'),
    (g +=
      '&nbsp;or&nbsp;<a href="javascript:self.close();">Go Back</a></font>\n'),
    (g =
      (g =
        g +
        '<input style="visibility:hidden;" name="del" id="del" type=text maxlength=1420 size=1 value=\'' +
        window.parent.del +
        "'>\n") +
      '<input style="visibility:hidden;" name="add" id="add" type=text maxlength=1420 size=1 value=\'' +
      $ +
      "'>\n"),
    (g +=
      '<form target="pass" name="changes" id="changes" action="pass.htm" onsubmit="self.close();" style="margin-bottom:0;margin-top:0;margin-left:0px;margin-right:0px;">\n'),
    (g +=
      "<table border=0 id='satelites' cellpadding=0 cellspacing=0 style=\"font-family: 'Courier New'; font-size:12px; font-weight:bold; line-height:13px;width:98%;\"><tr>"),
    (g += "\n"),
    (g += '<td class="tdtit"><u>CATNO</u> <u>Satellite Name</u></td>'),
    (g += "\n"),
    (g += '<td class="tdtit"><u>CATNO</u> <u>Satellite Name</u></td>'),
    (g += "\n"),
    (g += '<td class="tdtit"><u>CATNO</u> <u>Satellite Name</u></td>'),
    (g += "\n"),
    (g += '<td class="tdtit"><u>CATNO</u> <u>Satellite Name</u></td>'),
    (g += "\n");
  var y = 0;
  for (u = 0; u < Math.floor(alljs.length / 4 + 1); u++)
    for (
      g += "</tr><tr>", j = u;
      j < alljs.length;
      j += Math.floor(alljs.length / 4 + 1)
    ) {
      for (k = 0, color = ""; k < PLib.tleData.length; k++)
        alljs[j][1].substr(2, 5) == PLib.tleData[k][1].substr(2, 5) &&
          ((color = "background-color:#bbffaa;"), y++);
      (g =
        g +
        ("<td onclick=\"cambio(this,'" +
          (catalog = alljs[j][1].substr(2, 5)) +
          '\');" class="tddet" style="' +
          color +
          '">' +
          alljs[j][1].substr(2, 5) +
          " ") +
        replacesatname(alljs[j][0]) +
        "</td>"),
        (g += "\n");
    }
  (g =
    g +
    ('<td align=center style="background-color:#fff380;border-right: solid 0px;">' +
      alljs.length +
      " Sats, ") +
    y +
    " Selected</td>"),
    (g += "</tr><tr>"),
    (g +=
      '<td align=right valign=top style="border-right: solid 0px;">Paste here + Keps to add:&nbsp;<br>Formated as 2 lines (TLE)&nbsp;<br><input type=button onclick="opener.kepsupdate(document.getElementById(\'kepsnew\').value);self.close();" name=nkeps style="font-weight:bold;" id=nkeps value="  Send New Keps  ">&nbsp;&nbsp;</td>\n'),
    (g +=
      '<td colspan=2 align=left style="border-right: solid 0px;"><textarea name="kepsnew" id="kepsnew" cols="70" rows="3" style="font-size:9px;line-height:9px;font-weight:bold;"></textarea></td><td align=center style="border-right: solid 0px;"><input type=button value=\'Clear All\' style=\'font-weight:bold;\' onclick=\'clearall();\'>&nbsp;<input type=button value=\'Mark All\' style=\'font-weight:bold;\' onclick=\'markall();\'>\n'),
    (g +=
      "<br><font style=\"font-family:Arial;font-size:15px;font-weight:bold;vertical-align:15%;\">Save</font><input style=\"font-weight:bold;\" type=button value=\"This\" onclick=\"collect();opener.satactivity=opener.satactivity+'This/';opener.kepschange(document.getElementById('add').value,document.getElementById('del').value);opener.saveMapState('yes');self.close();\">\n"),
    (g +=
      "<input style=\"font-weight:bold;\" type=button value=\"Original\" onclick=\"opener.defaults='';opener.satactivity=opener.satactivity+'Orig/';opener.selsat=opener.selsatsave.slice();opener.loadTLE();opener.kepschange('','');self.close();\">\n"),
    (g += "</td></tr></table></form></center>"),
    (g +=
      '<div style="white-space: nowrap;"><font style="font-family: Courier; font-size:15px; line-height:12px; font-weight:bold;">'),
    (g += "&nbsp;"),
    (g += "\n"),
    (g = g + "Last Keplerian Data used in Nasa Format&nbsp;" + d),
    (g += "\n"),
    (g +=
      '&nbsp;&nbsp;&nbsp;<a href="javascript:self.close();">Go Back</a><br>'),
    (g += "\n"),
    (g +=
      '<div class="tdch">&nbsp;These Keps at <a href="http://amsat.org.ar/keps.txt" target="_blank">http://amsat.org.ar/keps.txt</a>&nbsp;or&nbsp;<a href="http:\/\/lu7abf.com.ar:8080\/amsat.org.ar\/keps.txt\" target="_blank">http://lu7abf.com.ar/keps.txt</a></div><br>'),
    (g += "\n");
  for (var u = 0; u < PLib.tleData.length; u++)
    (g += PLib.tleData[u][0] + "<br>"),
      (g += PLib.tleData[u][1].replace(/ /g, "&nbsp;") + "<br>"),
      (g += "\n"),
      (g += PLib.tleData[u][2].replace(/ /g, "&nbsp;") + "<br>"),
      (g += "\n");
  (g += "</font></div>"),
    (g += "<br></body></html>"),
    (preferences =
      "toolbar=no,width=" +
      (screen.availWidth - 14) +
      "px,height=" +
      (screen.availHeight - 30) +
      "px,center,margintop=0,top=0,left=10,status=no,scrollbars=yes,resizable=no,dependent=yes,z-lock=yes"),
    null != popupwin && popupwin.close(),
    (popupwin = window.open("", "win", preferences)).document.write(g),
    popupwin.setTimeout("self.close()", 12e4);
}
function screensize() {
  1 == aumento
    ? ((aumento = (screen.availWidth - screen.availWidth / 14) / 8 / 100),
      (document.getElementById("sz").innerHTML = "&#9661;"))
    : ((aumento = 1), (document.getElementById("sz").innerHTML = "&#9651;")),
    navigator.userAgent.indexOf("Firefox") > 0
      ? ((document.body.style.MozTransform = "scale(" + aumento + ")"),
        (document.body.style.MozTransformOrigin = "0 0"))
      : (document.body.style.zoom = 100 * aumento + "%"),
    (satactivity = satactivity + "AUMENTO" + (1e3 * aumento).toFixed(0) + "/");
}
function formatTLEMatrix(matrix) {
  let counter = 0;
  return matrix
    .filter(
      (row) =>
        Array.isArray(row) &&
        row.length > 0 &&
        !row.some(
          (el) =>
            (typeof el === "number" && isNaN(el)) ||
            (typeof el === "string" &&
              (el.includes("<!DOCTYPE") || el.includes("*//W3C"))),
        ),
    )
    .map((row) => {
      let name = null;
      let line1 = null;
      let line2 = null;
      for (const entry of row) {
        if (typeof entry !== "string") continue;
        if (entry.startsWith("1 ")) {
          line1 = entry;
        } else if (entry.startsWith("2 ")) {
          line2 = entry;
        } else {
          name = entry;
        }
      }
      return [name || "UNKNOWN-" + ++counter, line1, line2];
    })
    .filter((entry) => entry[1] && entry[2]);
}
function load() {
  1 == aumento && document.getElementById("sz")
    ? (document.getElementById("sz").innerHTML = "&#9651;")
    : (document.getElementById("sz").innerHTML = "&#9661;"),
    (document.body.style.zoom = 100 * aumento + "%"),
    navigator.userAgent.indexOf("Firefox") > 0 &&
      ((document.body.style.MozTransform = "scale(" + aumento + ")"),
      (document.body.style.MozTransformOrigin = "0 0")),
    // 0 > document.location.href.toLowerCase().indexOf("amsat") &&
    //   alert(
    //     " Please use http://amsat.org.ar/pass\nInstead of " +
    //       document.location.href,
    //   ),
    gqs("locator") &&
      ((localocator = (localocalm = gqs("locator").split("#"))[0]),
      (document.getElementById("loc").value = localocator)),
    (vbasic = eval(document.getElementById("vbasic").innerHTML)),
    (document.getElementById("passes").style.width = "540px"),
    navigator.cookieEnabled ||
      (document.getElementById("trackingdata").innerHTML =
        '<center>Click on Satellite<br>To see Az/El/Freq<br><font style="font-size:14px;line-height:12px;color:cyan;">Cookies need be enabled<br>To Save Your Selections</font></center>'),
    "Microsoft Internet Explorer" != navigator.appName &&
      (document.getElementById("linkeos").className = "noprint"),
    window.addEventListener
      ? window.addEventListener("beforeunload", function (e) {
          saveMapState("yes"), sleep(1500);
        })
      : (window.onbeforeunload = function () {
          saveMapState("yes"), sleep(1500);
        }),
    1 == zoom
      ? (document.getElementById("Div1").style.color = "#000000")
      : (document.getElementById("Div1").style.color = "#ffffff"),
    (document.getElementById("z" + zoom).style.backgroundColor = "yellow"),
    (document.getElementById("z" + zoom).style.color = "red"),
    localat
      ? (document.wwl.lat.value = localat)
      : (document.wwl.lat.value = "0"),
    localon
      ? (document.wwl.lon.value = localon)
      : (document.wwl.lon.value = "0"),
    bipset
      ? ((bip = !0), (document.spk.src = "speakeron.gif"))
      : ((bip = !1), (document.spk.src = "speakeroff.gif")),
    birdsw
      ? (document.bimg.src = "birdon.gif")
      : (document.bimg.src = "birdoff.gif"),
    1 == selsat.length && (selsat = selsatsave.slice());
  var rightNow = new Date(),
    jan1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0),
    temp = jan1.toGMTString(),
    jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1)),
    std_time_offset = (jan1 - jan2) / 36e5,
    june1 = new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0, 0);
  temp = june1.toGMTString();
  alljs = formatTLEMatrix(alljs);
  var dedonde,
    daylight_time_offset,
    june2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));
  if (
    ((dst = std_time_offset == (june1 - june2) / 36e5 ? 0 : 1),
    (indst = isDST()),
    loadTLE(),
    elevationset > 0 &&
      (document.getElementById("elevatio").style.color = "#ff3126"),
    "35.2292" == document.wwl.lat.value &&
      "0.0417" == document.wwl.lon.value &&
      ((document.wwl.lon.value = "-97.2917"),
      (document.wwl.loc.value = "EM15IF")),
    locator(wwl),
    (localat = (1 * document.wwl.lat.value).toFixed(4).toString()),
    (localon = (1 * document.wwl.lon.value).toFixed(4).toString()),
    1 == dst &&
      ((dstinfo = "D"), !0 == indst ? (dstinfo += "T") : (dstinfo += "F")),
    "" != dstinfo && (satactivity = "DT:" + dstinfo + "/"),
    navigator.cookieEnabled || (satactivity += "Cookie:D/"),
    (document.getElementById("Logging").innerHTML =
      "http://www.lu7aa.org/satlog.asp?hi=" +
      horainicio +
      "&TZ=TZ:" +
      huso +
      "&datos=Con%20Pass.exe%20Loc:" +
      document.getElementById("loc").value +
      "%20Lat:" +
      localat +
      "%20Lon:" +
      localon +
      "%20"),
    setInterval("logactivity()", 36e5),
    (vbasic || vbasice) &&
      ((document.getElementById("cal").style.visibility = "hidden"),
      (document.getElementById("changedate").style.visibility = "hidden"),
      (document.getElementById("changedate").style.visibility = "hidden")),
    arranque(),
    gqs("sat"))
  ) {
    var satrequested = (gqs("sat").toUpperCase() + " ").substring(0, 5);
    for (
      satrequested.indexOf("ISS") > -1 && (satrequested = "ARISS"), i = 0;
      i < Orb.satelliteMarkers.length;
      i++
    ) {
      var start_pos =
          document
            .getElementById("satelliteMarker" + i)
            .innerHTML.indexOf(">") + 1,
        end_pos = document
          .getElementById("satelliteMarker" + i)
          .innerHTML.indexOf("<", start_pos),
        satename = document
          .getElementById("satelliteMarker" + i)
          .innerHTML.substring(start_pos, end_pos);
      satrequested == (satename = satename.toUpperCase()) && sh(i + 1, "n");
    }
  }
  if (gqs("type")) {
    var typereq = gqs("type").toLowerCase().replace(/#/, "");
    ("fmsats" == typereq ||
      "fm" == typereq ||
      "satsfm" == typereq ||
      "1" == typereq) &&
      (document.getElementById("click1").click(), selectTLE(1)),
      ("ssbsats" == typereq || "ssb" == typereq || "0" == typereq) &&
        (document.getElementById("click0").click(), selectTLE(0)),
      ("ssbfm" == typereq || "ssb+fm" == typereq || "7" == typereq) &&
        (document.getElementById("click7").click(), selectTLE(7)),
      ("noaa" == typereq ||
        "meteo" == typereq ||
        "weather" == typereq ||
        "4" == typereq) &&
        (document.getElementById("click4").click(), selectTLE(4)),
      ("all" == typereq || "6" == typereq) &&
        (document.getElementById("click6").click(), selectTLE(6)),
      ("xmt" == typereq || "xmtonly" == typereq || "3" == typereq) &&
        (document.getElementById("click3").click(), selectTLE(3)),
      ("digital" == typereq || "2" == typereq) &&
        (document.getElementById("click2").click(), selectTLE(2)),
      ("inrange" == typereq ||
        "range" == typereq ||
        "default" == typereq ||
        "5" == typereq) &&
        (document.getElementById("click5").click(), selectTLE(5));
  }
  if (
    (gqs("z") &&
      (1 == (zf = gqs("z").replace(/#/, "")) &&
        document.getElementById("z1").click(),
      2 == zf && document.getElementById("z1.5").click(),
      3 == zf && document.getElementById("z2.2").click(),
      4 == zf && document.getElementById("z3.5").click(),
      5 == zf && document.getElementById("z5.3").click(),
      6 == zf && document.getElementById("z8").click(),
      8 == zf && document.getElementById("z8").click(),
      16 == zf && document.getElementById("z16").click()),
    gqs("t") &&
      ("l" == (tiz = gqs("t").replace(/#/, "").toLowerCase()) &&
        ((deltaminutes = 0),
        (localtime = !0),
        Orb.generateTable(document.getElementById("passes"))),
      "z" == tiz &&
        ((deltaminutes = new Date().getTimezoneOffset()),
        (localtime = !1),
        Orb.generateTable(document.getElementById("passes")))),
    gqs("s")
      ? (order = gqs("s") >= "0" && "3" >= gqs("s") ? gqs("s") : "1")
      : "" == order && (order = "1"),
    gqs("satx"))
  ) {
    for (k = 1, recoversat = "", elimsat = ""; k < PLib.tleData.length; k++)
      (elimsat = elimsat + PLib.tleData[k][1].substr(2, 5) + ","),
        (recoversat = recoversat + PLib.tleData[k][1].substr(2, 5) + ",");
    for (
      n = 0, agresat = "", satrequestedm = gqs("satx").toUpperCase().split(",");
      n < satrequestedm.length;
      n++
    ) {
      if (
        ((satrequested = (satrequested = (satrequested = (satrequested =
          (satrequested = satrequestedm[n]
            .toUpperCase()
            .replace(/%20/g, "")).replace(/NOAA/, "NA")).replace(
          /#/,
          "",
        )).replace(/ITF/, "TO-89")).replace(/%20/, " ")),
        (satrequested += "   "),
        (satrequested = satrequested.substring(0, 5)).indexOf("MOON") > -1 &&
          (satrequested = ""),
        satrequested.indexOf("ISS") > -1 && (satrequested = "25544"),
        satrequested.indexOf("LUSAT") > -1 && (satrequested = "20442"),
        satrequested.indexOf("LUSEX") > -1 && (satrequested = "41557"),
        "CAS6A" == satrequested && (satrequested = "CAS-6"),
        isNumeric(satrequested.substr(0, 1)))
      )
        for (k = 1; k < alljs.length; k++)
          satrequested == alljs[k][1].substr(2, 5) &&
            (agresat = agresat + satrequested + ",");
      else
        for (k = 0; k < freq.length; k++)
          satrequested.toUpperCase() == freq[k][1].substr(0, 5).toUpperCase() &&
            (agresat = agresat + freq[k][0] + ",");
      if (!isNumeric(satrequested))
        for (k = 1; k < alljs.length; k++)
          satrequested.toUpperCase() ==
            alljs[k][0].substr(0, 5).toUpperCase() &&
            (agresat = agresat + alljs[k][1].substr(2, 5) + ",");
    }
    agresat
      ? kepschange(agresat, elimsat)
      : alert(
          alert(
            gqs("satx").toUpperCase().replace("#", "") +
              " Not Found\nTry celestrak.com",
          ),
        ),
      Orb.satelliteMarkers.length > 1
        ? document.getElementById("satelliteMarker1").click()
        : (kepschange(recoversat, ""),
          alert(gqs("satx").toUpperCase() + " Not Found"));
  }
  if (
    (gqs("date") &&
      (isNumeric(
        (datereq = gqs("date")
          .replace(/\//g, ",")
          .replace(/\./g, ",")
          .replace(/ /g, ",")
          .replace(/%20/g, ",")
          .replace(/:/g, ",")
          .replace(/;/g, ",")
          .replace(/,,/g, ",")
          .replace(/#/g, "")).replace(/,/g, ""),
      )
        ? ((act = new Date()),
          (nuevafecham = datereq.split(","))[0] ||
            (nuevafecham[0] = 1 * act.getDay()),
          nuevafecham[1] || (nuevafecham[1] = 1 * act.getMonth()),
          nuevafecham[2] || (nuevafecham[2] = 1 * act.getFullYear()),
          nuevafecham[3] || (nuevafecham[3] = 0),
          nuevafecham[4] || (nuevafecham[4] = 0),
          nuevafecham[5] || (nuevafecham[5] = 0),
          MockDate.set(
            new Date(
              nuevafecham[2],
              1 * nuevafecham[1] - 1,
              nuevafecham[0],
              nuevafecham[3],
              nuevafecham[4],
              nuevafecham[5],
            ),
          ),
          (dateset = !0),
          (satactivity =
            satactivity +
            "CALEINIT" +
            ("0" + 1 * nuevafecham[1]).slice(-2) +
            ("0" + nuevafecham[0]).slice(-2) +
            ("0" + nuevafecham[3]).slice(-2) +
            ("0" + nuevafecham[4]).slice(-2) +
            "/"),
          dateset &&
            ((document.getElementById("changedate").style.left = "190px"),
            (document.getElementById("cal").style.width = "52px")),
          Orb.generateTable(document.getElementById("passes")),
          (tablelasttime = new Date()),
          (document.getElementById("Div1").innerHTML = ""),
          (document.getElementById("Div1").innerHTML =
            "Next passes at your location. Starting at " +
            tablelasttime.toTimeString()))
        : alert(
            "Date " +
              gqs("date") +
              " not valid\n\nShould be dd/mm/year h:m:s\nOr just dd/mm or dd/mm/year\n Reverted to you PC date/time",
          )),
    document.getElementById("ty5"))
  ) {
    for (cu = 0; cu < 5; cu++) {
      var cuenta0 = 0;
      for (k = 0; k < freq.length; k++) freq[k][9] == cu && (cuenta0 += 1);
      (cuentaf = " " + cuenta0),
        document.getElementById("ty" + cu) &&
          (document.getElementById("ty" + cu).innerText = cuentaf.replace(
            / /g,
            "",
          ));
    }
    var cuenta0 = 0;
    for (k = 0; k < freq.length; k++)
      (0 == freq[k][9] || 1 == freq[k][9]) && (cuenta0 += 1);
    (cuentaf = " " + cuenta0),
      (document.getElementById("ty7").innerText = cuentaf.replace(/ /g, "")),
      (cuentaf = " " + alljs.length),
      document.getElementById("ty6") &&
        (document.getElementById("ty6").innerText = cuentaf.replace(/ /g, ""));
  }
}
function onlysat(e) {
  for (k = 1; k < PLib.tleData.length; k++)
    recoversat = recoversat + PLib.tleData[k][1].substr(2, 5) + ",";
  for (k = 1, elimsat = ""; k < PLib.tleData.length; k++)
    elimsat = elimsat + PLib.tleData[k][1].substr(2, 5) + ",";
  for (
    2 == Orb.satelliteMarkers.length
      ? ((agresat = recoversat), (recoversat = ""))
      : (agresat = ""),
      satrequestedm = e.toUpperCase().split(","),
      n = 0;
    n < satrequestedm.length;
    n++
  )
    if (
      ((satrequested = (satrequested = (satrequested = (satrequested =
        satrequestedm[n].toUpperCase()).replace(/NOAA/, "NA")).replace(
        /ITF/,
        "TO-89",
      )).substring(0, 5)).indexOf("MOON") > -1 && (satrequested = ""),
      satrequested.indexOf("ISS") > -1 && (satrequested = "25544"),
      satrequested.indexOf("LUSAT") > -1 && (satrequested = "20442"),
      satrequested.indexOf("LUSEX") > -1 && (satrequested = "41557"),
      isNumeric(satrequested.substr(0, 1)))
    )
      for (k = 1; k < alljs.length; k++)
        satrequested == alljs[k][1].substr(2, 5) &&
          (agresat = agresat + satrequested + ",");
    else
      for (k = 0; k < freq.length; k++)
        satrequested.toUpperCase() == freq[k][1].substr(0, 5).toUpperCase() &&
          (agresat = agresat + freq[k][0] + ",");
  "" != agresat && kepschange(agresat, elimsat);
}
var nasabare = "";
try {
  xmlHttp = new XMLHttpRequest();
} catch (e) {
  try {
    xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
      alert("not support AJAX!");
    }
  }
}
function addMinutes(e, a) {
  return new Date(e.getTime() + 6e4 * a);
}
function isDST() {
  var e = new Date(),
    a = e.getFullYear(),
    l = new Date("March 14, " + a + " 02:00:00"),
    c = new Date("November 07, " + a + " 02:00:00"),
    u = l.getDay();
  return (
    l.setDate(14 - u),
    (u = c.getDay()),
    c.setDate(7 - u),
    (!!(endst = !!(e >= l) && !!(e < c)) && localat > 0) ||
      ((!endst || !(localat < 0)) &&
        (!!endst || !(localat > 0)) &&
        ((!endst && localat < 0) || void 0))
  );
}
function localgmt() {
  0 == deltaminutes
    ? ((deltaminutes = new Date().getTimezoneOffset()),
      (localtime = !1),
      (satactivity += "UTC/"))
    : ((deltaminutes = 0), (localtime = !0), (satactivity += "LOCAL/")),
    Orb.generateTable(document.getElementById("passes"));
}
function changeelevation() {
  0 == elevationset
    ? ((elevationset = 10),
      (document.getElementById("elevatio").style.color = "#ff3126"),
      (document.getElementById("elevatio").title =
        "Show Elevations > " + 1 * elevationset + "\nClick here to change"),
      (satactivity = satactivity + "ELEV" + elevationset + "/"))
    : ((elevationset = 0),
      (document.getElementById("elevatio").style.color = "#00ffff"),
      (document.getElementById("elevatio").title =
        "Show Elevations > " + elevationset + "\nClick here to change"),
      (satactivity = satactivity + "ELEV" + elevationset + "/")),
    Orb.generateTable(document.getElementById("passes"));
}
function loadTLE() {
  for (v = 0; v < alljs.length; v++)
    ("1998-" == alljs[v][0].substring(0, 5) ||
      "20" == alljs[v][0].substring(0, 2)) &&
      (alljs[v][0] = alljs[v][0].substring(5, 10) + " " + alljs[v][0]);
  var e = [];
  for (i = 0; i < selsat.length; i++)
    for (j = 0; j < alljs.length; j++)
      if (selsat[i] == alljs[j][1].substring(2, 7)) {
        for (
          k = 0, e[i] = [], nuevovalor = alljs[j][0].substring(0, 5);
          k < replacetable.length;
          k++
        )
          alljs[j][0] == replacetable[k][0] &&
            (nuevovalor = replacetable[k][1].substring(0, 5));
        (e[i][0] = nuevovalor),
          (e[i][1] = alljs[j][1]),
          (e[i][2] = alljs[j][2]),
          (e[i][3] = alljs[j][0]);
        break;
      }
  for (h = 0; h < e.length; h++) e[h] && PLib.tleData.push(e[h]);
}
function sh(e, a) {
  for (
    DopplerchangeDownlink = !0,
      DopplerchangeUplink = !0,
      where = "satelliteMarker" + (e - 1),
      sid = "sh" + e,
      document.getElementById(sid) && (satname = PLib.tleData[e - 1][0]),
      r = 2;
    r < PLib.tleData.length + 1;
    r++
  )
    document.getElementById("sh" + r) &&
      (document.getElementById("sh" + r).style.color = "#ffffff");
  for (
    (firstclick || savesatid != e) && "sh1" != sid
      ? ((document.getElementById(sid).style.color = "#00ffff"),
        (borrarbox = !1))
      : "sh1" != sid &&
        ((document.getElementById(sid).style.color = "#ffffff"),
        (borrarbox = !0),
        (savebox = "")),
      "noclick" != a && document.getElementById(where).click(),
      i = 1;
    i < satlen + 1;
    i++
  )
    if (document.getElementById(i - 1) && "sh1" != sid) {
      if (
        satname
          .substring(0, 5)
          .toUpperCase()
          .replace(/^\s+|\s+$/g, "") !=
          document
            .getElementById(i - 1)
            .title.substring(0, 5)
            .toUpperCase()
            .replace(/^\s+|\s+$/g, "") ||
        borrarbox
      )
        document.getElementById(i - 1).style.backgroundImage = "";
      else {
        var l = document.getElementById(i - 1);
        (l.style.backgroundRepeat = "no-repeat"),
          firstclick || "noclick" != a || savesatid != e
            ? PLib.tleData.length > 2 &&
              ((l.style.backgroundImage =
                "url(https://raw.githubusercontent.com/elPoeta/browxy-assets/refs/heads/main/amsat/images/box.gif)"),
              (savebox = satname))
            : (l.style.backgroundImage = "");
      }
    }
}
function selectTLE(e) {
  for (k = 0, tiposel = e, tiposatswitch = !0; k < 8; k++)
    document.getElementById("tipo" + k) &&
      (document.getElementById("tipo" + k).style.textDecoration = "none");
  for (
    document.getElementById("tipo" + e) &&
      (document.getElementById("tipo" + e).style.textDecoration = "underline"),
      PLib.tleData.splice(0, PLib.tleData.length),
      selsat = selsatsave.slice(),
      loadTLE(),
      del = ",",
      i = 1;
    i < PLib.tleData.length;
    i++
  )
    for (j = 0; j < freq.length; j++)
      1 * e != 7 &&
        PLib.tleData[i][1].substring(2, 7) == freq[j][0] &&
        1 * freq[j][9] != 1 * e &&
        (del = del + PLib.tleData[i][1].substring(2, 7) + ","),
        1 * e == 7 &&
          PLib.tleData[i][1].substring(2, 7) == freq[j][0] &&
          1 * freq[j][9] != 0 &&
          PLib.tleData[i][1].substring(2, 7) == freq[j][0] &&
          1 * freq[j][9] != 1 &&
          (del = del + PLib.tleData[i][1].substring(2, 7) + ",");
  if (
    (1 * e == 2 || 1 * e == 7 ? kepschange("25544", del) : kepschange("", del),
    (1 * e == 1 || 1 * e == 2 || 1 * e == 7) &&
      (kepschange("25544", add), kepschange("48274", add)),
    "4" == e || "6" == e)
  ) {
    var a = "";
    for (i = 1; i < alljs.length; i++)
      for (j = 0; j < freq.length; j++)
        "4" == e &&
          alljs[i][1].substring(2, 7) == freq[j][0] &&
          1 * freq[j][9] == 4 &&
          (a = a + alljs[i][1].substring(2, 7) + ","),
          "6" == e &&
            alljs[i][1].substring(2, 7) == freq[j][0] &&
            (a = a + alljs[i][1].substring(2, 7) + ",");
    kepschange(a, add);
  }
}
function kepsdeladd() {
  if (del && del.length > 0) {
    for (
      (kepsdel = (del = del.replace(/undefined/g, "")).split(",")).sort(),
        i = 0;
      i < kepsdel.length;
      i++
    )
      for (j = 0; j < PLib.tleData.length - 1; j++)
        PLib.tleData[j][1].substr(2, 5) != kepsdel[i] ||
          (PLib.tleData.splice(j, 1),
          tiposatswitch ||
            (satactivity =
              satactivity + "D:" + PLib.tleData[j][0].toUpperCase() + "/"));
    tiposatswitch = !1;
  }
  for (
    del.length > 0 &&
      PLib.tleData.length > 0 &&
      ((borrarultimo =
        kepsdel[kepsdel.length - 1] ==
        PLib.tleData[PLib.tleData.length - 1][1].substr(2, 5)) &&
        PLib.tleData.splice(-1, 1),
      (del = "")),
      k = 0;
    k < PLib.tleData.length;
    k++
  )
    if (add && add.length > 0) {
      for (
        (kepsadd = (add = add.replace(/undefined/g, "")).split(",")).sort(),
          i = 0;
        i < kepsadd.length;
        i++
      )
        for (j = 0; j < alljs.length; j++)
          if (alljs[j][1].substr(2, 5) == kepsadd[i]) {
            var e = !0;
            for (z = 0; z < PLib.tleData.length; z++)
              alljs[j][1].substr(2, 5) == PLib.tleData[z][1].substr(2, 5) &&
                (e = !1);
            if (e) {
              var a = alljs[j][0];
              (newname =
                "20" == replacesatname(a).substr(0, 2)
                  ? alljs[j][1].substr(2, 5)
                  : replacesatname(a)),
                PLib.tleData.push([
                  newname.toUpperCase().substring(0, 5),
                  alljs[j][1],
                  alljs[j][2],
                  alljs[j][0],
                ]),
                (satactivity =
                  satactivity +
                  "A:" +
                  newname.toUpperCase().substring(0, 5) +
                  "/");
            }
          }
      if (satactivity.split("/D:").length > 10) {
        var l = satactivity.indexOf("/D:"),
          c = satactivity.lastIndexOf("/D:");
        satactivity =
          satactivity.slice(0, l) +
          "/ClearAll/" +
          satactivity.slice(c + 9, satactivity.length);
      }
      if (satactivity.split("/A:").length > 10) {
        var l = satactivity.indexOf("/A:"),
          c = satactivity.lastIndexOf("/A:");
        satactivity =
          satactivity.slice(0, l) +
          "/MarkAll/" +
          satactivity.slice(c + 9, satactivity.length);
      }
      function u(e, a) {
        return (e = e[1]) < (a = a[1]) ? -1 : 1;
      }
      PLib.tleData.sort(u);
    }
  (del = ""), (add = "");
}
function arranque() {
  Orb.startTracking(document.getElementById("map"), localat, localon),
    Orb.generateTable(document.getElementById("passes")),
    0 != order && ((order -= 1), changeorder("nolog"));
}
function rearranque() {
  (localat = (1 * document.wwl.lat.value).toFixed(4).toString()),
    (localon = (1 * document.wwl.lon.value).toFixed(4).toString()),
    location.reload(),
    (document.location.href = "#Top");
}
function isNumeric(e) {
  return !isNaN(parseFloat(e)) && isFinite(e);
}
function locator(e, a) {
  function l() {
    e.lat.value >= 0
      ? (e.latg.value = Math.floor(e.lat.value).toFixed(0))
      : (e.latg.value = Math.ceil(e.lat.value).toFixed(0)),
      (e.latm.value = Math.floor(
        60 * Math.abs(e.lat.value - e.latg.value),
      ).toFixed(0)),
      (e.lats.value = Math.round(
        3600 * Math.abs(e.lat.value - e.latg.value) - 60 * e.latm.value,
      ).toFixed(0)),
      60 == e.lats.value && ((e.lats.value = 0), e.latm.value++),
      e.lon.value >= 0
        ? (e.longi.value = Math.floor(e.lon.value).toFixed(0))
        : (e.longi.value = Math.ceil(e.lon.value).toFixed(0)),
      (e.lonm.value = Math.floor(
        60 * Math.abs(e.lon.value - e.longi.value),
      ).toFixed(0)),
      (e.lons.value = Math.round(
        3600 * Math.abs(e.lon.value - e.longi.value) - 60 * e.lonm.value,
      ).toFixed(0)),
      60 == e.lons.value && ((e.lons.value = 0), e.lonm.value++);
  }
  4 == (loc = e.loc.value.toUpperCase().replace(/^\s+|\s+$/g, "")).length &&
    ((loc += "LL"), (e.loc.value = loc)),
    loc.length > 0
      ? ((err = 0),
        6 != loc.length
          ? (err = 1)
          : ((c0 = loc.charAt(0)),
            (c1 = loc.charAt(1)),
            "O" == (c2 = loc.charAt(2)) && (c2 = "0"),
            "O" == (c3 = loc.charAt(3)) && (c3 = "0"),
            (c4 = loc.charAt(4)),
            (c5 = loc.charAt(5)),
            (c0 < "A" ||
              c0 > "R" ||
              c1 < "A" ||
              c1 > "R" ||
              c2 < "0" ||
              c2 > "9" ||
              c3 < "0" ||
              c3 > "9" ||
              c4 < "A" ||
              c4 > "X" ||
              c5 < "A" ||
              c5 > "X") &&
              (err = 1)),
        err
          ? alert("Grid locator " + loc + " Invalid !")
          : ((e.lat.value = (
              (parseInt(c1, 28) - 19) * 10 +
              parseInt(c3, 10) +
              (parseInt(c5, 34) - 9.5) / 24
            ).toFixed(4)),
            (e.lon.value = (
              (parseInt(c0, 28) - 19) * 20 +
              2 * parseInt(c2, 10) +
              (parseInt(c4, 34) - 9.5) / 12
            ).toFixed(4)),
            l(),
            (document.getElementById("mapa").innerHTML =
              "<input type='button' class='det1' value='Google Map' onclick='mapagoogle()'>")))
      : ((lat = e.lat.value),
        (lon = e.lon.value),
        (err = 0),
        (lat < -90 || lat > 90) &&
          (alert("Latitude Invalid !"),
          (err = 1),
          (document.getElementById("mapa").innerHTML = " \xb0.ddd")),
        (lon < -180 || lon > 180) &&
          (alert("Longitude Invalid !"),
          (err = 1),
          (document.getElementById("mapa").innerHTML = " \xb0.ddd")),
        !err &&
          lat.length > 0 &&
          lon.length > 0 &&
          ((c1 = (base = "ABCDEFGHIJKLMNOPQRSTUVWX").charAt(
            Math.floor(lat / 10) + 9,
          )),
          (lat -= 10 * Math.floor(lat / 10)),
          (c3 = Math.floor(lat)),
          (lat -= Math.floor(lat)),
          (c5 = base.charAt(Math.floor(24 * lat))),
          (c0 = base.charAt(Math.floor(lon / 20) + 9)),
          (lon -= 20 * Math.floor(lon / 20)),
          (c2 = Math.floor(lon / 2)),
          (lon -= 2 * Math.floor(lon / 2)),
          (c4 = base.charAt(Math.floor(12 * lon))),
          (e.loc.value = c0 + c1 + c2 + c3 + c4 + c5),
          l(),
          (document.getElementById("mapa").innerHTML =
            "<input type='button' class='click1' value='Google Map' onclick='mapagoogle()' id='button1' name='button1'>"))),
    "1" == a && (satactivity = satactivity + "NewLoc:" + e.loc.value + "/"),
    document.getElementById("home") &&
      ((document.getElementById("home").alt =
        "Your Location\nGrid: " +
        document.wwl.loc.value +
        "\n To change\nClick Locator"),
      (document.getElementById("home").title =
        "Your Location\nGrid: " +
        document.wwl.loc.value +
        "\n To change\nClick Locator"));
}
function graphichelp() {
  (satactivity += "GHELP/"),
    (preferences =
      "toolbar=no,width=795px,height=634px,center,margintop=0,top=30,left=3,status=no,scrollbars=no,resizable=no,dependent=yes,z-lock=yes"),
    null != popupwin && popupwin.close(),
    (popupwi = window.open("passhelp.gif", "win1", preferences)).setTimeout(
      "self.close()",
      72e4,
    );
}
function comment() {
  (satactivity += "Comment/"),
    (codata =
      '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">\n'),
    (codata += "<html><head><title>Comment to author</title>\n"),
    (codata +=
      '<meta http-equiv="Content-Type" content="text/html;charset=ISO-8859-1">\n'),
    (codata += '<style type="text/css">\n'),
    (codata +=
      '.box {font-family:Arial;background-color:transparent;font-size:14px;font-weight:bold;color:#ffffff;cursor:default;"\n'),
    (codata += "</style>\n"),
    (codata += '<script language="javascript" type="text/javascript">\n'),
    (codata +=
      "var topy = ((-parseInt(opener.localat) + 90)* 1.5 * 1.5 - 34)+ 'px';\n"),
    (codata +=
      "var topx = ((parseInt(opener.localon) + 180)* 1.5 * 1.5 - 60) + 'px';\n"),
    (codata += "setTimeout(function(){ carga(); }, 1000);\n"),
    (codata += "function carga(){"),
    (codata += 'document.getElementById("mapac").style.top = ""+topy+"";'),
    (codata += 'document.getElementById("mapac").style.left = ""+topx+"";'),
    (codata += "}\n"),
    (codata +=
      "function latlon2loc(lat,lon){base='ABCDEFGHIJKLMNOPQRSTUVWX';c1=base.charAt(Math.floor(lat/10)+9);lat-=Math.floor(lat/10)*10;c3=Math.floor(lat);lat-=Math.floor(lat);c5=base.charAt(Math.floor(lat*24)).toLowerCase();c0=base.charAt(Math.floor(lon/20)+9);lon-=Math.floor(lon/20)*20;c2=Math.floor(lon/2);lon-=Math.floor(lon/2)*2;c4=base.charAt(Math.floor(lon*12)).toLowerCase();return c0+c1+c2+c3+c4+c5;}\n"),
    (codata +=
      "function getAbsoluteOffset(htmlelement) {var offset={x:htmlelement.offsetLeft,y:htmlelement.offsetTop};while(htmlelement=htmlelement.offsetParent){offset.x+=htmlelement.offsetLeft;offset.y+=htmlelement.offsetTop;};return offset;}\n"),
    (codata +=
      "function image_onmouseout(ev) {document.getElementById('mouseinfo').innerHTML='';}\n"),
    (codata +=
      "function image_onmousemove(ev) {var offset=getAbsoluteOffset(this);posx=ev.clientX-offset.x;posy=ev.clientY-offset.y;var lat=(80-posy*180/405).toFixed(1);var lon=(-158.8+posx*360/810).toFixed(1);document.getElementById('mouseinfo').innerHTML='&nbsp;&nbsp;At cursor:&nbsp;&nbsp;&nbsp;&nbsp;Lat:'+lat+'\xb0'+'&nbsp;&nbsp;&nbsp;&nbsp;Lon:'+lon+'\xb0'+'&nbsp;&nbsp;&nbsp;&nbsp;Locator:'+latlon2loc(lat,lon)+'&nbsp;&nbsp;';}\n"),
    (codata += "function sendcomment(){\n"),
    (codata += "if(navigator.onLine){\n"),
    (codata +=
      "urlmatrix=(window.location.href).split('/');urlfuncion = urlmatrix[urlmatrix.length-1]; urlsola = urlfuncion.split('?'); urlreal =  urlmatrix[urlmatrix.length-2] + '/' + urlsola[0];\n"),
    (codata += "if(opener.bip==true){biptext='Bipon'}else{biptext='Bipoff'}\n"),
    (codata += "var losMeses = 'EneFebMarAbrMayJunJulAgoSetOctNovDic';\n"),
    (codata += "var ultimahora = new Date();\n"),
    (codata +=
      "var ultimoDiayMes = losMeses.substring(ultimahora.getMonth()*3,ultimahora.getMonth()*3+3)+'-'+('0'+ultimahora.getDate()).slice(-2)+' ';\n"),
    (codata += "ultimahora = ('0'+new Date().getHours()).slice(-2);\n"),
    (codata += "ultimomin = ('0'+new Date().getMinutes()).slice(-2);\n"),
    (codata += "horafinal='Final:'+ultimoDiayMes+ultimahora+':'+ultimomin;\n"),
    (codata +=
      "acti='Inicio:'+opener.horainicio+' TZ:'+opener.huso+' Con '+urlreal+' Loc:' + opener.document.getElementById('loc').value + ' Lat:' + (opener.localat*1).toFixed(4) + ' Lon:' + (opener.localon*1).toFixed(4)+ ' Z' + opener.zoom + ' ' + biptext + ' ' + screen.width + 'x' + screen.height + ' ' + opener.satactivity.replace(/[/]/g, ' ')+' '+horafinal;\n"),
    (codata += "var xhr = new XMLHttpRequest();\n"),
    (codata +=
      "var comentariovalue = document.getElementById('comentario').value;\n"),
    (codata +=
      'var urlpost = "http://lu7aa.org/satmsg.asp?comentario="+encodeURIComponent(comentariovalue);\n'),
    (codata +=
      'var params = "comentario="+encodeURIComponent(document.getElementById(\'comentario\').value)+"&comcall="+encodeURIComponent(document.getElementById(\'comcall\').value)+"&comlocation="+encodeURIComponent(document.getElementById(\'comlocation\').value) + "&comname="+encodeURIComponent(document.getElementById(\'comname\').value) + "&comemail="+encodeURIComponent(document.getElementById(\'comemail\').value)+"&acti="+encodeURIComponent(acti);\n'),
    (codata += 'xhr.open("POST", urlpost, true);\n'),
    (codata +=
      'xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");\n'),
    (codata += 'xhr.setRequestHeader("Content-length", params.length);\n'),
    (codata += "xhr.send (params);\n"),
    (codata += 'alert("Comment Sent.. Thanks !");self.close();}};\n'),
    (codata += "<\/script>\n"),
    (codata =
      codata +
      '</head><body bgcolor="#172447" onmouseout="image_onmouseout.call(this,event);" onmousemove="image_onmousemove.call(this,event);" style="background-position:-43px -18px;margin:0;padding:0;color:#FFFF59;cursor:default;background-repeat:no-repeat;" background=\'' +
      Image23.src +
      "'>\n"),
    (codata +=
      '<center><form name=formu id=formu action="pass.htm"><table border=0 width="96%" cellpadding=2 cellspacing=2 style="color:#FFFF59;font-family:Tahoma;font-size:16px;font-weight:900;"><tr><td colspan=4 align=center>\n'),
    (codata +=
      '<font style="background-color:#172447;">&nbsp;Please Send Comment, Question, Requirement or Suggestion for Pass&nbsp;</font><br><br></td></tr>\n'),
    (codata += "<tr><td align=right valign=top>Comment:</td>\n"),
    (codata +=
      '<td colspan=3><textarea autofocus id=comentario name=comentario style="z-index:99;height:180px;" cols=65 class="box" rows=9></textarea></td></tr>\n'),
    (codata += "<tr><td align=center colspan=4><hr>Optional</td></tr>"),
    (codata =
      codata +
      '<tr><td align=right>Callsign:</td><td><input type=text size=22 class="box" name=comcall id=comcall></td><td align=right>Locator:</td><td><input type=text size=22 class="box" name=comlocation id=comlocation value=\'' +
      document.getElementById("loc").value +
      "'></td></tr>\n"),
    (codata +=
      '<tr><td align=right>Name:</td><td><input type=text size=22 class="box" name=comname id=comname></td><td align=right>Email:</td><td><input type=text size=22 class="box" name=comemail id=comemail></td></tr>\n'),
    (codata += "<tr><td align=center colspan=4><hr></td></tr>\n"),
    (codata +=
      '<tr><td align=left colspan=3><input type=button onclick="sendcomment()" style="width:150px;font-weight:bold;font-size:16px;z-index:99;" name=combutton id=combutton value="Send"></td><td align=right><font style="color:#000000;font-size:14px;"><em>Thanks, LU7ABF</em></font></td></tr>\n'),
    (codata += "</table></form></center>"),
    (codata =
      codata +
      '<div id=mapac style="position:absolute;top:0px;left:0px;width: 24px; height: 24px; background-image: url(' +
      Image4.src +
      '); z-index: -1; top:0; left:0;"></div>'),
    (codata +=
      "<div id='mouseinfo' style='position:absolute;left:180;top:369;color:#000000;font-family:Arial;font-size:18px;font-weight:normal;'></div>"),
    (codata += "</body></html>"),
    (preferences =
      "toolbar=no,width=768px,height=408px,center,margintop=0,top=30,left=3,status=no,scrollbars=no,resizable=no,dependent=yes,z-lock=yes"),
    null != popupwin && popupwin.close(),
    (popupwi = window.open("", "win1", preferences)).document.write(codata),
    popupwi.setTimeout("self.close()", 72e4);
}
function golocator() {
  null != ventana && ventana.close(),
    (satactivity += "LOCMAP/"),
    (irpara =
      "http://k7fry.com/grid/?qth=" +
      (locaid =
        "" == document.getElementById("loc").value
          ? "GF05RK"
          : document.getElementById("loc").value).replace(/^\s+|\s+$/g, "")),
    (preferences =
      "toolbar=yes,center,margintop=85,top=85px,left=55px,width=" +
      (screen.availWidth - 140) +
      "px,height=" +
      (screen.availHeight - 180) +
      "px,status=no,scrollbars=yes,resizable=yes,dependent=no,z-lock=yes"),
    (ventana = window.open(irpara, "miwindow", preferences));
}
function reverseazimuth() {
  if ("&nbsp;N&nbsp;" == azisw) {
    (satactivity += "AZR/"), (azisw = "&nbsp;R&nbsp;");
    return;
  }
  if ("&nbsp;R&nbsp;" == azisw) {
    (satactivity += "AZI/"), (azisw = "&nbsp;I&nbsp;");
    return;
  }
  if ("&nbsp;I&nbsp;" == azisw) {
    (satactivity += "AZN/"), (azisw = "&nbsp;N&nbsp;");
    return;
  }
}
function setprog() {
  if ("&nbsp;N&nbsp;" == progsw) {
    (satactivity += "PN/"),
      (progsw = "&nbsp;P&nbsp;"),
      (document.getElementById("Tracking").visibility = "hidden"),
      (document.getElementById("Tracking").style.visibility = "hidden");
    return;
  }
  if ("&nbsp;P&nbsp;" == progsw) {
    (satactivity += "PY/"),
      (progsw = "&nbsp;N&nbsp;"),
      (document.getElementById("Tracking").visibility = "visible"),
      (document.getElementById("Tracking").style.visibility = "visible");
    return;
  }
}
function mapagoogle() {
  null != ventana && ventana.close(),
    (satactivity += "GMAP/"),
    (irpara =
      "http://maps.google.com/maps?ll=" +
      document.getElementById("lat").value +
      "0000," +
      document.getElementById("lon").value +
      "0000&spn=2.991233,5.155884&t=h&hl=en"),
    (preferences =
      "toolbar=yes,center,margintop=0,top=0,left=0,width=" +
      (screen.availWidth - 20)),
    screen.availHeight,
    (ventana = window.open(irpara, "miwindow", preferences));
}
function donate() {
  (satactivity += "DONATE/"),
    window.open("https://www.paypal.me/AMSATARGENTINA/", "_blank");
}
(xmlHttp.onreadystatechange = function () {
  4 == xmlHttp.readyState &&
    setTimeout(function () {
      nasabare = xmlHttp.responseText;
    }, 1e3);
}),
  xmlHttp.open("GET", "chat/luser.php"),
  xmlHttp.send(null),
  (function (e, a) {
    "undefined" != typeof module
      ? (module.exports = a())
      : "function" == typeof define && "object" == typeof define.amd
        ? define(a)
        : (this[e] = a());
  })("MockDate", function () {
    "use strict";
    var e = Date,
      a = Date.prototype.getTimezoneOffset,
      l = null;
    function c(a, c, u, g, b, $, y) {
      var _;
      switch (arguments.length) {
        case 0:
          _ = null !== l ? new e(l) : new e();
          break;
        case 1:
          _ = new e(a);
          break;
        default:
          (u = void 0 === u ? 1 : u),
            (g = g || 0),
            (b = b || 0),
            ($ = $ || 0),
            (y = y || 0),
            (_ = new e(a, c, u, g, b, $, y));
      }
      return _;
    }
    function u(e, a) {
      var u = new Date(e);
      if (isNaN(u.getTime()))
        throw TypeError("mockdate: The time set is an invalid date: " + e);
      "number" == typeof a &&
        (c.prototype.getTimezoneOffset = function () {
          return a;
        }),
        (Date = c),
        e.valueOf && (e = e.valueOf()),
        (l = u.valueOf());
    }
    function g() {
      (Date = e).prototype.getTimezoneOffset = a;
    }
    return (
      (c.UTC = e.UTC),
      (c.now = function () {
        return new c().valueOf();
      }),
      (c.parse = function (a) {
        return e.parse(a);
      }),
      (c.toString = function () {
        return e.toString();
      }),
      (c.prototype = e.prototype),
      {
        set: u,
        reset: g,
      }
    );
  });
function jBeep(a) {
  if (!a) a = "jBeep/jBeep.wav";
  var b, c, d;
  d = true;
  try {
    if (typeof document.createElement("audio").play == "undefined") d = false;
  } catch (e) {
    d = false;
  }
  c = document.getElementsByTagName("body")[0];
  if (!c) c = document.getElementsByTagName("html")[0];
  b = document.getElementById("jBeep");
  if (b) c.removeChild(b);
  if (d) {
    b = document.createElement("audio");
    b.setAttribute("id", "jBeep");
    b.setAttribute("src", a);
    b.play();
  } else if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
    b = document.createElement("bgsound");
    b.setAttribute("id", "jBeep");
    b.setAttribute("loop", 1);
    b.setAttribute("src", a);
    c.appendChild(b);
  } else {
    var f;
    b = document.createElement("object");
    b.setAttribute("id", "jBeep");
    b.setAttribute("type", "audio/wav");
    b.setAttribute("style", "display:none;");
    b.setAttribute("data", a);
    f = document.createElement("param");
    f.setAttribute("name", "autostart");
    f.setAttribute("value", "false");
    b.appendChild(f);
    c.appendChild(b);
    try {
      b.Play();
    } catch (e) {
      b.object.Play();
    }
  }
}
function jsDraw2DX() {}
jsDraw2DX._RefID = 0;
jsDraw2DX._isVML = false;
jsDraw2DX.checkIE = function () {
  if (navigator.appName == "Microsoft Internet Explorer") {
    var a = 9;
    if (navigator.appVersion.indexOf("MSIE") != -1) {
      a = parseFloat(navigator.appVersion.split("MSIE")[1]);
    }
    if (a < 9) {
      jsDraw2DX._isVML = true;
    }
  }
};
jsDraw2DX.fact = function (c) {
  var b = 1;
  for (var a = 1; a <= c; a++) {
    b = b * a;
  }
  return b;
};
jsDraw2DX.init = function () {
  jsDraw2DX.checkIE();
  if (jsDraw2DX._isVML) {
    document.namespaces.add(
      "v",
      "urn:schemas-microsoft-com:vml",
      "#default#VML",
    );
    var c = ["fill", "stroke", "path", "textpath"];
    for (var b = 0, a = c.length; b < a; b++) {
      document
        .createStyleSheet()
        .addRule("v\\:" + c[b], "behavior: url(#default#VML);");
    }
  }
};
jsDraw2DX.init();
function jxGraphics(r) {
  this.origin = new jxPoint(0, 0);
  this.scale = 1;
  this.coordinateSystem = "default";
  var a = new Array();
  var m, p, e, n;
  if (r) {
    m = r;
    m.style.overflow = "hidden";
  } else {
    m = document.body;
  }
  if (!jsDraw2DX._isVML) {
    p = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    m.appendChild(p);
    n = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    p.appendChild(n);
    p.style.position = "absolute";
    p.style.top = "0px";
    p.style.left = "0px";
    p.style.width = m.style.width;
    p.style.height = m.style.height;
  } else {
    e = document.createElement("v:group");
    e.style.position = "absolute";
    e.style.top = "0px";
    e.style.left = "0px";
    m.appendChild(e);
  }
  this.getDefs = l;
  function l() {
    return n;
  }
  this.addShape = b;
  function b(v) {
    var w = this.indexOfShape(v);
    if (w < 0) {
      a.push(v);
    }
  }
  this.removeShape = d;
  function d(v) {
    var w = this.indexOfShape(v);
    if (w >= 0) {
      a.splice(w, 1);
    }
  }
  this.getType = o;
  function o() {
    return "jxGraphics";
  }
  this.getDiv = c;
  function c() {
    return m;
  }
  this.getSVG = s;
  function s() {
    return p;
  }
  this.getVML = g;
  function g() {
    return e;
  }
  this.logicalToPhysicalPoint = j;
  function j(v) {
    if (this.coordinateSystem.toLowerCase() == "cartecian") {
      return new jxPoint(
        Math.round(v.x * this.scale + this.origin.x),
        Math.round(this.origin.y - v.y * this.scale),
      );
    } else {
      return new jxPoint(
        Math.round(v.x * this.scale + this.origin.x),
        Math.round(v.y * this.scale + this.origin.y),
      );
    }
  }
  this.draw = h;
  function h(v) {
    return v.draw(this);
  }
  this.remove = u;
  function u(v) {
    return v.remove(this);
  }
  this.redrawAll = q;
  function q() {
    for (ind in a) {
      a[ind].draw(this);
    }
  }
  this.getShapesCount = t;
  function t() {
    return a.length;
  }
  this.getShape = k;
  function k(v) {
    return a[v];
  }
  this.indexOfShape = f;
  function f(v) {
    var A = -1,
      z = a.length;
    for (var w = 0; w < z; w++) {
      if (v == a[w]) {
        A = w;
      }
    }
    return A;
  }
}
function jxColor() {
  var e = "#000000";
  switch (arguments.length) {
    case 1:
      e = arguments[0];
      break;
    case 3:
      var d = arguments[0];
      var c = arguments[1];
      var a = arguments[2];
      e = jxColor.rgbToHex(d, c, a);
      break;
  }
  this.getType = f;
  function f() {
    return "jxColor";
  }
  this.getValue = b;
  function b() {
    return e;
  }
}
jxColor.rgbToHex = function (a, c, b) {
  if (a < 0 || a > 255 || c < 0 || c > 255 || b < 0 || b > 255) {
    return false;
  }
  var d = Math.round(b) + 256 * Math.round(c) + 65536 * Math.round(a);
  return "#" + e(d.toString(16), 6);
  function e(h, f) {
    var g = h + "";
    while (g.length < f) {
      g = "0" + g;
    }
    return g;
  }
};
jxColor.hexToRgb = function (d) {
  var a, c, b;
  if (d.charAt(0) == "#") {
    d = d.substring(1, 7);
  }
  a = parseInt(d.substring(0, 2), 16);
  c = parseInt(d.substring(2, 4), 16);
  b = parseInt(d.substring(4, 6), 16);
  if (a < 0 || a > 255 || c < 0 || c > 255 || b < 0 || b > 255) {
    return false;
  }
  return new Array(a, c, b);
};
function jxFont(e, b, d, g, a) {
  this.family = null;
  this.size = null;
  this.style = null;
  this.weight = null;
  if (e) {
    this.family = e;
  }
  if (g) {
    this.weight = g;
  }
  if (b) {
    this.size = b;
  }
  if (d) {
    this.style = d;
  }
  this.updateSVG = f;
  function f(j) {
    if (this.family) {
      j.setAttribute("font-family", this.family);
    } else {
      j.setAttribute("font-family", "");
    }
    if (this.weight) {
      j.setAttribute("fontWeight", this.weight);
    } else {
      j.setAttribute("fontWeight", "");
    }
    if (this.size) {
      j.setAttribute("fontSize", this.size);
    } else {
      j.setAttribute("fontSize", "");
    }
    if (this.style) {
      j.setAttribute("fontStyle", this.style);
    } else {
      j.setAttribute("fontStyle", "");
    }
  }
  this.updateVML = c;
  function c(j) {
    if (this.family) {
    } else {
      j.style.fontFamily = "";
    }
    if (this.weight) {
      j.style.fontWeight = this.weight;
    } else {
      j.style.fontWeight = "";
    }
    if (this.size) {
      j.style.fontSize = this.size;
    } else {
      j.style.fontSize = "";
    }
    if (this.style) {
      j.style.fontStyle = this.style;
    } else {
      j.style.fontStyle = "";
    }
  }
  this.getType = h;
  function h() {
    return "jxFont";
  }
}
jxFont.updateSVG = function (a) {
  a.setAttribute("font-family", "");
  a.setAttribute("fontWeight", "");
  a.setAttribute("fontSize", "");
  a.setAttribute("fontStyle", "");
};
jxFont.updateVML = function (a) {
  a.style.fontFamily = "";
  a.style.fontWeight = "";
  a.style.fontSize = "";
  a.style.fontStyle = "";
};
function jxPen(a, c, e) {
  this.color = null;
  this.width = null;
  this.dashStyle = null;
  if (a) {
    this.color = a;
  } else {
    this.color = new jxColor("#000000");
  }
  if (c) {
    this.width = c;
  } else {
    this.width = "1px";
  }
  if (e) {
    this.dashStyle = e;
  }
  this.updateSVG = d;
  function d(h) {
    h.setAttribute("stroke", this.color.getValue());
    h.setAttribute("stroke-width", this.width);
    if (this.dashStyle) {
      var g = parseInt(this.width);
      switch (this.dashStyle.toLowerCase()) {
        case "shortdash":
          h.setAttribute("stroke-dasharray", g * 3 + " " + g);
          break;
        case "shortdot":
          h.setAttribute("stroke-dasharray", g + " " + g);
          break;
        case "shortdashdot":
          h.setAttribute(
            "stroke-dasharray",
            g * 3 + " " + g + " " + g + " " + g,
          );
          break;
        case "shortdashdotdot":
          h.setAttribute(
            "stroke-dasharray",
            g * 3 + " " + g + " " + g + " " + g + " " + g + " " + g,
          );
          break;
        case "dot":
          h.setAttribute("stroke-dasharray", g + " " + g * 3);
          break;
        case "dash":
          h.setAttribute("stroke-dasharray", g * 4 + " " + g * 3);
          break;
        case "longdash":
          h.setAttribute("stroke-dasharray", g * 8 + " " + g * 3);
          break;
        case "dashdot":
          h.setAttribute(
            "stroke-dasharray",
            g * 4 + " " + g * 3 + " " + g + " " + g * 3,
          );
          break;
        case "longdashdot":
          h.setAttribute(
            "stroke-dasharray",
            g * 8 + " " + g * 3 + " " + g + " " + g * 3,
          );
          break;
        case "longdashdotdot":
          h.setAttribute(
            "stroke-dasharray",
            g * 8 + " " + g * 3 + " " + g + " " + g * 3 + " " + g + " " + g * 3,
          );
          break;
        default:
          h.setAttribute("stroke-dasharray", this.dashStyle);
          break;
      }
    }
  }
  this.updateVML = b;
  function b(g) {
    g.Stroke.JoinStyle = "miter";
    g.Stroke.MiterLimit = "5";
    g.StrokeColor = this.color.getValue();
    g.StrokeWeight = this.width;
    if (this.dashStyle) {
      g.Stroke.DashStyle = this.dashStyle;
    }
    if (parseInt(this.width) == 0) {
      g.Stroked = "False";
    }
  }
  this.getType = f;
  function f() {
    return "jxPen";
  }
}
function jxBrush(a, e) {
  this.color = null;
  this.fillType = null;
  this.color2 = null;
  this.angle = null;
  if (a) {
    this.color = a;
  } else {
    this.color = new jxColor("#000000");
  }
  if (e) {
    this.fillType = e;
  } else {
    this.fillType = "solid";
  }
  this.color2 = new jxColor("#FFFFFF");
  this.updateSVG = c;
  function c(h, f) {
    var m = null,
      l;
    m = h.getAttribute("fill");
    if (m) {
      if (m.substr(0, 5) == "url(#") {
        m = m.substr(5, m.length - 6);
        l = document.getElementById(m);
      } else {
        m = null;
      }
    }
    if (this.fillType == "linear-gradient" || this.fillType == "lin-grad") {
      var g = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "linearGradient",
      );
      if (m) {
        f.replaceChild(g, l);
      } else {
        f.appendChild(g);
      }
      var k = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      g.appendChild(k);
      var j = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      g.appendChild(j);
      jsDraw2DX._RefID++;
      g.setAttribute("id", "jsDraw2DX_RefID_" + jsDraw2DX._RefID);
      if (this.angle != null) {
        g.setAttribute(
          "gradientTransform",
          "rotate(" + this.angle + " 0.5 0.5)",
        );
      } else {
        g.setAttribute("gradientTransform", "rotate(0 0.5 0.5)");
      }
      k.setAttribute("offset", "0%");
      k.setAttribute(
        "style",
        "stop-color:" + this.color.getValue() + ";stop-opacity:1",
      );
      j.setAttribute("offset", "100%");
      j.setAttribute(
        "style",
        "stop-color:" + this.color2.getValue() + ";stop-opacity:1",
      );
      g.appendChild(k);
      g.appendChild(j);
      h.setAttribute("fill", "url(#jsDraw2DX_RefID_" + jsDraw2DX._RefID + ")");
    } else {
      h.setAttribute("fill", this.color.getValue());
    }
  }
  this.updateVML = b;
  function b(f) {
    f.On = "true";
    if (this.fillType == "solid") {
      f.Type = "solid";
      f.Color = this.color.getValue();
      f.Color2 = "";
      f.Angle = 270;
    } else {
      f.Type = "gradient";
      if (this.angle != null) {
        f.Angle = 270 - this.angle;
      } else {
        f.Angle = 270;
      }
      f.Color = this.color.getValue();
      f.Color2 = this.color2.getValue();
    }
  }
  this.getType = d;
  function d() {
    return "jxBrush";
  }
}
function jxPoint(a, c) {
  this.x = a;
  this.y = c;
  this.getType = b;
  function b() {
    return "jxPoint";
  }
}
function jxLine(a, h, d) {
  this.fromPoint = a;
  this.toPoint = h;
  this.pen = null;
  var f,
    g = true;
  var m;
  if (d) {
    this.pen = d;
  }
  if (!jsDraw2DX._isVML) {
    f = document.createElementNS("http://www.w3.org/2000/svg", "line");
  } else {
    f = document.createElement("v:line");
  }
  this.getType = j;
  function j() {
    return "jxLine";
  }
  this.addEventListener = b;
  function b(o, p) {
    if (f.addEventListener) {
      f.addEventListener(o, q, false);
    } else {
      if (f.attachEvent) {
        f.attachEvent("on" + o, q);
      }
    }
    var n = this;
    function q(r) {
      p(r, n);
    }
  }
  this.draw = k;
  function k(z) {
    var o, v;
    o = z.logicalToPhysicalPoint(this.fromPoint);
    v = z.logicalToPhysicalPoint(this.toPoint);
    var q,
      t,
      s = false;
    q = this.pen.color.getValue();
    t = this.pen.width;
    var r, A, p, w;
    r = o.x;
    A = o.y;
    p = v.x;
    w = v.y;
    f.style.display = "none";
    if (!jsDraw2DX._isVML) {
      var u = z.getSVG();
      if (g) {
        u.appendChild(f);
        g = false;
      }
      if (!this.pen) {
        f.setAttribute("stroke", "none");
      } else {
        this.pen.updateSVG(f);
      }
      f.setAttribute("x1", r);
      f.setAttribute("y1", A);
      f.setAttribute("x2", p);
      f.setAttribute("y2", w);
    } else {
      var n = z.getVML();
      if (g) {
        n.appendChild(f);
        g = false;
      }
      if (!this.pen) {
        f.Stroked = "False";
      } else {
        this.pen.updateVML(f);
      }
      f.style.position = "absolute";
      f.From = r + "," + A;
      f.To = p + "," + w;
    }
    f.style.display = "";
    if (m && z != m) {
      m.removeShape(this);
    }
    m = z;
    m.addShape(this);
  }
  this.remove = c;
  function c() {
    if (m) {
      if (!jsDraw2DX._isVML) {
        var o = m.getSVG();
        o.removeChild(f);
      } else {
        var n = m.getVML();
        n.removeChild(f);
      }
      m.removeShape(this);
      m = null;
      g = true;
    }
  }
  this.show = l;
  function l() {
    f.style.display = "";
  }
  this.hide = e;
  function e() {
    f.style.display = "none";
  }
}
function jxRect(n, a, o, d, h) {
  this.point = n;
  this.width = a;
  this.height = o;
  this.pen = null;
  this.brush = null;
  var f,
    g = true;
  var m;
  if (d) {
    this.pen = d;
  }
  if (h) {
    this.brush = h;
  }
  if (!jsDraw2DX._isVML) {
    f = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  } else {
    f = document.createElement("v:rect");
  }
  this.getType = j;
  function j() {
    return "jxRect";
  }
  this.addEventListener = b;
  function b(q, r) {
    if (f.addEventListener) {
      f.addEventListener(q, s, false);
    } else {
      if (f.attachEvent) {
        f.attachEvent("on" + q, s);
      }
    }
    var p = this;
    function s(t) {
      r(t, p);
    }
  }
  this.draw = k;
  function k(t) {
    var r, w;
    r = t.logicalToPhysicalPoint(this.point);
    w = t.scale;
    var u, v;
    u = r.x;
    v = r.y;
    f.style.display = "none";
    if (!jsDraw2DX._isVML) {
      var s = t.getSVG();
      if (g) {
        s.appendChild(f);
        g = false;
      }
      if (!this.pen) {
        f.setAttribute("stroke", "none");
      } else {
        this.pen.updateSVG(f);
      }
      if (!this.brush) {
        f.setAttribute("fill", "none");
      } else {
        this.brush.updateSVG(f, t.getDefs());
      }
      f.setAttribute("x", u);
      f.setAttribute("y", v);
      f.setAttribute("width", w * this.width);
      f.setAttribute("height", w * this.height);
      f.style.position = "absolute";
    } else {
      var q = t.getVML(),
        p;
      if (g) {
        q.appendChild(f);
        g = false;
      }
      if (!this.pen) {
        f.Stroked = "False";
      } else {
        this.pen.updateVML(f);
      }
      p = f.fill;
      if (!this.brush) {
        p.On = "false";
      } else {
        this.brush.updateVML(p);
      }
      f.style.width = w * this.width;
      f.style.height = w * this.height;
      f.style.position = "absolute";
      f.style.top = v;
      f.style.left = u;
    }
    f.style.display = "";
    if (m && t != m) {
      m.removeShape(this);
    }
    m = t;
    m.addShape(this);
  }
  this.remove = c;
  function c() {
    if (m) {
      if (!jsDraw2DX._isVML) {
        var q = m.getSVG();
        q.removeChild(f);
      } else {
        var p = m.getVML();
        p.removeChild(f);
      }
      m.removeShape(this);
      m = null;
      g = true;
    }
  }
  this.show = l;
  function l() {
    f.style.display = "";
  }
  this.hide = e;
  function e() {
    f.style.display = "none";
  }
}
function jxPolyline(m, c, g) {
  this.points = m;
  this.pen = null;
  this.brush = null;
  var e,
    f = true;
  var l;
  if (c) {
    this.pen = c;
  }
  if (g) {
    this.brush = g;
  }
  if (!jsDraw2DX._isVML) {
    e = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  } else {
    e = document.createElement("v:polyline");
  }
  this.getType = h;
  function h() {
    return "jxPolyline";
  }
  this.addEventListener = a;
  function a(o, p) {
    if (e.addEventListener) {
      e.addEventListener(o, q, false);
    } else {
      if (e.attachEvent) {
        e.attachEvent("on" + o, q);
      }
    }
    var n = this;
    function q(r) {
      p(r, n);
    }
  }
  this.draw = j;
  function j(q) {
    var r = new Array(),
      s = "";
    for (ind in this.points) {
      r[ind] = q.logicalToPhysicalPoint(this.points[ind]);
    }
    for (ind in r) {
      s = s + r[ind].x + "," + r[ind].y + " ";
    }
    e.style.display = "none";
    if (!jsDraw2DX._isVML) {
      var p = q.getSVG();
      if (f) {
        p.appendChild(e);
        f = false;
      }
      if (!this.pen) {
        e.setAttribute("stroke", "none");
      } else {
        this.pen.updateSVG(e);
      }
      if (!this.brush) {
        e.setAttribute("fill", "none");
      } else {
        this.brush.updateSVG(e, q.getDefs());
      }
      e.style.position = "absolute";
      e.setAttribute("points", s);
    } else {
      var o = q.getVML(),
        n;
      if (f) {
        o.appendChild(e);
        f = false;
      }
      if (!this.pen) {
        e.Stroked = "False";
      } else {
        this.pen.updateVML(e);
      }
      n = e.fill;
      if (!this.brush) {
        n.On = "false";
      } else {
        this.brush.updateVML(n);
      }
      e.style.position = "absolute";
      e.Points.Value = s;
    }
    e.style.display = "";
    if (l && q != l) {
      l.removeShape(this);
    }
    l = q;
    l.addShape(this);
  }
  this.remove = b;
  function b() {
    if (l) {
      if (!jsDraw2DX._isVML) {
        var o = l.getSVG();
        o.removeChild(e);
      } else {
        var n = l.getVML();
        n.removeChild(e);
      }
      l.removeShape(this);
      l = null;
      f = true;
    }
  }
  this.show = k;
  function k() {
    e.style.display = "";
  }
  this.hide = d;
  function d() {
    e.style.display = "none";
  }
}
function jxPolygon(m, c, g) {
  this.points = m;
  this.pen = null;
  this.brush = null;
  var e,
    f = true;
  var l;
  if (c) {
    this.pen = c;
  }
  if (g) {
    this.brush = g;
  }
  if (!jsDraw2DX._isVML) {
    e = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  } else {
    e = document.createElement("v:polyline");
  }
  this.getType = h;
  function h() {
    return "jxPolygon";
  }
  this.addEventListener = a;
  function a(o, p) {
    if (e.addEventListener) {
      e.addEventListener(o, q, false);
    } else {
      if (e.attachEvent) {
        e.attachEvent("on" + o, q);
      }
    }
    var n = this;
    function q(r) {
      p(r, n);
    }
  }
  this.draw = j;
  function j(q) {
    var r = new Array(),
      s = "";
    for (ind in this.points) {
      r[ind] = q.logicalToPhysicalPoint(this.points[ind]);
    }
    for (ind in r) {
      s = s + r[ind].x + "," + r[ind].y + " ";
    }
    e.style.display = "none";
    if (!jsDraw2DX._isVML) {
      var p = q.getSVG();
      if (f) {
        p.appendChild(e);
        f = false;
      }
      if (!this.pen) {
        e.setAttribute("stroke", "none");
      } else {
        this.pen.updateSVG(e);
      }
      if (!this.brush) {
        e.setAttribute("fill", "none");
      } else {
        this.brush.updateSVG(e, q.getDefs());
      }
      e.style.position = "absolute";
      e.setAttribute("points", s);
    } else {
      s = s + r[0].x + "," + r[0].y;
      var o = q.getVML(),
        n;
      if (f) {
        o.appendChild(e);
        f = false;
      }
      if (!this.pen) {
        e.Stroked = "False";
      } else {
        this.pen.updateVML(e);
      }
      n = e.fill;
      if (!this.brush) {
        n.On = "false";
      } else {
        this.brush.updateVML(n);
      }
      e.style.position = "absolute";
      e.Points.Value = s;
    }
    e.style.display = "";
    if (l && q != l) {
      l.removeShape(this);
    }
    l = q;
    l.addShape(this);
  }
  this.remove = b;
  function b() {
    if (l) {
      if (!jsDraw2DX._isVML) {
        var o = l.getSVG();
        o.removeChild(e);
      } else {
        var n = l.getVML();
        n.removeChild(e);
      }
      l.removeShape(this);
      l = null;
      f = true;
    }
  }
  this.show = k;
  function k() {
    e.style.display = "";
  }
  this.hide = d;
  function d() {
    e.style.display = "none";
  }
}
function jxCircle(a, h, d, j) {
  this.center = a;
  this.radius = h;
  this.pen = null;
  this.brush = null;
  var f,
    g = true;
  var n;
  if (d) {
    this.pen = d;
  }
  if (j) {
    this.brush = j;
  }
  if (!jsDraw2DX._isVML) {
    f = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  } else {
    f = document.createElement("v:oval");
  }
  this.getType = k;
  function k() {
    return "jxCircle";
  }
  this.addEventListener = b;
  function b(p, q) {
    if (f.addEventListener) {
      f.addEventListener(p, r, false);
    } else {
      if (f.attachEvent) {
        f.attachEvent("on" + p, r);
      }
    }
    var o = this;
    function r(s) {
      q(s, o);
    }
  }
  this.draw = l;
  function l(t) {
    var r, u;
    r = t.logicalToPhysicalPoint(this.center);
    u = t.scale;
    var q, v;
    q = r.x;
    v = r.y;
    f.style.display = "none";
    if (!jsDraw2DX._isVML) {
      var s = t.getSVG();
      if (g) {
        s.appendChild(f);
        g = false;
      }
      if (!this.pen) {
        f.setAttribute("stroke", "none");
      } else {
        this.pen.updateSVG(f);
      }
      if (!this.brush) {
        f.setAttribute("fill", "none");
      } else {
        this.brush.updateSVG(f, t.getDefs());
      }
      f.setAttribute("cx", q);
      f.setAttribute("cy", v);
      f.setAttribute("r", u * this.radius);
      f.style.position = "absolute";
    } else {
      var p = t.getVML(),
        o;
      if (g) {
        p.appendChild(f);
        g = false;
      }
      if (!this.pen) {
        f.Stroked = "False";
      } else {
        this.pen.updateVML(f);
      }
      o = f.fill;
      if (!this.brush) {
        o.On = "false";
      } else {
        this.brush.updateVML(o);
      }
      f.style.width = u * this.radius * 2;
      f.style.height = u * this.radius * 2;
      f.style.position = "absolute";
      f.style.top = v - u * this.radius;
      f.style.left = q - u * this.radius;
    }
    f.style.display = "";
    if (n && t != n) {
      n.removeShape(this);
    }
    n = t;
    n.addShape(this);
  }
  this.remove = c;
  function c() {
    if (n) {
      if (!jsDraw2DX._isVML) {
        var p = n.getSVG();
        p.removeChild(f);
      } else {
        var o = n.getVML();
        o.removeChild(f);
      }
      n.removeShape(this);
      n = null;
      g = true;
    }
  }
  this.show = m;
  function m() {
    f.style.display = "";
  }
  this.hide = e;
  function e() {
    f.style.display = "none";
  }
}
function jxEllipse(a, b, o, e, j) {
  this.center = a;
  this.width = b;
  this.height = o;
  this.pen = null;
  this.brush = null;
  var g,
    h = true;
  var n;
  if (e) {
    this.pen = e;
  }
  if (j) {
    this.brush = j;
  }
  if (!jsDraw2DX._isVML) {
    g = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  } else {
    g = document.createElement("v:oval");
  }
  this.getType = k;
  function k() {
    return "jxEllipse";
  }
  this.addEventListener = c;
  function c(q, r) {
    if (g.addEventListener) {
      g.addEventListener(q, s, false);
    } else {
      if (g.attachEvent) {
        g.attachEvent("on" + q, s);
      }
    }
    var p = this;
    function s(t) {
      r(t, p);
    }
  }
  this.draw = l;
  function l(u) {
    var s, v;
    s = u.logicalToPhysicalPoint(this.center);
    v = u.scale;
    var r, w;
    r = s.x;
    w = s.y;
    g.style.display = "none";
    if (!jsDraw2DX._isVML) {
      var t = u.getSVG();
      if (h) {
        t.appendChild(g);
        h = false;
      }
      if (!this.pen) {
        g.setAttribute("stroke", "none");
      } else {
        this.pen.updateSVG(g);
      }
      if (!this.brush) {
        g.setAttribute("fill", "none");
      } else {
        this.brush.updateSVG(g, u.getDefs());
      }
      g.setAttribute("cx", r);
      g.setAttribute("cy", w);
      g.setAttribute("rx", (v * this.width) / 2);
      g.setAttribute("ry", (v * this.height) / 2);
      g.style.position = "absolute";
    } else {
      var q = u.getVML(),
        p;
      if (h) {
        q.appendChild(g);
        h = false;
      }
      if (!this.pen) {
        g.Stroked = "False";
      } else {
        this.pen.updateVML(g);
      }
      p = g.fill;
      if (!this.brush) {
        p.On = "false";
      } else {
        this.brush.updateVML(p);
      }
      g.style.width = v * this.width;
      g.style.height = v * this.height;
      g.style.position = "absolute";
      g.style.top = w - (v * this.height) / 2;
      g.style.left = r - (v * this.width) / 2;
    }
    g.style.display = "";
    if (n && u != n) {
      n.removeShape(this);
    }
    n = u;
    n.addShape(this);
  }
  this.remove = d;
  function d() {
    if (n) {
      if (!jsDraw2DX._isVML) {
        var q = n.getSVG();
        q.removeChild(g);
      } else {
        var p = n.getVML();
        p.removeChild(g);
      }
      n.removeShape(this);
      n = null;
      h = true;
    }
  }
  this.show = m;
  function m() {
    g.style.display = "";
  }
  this.hide = f;
  function f() {
    g.style.display = "none";
  }
}
function jxArc(a, b, p, j, q, e, k) {
  this.center = a;
  this.width = b;
  this.height = p;
  this.startAngle = j;
  this.arcAngle = q;
  this.pen = null;
  this.brush = null;
  var g,
    h = true;
  var o;
  if (e) {
    this.pen = e;
  }
  if (k) {
    this.brush = k;
  }
  if (!jsDraw2DX._isVML) {
    g = document.createElementNS("http://www.w3.org/2000/svg", "path");
  } else {
    g = document.createElement("v:arc");
  }
  this.getType = l;
  function l() {
    return "jxArc";
  }
  this.addEventListener = c;
  function c(s, t) {
    if (g.addEventListener) {
      g.addEventListener(s, u, false);
    } else {
      if (g.attachEvent) {
        g.attachEvent("on" + s, u);
      }
    }
    var r = this;
    function u(v) {
      t(v, r);
    }
  }
  this.draw = m;
  function m(I) {
    var L, N;
    L = I.logicalToPhysicalPoint(I);
    N = I.scale;
    var w, u;
    w = this.center.x;
    u = this.center.y;
    g.style.display = "none";
    if (!jsDraw2DX._isVML) {
      var M, K, F, E, H, G, v, t, r, A;
      M = (N * this.width) / 2;
      K = (N * this.height) / 2;
      r = (this.startAngle * Math.PI) / 180;
      F =
        (M * K) /
        Math.sqrt(
          K * K * Math.cos(r) * Math.cos(r) + M * M * Math.sin(r) * Math.sin(r),
        );
      H = F * Math.cos(r);
      v = F * Math.sin(r);
      H = w + H;
      v = u + v;
      A = ((j + q) * Math.PI) / 180;
      E =
        (M * K) /
        Math.sqrt(
          K * K * Math.cos(A) * Math.cos(A) + M * M * Math.sin(A) * Math.sin(A),
        );
      G = E * Math.cos(A);
      t = E * Math.sin(A);
      G = w + G;
      t = u + t;
      var C = I.getSVG();
      if (h) {
        C.appendChild(g);
        h = false;
      }
      if (!this.pen) {
        g.setAttribute("stroke", "none");
      } else {
        this.pen.updateSVG(g);
      }
      if (!this.brush) {
        g.setAttribute("fill", "none");
      } else {
        this.brush.updateSVG(g, I.getDefs());
      }
      if (q > 180) {
        g.setAttribute(
          "d",
          "M" + H + " " + v + " A" + M + " " + K + " 0 1 1 " + G + " " + t,
        );
      } else {
        g.setAttribute(
          "d",
          "M" + H + " " + v + " A" + M + " " + K + " 0 0 1 " + G + " " + t,
        );
      }
    } else {
      var s = I.getVML(),
        J;
      if (h) {
        s.appendChild(g);
        h = false;
      }
      var M, K, F, E, r, A, z, B, D;
      D = this.startAngle + this.arcAngle;
      j = this.startAngle % 360;
      D = D % 360;
      M = (N * this.width) / 2;
      K = (N * this.height) / 2;
      r = (this.startAngle * Math.PI) / 180;
      F =
        (M * K) /
        Math.sqrt(
          K * K * Math.cos(r) * Math.cos(r) + M * M * Math.sin(r) * Math.sin(r),
        );
      z = (Math.asin((F * Math.sin(r)) / K) * 180) / Math.PI;
      if (this.startAngle > 270) {
        z = 360 + z;
      } else {
        if (this.startAngle > 90) {
          z = 180 - z;
        }
      }
      A = (D * Math.PI) / 180;
      E =
        (M * K) /
        Math.sqrt(
          K * K * Math.cos(A) * Math.cos(A) + M * M * Math.sin(A) * Math.sin(A),
        );
      B = (Math.asin((E * Math.sin(A)) / K) * 180) / Math.PI;
      if (D > 270) {
        B = 360 + B;
      } else {
        if (D > 90) {
          B = 180 - B;
        }
      }
      if (!this.pen) {
        g.Stroked = "False";
      } else {
        this.pen.updateVML(g);
      }
      J = g.fill;
      if (!this.brush) {
        J.On = "false";
      } else {
        this.brush.updateVML(J);
      }
      g.style.position = "absolute";
      g.style.width = N * this.width;
      g.style.height = N * this.height;
      g.style.position = "absolute";
      g.style.left = w - (N * this.width) / 2;
      g.style.top = u - (N * this.height) / 2;
      z = z + 90;
      if (z > 360) {
        g.StartAngle = z % 360;
      } else {
        g.StartAngle = z;
      }
      B = B + 90;
      if (B > 360) {
        if (z <= 360) {
          g.StartAngle = z - 360;
        }
        g.EndAngle = B % 360;
      } else {
        g.EndAngle = B;
      }
    }
    g.style.display = "";
    if (o && I != o) {
      o.removeShape(this);
    }
    o = I;
    o.addShape(this);
  }
  this.remove = d;
  function d() {
    if (o) {
      if (!jsDraw2DX._isVML) {
        var s = o.getSVG();
        s.removeChild(g);
      } else {
        var r = o.getVML();
        r.removeChild(g);
      }
      o.removeShape(this);
      o = null;
      h = true;
    }
  }
  this.show = n;
  function n() {
    g.style.display = "";
  }
  this.hide = f;
  function f() {
    g.style.display = "none";
  }
}
function jxArcSector(a, b, p, j, q, e, k) {
  this.center = a;
  this.width = b;
  this.height = p;
  this.startAngle = j;
  this.arcAngle = q;
  this.pen = null;
  this.brush = null;
  var g,
    h = true;
  var o;
  if (e) {
    this.pen = e;
  }
  if (k) {
    this.brush = k;
  }
  if (!jsDraw2DX._isVML) {
    g = document.createElementNS("http://www.w3.org/2000/svg", "path");
  } else {
    g = document.createElement("v:shape");
  }
  this.getType = l;
  function l() {
    return "jxArcSector";
  }
  this.addEventListener = c;
  function c(s, t) {
    if (g.addEventListener) {
      g.addEventListener(s, u, false);
    } else {
      if (g.attachEvent) {
        g.attachEvent("on" + s, u);
      }
    }
    var r = this;
    function u(v) {
      t(v, r);
    }
  }
  this.draw = m;
  function m(L) {
    var O, Q;
    O = L.logicalToPhysicalPoint(this.center);
    Q = L.scale;
    var A, v;
    A = O.x;
    v = O.y;
    var P, N, H, G, K, J, z, u, r, B;
    P = (Q * this.width) / 2;
    N = (Q * this.height) / 2;
    r = (this.startAngle * Math.PI) / 180;
    H =
      (P * N) /
      Math.sqrt(
        N * N * Math.cos(r) * Math.cos(r) + P * P * Math.sin(r) * Math.sin(r),
      );
    K = H * Math.cos(r);
    z = H * Math.sin(r);
    K = A + K;
    z = v + z;
    B = ((this.startAngle + this.arcAngle) * Math.PI) / 180;
    G =
      (P * N) /
      Math.sqrt(
        N * N * Math.cos(B) * Math.cos(B) + P * P * Math.sin(B) * Math.sin(B),
      );
    J = G * Math.cos(B);
    u = G * Math.sin(B);
    J = A + J;
    u = v + u;
    g.style.display = "none";
    if (!jsDraw2DX._isVML) {
      var E = L.getSVG();
      if (h) {
        E.appendChild(g);
        h = false;
      }
      if (!this.pen) {
        g.setAttribute("stroke", "none");
      } else {
        this.pen.updateSVG(g);
      }
      if (!this.brush) {
        g.setAttribute("fill", "none");
      } else {
        this.brush.updateSVG(g, L.getDefs());
      }
      if (q > 180) {
        g.setAttribute(
          "d",
          "M" +
            A +
            " " +
            v +
            " L" +
            K +
            " " +
            z +
            " A" +
            P +
            " " +
            N +
            " 0 1 1 " +
            J +
            " " +
            u +
            " Z",
        );
      } else {
        g.setAttribute(
          "d",
          "M" +
            A +
            " " +
            v +
            " L" +
            K +
            " " +
            z +
            " A" +
            P +
            " " +
            N +
            " 0 0 1 " +
            J +
            " " +
            u +
            " Z",
        );
      }
    } else {
      var s = L.getVML(),
        M;
      if (h) {
        s.appendChild(g);
        h = false;
      }
      var D, F, I, C;
      D = Math.min(u, Math.min(v, z));
      F = Math.min(J, Math.min(A, K));
      I = Math.max(u, Math.max(v, z)) - D;
      C = Math.max(J, Math.max(A, K)) - F;
      if (!this.pen) {
        g.Stroked = "False";
      } else {
        this.pen.updateVML(g);
      }
      M = g.fill;
      if (!this.brush) {
        M.On = "false";
      } else {
        this.brush.updateVML(M);
      }
      g.style.position = "absolute";
      g.style.height = 1;
      g.style.width = 1;
      g.CoordSize = 1 + " " + 1;
      g.Path =
        "M" +
        A +
        "," +
        v +
        " AT" +
        (A - P) +
        "," +
        (v - N) +
        "," +
        (A + P) +
        "," +
        (v + N) +
        "," +
        Math.round(J) +
        "," +
        Math.round(u) +
        "," +
        Math.round(K) +
        "," +
        Math.round(z) +
        " X E";
    }
    g.style.display = "";
    if (o && L != o) {
      o.removeShape(this);
    }
    o = L;
    o.addShape(this);
  }
  this.remove = d;
  function d() {
    if (o) {
      if (!jsDraw2DX._isVML) {
        var s = o.getSVG();
        s.removeChild(g);
      } else {
        var r = o.getVML();
        r.removeChild(g);
      }
      o.removeShape(this);
      o = null;
      h = true;
    }
  }
  this.show = n;
  function n() {
    g.style.display = "";
  }
  this.hide = f;
  function f() {
    g.style.display = "none";
  }
}
function jxCurve(n, c, g, l) {
  this.points = n;
  this.pen = null;
  this.brush = null;
  this.tension = 1;
  var e,
    f = true;
  var m;
  if (c) {
    this.pen = c;
  }
  if (g) {
    this.brush = g;
  }
  if (l != null) {
    this.tension = l;
  }
  if (!jsDraw2DX._isVML) {
    e = document.createElementNS("http://www.w3.org/2000/svg", "path");
  } else {
    e = document.createElement("v:shape");
  }
  this.getType = h;
  function h() {
    return "jxCurve";
  }
  this.addEventListener = a;
  function a(p, q) {
    if (e.addEventListener) {
      e.addEventListener(p, r, false);
    } else {
      if (e.attachEvent) {
        e.attachEvent("on" + p, r);
      }
    }
    var o = this;
    function r(s) {
      q(s, o);
    }
  }
  this.draw = j;
  function j(u) {
    var v = new Array();
    for (ind in this.points) {
      v[ind] = u.logicalToPhysicalPoint(this.points[ind]);
    }
    var z,
      p = this.tension,
      t = new Array(),
      w = new Array(),
      q = new Array();
    for (i in v) {
      i = parseInt(i);
      if (i == 0) {
        t[i] = new jxPoint(
          (p * (v[1].x - v[0].x)) / 2,
          (p * (v[1].y - v[0].y)) / 2,
        );
      } else {
        if (i == v.length - 1) {
          t[i] = new jxPoint(
            (p * (v[i].x - v[i - 1].x)) / 2,
            (p * (v[i].y - v[i - 1].y)) / 2,
          );
        } else {
          t[i] = new jxPoint(
            (p * (v[i + 1].x - v[i - 1].x)) / 2,
            (p * (v[i + 1].y - v[i - 1].y)) / 2,
          );
        }
      }
    }
    for (i in v) {
      i = parseInt(i);
      if (i == v.length - 1) {
        w[i] = new jxPoint(v[i].x + t[i].x / 3, v[i].y + t[i].y / 3);
        q[i] = new jxPoint(v[i].x - t[i].x / 3, v[i].y - t[i].y / 3);
      } else {
        w[i] = new jxPoint(v[i].x + t[i].x / 3, v[i].y + t[i].y / 3);
        q[i] = new jxPoint(
          v[i + 1].x - t[i + 1].x / 3,
          v[i + 1].y - t[i + 1].y / 3,
        );
      }
    }
    for (i in v) {
      i = parseInt(i);
      if (i == 0) {
        z = "M" + v[i].x + "," + v[i].y;
      }
      if (i < v.length - 1) {
        z =
          z +
          " C" +
          Math.round(w[i].x) +
          "," +
          Math.round(w[i].y) +
          "," +
          Math.round(q[i].x) +
          "," +
          Math.round(q[i].y) +
          "," +
          Math.round(v[i + 1].x) +
          "," +
          Math.round(v[i + 1].y);
      }
    }
    e.style.display = "none";
    if (!jsDraw2DX._isVML) {
      var s = u.getSVG();
      if (f) {
        s.appendChild(e);
        f = false;
      }
      if (!this.pen) {
        e.setAttribute("stroke", "none");
      } else {
        this.pen.updateSVG(e);
      }
      if (!this.brush) {
        e.setAttribute("fill", "none");
      } else {
        this.brush.updateSVG(e, u.getDefs());
      }
      e.setAttribute("d", z);
    } else {
      var o = u.getVML(),
        r;
      if (f) {
        o.appendChild(e);
        f = false;
      }
      if (!this.pen) {
        e.Stroked = "False";
      } else {
        this.pen.updateVML(e);
      }
      r = e.fill;
      if (!this.brush) {
        r.On = "false";
      } else {
        this.brush.updateVML(r);
      }
      z = z + " E";
      e.style.position = "absolute";
      e.style.width = 1;
      e.style.height = 1;
      e.CoordSize = 1 + " " + 1;
      e.Path = z;
    }
    e.style.display = "";
    if (m && u != m) {
      m.removeShape(this);
    }
    m = u;
    m.addShape(this);
  }
  this.remove = b;
  function b() {
    if (m) {
      if (!jsDraw2DX._isVML) {
        var p = m.getSVG();
        p.removeChild(e);
      } else {
        var o = m.getVML();
        o.removeChild(e);
      }
      m.removeShape(this);
      m = null;
      f = true;
    }
  }
  this.show = k;
  function k() {
    e.style.display = "";
  }
  this.hide = d;
  function d() {
    e.style.display = "none";
  }
}
function jxClosedCurve(n, c, g, l) {
  this.points = n;
  this.pen = null;
  this.brush = null;
  this.tension = 1;
  var e,
    f = true;
  var m;
  var e = null;
  if (c) {
    this.pen = c;
  }
  if (g) {
    this.brush = g;
  }
  if (l != null) {
    this.tension = l;
  }
  if (!jsDraw2DX._isVML) {
    e = document.createElementNS("http://www.w3.org/2000/svg", "path");
  } else {
    e = document.createElement("v:shape");
  }
  this.getType = h;
  function h() {
    return "jxClosedCurve";
  }
  this.addEventListener = a;
  function a(p, q) {
    if (e.addEventListener) {
      e.addEventListener(p, r, false);
    } else {
      if (e.attachEvent) {
        e.attachEvent("on" + p, r);
      }
    }
    var o = this;
    function r(s) {
      q(s, o);
    }
  }
  this.draw = j;
  function j(v) {
    var w = new Array();
    for (ind in this.points) {
      w[ind] = v.logicalToPhysicalPoint(this.points[ind]);
    }
    var A,
      p = w.length - 1,
      q = this.tension,
      u = new Array(),
      z = new Array(),
      r = new Array();
    for (i in w) {
      i = parseInt(i);
      if (i == 0) {
        u[i] = new jxPoint(
          (q * (w[1].x - w[p].x)) / 2,
          (q * (w[1].y - w[p].y)) / 2,
        );
      } else {
        if (i == w.length - 1) {
          u[i] = new jxPoint(
            (q * (w[0].x - w[i - 1].x)) / 2,
            (q * (w[0].y - w[i - 1].y)) / 2,
          );
        } else {
          u[i] = new jxPoint(
            (q * (w[i + 1].x - w[i - 1].x)) / 2,
            (q * (w[i + 1].y - w[i - 1].y)) / 2,
          );
        }
      }
    }
    for (i in w) {
      i = parseInt(i);
      if (i == w.length - 1) {
        z[i] = new jxPoint(w[i].x + u[i].x / 3, w[i].y + u[i].y / 3);
        r[i] = new jxPoint(w[0].x - u[0].x / 3, w[0].y - u[0].y / 3);
      } else {
        z[i] = new jxPoint(w[i].x + u[i].x / 3, w[i].y + u[i].y / 3);
        r[i] = new jxPoint(
          w[i + 1].x - u[i + 1].x / 3,
          w[i + 1].y - u[i + 1].y / 3,
        );
      }
    }
    for (i in w) {
      i = parseInt(i);
      if (i == 0) {
        A = "M" + w[i].x + "," + w[i].y;
      }
      if (i < w.length - 1) {
        A =
          A +
          " C" +
          Math.round(z[i].x) +
          "," +
          Math.round(z[i].y) +
          "," +
          Math.round(r[i].x) +
          "," +
          Math.round(r[i].y) +
          "," +
          Math.round(w[i + 1].x) +
          "," +
          Math.round(w[i + 1].y);
      }
      if (i == w.length - 1) {
        A =
          A +
          " C" +
          Math.round(z[i].x) +
          "," +
          Math.round(z[i].y) +
          "," +
          Math.round(r[i].x) +
          "," +
          Math.round(r[i].y) +
          "," +
          Math.round(w[0].x) +
          "," +
          Math.round(w[0].y);
      }
    }
    e.style.display = "none";
    if (!jsDraw2DX._isVML) {
      var t = v.getSVG();
      if (f) {
        t.appendChild(e);
        f = false;
      }
      if (!this.pen) {
        e.setAttribute("stroke", "none");
      } else {
        this.pen.updateSVG(e);
      }
      if (!this.brush) {
        e.setAttribute("fill", "none");
      } else {
        this.brush.updateSVG(e, v.getDefs());
      }
      e.setAttribute("d", A);
    } else {
      var o = v.getVML(),
        s;
      if (f) {
        o.appendChild(e);
        f = false;
      }
      A = A + " E";
      if (!this.pen) {
        e.Stroked = "False";
      } else {
        this.pen.updateVML(e);
      }
      s = e.fill;
      if (!this.brush) {
        s.On = "false";
      } else {
        this.brush.updateVML(s);
      }
      e.style.position = "absolute";
      e.style.width = 1;
      e.style.height = 1;
      e.CoordSize = 1 + " " + 1;
      e.Path = A;
    }
    e.style.display = "";
    if (m && v != m) {
      m.removeShape(this);
    }
    m = v;
    m.addShape(this);
  }
  this.remove = b;
  function b() {
    if (m) {
      if (!jsDraw2DX._isVML) {
        var p = m.getSVG();
        p.removeChild(e);
      } else {
        var o = m.getVML();
        o.removeChild(e);
      }
      m.removeShape(this);
      m = null;
      f = true;
    }
  }
  this.show = k;
  function k() {
    e.style.display = "";
  }
  this.hide = d;
  function d() {
    e.style.display = "none";
  }
}
function jxBezier(m, c, g) {
  this.points = m;
  this.pen = null;
  this.brush = null;
  var e,
    f = true;
  var l;
  if (c) {
    this.pen = c;
  }
  if (g) {
    this.brush = g;
  }
  if (!jsDraw2DX._isVML) {
    e = document.createElementNS("http://www.w3.org/2000/svg", "path");
  } else {
    e = document.createElement("v:shape");
  }
  this.getType = h;
  function h() {
    return "jxBezier";
  }
  this.addEventListener = a;
  function a(o, p) {
    if (e.addEventListener) {
      e.addEventListener(o, q, false);
    } else {
      if (e.attachEvent) {
        e.attachEvent("on" + o, q);
      }
    }
    var n = this;
    function q(r) {
      p(r, n);
    }
  }
  this.draw = j;
  function j(H) {
    var B = new Array();
    for (ind in this.points) {
      B[ind] = H.logicalToPhysicalPoint(this.points[ind]);
    }
    var w;
    if (B.length > 4) {
      var G = new Array();
      var u = new Array();
      var r = new Array();
      var E = new Array();
      var A = B.length - 1;
      var F,
        D,
        C,
        z,
        s,
        J =
          10 *
          Math.min(
            1 / Math.abs(B[A].x - B[0].x),
            1 / Math.abs(B[A].y - B[0].y),
          );
      z = 0;
      for (s = 0; s < 1; s += J) {
        x = 0;
        y = 0;
        for (C = 0; C <= A; C++) {
          F = Math.pow(s, C) * Math.pow(1 - s, A - C) * B[C].x;
          if (C != 0 || C != A) {
            F =
              (F * jsDraw2DX.fact(A)) /
              jsDraw2DX.fact(C) /
              jsDraw2DX.fact(A - C);
          }
          x = x + F;
          D = Math.pow(s, C) * Math.pow(1 - s, A - C) * B[C].y;
          if (C != 0 || C != A) {
            D =
              (D * jsDraw2DX.fact(A)) /
              jsDraw2DX.fact(C) /
              jsDraw2DX.fact(A - C);
          }
          y = y + D;
        }
        E[z] = new jxPoint(x, y);
        z++;
      }
      E[z] = new jxPoint(B[A].x, B[A].y);
      B = E;
      tension = 1;
      for (C in B) {
        C = parseInt(C);
        if (C == 0) {
          G[C] = new jxPoint(
            (tension * (B[1].x - B[0].x)) / 2,
            (tension * (B[1].y - B[0].y)) / 2,
          );
        } else {
          if (C == B.length - 1) {
            G[C] = new jxPoint(
              (tension * (B[C].x - B[C - 1].x)) / 2,
              (tension * (B[C].y - B[C - 1].y)) / 2,
            );
          } else {
            G[C] = new jxPoint(
              (tension * (B[C + 1].x - B[C - 1].x)) / 2,
              (tension * (B[C + 1].y - B[C - 1].y)) / 2,
            );
          }
        }
      }
      for (C in B) {
        C = parseInt(C);
        if (C == 0) {
          u[C] = new jxPoint(B[0].x + G[0].x / 3, B[0].y + G[0].y / 3);
          r[C] = new jxPoint(B[1].x - G[1].x / 3, B[1].y - G[1].y / 3);
        } else {
          if (C == B.length - 1) {
            u[C] = new jxPoint(B[C].x + G[C].x / 3, B[C].y + G[C].y / 3);
            r[C] = new jxPoint(B[C].x - G[C].x / 3, B[C].y - G[C].y / 3);
          } else {
            u[C] = new jxPoint(B[C].x + G[C].x / 3, B[C].y + G[C].y / 3);
            r[C] = new jxPoint(
              B[C + 1].x - G[C + 1].x / 3,
              B[C + 1].y - G[C + 1].y / 3,
            );
          }
        }
      }
      for (C in B) {
        C = parseInt(C);
        if (C == 0) {
          w = "M" + B[C].x + "," + B[C].y;
        }
        if (C < B.length - 1) {
          w =
            w +
            " C" +
            Math.round(u[C].x) +
            "," +
            Math.round(u[C].y) +
            "," +
            Math.round(r[C].x) +
            "," +
            Math.round(r[C].y) +
            "," +
            Math.round(B[C + 1].x) +
            "," +
            Math.round(B[C + 1].y);
        }
      }
    } else {
      if (B.length == 4) {
        w =
          " M" +
          B[0].x +
          "," +
          B[0].y +
          " C" +
          B[1].x +
          "," +
          B[1].y +
          " " +
          B[2].x +
          "," +
          B[2].y +
          " " +
          B[3].x +
          "," +
          B[3].y;
      } else {
        if (B.length == 3) {
          if (!jsDraw2DX._isVML) {
            w =
              " M" +
              B[0].x +
              "," +
              B[0].y +
              " Q" +
              B[1].x +
              "," +
              B[1].y +
              " " +
              B[2].x +
              "," +
              B[2].y;
          } else {
            var o = new jxPoint(
              (2 / 3) * B[1].x + (1 / 3) * B[0].x,
              (2 / 3) * B[1].y + (1 / 3) * B[0].y,
            );
            var q = new jxPoint(
              (2 / 3) * B[1].x + (1 / 3) * B[2].x,
              (2 / 3) * B[1].y + (1 / 3) * B[2].y,
            );
            w =
              " M" +
              B[0].x +
              "," +
              B[0].y +
              " C" +
              Math.round(o.x) +
              "," +
              Math.round(o.y) +
              " " +
              Math.round(q.x) +
              "," +
              Math.round(q.y) +
              " " +
              B[2].x +
              "," +
              B[2].y;
          }
        }
      }
    }
    e.style.display = "none";
    if (!jsDraw2DX._isVML) {
      var v = H.getSVG();
      if (f) {
        v.appendChild(e);
        f = false;
      }
      if (!this.pen) {
        e.setAttribute("stroke", "none");
      } else {
        this.pen.updateSVG(e);
      }
      if (!this.brush) {
        e.setAttribute("fill", "none");
      } else {
        this.brush.updateSVG(e, H.getDefs());
      }
      e.setAttribute("d", w);
    } else {
      var p = H.getVML(),
        I;
      if (f) {
        p.appendChild(e);
        f = false;
      }
      w = w + " E";
      if (!this.pen) {
        e.Stroked = "False";
      } else {
        this.pen.updateVML(e);
      }
      I = e.fill;
      if (!this.brush) {
        I.On = "false";
      } else {
        this.brush.updateVML(I);
      }
      e.style.position = "absolute";
      e.style.width = 1;
      e.style.height = 1;
      e.CoordSize = 1 + " " + 1;
      e.Path = w;
    }
    e.style.display = "";
    if (l && H != l) {
      l.removeShape(this);
    }
    l = H;
    l.addShape(this);
  }
  this.remove = b;
  function b() {
    if (l) {
      if (!jsDraw2DX._isVML) {
        var o = l.getSVG();
        o.removeChild(e);
      } else {
        var n = l.getVML();
        n.removeChild(e);
      }
      l.removeShape(this);
      l = null;
      f = true;
    }
  }
  this.show = k;
  function k() {
    e.style.display = "";
  }
  this.hide = d;
  function d() {
    e.style.display = "none";
  }
}
function jxFunctionGraph(fn, xMin, xMax, pen, brush) {
  this.fn = fn;
  this.xMin = xMin;
  this.xMax = xMax;
  this.pen = null;
  this.brush = null;
  var _svgvmlObj,
    _isFirst = true;
  var _graphics;
  if (pen) {
    this.pen = pen;
  }
  if (brush) {
    this.brush = brush;
  }
  if (!jsDraw2DX._isVML) {
    _svgvmlObj = document.createElementNS("http://www.w3.org/2000/svg", "path");
  } else {
    _svgvmlObj = document.createElement("v:shape");
  }
  this.getType = getType;
  function getType() {
    return "jxFunctionGraph";
  }
  this.addEventListener = addEventListener;
  function addEventListener(eventName, handler) {
    if (_svgvmlObj.addEventListener) {
      _svgvmlObj.addEventListener(eventName, handlerWrapper, false);
    } else {
      if (_svgvmlObj.attachEvent) {
        _svgvmlObj.attachEvent("on" + eventName, handlerWrapper);
      }
    }
    var currentObj = this;
    function handlerWrapper(evt) {
      handler(evt, currentObj);
    }
  }
  this.validate = validate;
  function validate(fn) {
    fn = fn.replace(/x/g, 1);
    with (Math) {
      try {
        eval(fn);
        return true;
      } catch (ex) {
        return false;
      }
    }
  }
  this.draw = draw;
  function draw(graphics) {
    var points = new Array();
    var path, pDpoints;
    var pDpoints = new Array();
    var b1points = new Array();
    var b2points = new Array();
    if (!this.validate(fn)) {
      return;
    }
    var x,
      y,
      ic = 0;
    for (x = xMin; x < xMax; x++) {
      with (Math) {
        y = eval(fn.replace(/x/g, x));
      }
      points[ic] = graphics.logicalToPhysicalPoint(new jxPoint(x, y));
      ic++;
    }
    with (Math) {
      y = eval(fn.replace(/x/g, xMax));
    }
    points[ic] = graphics.logicalToPhysicalPoint(new jxPoint(x, y));
    ic++;
    tension = 1;
    for (i in points) {
      i = parseInt(i);
      if (i == 0) {
        pDpoints[i] = new jxPoint(
          (tension * (points[1].x - points[0].x)) / 2,
          (tension * (points[1].y - points[0].y)) / 2,
        );
      } else {
        if (i == points.length - 1) {
          pDpoints[i] = new jxPoint(
            (tension * (points[i].x - points[i - 1].x)) / 2,
            (tension * (points[i].y - points[i - 1].y)) / 2,
          );
        } else {
          pDpoints[i] = new jxPoint(
            (tension * (points[i + 1].x - points[i - 1].x)) / 2,
            (tension * (points[i + 1].y - points[i - 1].y)) / 2,
          );
        }
      }
    }
    for (i in points) {
      i = parseInt(i);
      if (i == 0) {
        b1points[i] = new jxPoint(
          points[0].x + pDpoints[0].x / 3,
          points[0].y + pDpoints[0].y / 3,
        );
        b2points[i] = new jxPoint(
          points[1].x - pDpoints[1].x / 3,
          points[1].y - pDpoints[1].y / 3,
        );
      } else {
        if (i == points.length - 1) {
          b1points[i] = new jxPoint(
            points[i].x + pDpoints[i].x / 3,
            points[i].y + pDpoints[i].y / 3,
          );
          b2points[i] = new jxPoint(
            points[i].x - pDpoints[i].x / 3,
            points[i].y - pDpoints[i].y / 3,
          );
        } else {
          b1points[i] = new jxPoint(
            points[i].x + pDpoints[i].x / 3,
            points[i].y + pDpoints[i].y / 3,
          );
          b2points[i] = new jxPoint(
            points[i + 1].x - pDpoints[i + 1].x / 3,
            points[i + 1].y - pDpoints[i + 1].y / 3,
          );
        }
      }
    }
    for (i in points) {
      i = parseInt(i);
      if (i == 0) {
        path = "M" + points[i].x + "," + points[i].y;
      }
      if (i < points.length - 1) {
        path =
          path +
          " C" +
          Math.round(b1points[i].x) +
          "," +
          Math.round(b1points[i].y) +
          "," +
          Math.round(b2points[i].x) +
          "," +
          Math.round(b2points[i].y) +
          "," +
          Math.round(points[i + 1].x) +
          "," +
          Math.round(points[i + 1].y);
      }
    }
    _svgvmlObj.style.display = "none";
    if (!jsDraw2DX._isVML) {
      var svg = graphics.getSVG();
      if (_isFirst) {
        svg.appendChild(_svgvmlObj);
        _isFirst = false;
      }
      if (!this.pen) {
        _svgvmlObj.setAttribute("stroke", "none");
      } else {
        this.pen.updateSVG(_svgvmlObj);
      }
      if (!this.brush) {
        _svgvmlObj.setAttribute("fill", "none");
      } else {
        this.brush.updateSVG(_svgvmlObj, graphics.getDefs());
      }
      _svgvmlObj.setAttribute("d", path);
    } else {
      var vml = graphics.getVML(),
        vmlFill;
      if (_isFirst) {
        vml.appendChild(_svgvmlObj);
        _isFirst = false;
      }
      path = path + " E";
      if (!this.pen) {
        _svgvmlObj.Stroked = "False";
      } else {
        this.pen.updateVML(_svgvmlObj);
      }
      vmlFill = _svgvmlObj.fill;
      if (!this.brush) {
        vmlFill.On = "false";
      } else {
        this.brush.updateVML(vmlFill);
      }
      _svgvmlObj.style.position = "absolute";
      _svgvmlObj.style.width = 1;
      _svgvmlObj.style.height = 1;
      _svgvmlObj.CoordSize = 1 + " " + 1;
      _svgvmlObj.Path = path;
    }
    _svgvmlObj.style.display = "";
    if (_graphics && graphics != _graphics) {
      _graphics.removeShape(this);
    }
    _graphics = graphics;
    _graphics.addShape(this);
  }
  this.remove = remove;
  function remove() {
    if (_graphics) {
      if (!jsDraw2DX._isVML) {
        var svg = _graphics.getSVG();
        svg.removeChild(_svgvmlObj);
      } else {
        var vml = _graphics.getVML();
        vml.removeChild(_svgvmlObj);
      }
      _graphics.removeShape(this);
      _graphics = null;
      _isFirst = true;
    }
  }
  this.show = show;
  function show() {
    _svgvmlObj.style.display = "";
  }
  this.hide = hide;
  function hide() {
    _svgvmlObj.style.display = "none";
  }
}
function jxText(o, p, a, e, j, b) {
  this.point = o;
  this.text = p;
  this.font = null;
  this.pen = null;
  this.brush = null;
  this.angle = 0;
  var g,
    h = true;
  var n;
  if (a) {
    this.font = a;
  }
  if (e) {
    this.pen = e;
  }
  if (j) {
    this.brush = j;
  }
  if (b) {
    this.angle = b;
  }
  if (!jsDraw2DX._isVML) {
    g = document.createElementNS("http://www.w3.org/2000/svg", "text");
  } else {
    g = document.createElement("v:shape");
  }
  this.getType = k;
  function k() {
    return "jxText";
  }
  this.addEventListener = c;
  function c(r, s) {
    if (g.addEventListener) {
      g.addEventListener(r, t, false);
    } else {
      if (g.attachEvent) {
        g.attachEvent("on" + r, t);
      }
    }
    var q = this;
    function t(u) {
      s(u, q);
    }
  }
  this.draw = l;
  function l(B) {
    var F;
    F = B.logicalToPhysicalPoint(this.point);
    var E, A;
    E = F.x;
    A = F.y;
    g.style.display = "none";
    if (!jsDraw2DX._isVML) {
      var w = B.getSVG();
      if (h) {
        w.appendChild(g);
        h = false;
      }
      if (!this.pen) {
        g.setAttribute("stroke", "none");
      } else {
        this.pen.updateSVG(g);
      }
      if (!this.brush) {
        g.setAttribute("fill", "none");
      } else {
        this.brush.updateSVG(g, B.getDefs());
      }
      if (this.font) {
        this.font.updateSVG(g);
      } else {
        jxFont.updateSVG(g);
      }
      g.setAttribute("x", E);
      g.setAttribute("y", A);
      g.setAttribute(
        "transform",
        "rotate(" + this.angle + " " + E + "," + A + ")",
      );
      g.textContent = this.text;
    } else {
      var s = B.getVML(),
        v,
        z,
        u;
      if (h) {
        u = document.createElement("v:textpath");
        u.On = "True";
        u.style["v-text-align"] = "left";
        g.appendChild(u);
        s.appendChild(g);
        h = false;
      }
      v = g.fill;
      u = g.firstChild;
      if (!this.pen) {
        g.Stroked = "False";
      } else {
        this.pen.updateVML(g);
      }
      v = g.fill;
      if (!this.brush) {
        v.On = "false";
      } else {
        this.brush.updateVML(v);
      }
      g.style.position = "absolute";
      g.style.height = 1;
      g.CoordSize = 1 + " " + 1;
      z = g.Path;
      z.TextPathOk = "true";
      z.v = "M" + E + "," + A + " L" + (E + 100) + "," + A + " E";
      u.String = this.text;
      if (this.font) {
        this.font.updateVML(u);
      } else {
        jxFont.updateVML(u);
      }
      g.style.display = "";
      var t, D, q, C;
      q = (g.clientHeight / 2) * 0.8;
      C = this.angle;
      E = Math.round(E + q * Math.sin((C * Math.PI) / 180));
      A = Math.round(A - q * Math.cos((C * Math.PI) / 180));
      t = Math.round(E + Math.cos((C * Math.PI) / 180) * 100);
      D = Math.round(A + Math.sin((C * Math.PI) / 180) * 100);
      g.Path = "M" + E + "," + A + " L" + t + "," + D + " E";
      g.style.width = 1;
    }
    g.style.display = "";
    if (n && B != n) {
      n.removeShape(this);
    }
    n = B;
    n.addShape(this);
  }
  this.remove = d;
  function d() {
    if (n) {
      if (!jsDraw2DX._isVML) {
        var r = n.getSVG();
        r.removeChild(g);
      } else {
        var q = n.getVML();
        q.removeChild(g);
      }
      n.removeShape(this);
      n = null;
      h = true;
    }
  }
  this.show = m;
  function m() {
    g.style.display = "";
  }
  this.hide = f;
  function f() {
    g.style.display = "none";
  }
}
function jxImage(point, url, width, height, angle) {
  this.point = point;
  this.url = url;
  this.width = width;
  this.height = height;
  this.angle = 0;
  var _svgvmlObj,
    _isFirst = true;
  var _graphics;
  if (angle) {
    this.angle = angle;
  }
  if (!jsDraw2DX._isVML) {
    _svgvmlObj = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "image",
    );
  } else {
    _svgvmlObj = document.createElement("v:image");
  }
  this.getType = getType;
  function getType() {
    return "jxImage";
  }
  this.addEventListener = addEventListener;
  function addEventListener(eventName, handler) {
    if (_svgvmlObj.addEventListener) {
      _svgvmlObj.addEventListener(eventName, handlerWrapper, false);
    } else {
      if (_svgvmlObj.attachEvent) {
        _svgvmlObj.attachEvent("on" + eventName, handlerWrapper);
      }
    }
    var currentObj = this;
    function handlerWrapper(evt) {
      handler(evt, currentObj);
    }
  }
  this.draw = draw;
  function draw(graphics) {
    var point, scale;
    point = graphics.logicalToPhysicalPoint(this.point);
    scale = graphics.scale;
    var x, y;
    x = point.x;
    y = point.y;
    _svgvmlObj.style.display = "none";
    if (!jsDraw2DX._isVML) {
      var svg = graphics.getSVG();
      if (_isFirst) {
        svg.appendChild(_svgvmlObj);
        _isFirst = false;
      }
      _svgvmlObj.setAttribute("x", x);
      _svgvmlObj.setAttribute("y", y);
      _svgvmlObj.setAttribute("height", scale * this.height);
      _svgvmlObj.setAttribute("width", scale * this.width);
      _svgvmlObj.setAttribute("preserveAspectRatio", "none");
      _svgvmlObj.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "href",
        this.url,
      );
      _svgvmlObj.setAttribute(
        "transform",
        "rotate(" + this.angle + " " + x + "," + y + ")",
      );
    } else {
      with (Math) {
        var x1,
          y1,
          ang = this.angle,
          a = (this.angle * PI) / 180,
          w,
          h,
          m1,
          m2,
          m3,
          m4;
        w = scale * this.width;
        h = scale * this.height;
        x1 = x;
        y1 = y;
        if (abs(ang) > 360) {
          ang = ang % 360;
        }
        if (ang < 0) {
          ang = 360 + ang;
        }
        if (ang >= 0 && ang < 90) {
          y1 = y;
          x1 = x - h * sin(a);
        } else {
          if (ang >= 90 && ang < 180) {
            y1 = y - h * sin(a - PI / 2);
            x1 = x - (w * sin(a - PI / 2) + h * cos(a - PI / 2));
          } else {
            if (ang >= 180 && ang < 270) {
              y1 = y - (w * sin(a - PI) + h * cos(a - PI));
              x1 = x - w * cos(a - PI);
            } else {
              if (ang >= 270 && ang <= 360) {
                x1 = x;
                y1 = y - w * cos(a - 1.5 * PI);
              }
            }
          }
        }
        m1 = cos(a);
        m2 = -sin(a);
        m3 = sin(a);
        m4 = cos(a);
      }
      var vml = graphics.getVML(),
        vmlFill;
      if (_isFirst) {
        vml.appendChild(_svgvmlObj);
        _isFirst = false;
      }
      _svgvmlObj.style.width = w;
      _svgvmlObj.style.height = h;
      _svgvmlObj.style.position = "absolute";
      _svgvmlObj.style.top = y1;
      _svgvmlObj.style.left = x1;
      _svgvmlObj.style.filter =
        "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand',M11=" +
        m1 +
        ",M12=" +
        m2 +
        ",M21=" +
        m3 +
        ",M22=" +
        m4 +
        ") filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
        url +
        "', sizingMethod='scale');";
    }
    _svgvmlObj.style.display = "";
    if (_graphics && graphics != _graphics) {
      _graphics.removeShape(this);
    }
    _graphics = graphics;
    _graphics.addShape(this);
  }
  this.remove = remove;
  function remove() {
    if (_graphics) {
      if (!jsDraw2DX._isVML) {
        var svg = _graphics.getSVG();
        svg.removeChild(_svgvmlObj);
      } else {
        var vml = _graphics.getVML();
        vml.removeChild(_svgvmlObj);
      }
      _graphics.removeShape(this);
      _graphics = null;
      _isFirst = true;
    }
  }
  this.show = show;
  function show() {
    _svgvmlObj.style.display = "";
  }
  this.hide = hide;
  function hide() {
    _svgvmlObj.style.display = "none";
  }
}
