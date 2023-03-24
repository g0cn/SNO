// 加速微信公众号和删除广告
// 作者: OpenFibers

var body = $response.body;

// 去微信公众号广告
body = body.replace(/var appmsgstat = [\s\S]*?}\n\s*?sett/g, 'var appmsgstat = {advertisement_num: 0}\n\t\tsett');
body = body.replace(/msgList = [\s\S]*?<AppmsgList>/g, 'msgList = {"list":[]}<AppmsgList>');

// 去微信朋友圈广告
body = body.replace(/s.ad\_click\(/g, 'not_ads_ad_click(');

// 加速微信公众号
var new_pm = $request.headers['User-Agent'].replace(/MicroMessenger\/\d+\.\d+\.\d+/ig, 'MicroMessenger/7.0.17');
$done({headers : {"User-Agent" : new_pm}, body: body});

function not_ads_ad_click() {
    console.log("Not an ad, skip...");
}