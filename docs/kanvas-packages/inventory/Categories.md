---
sidebar_position: 2
---

# Categories

Product Categories are typically created by the owner of the store to group product together.

# Methods

```php

//create a new category
$category = Category::create(
    $company, 
    $name,
    $code,
    [
        'position' => $position,
        'code' => $code
    ]
);

```

Add a child category

```php

//create a new category
$category = Category::getById($company, $id);
$category->addChild($child);

//or 

$category->setParent($parent);

```

Find a category

```php

//find category by id
$category = Category::getById(3);

//or
$category = Category::getById(4, $company);

//or
$category = Category::getBySlug($slug, $company);

```

Update Category

```php
//find message
$category = Category::getById(4, $company);
$category->name = 'name';
$category->slug = 'slug';
$category->saveOrFail();


//or

$category->addChile($child);
$category->setParent($parent);
$category->setPosition($position);
$category->publish();
$category->unPublish();

```

Get all categories

```php
//find message
$category = Category::getAll($company, $page, $limit);

```