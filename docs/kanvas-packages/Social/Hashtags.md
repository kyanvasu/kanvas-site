---
sidebar_position: 6
---

# HashTags

Social Apps need different ways to organize information, hashtags are a useful tool to organize, curate, and reference knowledge within and across kanvas apps. We will provide a simple layer allowing developers to add hashtags to any entity in their app.

<br />

Features:
- Assign tags
- Create tags
- Remove tags
- List Content by tags
- List tags of the content

Create a HashTag
-------------------
```php
$hashTag = Tags::create('#business');
$hashTag = Tags::create('business'); //it can work with both # or without
$hashTag = Tags::createMultiple(['business', 'Saving']);
```

Update a HashTag
-------------------
```php
$hashTag = Tags::getByName('business');
$hashTag = Tags::getBySlug('business');

$hashTag->name = 'Business3';
$hashTag->update();
```

Add HashTag to Entity
-------------------

Add Hashtags Trait to your Entity

```php
<?php

class Messages implements BaseModel
{
    use hasTags;
    //use canManageTags;
}

```

```php

//find message
$message = Messages::findFirst();

//add a topic to the entity, if it doesn't exist is will be added
$message->addTag('business');
$message->addTags(['business', 'Saving']);


//add a topic to the entity via a topic object
$topic = Tags::findFirst();
$message->addTag($topic);
$message->addTags([$topic]);
```

OR

```php
//find message
$message = Messages::findFirst();

//add a tags to the message 
$messageComment = Tags::addToEntity($message, 'business');
$messageComment = Tags::addMultiplesToEntity($message, ['business', 'Saving']);
```

Remove Tag from Entity
-------------------

```php

//find message
$message = Messages::findFirst(3);

$message->removeTag('business');
$message->removeTags(['business', 'Saving']);
$message->removeAllTags();

```

OR

```php
//find message
$message = Messages::findFirst(3);

//add a comment to the message 
$messageComment = Tags::removeFromEntity($message, 'business');
$messageComment = Tags::removeMultiplesFromEntity($message, ['business', 'Saving']);
$messageComment = Tags::removeAll($message);
```

Sync Tags
-------------------

```php

//find message
$message = Messages::findFirst(3);

//will remove all other tags from entity except these 2
$message->syncTags(['business', 'Saving']);
```

OR

```php
//find message
$message = Messages::findFirst(3);

//will remove all other tags from entity except these 2
Tags::syncTagsOfEntity($message, ['business', 'Saving']);
```

List Entity by tags
----------------

List all entity of a specific type attached to this topic

```php

$tags = Tags::findFirstBySlug('business');

$tags->listAllEntities(Messages::class, $limit, $page, $sort);
```

