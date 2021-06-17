---
sidebar_position: 16
---

# ElasticSearch

Elasticsearch is a search engine based on the Lucene library. It provides a distributed, multitenant-capable full-text search engine with an HTTP web interface and schema-free JSON documents. Elasticsearch is developed in Java.

In Kanvas we leverage elastic to help us perform complex HTTP query search for custom fields and relationships in order to avoid SQL joins.

We use opendistro SQL to help devs write queries instead of relying on Elastic complex search configuration. In this section, we are going to cover how to use it with Kanvas.

## Intalling Plugin
Installing the plugin is simple. First, go to the elastic container or services and run the following command.

```
sudo bin/elasticsearch-plugin install https://d3g5vo6xdbdb9a.cloudfront.net/downloads/elasticsearch-plugins/opendistro-sql/opendistro_sql-1.9.0.0.zip
``` 

Restart the container and you are done.

## Indices
These are the representations of a table in elastic, they follow a JSON style formatting and each relationship field in a table is a nested entity on the indices. For more information read the elastic documentation.


### Create Indices

```
./runCli elastic createIndex /namespace/model maxDepth nestedLimit
```

- Param 1 full model namespace name
- MaxDepth is how many levels it should index based on the model relationship. Think of each level as a relationship $model->level1->level2->level3 . We recommend not going over 3  to avoid using too much space
- NestedLimit is the limit elastic has in the number of nested objects
### Index your documents
```
./runCli elastic createDocuments /namespace/model maxDepth 
```

### Delete a Indices

```
./runCLI elastic deleteIndex /namespace/model
```


```
php cli/cli.php elastic createIndex 'Gewaer\Models\Leads' 1
php cli/cli.php elastic createDocuments 'Gewaer\Models\Leads' 1

```  

## Models:

```php
use Baka\Contracts\Elasticsearch\ElasticIndexModelTrait;
use Baka\Database\Model;

class Leads extends Model
{
    use ElasticIndexModelTrait;

    public function initialize()
    {
        $this->setSource('leads');
        
        //use raw elastic doc
        //$this->useRawElastic = true;

        
        $this->belongsTo(
            'users_id',
            'Baka\Test\Support\Models\Users',
            'id',
            [
                'alias' => 'user',
                'elasticIndex' => true,
                'elasticAlias' => 'users'
            ]
        );
    }
}
```

Once you create a indices you want to be able to find, save and delete documents. For this we provide the `ElasticIndexModelTrait`. Adding this to your model will give you the following functions

```php
$lead = ElasticModelLeads::findFirst();
$leadElastic = $lead->saveToElastic();

```

saveToElastic : This works the same way as Phalcon save function, with a given object you just $model->saveToElastic(), this will take the current object and save it to its current indices based on the source name.

```php
$lead = ElasticModelLeads::findFirst();
$leadElastic = $lead->deleteFromElastic();

```

deleteFromElastic : Same concept base on the model id delete the document from elastic.

```php
 $lead = Leads::findFirstInElastic([
            'conditions' => 'is_deleted >= :is_deleted: AND user.id > 1',
            'bind' => [
                'is_deleted' => 0
            ],
            'limit' => 100
        ]);
```

findFirstInElastic | findInElastic : Using Phalcon query builder, you can pass the query you want to find in elastic and it should work :D. This will only return 1 element.


### How to work with nested documents?
Like we mentioned before, indices relationships are handled as nested properties, and in order to query these documents, we just have to follow this simple guideline.

```relationship.property = ‘value’``` . Yeah, it is that simple.

It will take the relationship alias as the relationship name. 
If you dont want a property to be index, just add elasticIndex => false on the relationship options.

```php
 $lead = Leads::findFirstInElastic([
            'conditions' => 'is_deleted >= :is_deleted: AND user.id > 1',
            'bind' => [
                'is_deleted' => 0
            ],
            'limit' => 100
        ]);
```

This search format will work with find functions and HTTP query search.

## Controllers

In order to use elastic in our controller structure you just need to add `CrudElasticBehaviorTrait` to it and that's it. All the normal Baka controller behavior to handle your CRUDs should work :D


```php

use Baka\Contracts\Http\Api\CrudElasticBehaviorTrait;
use Baka\Contracts\Http\Api\ResponseTrait;

class ControllerTest 
{
    use ResponseTrait;
    use CrudElasticBehaviorTrait;
}

``` 

If you need to use Mappers with ElasticSearch, you will need to use the process output mapper for elastic.

```php
use Baka\Contracts\Http\Api\CrudElasticBehaviorTrait;
use Baka\Contracts\Http\Api\ResponseTrait;

class ControllerTest
{
    use ResponseTrait;
    use ProcessOutputMapperElasticTrait, CrudElasticBehaviorTrait{
        ProcessOutputMapperElasticTrait::processOutput insteadof CrudElasticBehaviorTrait;
    }
     
     /**
     * set objects.
     *
     * @return void
     */
    public function onConstruct() : void
    {
        $this->model = new LeadsModel();
        $this->dto = LeadsDto::class;
        $this->dtoMapper = new LeadsMapper();

        $this->additionalSearchFields = [
            ['is_deleted', ':', 0],
        ];
    }
}

````