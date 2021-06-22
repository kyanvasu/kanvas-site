---
sidebar_position: 2
---

# Middleware

HTTP Middleware is by no means a new concept, either in general or to PHP. The idea is to wrap your application logic (eg: controllers) up in a way that looks like an onion, having concentric layers of stuff happening before and after the central logic runs: reading from the request and writing to the response. Some layers might notice a problem and exit early, skipping your application logic altogether. Others will add headers to the response, or do other fancy stuff.

The issue with phalcon at the moment is that it doesn't provide a clear interface to assign them to specific routes. By using our previous package we already have this. 


```php
 $privateRoutesGroup = RouteGroup::from($privateRoutes)
                ->defaultNamespace('Canvas\Api\Controllers')
                ->addMiddlewares('auth.jwt@before', 'auth.acl@before')
                ->defaultPrefix('/v1');

```


But in order for you to define your own Middleware you have to define them on its provider MiddlewareProvider 


```php
 protected $globalMiddlewares = [
        // Before the handler has been executed
        NotFoundMiddleware::class => 'before',
    ];

 protected $canvasRouteMiddlewares = [
        'auth.jwt' => AuthenticationMiddleware::class,
        'auth.acl' => AclMiddleware::class,
    ];
```


**Global Middleware** will run for every request while others will only run on defined route groups.

One thing to notice, this document won't cover how to implement a Middleware. We will point you to the [phalcon docs](https://docs.phalcon.io/3.4/en/application-micro), but we do follow a different usage of the returns for the Middleware. If the core wants to change the response type we just throw a proper response exception.

*   NotFoundException
*   UnauthorizedHttpException
*   BadRequestHttpException

Example


```php
 class AuthenticationMiddleware implements MiddlewareInterface
 {
    /**
     * Call me.
     *
     * @param Micro $api
     * @todo need to check section for auth here
     * @return bool
     */
    public function call(Micro $api)
    {
        Return true;
    }

```

*   The Middleware must implement its Interface
*   On the call function you can either, return true to continue, false to halt the request, or throw an exception of the specific request you desire, based on our list of HTTP exceptions
*   From the micro object, you can access services or any method Phalcon provides