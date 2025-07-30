if (window.location.host === "minnit.chat") {
    var lastErrorReported;
    var lastErrorReportedTimestamp;
    var totalErrorsReported = 0;
    var pageURL = window.location.href;
    window.onerror = function(msg, scriptURL, lineNumber, colNumber, errorObject) {
        var errorJSONString = stringifyError(errorObject, null, '\t');
        console.log(errorJSONString);
        if (!scriptURL) {scriptURL = pageURL;}
        var currentTime = Math.round(new Date().getTime() / 1000.0);
        if (lastErrorReported === msg) {
            return;
        }
        if ((lastErrorReportedTimestamp + 60) > currentTime) {
            return;
        }
        if (totalErrorsReported > 25) {
            if ((lastErrorReportedTimestamp + 3600) < currentTime) {
                totalErrorsReported = 0;
            } else {
                return;
            }
        }
        lastErrorReported = msg;
        lastErrorReportedTimestamp = currentTime;
        totalErrorsReported++;
        var userid = 0;
        var useridFromCookie = getCookieJS("minnitid");
        if (useridFromCookie) {
            userid = useridFromCookie;
        }
        var req = new XMLHttpRequest();
        var params = "errormsg=" + encodeURIComponent(msg) + "&pageurl=" + encodeURIComponent(pageURL) + "&scripturl=" + encodeURIComponent(scriptURL) + "&linenum=" + lineNumber + "&colnum=" + colNumber + "&fullerrorobj=" + errorJSONString;
        req.open("POST", "/logjserror");
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.send(params);
    }
}
function getCookieJS(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function stringifyError(err, filter, space) {
  var plainObject = {};
  Object.getOwnPropertyNames(err).forEach(function(key) {
    plainObject[key] = err[key];
  });
  return JSON.stringify(plainObject, filter, space);
};
