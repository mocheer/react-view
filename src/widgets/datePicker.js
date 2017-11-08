
/*
 * My97 DatePicker 4.8
 * License: http://www.my97.net/license.asp
 */
let $dp,
    l = {
        $langList: [ // 语言包配置
            { name: "zh-cn", charset: "gb2312" },
        ],
        $skinList: [ // 皮肤包配置
            { name: "default", charset: "gb2312" },
            { name: "blue", charset: "gb2312" },
            { name: "whyGreen", charset: "gb2312" }
        ],
        $wdate: true,//是否自动引入Wdate类 设置为true时,可直接在引入WdatePicker.js的页面里使用 class="Wdate" Wdate可在skin目录下的WdatePicker.css文件中定义
        $crossFrame: false, //跨iframe
        $preLoad: false,    //没有任何用处，因为这里不直接嵌入
        $dpPath: (window.T || 'tree') + "/plugins/My97DatePicker/",//指定程序包的绝对位置
        doubleCalendar: false, //是否是双月模式
        enableKeyboard: true,  //键盘控制开关
        enableInputMask: true, //文本框输入启用掩码开关
        autoUpdateOnChanged: null, //在修改年月日时分秒等元素时,自动更新到el,默认是关闭的(即:需要点击确定或点击日期才更新)
        weekMethod: "MSExcel", //
        position: {},   //日期选择框显示位置,注意:坐标单位是px,是相对当前框架坐标(不受滚动条影响),默认情况下系统根据页面大小自动选择
        lang: "auto",   //当值为'auto'时 自动根据客户端浏览器的语言自动选择语言,当值为其他时,从langList中选择对应的语言 
        skin: "default",//皮肤
        dateFmt: "yyyy-MM-dd",//格式化
        realDateFmt: "yyyy-MM-dd",//计算机可识别的,真正的日期格式
        realTimeFmt: "HH:mm:ss",  //计算机可识别的,真正的日期格式
        realFullFmt: "%Date %Time",//计算机可识别的,真正的日期格式
        minDate: "0001-01-01 00:00:00",
        maxDate: "9999-12-31 23:59:59",
        minTime: "00:00:00",
        maxTime: "23:59:59",
        startDate: "", //启动日期
        alwaysUseStartDate: false,//
        yearOffset: 1911,
        firstDayOfWeek: 0,
        isShowWeek: false, //是否显示周
        highLineWeekDay: true,//是否高亮显示 周六 周日
        isShowClear: true, //是否显示清空按钮
        isShowToday: true, //是否显示确定按钮
        isShowOK: true,    //是否显示今天按钮
        isShowOthers: true,//为true时,第一行空白处显示上月的日期，末行空白处显示下月的日期,否则不显示
        readOnly: false,   //只读
        errDealMode: 0,    //纠错模式设置 可设置3种模式 0 - 提示 1 - 自动纠错 2 - 标记 -1 禁用
        autoPickDate: true,//为true时 即点击日期即可返回日期值，为null时(推荐使用) 如果有时间置为false 否则置为true
        qsEnabled: true,   //是否启用快速选择功能,当日期格式中没有d这个元素时(如yyyy-MM或HH:mm:ss这样的格式时),该属性永远为true
        autoShowQS: false, //是否默认显示快速选择
        hmsMenuCfg: { H: [1, 6], m: [5, 6], s: [15, 4] },

        opposite: false,   //默认为false, 为true时,无效日期变成有效日期,该属性对无效天特殊天不起作用
        specialDates: null,
        specialDays: null,
        disabledDates: null,
        disabledDays: null,
        onpicking: null,
        onpicked: null,  //重新选择日期之后派发，可用于两个时间的联动
        onclearing: null,
        oncleared: null,
        ychanging: null,
        ychanged: null,
        Mchanging: null,
        Mchanged: null,
        dchanging: null,
        dchanged: null,
        Hchanging: null,
        Hchanged: null,
        mchanging: null,
        mchanged: null,
        schanging: null,
        schanged: null,
        eCont: null,    //日历控件挂载的dom
        vel: null,      //指定一个控件或控件的ID,必须具有value属性(如input),用于存储真实值
        elProp: "",
        errMsg: "",
        quickSel: [],   //快速选择数据,可以传入5个快速选择日期 注意:日期格式必须与 realDateFmt realTimeFmt realFullFmt 相匹配
        has: {},
        getRealLang: function () {
            var d = l.$langList;
            for (var e = 0;
                e < d.length;
                e++) { if (d[e].name == this.lang) { return d[e] } } return d[0]
        }
    };

var n = window,
    i = { innerHTML: "" },
    z = "document",
    B = "documentElement",
    H = "getElementsByTagName",
    E,//crossFrame=true时
    u,
    h,
    f,
    D,
    v = navigator.appName;

