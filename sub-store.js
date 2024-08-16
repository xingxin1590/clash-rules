mode: rule
mixed-port: 7897
allow-lan: false
log-level: info
external-controller: 127.0.0.1:9097
secret: ''
bind-address: '*'
dns:
  enable: true
  listen: 0.0.0.0:1053
  ipv6: true
  use-system-hosts: false
  cache-algorithm: arc
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
  - +.lan
  - +.local
  - +.msftconnecttest.com
  - +.msftncsi.com
  - localhost.ptlogin2.qq.com
  - localhost.sec.qq.com
  - localhost.work.weixin.qq.com
  default-nameserver:
  - 223.5.5.5
  - 119.29.29.29
  - 1.1.1.1
  - 8.8.8.8
  nameserver:
  - https://dns.alidns.com/dns-query
  - https://doh.pub/dns-query
  - https://doh.360.cn/dns-query
  - https://1.1.1.1/dns-query
  - https://1.0.0.1/dns-query
  - https://208.67.222.222/dns-query
  - https://208.67.220.220/dns-query
  - https://194.242.2.2/dns-query
  - https://194.242.2.3/dns-query
  proxy-server-nameserver:
  - https://dns.alidns.com/dns-query
  - https://doh.pub/dns-query
  - https://doh.360.cn/dns-query
  - https://1.1.1.1/dns-query
  - https://1.0.0.1/dns-query
  - https://208.67.222.222/dns-query
  - https://208.67.220.220/dns-query
  - https://194.242.2.2/dns-query
  - https://194.242.2.3/dns-query
  nameserver-policy:
    geosite:private,cn,geolocation-cn:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
    - https://doh.360.cn/dns-query
    geosite:google,youtube,telegram,gfw,geolocation-!cn:
    - https://1.1.1.1/dns-query
    - https://1.0.0.1/dns-query
    - https://208.67.222.222/dns-query
    - https://208.67.220.220/dns-query
    - https://194.242.2.2/dns-query
    - https://194.242.2.3/dns-query
tun:
  stack: gvisor
  device: Mihomo
  auto-route: true
  strict-route: false
  auto-detect-interface: true
  dns-hijack:
  - any:53
  mtu: 1500
  enable: false
profile:
  store-selected: true
proxies:
- name: 剩余流量：102.91 GB
  type: ss
  server: aq.kinxine.top
  port: 39231
  cipher: chacha20-ietf-poly1305
  password: 5c7a542b-e891-41b5-8d4b-3109c4fb9a55
  udp: true
- name: 距离下次重置剩余：15 天
  type: ss
  server: aq.kinxine.top
  port: 39231
  cipher: chacha20-ietf-poly1305
  password: 5c7a542b-e891-41b5-8d4b-3109c4fb9a55
  udp: true
- name: 套餐到期：2024-08-31
  type: ss
  server: aq.kinxine.top
  port: 39231
  cipher: chacha20-ietf-poly1305
  password: 5c7a542b-e891-41b5-8d4b-3109c4fb9a55
  udp: true
- name: 美国
  type: ss
  server: aq.kinxine.top
  port: 39231
  cipher: chacha20-ietf-poly1305
  password: 5c7a542b-e891-41b5-8d4b-3109c4fb9a55
  udp: true
- name: 香港
  type: ss
  server: aq.kinxine.top
  port: 32098
  cipher: chacha20-ietf-poly1305
  password: 5c7a542b-e891-41b5-8d4b-3109c4fb9a55
  udp: true
- name: 新加坡
  type: ss
  server: langbgpsh0.qc77.cn
  port: 14717
  cipher: chacha20-ietf-poly1305
  password: 5c7a542b-e891-41b5-8d4b-3109c4fb9a55
  udp: true
- name: 韩国
  type: ss
  server: aq.kinxine.top
  port: 34932
  cipher: chacha20-ietf-poly1305
  password: 5c7a542b-e891-41b5-8d4b-3109c4fb9a55
  udp: true
- name: 香港D
  type: ss
  server: sg.ikuntes.top
  port: 44411
  cipher: chacha20-ietf-poly1305
  password: 5c7a542b-e891-41b5-8d4b-3109c4fb9a55
  udp: true
