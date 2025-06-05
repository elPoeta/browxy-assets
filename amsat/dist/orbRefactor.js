var lastdatetime,
  //tiposat,
  defaults,
  maxsatfreq,
  saveaoslosid,
  sunlon,
  sunlat,
  //adjust,
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
  //satazimuth,
  //satelevation,
  dlink,
  ulink,
  beacon,
  muplink,
  mdolink,
  mbeacon,
  doppler_factor,
  satselected,
  recoversat,
  //sattochange,
  popup,
  //tt,
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
var alljs = [[]];

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
  //errorMsg = "",
  //lineNumber = "",
  //url = "",
  leyen = "",
  tablelasttime = new Date(),
  zoom = 1,
  //timespan = 864e5 / 2.3,
  //shorttimespan = 3456e4,
  //longtimespan = 3456e5,
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
  selectoptions = `<option value=0>CW</option>
  <option value=1>LSB</option>
  <option value=2>USB</option>
  <option value=3>FM</option>
  <option value=4>FM-N</option>
  <option value=5>FM-W</option>
  <option value=6>AM</option>
  <option value=7>CW-N</option>
  <option value=7>CW-R</option>
  <option value=7>DIG</option>
  <option value=8>PKT</option>`,
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
  //eleva = 0,
  azisw = "&nbsp;N&nbsp;",
  progsw = "&nbsp;N&nbsp;",
  wispextra = "",
  dateset = !1,
  yellowcount = 0,
  losMeses = "EneFebMarAbrMayJunJulAgoSetOctNovDic",
  birdhelp = `<a href='#' title='Click for additional\nfrequency changes' onclick='event.preventDefault();if(vbasice){vbasice=false}else{vbasice=true}'>Zoom</a><br>
    <a href=# onclick="event.preventDefault();changeorder();" title="- Change Order -&#13 0: By AGE asc.&#13 1: By NAME asc.&#13 2: By NAME desc&#13 3: By AGE desc" style="color:#00ffff;cursor:pointer;">Sort`;
  window.name = "pass";
//var enchat = "",

var  rando = ("00" + Math.floor(100 * Math.random())).slice(-2),
  iconos = [
    imageSrcUrl['saticon5'],
    imageSrcUrl['saticon4'],
    imageSrcUrl['saticon2'],
    imageSrcUrl['saticon3'],
    imageSrcUrl['satnoa'],
    imageSrcUrl['iss'],
    imageSrcUrl['mon'],
    imageSrcUrl['saticony'],
    imageSrcUrl['unknown'],
  ];

// === Event Handlers ===
document.onkeydown = function (e) {
  if (e.key === "Escape" && !firstclick) {
    onlysat(PLib.sat[savesatid - 1].name);
  }
};

window.onerror = function (message, source, lineno) {
  alert(`Error: ${message} Script: ${source} Line: ${lineno}`);
};

// === User Agent Checks ===
var isAndroid236 = navigator.userAgent.includes("Android 2.3.6");
var isIphone = navigator.userAgent.includes("iPhone");
var isIpad = navigator.userAgent.includes("iPad");
//var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var isOpera = navigator.userAgent.includes("OPR") || navigator.userAgent.includes("Opera");

let graficos = !isAndroid236;

if (isIphone && !gqs("locator")) {
  alert(
    "To use Pass with iPhone, start with:\nhttp://amsat.org.ar/pass?locator=xxxxxx\nUsing your own locator for xxxxxx"
  );
}

if (isIpad && !gqs("locator")) {
  alert(
    "To use Pass with iPad, start with:\nhttp://amsat.org.ar/pass?locator=xxxxxx\nUsing your own locator for xxxxxx"
  );
}

// === Navigation Adjustment ===
// if (isChrome || isOpera) var NavAdj = 19;
const NavAdj = 19; // Currently same for all, adjust if logic changes

if (gqs("localat") && gqs("localon")) {
  localat = isNumeric(gqs("localat")) ? gqs("localat") : 0;
  localon = isNumeric(gqs("localon")) ? gqs("localon") : 0;
} else {
  loadMapState();
  
  if (!localat && navigator.appName !== "Microsoft Internet Explorer") {
    getip();
  }

  if (!localat) {
    localat = "-34.5696";
    localon = "-58.4581";
    satactivity += "LocBad/";
    alert(
      "Home Location Set to default\nClick Locator to fix and\nAllow Cookies to Save\n\n Click OK to Continue.."
    );
  }
}

localat = isNumeric(localat) ? localat : 0;
localon = isNumeric(localon) ? localon : 0;

// === Validate default locations ===
const isDefaultLocation =
  (localat == 0 && localon == 0) ||
  (localat == "-34.5696" && localon == "-58.4581") ||
  (localat == "35.3841" && (localon == "139.6101" || localon == "0"));

if (isDefaultLocation) {
  satactivity += "LocBad/";
  alert(
    "Home Location Set to default\nClick Locator to fix and\nAllow Cookies to Save\n\n Click OK to Continue.."
  );
}

// === Time Adjustment ===
Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

var husohoras = new Date().getTimezoneOffset() / 60;
var ahora = new Date().addHours(husohoras).addHours(-3);
function poneimg(e) {
  if("" != e && birdsw) {
    e = e.replace(/ /, "");
    document.getElementById("satimage").style.top = `298px`;
    document.getElementById("satimage").innerHTML = `<img class="disp" src='${imageSrcUrl[`sat${e}`] || ""}'>`
   } else { 
      document.getElementById("satimage").innerHTML = "";
   }
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
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const startDay = 0;
  const currentDate = (!a || a === "") ? new Date() : str2dt(a);
  const prevMonth = new Date(currentDate);
  prevMonth.setMonth(currentDate.getMonth() - 1);
  
  const nextMonth = new Date(currentDate);
  nextMonth.setMonth(currentDate.getMonth() + 1);
  
  const firstDay = new Date(currentDate);
  firstDay.setDate(1);
  firstDay.setDate(1 - ((7 + firstDay.getDay() - startDay) % 7));
  
  let calendarRows = '';
  
  calendarRows += '<tr>\n';
  for (let i = 0; i < 7; i++) {
    calendarRows += `  <td align="center" bgcolor="#87CEFA"><font color="white" style="font-weight:bold;" face="tahoma, verdana" size="2">${dayNames[(startDay + i) % 7]}</font></td>\n`;
  }
  calendarRows += '</tr>\n';
  
  // Calendar days
  const workingDate = new Date(firstDay);
  while (workingDate.getMonth() === currentDate.getMonth() || workingDate.getMonth() === firstDay.getMonth()) {
    calendarRows += '<tr>\n';
    
    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      let cellBgColor;
      if (workingDate.getDate() === currentDate.getDate() && workingDate.getMonth() === currentDate.getMonth()) {
        cellBgColor = '#FFB6C1'; 
      } else if (workingDate.getDay() === 0 || workingDate.getDay() === 6) {
        cellBgColor = '#DBEAF5'; // Weekend
      } else {
        cellBgColor = 'white'; 
      }
      
      const fontColor = workingDate.getMonth() === currentDate.getMonth() ? 'black' : 'gray';
      const dateStr = dt2dtstr(workingDate);
      
      calendarRows += `  <td bgcolor="${cellBgColor}" align="center">`;
      calendarRows += `<a href="javascript:getTimeValue();window.opener.${e}.value='${dateStr}'+timeValue; window.opener.cambiofecha(); window.close();">`;
      calendarRows += `<font color="${fontColor}" face="tahoma, verdana" size="2">${workingDate.getDate()}</font></a></td>\n`;
      
      workingDate.setDate(workingDate.getDate() + 1);
    }
    calendarRows += '</tr>\n';
  }

  const htmlContent = `
    <html>
    <head>
      <title>Calendar</title>
    </head>
    <body style="margin-top:0px;margin-bottom:0px;margin-left:0px;margin-right:0px;overflow-x:hidden;" bgcolor="#87CEFA">
      <table class="clsOTable" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td bgcolor="#4682B4">
            <table cellspacing="1" cellpadding="3" border="0" width="100%">
              <tr>
                <td bgcolor="#4682B4">
                  <a href="javascript:getTimeValue();window.opener.show_calendar('${e}', '${dt2dtstr(prevMonth)}'+timeValue);">
                    <img src="${imageSrcUrl.prev}" width="16" height="16" border="0" alt="previous month">
                  </a>
                </td>
                <td align="center" bgcolor="#4682B4" colspan="5">
                  <font color="white" face="tahoma, verdana" size="3">${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}</font>
                </td>
                <td bgcolor="#4682B4" align="right">
                  <a href="javascript:getTimeValue();window.opener.show_calendar('${e}', '${dt2dtstr(nextMonth)}'+timeValue);">
                    <img src="${imageSrcUrl.next}" width="16" height="16" border="0" alt="next month">
                  </a>
                </td>
              </tr>
              ${calendarRows}
              <form name="cal" style="margin-bottom:0;margin-top:0;">
                <tr style="border-color:#ffffff;border-width:0px;">
                  <td align="center" style="border-color:#ffffff;border-width:0px;" colspan="7" bgcolor="#87CEFA">
                    <font color="White" face="tahoma, verdana" size="3">
                      Time: <input type="text" id="time" name="time" value="${dt2tmstr(currentDate)}" size="6" onchange="checknumeric(this.value);" style="text-align:center;" maxlength="8">
                    </font>&nbsp;
                    <input type="button" style="border-style:outset;border-width:2px;border-color:#999999;" id="salir" name="salir" onclick="opener.MockDate.reset();opener.Orb.generateTable(opener.document.getElementById('passes'));opener.tablelasttime = new(Date);opener.dateset=false;opener.document.getElementById('changedate').style.left='211px';opener.document.getElementById('cal').style.width='16px';opener.satactivity=opener.satactivity+'CALERESET/';self.close();" value="Reset">
                  </td>
                </tr>
              </form>
            </table>
          </td>
        </tr>
      </table>
      <font color="White" face="tahoma, verdana" size="3"><center>Set Time & Click Day</center></font>
    </body>
    </html>`;
  
  const scriptContent = `
    const ff = new Date();
    let savetime = ('0' + ff.getHours()).slice(-2) + ':' + ('0' + ff.getMinutes()).slice(-2) + ':00';
    let timeValue = '';
    
    function getTimeValue() {
      const timeInput = document.getElementById('time');
      timeValue = timeInput ? timeInput.value : '';
      return timeValue;
    }
    
    function checknumeric(valor) {
      const oldvalue = valor;
      valor = valor.replace(/:/g, '');
      if (!opener.isNumeric(valor)) {
        alert('Invalid Time\\n' + oldvalue + '\\n..Reenter..');
        document.getElementById('time').value = savetime;
      }
    }`;
  
  // Determine window height based on browser
  const altura = navigator.userAgent.match(/Opera|OPR\//) ? "328" : "236";
  
  // Create popup window
  const popupWindow = window.open(
    "",
    "Calendar",
    `width=200,height=${altura},status=no,resizable=no,top=200,left=200,dependent=yes,z-lock=yes,directories=0,titlebar=no,toolbar=no,scrollbars=no,location=0,status=0,menubar=no`
  );
  
  // Set auto-close timeout
  popupWindow.setTimeout(() => {
    const resetButton = popupWindow.document.getElementById('salir');
    if (resetButton) resetButton.click();
  }, 180000); // 3 minutes
  

  popupWindow.document.documentElement.innerHTML = htmlContent;
  popupWindow.setTimeout(() => {
    const script = popupWindow.document.createElement('script');
    script.text = scriptContent;
    popupWindow.document.head.appendChild(script);

    const timeInput = popupWindow.document.getElementById('time');
    if (timeInput && !timeInput.value) {
      timeInput.value = dt2tmstr(currentDate);
    }
  }, 200); 
}

