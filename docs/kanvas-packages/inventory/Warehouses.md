---
sidebar_position: 5
---

# Warehouse

A warehouse is a building for storing goods. Warehouses are used by manufacturers, importers, exporters, wholesalers, transport businesses, customs, etc. They are usually large plain buildings in industrial parks on the outskirts of cities, towns, or villages.

In our system each warehouse belongs to a region , allowing use to provide multi geo location warehouses

# Methods

```php

//create a new product
$product = Warehouse::create(
    $user, 
    $region,
    $name,
    $isDefault,
    $isPublished
);

$warehouse = Warehouse::getById($id, $user);
$warehouse = Warehouse::getByUuid($uuid);


$warehouse->region = $region;
$warehouse->saveOrFail();

```
