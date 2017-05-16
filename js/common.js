var isMobile = false;
var isPad = false;
var isPc = false;

if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)) {
        // Mobile
        if (navigator.userAgent.match(/Mobile/i)) {isMobile = true;}
        else {isPad = true;}
}
else if(navigator.userAgent.match(/iPad/i)){isPad = true;}
else {isPc = true;}

if (isPc || isPad) {
    $('.orientation_landscape').css('visibility','visible')
}