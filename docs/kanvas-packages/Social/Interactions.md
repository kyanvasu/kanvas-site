---
sidebar_position: 2
---

# Interactions

```
interaction is the situation or occurrence in which two or more objects or events act upon one another to produce a
new effect; the effect resulting from such a situation or occurrence while reaction is an action 
or statement in response to a stimulus or other event.
```

We all know social networks by now, one of its core features it allowing users to interact with any of its entity. What are interactions? Liking, Saving, Sharing, Rating 

So with this component you can implement these type of interaction on any part of your kanvas app.

# Interaction Contract

To allow a user to interact with any entity in your app , you just need to add these contract to your User Model

Type of interactions
- Like
- Save to List
- Share
- Buy
- Rate

```php
<?php

namespace Kanvas\Packages\Test\Support\Models;

use Kanvas\Packages\Social\Contracts\Interactions\InteractionsTrait;
use Baka\Contracts\Auth\UserInterface;
use Canvas\Models\Users as ModelsUsers;

class Users implements FollowableInterface
{
    use InteractionsTrait;
    //use canManageInteractions;
}

```

Adding the followers trait will provide the model with 2 new functions

Like or Share or AddToList a Entity
-------------------

```php

//find another user 
$user = Users::findFirstByDisplayname('sparohawk');

//current logged in user , likes now this user
$this->userData->likes($user);
```

```php

//find a book
$book = Books::findFirst();

//user will be able to like any phalcon model Entity
$this->userData->likes($book);
$this->userData->share($book);
```

Has Interacted with a Entity
----------

Verify if a user is following the entity

```php

//find a book
$book = Books::findFirst();

//user will be able to like any phalcon model Entity
$this->userData->hasInteracted($book);
```

Remove Interaction of a Entity
----------

```php

//find another user 
$user = Users::findFirstByDisplayname('sparohawk');

//since the user is already likes it , it will remove it interaction
$this->userData->likes($user);
```

OR

```php
//find another user 
$user = Users::findFirstByDisplayname('sparohawk');

//current logged in user , unfollow the entity
$this->userData->removeInteraction($user, EnumsInteractions::LIKE);
```

Interactions Counters
-----

Get the # of Interactions for the specify entity class type

```php

//for the type Books how many interaction does this user have?
$this->userData->getTotalInteractions(Books::class, EnumsInteractions::SAVE);

```

Entity Interactions Counters
-----

Get the # of interactions for the specify entity 

```php
<?php

use Kanvas\Packages\Social\Contracts\Interactions\TotalInteractionsTrait;

class Tags extends BaseModel
{
    use TotalInteractionsTrait;
}

$tag = Tags::findFirst(1);

$totalInteractions = $tag->getTotalInteractions(EnumsInteractions::RATE);
$totalInteractionsLikes = $tag->getTotalInteractions(EnumsInteractions::LIKES);
$totalInteractionsShared = $tag->getTotalInteractions(EnumsInteractions::SHARE);

```

OR 

```php

$tag = Tags::findFirst(1);

$totalInteractions = Interactions::getTotalByEntity($tag, EnumsInteractions::RATE);

```

