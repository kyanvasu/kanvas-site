---
sidebar_position: 4
---

# Comments

We all know what a comment system is , and if you still need some clarification

```
Comment systems, also known as commenting software, allow users to comment on a website, 
typically below a news article or blog post. Comment systems give website visitors the 
ability to engage with a website by commenting their views or reaction to the content on the page.
```

Now , we provide the layers to add comments to any entity in your app

Our comment system has the following feature
- Created / Updated / Delete
- Add replied to a Comment
- Add Interactions to any comment (likes)
- Add reaction to any comment (emojis)
- Mentions
- Notifications
- Commentable Controller Trait

Add Comment to Entity
-------------------

Add the Commentable Trait to your Entity

```php
<?php

class Messages implements BaseModel
{
    use Commentable
}

```

```php

//find message
$message = Messages::findFirst();

//add the comment to the entity
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

//if it doesn't exist throw exception
$comment = $message->getCommentById($id);

$user = $this->userData;

//update the comment for this current msg
//if the user is not the owner of this comment it will throw a AuthException
$comment->update($user, 'text');

```

OR

```php
//find message
$message = Messages::findFirst(3);

//add a comment to the message 
$messageComment = Comments::getById($message, $id)->update($user, 'text');
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

//get all comments
$messageComment = Comments::getAll($message, $page = 1, $limit = 25);
```

Get a Single Comments
-------------------

```php

//find message
$message = Messages::findFirst(3);

//get all the comments of the given entity
$message->getCommentById($id);
```

OR

```php
//find message
$message = Messages::findFirst(3);

//get one by id
$messageComment = Comments::getById($message, $id);

//like the comment
$this->user->likes($messageComment);
```


Delete Comment of a Entity
-------------------

```php

//find message
$message = Messages::findFirst(3);

//delete the comment and verify the user owns it
$message->getCommentById($id)->delete($user);
```

OR

```php
//find message
$message = Messages::findFirst(3);

//delete a comment from this message 
$messageComment = Comments::delete($message, $commentId, $user);
```

OR

```php
//find message
$message = Messages::findFirst(3);

//delete a comment from this message 
$messageComment = Comments::deleteAll($message);
```

Add a Reply to a Comment
-------------------

```php

//find message
$message = Messages::findFirst(3);

//current logged in user , likes now this user
$message->getComment($id)->reply($user, 'text');
```

OR

```php
//find message
$message = Messages::findFirst(3);

//add a comment to the message 
$messageComment = Comments::getById($message, $id)->reply($user, 'text');
```

# Controller

Once you have a commentable entity you will need to expose it via a controller, allowing the application to create comments or replies for that given entity.

The first thing you will need to do is 

```php
<?php

class RoomComments
{
    use CommentableController; //or CommentableRoute?

    protected ModelInterface $commentParentEntity;
    protected int|string $parentId;

    /**
     * Set the entity the comment will belong to
     **/
    public function setCommentEntity()
    {
        $this->parentId = (int) $this->router->getParams()['messageId'];
        $this->commentParentEntity = Rooms::findFirst($this->parentId);

        if (!$this->parentId) {
            throw new RuntimeException('Not Found');
        }
}

```

By adding the CommentableController you will have the following Routes:

List all comments for he given entity <br />
`- GET  /entity/{id}/comments `

Add a comment to the entity <br />
`- POST /entity/{id}/comments`

Add a reply to a comment <br />
`- POST /entity/{id}/comments/{id}`

Get a specify Comment <br />
`- GET /entity/{id}/comments/{id}`