if (v == "Microsoft Internet Explorer") {
    h = true
}
else {
    if (v == "Opera") {
        D = true
    }
    else {
        f = true
    }
}
u = l.$dpPath;

if (l.$wdate) {
    window.require(['css!plugins/My97DatePicker/skin/WdatePicker'])
}

E = n;
// 跨无限iframe
if (l.$crossFrame) {
    try {
        while (E.parent != E && E.parent[z][H]("frameset").length == 0) { E = E.parent }
    }
    catch (y) { }
}
// 浏览器信息
if (!E.$dp) {
    E.$dp = {
        ff: f,
        ie: h,
        opera: D,
        status: 0,
        defMinDate: l.minDate,
        defMaxDate: l.maxDate
    }
}
b();

if (l.$preLoad && $dp.status == 0) {
    k(n, "onload", function () { g(null, true) })
}
if (!n[z].docMD) {//window.document.docMD
    k(n[z], "onmousedown", s, true);

    n[z].docMD = true
}
if (!E[z].docMD) {
    k(E[z], "onmousedown", s, true);

    E[z].docMD = true
}
k(n, "onunload", function () {
    if ($dp.dd) {
        r($dp.dd, "none")
    }
});


function b() {
    try {
        E[z], E.$dp = E.$dp || {}
    }
    catch (I) {
        E = n;
        $dp = $dp || {}
    }
    var w = {
        win: n,
        $: function (e) {
            return (typeof e == "string") ? n[z].getElementById(e) : e
        },
        $D: function (J, e) {
            return this.$DV(this.$(J).value, e)
        },
        $DV: function (J, e) {
            if (J != "") {
                this.dt = $dp.cal.splitDate(J, $dp.cal.dateFmt);

                if (e) {
                    for (var L in e) {
                        if (this.dt[L] === undefined) {
                            this.errMsg = "invalid property:" + L
                        } else {
                            this.dt[L] += e[L];
                            if (L == "M") {
                                var M = e.M > 0 ? 1 : 0;

                                var K = new Date(this.dt.y, this.dt.M, 0).getDate();

                                this.dt.d = Math.min(K + M, this.dt.d)
                            }
                        }
                    }
                }
                if (this.dt.refresh()) {
                    return this.dt
                }
            }
            return ""
        },
        show: function () {
            var K = E[z].getElementsByTagName("div"), J = 100000;

            for (var e = 0;
                e < K.length;
                e++) {
                var L = parseInt(K[e].style.zIndex);

                if (L > J) { J = L }
            }
            this.dd.style.zIndex = J + 2;

            r(this.dd, "block");

            r(this.dd.firstChild, "")
        },
        unbind: function (e) {
            e = this.$(e);
            if
							 (e.initcfg) {
                t(e, "onclick", function () { g(e.initcfg) });

                t(e, "onfocus", function () { g(e.initcfg) })
            }
        },
        hide: function () { r(this.dd, "none") },
        attachEvent: k
    };
    for (var d in w) { E.$dp[d] = w[d] } $dp = E.$dp
}
function k(I, J, w, d) {
    if (I.addEventListener) {
        var e = J.replace(/on/, "");

        w._ieEmuEventHandler = function (K) { return w(K) };
        I.addEventListener(e, w._ieEmuEventHandler, d)
    } else { I.attachEvent(J, w) }
}
function t(w, I, e) {
    if (w.removeEventListener) {
        var d = I.replace(/on/, "");

        e._ieEmuEventHandler = function (J) {
            return e(J)
        };

        w.removeEventListener(d, e._ieEmuEventHandler, false)
    } else { w.detachEvent(I, e) }
} function C(w, e, d) {
    if (typeof w != typeof e) {
        return false
    }
    if (typeof w == "object") {
        if (!d) {
            for (var I in w) {
                if (typeof e[I] == "undefined") {
                    return false
                }
                if (!C(w[I], e[I], true)) {
                    return false
                }
            }
        }
        return true
    } else {
        if (typeof w == "function" && typeof e == "function") {
            return w.toString() == e.toString()
        } else {
            return w == e
        }
    }
}

