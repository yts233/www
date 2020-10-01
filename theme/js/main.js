//#region init
/**
 * 导入脚本
 * @argument
 */
const importScripts = function () {
    var aaaa = (url) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);
        return xhr.responseText;
    }
    for (var i = 0; i < arguments.length; i++)
        try {
            eval(aaaa(arguments[i]));
        } catch (ex) {
            window.lastex = ex;
        }
    return true;
};
importScripts('/theme/js/material.js', '/theme/js/template.js', '/theme/js/jquery.js');
//#endregion
/* 网站主脚本 */
//#region 一些变量
//#region 模板元素
/**
 * 顶端条
 * @type {MDCTopAppBar}
 */
var topAppBar;
/**
 * 侧边栏
 * @type {MDCDrawer}
 */
var sideDrawer;
/**
 * 侧边栏列表
 * @type {MDCList}
 */
var sideDrawerList;
/**
 * 主内容元素
 * @type {HTMLElement}
 */
var mainContentEl;
/**
 * 顶部栏搜索按钮
 * @type {MDCRipple}
 */
var topAppBarSearchButton;
/**
 * 顶部更多按钮
 * @type {MDCRipple}
 */
var topAppBarMoreButton;
/**
 * 顶部更多按钮菜单
 * @type {MDCMenu}
 */
var topAppBarMoreMenu;
/**
 * 信息框
 * @type {MDCMenu}
 */
var alertDialog;
/**
 * 评论对话框
 * @type {MDCDialog}
 */
var commentDialog;
/**
 * 搜索区
 * @type {MDCTextField}
 */
var searchTextField;
/**
 * 搜索区form
 * @type {HTMLFormElement}
 */
var searchForm;
//#endregion
/**
 * 语言翻译
 * @type {*}
 */
var lang;
/**
 * 文章Id
 * @type {number}
 */
var archiveId;
/**
 * 文章标题
 * @type {string}
 */
var title;
/**
 * 点赞次数
 * @type {number}
 */
var likeCount;
/**
 * 初始化页面
 * @type {void}
 */
var init;
/**
 * 反向初始化页面
 * @type {void}
 */
var destory;
/**
 * 点赞按钮
 * @type {HTMLLIElement}
 */
var likeButton;
//#endregion
//#region 一些公开方法
/**
 * 获取查询字符串
 * @param {string} variable 字符串名
 * @returns {string} 查询字符串对应的值
 */
const getQueryVariable = variable => {
    var query = location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return decodeURI(pair[1]);
        }
    }
    return null;
}
/**
 * 显示消息框
 * @param {string} content 内容
 * @param {string} title 标题
 */
const alert = (content, title) => {
    document.querySelector('#alert-dialog-content').innerText = content;
    document.querySelector('#alert-dialog-title').innerText = title;
    document.querySelector('#alert-dialog-title').style.display = title ? null : 'none';
    document.querySelector('#alert-dialog-title').className = title ? 'mdc-dialog__title' : null;
    alertDialog.open();
}
/**
 * 打开评论区
 * @returns {void}
 */
const openComment = () => commentDialog.open();
/**
 * 跳转到Url
 * @param {string} url 要跳转的url
 * @param {boolean} dontpush 不推送历史记录（替换地址栏）
 */
const changeUrl = (url, dontpush) => {
    if (!localStorage['dyamicLoad'])
        localStorage['dyamicLoad'] = 'true';
    console.log('forward to ' + url);
    if (!url.startsWith('http') && !url.startsWith('/') && !url.startsWith('#')) {
        location.href = url;
        return;
    }
    if (localStorage['dyamicLoad'] == "false") {
        location.href = url;
        return;
    }
    if (url.startsWith(location.origin + location.pathname + '#') || url.startsWith(location.pathname + '#') || url.startsWith('#') || !url.startsWith(location.origin)) {
        location.href = url;
    } else {
        if (loadProgressBar)
            topAppBar.root_.appendChild(loadProgressBar);
        fetchTextSync(url, data => {
            try {
                try {
                    if (destory)
                        destory();
                } catch (e) {
                    console.log(e);
                }
                init = undefined;
                destory = undefined;
                if (!dontpush)
                    history.pushState(null, null, url);
                var tmp = data.match(/<meta id="doctitle" content=".*?">/s)[0];
                document.title = eval('`' + tmp.substring(29, tmp.length - 2) + '`');
                tmp = data.match(/<meta id="title" content=".*?">/s)[0];
                document.querySelector('#title').content = document.querySelector('.mdc-top-app-bar__title').innerHTML = eval('`' + tmp.substring(26, tmp.length - 2) + '`');
                tmp = data.match(/<meta id="aid" content=".*?">/s)[0];
                document.querySelector('#aid').content = archiveId = parseInt(eval('`' + tmp.substring(24, tmp.length - 2) + '`'));
                tmp = data.match(/<body>.*<\/body>/s)[0];
                var content = tmp.substring(6, tmp.length - 7);
                var tmp = content.match(/\$\{.*?\}/g);
                if (tmp)
                    for (var i = 0; i < tmp.length; i++)
                        try {
                            content = content.replace(tmp[i], eval('`' + tmp[i] + '`'));
                        } catch (e) {}
                mainContentEl.firstElementChild.innerHTML = content;
                topAppBar.root_.removeChild(loadProgressBar);
                if (a.substring(a.lastIndexOf('/')).indexOf('#') != -1)
                    location.href = a.substring(a.lastIndexOf('#'));
                try {
                    if (init)
                        init();
                    else {
                        tmp = content.match(/window\.init *= *\( *\) *=> *\{.*?\}[\n ]*<\/script>/s);
                        if (tmp)
                            eval(tmp[0].substring(0, tmp[0].length - 9));
                        if (init)
                            init();
                    }
                } catch (e) {
                    console.log(e);
                }
                while (document.querySelector('script')) {
                    var script = document.querySelector('script');
                    script.remove();
                }
                try {
                    mainContentEl.querySelector('input, button').focus();
                } catch (e) {}
                processMessage();
            } catch (e) {
                location.href = url;
            }
        }).fail(() => {
            location.href = url;
        });
    }
}
/**
 * 设置侧边栏状态
 * @param {boolean} visible 是否显示
 */
