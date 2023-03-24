javascript
// 去除广告和前置视频
var body = $response.body;
var obj = JSON.parse(body);
obj["data"]["poi_video_list"] = [];
obj["data"]["spread_video_list"] = [];
body = JSON.stringify(obj);
$done({body});

// 加载优化（启用 Gzip 压缩和 HTTP/2 请求，禁用 cookie）
var headers = $request.headers;
headers["Accept-Encoding"] = "gzip";
headers["Connection"] = "Upgrade, HTTP2-Settings";
headers["Cookie"] = "";
$done({headers});