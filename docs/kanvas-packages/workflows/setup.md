# Setup

```
composer require kanvas/packages
```
## Phinx File

Step one

```
    cp vendor/kanvas/packages/src/WorkflowsRules/storage/ci/phinx.example phinx-workflows.php
```

Step Two

In your .env

```
WORKFLOW_CORE_PATH=/app/vendor/kanvas/packages/src/WorkflowsRules
WORKFLOW_MYSQL_HOST=
WORKFLOW_MYSQL_NAME=workflows
WORKFLOW_MYSQL_USER=
WORKFLOW_MYSQL_PASS=
```

Step Three
```
vendor/bin/phinx migrate -c phinx-workflows.php && vendor/bin/phinx seed:run -c phinx-workflows.php
```

## Preparing model
In the model that we want install de Rule, we going to use this trait and implementation of WorkflowsEntityInterfaces;

```php
<?php 

declare(strict_types = 1);
use Kanvas\Packages\WorkflowsRules\Contracts\Interfaces\WorkflowsEntityInterfaces;

use Kanvas\Packages\WorkflowsRules\Contracts\Traits\RulesTrait;

class Leads implements WorkflowsEntityInterfaces{ 
    use RulesTrait;
}
>
```

