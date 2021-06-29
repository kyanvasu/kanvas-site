---
sidebar_position: 19
---

# Elastic Document Models

This kind of model was created to use Index as table. For using this feature, you must extend your class to \Baka\Elasticsearch\Objects\Documents.

This class have these methods:
 - initialize
 - setData
 - structure

## Method initialize
Following the same patterns as Phalcon models, on initialize, we set up the relationships (nested fields) this document has in order for the [query params](/docs/kanvas-development/request-filtering) to work.

``` 
public function initialize(): void
{
  $this->setIndices('books');
  $this->addRelation('authors', ['alias' => 'authors', 'elasticAlias' => 'author', 'elasticIndex' => 1]);
}
```

## Method structure

```
    public function structure() : array
    {
        return [
            'id' => $this->integer,
            'name' => $this->text,
            'authors' => [
                'id' => $this->integer,
                'name' => $this->text,
                'address' => [
                    'street' => $this->text,
                    'state' => $this->text,
                    'city' => $this->text
                ]
            ]
        ];
    }
```

## Gists Example
https://gist.github.com/FredPeal/64def6e2e096aff35c744c9ce8c9eb64

## Create Index
For creating the index, run the following command

```
 php cli/cli.php elastic createDocuments "Gewaer\ElasticDocuments\Books" 3 1000
```

*   The first param is the class for model
*   The second is the max depth 
*   The third represents max fields in that index

## Insert Documents 
In order to insert data to Elastic,  you will just need to initialize your Elastic document object, and pass the Phalcon model to the insert data function.

```
$books = \Gewaer\Models\Books::find('is_deleted = 0');
foreach($books as $book){
  $document = new \Gewaer\ElasticModel\Books();
  $document->setDataModel($book);
  $document->add();
 }
```

If you want to insert data from CLI, use the following command
```
php cli/cli.php elastic createDocumentsElastic "Gewaer\Models\Books" "Gewaer\ElasticModel\Books" 3 1000
```
