---
sidebar_position: 8
---

# Errors / Exceptions

To handle our API & CLI, we wrapped them in a try/catch, this provides a cleaner expression that allows us to stop the process by throwing an exception

Exceptions that are available:	 


*   NotFoundException (404)
*   UnAuthorizedException (401)
*   BadRequestException (400)
*   ForbiddenException (403)
*   InternalServerErrorException (500) → this exception will send notification to everybody (via sentry) notifying something really bad happened in the system
*   UnprocessableException (422)


```php
    public function edit($id): Response
    {
        $company = $this->model->findFirstOrFail($id);
        $data = $this->request->getPutData();

        if (empty($data)) {
            throw new UnprocessableEntityException ('No valid data sent.');
        }
```
