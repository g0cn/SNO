/*
 在微信中打开淘宝等被屏蔽链接，点击 Surge/QuantumultX 通知跳转到 Safari 或淘宝 App
*/

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