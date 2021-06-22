---
sidebar_position: 7
---

# Response

[Phalcon\Http\Response](https://docs.phalcon.io/3.4/en/api/Phalcon_Http) is the Phalcon component designed to achieve this task. HTTP responses are usually composed by headers and body.

To simplify the use of response, we add a method in the baseController called **_response:_**


```php
    protected function response($content, int $statusCode = 200, string $statusMessage = 'OK'): Response
    {
        $this->response->setStatusCode($statusCode, $statusMessage);
        $this->response->setContentType('application/vnd.api+json', 'UTF-8');
        $this->response->setJsonContent($content);

        return $this->response;
    }
```


We expect you to use this method in all methods of the API that  send back  data to the user, for example:


```php
   
    public function getById($id) : Response
    {
        //find the info
        $company = $this->model->findFirst([
            'id = ?0 AND is_deleted = 0 and companies_id = ?1',
            'bind' => [$id, $this->userData->currentCompanyId()],
        ]);
        
         return $this->response($company);
    }
```


By passing any variable type, with the help of Phalcon we return a JSON type content to the consumer. 

Now we also allow you to change the status and message if you choose on the params, but at the same time you can just use [Phalcon\Http\Response](https://docs.phalcon.io/3.4/en/api/Phalcon_Http) methods.


```php

   public function getById($id) : Response
    {
        //find the info
        $company = $this->model->findFirst([
            'id = ?0 AND is_deleted = 0 and companies_id = ?1',
            'bind' => [$id, $this->userData->currentCompanyId()],
        ]);

        if ($company) {
            return $this->response($company)->setStatusCode(404, 'Not Found');
        } else {
            throw new UnprocessableEntityHttpException('Record not found');
        }
    }
```


Also note that  this is using the DI response service, by default we are using Canvas\Http\Response, if you want to change it, just go to the provider and replace our response with yours. Moreover, just like in the previous Request section, we also provide a SwooleResponse, this will be used the moment the code detects it is running on a Swoole Server.


```php 

class ResponseProvider implements ServiceProviderInterface
{
    /**
     * @param DiInterface $container
     */
    public function register(DiInterface $container)
    {
        if (isSwooleServer()) {
            $container->setShared('response', new SwooleResponse());
        } else {
            $container->setShared('response', new Response());
        }
    }
}
```


We need to overwrite the sent function from Phalcon to allow Swoole to work properly. ¿Why? Take a look at the code, but since Swoole caches the code, we need to reset the DI for every request to avoid sending back the same user info on every request after login.