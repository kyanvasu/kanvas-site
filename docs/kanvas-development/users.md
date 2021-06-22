---
sidebar_position: 10
---

# Users

A user  always belong to a Company and the moment you signup we create a new company for yourself if you weren't invited. 

![dbrela.png](/dbrela.png)

## Retrieving user Information

You will always have the `userData` DI  for accessing the user information. You can do this on API (Mainly on controller files but if needed anywhere else, a direct call of the DI must me made) or CLI.

The keyword `$this` can be used to access the DI on controller:


```php
if (!$this->userData->hasRole('Default.Admins')) {
            $id = $this->userData->getId();
            $email = $this->userData->email;
        }
```


Furthermore, for referencing it outside of the controller files, the DI must be called directly via the phalcon class `Phalcon\DI`.

userData is an object from our class Canvas\Model\Users


## Determining if the User has the proper Permission

We also attach an ACL to the user object, so you just have to call the **_can_** function(module.action) or the **_hasRole_** function(app.role) or the **_hasRole_** function(role).

These will let you know if the user has permission to run the action you desire.

We also provide the general concept for most of the CRUD use cases using our AclMiddleware. 

By Default, the user can’t perform actions unless you give them permission.

## Working with the ACL

Kanvas uses [Phalcon default ACL](https://docs.phalcon.io/3.4/en/acl), we provide a simpler layer to work with it and adapt it to our ecosystem needs.

**Notice: _We expect you to understand the basics of the ACL, so please review Phalcon Documentation_**


### Add Role:

Specify the App name “dot” the role name. AppName.RoleName

``` php
$this->acl->addRole('Default.Admins');
```


### Add Resource:

Specify the App Name “dot” Resource Name and add the resource permissions options in an array 

```php
$this->acl->addResource(
            'Default.SettingsMenu',
            [
                'company-settings',
                'app-settings',
                'companies-manager',
            ]
        );
```

### Associate Role with it's Resource: 

You can do this via the web UI, but sometimes you will need to do it manually via code by giving in this specific order:

1. Role
2. App “dot” ResourceName
3. Resources you want to allow

```php
$this->acl->allow(
            'Admins',
            'Default.SettingsMenu',
            [
                'company-settings',
                'app-settings',
                'companies-manager',
            ]
        );
```

### Add Role to user: 

You can do this via the web UI, but sometimes you will need to do it manually via code.

1. Retrive the user
2. assignRole(AppName.RolNAme)

```php
$user = Users::findFirst($id);
$user->assignRole(AppNAme.RoleName)
```

### Protecting Routes

We already saw it on the middleware section but  in order to protect a route you have to assign the **auth.jwt** and **auth.acl** middleware


```php
$privateRoutesGroup = RouteGroup::from($privateRoutes)
                ->defaultNamespace('Canvas\Api\Controllers')
                ->addMiddlewares('auth.jwt@before', 'auth.acl@before')
                ->defaultPrefix('/v1');
```


### Sessions

We know JWT API are stateless, but we handle all our JWT token on the DB, this allows us to ban or invalidate Tokens on the fly, giving us more control over user’s actions across our ecosystem.


### Custom User Attributes

As an effort to prevent modification of the user module, we provide you with a hashTable trait that allows you to expand the Users table horizontally.

```php
$this->userData->set('notifications', 1);
$this->userData->get('notifications'); //1;
```