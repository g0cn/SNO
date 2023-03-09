/*
微信 去除公众号文章底部广告

***************************
QuantumultX:

[rewrite_local]
^https?:\/\/mp\.weixin\.qq\.com\/mp\/getappmsgad url script-response-body https://raw.githubusercontent.com/g0cn/SNO/main/VI.Js

[mitm]
hostname = mp.weixin.qq.com

***************************
Surge4 or Loon:

[Script]
http-response ^https?:\/\/mp\.weixin\.qq\.com\/mp\/getappmsgad requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/g0cn/SNO/main/VI.Js

[MITM]
hostname = mp.weixin.qq.com

**************************/

const TAOPAO = "淘宝";
const LINK = "链接";
const OPEN = "点击打开";

const str = $response.body;
const openUrl = str.match(/:&#x2f;&#x2f;(\S*)"}/)[1].replace(/&#x2f;/g, '/').replace(/&amp;/g, '&').split("\"")[0];

const $ = new cmp();

if (openUrl.indexOf("m.tb.cn") !== -1) {
    $.notify(``, ``, `${OPEN}${TAOPAO}`, `taobao://${openUrl}`);
} else {
    $.notify(``, ``, `🔗${OPEN}${LINK}`, `https://${openUrl}`);
}

$done({ body: $response.body });

function cmp() {
    const isQuanX = typeof $task !== "undefined";
    const isLoon = typeof $loon !== "undefined";
    const isSurge = typeof $httpClient !== "undefined" && !isLoon;

    return {
        notify: (title, subtitle, message, url) => {
            if (isLoon) {
                $notification.post(title, subtitle, message, url);
            }

            if (isQuanX) {
                $notify(title, subtitle, message, { "open-url": url });
            }

            if (isSurge) {
                $notification.post(title, subtitle, message, { url });
            }
        }
    };
}
