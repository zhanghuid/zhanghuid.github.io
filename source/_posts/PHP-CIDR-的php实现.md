---
title: PHP - CIDR 的php实现
date: 2021-10-21 09:30:21
tags:
---

```php
    /**
     * 计算 CIDR 对应区间的 ip
     *
     * 因业务需求，将排除如下ip：
     *   网络 172.16.26.0 => 保留
     *   第一可用 172.16.26.1 => VPN服务器
     *   最后可用 172.16.27.254 => 保留
     *   广播 172.16.27.255 => 保留
     */
    public static function getAllHostIPAddresses($cidr = '172.16.26.0/23')
    {

        $cidr = explode('/', $cidr);
        // 去掉网络号 + vpn服务器占用
        $startIp = ip2long($cidr[0]) + 2;
        // 去掉广播 + 最后可用 + 初始加上的2
        $endIp = $startIp + pow(2, 32-(int)($cidr[1])) - 2 - 2;
        $count = 0;

        for ($ip = $startIp; $ip < $endIp; $ip++) {
            // yield long2ip($begin);
            print_r(long2ip($ip) . "\n");
            $count++;
        }
        // 减掉最后加上的1
        $ip--;

        echo "count: {$count}; startIp: {$startIp} - ".long2ip($startIp)."; endIp: {$ip} - ". long2ip($ip);
    }
```


> 引用
[ip2long](https://www.php.net/manual/zh/function.ip2long.php)
[CIDR.php](https://gist.github.com/stibiumz/5e6a92a195c50c875649)
[ipv4-subnet-calculator-php](https://github.com/markrogoyski/ipv4-subnet-calculator-php)
[IPTools](https://github.com/S1lentium/IPTools)