- name: 香港Y-G
  type: ss
  server: sg.ikuntes.top
  port: 45267
  cipher: chacha20-ietf-poly1305
  password: 5c7a542b-e891-41b5-8d4b-3109c4fb9a55
  udp: true
- name: 美国R-G
  type: ss
  server: sg.ikuntes.top
  port: 42559
  cipher: chacha20-ietf-poly1305
  password: 5c7a542b-e891-41b5-8d4b-3109c4fb9a55
  udp: true
- name: 米兰
  type: ss
  server: sg.ikuntes.top
  port: 25750
  cipher: chacha20-ietf-poly1305
  password: 5c7a542b-e891-41b5-8d4b-3109c4fb9a55
  udp: true
- name: 日本大阪
  type: ss
  server: aq.kinxine.top
  port: 5936
  cipher: chacha20-ietf-poly1305
  password: 5c7a542b-e891-41b5-8d4b-3109c4fb9a55
  udp: true
- name: 英国-G
  type: ss
  server: sg.ikuntes.top
  port: 37520
  cipher: chacha20-ietf-poly1305
  password: 5c7a542b-e891-41b5-8d4b-3109c4fb9a55
  udp: true
proxy-groups:
- interval: 300
  timeout: 3000
  url: https://www.google.com/generate_204
  lazy: false
  max-failed-times: 3
  hidden: false
  name: 节点选择
  type: select
  proxies:
  - 延迟选优
  - 负载均衡(散列)
  - 负载均衡(轮询)
  icon: https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg
- interval: 300
  timeout: 3000
  url: https://www.google.com/generate_204
  lazy: false
  max-failed-times: 3
  hidden: false
  name: 延迟选优
  type: url-test
  tolerance: 100
  include-all: true
  icon: https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg
- interval: 300
  timeout: 3000
  url: https://www.google.com/generate_204
  lazy: false
  max-failed-times: 3
  hidden: false
  name: 负载均衡(散列)
  type: load-balance
  strategy: consistent-hashing
  include-all: true
  icon: https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg
- interval: 300
  timeout: 3000
  url: https://www.google.com/generate_204
  lazy: false
  max-failed-times: 3
  hidden: false
  name: 负载均衡(轮询)
  type: load-balance
  strategy: round-robin
  include-all: true
  icon: https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg
- interval: 300
  timeout: 3000
  url: https://www.google.com/generate_204
  lazy: false
  max-failed-times: 3
  hidden: false
  name: 谷歌服务
  type: select
  proxies:
  - 节点选择
  icon: https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg
- interval: 300
  timeout: 3000
  url: https://www.google.com/generate_204
  lazy: false
  max-failed-times: 3
  hidden: false
  name: 国外媒体
  type: select
  proxies:
  - 节点选择
  icon: https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg
- interval: 300
  timeout: 3000
  url: https://www.google.com/generate_204
  lazy: false
  max-failed-times: 3
  hidden: false
  name: 电报消息
  type: select
  proxies:
  - 节点选择
  icon: https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg
- interval: 300
  timeout: 3000
  url: https://chatgpt.com
  lazy: false
  max-failed-times: 3
  hidden: false
  name: ChatGPT
  type: url-test
  tolerance: 100
  expected-status: '200'
  include-all: true
  exclude-filter: HK|🇭🇰
  icon: https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg
- interval: 300
  timeout: 3000
  url: https://www.google.com/generate_204
  lazy: false
  max-failed-times: 3
  hidden: false
  name: 微软服务
  type: select
  proxies:
  - 节点选择
  icon: https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg
- interval: 300
  timeout: 3000
  url: https://www.google.com/generate_204
  lazy: false
  max-failed-times: 3
  hidden: false
  name: 苹果服务
  type: select
  proxies:
  - 节点选择
  icon: https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg
- interval: 300
  timeout: 3000
  url: https://www.google.com/generate_204
  lazy: false
  max-failed-times: 3
  hidden: false
  name: 广告过滤
  type: select
  proxies:
  - REJECT
  - DIRECT
  icon: https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg
