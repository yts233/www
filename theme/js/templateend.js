(
    /**
     * 结束加载模板
     */
    () => {
    var content = document.body.innerHTML;
    var template;
    template = fetchTextSync('/theme/template.html');
    content = eval('`' + template.substring(template.lastIndexOf('<body>') + 6, template.lastIndexOf('</body>')) + '`');
    var tmp2 = content.match(/\$\{.*?\}/g);
    if (tmp2)
        for (var i = 0; i < tmp2.length; i++)
            try {
                content = content.replace(tmp2[i], eval(' `' + tmp2[i] + '` '));
            } catch (e) {}
    document.body.innerHTML = content;
    if (window.init)
        init();
    var scripts = document.querySelectorAll('script');
    scripts.forEach(ele => ele.remove());
})();
