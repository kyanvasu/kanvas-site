---
sidebar_position: 3
---

# Attributes

A product is the item offered for sale. A product can be a service or an item. It can be physical or in virtual or cyber form. Every product is made at a cost and each is sold at a price. The price that can be charged depends on the market, the quality, the marketing and the segment that is targeted. 

## Key Product Concepts:

- Products can contain zero or more inventory items, including other products
- Only products can be included in fulfillment requests
- PCB Assemblies can be linked to a Product for building into inventory
- Products contain assembly, program, and testing instructions
- Products create a new inventory item with the same SKU as the product
- You cannot add a product with the SKU of an existing inventory item
- Product inventory items can be used to build PCBs (You can add a daughter-board PCB product to another PCB, for example)


# Methods

```php

//create a new product
$product = Product::create(
    $company, 
    $name,
    $category,
    $description,
    $shortDescription,
    $warrantyTerms,
    $isPublished
);

$products = Products::createMultiple([
    [
        $company, 
        $name,
        $category,
        $description,
        $shortDescription,
        $warrantyTerms,
        $isPublished
    ]
]);

```

Find a by Id

```php

//find category by id
$product = Product::getById(3);
$product = Product::getByUuid('000-000-0000-000');
$product = Product::getBySlug('slug');

//or
$product = Product::getById(4, $company);


```

Update Product

```php
//update category
$product = Product::getById(4, $company);
$product->name = 'name';
$product->saveOrFail();


$product->publish();
$product->unpublished();

```

Product change category


```php
//Product Category
$product = Product::getById(4, $company);
$product->addCategory($category);
$product->addCategories([$category, $category]);
$product->removeCategory($category);
$product->replaceCategory($category, $newCategory);

//get product categories

$product->getCategories();
$product->getCategory($category);

```

Product Attributes

```php
//add product in category
$product = Product::getById(4);
$product->addAttribute($attribute, $value);
$product->addAttributes([
    [$attribute, $value],
    [$attribute2, $value2]
]);

//result set of products
$product->removeAttribute($attribute);
```

