// 获取原始响应体
var body = $response.body;  

// 将响应体解析为JSON对象
var obj = JSON.parse(body);  

// 修改VIP信息的数据
obj.vipList = [{
    "expireDate": "20290609",  // 过期日期
    "isAutoDeduct": "0",
    "isVip": "1",
    "isYear": "1",  // 是否包年VIP
    "payId": "0",
    "payName": "---",
    "register": "0",
    "vasid": "2",
    "vasType": "5",
    "vipDayGrow": "20",
    "vipGrow": "840",
    "vipLevel": "7"
}];

// 将修改后的JSON对象重新序列化为字符串
body = JSON.stringify(obj);  

// 使用修改后的响应体更新原始响应体并结束当前请求
$done({body});