---
sidebar_position: 5
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
$topic = Topics::create('business  🏆');
$topic = Topics::createMultiple(['business  🏆', 'Saving']);
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
    //use canManageTopics;
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

//add a topics to the message 
$topics = Topics::addToEntity($message, 'business  🏆');
$topics = Topics::addMultiplesToEntity($message, ['business  🏆', 'Saving']);
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

//remove a topics to the message 
$topics = Topics::removeFromEntity($message, 'business  🏆');
$topics = Topics::removeMultiplesFromEntity($message, ['business  🏆', 'Saving']);
$topics = Topics::removeAll($message);
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

List Entity by Topics
----------------

List all entity of a specific type attached to this topic

```php

$topic = Topics::findFirstBySlug('business');

$topic->listAllEntities(Messages::class, $limit, $page, $sort);
```

# Controller

Once you have entities with hasTopic trait you will need to expose route allowing users to filer content by them.


```php
<?php

class RoomsTopics
{
    use TopicableController; //or TopicableRoutes?

    protected ModelInterface $topicsBelongingEntity;
    protected int|string $parentId;

    /**
     * Set the entity the comment will belong to
     **/
    public function setTopicsEntity()
    {
        $this->parentId = (int) $this->router->getParams()['roomsId'];
        $this->topicsBelongingEntity = Rooms::findFirst($this->parentId);

        if (!$this->parentId) {
            throw new RuntimeException('Not Found');
        }
}

```

By adding the TopicableController you will have the following function to use for your routes:

List all topics for the given entity type <br />
`- getAll` 

Example: <br />
`- GET  /entity/0/topics` 

Get all entities attach to the current topic id<br />
`- getAllByEntityId(int|string $id)`

Example: <br />
`- GET /entity/0/topics/{id}`