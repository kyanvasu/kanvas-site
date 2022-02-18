---
sidebar_position: 6
---

# Regions

Regions are location company can configure to setup the warehouse location. Regional warehouse is a lot more than a bunch of heavy equipment quickly moving masses of product in and out its doors. A successful warehousing strategy involves the building itself, the location of the facility, good management, a good culture and work ethic, solid processes, and some equipment to do the heavy lifting.


# Methods

```php

//create a new product
$product = Regions::create(
    $user, 
    $name,
    $currency,
    $idDefault
);

$region = Regions::getById($id, $user);
$region = Regions::getByUuid($uuid);

```
