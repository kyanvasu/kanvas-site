---
sidebar_position: 3
---

# Following

We all know social networks by now, one of its core features it allowing users to follow things to provide a network effect, the more entities I follow the more engagement it will provide the user to the platform.

We will now show you how to implement it on your kanvas app

# Follow Contract

To allow a user to follow any entity in your app , you just need to add these contract to your User Model

```php
<?php

namespace Kanvas\Packages\Test\Support\Models;

use Kanvas\Packages\Social\Contracts\Follows\FollowableInterface;
use Kanvas\Packages\Social\Contracts\Follows\FollowersTrait;
use Baka\Contracts\Auth\UserInterface;
use Canvas\Models\Users as ModelsUsers;

class Users implements FollowableInterface
{
    use FollowersTrait;
}

```

Adding the followers trait will provide the model with 2 new functions

Follow a Entity
-------------------

```php

//find another user 
$user = Users::findFirstByDisplayname('sparohawk');

//current logged in user , follow now this user
$this->userData->follow($user);
```

```php

//find a book
$book = Books::findFirst();

//user will be able to follow any phalcon model Entity
$this->userData->follow($book);
```

isFollowing a Entity
----------

Verify if a user is following the entity

```php

//find a book
$book = Books::findFirst();

//user will be able to follow any phalcon model Entity
$this->userData->isFollowing($book);
```

unFollowing a Entity
----------

```php

//find another user 
$user = Users::findFirstByDisplayname('sparohawk');

//since the user is already following it , it will unfollow
$this->userData->follow($user);
```

OR

```php
//find another user 
$user = Users::findFirstByDisplayname('sparohawk');

//current logged in user , unfollow the entity
$this->userData->unFollow($user);
```

Following Counters
-----

Get the # of following for the specify entity class type

```php
//current logged in user , get the total # of followers from all entities
$this->userData->getTotalFollowers();

//to get the total followers of any other entity
$book = Books::findFirst();
$total = Follow::getTotalFollowers($book);

//Or add the trait to the book entity
$book->getTotalFollowers();

```

Followers Counters
-----

Get the # of followers for the specify entity class type

```php
//current logged in user , get the total # of followers from all entities
$this->userData->getTotalFollowing();

//for the current user get the total # of followers of type user
$this->userData->getTotalFollowing(Users::class);

//for the current user get the total # of followers of type books
$this->userData->getTotalFollowing(Books::class);

```

Attach Events
-----

You will have 2 events you can use to attach logic after creating or updating a follow

- kanvas.social.follow:afterCreate
- kanvas.social.follow:afterUpdate