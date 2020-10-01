(
    /**
     * 开始加载模板
     */
    () => {
    document.title = 'Loading...';
    var html = document.querySelector('html');
    window.loadProgressBar = document.createElement('div');
    loadProgressBar.className = 'mdc-linear-progress mdc-linear-progress--indeterminate';
    loadProgressBar.role = 'progressbar';
    loadProgressBar.style.background = '#fff';
    loadProgressBar.innerHTML = `<div class="mdc-linear-progress__buffering-dots"></div><div class="mdc-linear-progress__buffer"></div><div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar"><span class="mdc-linear-progress__bar-inner"></span></div><div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar"><span class="mdc-linear-progress__bar-inner"></span></div>`;
    html.appendChild(loadProgressBar);
    var bodyStyle = document.createElement('style');
    bodyStyle.innerHTML = 'body{visiblity:collapse;opacity:0;overflow:none;}';
    document.head.appendChild(bodyStyle);
    addEventListener('load', () => {
        html.removeChild(loadProgressBar);
        document.title = title;
        document.body.style.opacity = "0";
        bodyStyle.remove();
        setTimeout(() => {
            document.body.style.transition = "all 300ms";
            document.body.style.opacity = null;
            setTimeout(() => document.body.style.transition = null, 500);
        });
    });
})();