const sideDrawerState = visible => sideDrawer.open = visible;
/**
 * 获取元素顶端
 * @param {HTMLElement} element 元素
 * @param {number} last 向下偏移
 */
const getElementTop = (element, last) => element ? last ? element.offsetTop + last : element.offsetTop : last;
/**
 * 指定元素是否在内容内
 * @param {HTMLElement} element 元素
 * @returns {boolean}
 */
const isInContent = element => element ? element.className == 'mdc-touch-target-wrapper mdc-card content' ? true : isInContent(element.parentElement) : false;
/**
 * 滚动到元素
 * @param {HTMLElement} element 元素
 */
const scrollToElement = element => window.scrollTo({
    top: getElementTop(element),
    behavior: "smooth"
});
/**
 * 处理信息
 */
const processMessage = () => {
    if (getQueryVariable('message') && !getQueryVariable('messageShown'))
        setTimeout(() => {
            alert(getQueryVariable('message'), getQueryVariable('messageTitle'));
            history.replaceState(null, null, window.location.href.replace(/message(Title)*?=.*?(&|$)/g, ''));
        }, 100);
}
/**
 * fetch文本
 * @param {string} url 要fetch的路径
 * @returns {Promise<string>} fetch到的文本
 */
const fetchText = async(url) => await(await fetch(url.startsWith('/') ? localStorage['source'] + (url.endsWith('/') ? url + 'index.html' : (url.lastIndexOf('/') < url.lastIndexOf('.') ? url : url + '.html')) : url)).text();
/**
 * 同步fetch文本
 * @param {string} url 要fetch的路径
 * @param {Function} callback 回调函数
 * @returns {string} fetch到的文本
 */
const fetchTextSync = (url, callback = undefined) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url.startsWith('/') ? localStorage['source'] + (url.endsWith('/') ? url + 'index.html' : (url.lastIndexOf('/') < url.lastIndexOf('.') ? url : url + '.html')) : url, false);
    xhr.send(null);
    if (typeof callback != 'undefined ' && callback)
        callback.call(xhr.responseText);
    return xhr.responseText;
}
/**
 * fetch JSON
 * @param {string} url 要fetch的路径
 * @returns {Promise<Object>} fetch到的Object对象
 */
const fetchJSON = async(url) => await(await fetch(url.startsWith('/') ? localStorage['source'] + (url.endsWith('/') ? url + 'index.html' : (url.lastIndexOf('/') < url.lastIndexOf('.') ? url : url + '.html')) : url)).json();
/**
 * 同步fetch JSON
 * @param {string} url 要fetch的路径
 * @param {Function} callback 回调函数
 * @returns {Object} fetch到的Object对象
 */
