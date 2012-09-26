// c 2012 bukucinta.com - author ali kusnadi http://bukucinta.com/alikusnadi - MIT license

var tabId;
var tabUrl;
document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.getSelected(null, function(tab) {
        tabId = tab.id;
        tabUrl = tab.url;
        var req = new XMLHttpRequest();
        req.open("GET", "http://bukucinta.com/post/url/?via=chrome&url=" + tabUrl);
        req.onload = function() {
           var json = req.responseText;                         // Response
           console.log(json);
           json = json.replace(/^[^(]*\(([\S\s]+)\);?$/, '$1'); // Turn JSONP in JSON
           json = JSON.parse(json);                             // Parse JSON
           console.log(json);
           var elem = document.getElementById('loading');
           elem.parentNode.removeChild(elem);
           var mong = document.getElementById('content');
           if (json.status == 'ok'){mong.innerHTML = json.html +'<p><a target="_blank" href="http://bukucinta.com'+json.link+'">Lihat Tulisan</a> - <a href="#" id="close">Tutup</a>'}

           else if(json.status == 'login'){
              mong.innerHTML = '<h2> Silahkan Login Terlebih dahulu</h2><p>Klik tautan dibawah ini </p> <p><a href="http://bukucinta.com/login/">Login</a> - <a href="#" id="close">Tutup</a>'
           }else{
              mong.innerHTML = '<h2> ERROR</h2><p><a href="#" id="close">Tutup</a>'
           }
           document.querySelector('a#close').addEventListener('click', function () {
               window.close();
             });
        };
        req.send(null);
    });
});