function p(I) {
    I = I || E;
    var L = 0, d = 0;
    while (I != E) {
        var N = I.parent[z][H]("iframe");
        for (var J = 0;
            J < N.length;
            J++) {
            try {
                if (N[J].contentWindow == I) {
                    var K = o(N[J]);
                    L += K.left;
                    d += K.top;
                    break
                }
            } catch (M) { }
        } I = I.parent
    } return { leftM: L, topM: d }
}
function o(I, w) {
    if (I.getBoundingClientRect) { return I.getBoundingClientRect() } else {
        var J = { ROOT_TAG: /^body|html$/i, OP_SCROLL: /^(?:inline|table-row)$/i };
        var e = false, M = null, P = I.offsetTop, K = I.offsetLeft, d = I.offsetWidth, O = I.offsetHeight;
        var L = I.offsetParent;
        if (L != I) {
            while (L) {
                K += L.offsetLeft;
                P += L.offsetTop;
                if (c(L, "position").toLowerCase() == "fixed") {
                    e = true
                } else {
                    if (L.tagName.toLowerCase() == "body") {
                        M = L.ownerDocument.defaultView
                    }
                } L = L.offsetParent
            }
        } L = I.parentNode;
        while (L.tagName && !J.ROOT_TAG.test(L.tagName)) {
            if (L.scrollTop || L.scrollLeft) {
                if (!J.OP_SCROLL.test(r(L))) {
                    if (!D || L.style.overflow !== "visible") {
                        K -= L.scrollLeft;
                        P -= L.scrollTop
                    }
                }
            } L = L.parentNode
        } if (!e) {
            var N = F(M);
            K -= N.left;
            P -= N.top
        } d += K;
        O += P;
        return { left: K, top: P, right: d, bottom: O }
    }
}
function x(e) {
    e = e || E;
    var J = e[z],
        I = (e.innerWidth) ? e.innerWidth : (J[B] && J[B].clientWidth) ? J[B].clientWidth : J.body.offsetWidth, d = (e.innerHeight) ? e.innerHeight : (J[B] && J[B].clientHeight) ? J[B].clientHeight : J.body.offsetHeight;
    return { width: I, height: d }
}
function F(e) {
    e = e || E;
    var J = e[z], d = J[B], I = J.body;
    J = (d && d.scrollTop != null && (d.scrollTop > I.scrollTop || d.scrollLeft > I.scrollLeft)) ? d : I;
    return { top: J.scrollTop, left: J.scrollLeft }
}
function s(d) {
    try {
        var w = d ? (d.srcElement || d.target) : null;

        if ($dp.cal && !$dp.eCont && $dp.dd && w != $dp.el && $dp.dd.style.display == "block") {
            $dp.cal.close()
        }
    } catch (d) { }
}
function A() {
    $dp.status = 2
}
var G, j;