function str2dt(dateString) {
  const regex = /^(?<day>\d+)-(?<month>\d+)-(?<year>\d+)\s+(?<hours>\d+):(?<minutes>\d+):(?<seconds>\d+)$/;
  const match = dateString.match(regex);
  
  if (!match) {
    alert("Invalid Datetime format: " + dateString);
    return null;
  }
  
  const { day, month, year, hours, minutes, seconds } = match.groups;

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours),
    Number(minutes),
    Number(seconds)
  );
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
    (huso = "%2B" + huso);

var Orb = {
  satelliteMarkers: [],
  startTracking: function (e, a, l) {
    (Orb.map = e),
      Orb.crossBrowserSetStyle(
        e,
        `background-image: url(${imageSrcUrl[`world${zoom}`]}); background-position: 0 0; overflow: hidden;`,
        !0,
      );
    var c = document.createDocumentFragment(),
      u = document.createElement("div");
    (u.id = "home"),
      Orb.crossBrowserSetStyle(
        u,
        `position:relative; cursor:pointer; width: 24px; height: 24px; background-image: url(${imageSrcUrl['home']}); z-index: 2;`,
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
            `<img src="${imageSrcUrl['arrow']}" border=2 style="border-color:#ffffff;width:180px;height:180px;border-radius: 6px 6px 6px 6px;" width=180 height=180 title="Tracking satellites" alt="Tracking satellites">`),
          (document.getElementById("trackingdata").innerHTML =
            `<center>Click <img src="${imageSrcUrl['saticon2']}" border=0 width="25px" style="width:25px;"> Satellite<br>To see Az/El/Freq<br>Click <a href=#change><img src="${imageSrcUrl['home']}" title="Click to change Grid Locator" width=18px height="18px" border=0 style="width:18px;height:18px;"></a> to set QTH</center>`),
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
                `<img class="disp" src="${imageSrcUrl[`sat${PLib.sat[a - 1].name.toLowerCase().replace(/ /, "")}`]}>`);
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
        seticon = imageSrcUrl['unknown'],
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
      `position:absolute; cursor:pointer; width: 36px; height: 24px; z-index: 2; background-image: url(${seticon});`,
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
            "')\" onclick='event.preventDefault(); sh(" +
            e +
            ");'>" +
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

    // if (
    //   (0 == segs || 15 == segs || 30 == segs || 45 == segs) &&
    //   navigator.onLine
    // ) {
    //   if (
    //     (xmlHttp.open("GET", "chat/luser.php"),
    //     xmlHttp.send(null),
    //     xmlHttp.open("GET", "chat/users.html?rnd=" + Math.random(1e3)),
    //     xmlHttp.send(null),
    //     nasabare.length > 3)
    //   ) {
    //     var toolt =
    //       "At Chat\n" +
    //       (nasabare = nasabare.replace(/<br>/g, "")).substring(
    //         0,
    //         nasabare.length - 2,
    //       );
    //     "t.gif" == (urlright = document.getElementById("chat").src.slice(-5)) &&
    //       !0 == bip &&
    //       jBeep("Beep.wav"),
    //       (document.getElementById("chat").alt = toolt),
    //       (document.getElementById("chat").title = toolt),
    //       (document.getElementById("chat").src = imageSrcUrl['chati']),
    //       (nasabare = "");
    //   } else
    //     "i.gif" == (urlright = document.getElementById("chat").src.slice(-5)) &&
    //       !0 == bip &&
    //       jBeep("bell1.wav"),
    //       (document.getElementById("chat").alt = "Chat"),
    //       (document.getElementById("chat").title = "Chat"),
    //       (document.getElementById("chat").src = imageSrcUrl['chat']);
    // }

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
              `<center><img class="disp" src="${imageSrcUrl['sun0']}"></center>`);
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
            ? ` <img src='${imageSrcUrl['sun1']}' title='SUNLIT' style='cursor:pointer;visibility:visible;' onclick='graficarsuncoverage();'>`
            : ` <img src='${imageSrcUrl['sun1']}' title='SUNLIT' style='cursor:pointer;visibility:hidden;'`),
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
          document.getElementById("azel").style.color = "#ff9966";
          var setredinitial = '<font style="color:#ff9966;">',
            setredfinal = "</font>";
        } else
          (document.getElementById("azel").style.color = "#ffffff"),
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
              "\n * Click to Change *' onclick=\"event.preventDefault();flipsw(this);\" style='cursor:pointer;color:inherit;text-decoration:none;'>" +
              showup +
              '</a><a href=# onclick="event.preventDefault();enterfreq(\'UpLink\');" style="color:inherit;" title="Adjust UPLink Freq." alt="Adjust UPLink Freq.">' +
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
              "\n * Click to Change *' onclick=\"event.preventDefault();flipsw(this);\" style='cursor:pointer;color:inherit;text-decoration:none;'>" +
              showdo +
              '</a><a href=# onclick="event.preventDefault();enterfreq(\'DownLink\');" style="color:inherit" title="Adjust DownLink Freq." alt="Adjust DownLink Freq.">' +
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
              '&nbsp;<span style="white-space:nowrap;"><span id=bn onclick="changewisp(\'bn\');">B<span style="font-size:11px;font-weight:bold;vertical-align:20%;"> )))))</span></span>&nbsp;<a href=# onclick="event.preventDefault();enterfreq(\'Beacon\');" style="color:inherit;" title="Adjust Beacon Freq." alt="Adjust Beacon Freq.">' +
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
            '<center><a href=# alt="See more options" title="See more options" onclick="event.preventDefault();gonext();"><font style="color:#00ffff;font-size:16px;font-family:Arial;font-weight:bold;line-height:16px;"><u> Next Option </u></font></a>' +
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
                  `<img src="${imageSrcUrl['arrow']}" border=2 style="border-color:#ffffff;width:180px;height:180px;border-radius: 6px 6px 6px 6px;" width=180 height=180 title="Tracking satellites" alt="Tracking satellites">`),
                (document.getElementById("trackingdata").innerHTML =
                  `<center>Click <img src="${imageSrcUrl['saticon2']}" border=0 width="25px" style="width:25px;"> Satellite<br>To see Az/El/Freq<br>Click <a href=#change><img src="${imageSrcUrl['home']}" title="Click to change Grid Locator" width=18px height="18px" border=0 style="width:18px;height:18px;"></a> to set QTH</center>`),
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
          `url(${imageSrcUrl['saticony']})` !=
            document.getElementById("satelliteMarker" + i).style
              .backgroundImage)
        ) {
          if (
            "MOON" ==
            document.getElementById("satelliteMarker" + i).alt.substring(0, 4)
          )
            document.getElementById(
              "satelliteMarker" + i,
            ).style.backgroundImage = `url(${imageSrcUrl['mon']})`;
          else {
            for (
              k = 2,
                document.getElementById(
                  "satelliteMarker" + i,
                ).style.backgroundImage = `url(${imageSrcUrl['saticony']})`,
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
            ((E.onmouseover = function (event) {
              if(birdsw){
                 let top = event.pageY - 140 < 298 ? 298 : event.pageY - 140;
                 top = event.pageY - 140 >= document.getElementById("passes").getBoundingClientRect().height ? document.getElementById("passes").getBoundingClientRect().height - 140 : top;
                 document.getElementById("satimage").style.top = `${top}px`;
                 document.getElementById("satimage").innerHTML = `<img class="disp" src=${imageSrcUrl[`sat${this.title.toLowerCase().replace(/ /, "")}`] || ""}>`;
              }
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
            (E.style.backgroundImage = `url(${imageSrcUrl['box']})`)),
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
        "')\" onclick='event.preventDefault();sh(" +
        a +
        ");'>" +
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
      `url(${imageSrcUrl[`world${zoom}`]})`),
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
  const omito = !!(5 != tiposel && (isIE() || detectIE()));
  const IE7 = !!(
    "Microsoft Internet Explorer" == navigator.appName && IEVersion() > 0
  );
  
  let shouldOmit = omito;
  if (IE7) shouldOmit = false;
  if (isOpera) shouldOmit = true;
  if (shouldOmit) e = tiposel;
  
  // Close existing overlay if open
  closeOverlay();
  
  satactivity = satactivity + "SATS" + e + "/";
  
  let k = 0;
  const arr1 = [];
  const arr2 = [];
  
  for (let s = 0; s < alljs.length; s++) {
    arr1[s] = ("0" + alljs[s][1].substring(2, 7).replace(/ /, "")).slice(-5);
  }
  
  for (let s = 0; s < freq.length; s++) {
    arr2[s] = ("0" + freq[s][0].replace(/ /, "")).slice(-5);
  }
  
  let cuentafff = 0;
  let fff = "";
  
  const encabe1 = `
    <tr style="color:#ffffff;background-color:#000000; font-weight:bold;">
      <td align=center style="font-size:14px;padding:2px 0px;">Cat #</td>
      <td align=center style="font-size:14px;padding:2px 0px;">&nbsp;Desig.</td>
      <td align=center style="font-size:14px;padding:2px 0px;">Launch&nbsp;</td>
      <td align=center>Orbit#</td>
      <td style="font-size:14px;padding:2px 0px;">&nbsp;H.Km.</td>
      <td align=center style="font-size:14px;padding:2px 0px;">Inclin.</td>
      <td align=center style="font-size:14px;padding:2px 0px;">Orb/Day</td>
      <td style="white-space:nowrap;font-size:14px;padding:2px 0px;">Satellite Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    </tr>`;
  
  // Process satellites for unclassified view (e == 9)
  if (e == 9) {
    for (let p = 0; p < alljs.length; p++) {
      let found = false;
      for (let q = 0; q < freq.length; q++) {
        if (arr1[p] == arr2[q]) {
          found = true;
          break;
        }
      }
      
      if (!found) {
        const anio = 1 * alljs[p][1].substring(9, 11) > 50 ? "19" : "20";
        const rowStyle = cuentafff % 2 == 0 ? 
          "style='background-color:#e4e4e4;font-size:14px;'" : 
          "style='background-color:#ffffff;font-size:14px;'";
        
        // Calculate altitude
        const periodo = 1 * alljs[p][2].substring(52, 60);
        const orbsegundos = 86400 / periodo;
        const orbseg2 = orbsegundos * orbsegundos;
        const numerador = 0x9306132f11f * orbseg2;
        const maltura = Math.pow(numerador, 0.33333333333) / 1e3 - 6378;
        const altu = maltura.toFixed(0);
        
        // Find KEPs data
        let kepis = "";
        for (let r = 0; r < alljs.length; r++) {
          if (alljs[r][1].substring(2, 7) == alljs[p][1].substring(2, 7)) {
            kepis = `${alljs[r][0].replace(/ /g, "&nbsp;")}<br>${alljs[r][1].replace(/ /g, "&nbsp;")}<br>${alljs[r][2].replace(/ /g, "&nbsp;")}`;
            break;
          }
        }
        
        cuentafff++;
        fff += `
          <tr ${rowStyle}>
            <td align=center style="padding:4px 0px;font-weight:bold;font-size:14px;">
              <a href='#' onclick="event.preventDefault();updateKepDisplay('${kepis.replace(/'/g, "\\'")}');" style="color:blue;">
                ${alljs[p][1].substring(2, 7)}
              </a>
            </td>
            <td align=center style="padding:4px 0px;font-weight:bold;font-size:14px;">${alljs[p][1].substring(8, 15)}</td>
            <td align=center style="padding:4px 0px;font-weight:bold;font-size:14px;">${anio}${alljs[p][1].substring(9, 11)}</td>
            <td align=center style="padding:4px 0px;font-weight:bold;font-size:14px;">${1 * alljs[p][2].substring(63, 68)}&nbsp;</td>
            <td align=right style="padding:4px 0px;font-weight:bold;font-size:14px;">${altu}</td>
            <td style="text-align:right;padding:4px 0px;font-weight:bold;font-size:14px;">${alljs[p][2].substring(9, 13)}&nbsp;</td>
            <td style="text-align:right;padding:4px 0px;font-weight:bold;font-size:14px;">${alljs[p][2].substring(52, 58)}&nbsp;&nbsp;</td>
            <td style="padding:4px 0px;font-weight:bold;font-size:14px;">${alljs[p][0]}</td>
          </tr>`;
      }
    }
  }
  
  const navigationButtons = shouldOmit ? '' : `
    <a href='#' class='botonch' style="color:#000000;background-color:#9fef86;padding: 8px 4px;font-size: 14px;" onclick='versats(0)'>
      &nbsp;SSB Linear&nbsp;
    </a>&nbsp;&nbsp;&nbsp;
    <a href='#' class='botonch' style="color:#000000;padding: 8px 4px;font-size: 14px;background-color:#ffff62;" onclick='versats(7)'>
      &nbsp;SSB + FM&nbsp;
    </a>&nbsp;&nbsp;&nbsp;
    <a href='#' class='botonch' style="color:#000000;padding: 8px 4px;font-size: 14px;background-color:#ff6af7;" onclick="versats(1);">
      &nbsp;FM Voice&nbsp;
    </a>&nbsp;&nbsp;&nbsp;
    <a href='#' class='botonch' style="color:#000000;padding: 8px 4px;font-size: 14px;background-color:#ffb084;" onclick='versats(2)'>
      &nbsp;FM Digital&nbsp;
    </a>&nbsp;&nbsp;&nbsp;
    <a href='#' class='botonch' style="color:#000000;padding: 8px 4px;font-size: 14px;background-color:#9ae1ff;" onclick='versats(3)'>
      &nbsp;XMT Only&nbsp;
    </a>&nbsp;&nbsp;&nbsp;
    <a href='#' class='botonch' style="color:#000000;padding: 8px 4px;font-size: 14px;background-color:#61c761;" onclick='versats(4)'>
      &nbsp;Weather&nbsp;
    </a>&nbsp;&nbsp;&nbsp;
    <a href='#' class='botonch' style="color:#000000;padding: 8px 4px;font-size: 14px;background-color:#e2e2e2;" onclick='versats(6)'>
      &nbsp;ALL Sats&nbsp;
    </a>&nbsp;&nbsp;&nbsp;
    <a href='#' class='botonch' style="color:#ffffff;padding: 8px 4px;font-size: 14px;background-color:#222222;" onclick='versats(9)'>
      &nbsp;UnClasif&nbsp;&nbsp;
    </a>&nbsp;&nbsp;&nbsp;`;
  
  let title = "";
  switch(e) {
    case 0: title = `${countarray(0)} SSB LINEAR SATS`; break;
    case 7: title = `${1 * countarray(0) + 1 * countarray(1)} SSB LINEAR AND FM VOICE SATS`; break;
    case 1: title = `${countarray(1)} FM VOICE SATS`; break;
    case 2: title = `${countarray(2)} FM & SSB DIGITAL SATS`; break;
    case 3: title = `${countarray(3)} TRANSMIT ONLY SATS`; break;
    case 4: title = `${countarray(4)} WEATHER METEOROLOGICAL SATS`; break;
    case 6: title = `ALL SATS (${alljs.length})`; break;
    case 9: title = `UNCLASIFIED SATS (${cuentafff})`; break;
  }
  
  let frequencyTable = "";
  if (e != 9) {
    const tableHeader = `
      <table border="0" cellpadding="0" cellspacing="0" style="font-family:'Arial Narrow',Tahoma, Arial, 'Times New Roman';font-size:11px;line-height:10px;align:center;width:auto;">
        <tr>
          <td id='kepa' style="padding:2px 0px;font-size:14px;line-height:14px;"></td>
          <td colspan=12 id='kepi' style="padding:2px 0px;font-family:courier;font-size:14px;font-weight:bold;line-height:14px;"></td>
        </tr>
        <tr style='font-weight:bold;color:#ffffff;background-color:#000000;height:12px;'>
          <td align=center style="font-size:14px;white-space:nowrap;cursor:pointer;padding:4px 0px;" title="*=Selected&#13& Catalog #"><b>I CAT#</b></td>
          <td align=center style="font-size:14px;padding:4px 0px;"><b>NAME</b></td>
          <td align=center style="font-size:14px;cursor:pointer;padding:4px 0px;" title="Center Frequency"><b>&nbsp;Uplink</b></td>
          <td align=center style="font-size:14px;cursor:pointer;" title="Center Frequency"><b>&nbsp;Dwlink</b></td>
          <td align=center style="font-size:14px;padding:4px 0px;"><b>&nbsp;Beacon</b></td>
          <td align=center style="font-size:14px;cursor:pointer;padding:4px 0px;" title="Uplink Mode"><b>&nbsp;UM&nbsp;</b></td>
          <td align=center style="font-size:14px;cursor:pointer;padding:4px 0px;" title="Downlink Mode"><b>&nbsp;&nbsp;DM&nbsp;&nbsp;</b></td>
          <td align=center style="font-size:14px;cursor:pointer;padding:4px 0px;" title="Beacon Mode"><b>&nbsp;BM</b></td>
          <td align=center style="font-size:14px;padding:4px 0px;"><b>&nbsp;R/N</b></td>
          <td align=center style="font-size:14px;padding:4px 0px;"><b>&nbsp;T</b></td>
          <td align=center style="font-size:14px;cursor:pointer;padding:4px 0px;" title="Subtone CTCSS"><b>&nbsp;ST</b></td>
          <td align=center style='font-size:14px;white-space:nowrap;padding:4px 0px;'><b>&nbsp;&nbsp;&nbsp;&nbsp;Emission Type&nbsp;&nbsp;&nbsp;&nbsp;</b></td>
          <td align=center style="font-size:14px;padding:4px 0px;"><b>&nbsp;Comments&nbsp;</b></td>
        </tr>`;
    
    let rows = "";
    
    for (let i = 0; i < freq.length; i++) {
      let shouldInclude = false;
      
      // Determine if this frequency should be included based on filter
      if (e < 6 && (freq[i][9] == e || 5 == freq[i][9])) {
        shouldInclude = true;
      } else if (e == 7 && (0 == freq[i][9] || 1 == freq[i][9] || 5 == freq[i][9])) {
        shouldInclude = true;
      } else if (e == 6) {
        shouldInclude = true;
      }
      
      if (shouldInclude) {
        const rowStyle = k % 2 == 0 ? 
          "style='background-color:#e4e4e4;'" : 
          "style='background-color:#ffffff;'";
        
        let row = `<tr ${rowStyle}>`;
        
        for (let j = 0; j < 13; j++) {
          const cellStyle = j == 1 ? 'align=center style="font-weight:bold;padding:4px 0px;font-size:14px;"' : 'align=center style="padding:4px 0px;font-size:14px;"';
          
          // Check if satellite is selected
          let isSelected = false;
          for (let v = 0; v < selsat.length; v++) {
            if (selsat[v] == freq[i][0].substr(0, 5)) {
              isSelected = true;
              break;
            }
          }
          
          let cellContent = "";
          
          if (j == 0) {
            // First column - selection indicator
            if (freq[i][1].substring(0, 3) == "NA-" || isSelected) {
              cellContent = "*";
            } else {
              cellContent = "&nbsp;";
            }
          } else if (j == 1) {
            // Second column - satellite name with link
            let kepis = "";
            for (let r = 0; r < alljs.length; r++) {
              if (alljs[r][1].substring(2, 7) == freq[i][0]) {
                kepis = `${alljs[r][0].replace(/ /g, "&nbsp;")}<br>${alljs[r][1].replace(/ /g, "&nbsp;")}<br>${alljs[r][2].replace(/ /g, "&nbsp;")}`;
                break;
              }
            }
            
            let processedContent = freq[i][j]
              .replace(/height:76px;/, e == 6 ? "height:22px;" : "height:4px;")
              .replace(/background-image: url/, "")
              .replace(/<br>Still <i>'Calling Home..'/, "")
              .replace(/LUSAT has survived<br>30 Years in Space/, "")
              .replace(/<br>/g, e == 6 ? "" : "&nbsp;")
              .replace(/&nbsp;&nbsp;/g, "&nbsp;");
            
            cellContent = `&nbsp;<a href='#' onclick="event.preventDefault();updateKepDisplay('${kepis.replace(/'/g, "\\'")}');" style="color:blue;">${processedContent}</a>`;
          } else {
            // Other columns
            let processedContent = freq[i][j]
              .replace(/height:76px;/, e == 6 ? "height:22px;" : "height:4px;")
              .replace(/background-image: url/, "")
              .replace(/<br>Still <i>'Calling Home..'/, "")
              .replace(/LUSAT has survived<br>30 Years in Space/, "")
              .replace(/<br>/g, e == 6 ? "" : "&nbsp;")
              .replace(/&nbsp;&nbsp;/g, "&nbsp;");
            
            cellContent = `&nbsp;${processedContent}`;
          }
          
          row += `<td ${cellStyle}>${cellContent}</td>`;
          k++;
        }
        
        row += "</tr>";
        rows += row;
        
        if (e == 6 && k % 13 == 0) {
          rows += "<tr>";
        }
      }
    }
    
    const tableFooter = `
      <tr style='font-size:14px;font-weight:bold;color:#ffffff;background-color:#000000;height:12px;'>
        <td align=center style="white-space:nowrap;cursor:pointer;padding:2px 0px;" title="*=Selected&#13& Catalog #"><b>I CAT#</b></td>
        <td align=center style="padding:2px 0px;"><b>NAME</b></td>
        <td align=center style="cursor:pointer;padding:2px 0px;" title="Center Frequency"><b>&nbsp;Uplink</b></td>
        <td align=center style="cursor:pointer;padding:2px 0px;" title="Center Frequency"><b>&nbsp;Dwlink</b></td>
        <td align=center style="padding:2px 0px;"><b>&nbsp;Beacon</b></td>
        <td align=center style="cursor:pointer;padding:2px 0px;" title="Uplink Mode"><b>&nbsp;UM&nbsp;</b></td>
        <td align=center style="cursor:pointer;padding:2px 0px;" title="Downlink Mode"><b>&nbsp;&nbsp;DM&nbsp;&nbsp;</b></td>
        <td align=center style="cursor:pointer;padding:2px 0px;" title="Beacon Mode"><b>&nbsp;BM</b></td>
        <td align=center style="padding:2px 0px;"><b>&nbsp;R/N</b></td>
        <td align=center style="padding:2px 0px;"><b>&nbsp;T</b></td>
        <td align=center style="cursor:pointer;padding:2px 0px;" title="Subtone CTCSS"><b>&nbsp;ST</b></td>
        <td align=center style='white-space:nowrap;padding:2px 0px;'><b>&nbsp;&nbsp;&nbsp;&nbsp;Emission Type&nbsp;&nbsp;&nbsp;&nbsp;</b></td>
        <td align=center style="padding:2px 0px;"><b>&nbsp;Comments&nbsp;</b></td>
      </tr>
      </table></center>`;
    
    frequencyTable = tableHeader + rows + tableFooter;
  }
  
  // Build content for overlay
  const overlayContent = `
    <div style="text-align: center; padding: 20px;">
      ${navigationButtons}
      <button onclick="closeOverlay();" style="font-family:Tahoma,Arial;font-size:14px;font-weight:bold;padding:8px 16px;margin-left:10px;">Close</button><br>
      <p id='tit' style='font-size:22px;font-weight:bold;font-family:Tahoma;color:#555555;'>${title}</p>
      ${e == 9 ? 
        `<div style="width:800px; margin: 0 auto;">
          <table border=0 cellpadding=1 cellspacing=0 style="font-size:12px;font-family:Courier;line-height:10px;font-weight:bold;width:800px;">
            <tr>
              <td id='kepa' style="padding:2px 0px;font-size:14px;line-height:14px;"></td>
              <td colspan=12 id='kepi' style="padding:2px 0px;font-family:courier;font-size:14px;font-weight:bold;line-height:14px;"></td>
            </tr>
            ${encabe1}
            ${fff}
            ${encabe1}
          </table>
        </div>` : 
        frequencyTable
      }
    </div>`;
  
  // Create and show overlay
  showOverlay(overlayContent);
  
  // Set auto-close timer (3 minutes)
  // setTimeout(() => {
  //   closeOverlay();
  // }, 180000);
}

// Helper functions for overlay management
function showOverlay(content) {
  // Remove existing overlay if any
  closeOverlay();
  
  // Create overlay backdrop
  const overlay = document.createElement('div');
  overlay.id = 'satsOverlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
  `;
  
  // Create content container
  const contentDiv = document.createElement('div');
  contentDiv.style.cssText = `
    background-color: #f0e8dc;
    border-radius: 8px;
    max-width: 95%;
    max-height: 90%;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    position: relative;
  `;
  
  // Add styles for buttons
  const style = document.createElement('style');
  style.textContent = `
    .botonch {
      text-decoration: none;
      border: outset;
      border-radius: 9px;
      border-width: 2px;
      background-color: lightblue;
      color: #000000;
      font-family: tahoma,arial,trebuchet;
      font-size: 12px;
      font-weight: bold;
      line-height: 18px;
      white-space: nowrap;
      cursor: pointer;
      display: inline-block;
    }
    .botonch:hover, button:hover {
      background-color: yellow;
    }
     td a:hover {
      background-color: yellow;
     }  
  `;
  document.head.appendChild(style);
  
  contentDiv.innerHTML = content;
  overlay.appendChild(contentDiv);
  document.body.appendChild(overlay);
  
  // Close on backdrop click
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      closeOverlay();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeOverlay();
    }
  });
}

function closeOverlay() {
  const overlay = document.getElementById('satsOverlay');
  if (overlay) {
    overlay.remove();
  }
}

function updateKepDisplay(kepis) {
  const kepaEl = document.getElementById('kepa');
  const kepiEl = document.getElementById('kepi');
  
  if (kepaEl && kepiEl) {
    kepaEl.innerHTML = 'SAT<br>KEPs<br>TLE';
    kepiEl.innerHTML = kepis;
    
    // Scroll to top of overlay content
    const overlay = document.getElementById('satsOverlay');
    if (overlay) {
      const contentDiv = overlay.firstChild;
      contentDiv.scrollTop = 0;
    }
  }
}

function showhelp() {
  satactivity += "HELP/";
  
  // Remove existing overlay if it exists
  const existingOverlay = document.getElementById('help-overlay');
  if (existingOverlay) {
    existingOverlay.remove();
  }
  
  const languages = {
    english: `<center><b>* This application predicts and tracks amateur satellites in real time (local or GMT)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></center>
      <ul>
        <li>Should set your location automatically, if not, click on blue <u>'Locator'</u> label on top.</li>
        <li>Click on any colored icon, you'll see a intuitive graph showing actual Azim/Elev.</li>
        <li>Frequencies and modes of selected Satellite are shown with actual doppler.</li>
        <li>When sat clicked, shows path+coverage. Yellow icon marks Sat is in range.</li>
        <li>Table shows passes times/duration. Insure having correct time and timezone.</li>
        <li>Click on SUN will show day/night line, same for MOON, with usual EME freqs.</li>
        <li>By clicking on numbers at upper right, several zoomed maps are available.</li>
        <li>If sound enabled (red X), beep alerts for any Satellite approaching or leaving.</li>
        <li>Keps are updated daily (no need to update), most active Satellites are provided.</li>
        <li>Additional satellites can be added or deleted by clicking on '<u>+Sats</u>' label on top.</li>
        <li>Application could be used in the field, runs even without Internet on any device.</li>
        <li>If your locator not taken, start adding to url ?localat=xx.xxxx&localon=yy.yyyy .</li>
        <li>If using iPad or IOS and locator not taken, start adding to url ?locator=XXXXXX .</li>
        <li>To select a group add to url ?type= and any FM, SSB, SSBFM, NOAA, XMT, digital.</li>
        <li>If you want to start Pass with a specific satellite add to url ?sat=XXXXX .</li>
        <li>If you want to start Pass with only one satellite add to url ?satx=YYYYY .</li>
        <li>Or double click on a satellite, to see all sats again double click again.</li>
      </ul>
      <center><i>Enjoy!! Best 73 from LU7ABF, Pedro Converso, lu7abf at amsat.org.ar</i></center><br>`,
    
    espanol: `<center><b>* Esta aplicación predice y trackea Satélites amateur en tiempo real (local o GMT)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></center>
      <ul>
        <li>Debería poner automático tu ubicación, si no es así clickeá arriba leyenda <u>Locator</u>.</li>
        <li>Clickeá cualquier icono de color, verás gráfico mostrando azimut y elevación.</li>
        <li>Al seleccionar te muestra frecuencias y modos del Satélite y su Doppler real.</li>
        <li>Se muestran órbita y cubrimiento, el icono amarillo indica Satélite al alcance.</li>
        <li>La tabla dá horario/duración/azimuts. Asegurá tener bién día/hora/huso en tu PC.</li>
        <li>Al clickear el Sol, muestra línea día/noche y en la Luna frecuencias usuales TLT.</li>
        <li>Clickeando en números arriba/derecha, podrás ver varios acercamientos del mapa.</li>
        <li>Deshabilitando anuncios (X roja) un beep alerta Satélites aparecéndo o yéndose.</li>
        <li>Los Keplerianos se actualizan solos, se muestran los usuales Satélites activos.</li>
        <li>Dando click en '<u>+Sats</u>' arriba en la pantalla, podés agregar o quitar Satélites.</li>
        <li>Pass puede usarse en el campo, corre aún sin Internet en cualquier dispositivo.</li>
        <li>Si no toma tu locator, arranca agregando a la url ?localat=xx.xxxx&localon=yy.yyyy .</li>
        <li>Si usas iPad o IOS y no toma tu locator, arranca agregando a la url ?locator=XXXXXX .</li>
        <li>Selecc. un grupo: agregar a url ?type= y cualquier FM, SSB, SSBFM, NOAA, XMT, digital.</li>
        <li>Si quiere empezar el Pass con un satelite especifico agregue a la url ?sat=YYYYY .</li>
        <li>Si quiere empezar el Pass con solo un satelite agregue a la url ?satx=XXXXX .</li>
        <li>O de doble click en un satelite, para ver de nuevo todos los sats, doble click de nuevo.</li>
      </ul>
      <center><i>Que lo disfrutes, 73 de LU7ABF, Pedro Converso, lu7abf arroba amsat.org.ar</i></center><br>`,
    
    portugues: `&nbsp;&nbsp;&nbsp;&nbsp;<b>* Esta aplicação prevê e mostra satélites do radioamador em tempo real (local ou GMT)</b></center>
      <font style='font-size:13px;'>
        <ul style='padding:0;margin:16;'>
          <li>Deve colocar a sua localização automaticamente, se não clique acima lenda <b><u>Locator</u></b>.</li>
          <li>Clique em qualquer ícone de cor, você vai ver gráfico mostrando azimute e elevação.</li>
          <li>Ao selecionar, mostra freqüências e modos do satélite alem da sua Doppler real.</li>
          <li>Se mostra orbita e cobertura. Se o ícone e amarelo indica que o satélite e ao alcance.</li>
          <li>A tabela dá tempo/duração/azimutes. Certifique-se de ter bom dia/hora/fuso no seu PC.</li>
          <li>Ao clicar o ícone do Sol mostra linha dia/noite e da Lua freqüências habituais TLT.</li>
          <li>Clicando em números acima/direita, você verá várias abordagens do mapa.</li>
          <li>Avisa com sinal sonoro se um satélite aparece ou vai, clique no X vermelho para parar o som.</li>
          <li>Keplers são atualizados sozinho, os satélites ativos usuais são mostrados.</li>
          <li>Clicando em <b><u>'+Sats'</u></b> acima na tela, você pode adicionar ou remover satélites.</li>
          <li>PASS pode ser usada no campo, até mesmo sem Internet. Opera em qualquer dispositivo.</li>
          <li>Si localizador nao e tomado proba acrescentando a url com ?localat=xx.xxxx&localon=yy.yyyy .</li>
          <li>Para um gruppo, adicionar ao url ?type= e qualquer FM, SSB, SSBFM, NOAA, XMT, digital.</li>
          <li>Se você quer começar com um satelite especifico, adicionar ao url ?sat=YYYYY .</li>
          <li>Se você quer começar so com un satelite, adicionar ao url ?satx=XXXXX .</li>
          <li>Ou clique duas vezes em um sat, para ver todos os sats novamente, clique duas vezes.</li>
        </ul>
        <center><i>Aprecia-lo, 73 LU7ABF, Pedro Converso, lu7abf arroba amsat.org.ar</i></center>
      </font><br>`,
    
    deutsche: `<div style='font-size:16px;line-height:16px;font-weight:normal;font-family:Arial Narrow,Tahoma;'>
        <b>&nbsp;&nbsp;&nbsp;* Diese Anwendung sagt Flugbahnen von Amateurfunk-Satelliten in Echtzeit voraus (Lokalzeit oder GMT)</b><br><br>
        <ul style='padding:0;margin:0;'>
          <li>Deine Position sollte automatisch gesetzt werden, falls nicht, klicke oben auf das blaue <u>'Locator'</u>-Symbol.</li>
          <li>Klicke auf eines der farbigen Symbole um den Horizontalwinkel (Azimut) und Vertikalwinkel (Elevation) graphisch darzustellen.</li>
          <li>Es werden Betriebsart und Frequenzen (inklusive Doppler-Verschiebung) des ausgewählten Satelliten angezeigt.</li>
          <li>Ist ein Satellit ausgewählt, wird dessen Bahn und dessen (Funk-)Abdeckung angezeigt. Ein gelbes Symbol bedeutet, dass der Satellit in Reichweite ist.</li>
          <li>Die Tabelle zeigt eine Übersicht der Überflugzeiten und der Überflugdauer. Stelle dazu sicher, dass auf deinem Computer die korrekte Zeit eingestellt ist.</li>
          <li>Klicke auf 'SUN' um die Tages- und Nachtlinie anzuzeigen, dasselbe gilt für 'Moon' für die üblichen EME (Erde-Mond-Erde) Frequenzen.</li>
          <li>Durch Anklicken der Zahlen oben rechts können verschiedene Kartenmaßstäbe ausgewählt werden.</li>
          <li>Wenn der Ton aktiviert ist (rotes X), werden Pieptöne für jeden Satelliten ausgegeben, der in Reichweite kommt oder diese verlässt.</li>
          <li>Die Kepler-Daten werden täglich aktualisiert (keine manuelle Aktualisierung notwendig) - die meisten aktiven Satelliten sind bereits eingetragen.</li>
          <li>Weitere Satelliten können durch klicken auf das <u>'+Sats'</u>-Symbol hinzugefügt oder gelöscht werden (oben auf der Seite).</li>
          <liWenn du mit einem bestimmten Satelliten anfangen willst, fugst du zu url ?sat=XXXXX</li>
          <li>Die Anwendung kann auch im Feld eingesetzt werden, sie läuft auch ohne Internet auf jedem Gerät.</li>
          <li>Wenn Sie nicht Ihre Locator nehmen, starten Sie auf die URL hinzuzufugen ?localat=xx.xxxx&localon=yy.yyyy .</li>
          <li>Um einen einzelnen Satelliten zu sehen, doppelklicken Sie auf einen Satelliten. Um wieder alle Satelliten zu sehen, doppelklicken wieder.</li>
        </ul><br>
        <center><i>Viel Spass!!! Beste 73 von LU7ABF, Pedro Converso, lu7abf at amsat.org.ar</i></center><br>
      </div>`,
    
    italiano: `<div style='font-size:14px;line-height:18px;font-weight:normal;'>
        <b>* Questa applicazione prevede a tracciare satelliti radio amatoriali in tempo reale (locale/GMT)</b></font>
        <font style='font-size:15px;'><br>
        <li style='padding:0;margin:8;'>
          <li>Dovrebbe mettere automaticamente tua posizione, se clicchi sopra <u>Locator</u> potrai inserire il tuo.</li>
          <li>Fare clic su qualsiasi icona di colore, vedi il grafico che mostra l'azimut ed elevazione.</li>
          <li>Quando si selezionano i satelliti, si vedono le frequenze e modalità, con il suo effettivo Doppler.</li>
          <li>Sono indicati orbita e copertura, Un'icona gialla indica che il satellite è a portata di mano.</li>
          <li>La tabella dà il tempo/durata/azimut. Contiene inoltre di avere ora e giorno sul tuo PC.</li>
          <li>Quando si clicca il Sole viene mostrato il giorno/notte e le solite frequenze Luna TLT.</li>
          <li>Cliccando sui numeri sopra a destra, vedrete diversi ingrandimenti della mappa.</li>
          <li>Annunci e disattivazione (rosso X) avviso acustico ingresso e uscita del satellite.</li>
          <li>L'aggiornamento dei dati Kepleriani avviene in automatico, vengono mostrati il satelliti attivi.</li>
          <li>Cliccando su <u>'+Sats'</u> sullo schermo, è possibile aggiungere o rimuovere i satelliti.</li>
          <li>Pass può essere utilizzato anche senza collegamento a Internet su qualsiasi dispositivo.</li>
          <li>Se non si prendono il vostro locator, aggiungere alla url ?localat=xx.xxxx&localon=yy.yyyy .</li>
          <li>Se si vuole iniziare con un satellite specifica, aggiungere alla URL ?sat=XXXXX .</li>
          <li>Se si vuole iniziare con solo un satelite, aggiungere alla URL ?satx=YYYYY .</li>
          <li>Oppure fai doppio clic su un satellite, per vedere di nuovo tutti i sats, doppio clic recentemente.</li>
        </ul>
        <center><i>Grazie IZ5TEP, Filippo per l'aiuto in italiano e IK8XLD, Rocco per i preziosi suggerimenti<br><br>Godere!! Miglior 73 da LU7ABF, Pedro Converso, lu7abf a amsat.org.ar</i></center><br>
      </div>`,
    
    frances: `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>* Cette application prédit et montre Satellites Amateur de temps réel (local ou GMT)</b><br>
      <ul style='padding:0;margin:16;'>
        <li>Devriez mettre votre position automatiquement, sinon cliquez dessus légende <b><u>Locator</u></b>.</li>
        <li>Cliquez sur l'icône de couleur, vous verrez graphique montrant azimut et le élévation.</li>
        <li>Lorsque les fréquences de sélection et modes vous montre le satellite et son Doppler réelle.</li>
        <li>Ils sont représentés les orbites et la couverture. L'icône jaune indique la portée satellite.</li>
        <li>Le tableau donne le temps/durée/azimuths. prétend également avoir jour/heure/fuseau de votre PC.</li>
        <li>En cliquant sur l'icône Soleil montre jour/nuit et sur la Lune fréquences habituelles TLT.</li>
        <li>En cliquant sur les numéros ci-dessus/droite, vous verrez plusieurs approches de la carte.</li>
        <li>Annonces Désactivation (X rouge) Satellite Apparaissant bip d'avertissement ou de quitter.</li>
        <li>Keplerian sont mis à jour seul, les satellites actifs habituels sont présentés.</li>
        <li>En cliquant sur <b><u>'+Sats'</u></b> sur l'écran, vous pouvez ajouter ou supprimer des satellites.</li>
        <li>PASS peut être utilisé dans le domaine, même sans internet fonctionne sur tout appareil.</li>
        <li>Si utilisez le <a href='pass.exe' Title='Télécharger ou Executér pass.exe program' target=_blank style='color:#facc2e;'>PASS.EXE</a> avec <a href='wispdde.exe' Title='Télécharger ou Executér wispDDE Driver' target=_blank style='color:#facc2e;'>wispDDE</a>, pouvez contrôler les rotors et votre émetteurs-récepteurs.</li>
        <li>Si ne prenez pas le locator, commencer a ajouter a l'url ?localat=xx.xxxx&localon=yy.yyyy .</li>
        <li>Si vous voulez commencer avec un satellite spécifique ajouter à l'url ?sat=XXXXX .</li>
        <li>Pour voir un seul sat double-cliquer sur un sat, pour revoir tous, double-cliquer encore.</li>
      </ul>
      <center><i>Profitez !!, 73 LU7ABF, Pedro Converso, lu7abf a amsat.org.ar</i></center><br>`,
    
      russian: `<img alt='russian.gif' src='${imageSrcUrl['russian']}' /></br></br>`,
    
    turkish: `<font style='font-size:16px;font-family:Arial Narrow,Tahoma;line-height:16px;font-weight:normal;'>
        &nbsp;<b>* Bu uygulama tahmini ve gerçek zamanlı olarak (yerel veya GMT saatiyle) amatör uyduları izler.</b><br><br>
        <ul style='padding:0;margin:0;'>
          <li>Konumunuzun otomatik olarak ayarlamış olması gerekiyor. Ayarlanmamış ise üstteki mavi <u><b>'Locator'</b></u> linkini tıklayınız.</li>
          <li>Renkli simgelerden herhangi birine tıkladığınızda, gerçek zamanlı bir Az/El grafiği göreceksiniz.</li>
          <li>Seçilen uydunun frekans ve modları doppler'i verilmiş olarak gösterilir.</li>
          <li>Uyduya tıkladığınızda, uydunun geçiş yolu ve kapsama alanı gözükür. Sarı işaretli olanlar görüş alanınızdaki uydulardır.</li>
          <li>Tablo, uyduların geçiş zaman ve sürelerini gösterir. Doğru zaman diliminde olmasına dikkat ediniz.</li>
          <li>Gece-gündüz hattı için GÜNEŞ'e, EME frekansları için de AY'a tıklayabilirsiniz.</li>
          <li>Sağ üstteki sayılara tıklayıp harita ölçeğini değiştirebilirsiniz.</li>
          <li>Alarm özelliğini aktif ettiğinizde (Kırmızı X), kapsama alanınıza giren ve çıkan uydular için sesli uyarılar alabilirsiniz.</li>
          <li>Aktif olarak kullanılan uyduların keps verileri (ayrıca güncellemenize gerek kalmaksızın) her gün otomatik olarak güncellenir.</li>
          <li>Yukarıdaki <u><b>'+Sats'</b></u> linkine tıklayıp tabloya uydu ekleyebilir veya çıkartabilirsiniz.</li>
          <li>Uygulama herhangi bir cihazda, internet olmasa bile çalışabilir.</li>
        </ul><br>
        <center>Keyifli kullanımlar. 73 de LU7ABF, Pedro Converso, lu7abf{at}amsat.org.ar</i></center>
      </font><br>`,

      chinesse: `<img alt='russian.gif' src='${imageSrcUrl['chin1']}' /></br></br>`,
    
      japanese: `<img alt='russian.gif' src='${imageSrcUrl['japan']}' /></br></br>`,

      graphicHelp: `<img alt='.gif' src='${imageSrcUrl['passhelp']}' /></br></br>`
    
  };

  // Create overlay container
  const overlay = document.createElement('div');
  overlay.id = 'help-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 50px;
    overflow-y: auto;
  `;
  
  // Create modal content container
  const modal = document.createElement('div');
  modal.style.cssText = `
    background-color: #172447;
    min-width: 718px;
    max-width: 90vw;
    mix-height: 40vh;
    max-height: 80vh;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    position: relative;
    overflow-y: auto;
    margin: 20px;
  `;
  
  // Create close button
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '×';
  closeBtn.style.cssText = `
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    font-size: 24px;
    color: #ffffff;
    cursor: pointer;
    z-index: 1;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  closeBtn.addEventListener('mouseover', () => {
    closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  });
  closeBtn.addEventListener('mouseout', () => {
    closeBtn.style.backgroundColor = 'transparent';
  });
  
  // Create content area
  const content = document.createElement('div');
  content.style.cssText = `
    padding: 20px;
    font-family: Tahoma, Arial;
    font-size: 14px;
    line-height: 22px;
    color: #ffffff;
    font-weight: bold;
  `;
  
   const menuLang = document.createElement('div');
   menuLang.innerHTML =`<div style="padding: 8px 4px;margin-top: 5px;">
    <a href="#english" onclick="event.preventDefault();switchHelpLanguage('english');">English</a>&nbsp;&nbsp;
    <a href="#espanol" onclick="event.preventDefault();switchHelpLanguage('espanol');">Espa&ntilde;ol</a>&nbsp;&nbsp;
    <a href="#portugues" onclick="event.preventDefault(); switchHelpLanguage('portugues');">Portugu&eacute;s</a>&nbsp;&nbsp;
    <a href="#deutsche" onclick="event.preventDefault();switchHelpLanguage('deutsche');">Deutsch</a>&nbsp;&nbsp;
    <a href="#italiano" onclick="event.preventDefault();switchHelpLanguage('italiano');">Italiano</a>&nbsp;&nbsp;
    <a href="#frances" onclick="event.preventDefault();switchHelpLanguage('frances');">Fran&ccedil;ais</a>&nbsp;&nbsp;
    <a href="#russian" onclick="event.preventDefault();switchHelpLanguage('russian');">Russian</a>&nbsp;&nbsp;
    <a href="#turkish" onclick="event.preventDefault();switchHelpLanguage('turkish');">Turkish</a>&nbsp;&nbsp;
    <a href="#chinesse" onclick="event.preventDefault();switchHelpLanguage('chinesse');">Chinese</a>&nbsp;&nbsp;
    <a href="#japanese" onclick="event.preventDefault();switchHelpLanguage('japanese');">Japanese</a>
   </div>`;

  // Create language content area
  const languageDiv = document.createElement('div');
  languageDiv.id = 'lenguaje';
  languageDiv.innerHTML = languages.english;
  
  // Create buttons container
  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.cssText = `
    text-align: center;
    margin-top: 20px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  
  // Create buttons
  const buttons = [
    { text: 'Exit Help', action: () => closeOverlay() },
    { text: 'Graphic Help', action: () => switchHelpLanguage('graphicHelp') }
  ];
  
  buttons.forEach((btn, index) => {
    const button = document.createElement('input');
    button.type = 'button';
    button.value = btn.text;
    button.style.cssText = `
      font-weight: bold;
      margin: 2px 5px;
      padding: 5px 10px;
      cursor: pointer;
      background-color: #4a5568;
      color: white;
      border: 1px solid #666;
      border-radius: 4px;
    `;
    button.addEventListener('click', btn.action);
    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = '#2d3748';
    });
    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = '#4a5568';
    });
    buttonsContainer.appendChild(button);
    
   
    if ((index + 1) % 3 === 0 && index < buttons.length - 1) {
      buttonsContainer.appendChild(document.createElement('br'));
    }
  });
  
  function closeOverlay() {
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  }
  
  closeBtn.addEventListener('click', closeOverlay);
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeOverlay();
    }
  });

  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeOverlay();
      document.removeEventListener('keydown', escHandler);
    }
  });
  
  content.appendChild(menuLang);
  content.appendChild(languageDiv);
  content.appendChild(buttonsContainer);
  modal.appendChild(closeBtn);
  modal.appendChild(content);
  overlay.appendChild(modal);
  

  document.body.appendChild(overlay);
  
  // Auto-close after 2 minutes
  setTimeout(closeOverlay, 120000);
  
  // Store language switching functions globally for potential use
  //window.helpLanguages = languages;
  window.switchHelpLanguage = function(lang) {
    if (languages[lang]) {
      languageDiv.innerHTML = languages[lang];
    }
  };
}
function birdimage() {
  birdsw
    ? ((document.getElementById("bimg").src = imageSrcUrl['birdoff']),
      (birdsw = !1),
      (satactivity += "BIRDON/"))
    : ((document.getElementById("bimg").src = imageSrcUrl['birdon']),
      (birdsw = !0),
      (satactivity += "BIRDOFF/"));
}
function rotorimage() {
  rotorsw
    ? ((document.getElementById("rimg").src = imageSrcUrl['rotoroff']),
      (rotorsw = !1),
      (satactivity += "ROTORON/"))
    : ((document.getElementById("rimg").src = imageSrcUrl['rotoron']),
      (rotorsw = !0),
      (satactivity += "ROTOROFF/"));
}
function speak() {
  bip
    ? ((document.getElementById('spk').src = imageSrcUrl['speakeroff']),
      (bip = !1),
      (satactivity += "BIPON/"))
    : ((document.getElementById('spk').src = imageSrcUrl['speakeron']),
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
  
  // Find the latest KEPS data
  let latestIndex = 0;
  let latestDate = "";
  
  for (let u = 0; u < alljs.length; u++) {
    if (alljs[u][1].substr(18, 12) > latestDate &&
        alljs[u][1].substr(3, 3) !== "999" &&
        alljs[u][1].substr(18, 1) < "5") {
      latestDate = alljs[u][1].substr(18, 12);
      latestIndex = u;
    }
  }
  
  const fecha = new Date(
    "20" + alljs[latestIndex][1].substr(18, 2),
    0,
    1 * alljs[latestIndex][1].substr(20, 3)
  );
  
  const fech = fecha + " ";
  const dateFormatted = `dated: ${fech.substring(4, 7)}-${fech.substring(8, 10)} 20${alljs[latestIndex][1].substr(18, 2)} ${("0" + parseInt(24 * alljs[latestIndex][1].substr(23, 3))).slice(-2)} hs.`;
  
  const isMobile = screen.availWidth < 801;
  
  let tableRows = "";
  let selectedCount = 0;
  
  for (let u = 0; u < Math.floor(alljs.length / 4 + 1); u++) {
    tableRows += "</tr><tr>";
    
    for (let j = u; j < alljs.length; j += Math.floor(alljs.length / 4 + 1)) {
      let color = "";
      
      // Check if satellite is already selected
      for (let k = 0; k < PLib.tleData.length; k++) {
        if (alljs[j][1].substr(2, 5) === PLib.tleData[k][1].substr(2, 5)) {
          color = "background-color:#bbffaa;";
          selectedCount++;
          break;
        }
      }
      
      const catalog = alljs[j][1].substr(2, 5);
      tableRows += `<td onclick="kepsOverlayFunctions.cambio(this,'${catalog}');" class="tddet" style="${color}">${catalog} ${replacesatname(alljs[j][0])}</td>\n`;
    }
  }
  
  // Generate TLE data display
  let tleDisplay = "";
  for (let u = 0; u < PLib.tleData.length; u++) {
    tleDisplay += `<div style="padding:4px 0"><span style="padding:2px 0">${PLib.tleData[u][0]}</span><br>`;
    tleDisplay += `<span style="padding:2px 0">${PLib.tleData[u][1].replace(/ /g, "&nbsp;")}</span><br>\n`;
    tleDisplay += `<span style="padding:2px 0">${PLib.tleData[u][2].replace(/ /g, "&nbsp;")}</span></div><br>\n`;
  }
  
  // CSS styles based on screen size
  const styles = isMobile ? `
    .keps-overlay .tdtit {font-family: 'Courier New'; line-height:15px; font-size:12px; font-weight:bold; white-space: nowrap;}
    .keps-overlay .tddet {font-family: 'Courier New'; white-space: nowrap; font-size:12px; line-height:10px;cursor:pointer;font-weight:bold;padding:4px 0;}
    .keps-overlay table{border-collapse: collapse;}
    .keps-overlay tr {border:none;}
    .keps-overlay td{border-right: solid 1px #000000;}
    .keps-overlay .tdch {font-family: monospace; white-space: nowrap; font-size:11px; line-height:9px;cursor:pointer;font-weight:bold;}
  ` : `
    .keps-overlay .tdtit {font-family: 'Courier New'; line-height:18px; font-size:16px; font-weight:bold; white-space: nowrap;}
    .keps-overlay .tddet {font-family: 'Courier New'; white-space: nowrap; font-size:16px; line-height:10px;cursor:pointer;font-weight:bold;padding:4px 0;}
    .keps-overlay table{border-collapse: collapse;}
    .keps-overlay tr {border:none;}
    .keps-overlay td{border-right: solid 1px #000000;}
    .keps-overlay .tdch {font-family: 'Courier New'; white-space: nowrap; font-size:13px; line-height:10px;cursor:pointer;font-weight:bold;}
  `;
  
  // Create overlay HTML content
  const overlayHTML = `
    <div id="keps-overlay" class="keps-overlay" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        background: white;
        border-radius: 8px;
        width: 95%;
        max-height: 95%;
        overflow: auto;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        position: relative;
      ">
        <style>${styles}</style>
        
        <!-- Close button -->
        <button onclick="kepsOverlayFunctions.closeOverlay()" style="
          position: absolute;
          top: 10px;
          right: 15px;
          background: #ff4444;
          color: white;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          font-size: 18px;
          cursor: pointer;
          z-index: 10001;
        ">×</button>
        
        <div style="padding: 40px 20px 20px; margin-top:0; margin-bottom:0; margin-left:1px; margin-right:0px;">
          <center id="adddel" style="white-space: nowrap;">
            <font style="font-family: 'Courier New'; line-height:14px; font-size:14px; font-weight:bold; white-space: nowrap;">
              <input type="text" name="busco" id="keps-busco" maxlength="15" size="5" onchange="kepsOverlayFunctions.buscar();" oninput="kepsOverlayFunctions.buscar();" style="height:18px;text-transform:uppercase;">
              <input type="button" name="buscobutton" id="keps-buscobutton" value="Search" onclick="kepsOverlayFunctions.buscar()" style="font-size:13px;font-weight:normal;line-height:13px;height:20px;">
              &nbsp;Click Sats to Add/Del from predictions and click 
              <input type="button" style="font-weight:bold;line-height:14px;height:20px;" onclick="kepsOverlayFunctions.submit()" name="Submit" value="Submit">
              &nbsp;or&nbsp;<a href="javascript:kepsOverlayFunctions.closeOverlay();">Go Back</a>
            </font>
            <input style="visibility:hidden;" name="del" id="keps-del" type="text" maxlength="1420" size="1" value="${window.del || ''}">
            <input style="visibility:hidden;" name="add" id="keps-add" type="text" maxlength="1420" size="1" value="${window.add || ''}">
            
            <form target="pass" name="changes" id="keps-changes" style="margin-bottom:0;margin-top:0;margin-left:0px;margin-right:0px;">
              <table border="0" id="keps-satelites" cellpadding="0" cellspacing="0" style="font-family: 'Courier New'; font-size:12px; font-weight:bold; line-height:13px;width:98%;">
                <tr>
                  <td class="tdtit"><u>CATNO</u> <u>Satellite Name</u></td>
                  <td class="tdtit"><u>CATNO</u> <u>Satellite Name</u></td>
                  <td class="tdtit"><u>CATNO</u> <u>Satellite Name</u></td>
                  <td class="tdtit"><u>CATNO</u> <u>Satellite Name</u></td>
                </tr>
                ${tableRows}
                <tr>
                  <td align="center" style="background-color:#fff380;border-right: solid 0px; font-size:14px;">
                    ${alljs.length} Sats, ${selectedCount} Selected
                  </td>
                </tr>
                <tr>
                  <td align="right" valign="top" style="border-right: solid 0px;font-size:14px;">
                    Paste here + Keps to add:&nbsp;<br>
                    Formated as 2 lines (TLE)&nbsp;<br>
                    <input type="button" onclick="kepsOverlayFunctions.sendNewKeps()" name="nkeps" style="font-weight:bold;" id="keps-nkeps" value="  Send New Keps  ">&nbsp;&nbsp;
                  </td>
                  <td colspan="2" align="left" style="border-right: solid 0px;">
                    <textarea name="kepsnew" id="keps-kepsnew" cols="70" rows="5" style="font-size:9px;line-height:9px;font-weight:bold;"></textarea>
                  </td>
                  <td align="center" style="border-right: solid 0px;">
                    <input type="button" value="Clear All" style="font-weight:bold;" onclick="kepsOverlayFunctions.clearall();">&nbsp;
                    <input type="button" value="Mark All" style="font-weight:bold;" onclick="kepsOverlayFunctions.markall();">
                    <br>
                    <font style="font-family:Arial;font-size:15px;font-weight:bold;vertical-align:15%;">Save</font>
                    <input style="font-weight:bold;" type="button" value="This" onclick="kepsOverlayFunctions.saveThis();">
                    <input style="font-weight:bold;" type="button" value="Original" onclick="kepsOverlayFunctions.saveOriginal();">
                  </td>
                </tr>
              </table>
            </form>
          </center>
          
          <div style="white-space: nowrap;">
            <font style="font-family: Courier; font-size:15px; line-height:12px; font-weight:bold; color:#000000;">
              &nbsp;<br>
              Last Keplerian Data used in Nasa Format&nbsp;${dateFormatted}<br>
              &nbsp;&nbsp;&nbsp;<a href="javascript:kepsOverlayFunctions.closeOverlay();" style="color:#000000;">Go Back</a><br>
              <div style="font-size: 17px;line-height: 18px;padding: 4px 8px;">${tleDisplay}</div>
            </font>
          </div>
          <br>
        </div>
      </div>
    </div>
  `;

  // Remove existing overlay if present
  const existingOverlay = document.getElementById('keps-overlay');
  if (existingOverlay) {
    existingOverlay.remove();
  }

  // Add overlay to body
  document.body.insertAdjacentHTML('beforeend', overlayHTML);

  // Create overlay functions object if it doesn't exist
  if (!window.kepsOverlayFunctions) {
    window.kepsOverlayFunctions = {
      closeOverlay: function() {
        const overlay = document.getElementById('keps-overlay');
        if (overlay) {
          overlay.remove();
        }
      },

      clearall: function() {
        document.getElementById('keps-del').value = '';
        document.getElementById('keps-add').value = '';
        const table = document.getElementById("keps-satelites");
        const rows = table.getElementsByTagName("td");
        
        for (let k = 5; k < rows.length - 4; k++) {
          if (rows[k].style.backgroundColor === 'rgb(187, 255, 170)' || rows[k].style.backgroundColor === '#bbffaa') {
            rows[k].style.backgroundColor = "";
            document.getElementById('keps-del').value = document.getElementById('keps-del').value + rows[k].innerHTML.substring(0, 5) + ',';
          }
        }
      },

      markall: function() {
        document.getElementById('keps-del').value = '';
        document.getElementById('keps-add').value = '';
        const table = document.getElementById("keps-satelites");
        const rows = table.getElementsByTagName("td");
        
        for (let k = 5; k < rows.length - 4; k++) {
          if (rows[k].style.backgroundColor === '') {
            rows[k].style.backgroundColor = '#bbffaa';
            document.getElementById('keps-add').value = document.getElementById('keps-add').value + rows[k].innerHTML.substring(0, 5) + ',';
          }
        }
      },

      collect: function() {
        const table = document.getElementById("keps-satelites");
        const rows = table.getElementsByTagName("td");
        let defaults = "00000,";
        
        for (let k = 5; k < rows.length - 4; k++) {
          if (rows[k].style.backgroundColor !== '') {
            defaults = defaults + rows[k].innerHTML.substring(0, 5) + ',';
          }
        }
        
        const defaultm = defaults.split(",");
        defaultm.sort();
        defaults = "";
        
        for (let h = 1; h < defaultm.length; h++) {
          defaults = defaults + defaultm[h] + ",";
        }
        
        window.defaults = defaults;
      },

      cambio: function(what, catalog) {
        const toChange = catalog + ',';
        
        if (what.style.backgroundColor === '') {
          what.style.backgroundColor = "#bbffaa";
          document.getElementById('keps-add').value = document.getElementById('keps-add').value + catalog + ',';
          document.getElementById('keps-del').value = document.getElementById('keps-del').value.replace(toChange, "");
        } else {
          what.style.backgroundColor = '';
          document.getElementById('keps-del').value = document.getElementById('keps-del').value + catalog + ',';
          document.getElementById('keps-add').value = document.getElementById('keps-add').value.replace(toChange, "");
        }
      },

      buscar: function() {
        const busco = document.getElementById('keps-busco');
        
        if (busco.value.length > 0) {
          const buscando = busco.value.toLowerCase();
          satactivity = satactivity + "S:" + buscando + '/';
          const tds = document.getElementById('keps-overlay').getElementsByTagName('td');
          
          for (let j = 4; j < tds.length; j++) {
            if (tds[j].innerHTML.toLowerCase().indexOf(buscando) > -1) {
              tds[j].style.color = '#ff2200';
            } else {
              tds[j].style.color = '#000000';
            }
          }
        }
      },

      submit: function() {
        if (typeof kepschange === 'function') {
          kepschange(document.getElementById('keps-add').value, document.getElementById('keps-del').value);
        }
        this.closeOverlay();
      },

      sendNewKeps: function() {
        if (typeof kepsupdate === 'function') {
          kepsupdate(document.getElementById('keps-kepsnew').value);
        }
        this.closeOverlay();
      },

      saveThis: function() {
        this.collect();
        satactivity = satactivity + 'This/';
        if (typeof kepschange === 'function') {
          kepschange(document.getElementById('keps-add').value, document.getElementById('keps-del').value);
        }
        if (typeof saveMapState === 'function') {
          saveMapState('yes');
        }
        this.closeOverlay();
      },

      saveOriginal: function() {
        window.defaults = '';
        satactivity = satactivity + 'Orig/';
        if (typeof selsatsave !== 'undefined') {
          window.selsat = selsatsave.slice();
        }
        if (typeof loadTLE === 'function') {
          loadTLE();
        }
        if (typeof kepschange === 'function') {
          kepschange('', '');
        }
        this.closeOverlay();
      }
    };
  }

  // Auto-close after 2 minutes
  // setTimeout(() => {
  //   window.kepsOverlayFunctions.closeOverlay();
  // }, 120000);

  // Close overlay when clicking outside the content area
  document.getElementById('keps-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
      window.kepsOverlayFunctions.closeOverlay();
    }
  });

  // Close overlay with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      window.kepsOverlayFunctions.closeOverlay();
    }
  });
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

