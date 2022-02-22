---
sidebar_position: 1
---

# Introduction

Kanvas Inventory package , provides a inventory subsystem to your kanvas app

What do we consider a inventory layer?
- Product Management
  - Variants
  - Attributes
- Categories
- Regions
- Warehouses
- Search


# Notes

If we want to overwrite the current user logged in Company , we can use the following code

```php
$user->setCompany($company);
```