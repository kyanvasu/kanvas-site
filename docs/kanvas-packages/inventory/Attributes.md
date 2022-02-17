---
sidebar_position: 3
---

# Attributes

Product attributes are the properties that describe a product. They include details that are tangible and intangible, subjective and objective. All of this information enables shoppers to find, compare, and choose products.

## Product attributes examples
Attributes vary but can apply to multiple products and product categories. Here are a few examples:

- Materials used in construction
- Design features
- Lifestyle photographs
- How-to videos
- Country of origin


# Methods

```php

//create a new attribute
$attribute = Attribute::create(
    $company, 
    $name,
);

```

Find a attribute

```php

//find category by id
$attribute = Attribute::getById(3);
$attribute = Attribute::getByUuid('000-000-0000-000');

//or
$attribute = Attribute::getById(4, $company);


```

Update Attribute

```php
//update category
$attribute = Attribute::getById(4, $company);
$category->name = 'name';
$category->saveOrFail();

```

Get all Attribute

```php
//get all categories
$attribute = Attribute::getAll($company, $page, $limit);

```

Add Attribute to a Product

```php
//add product in category
$product = Product::getById(4);
$product->addAttribute($attribute, $value);

//result set of products
$product->removeAttribute($attribute);


```