const fetchJSONSync = (url, callback = undefined) => {
    var tmp = JSON.parse(fetchTextSync(url));
    if (typeof callback != 'undefined ' && callback)
        callback.call(tmp);
    return tmp;
}
//#endregion
//#region 一些初始化
(
    /**
     * 检测刷新
     */
    () => {
    var inter = setInterval(() => {
        if (localStorage['refresh']) {
            document.title = lang.refresh;
            setTimeout(location.reload(), 1000);
            clearInterval(inter);
        }
    }, 500);
    if (localStorage['refresh'])
        localStorage.removeItem('refresh');
})();
(
    /**
     * 处理网站来源
     */
    () => {
    if (localStorage['source'] == undefined)
        localStorage['source'] = '';
    if (!(localStorage['source'] == '' || localStorage['source'] == 'https://raw.githubusercontent.com/yts233/www/master/' || localStorage['source'] == 'https://yts233.visualstudio.com/www/_apis/git/repositories/350654b2-9ea3-49a1-b776-983b16ee25cb/items?path=' || localStorage['source'] == 'https://dev.azure.com/yts233/www/_apis/git/repositories/350654b2-9ea3-49a1-b776-983b16ee25cb/items?path=')) {
        localStorage['source'] = '';
        location.href = location.href.indexOf('?') == -1 ? location.href + '?messageTitle=Warning&message=Don\'t change source by yourself.' : location.href + '&messageTitle=Warning&message=Don\'t change source by yourself.';
    }
})();
(
    /**
     * 处理语言
     */
    () => {
    var tmp;
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
    lang = JSON.parse(fetchTextSync("/theme/lang/" + tmp + '.json'));
})();
(
    /**
     * 页面信息
     */
    () => {
    archiveId = parseInt(document.querySelector('#aid').content);
    title = eval('`' + document.querySelector('#doctitle').content.replace(/`/g, '\\`') + '`');
    try {
        if (archiveId >= 0)
            likeCount = -1; //$.getJSON('https://api.yts233.tk/api/GetLikeCount?aid=' + archiveId).responseJSON.count;
        else
            likeCount = 0;
    } catch (e) {
        likeCount = NaN;
    }
})();
(
    /**
     * 页面加载后执行
     */
    () => addEventListener("load", () => {
        //#region  变量赋值
        topAppBar = new mdc.topAppBar.MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
        sideDrawer = new mdc.drawer.MDCDrawer(document.querySelector('aside.mdc-drawer'));
        sideDrawerList = new mdc.list.MDCList(document.querySelector('aside.mdc-drawer .mdc-list'));
        mainContentEl = document.querySelector('#main-content');
        topAppBarSearchButton = new mdc.ripple.MDCRipple(document.querySelector(".top-bar-button--search"));
        topAppBarMoreButton = new mdc.ripple.MDCRipple(document.querySelector(".top-bar-button--more"));
        topAppBarMoreMenu = new mdc.menu.MDCMenu(document.querySelector('.mdc-menu,mdc-menu-surface'));
        alertDialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog,.alert-dialog'));
        commentDialog = new mdc.dialog.MDCDialog(document.querySelector('.comment-dialog'));
        searchTextField = new mdc.textField.MDCTextField(document.querySelector('.search-text-field'));
        searchForm = document.querySelector('.search-form');
        likeButton = topAppBarMoreMenu.items[0];
        //#endregion
        (
            /**
             * 顶部和侧边导航
             */
            () => {
            topAppBar.setScrollTarget(window);
            topAppBar.listen('MDCTopAppBar:nav', () => {
                sideDrawer.open = !sideDrawer.open;
            });
            sideDrawerList.wrapFocus = true;
            document.body.addEventListener('MDCDrawer:closed', () => {
                try {
                    mainContentEl.querySelector('input, button').focus();
                } catch (e) {}
            });
            topAppBarMoreButton.listen('click', () => {
                topAppBarMoreMenu.open = true;
            });
        })();

        (
            /**
             * 点赞按钮
             */
            () => {
            if (localStorage['like' + archiveId] || archiveId < 0)
                likeButton.classList.add('mdc-list-item--disabled');
            likeButton.addEventListener('click', () => {
                localStorage['like' + archiveId] = '1';
                likeButton.classList.add('mdc-list-item--disabled');
                $.post('https://api.yts233.tk/api/LikeArchive?aid=' + archiveId);
            });
        })();
        (
            /**
             * 搜索功能
             */
            () => {
            searchTextField.input_.addEventListener('blur', () => searchForm.className = "search-form");
            searchTextField.input_.addEventListener('focus', () => searchForm.className = "search-form search-form--show");
            topAppBarSearchButton.listen('click', () => searchTextField.focus());
            searchTextField.listen('submit', () => {
                changeUrl('/search?q=' + encodeURI(searchTextField.input_.value));
                searchTextField.input_.value = '';
                searchTextField.input_.blur();
                return false;
            });
        })();
        (
            /**
             * 禁止选择内容以外的文本
             */
            () => document.body.addEventListener('selectstart', e => e.returnValue = isInContent(e.target)))();
        (
            /**
             * 动态跳转页面
             */
            () => document.body.addEventListener('click', e => {
                var a = e.target;
                if (a.localName == 'a') {
                    if (a.href != "" && !a.href.startsWith('javascript:'))
                        try {
                            var b = a.href.substring(a.href.indexOf('#'))
                                if (b == '#')
                                    scrollTo({
                                        top: 0,
                                        behavior: "smooth"
                                    });
                                else
                                    scrollToElement(document.querySelector(b));
                        } catch (e) {
                            if ((!a.target || a.target == '_self') && a.href) {
                                changeUrl(a.href);
                                var tmp = a.href;
                                a.href = "javascript:;";
                                removeEventListener('popstate', onpopstate);
                                a.onmouseup = a.onmouseleave = () => {
                                    a.href = tmp;
                                    addEventListener('popstate', onpopstate);
                                    a.onmouseup = a.onmouseleave = null;
                                }
                            }
                        }
                }
                e.returnValue = false;
            }))();
        function onpopstate(e) {
            changeUrl(e.target.window.location.href, true);
            e.returnValue = false;
        }
        addEventListener('popstate', onpopstate);
        processMessage();
    }))();
//#endregion
