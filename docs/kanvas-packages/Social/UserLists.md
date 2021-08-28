---
sidebar_position: 7
---

# User List

Users need ways to organize entity they interact across a social app , for this they use lists.

<br />

Features:
- Create Lists
- Add Element in the List
- Remove element from the list
- Delete a list
- List elements inside a list
- List all list

```php
<?php

class Users implements BaseModel
{
    use canManageLists;
}

```

Create a List
-------------------

```php
$options = [
    'is_public' => true,
    'is_default' => true
];

$this->userData->createList('name', 'description', array $options);
```
OR
```php
UserList::create($user, 'name', 'description', $options);
```

Update a List
-------------------

```php
$userList = $this->userData->getListById($id);
$userList = $this->userData->getList('name');
$userList->name = 'newName';
$userList->update();

$userList->setPublic();
$userList->setPrivate();
$userList->setDefault();
$userList->removeDefault();

```

OR 

```php
$userList = UserList::get($this->userData, 'name');
$userList->name = 'newName';
$userList->update();

$userList->setPublic();
$userList->setPrivate();
$userList->setDefault();
$userList->removeDefault();
```

Add Entity to the List
-------------------

```php

//find a entity
$book = Book::findFirst();
$user = Users::findFirst();
$game = Games::findFirst();

//within a list you can add multiple type of entities
$this->userData->addToList('name', $book);
$this->userData->addToList('name', $user);
$this->userData->addToList('name', $game);

```

OR

```php
$this->userData->getList('name')->add($book);
$this->userData->getList('name')->add($user);
$this->userData->getList('name')->add($game);
```

OR

```php
UserList::get($this->userData,'name')->add($book);
UserList::get($this->userData,'name')->add($user);
UserList::get($this->userData,'name')->add($game);
```

Update Entity to the List
-------------------

```php

//find a entity
$book = Book::findFirst();
$user = Users::findFirst();
$game = Games::findFirst();

//set as ping
$this->userData->getList('name')->get($book)->setPin();

//swap for another entity
$this->userData->getList('name')->swap($book, $game);
```

OR

```php
UserList::get($this->userData,'name')->get($book)->setPin();
UserList::get($this->userData,'name')->swap($book, $game);
```

Remove Entity from List
-------------------

```php

//find a entity
$book = Book::findFirst();
$user = Users::findFirst();
$game = Games::findFirst();

//within a list you can add multiple type of entities
$this->userData->deleteFromList('name', $book);
$this->userData->deleteFromList('name', $user);
$this->userData->deleteFromList('name', $game);

```

OR

```php
$this->userData->getList('name')->delete($book);
$this->userData->getList('name')->delete($user);
$this->userData->getList('name')->delete($game);
$this->userData->getListById($id)->delete($game);

//delete all
$this->userData->getList('name')->deleteAll();
$this->userData->getList('name')->clear();
```

OR

```php
UserList::get($this->userData,'name')->delete($book);
UserList::get($this->userData,'name')->delete($user);
UserList::get($this->userData,'name')->delete($game);
```


List Entity from list
----------------

List all entity of a specific list

```php
$list = $this->userData->getList('name')->getAll();
$list = $this->userData->getList('name')->getAll($page, $limit, $order);
```
OR

```php
$list = UserList::get($this->userData,'name')->getAll($page, $limit, $order);
```

List by specifics type
----
```php
$list = $this->userData->getList('name')->getAllByType(Books::class);
$list = $this->userData->getList('name')->getAllByType(Books::class, $page, $limit, order);
```
OR

```php
$list = UserList::get($this->userData,'name')->getAllByType(Books::class, $page, $limit, order);
```