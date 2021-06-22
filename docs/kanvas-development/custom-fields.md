---
sidebar_position: 12
---

# Custom Fields

This is a term you will find in WordPress, where WordPress allows users to add additional information when writing a post. We take this same concept and apply it to any of the different modules within your own app.

You can add new fields per your requirements. These fields will be available to all the users added to your organization's app.

For almost all of the fields that you create, you need to specify the following:


*   **Label**: Specify a name for the field
*   **Field Properties**: Specify properties of the field such as description, field values and so on

**Field Properties are required to be one of the following field types:**


<table>
  <tr>
   <td><strong>Field Type</strong>
   </td>
   <td><strong>Other Details</strong>
   </td>
  </tr>
  <tr>
   <td>Text
   </td>
   <td>Length: Maximum 255 characters are allowed.
   </td>
  </tr>
  <tr>
   <td>Integer
   </td>
   <td>Length: Maximum 9 digits are allowed.
   </td>
  </tr>
  <tr>
   <td>Date & Time
   </td>
   <td>Format: YYYY/MM/DD HH:MM Note: Date format will be changed according to user's time zone settings.
   </td>
  </tr>
  <tr>
   <td>Email
   </td>
   <td>Specify a valid email address
   </td>
  </tr>
  <tr>
   <td>Pick list
   </td>
   <td>Pick List Values: Specify the pick list values
   </td>
  </tr>
  <tr>
   <td>Multi-select Pick list
   </td>
   <td>Pick List Values: Specify the pick list values
   </td>
  </tr>
  <tr>
   <td>Text Area
   </td>
   <td>Specify the character limit: Small is 2000 characters, Large is 32000 characters.
<p>
Text Area Large will not be available while adding criteria in any feature.
</p>
<p>
Both Text Area Large and Small cannot be used for sorting records in ascending or descending order.
</p>
   </td>
  </tr>
  <tr>
   <td>Checkbox
   </td>
   <td>-
   </td>
  </tr>
</table>


## How to Add a Custom Field

First, you need to activate a custom field on any model by using `Baka\Contracts\CustomFields\CustomFieldsTrait`

This will give you the following functionalities
- set(name, value)
- get(name)
- getAll()
- create(name)

So you can add any field you want to this model, this will save it to the DB and Redis for faster performance.

Also for your API CRUDs, you will need to have its controller implement the trait CrudCustomFieldsBehaviorTrait. If you want to do it yourself just make sure to call the function

```
$this->model->setCustomFields($request->getPostData());
```
before saving the entity.

By version 0.1.5 of Kanvas you can also create this dynamic field via its web UI

**Note:** Custom Fields Search will use Elasticsearch

**Complex Filter (0.2.5)**