function g(M, d) {
    if (!$dp) {
        return
    }
    b();

    var J = {};

    for (var L in M) {
        J[L] = M[L]
    }
    for (var L in l) {
        if (L.substring(0, 1) != "$" && J[L] === undefined) { J[L] = l[L] }
    } if (d) {
        if (!w()) {
            j = j || setInterval(function () { if (E[z].readyState == "complete") { clearInterval(j) } g(null, true) }, 50);
            return
        }
        if ($dp.status == 0) {
            $dp.status = 1;
            J.el = i;
            a(J, true)
        } else {
            return
        }
    } else {
        if (J.eCont) {
            J.eCont = $dp.$(J.eCont);
            J.el = i;
            J.autoPickDate = true;
            J.qsEnabled = false;
            a(J)
        } else {
            if (l.$preLoad && $dp.status != 2) { return } var I = N();
            if (n.event === I || I) {
                J.srcEl = I.srcElement || I.target;
                I.cancelBubble = true
            } J.el = J.el = $dp.$(J.el || J.srcEl);
            if (J.el == null) {
                alert("WdatePicker:el is null!\nexample:onclick=\"WdatePicker({el:this})\"");
                return;
            } try {
                if (!J.el || J.el.My97Mark === true || J.el.disabled || ($dp.dd && r($dp.dd) != "none" && $dp.dd.style.left != "-970px")) {
                    if (J.el.My97Mark) { J.el.My97Mark = false }
                    return
                }
            } catch (K) {

            }
            if (I && J.el.nodeType == 1 && !C(J.el.initcfg, M)) {
                $dp.unbind(J.el);
                k(J.el, I.type == "focus" ? "onclick" : "onfocus",
                    function () { g(M) });
                J.el.initcfg = M
            } a(J)
        }
    }
    function w() {
        if (h && E != n && E[z].readyState != "complete") { return false } return true
    }
    function N() {
        if (f) {
            try {
                func = N.caller;

                while (func != null) {
                    var O = func.arguments[0];
                    if (O && (O + "").indexOf("Event") >= 0) { return O } func = func.caller
                }
            } catch (P) {

            }
            return null
        } return event
    }
}
function c(e, d) {
    return e.currentStyle ? e.currentStyle[d] : document.defaultView.getComputedStyle(e, false)[d]
}
function r(e, d) {
    if (e) { if (d != null) { e.style.display = d } else { return c(e, "display") } }
}
function a(e, d) {
    var K = e.el ? e.el.nodeName : "INPUT";
    if (d || e.eCont || new RegExp(/input|textarea|div|span|p|a/ig).test(K)) {
        e.elProp = K == "INPUT" ? "value" : "innerHTML"
    } else {
        return
    }
    // 语言
    if (e.lang == "auto") {
        e.lang = h ? navigator.browserLanguage.toLowerCase() : navigator.language.toLowerCase()
    }
    if (!e.eCont) {
        for (var J in e) { $dp[J] = e[J] }
    }
    if (!$dp.dd || e.eCont || ($dp.dd && (e.getRealLang().name != $dp.dd.lang || e.skin != $dp.dd.skin))) {
        if (e.eCont) { w(e.eCont, e) } else {
            $dp.dd = E[z].createElement("DIV");
            $dp.dd.style.cssText = "position:absolute";
            E[z].body.appendChild($dp.dd);
            w($dp.dd, e);
            if (d) { $dp.dd.style.left = $dp.dd.style.top = "-970px" } else {
                $dp.show();
                I($dp)
            }
        }
    } else {
        if ($dp.cal) {
            $dp.show();
            $dp.cal.init();
            if (!$dp.eCont) { I($dp) }
        }
    }
    function w(V, P) {
        var O = E[z].domain,
            S = false,
            M = '<iframe hideFocus=true width=9 height=7 frameborder=0 border=0 scrolling=no src="about:blank"></iframe>';

        V.innerHTML = M;
        var L = l.$langList, U = l.$skinList, T;

        try {
            T = V.lastChild.contentWindow[z]
        } catch (Q) {
            S = true;
            V.removeChild(V.lastChild);
            var N = E[z].createElement("iframe");
            N.hideFocus = true;
            N.frameBorder = 0;
            N.scrolling = "no";
            N.src = "javascript:(function(){var d=document;d.open();d.domain = '" + O + "';})()";
            V.appendChild(N);
            setTimeout(function () {
                T = V.lastChild.contentWindow[z];
                R()
            }, 97);
            return
        }
        R();

        function R() {
            var Y = P.getRealLang();
            V.lang = Y.name;
            V.skin = P.skin;
            // 头部标签信息
            var X = [
                "<head><script>",
                "",
                "var doc=document, $d, $dp, $cfg=doc.cfg, $pdp = parent.$dp, $dt, $tdt, $sdt, $lastInput, $IE=$pdp.ie, $FF = $pdp.ff,$OPERA=$pdp.opera, $ny, $cMark = false;",
                "if($cfg.eCont) {$dp = {};for (var p in $pdp) $dp[p] = $pdp[p];} else {$dp = $pdp;};for (var p in $cfg) {$dp[p] = $cfg[p];} ", "doc.oncontextmenu = function () {try {$c._fillQS(!$dp.has.d, 1);showB($d.qsDivSel);} catch (e) { };return false;};",
                " <\/script><script src=",
                u,
                "lang/",
                Y.name, ".js charset= ",
                Y.charset,
                " ><\/script>"
            ];
            if (S) {
                X[1] = 'document.domain="' + O + '";'
            }
            for (var W = 0; W < U.length; W++) {
                if (U[W].name == P.skin) {
                    X.push('<link rel="stylesheet" type="text/css" href="' + u + "skin/" + U[W].name + '/datepicker.css" charset="' + U[W].charset + '"/>')
                }
            }
            //加载calendar.js
            X.push('<script src="' + u + 'calendar.js"><\/script>');
            X.push('</head><body leftmargin="0" topmargin="0" tabindex=0></body></html>');
            X.push('<script>var t;t= t || setInterval(function () {if ((typeof (doc.ready) == "boolean" && doc.ready) || doc.readyState == "complete") {new My97DP();$cfg.onload();$c.autoSize();$cfg.setPos($dp);clearInterval(t);}}, 20);<\/script>');
            P.setPos = I;
            P.onload = A;
            T.write("<html>");
            T.cfg = P;

            T.write(X.join(""));
            T.close()
        }
    }
    function I(O) {
        var M = O.position.left, V = O.position.top, L = O.el;
        if (L == i) { return }
        if (L != O.srcEl && (r(L) == "none" || L.type == "hidden")) {
            L = O.srcEl
        } var T = o(L), P = p(n), U = x(E), Q = F(E), N = $dp.dd.offsetHeight, S = $dp.dd.offsetWidth;

        if (isNaN(V)) { V = 0 }
        if ((P.topM + T.bottom + N > U.height) && (P.topM + T.top - N > 0)) { V += Q.top + P.topM + T.top - N - 2 }
        else {
            V += Q.top + P.topM + T.bottom;
            var R = V - Q.top + N - U.height;

            if (R > 0) { V -= R }
        }
        if (isNaN(M)) {
            M = 0
        }
        M += Q.left + Math.min(P.leftM + T.left, U.width - S - 5) - (h ? 2 : 0);

        O.dd.style.top = V + "px";
        O.dd.style.left = M + "px"
    }
}

export default g