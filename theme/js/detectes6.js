(function () {
    if (!String.prototype.startsWith) {
        var getText = function (url) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            xhr.send();
            return xhr.responseText;
        }
        var i,
        tmp;
        switch (localStorage['lang']) {
        case 'zh_CN':
            tmp = 'zh_CN';
            break;
        case 'en_US':
            tmp = 'en_US';
            break;
        default:
            tmp = navigator.language.substring(0, 2) == 'zh' ? 'zh_CN' : 'en_US';
            break;
        }
        var lang = JSON.parse(getText('/theme/lang/' + tmp + '.json'));
        tmp = getText('/theme/unsupported.html');
        tmp = tmp.substring(tmp.indexOf('<head>'), tmp.lastIndexOf('</body>'));
        var tmp2 = document.querySelectorAll('script');
        for (i = 0; i < tmp2.length; i++)
            tmp2[i].parentElement.removeChild(tmp2[i]);
        $.ajaxSettings.async = true;
        var title = document.querySelector('#title').content;
        document.title = title;
        tmp2 = tmp.match(/\$\{.*?\}/g);
        for (i = 0; i < tmp2.length; i++)
            tmp = tmp.replace(tmp2[i], eval(tmp2[i].substring(2, tmp2[i].length - 1)));
        document.querySelector('html').innerHTML = tmp;
        setTimeout(function () {
            (window.dialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'))).open();
        }, 500);
        window.changeUrl = function (url) {
            location.href = url
        }
    }
})();
