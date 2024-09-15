// 国内DNS服务器
const domesticNameservers = [
  "https://dns.alidns.com/dns-query", // 阿里云公共DNS
  "https://doh.pub/dns-query", // 腾讯DNSPod
  "https://doh.360.cn/dns-query", // 360安全DNS
  "https://dns.alidns.com/dns-query//h3=true",
];
// 国外DNS服务器
const foreignNameservers = [
  "https://1.1.1.1/dns-query", // Cloudflare(主)
  "https://1.0.0.1/dns-query", // Cloudflare(备)
  "https://208.67.222.222/dns-query", // OpenDNS(主)
  "https://208.67.220.220/dns-query", // OpenDNS(备)
  "https://194.242.2.2/dns-query", // Mullvad(主)
  "https://194.242.2.3/dns-query", // Mullvad(备)
  "https://1.1.1.2/dns-query//h3=true",
  "https://1.0.0.2/dns-query//h3=true",
  "https://[2606:4700:4700::64]/dns-query//h3=true",
  "https://[2606:4700:4700::6400]/dns-query//h3=true",
  "8.8.8.8",
  "8.8.4.4",
  "https://[2001:4860:4860::6464]/dns-query//h3=true"
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
        "8443",
        "5228",
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
  "hosts": {
    // Google Services
    "www.google.com": "172.217.14.206",
    "google.com": "172.217.14.206",
    "mail.google.com": "172.217.14.206",
    "drive.google.com": "172.217.14.206",
    "www.youtube.com": "142.250.72.206",
    "youtube.com": "142.250.72.206",
    "accounts.google.com": "142.250.72.206",

    // GitHub
    "github.com": "140.82.114.4",
    "assets-cdn.github.com": "185.199.108.154",
    "raw.githubusercontent.com": "185.199.108.133",
    "user-images.githubusercontent.com": "185.199.109.153",
    "avatars.githubusercontent.com": "185.199.109.154",

    // Facebook & Instagram
    "www.facebook.com": "157.240.22.35",
    "facebook.com": "157.240.22.35",
    "m.facebook.com": "157.240.22.35",
    "instagram.com": "157.240.22.174",
    "www.instagram.com": "157.240.22.174",

    // Twitter
    "twitter.com": "104.244.42.129",
    "mobile.twitter.com": "104.244.42.193",
    "abs.twimg.com": "104.244.42.65",

    // Microsoft & Windows Update
    "www.microsoft.com": "13.107.42.14",
    "microsoft.com": "13.107.42.14",
    "www.bing.com": "204.79.197.200",
    "update.microsoft.com": "13.107.4.50",

    // Apple
    "www.apple.com": "17.253.144.10",
    "apple.com": "17.253.144.10",
    "itunes.apple.com": "17.253.144.10",
    "appstore.com": "17.253.144.10",

    // Amazon
    "www.amazon.com": "205.251.242.103",
    "amazon.com": "205.251.242.103",
    "images-na.ssl-images-amazon.com": "176.32.103.205",

    // Netflix
    "netflix.com": "52.94.241.16",
    "www.netflix.com": "52.94.241.16",
    "api-global.netflix.com": "13.224.30.68",
    "assets.nflxext.com": "13.224.30.68",

    // Wikipedia
    "en.wikipedia.org": "208.80.154.224",
    "wikipedia.org": "208.80.154.224",

    // Slack
    "slack.com": "54.192.28.82",
    "app.slack.com": "54.192.28.82",

    // Zoom
    "zoom.us": "170.114.10.68",
    "www.zoom.us": "170.114.10.68",

    // Dropbox
    "dropbox.com": "162.125.66.1",
    "www.dropbox.com": "162.125.66.1"
  },
  "ipv6": true,
  "prefer-h3": true,
  "cache-algorithm": "arc",
  "respect-rules": true,
  "enhanced-mode": "fake-ip",
  "fake-ip-filter-mode": "blacklist",
  "fake-ip-range": "198.18.0.1/16",
      "fallback-filter": {
        "geoip": true,
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
    // 本地主机/设备
    "+.lan",
    "+.private",
    "+.cn",
    "+.local",
    "*.localdomain",
    // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com",
    "localhost.weixin.qq.com",
    // 主动嗅探 Google FCM 和 DL 服务器
    "alt1-mtalk.google.com",
    "alt2-mtalk.google.com",
    "alt3-mtalk.google.com",
    "alt4-mtalk.google.com",
    "alt5-mtalk.google.com",
    "alt6-mtalk.google.com",
    "alt7-mtalk.google.com",
    "alt8-mtalk.google.com",
    "mtalk.google.com",
    "dl.google.com",
    "dl.l.google.com",
    "+.example",
    "+.invalid",
    "+.localhost",
    "+.test",
    "+.local",
    "+.home.arpa",
    // 放行NTP服务
    "time.*.com",
    "time.*.gov",
    "time.*.edu.cn",
    "time.*.apple.com",
    "time-ios.apple.com",
    "time1.*.com",
    "time2.*.com",
    "time3.*.com",
    "time4.*.com",
    "time5.*.com",
    "time6.*.com",
    "time7.*.com",
    "ntp.*.com",
    "ntp1.*.com",
    "ntp2.*.com",
    "ntp3.*.com",
    "ntp4.*.com",
    "ntp5.*.com",
    "ntp6.*.com",
    "ntp7.*.com",
    "*.time.edu.cn",
    "*.ntp.org.cn",
    "+.pool.ntp.org",
    "time1.cloud.tencent.com",
    // 放行网易云音乐
    "music.163.com",
    "*.music.163.com",
    "*.126.net",
    // 百度音乐
    "musicapi.taihe.com",
    "music.taihe.com",
    // 酷狗音乐
    "songsearch.kugou.com",
    "trackercdn.kugou.com",
    // 酷我音乐
    "*.kuwo.cn",
    // JOOX音乐
    "api-jooxtt.sanook.com",
    "api.joox.com",
    "joox.com",
    // QQ音乐
    "y.qq.com",
    "*.y.qq.com",
    "streamoc.music.tc.qq.com",
    "mobileoc.music.tc.qq.com",
    "isure.stream.qqmusic.qq.com",
    "dl.stream.qqmusic.qq.com",
    "aqqmusic.tc.qq.com",
    "amobile.music.tc.qq.com",
    // 虾米音乐
    "*.xiami.com",
    // 咪咕音乐
    "*.music.migu.cn",
    "music.migu.cn",
    // win10本地连接检测
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ登录
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    "+.qq.com",
    "+.tencent.com",
    // Game
    // Steam
    "+.steamcontent.com",
    // Nintendo Switch
    "+.srv.nintendo.net",
    "*.n.n.srv.nintendo.net",
    "+.cdn.nintendo.net",
    // Sony PlayStation
    "+.stun.playstation.net",
    // Microsoft Xbox
    "xbox.*.*.microsoft.com",
    "*.*.xboxlive.com",
    "xbox.*.microsoft.com",
    "xnotify.xboxlive.com",
    // Wotgame
    "+.battlenet.com.cn",
    "+.wotgame.cn",
    "+.wggames.cn",
    "+.wowsgame.cn",
    "+.wargaming.net",
    // Golang
    "proxy.golang.org",
    // STUN
    "stun.*.*",
    "stun.*.*.*",
    "+.stun.*.*",
    "+.stun.*.*.*",
    "+.stun.*.*.*.*",
    "+.stun.*.*.*.*.*",
    // Linksys Router
    "heartbeat.belkin.com",
    "*.linksys.com",
    "*.linksyssmartwifi.com",
    // ASUS Router
    "*.router.asus.com",
    // Apple Software Update Service
    "mesu.apple.com",
    "swscan.apple.com",
    "swquery.apple.com",
    "swdownload.apple.com",
    "swcdn.apple.com",
    "swdist.apple.com",
    // Google
    "lens.l.google.com",
    "stun.l.google.com",
    "na.b.g-tun.com",
    // Netflix
    "+.nflxvideo.net",
    // FinalFantasy XIV Worldwide Server & CN Server
    "*.square-enix.com",
    "*.finalfantasyxiv.com",
    "*.ffxiv.com",
    "*.ff14.sdo.com",
    "ff.dorado.sdo.com",
    // Bilibili
    "*.mcdn.bilivideo.cn",
    // Disney Plus
    "+.media.dssott.com",
    // shark007 Codecs
    "shark007.net",
    // Mijia
    "Mijia Cloud",
    // Xiaomi
    "+.market.xiaomi.com",
    // 招商银行
    "+.cmbchina.com",
    "+.cmbimg.com",
    // AdGuard
    "adguardteam.github.io",
    "adrules.top",
    "anti-ad.net",
    "local.adguard.org",
    "static.adtidy.org",
    // 迅雷
    "+.sandai.net",
    "+.n0808.com",
    // T-mobile and Ultra Mobile wifi calling
    "+.3gppnetwork.org",
    // UU Plugin
    "+.uu.163.com",
    "ps.res.netease.com",
    // 向日葵远程控制
    "+.oray.com",
    "+.orayimg.com",
    "WORKGROUP",
  ],
  "default-nameserver": ["223.5.5.5", "119.29.29.29", "1.1.1.1", "8.8.8.8","223.6.6.6","114.114.114.114","1.12.12.12",
  "120.53.53.53",'[2400:3200::1]','[2400:3200:baba::1]','[2402:4e00::]'],
  "fallback": ["tls://8.8.4.4","tls://1.1.1.1"],
  "nameserver": [...domesticNameservers, ...foreignNameservers],
  "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
  "nameserver-policy": {
    "geosite:private,cn,geolocation-cn": domesticNameservers,
    "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers,
  }
};
// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};
// 规则集配置
const ruleProviders = {
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
const rules = [
  //包名
  "PROCESS-NAME,org.torproject.torbrowser,🖥️节点选择",
  "PROCESS-NAME,com.zhiliaoapp.musically,🎵TikTok",
  "PROCESS-NAME,com.netflix.sv1,🎥Netflix",
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
  "MATCH,❗Final"
];
// 代理组通用配置
const groupBaseOption = {
  "interval": 120,
  "timeout": 3000,
  "lazy": false,
  "max-failed-times": 3,
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

  // 覆盖原配置中的代理组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "🖥️节点选择",
      "type": "select",
      "hidden": false,
      "url": "https://www.google.com/generate_204",
      "proxies": ["🚄延迟选优", "⚖️负载均衡(散列)", "⚖️负载均衡(轮询)","🌍地区选择","🚑故障转移","DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
    },
    {
      ...groupBaseOption,
      "name": "🌍地区选择",
      "type": "select",
      "hidden": false,
      "url": "https://www.google.com/generate_204",
      "proxies": ["🇧🇷巴西AUTO","🇨🇭瑞士AUTO","🇦🇺澳大利亚AUTO","🇨🇦加拿大AUTO","🇩🇪德国AUTO","🇬🇧英国AUTO","🇭🇰香港AUTO","🇯🇵日本AUTO",
      "🇸🇬新加坡AUTO","🇺🇸美国AUTO","🇹🇼台湾AUTO","👑专线(IEPL)AUTO","🇰🇷韩国AUTO","🇮🇳印度AUTO","🇷🇺俄罗斯AUTO"],
      "icon": "https://fastly.jsdelivr.net/gh/shindgewongxj/WHATSINStash@master/icon/categoryglobe.png"
    },
    {
      ...groupBaseOption,
      "name": "🚄延迟选优",
      "type": "url-test",
      "tolerance": 50,
      "hidden": false,
      "url": "https://www.google.com/generate_204",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
    },
    {
      ...groupBaseOption,
      "name": "⚖️负载均衡(散列)",
      "type": "load-balance",
      "strategy": "consistent-hashing",
      "include-all": true,
      "url": "https://www.google.com/generate_204",
      "hidden": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg"
    },
    {
      ...groupBaseOption,
      "name": "⚖️负载均衡(轮询)",
      "type": "load-balance",
      "strategy": "round-robin",
      "url": "https://www.google.com/generate_204",
      "include-all": true,
      "hidden": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
    },
    {
      ...groupBaseOption,
      "name": "🚑故障转移",
      "type": "fallback",
      "hidden": false,
      "include-all" : true,
      "url": "https://www.google.com/generate_204",
      "icon": "https://www.clashverge.dev/assets/icons/ambulance.svg"
    },
    {
      ...groupBaseOption,
      "name": "🔍谷歌服务",
      "type": "select",
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "proxies": ["🖥️节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },
    {
      ...groupBaseOption,
      "name": "📦GitHub",
      "type": "select",
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "proxies": ["🖥️节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },
    {
      ...groupBaseOption,
      "name": "🎮Twitch",
      "type": "select",
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "proxies": ["🖥️节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },
    {
      ...groupBaseOption,
      "name": "📁icloud云存储",
      "type": "select",
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "proxies": ["🖥️节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },
    {
      ...groupBaseOption,
      "name": "📱电报消息",
      "type": "select",
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "proxies": ["🖥️节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
    },
    {
      ...groupBaseOption,
      "name": "🤖ChatGPT",
      "type": "url-test",
      "tolerance":50,
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
      "tolerance": 50,
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
      "type": "url-test",
      "tolerance": 50,
      "url": "https://www.netflix.com/title/81280792",
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|群组|官网",
      "expected-status": "200",
      "hidden": true,
      "include-all" :true,
      "icon": "https://www.clashverge.dev/assets/icons/netflix.svg"
    },
    {
      ...groupBaseOption,
      "name": "🔊Emby",
      "type": "select",
      "url": "https://emby.media/",
      "expected-status": "200",
      "hidden": true,
      "proxies": ["🖥️节点选择"],
      "icon": "https://www.clashverge.dev/assets/icons/netflix.svg"
    },
    {
      ...groupBaseOption,
      "name": "▶️YouTuBe",
      "type": "url-test",
      "tolerance": 50,
      "url": "https://www.youtube.com/watch?v=bclV6mAkeYw",
      "expected-status": "200",
      "hidden": false,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|群组|官网",
      "include-all":true,
      "icon": "https://www.clashverge.dev/assets/icons/youtube.svg"
    },
    {
      ...groupBaseOption,
      "name": "☁️微软服务",
      "type": "select",
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "proxies": ["🖥️节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
    },
    {
      ...groupBaseOption,
      "name": "🍎苹果服务",
      "type": "select",
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "proxies": ["🖥️节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
    },
    {
      name: "👑专线(IEPL)AUTO",
      "include-all": true,
      "tolerance": 50,
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)专线|IEPL|👑|专转",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      name: "🇷🇺俄罗斯AUTO",
      "include-all": true,
      "tolerance": 50,
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)俄罗斯|🇷🇺",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      name: "🇧🇷巴西AUTO",
      "include-all": true,
      "tolerance": 50,
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)巴西|🇧🇷",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      name: "🇨🇭瑞士AUTO",
      "include-all": true,
      "tolerance": 50,
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)瑞士|🇨🇭",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      name: "🇦🇺澳大利亚AUTO",
      "include-all": true,
      "tolerance": 50,
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)澳大利亚|🇦🇺",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      name: "🇨🇦加拿大AUTO",
      "include-all": true,
      "tolerance": 50,
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)加拿大|🇨🇦",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      name: "🇩🇪德国AUTO",
      "include-all": true,
      "tolerance": 50,
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)德国|🇩🇪|Germany",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      name: "🇬🇧英国AUTO",
      "include-all": true,
      "tolerance": 50,
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)英国|🇬🇧",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      name: "🇮🇳印度AUTO",
      "include-all": true,
      "tolerance": 50,
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)印度|🇮🇳",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      name: "🇭🇰香港AUTO",
      "include-all": true,
      "tolerance": 50,
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)香港|Hong Kong|🇭🇰",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
    },
    {
      name: "🇸🇬新加坡AUTO",
      "include-all": true,
      "tolerance": 50,
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)新加坡|Singapore|🇸🇬",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/sg.svg"
    },
    {
      name: "🇯🇵日本AUTO",
      "include-all": true,
      "tolerance": 50,
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)日本|Japan|🇯🇵",
      type: "url-test",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/jp.svg"
    },
    {
      name: "🇺🇸美国AUTO",
      type: "url-test",
      "tolerance": 50,
      "include-all": true,
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)美国|🇺🇸",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/um.svg",
    },
    {
      name: "🇹🇼台湾AUTO",
      type: "url-test",
      "tolerance": 50,
      "include-all": true,
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)台湾|🇹🇼",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/um.svg",
    },
    {
      name: "🇰🇷韩国AUTO",
      type: "url-test",
      "tolerance": 50,
      "include-all": true,
      "hidden": true,
      "url": "https://www.google.com/generate_204",
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置|官网",
      filter: "(?i)韩国|🇰🇷|Korea",
      "proxies": ["REJECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/um.svg",
    },
    {
      ...groupBaseOption,
      "name": "❌广告过滤",
      "type": "select",
      "hidden": true,
      "proxies": ["REJECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg"
    },
    {
      ...groupBaseOption,
      "name": "✔️全局直连",
      "type": "select",
      "hidden": true,
      "proxies": ["DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "❗Final",
      "type": "select",
      "hidden": true,
      "url": "https://www.google.com/generate_204",
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
