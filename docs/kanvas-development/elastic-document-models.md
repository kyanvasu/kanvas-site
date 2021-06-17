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
This method is called in the constructor method, this have set the name index and create relationships 
for add relationships use 

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
For creating the index, run this command. The first param is the class for model, second the max depth and the third max fields in that index.
```
 php cli/cli.php elastic createDocuments "Gewaer\ElasticDocuments\Books" 3 1000
```

## Indexar 
For inserting documents in Elastic, you need to set the data and ID, search the data in the database with the model and with setData method, and add method insert data in elastic.

```
$books = \Gewaer\Models\Books::find('is_deleted = 0');
foreach($books as $book){
	$document = new \Gewaer\ElasticModel\Books();
  $document->setData($book->id, $book->toArray());
  $document->add();
 }
```

If you want to insert data from CLI, use this command
```
php cli/cli.php elastic createDocumentsElastic "Gewaer\Models\Books" "Gewaer\ElasticModel\Books" 3 1000
```
