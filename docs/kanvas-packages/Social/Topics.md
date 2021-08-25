---
sidebar_position: 3
---

# Topics

Social Apps need different ways to organize information, topics are a useful tool to organize, curate, and reference knowledge within and across kanvas apps. We will provide a simple layer allowing developers to add topics to any entity in their app.

<br />

Features:
- Assign Topic
- Create Topic
- Remove Topic
- List Content by Topic
- List topics of the content

Create a Topic
-------------------
```php
$topic = Topics::create($message, 'business  🏆');
$topic = Topics::createMultiple($message, ['business  🏆', 'Saving']);
```

Update a Topic
-------------------
```php
$topic = Topics::getByName('business  🏆');
$topic = Topics::getBySlug('business');

$topic->name = 'Business 🏆🏆';
$topic->update();
```

Add Topic to Entity
-------------------

Add HasTopics Trait to your Entity

```php
<?php

class Messages implements BaseModel
{
    use hasTopics;
}

```

```php

//find message
$message = Messages::findFirst();

//add a topic to the entity, if it doesn't exist is will be added
$message->addTopic('business  🏆');
$message->addTopics(['business  🏆', 'Saving']);


//add a topic to the entity via a topic object
$topic = Topics::findFirst();
$message->addTopic($topic);
$message->addTopics([$topic]);
```

OR

```php
//find message
$message = Messages::findFirst();

//add a comment to the message 
$messageComment = Topics::addToEntity($message, 'business  🏆');
$messageComment = Topics::addMultiplesToEntity($message, ['business  🏆', 'Saving']);
```

Remove Topics from Entity
-------------------

```php

//find message
$message = Messages::findFirst(3);

$message->removeTopic('business  🏆');
$message->removeTopics(['business  🏆', 'Saving']);
$message->removeAllTopics();

```

OR

```php
//find message
$message = Messages::findFirst(3);

//add a comment to the message 
$messageComment = Topics::removeFromEntity($message, 'business  🏆');
$messageComment = Topics::removeMultiplesFromEntity($message, ['business  🏆', 'Saving']);
$messageComment = Topics::removeAll($message);
```

Sync Topics
-------------------

```php

//find message
$message = Messages::findFirst(3);

//will remove all other topics from entity except these 2
$message->syncTopics(['business  🏆', 'Saving']);
```

OR

```php
//find message
$message = Messages::findFirst(3);

//will remove all other topics from entity except these 2
Topics::syncTopicsOfEntity($message, ['business  🏆', 'Saving']);
```
