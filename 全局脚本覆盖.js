// 国内DNS服务器
const domesticNameservers = [
  //"https://dns.alidns.com/dns-query", // 阿里云公共DNS
  "https://doh.pub/dns-query", // 腾讯DNSPod
  "https://doh.360.cn/dns-query", // 360安全DNS
  "https://156.154.70.2/dns-query",//UltraDNS
  "https://156.154.71.2/dns-query"//UltraDNS
];
// 国外DNS服务器
const foreignNameservers = [
  "https://1.1.1.1/dns-query", // Cloudflare(主)
  "https://1.0.0.1/dns-query", // Cloudflare(备)
  "https://208.67.222.222/dns-query", // OpenDNS(主)
  "https://208.67.220.220/dns-query", // OpenDNS(备)
  "https://194.242.2.2/dns-query", // Mullvad(主)
  "https://194.242.2.3/dns-query", // Mullvad(备)
  "https://doh-lb-atl.dnsflex.com/dns-query",//DNSFlex-DOH
  "https://doh-lb-br.dnsflex.com/dns-query",//DNSFlex-DOH
  "https://doh-lb-ca-tor.dnsflex.com/dns-query"//DNSFlex-DOH
];

const profileConfig = {
  "store-selected": true,
  "store-fake-ip": true
};

const tunConfig = {
  enable : false,
  stack : "Mixed",
  "dns-hijack" :[
    "any:53",
    "tcp://any:53"
  ],
  "auto-route" : true,
  "auto-detect-interface" : true,
  mtu : 9000,
  "strict-route" : true,
};

//嗅探配置
const snifferConfig = {
  enable : true,
  "force-dns-mapping" : true,
  "parse-pure-ip" : true,
  "override-destination" : true,
  sniff : {
    TLS : {
      ports: [
        "443",
        "5228",
        "8443",
      ]
    },
    HTTP : {
      ports : [
        "80",
        "8080-8880"
      ],
      "override-destination" : true,
    },
    QUIC : {
      ports : [
        "443",
        "5228",
        "8443",
      ]
    }
  },
  "force-domain" : [
    "+.v2ex.com",
    // Github CDN 加速
    "+.ghproxy.com",
    "+.jsdelivr.net",
    // Google FCM 服务器
    "geosite:googlefcm",
    // Google DL 服务器
    "dl.google.com",
    "dl.l.google.com",
    // 微信信息及 FCM 相关
    "+.weixin.qq.com",
    // 向日葵
    "+.rc.sunlogin.net",
    // 其他常用
    "+.coolapk.com",
    "+.douban.com",
    "+.dianping.com",
    "+.meituan.com",
    "+.meituan.net",
    "+.xiaohongshu.com",
    "+.xhscdn.com",
  ],
  //对嗅探结果进行跳过
  "skip-domain" : [
    "Mijia Cloud",
    "dlg.io.mi.com",
    "+.apple.com",
  ],
};

// 流量转发隧道，可以转发 tcp/udp 流量，也可经过代理转发
/*const tunnelsConfig = {
  //单行格式
  "tcp/udp,127.0.0.1:6553,114.114.114.114:53,proxy":
  "tcp,127.0.0.1:6666,rds.mysql.com:3306,vpn",
  //多行格式
  "network" : ["tcp", "udp"],
     "address": "127.0.0.1:6553",
     "target": "114.114.114.114:53",
     "proxy": "proxy",
  "network" : ["tcp"],
     "address": "127.0.0.1:6666",
     "target": "rds.mysql.com:3306",
     "proxy": "vpn",
};*/

