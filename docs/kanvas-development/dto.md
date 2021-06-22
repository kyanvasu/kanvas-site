---
sidebar_position: 4
---

# DTO

A Data Transfer Object (DTO) is an object used to pass data between different layers in your application. It holds no business data, but only the minimum required data to transfer between layers or applications. A simple example may be that you have the user object with a password field and in your API response you want to hide it.

In Kanvas we use the library [automapper-plus](https://github.com/mark-gerarts/automapper-plus) to handle the way we work with DTO. The way it works is that you have 2 folders where you manage your DTO and Mapper class

 
## DTO Classes


```php
<?php

namespace Canvas\Dto;

class User
{
    /**
     *
     * @var int
     */
    public $id;

    /**
     * @var array
     */
    public $access_list;

    /**
     *
     * @var int
     */
    public $active_subscription_id;

    /**
     *
     * @var array
     */
    //public $bypassRoutes;

    /**
     *
     * @var string
     */
    public $card_brand;

    /**
     *
     * @var string
     */
    public $cell_phone_number;

```

As you can see, it is a simple class where you specify the properties.


## Mapper 

Class where you map the DTO to the entity.


```php
class UserMapper extends CustomMapper
{
    use RelationshipTrait;

    /**
     * @param Users $user
     * @param Canvas\Dto\User $userDto
     * @return Canvas\Dto\User
     */
    public function mapToObject($user, $userDto, array $context = [])
    {
        $userDto->id = $user->id;
        $userDto->active_subscription_id = $user->active_subscription_id;
        $userDto->card_brand = $user->card_brand;
        $userDto->cell_phone_number = $user->cell_phone_number;
        $userDto->city_id = $user->city_id;
        $userDto->country_id = $user->country_id;
        $userDto->created_at = $user->created_at;

        $this->getRelationships($user, $userDto, $context);

        return $userDto;
```

Like its name suggests, a class where you map the DTO properties to the entity you want to transform.

_Note: You can see we have the RelationshipTrait on top, this is to allow the model relationship to work with a DTO Object via our query string search (we will discuss in this chapter)_

Now how do you handle it on the controller? Well, we try to make it as simple as possible by using our trait ProcessOutputMapperTrait. This will allow us to specify in the controller the DTO Class and the Mapper Object so our function processOutput can do the rest for us. 


```php
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

```


ProcessOutputMapperTrait will overwrite the processOutput function in your controller with


```php
    /**
    * Format Controller Result base on a Mapper.
    *
    * @param mixed $results
    * @return void
    */
    protected function processOutput($results)
    {
        $this->canUseMapper();

        //if we have relationships we use StdClass to allow use to overwrite the array as we see fit in the Dto
        if ($this->request->hasQuery('relationships')) {
            $mapperModel = DataType::ARRAY;
            $this->dto = StdClass::class;
        } else {
            $mapperModel = get_class($this->model);
        }

        $this->dtoConfig->registerMapping($mapperModel, $this->dto)
            ->useCustomMapper($this->dtoMapper);

        if (is_array($results) && isset($results['data'])) {
            $results['data'] = $this->mapper->mapMultiple($results['data'], $this->dto);
            return  $results;
        }

        /**
         * If position 0 is array or object it means is a result set from normal query
         * or with relationships therefore we use multimap.
         */
        return is_iterable($results) && (is_array(current($results)) || is_object(current($results))) ?
            $this->mapper->mapMultiple($results, $this->dto, $this->getMapperOptions())
            : $this->mapper->map($results, $this->dto, $this->getMapperOptions());
    }

```


And that's it , you don't have to do anything else since all output functions call processOutput, you can expect a consistent response within the controller.

Now, if you want to do it yourself, this is how you manage it via processOutput. We recommend using customMapper from the library, since it will be much faster but you will need to write a little more code. 


```php
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


If you don't want to use a customMapper, you can use the library mapping methods.


```php
    /**
     * Format output.
     *
     * @param mixed $results
     * @return void
     */
    protected function processOutput($results)
    {
        //DTOAppsSettings
        $this->dtoConfig->registerMapping(Apps::class, AppsSettings::class)
          ->forMember('settings', function (Apps $app) {
              $settings = [];
              foreach ($app->settingsApp->toArray() as $setting) {
                  $settings[$setting['name']] = $setting['value'];
              }
              return $settings;
          });

        return is_iterable($results) ?
                $this->mapper->mapMultiple(iterator_to_array($results), AppsSettings::class)
                : $this->mapper->map($results, AppsSettings::class);
    }

```
