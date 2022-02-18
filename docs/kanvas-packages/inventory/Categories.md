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
$user->setCompany($company);
$category = Category::getById($id, $user);
$category->addChild($child);

//or 

$category->setParent($parent);

```

Find a category

```php

//find category by id
$category = Category::getById(3);
$category = Category::getByUuid('000-000-0000-000');

//or
$category = Category::getById(4, $user);

//or
$category = Category::getBySlug($slug, $user);

```

Update Category

```php
//update category
$category = Category::getById(4, $user);
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
//get all categories
$category = Category::getAll($user, $page, $limit);

```

Add Products to Category

```php
//add product in category
$category = Category::getById(4);
$category->addProduct($product);

//result set of products
$category->addProducts($products);

// remove product from category

$category->removeProduct($product);
$category->removeProducts($products);

```

Get all products in category

```php
//find message
$category = Category::getById(4);
$category->getProducts($page, $limit);

```