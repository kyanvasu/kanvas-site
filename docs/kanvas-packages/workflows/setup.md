# Setup

```
composer require kanvas/packages
```
## Phinx File

Step one

Configure a specific phinx db migration file
```
cp vendor/kanvas/packages/src/WorkflowsRules/storage/ci/phinx.example phinx-workflows.php
```

Step Two

Add workflow db connection to .env file

```
WORKFLOW_CORE_PATH=/app/vendor/kanvas/packages/src/WorkflowsRules
WORKFLOW_MYSQL_HOST=
WORKFLOW_MYSQL_NAME=workflows
WORKFLOW_MYSQL_USER=
WORKFLOW_MYSQL_PASS=
```

Step Three

Run migration and seed

```
vendor/bin/phinx migrate -c phinx-workflows.php
vendor/bin/phinx seed:run -c phinx-workflows.php
```

## Configuration on your app
In order to use the package you will need to implement the WorkflowsEntityInterfaces in your Model and apply the CanUseRules Trait

```php 

declare(strict_types = 1);
use Kanvas\Packages\WorkflowsRules\Contracts\Interfaces\WorkflowsEntityInterfaces;
use Kanvas\Packages\WorkflowsRules\Traits\CanUseRules;

class Leads implements WorkflowsEntityInterfaces{ 
    use CanUseRules;
}

```
Depending the type of rule you configure
- After Create
- After Update
- Before Delete

You will have to call the rules trait function fireRules()

```php

class Leads implements WorkflowsEntityInterfaces{ 
    use CanUseRules;

    public function afterCreate()
    {
        $this->fireRules('create');
    }
}
```

This method will look for all the matching rules of type create for the giving system module and run them on the workflow queue.