// DNS配置
const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  "use-system-hosts": true,
  "use-hosts": true,
  "ipv6": true,
  "prefer-h3": true,
  "cache-algorithm": "arc",
  "respect-rules": true,
  "enhanced-mode": "fake-ip",
  "fake-ip-filter-mode": "blacklist",
  "fake-ip-range": "198.18.0.1/16",
  "fallback-filter": {
    "geoip": true,
    "geoip-code":"CN",
    "geosipite":["gfw"],
    "ip-cidr": [
        "127.0.0.1/8",
        "0.0.0.0/32",
        "0.0.0.0/8",
        "10.0.0.0/8",
        "100.64.0.0/10",
        "127.0.0.0/8",
        "169.254.0.0/16",
        "172.16.0.0/12",
        "192.0.0.0/24",
        "192.0.2.0/24",
        "192.168.0.0/16",
        "192.88.99.0/24",
        "198.18.0.0/15",
        "198.51.100.0/24",
        "203.0.113.0/24",
        "224.0.0.0/4",
        "240.0.0.0/4",
        "255.255.255.255/32",
    ],
    "domain": [
        "+.google.com",
        "+.facebook.com",
        "+.twitter.com",
        "+.instagram.com",
        "+.netfix.com",
        "+.hbo.com",
        "+.disneyplus.com",
        "+.github.com",
        "+.githubusercontent.com",
        "+.youtube.com",
        "+.xn--ngstr-lra8j.com",
        "+.google.cn",
        "+.googlevideo.com",
        "+.googleapis.cn",
        "+.x.com",
        "+.tiktok.com",
        "+.googleapis.com",
        "+.gvt1.com"
    ]
  },
  "fake-ip-filter": [
    //国内及常用
    "geosite:cn,private,microsoft@cn,onedrive,category-companies@cn,category-ntp,steam@cn,category-entertainment@cn,category-enhance-gaming@cn,category-games@cn",
    //Goole FCM服务器
    "geosite:googlefcm",
    "rule-set:fake-ip-filter",
  ],
  "default-nameserver": ["223.5.5.5", "223.6.6.6", "1.12.12.12", "120.53.53.53"],
  "fallback": ["tls://8.8.4.4","tls://1.1.1.1"],
  "nameserver": [...domesticNameservers, ...foreignNameservers],
  "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
  "nameserver-policy": {
    "geosite:private,cn,geolocation-cn": domesticNameservers,
    "geosite:google,youtube,telegram,gfw,Microsoft,OpenAI,TikTok,github,geolocation-!cn": foreignNameservers,
    "geosite:googlefcm":["https://223.5.5.5/dns-query#h3=true", "https://1.12.12.12/dns-query", "[2400:3200::1]", "[2400:3200:baba::1]", "[2402:4e00::]"],
  }
};
//服务端启用。入站监听类型
const listenersConfig = {
// 配置 shadowsocks 入站，即创建 shadowsocks 代理
  name: "ss-in", 
  type: "shadowsocks", 
  port: 10001, 
  listen: "0.0.0.0", 
  cipher: "2022-blake3-aes-256-gcm", 
  password: "vlmpIPSyHH6f4S8WVPdRIHIlzmB+GIRfoH3aNJ/t9Gg=", 
  udp: true
};
// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};
// 规则集配置
const ruleProviders = {
  "fake-ip-filter": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/xingxin1590/clash-rules@main/fake-ip-filter.yaml",
    "path": "./ruleset/loyalsoldier/fake-ip-filter.yaml"
  },
  "reject": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    "path": "./ruleset/loyalsoldier/reject.yaml"
  },
  "icloud": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    "path": "./ruleset/loyalsoldier/icloud.yaml"
  },
  "apple-classical": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xingxin1590/clash-rules@main/apple-classical.txt",
    "path": "./ruleset/loyalsoldier/apple-classical.yaml"
  },
  "apple-domain": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/xingxin1590/clash-rules@main/apple-domain.txt",
    "path": "./ruleset/loyalsoldier/apple-domain.yaml"
  },
  "apple-direct": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    "path": "./ruleset/loyalsoldier/apple-direct.yaml"
  },
  "google-classical": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xingxin1590/clash-rules@main/Google.txt",
    "path": "./ruleset/loyalsoldier/google-classical.yaml"
  },
  "google-domain": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
    "path": "./ruleset/loyalsoldier/google-domain.yaml"
  },
  "github": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xingxin1590/clash-rules@main/GitHub.txt",
    "path": "./ruleset/loyalsoldier/GitHub.yaml"
  },
  "proxy": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    "path": "./ruleset/loyalsoldier/proxy.yaml"
  },
  "direct": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    "path": "./ruleset/loyalsoldier/direct.yaml"
  },
  "private": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    "path": "./ruleset/loyalsoldier/private.yaml"
  },
  "gfw": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    "path": "./ruleset/loyalsoldier/gfw.yaml"
  },
  "tld-not-cn": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
  },
  "telegramcidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
    "path": "./ruleset/loyalsoldier/telegramcidr.yaml"
  },
  "cncidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    "path": "./ruleset/loyalsoldier/cncidr.yaml"
  },
  "lancidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    "path": "./ruleset/loyalsoldier/lancidr.yaml"
  },
  "applications": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xingxin1590/clash-rules@main/applications.txt",
    "path": "./ruleset/loyalsoldier/applications.yaml"
  },
  "openai": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml",
    "path": "./ruleset/blackmatrix7/openai.yaml"
  },
  "tiktok": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/TikTok/TikTok.yaml",
    "path": "./ruleset/blackmatrix7/TikTok.yaml"
  },
  "netflix": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xingxin1590/clash-rules@main/Netflix.txt",
    "path": "./ruleset/blackmatrix7/Netflix.yaml"
  },
  "emby": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Emby/Emby.yaml",
    "path": "./ruleset/blackmatrix7/Emby.yaml"
  },
  "youtube": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xingxin1590/clash-rules@main/YouTuBe.txt",
    "path": "./ruleset/blackmatrix7/YouTuBe.yaml"
  },
  "microsoft": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xingxin1590/clash-rules@main/Microsoft.txt",
    "path": "./ruleset/blackmatrix7/Microsoft.yaml"
  },
  "twitch": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xingxin1590/clash-rules@main/twitch.txt",
    "path": "./ruleset/blackmatrix7/Twitch.yaml"
  }
};
// 规则
const subrules = {
  "📢 微信 FCM 方案1":[
    // Google FCM
    "GEOSITE, googlefcm, ✔️全局直连 ",// Google FCM 推送"
    // 微信 - Google FCM
    "AND,((OR,((AND,((DOMAIN-REGEX,^.*long.weixin.qq.com),(OR,((DST-PORT,80),(DST-PORT,8080),(DST-PORT,443))))),(AND,((DOMAIN-REGEX,^.*dns.weixin.qq.com.*))))),(NETWORK,TCP)), 🖥️节点选择 ",// 微信 Google FCM"
    "AND,((NOT,((GEOIP,cn))),(NOT,((GEOSITE,cn))),(OR,((IP-ASN,45090),(IP-ASN,132203),(IP-ASN,133478)))), 🖥️节点选择 ",// 微信境外 ASN 请求。测试规则
    "DOMAIN-REGEX, ^(?:(.*short)|(.+long)).weixin.qq.com, ✔️全局直连"],// 微信消息"
  "📢 微信 FCM 方案2":[
    // Google FCM
    "GEOSITE, googlefcm, ✔️全局直连 ",// Google FCM 推送"
    // 微信 - Google FCM
    "AND,((OR,((AND,((DOMAIN-REGEX,^.*extshort.weixin.qq.com),(DST-PORT,80))),(AND,((DOMAIN-REGEX,^.*long.weixin.qq.com),(OR,((DST-PORT,80),(DST-PORT,8080),(DST-PORT,443))))),(AND,((DOMAIN-REGEX,^.*dns.weixin.qq.com.*))))),(NETWORK,TCP)), 🖥️节点选择 ",//微信 Google FCM
    "AND,((NOT,((GEOIP,cn))),(NOT,((GEOSITE,cn))),(OR,((IP-ASN,45090),(IP-ASN,132203),(IP-ASN,133478)))), 🖥️节点选择 ",// 微信境外 ASN 请求。测试规则
    "DOMAIN-REGEX, ^(?:(?!ext)(.*short)|(.+long)).weixin.qq.com, ✔️全局直连 "],// 微信消息"
};
const rules = [
  //微信 FCM 相关
  "SUB-RULE,(OR,((NETWORK,TCP),(NETWORK,UDP))),📢 微信 FCM 方案2",
  // 防止 YouTube 等使用 QUIC 导致速度不佳, 禁用 443 端口 UDP 流量（不包括国内）
  "AND,((DST-PORT,443),(NETWORK,UDP),(NOT,((GEOSITE,cn))),(NOT,((GEOIP,cn))),(NOT,((IP-ASN,45090))),(NOT,((IP-ASN,132203))),(NOT,((IP-ASN,133478))),(NOT,((IP-ASN,59054))),(NOT,((IP-ASN,59054))),(NOT,((IP-ASN,59053))),(NOT,((IP-ASN,59052))),(NOT,((IP-ASN,59051))),(NOT,((IP-ASN,59028))),(NOT,((IP-ASN,45104))),(NOT,((IP-ASN,45103))),(NOT,((IP-ASN,37963))),(NOT,((IP-CIDR,223.5.5.5/32))),(NOT,((IP-CIDR,1.12.12.12/32))),(NOT,((IP-CIDR,94.140.14.14/32)))),❌广告过滤",
  // 阿里巴巴。淘宝、支付宝等
  "OR,((GEOSITE,alibaba),(IP-ASN,59054),(IP-ASN,59054),(IP-ASN,59053),(IP-ASN,59052),(IP-ASN,59051),(IP-ASN,59028),(IP-ASN,45104),(IP-ASN,45103),(IP-ASN,37963)), ✔️全局直连",
  //包名
  "PROCESS-NAME,org.torproject.torbrowser,🖥️节点选择",
  "PROCESS-NAME,com.cccbb.abc,🖥️节点选择",
  "PROCESS-NAME,com.apkpure.aegon,🖥️节点选择",
  // 自定义规则
  "DOMAIN,v2rayse.com,🖥️节点选择", // V2rayse节点工具
  // blackmatrix7 规则集
  "RULE-SET,youtube,▶️YouTuBe",
  "RULE-SET,openai,🤖ChatGPT",
  "RULE-SET,tiktok,🎵TikTok",
  "RULE-SET,netflix,🎥Netflix",
  "RULE-SET,emby,🔊Emby",
  "RULE-SET,github,📦GitHub",
  "RULE-SET,twitch,🎮Twitch",
  // Loyalsoldier 规则集
  "RULE-SET,applications,✔️全局直连",
  "RULE-SET,private,✔️全局直连",
  "RULE-SET,reject,❌广告过滤",
  "RULE-SET,microsoft,☁️微软服务",
  "RULE-SET,icloud,✔️全局直连",
  "RULE-SET,apple-classical,🍎苹果服务",
  "RULE-SET,apple-domain,🍎苹果服务",
  "RULE-SET,apple-direct,✔️全局直连",
  "RULE-SET,google-classical,🔍谷歌服务",
  "RULE-SET,google-domain,🔍谷歌服务",
  "RULE-SET,proxy,🖥️节点选择",
  "RULE-SET,gfw,🖥️节点选择",
  "RULE-SET,tld-not-cn,🖥️节点选择",
  "RULE-SET,direct,✔️全局直连",
  "RULE-SET,lancidr,✔️全局直连,no-resolve",
  "RULE-SET,cncidr,✔️全局直连,no-resolve",
  "RULE-SET,telegramcidr,📱电报消息,no-resolve",
  // 其他规则
  "GEOIP,LAN,✔️全局直连,no-resolve",
  "GEOIP,CN,✔️全局直连,no-resolve",
  "GEOIP,private,✔️全局直连,no-resolve",
  "MATCH,❗Final"
];
// 代理组通用配置
const groupBaseOption = {
  "interval": 120,
  "timeout": 3000,
  "lazy": false,
  "hidden":true,
  "url": "https://www.google.com/generate_204",
  "max-failed-times": 3,
};
// 散列负载均衡通用配置
const grouphashOption = {
  "type": "load-balance",
  "strategy": "consistent-hashing",
  "include-all": true,
  "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
};
// 轮询负载均衡通用配置
const grouprobinOption = {
  "type": "load-balance",
  "strategy": "round-robin",
  "include-all": true,
  "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
};

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  };

  // 覆盖原配置中DNS配置
  config["dns"] = dnsConfig;
  config["profile"] = profileConfig;
  config["unified-delay"] = true;
  config["tcp-concurrent"] = true;
  config["global-client-fingerprint"] = "random";
  config["sniffer"] = snifferConfig;
  config["tun"] = tunConfig;
  config["geodata-mode"] = true;
  config["geo-auto-update"] = true;
  config["geo-update-interval"] = 24;
  //config["tunnels"] = tunnelsConfig;
  //config["listeners"] = listenersConfig;
  config["sub-rules"] = subrules;

  // 覆盖原配置中的代理组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "🖥️节点选择",
      "type": "select",
      "hidden": false,
      "proxies": ["🚄延迟选优", "🌍地区选择","⚖️地区负载均衡","⚖️All负载均衡(散列)", "⚖️All负载均衡(轮询)","🚑故障转移","DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
    },
    {
      ...groupBaseOption,
      "name": "🌍地区选择",
      "type": "select",
      "hidden": false,
      "proxies": ["🇧🇷巴西AUTO","🇨🇭瑞士AUTO","🇦🇺澳大利亚AUTO","🇨🇦加拿大AUTO","🇩🇪德国AUTO","🇬🇧英国AUTO","🇭🇰香港AUTO","🇯🇵日本AUTO",
      "🇸🇬新加坡AUTO","🇺🇸美国AUTO","🇹🇼台湾AUTO","👑专线(IEPL)AUTO","🇰🇷韩国AUTO","🇮🇳印度AUTO","🇷🇺俄罗斯AUTO"],
      "icon": "https://fastly.jsdelivr.net/gh/shindgewongxj/WHATSINStash@master/icon/categoryglobe.png"
    },
    {
      ...groupBaseOption,
      "name": "🚄延迟选优",
      "type": "url-test",
      "tolerance": 1,
      "hidden": false,
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
    },
    {
      ...groupBaseOption,
      "name": "⚖️地区负载均衡",
      "type": "select",
      "hidden": false,
      "proxies": ["👑专线(IEPL)(散列)","👑专线(IEPL)(轮询)","🇭🇰香港(散列)","🇭🇰香港(轮询)"],
      "icon": "https://www.clashverge.dev/assets/icons/balance.svg"
    },
    {
      ...groupBaseOption,
      ...grouphashOption,
      "name": "⚖️All负载均衡(散列)",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg"
    },
    {
      ...groupBaseOption,
      ...grouprobinOption,
      "name": "⚖️All负载均衡(轮询)",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
    },
    {
      ...groupBaseOption,
      "name": "🚑故障转移",
      "type": "fallback",
      "hidden": false,
      "include-all" : true,
      "icon": "https://www.clashverge.dev/assets/icons/ambulance.svg"
    },
    {
      ...groupBaseOption,
      "name": "🔍谷歌服务",
      "type": "select",
      "proxies": ["🖥️节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },
    {
      ...groupBaseOption,
      "name": "📦GitHub",
      "type": "select",
      "proxies": ["🖥️节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },
    {
      ...groupBaseOption,
      "name": "🎮Twitch",
      "type": "select",
      "proxies": ["🖥️节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },
    {
      ...groupBaseOption,
      "name": "📁icloud云存储",
      "type": "select",
      "proxies": ["🖥️节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },
    {
      ...groupBaseOption,
      "name": "📱电报消息",
      "type": "select",
      "proxies": ["🖥️节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
    },
    {
      ...groupBaseOption,
      "name": "🤖ChatGPT",
      "type": "url-test",
      "tolerance":1,
      "url": "https://chatgpt.com",
      "expected-status": "200",
      "include-all": true,
      "hidden": false,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|群组|HK|🇭🇰|官网|剩余|🇨🇳|香港|HongKong",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg"
    },
    {
      ...groupBaseOption,
      "name": "🎵TikTok",
      "type": "url-test",
      "tolerance": 1,
      "url": "https://www.tiktok.com",
      "expected-status": "200",
      "include-all": true,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|群组|HK|🇭🇰|官网|剩余|🇨🇳|香港|HongKong",
      "hidden": false,
      "icon": "https://www.clashverge.dev/assets/icons/tiktok.svg"
    },
    {
      ...groupBaseOption,
      "name": "🎥Netflix",
      "type": "select",
      "url": "https://www.netflix.com/title/81280792",
      "expected-status": "200",
      "proxies": ["🖥️节点选择"],
      "icon": "https://www.clashverge.dev/assets/icons/netflix.svg"
    },
    {
      ...groupBaseOption,
      "name": "🔊Emby",
      "type": "select",
      "url": "https://emby.media/",
      "expected-status": "200",
      "proxies": ["🖥️节点选择"],
      "icon": "https://www.clashverge.dev/assets/icons/netflix.svg"
    },
    {
      ...groupBaseOption,
      "name": "▶️YouTuBe",
      "type": "select",
      "url": "https://www.youtube.com",
      "expected-status": "200",
      "proxies": ["🖥️节点选择"],
      "icon": "https://www.clashverge.dev/assets/icons/youtube.svg"
    },
    {
      ...groupBaseOption,
      "name": "☁️微软服务",
      "type": "select",       
      "proxies": ["🖥️节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
    },
    {
      ...groupBaseOption,
      "name": "🍎苹果服务",
      "type": "select",      
      "proxies": ["🖥️节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
    },
    {
      ...groupBaseOption,
      name: "👑专线(IEPL)AUTO",
      "include-all": true,
      "tolerance": 1,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)专线|IEPL|👑|专转",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      ...groupBaseOption,
      ...grouphashOption,
      name: "👑专线(IEPL)(散列)",   
      filter: "(?i)专线|IEPL|👑|专转",
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      ...groupBaseOption,
      ...grouprobinOption,
      name: "👑专线(IEPL)(轮询)",  
      filter: "(?i)专线|IEPL|👑|专转",
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      ...groupBaseOption,
      ...grouphashOption,
      name: "🇭🇰香港(散列)",
      filter: "(?i)香港|Hong Kong|🇭🇰",
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      ...groupBaseOption,
      ...grouprobinOption,
      name: "🇭🇰香港(轮询)",
      filter: "(?i)香港|Hong Kong|🇭🇰",
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      ...groupBaseOption,
      name: "🇷🇺俄罗斯AUTO",
      "include-all": true,
      "tolerance": 1,     
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)俄罗斯|🇷🇺",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      ...groupBaseOption,
      name: "🇧🇷巴西AUTO",
      "include-all": true,
      "tolerance": 1,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)巴西|🇧🇷",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      ...groupBaseOption,
      name: "🇨🇭瑞士AUTO",
      "include-all": true,
      "tolerance": 1,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)瑞士|🇨🇭",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      ...groupBaseOption,
      name: "🇦🇺澳大利亚AUTO",
      "include-all": true,
      "tolerance": 1,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)澳大利亚|🇦🇺",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      ...groupBaseOption,
      name: "🇨🇦加拿大AUTO",
      "include-all": true,
      "tolerance": 1,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)加拿大|🇨🇦",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      ...groupBaseOption,
      name: "🇩🇪德国AUTO",
      "include-all": true,
      "tolerance": 1,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)德国|🇩🇪|Germany",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      ...groupBaseOption,
      name: "🇬🇧英国AUTO",
      "include-all": true,
      "tolerance": 1,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)英国|🇬🇧",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      ...groupBaseOption,
      name: "🇮🇳印度AUTO",
      "include-all": true,
      "tolerance": 1,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)印度|🇮🇳",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      ...groupBaseOption,
      name: "🇭🇰香港AUTO",
      "include-all": true,
      "tolerance": 1,
       
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)香港|Hong Kong|🇭🇰",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      ...groupBaseOption,
      name: "🇸🇬新加坡AUTO",
      "include-all": true,
      "tolerance": 1,
       
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)新加坡|Singapore|🇸🇬",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/sg.svg"
    },
    {
      ...groupBaseOption,
      name: "🇯🇵日本AUTO",
      "include-all": true,
      "tolerance": 1,
       
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)日本|Japan|🇯🇵",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/jp.svg"
    },
    {
      ...groupBaseOption,
      name: "🇺🇸美国AUTO",
      type: "url-test",
      "tolerance": 1,
      "include-all": true,
       
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)美国|🇺🇸",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/um.svg",
    },
    {
      ...groupBaseOption,
      name: "🇹🇼台湾AUTO",
      type: "url-test",
      "tolerance": 1,
      "include-all": true,
       
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)台湾|🇹🇼",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/um.svg",
    },
    {
      ...groupBaseOption,
      name: "🇰🇷韩国AUTO",
      type: "url-test",
      "tolerance": 1,
      "include-all": true,
       
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)韩国|🇰🇷|Korea",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/um.svg",
    },
    {
      ...groupBaseOption,
      "name": "❌广告过滤",
      "type": "select",
       
      "proxies": ["REJECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg"
    },
    {
      ...groupBaseOption,
      "name": "✔️全局直连",
      "type": "select",
       
      "proxies": ["DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "❗Final",
      "type": "select",
       
      "proxies": ["🖥️节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    }
  ];

  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;

  // 返回修改后的配置
  return config;
}
