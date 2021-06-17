---
sidebar_position: 3
---

# Controllers

We are not going to cover how to work with Phalcon Controllers, if you need any reference, please read their documentation [here](https://docs.phalcon.io/3.4/en/controllers). What we are going to cover is how to use the Baka HTTP library to handle fast & consistent controller development.

Most of you know that when working with SAP/SaaS applications, we encounter lots of CRUDs, and at the same time, we need to search for data and filter it in any way the client sees fit. What Baka HTTP provides is a set of methods to help with this, by allowing you to focus on the specific logic for the project.

Baka HTTP Provides:

*   **Controller:** Where you define the module this controller will work with
*   **Process Input:**  This is a method that allows you to manipulate any input information that both the Create and Edit method, while providing a consistent response to any method that will handle an entity for this controller module
*   **Process Output**: This method allows you to provide unified output data for any function you see fit. This allows us to modify the response for any of the methods in a single place
*   **Index:** List all entities of this module
*   **Create:** Create new record
*   **getById:**  Get a record by a specific id
*   **Delete:** Delete
*   **Update:** Update

## Rapid CRUDS

When working with Rapid Cruds, the first thing we recommend is creating a BaseController, this will be the starting point for your project.


```php
 <?php

declare(strict_types=1);

namespace Canvas\Api\Controllers;

use Baka\Http\Api\BaseController as BakaBaseController;
use Baka\Http\Contracts\Api\CrudBehaviorTrait;

/**
 * Class BaseController.
 *
 * @package Canvas\Api\Controllers
 *
 */
abstract class BaseController extends BakaBaseController
{
    use CrudBehaviorTrait;

    /**
     * activate softdelete.
     * @var int
     */
    public $softDelete = 1;
}



```


We extend it from Baka\Http\BaseController so we can get all the features needed for our Api Filtering (which will be discussed later on) and implement de CrudBehaviorTrait for the Rapid Crud.

Next up we create the controllers for the entities we plan on working on, let's start with Users


```php
 <?php
 class UsersController extends BaseController
{
    use ProcessOutputMapperTrait;

  /*
     * fields we accept to create
     *
     * @var array
     */
    protected $createFields = [
        'name',
        'firstname',
        'lastname',
        'displayname',
        'language',
        'country_id',
        'timezone',
        'email',
        'password',
        'created_at',
        'updated_at',
        'default_company',
        'default_company_branch',
        'family',
        'cell_phone_number',
        'country_id'
    ];

    /*
     * fields we accept to create
     *
     * @var array
     */
    protected $updateFields = [
        'name',
        'firstname',
        'lastname',
        'displayname',
        'language',
        'country_id',
        'timezone',
        'email',
        'password',
        'created_at',
        'updated_at',
        'default_company',
        'default_company_branch',
        'cell_phone_number',
        'country_id'
    ];

    /**
     * set objects.
     *
     * @return void
     */
    public function onConstruct()
    {
        $this->model = new Users();
        $this->dto = UserDto::class;
        $this->dtoMapper = new UserMapper();
    }



```


First thing you will see is that we are using the ProcessOutputMapperTrait, this allows us to overwrite the processOutput and use the  **DTO** (Data Transfer Object). By specifying the DTO class on the controller property _dto_ and the dto mapper class  on the _dtoMapper_ property, for the class (if you don't know what a DTO is, please read this documentation).

The second thing you will notice is the model property of the controller, in which we specify the model this CRUD will handle. By doing this, we are telling the controller all operations will work with the User entity.

Now the properties createFields and updateFields, are the attributes we allow the users to modify via the Create and Edit functions. If you wish to remove or add any property you can do so on those arrays.

## Creating a new Entity


```php
 /**
     * Create new record.
     *
     * @return Response
     */
    public function create(): Response
    {
        //process the input
        $result = $this->processCreate($this->request);

        return $this->response($this->processOutput($result));
    }

    /**
     * Process the create request and record the object.
     *
     * @return ModelInterface
     * @throws Exception
     */
    protected function processCreate(RequestInterface $request): ModelInterface
    {
        //process the input
        $request = $this->processInput($request->getPostData());

        $this->model->saveOrFail($request, $this->createFields);

        return $this->model;
    }

```


Entity creation goes as follows:

The ProcessCreate function is where input data is manipulated and then saved to a module. 

First, the ProcessInput function is called, whose job is to unify the entry point for the input data sent to the create or edit functions.


```php
		/**
     * Given a array request from a method DTO transformer to whats is needed to
     * process it.
     *
     * @param array $request
     * @return array
     */
    protected function processInput(array $request): array
    {
        return $request;
    }

```


We expect you to use processInput for validating any logic you wish. Also note $request->getPostData()  method can read form-data,form-urlencoded or rawJson request bodies, so you can work easily with the data the clients sents.

Once you process the input data is over, we send it over to the module and save it to the database.

We use save or fail, to get exception when the module has any issue saving the data.

If you ever need to overwrite the way the create operation works, we recommend overwriting the processCreate function rather than the create module function. An example of this could be:


```php
 		/**
     * Process the input data.
     *
     * @param array $request
     * @return array
     */
    protected function processInput(array $request): array
    {
        //encode the attribute field from #teamfrontend
        if (!empty($request['attributes']) && is_array($request['attributes'])) {
            $request['attributes'] = json_encode($request['attributes']);
        }

        return $request;
    }

    /**
    * Process the create request and record the object.
    *
    * @return ModelInterface
    * @throws Exception
    */
    protected function processCreate(Request $request): ModelInterface
    {
        $model = parent::processCreate($request);
        $request = $request->getPostData();

        //add values to the custom field
        if (is_array($request['values'])) {
            $model->addValues($request['values']);
        }

        return $model;
    }

```


## Modify an Entity


```php
		/**
     * Update a record.
     *
     * @param mixed $id
     * @return Response
     */
    public function edit($id): Response
    {
        $record = $this->model::findFirstOrFail([
            'conditions' => $this->model->getPrimaryKey() . '= ?0',
            'bind' => [$id]
        ]);

        //process the input
        $result = $this->processEdit($this->request, $record);

        return $this->response($this->processOutput($result));
    }

    /**
     * Process the update request and return the object.
     *
     * @param RequestInterface $request
     * @param ModelInterface $record
     * @throws Exception
     * @return ModelInterface
     */
    protected function processEdit(RequestInterface $request, ModelInterface $record): ModelInterface
    {
        //process the input
        $request = $this->processInput($request->getPutData());

        $record->updateOrFail($request, $this->updateFields);

        return $record;
    }

```


First, we try to fetch for the entity by its module primary key (at the moment we don't support multiple primary keys) using the _findFirstOrFail_ function  which also gives an exception if no record of the entity is found. After that function call, both the entity object and the request are passed as parameters to the processEdit function.

On the processEdit function, we do the same thing as in processCreate; run the processInput function and then send the result array to update the entity we previously fetched. Finally, we use processOut function to return the same type of response as in the create function.

In most cases, if you wish to overwrite the default behavior, you will start with processEdit, unless you want to change how we are extracting the information.

Note: If you want to change the way we fetch info from the database, overwrite the findFirstOrFail in the module.


```php
		/**
     * Process the update request and return the object.
     *
     * @param Request $request
     * @param ModelInterface $record
     * @throws Exception
     * @return ModelInterface
     */
    protected function processEdit(Request $request, ModelInterface $record): ModelInterface
    {
        $record = parent::processEdit($request, $record);
        $request = $this->processInput($request->getPutData());
        if (!isset($request['criterias'])) {
            throw new RuntimeException('Expected Criteria key on this array');
        }

        $this->updateCriterias($record, $request['criterias']);

        return $record;
    }

    /**
     * Format output.
     *
     * @param [type] $results
     * @return void
     */
    protected function processOutput($results)
    {
        //add a mapper
        $this->dtoConfig->registerMapping(CustomFilters::class, CustomFilterDto::class)
            ->useCustomMapper(new CustomFilterMapper());

        return $results instanceof \Phalcon\Mvc\Model\Resultset\Simple ?
            $this->mapper->mapMultiple(iterator_to_array($results), CustomFilterDto::class)
            : $this->mapper->map($results, CustomFilterDto::class);
    }

```


In this example we are looking for a specific field before updating the entity, and we are using a DTO for consistency so we overwrite processOutput.


## Delete an Entity


```php
    /**
     * Delete a Record.
     *
     * @throws Exception
     * @return Response
     */
    public function delete($id): Response

    {
        $record = $this->model::findFirstOrFail([
            'conditions' => $this->model->getPrimaryKey() . '= ?0',
            'bind' => [$id]
        ]);

        if ($this->softDelete == 1) {
            $record->softDelete();
        } else {
            $record->delete();
        }

        return $this->response(['Delete Successfully']);
    }

```


To delete a record we the entity first by it primary key and determine whether we are using soft delete or not in this controller, and then run the delete process accordingly.

Note: At the moment we only look for 1 primary key. Also, [softDelete is not a behavior](https://docs.phalcon.io/3.4/en/db-models-behaviors#softdelete), we will change this in the future.

## Find Entity by Id


```php
		/**
     * Get the record by its primary key.
     *
     * @param mixed $id
     *
     * @throws Exception
     * @return Response
     */
    public function getById($id): Response
    {
        //find the info
        $record = $this->model::findFirstOrFail([
            'conditions' => $this->model->getPrimaryKey() . '= ?0',
            'bind' => [$id]
        ]);

        //get the results and append its relationships
        $result = $this->appendRelationshipsToResult($this->request, $record);

        return $this->response($this->processOutput($result));
    }

```


When fetching an entity by its ID, we run a similar process.

*    Fetch it by its primary key
*   Append its relationships (You will see this later on, but we allow users to specify relationships in the query string)
*   Return the response of the processOutput, same as in previous functions, we do this to maintain a consistent response.

If you want to modify this function, we recommend to overwrite processOutput for consistency, unless you need to change the way we find the entity.