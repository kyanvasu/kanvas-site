---
sidebar_position: 4
---

# Products

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
$user->setCompany($user);
$product = Product::create(
    $user, 
    $name,
    $category,
    $description,
    $shortDescription,
    $warrantyTerms,
    $isPublished
);

$products = Products::createMultiple([
    [
        $user, 
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
$user->setCompany($company);
$product = Product::getById(4, $user);


```

List

```php

//find category by id
$products = Products::getAll($user, $page, $limit);


```

Update Product

```php
//update category
$product = Product::getById(4, $user);
$product->name = 'name';
$product->saveOrFail();


$product->publish();
$product->unpublished();

```

Product change category


```php
//Product Category
$product = Product::getById(4, $user);
$product->addCategory($category);
$product->addCategories([$category, $category]);
$product->removeCategory($category);
$product->moveCategory($category, $newCategory);

//get product categories
$product->getCategories();
$product->getParentCategory();

```

Product Attributes

```php
//add product in category
$product = Product::getById(4);
$product->addAttribute($attribute, $value);
$product->updateAttribute($attribute, $value);

$product->addAttributes([
    [$attribute, $value],
    [$attribute2, $value2]
]);

//result set of products
$product->removeAttribute($attribute);
```

Warehouse

```php
//update category
$product = Product::getById(4, $user);

$product->addWarehouse($warehouse);
$product->addWarehouses($warehouses);
```

# Variants

Products with variants are products that have similarities, they are based on the same model, but differ in some aspects from one another.

They offer customers various purchase options for a product such as different colors, sizes, dimensions, flavors, etc.

There are more and more products with variants in all businesses, here are some examples:

- T-shirts available in different colors and sizes
- Sofas varying in colors and number of seats
- Mattresses with different dimensions (for one person or 2 people)
- Smartphones varying in color and screen size
- Screwdrivers available in different dimensions
- Teas by packaging
- Fruit compotes with different flavors


# Methods

Add Variants to Product

```php
//Product Category
$product = Product::getById(4, $user);


$product->addVariant([
    'name' => 'name',
    'description' => 'description',
    'short_description' => 'short description',
    'position' => 1,
    'sku' => 'sku', //required and unique
    'ean' => 'ean',
    'barcode' => 'barcode',
    'serial_number' => 'serial_number',
    'is_published' => true
]);

Variant::create(
    $product,
    [
        'name' => 'name',
        'description' => 'description',
        'short_description' => 'short description',
        'position' => 1,
        'sku' => 'sku', //required and unique
        'ean' => 'ean',
        'barcode' => 'barcode',
        'serial_number' => 'serial_number',
        'is_published' => true
    ]
);

```

Find Variant for product

```php
//Product Category
$product = Product::getById(4, $user);


$variant = $product->getVariantBySku('sku');
$variant = $product->getVariantByUuid('uuid');
$variant = $product->getById(4);

$variant->publish(); //
$variant->changePosition(1);

$variant = Variant::getById(4, $user);
$variant = Variant::getBySku('sku', $user);
$variant = Variant::getByUuid('sku', $user);

```

Find All Variant for product

```php
//Product Category
$product = Product::getById(4, $user);


$variant = $product->getAllVariants($page, $limit);
$variant = Variant::getAll($user, $page, $limit);

```

Update Variant

```php
//Product Category
$product = Product::getById(4, $user);


$variant = $product->getVariantBySku('sku');

$variant->name = 'name';
$variant->description = 'description';
$variant->saveOrFail();

```

Update Variant Warehouse

```php
//Product Category
$product = Product::getById(4, $user);


$variant = $product->getVariantBySku('sku');

$variant->addWarehouse(
    $warehouse,
    [
    'quantity' => 1,
    'price' => 2,
    'sku' => 3,
    'position' => 4
    ]
);

$variant->moveWarehouses($warehouse, $newWarehouse);
$variant->removeWarehouse($warehouse);

$variant->getWarehouses();
$variantWarehouse = $variant->getWarehouse($warehouse);
$variantWarehouse->price = 3;
$variantWarehouse->update();

$variantWarehouse->getPriceHistory();
``` 

Variants Attributes

```php
//add product in category
$product = Product::getById(4, $user);


$variant = $product->getVariantBySku('sku');

$variant->addAttribute($attribute, $value);
$variant->addAttributes([
    [$attribute, $value],
    [$attribute2, $value2]
]);

//result set of products
$variant->removeAttribute($attribute);
```