async function load() {

  alljs = await loadAlljson();

  1 == aumento && document.getElementById("sz")
    ? (document.getElementById("sz").innerHTML = "&#9651;")
    : (document.getElementById("sz").innerHTML = "&#9661;"),
    (document.body.style.zoom = 100 * aumento + "%"),
    navigator.userAgent.indexOf("Firefox") > 0 &&
      ((document.body.style.MozTransform = "scale(" + aumento + ")"),
      (document.body.style.MozTransformOrigin = "0 0")),

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
      ? ((bip = !0), (document.getElementById('spk').src = imageSrcUrl['speakeron']))
      : ((bip = !1), (document.getElementById('spk').src = imageSrcUrl['speakeroff'])),
    birdsw
      ? (document.getElementById("bimg").src = imageSrcUrl['birdon'])
      : (document.getElementById("bimg").src = imageSrcUrl['birdoff']),
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

  document.querySelector('#spinner-overlay').style.display = 'none';
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
                `url(${imageSrcUrl['box']})`),
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
// (xmlHttp.onreadystatechange = function () {
//   4 == xmlHttp.readyState &&
//     setTimeout(function () {
//       nasabare = xmlHttp.responseText;
//     }, 1e3);
// }),
  //xmlHttp.open("GET", "chat/luser.php"),
  //xmlHttp.send(null),
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

async function jBeep(a) {
  if (!a) a = "Beep.wav"; 
  //"jBeep/jBeep.wav";
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
  
  var srcAudio = audioSrcUrl[`${a.slice(0, -4)}`];

  if (d) {

    b = document.createElement("audio");
    b.setAttribute("id", "jBeep");
    b.setAttribute("src", srcAudio);
    b.setAttribute("autoplay", "true");

    document.body.appendChild(b);

    await b.play().catch(err => {
          console.error("Playback failed:", err);
      });

  } else if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
    b = document.createElement("bgsound");
    b.setAttribute("id", "jBeep");
    b.setAttribute("loop", 1);
    b.setAttribute("src", srcAudio);
    c.appendChild(b);
  } else {
    var f;
    b = document.createElement("object");
    b.setAttribute("id", "jBeep");
    b.setAttribute("type", "audio/wav");
    b.setAttribute("style", "display:none;");
    b.setAttribute("data", srcAudio);
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
