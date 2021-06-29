---
sidebar_position: 17
---

# Swoole Server

Swoole provides an internal HTTP server, replacing PHP-FPM to manage your PHP processes. By using Swoole we see a 50% increase in our API response time because it won’t have to parse your code for every request. In case you decide to use it, you will need to just run

**_./server start_**

**Note:** if you decide to use Swoole, remember you will need to restart your server in other for code to be refreshed on any changes.

We provide examples in storage/ci/nginx-swoole on how to configure Swoole with NGINX.