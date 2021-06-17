---
sidebar_position: 6
---

# Request

[Request](https://docs.phalcon.io/4.0/en/api/phalcon_http#http-request) is a component that encapsulates the actual HTTP request (usually originated by a browser) and sent to our application. We are just extending Phalcon\Http\Request and adding a couple of methods to make our life easier: 

*   **_getPostData()_** : Will get you either a normal  urlencoded form data or  Raw json data form a request. We understand this is not ideal, things should be separated, but since we have some legacy code that send both things to the same app, we find this easier.
*   **_getPutData()_** : Same as the previous function but for the PUT HTTP request method. Will work with urlencoded form data and Raw JSON data.

We also provide the Swoole Request class. For those who don't know, _**Swoole** is an event-based & concurrent framework for internet applications, written in C, for PHP. **Swoole** includes components for different purposes: Server, Task Worker, Timer, Event and Async IO. With these components, **Swoole** allows you to build many features._

Swoole is used to replace our PHP-FPM service for a pure PHP server. This gives the app a 2x speed up, since you won't have to parse the request each time. The downside, we have to overwrite the PhalconPHP Request Class to work with Swoole.
