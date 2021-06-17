---
sidebar_position: 15
---

# Filesystem

It's the system we use to handle file uploading and it has the following characteristics:  


*   Files  can be stored in either an  AWS S3 bucket or your local filesystem
*   It allows you to upload files and then associate it to any of the system modules you have defined in your app. This gives you the flexibility to upload once and use it in different places.
*    Files can’t be deleted unless specified. Files are rather soft deleted when marked as true on its field **_is_deleted_**

How to use it?

In your module just add the trait

```php
<?php

use Canvas\Traits\FileSystemModelTrait;

class Companies extends BaseModel
{

		use FileSystemModelTrait;

		//You will also need to add the function associcateFileSystem() to your afterSave function:

    /**
     * Upload Files.
     *
     * @todo move this to the baka class
     * @return void
     */
    public function afterSave()
    {
        $this->associateFileSystem();
    }
```

The rest should be handled by the frontend.

In order to get file from name from a specific entity just call

`$this->getFileByName(fileName);`

To get all files

`$this->getFiles()`
`$this->getFilesByName(fileName);`


On the frontend side you will need to add relationship files or filesystem. With this you will get the list of files associated with the given entity

`?relationships=files`

`http://ai.app.dev/v1/route?relationships=files`