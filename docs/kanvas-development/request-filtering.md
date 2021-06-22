---
sidebar_position: 5
---

# Request Filtering 

Using rapid CRUD is not enough, we have to provide the ability to search within a model, within a model's custom fields and within a model's descendant relationships.

For these we provide RequestUriToSql or RequestUriToElastic. We understand we need to provide complex search for different types of systems and if we only focus on SQL, we would have to use joins, so we decided against it and require the developers to go a different route, using elasticsearch + [elastic search sql plugin](https://github.com/NLPchina/elasticsearch-sql). This allows us to perform complex queries without using joins, it's all up to the developer to create a proper structure in elastic to use nested queries. 

In order to search by query strings, you need to understand how we use it and its operators.

``` 
GET - /v1/companies?q=(field1:value1,field2:value2|value3)

GET - /v1/companies?relationships=files

GET - /v1/companies?q=(field1:value1,field2:value2|value3)&columns=(id)

GET - /v1/companies?cq=(field1>value1)

GET - /v1/companies?rq[model_name]=(field1&lt;value1|value2)
```

Operators

Parameters are passed in the format field operator value. Valid operators are 

**SQL**

```
 protected $operators = [
        ':' => '=',
        '>' => '>=',
        '<' => '<=',
        '~' => '!=',
        '¬' => 'BETWEEN',
    ];
```


**ElasticSearch**

```
    protected $operators = [
        '~' => '=',
        ':' => 'LIKE',
        '>' => '>=',
        '<' => '<=',
        '!' => '<>',
        '¬' => 'BETWEEN',
    ];
```


_Note: We have some inconsistency between SQL and Elastic, we will fix this in version 0.5.3_

Multiple fields can be searched by separating them with a `,` . You can search a field by several values by separating said values with `|` (equivalent to SQL's OR).

Let’s run over a few examples
<br />

## Query a Model

```
GET - /v1/model?q=(field1:value1,field2:value2|value3)

SQL - `Select * from model where field1 = value1 and (field2 = value2 or field2 = value3)
```

<br />

## Specify the Columns

```
GET - /v1/companies?q=(field1:value1,field2:value2|value3)&columns=(id)

SQL - Select id from model where field1 = value1 and (field2 = value2 or field2 = value3)
```

<br />

## Query Custom Fields

Custom fields are discussed later on the topic but we allow you to search by them using the param _`cq`_


```
GET - /v1/model?cq=(field1>value1)

SQL =  SELECT * from module c , module_custome_field b where c.id = b.id and b.field1 > value1

```
<br />

## Accesing Relationships

Models have relationships and if we want to access this data via the query string, just add `?relationship` and then the alias of the relationship you want to access.


```
GET - /v1/model?relationship=(files,users)

```
<br />

## Query Related Model

Any relationship defined on the model can also be queried using the param `_rq_`. You can search for N number of relationships.

**Note**: You need to specify an Alias to the relationship in order to query it

``` 
GET - /v1/model?rq[relationshipAlias]=(field1&lt;value1|value2)

SQL - `SELECT * FROM model m , relationship r where m.id = r.id AND m.field1 &lt; value1 OR m.field1 &lt; value2
```

**Operators**

*   **Between:**  You can either search `¬` with that specifies between or > &lt;
    *   GET - /v1/model?cq=(field1¬value1|value2)
    *   GET - /v1/model?q=(field1>value1,field1&lt;value2)

* **Like:**
    *   GET - /v1/model?q=(field1:%value)
    *   GET - /v1/model?q=(field1:value%)
    *   GET - /v1/model?q=(field1:%value%)
*	**Empty:** You can tell the query parser to make sure a field is empty. In the case of integer properties, the query parser will ask the model if the default value for a property is 0. If it is, it will include 0 as an empty value.
    *   GET - /v1/model?q=(field1:%%)
*   **Not Empty:** This is the opposite of the above Empty.
    *   GET - /v1/model?q=(field1:$$)
*   **Different :** You can specify a search where the value is different than 
    *   GET  -  /v1/model?q=(field1~value)

<br />

## One for all, and all for One

 You can use all the above described feature together in one query.

```
GET - /v1/model?q=(field1:value1|value2,field2>value3,field2&lt;value4,field3:$$)&cq=(field4:value5)&rq[model_name]=(field5>value6)
```

_Just remember to escape any special characters you want to send through a query string to avoid unwanted results._

**NOTE**: `,` is for AND and `;` is for OR operators in the query string

<br />

## Additional Search Controllers

We allow you to apply filters directly in the controllers, so for example if you want to always display records where is_delete = 0, you don't have to pass it through the query string.


```php
    public function onConstruct()
    {
        $this->model = new Notifications();
        $this->additionalSearchFields = [
            ['is_deleted', ':', '0'],
        ];
    }
```


So on the controller onConstruct you define use the params **_additionalSearchFields_** and pass the conditional. You can also pass multiple conditionals.


```php
    public function onConstruct()
    {
        $this->model = new Notifications();
        $this->additionalSearchFields = [
            ['is_deleted', ':', '0'],
            ['users_id', ':', $this->userData->getId()],
            ['companies_id', ':', $this->userData->currentCompanyId()],
        ];
    }
```


**Note:** It doesn't matter if the user now sends ?q=(is_deleted:1), by specifying this search conditions on the construct, you are always overwriting those conditions. But you can still add additional conditions on the query string.


## **Additional Relationship Fields**

Same as with the query string search, you can filter the results by relationship directly in the controller. 


```php
      $this->additionalRelationSearchFields = [
            'Canvas\Models\Users' => [
                ['id', ':', 18]
            ],
        ];
```

*   Specify the key of the array as the name of the Model with its namespace
*   Create an array where each filter is another array similar to additional search

```php
        $this->additionalRelationSearchFields = [
            'Canvas\Models\Users' => [
                ['id', ':', 18],
                ['email', '~', 'test@mctekk.com']
            ],
            'Canvas\Models\Types' => [
                ['type', ':', 'Apps']
            ],
        ];
```


In this example you can see when we have to specify multiple conditions on the same Model.
<br />

## Custom Table Joins and Conditions

**Note:** Please try to avoid this as much as possible, but if you don't have a choice, here you go ;)

We can also allow to add joins and custom conditions straight as SQL but using these properties: customTableJoins and customCoditions.


```php
        $this->customTableJoins = ' , users as u';
        $this->customConditions = ' AND notifications.users_id = u.id';
```


As you can tell, in **customTableJoins**, you will need to add `,` since this string is concatenated to the main SQL we generate, so BE CAREFUL.

For **customConditions**, we just add any conditions we want, as you can tell, we start with an AND since we are also just adding this to the main generated SQL .

**Again, and we can't stress this enough, be careful**, you can break your controller SQL if you don't know what you are doing. Also, **DO NOT PASS USER INFO TO THESE QUERIES,** since we are not escaping this part of the query.
<br />

## Additional custom fields

Just as in the query, you can define the custom fields filter in the controller by using **additionalCustomSearchFields**


```php
        $this->additionalCustomSearchFields = [
            ['field1', '>', 'value2']
        ];
```
<br />

## Custom Sort & Limit

You can also overwrite the sort and limit that we get from the query string using

```php
	$this->customSort = 'field|DESC';
  $this->customLimit = 10;
```


<br />

## Elasticsearch 

Like we mentioned before, elasticsearch parser works the same way as normal SQL so any of the previous queries will work. What you won't get are searches for **_relationships and custom fields_**. 

Why? Simple. Elasticsearch is built for search and you can create a better index structure than what you use in your db, so we expect you to build a more complex index that uses nested properties to perform the same function has relationship. 

Example of the same query for the previous example now using elastic:


```
GET - /v1/model?q=(field1:value1|value2,field2>value3,field2<value4,customfield.field4:value5,model_name.field5>value6)
```


For more information on how to use [nested properties read here](https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html), and we also provide an elastic search library that will help you build this complex structure by using normal PHP array or your module structure.

<br />

## Data Format

The normal response format of our API is the same structure as your model. If you want a list you will get an array of that same model.

We know there are different standards in our industry

*   JSON Api
*   XML
*   Other

Our current drivers don't support it, but we do plan on adding them in the future. The current format we support is specifically designed to work with our list table (vuetable) component. 

_http://api.dev/v1/leads?limit=2&format=true_


```json
{
    "data": [
        {
            "id": "90",
            "firstname": "Elvas",
            "lastname": "Castro",
            "email": "nononono@yahoo.com",
            "phone": "1111111111",
            "leads_owner_id": "1",
            "users_id": "13",
            "programs": "Unspecified",
            "sba_closing": "Ineligible",
            "uloc_closing": "Ineligible",
            "available_collateral": "null",
            "company": "null",
            "real_estate_abl_closing": "None",
            "lead_status": "Closed: Unresponsive",
        }
    ],
    "limit": 1,
    "page": 1,
    "total_pages": 139508
}
```


Where


*   List of elements are inside the data property
*   You have the pagination information

If you don't specify format, the structure will be 

_http://api.dev/v1/leads?limit=2_


```json
{
    "id": "90",
    "firstname": "Elvas",
    "lastname": "Castro",
    "email": "nononono@yahoo.com",
    "phone": "1111111111",
    "leads_owner_id": "1",
    "users_id": "13",
    "programs": "Unspecified",
    "sba_closing": "Ineligible",
    "uloc_closing": "Ineligible",
    "available_collateral": "null",
    "company": "null",
    "real_estate_abl_closing": "None",
    "lead_status": "Closed: Unresponsive",
}, {
    "id": "91",
    "firstname": "Elvas",
    "lastname": "Castro",
    "email": "nononono@yahoo.com",
    "phone": "1111111111",
    "leads_owner_id": "1",
    "users_id": "13",
    "programs": "Unspecified",
    "sba_closing": "Ineligible",
    "uloc_closing": "Ineligible",
    "available_collateral": "null",
    "company": "null",
    "real_estate_abl_closing": "None",
    "lead_status": "Closed: Unresponsive",
}, 
```


<br />

## Limit

If we need to limit the amount of records the sent back we just need to add **_&limit=value_** to the URL. By default, we will always limit it to 200 and at the moment won't allow you to exceed that total number of records for a specific call, trying to avoid taking down the site or server due to a large request.

If you need pagination, just add **_&limit=x and &page=y _**.

**Sorting**

 response data is simple, just add **_sort=field|direction_**

Where:



*   field →	 Any of the table fields you want to sort by
*   direction →	 asc (from first to last) or desc (from last to first)

Example: **_&sort=id|desc or ?sort=id|asc_**
<br />

## Fields

We allow you to specify the columns.

@todo
<br />