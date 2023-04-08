// ==UserScript==
// @name         dns查询
// @namespace    http://example.com/
// @version      1
// @description  DNS版本，适配中
// @match        http://*/*
// @match        https://*/*
// @match        *://m.v.qq.com/*
// @match        *://*.v.qq.com/*
// @match        *://*.ifeng.com/*
// @match        *://ifeng.com/*
// @match        *://bilibili.com/*
// @match        *://*.bilibili.com/*
// @grant        none
// ==/UserScript==
const hosts = {
  'm.v.qq.com': ['125.88.186.178', '125.88.186.177', '125.88.186.168'],
  'm.bilibili.com': ['59.36.228.21', '59.36.228.19'],
  '*.bilibili.com': ['59.36.228.21', '59.36.228.19'],
  'i.ifeng.com': ['152.136.248.215', '192.144.196.161'],
  'localhost': ['127.0.0.1'],
};

const dnsServers = [
  'https://dns.alidns.com/dns-query',
  'https://doh.pub/dns-query',
  'https://sm2.doh.pub/dns-query',
  'https://223.5.5.5/dns-query',
  '114.114.114.110',
];

for (const host in hosts) {
  const ips = [];
  for (const ip of hosts[host]) {
    for (const dnsServer of dnsServers) {
      const url = `${dnsServer}?name=${host}&type=a`;
      fetch(url, { headers: { accept: 'application/dns-json' }})
        .then(response => response.json())
        .then(data => {
          if (data.answer && data.answer.length > 0) {
            ips.push(data.answer[0].data);
          }
        })
        .catch(error => {
          console.error(`error while querying ${host} using ${dnsServer}: ${error}`);
        });
    }
  }
  setTimeout(() => {
    if (ips.length > 0) {
      console.log(`${host} 的 ip 地址是 ${ips.join(', ')}.`);
    } else {
      console.log(`${host} 没有找到匹配的 ip 地址。`);
    }
  }, 2000); // 增加延迟以等待异步查询完成
}