- interval: 300
  timeout: 3000
  url: https://www.google.com/generate_204
  lazy: false
  max-failed-times: 3
  hidden: false
  name: 全局直连
  type: select
  proxies:
  - DIRECT
  icon: https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg
- interval: 300
  timeout: 3000
  url: https://www.google.com/generate_204
  lazy: false
  max-failed-times: 3
  hidden: false
  name: 漏网之鱼
  type: select
  proxies:
  - 节点选择
  icon: https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg
rule-providers:
  reject:
    type: http
    format: yaml
    interval: 86400
    behavior: domain
    url: https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt
    path: ./ruleset/loyalsoldier/reject.yaml
  icloud:
    type: http
    format: yaml
    interval: 86400
    behavior: domain
    url: https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt
    path: ./ruleset/loyalsoldier/icloud.yaml
  apple:
    type: http
    format: yaml
    interval: 86400
    behavior: domain
    url: https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt
    path: ./ruleset/loyalsoldier/apple.yaml
  google:
    type: http
    format: yaml
    interval: 86400
    behavior: domain
    url: https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt
    path: ./ruleset/loyalsoldier/google.yaml
  proxy:
    type: http
    format: yaml
    interval: 86400
    behavior: domain
    url: https://raw.githubusercontent.com/xingxin1590/rules/main/proxy.txt
    path: ./ruleset/loyalsoldier/proxy.yaml
  direct:
    type: http
    format: yaml
    interval: 86400
    behavior: domain
    url: https://raw.githubusercontent.com/xingxin1590/rules/main/direct.txt
    path: ./ruleset/loyalsoldier/direct.yaml
  private:
    type: http
    format: yaml
    interval: 86400
    behavior: domain
    url: https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt
    path: ./ruleset/loyalsoldier/private.yaml
  gfw:
    type: http
    format: yaml
    interval: 86400
    behavior: domain
    url: https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt
    path: ./ruleset/loyalsoldier/gfw.yaml
  tld-not-cn:
    type: http
    format: yaml
    interval: 86400
    behavior: domain
    url: https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt
    path: ./ruleset/loyalsoldier/tld-not-cn.yaml
  telegramcidr:
    type: http
    format: yaml
    interval: 86400
    behavior: ipcidr
    url: https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt
    path: ./ruleset/loyalsoldier/telegramcidr.yaml
  cncidr:
    type: http
    format: yaml
    interval: 86400
    behavior: ipcidr
    url: https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt
    path: ./ruleset/loyalsoldier/cncidr.yaml
  lancidr:
    type: http
    format: yaml
    interval: 86400
    behavior: ipcidr
    url: https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt
    path: ./ruleset/loyalsoldier/lancidr.yaml
  applications:
    type: http
    format: yaml
    interval: 86400
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt
    path: ./ruleset/loyalsoldier/applications.yaml
  openai:
    type: http
    format: yaml
    interval: 86400
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml
    path: ./ruleset/blackmatrix7/openai.yaml
rules:
- DOMAIN-SUFFIX,googleapis.cn,节点选择
- DOMAIN-SUFFIX,gstatic.com,节点选择
- DOMAIN-SUFFIX,xn--ngstr-lra8j.com,节点选择
- DOMAIN-SUFFIX,github.io,节点选择
- DOMAIN,v2rayse.com,节点选择
- RULE-SET,openai,ChatGPT
- RULE-SET,applications,全局直连
- RULE-SET,private,全局直连
- RULE-SET,reject,广告过滤
- RULE-SET,icloud,微软服务
- RULE-SET,apple,苹果服务
- RULE-SET,google,谷歌服务
- RULE-SET,proxy,节点选择
- RULE-SET,gfw,节点选择
- RULE-SET,tld-not-cn,节点选择
- RULE-SET,direct,全局直连
- RULE-SET,lancidr,全局直连,no-resolve
- RULE-SET,cncidr,全局直连,no-resolve
- RULE-SET,telegramcidr,电报消息,no-resolve
- GEOIP,LAN,全局直连,no-resolve
- GEOIP,CN,全局直连,no-resolve
- MATCH,漏网之鱼
