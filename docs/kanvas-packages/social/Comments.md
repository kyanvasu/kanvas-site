---
sidebar_position: 3
---

# Introduction

We all know what a comment system is , and if you still need some clarification

```
Comment systems, also known as commenting software, allow users to comment on a website, typically below a news article or blog post. Comment systems give website visitors the ability to engage with a website by commenting their views or reaction to the content on the page.
```

Now , we provide the layers to add comments to any entity in your app

Our comment system has the following feature
- Created / Updated / Delete
- Add replied to a Comment
- Add Interactions to any comment (likes)
- Add reaction to any comment (emojis)

Add Comment to Entity
-------------------

```php

//find message
$message = Messages::findFirst();

//current logged in user , likes now this user
$message->addComment($user, 'text');
```

OR

```php
//find message
$message = Messages::findFirst();

//add a comment to the message 
$messageComment = Comments::add($message, $user, 'text');
```

Update Comment of a Entity
-------------------

```php

//find message
$message = Messages::findFirst(3);

//current logged in user , likes now this user
$message->updateComment($user, 'text');
```

OR

```php
//find message
$message = Messages::findFirst(3);

//add a comment to the message 
$messageComment = Comments::update($message, $user, 'text');
```

Get All Comments
-------------------

```php

//find message
$message = Messages::findFirst(3);

//get all the comments of the given entity
$message->getComments($page = 1, $limit = 25);
```

OR

```php
//find message
$message = Messages::findFirst(3);

//add a comment to the message 
$messageComment = Comments::getAll($message, $page = 1, $limit = 25);
```

Get a Single Comments
-------------------

```php

//find message
$message = Messages::findFirst(3);

//get all the comments of the given entity
$message->getComment($id);
```

OR

```php
//find message
$message = Messages::findFirst(3);

//add a comment to the message 
$messageComment = Comments::getOne($message, $id);
```


Delete Comment of a Entity
-------------------

```php

//find message
$message = Messages::findFirst(3);

//current logged in user , likes now this user
$message->deleteComment($user);
```

OR

```php
//find message
$message = Messages::findFirst(3);

//add a comment to the message 
$messageComment = Comments::delete($message, $user, 'text');
```

Add a Reply to a Comment
-------------------

```php

//find message
$message = Messages::findFirst(3);

//current logged in user , likes now this user
$message->getComment($id)->reply('text', $user);
```

OR

```php
//find message
$message = Messages::findFirst(3);

//add a comment to the message 
$messageComment = Comments::getOne($message, $id)->reply('text', $user);
```