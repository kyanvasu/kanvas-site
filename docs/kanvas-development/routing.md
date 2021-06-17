---
sidebar_position: 1
---

# Routing

Our Routing component is just a simple wrapper of PhalconPHP’s  which allows the use of the middleware in our own routes.


```php
use Baka\Router\RouteGroup;
use Baka\Router\Route;

$publicRoutes = [
    Route::get('/')->controller('IndexController'),
    Route::get('/status')->controller('IndexController')->action('status'),
];

$privateRoutes = [
];

$routeGroup = RouteGroup::from($publicRoutes)
                ->defaultNamespace('Gewaer\Api\Controllers')
                ->defaultPrefix('/v1');

$privateRoutesGroup = RouteGroup::from($privateRoutes)
                ->defaultNamespace('Gewaer\Api\Controllers')
                ->addMiddlewares('auth.jwt@before', 'auth.acl@before')
                ->defaultPrefix('/v1');

/**
 * @todo look for a better way to handle this
 */
return array_merge(
	$routeGroup->toCollections(), 
  $privateRoutesGroup->toCollections()
);

```


## Defining Routes

Baka Router provides a simple layer to define your routes and map them to controller/actions as  follows:


```php
    Route::get('/')->controller('IndexController'),
    Route::put('/status')->controller('IndexController')->action('status'), 
```



The package is focused on the definition of API routes and allows the creation of CRUD endpoints.


```php
 Route::get($uri)->controller($controller)->action($action);
 Route::post($uri)->controller($controller)->action($action);
 Route::put($uri)->controller($controller)->action($action);
 Route::delete($uri)->controller($controller)->action($action);
```


If you don't specify the controller or action, the method will look for them, following the name convention of the URL.


```php
 Route::post('/auth')->action('login'),

```


Most apps require lots of CRUD and we know having to define a route for each one is a hassle, so we provide a method named _crud_, that creates all 4 routes for you. When the crud method is used, we expect that the name of your route is the same as the controller's name. But, if the name of the route has a separator, ex.: “-”, you need to specify the controller's name.


```
    Route::crud('/notifications'),
    Route::crud('/system-modules')->controller('SystemModulesController'),
```


This CRUD method allows you to specify the controller, but it will expect the name of your function to follow this convention:



*   index for GET: /
*   getById for GET : /{id}
*   create for POST : /
*   edit for PUT : /{id}
*   delete for DELETE : /{id}

```php
 public function index(): Response
 public function getById($id): Response
 public function create(): Response
 public function edit($id): Response
 public function delete($id): Response

```

Sometimes we won't need one of the current functions to handle all the routes. We may want to ignore one because we may want to name it some other way for any number of reasons. For this scenario, the following function is used:


```php
 Route::crud('/users')->notVia('post'),
```


This is telling the function to handle all the routes minus POST. You can also pass multiples (POST, PUT)


```php
 Route::crud('/users')->notVia('post'),
 Route::crud('/users')->notVia('post', 'put'),
```


Finally, you will need to return the collection from the router group.


```php
  return $publicRoutesGroup->toCollections()
```


If you have multiple groups, you will need to merge them. 


```php
  return array_merge(
  	$publicRoutesGroup->toCollections(), 
    $privateRoutesGroup->toCollections()
);
```