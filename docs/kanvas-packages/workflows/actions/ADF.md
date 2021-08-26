# ADF Action
Use this action when you want share data with other CRM

# Setup

1. Create the actions

In the workflows database go to the actions table and insert this code

```sql
INSERT INTO actions(`name`,`model_name`) VALUES ('ADF', 'Kanvas\Packages\WorkflowsRules\Actions\ADF');
```

2. Asociate with the system_module in table rules_workflow_actions, this system_modules_id available the action for use the rules with this system_module.
For example, this actions can be used in any model, so you can associate this action with any model.

```sql
INSERT INTO actions(`system_modules_id`,`actions_id`) VALUES (1, 1);
```
# Modify the fireRules in the model

When you use the ADF you must modify the Trait

```php
    public function fireRules(string $event) : void
    {
        $systemModules = $this->getSystemModules();
        if ($systemModules) {
            $rulesTypes = RulesTypes::findFirstByName($event);
            if (!$rulesTypes) {
                return;
            }
            $rules = Rules::find([
                'conditions' => 'systems_modules_id = :systems_module_id: AND rules_types_id = :rules_types_id: AND companies_id in (:companies_id:, :global_companies:)',
                'bind' => [
                    'systems_module_id' => $systemModules->getId(),
                    'rules_types_id' => $rulesTypes->getId(),
                    'companies_id' => $this->companies->getId(),
                    'global_companies' => Companies::GLOBAL_COMPANIES_ID
                ]
            ]);

            foreach ($rules as $rule) {
                $lead = $this->entity();
                $lead->setVerb($this->getEngagement()->pipeline->slug);
                RulesJob::dispatch($rule, $event, $lead, $this, $lead->people);
                Di::getDefault()->get('log')->info("Rules fire {$rule->name}");
            }
        }
    }
```
Why ?
Because when you work with the ADF , you want use multiples model, the first model ever must be Leads and the rest any model, like the example.
Each model passed in the ADF will be into the data with the slug of his system_module for example Gewaer\Models\Messages the slug is messages. So for use the data
you can do it , {{data['messages']['the key']]}}

# Implement Hengen Interface
Your model Lead must implement ``` Kanvas\Hengen\Contracts\Interfaces\LeadsInterfaces ```

# Create the Template
In this example we going to use the user model as entity. You can set the rule to any model;  The template must be storage in email_templates table 

```xml
{% set message_decode = data['messages']['message']|json_decode %}
{{"
<?ADF VERSION '1.0'?>
<?XML VERSION “1.0”?>"}}
<adf>
    <prospect>
        <requestdate>{{date('Y-m-d H:is')}}</requestdate>
        <customer>
            <contact>
                <name part='first'>{{ data['peoples']['firstname'] }} </name>
                <name part='last'>{{ data['peoples']['firstname'] }}   </name>
                <email> </email>
            </contact>
        </customer>
    </prospect>
</adf>"
```

# Create the rule

1. Create the rule, this rule use the fields params, this fields is a JSON value , look like 
```json
{
    "template":"new_user_adf",
}
```

```sql
INSERT INTO `rules` (`id`, `systems_modules_id`, `companies_id`, `rules_types_id`, `name`, `description`, `pattern`, `params`, `created_at`, `updated_at`, `is_deleted`) VALUES (NULL, '1', '108', '1', 'Create PDF', 'This is a Rule for create PDF', '1', '{\r\n    \"template\":\"new_user_adf\",\r\n}', '2021-08-18 00:00:00', NULL, '0');
```
2. Create conditions

*The list of operators is [here](https://symfony.com/doc/current/components/expression_language/syntax.html#comparison-operators)*

```sql
INSERT INTO `rules_conditions` (`id`, `rules_id`, `attribute_name`, `operator`, `value`, `is_custom_attriube`, `created_at`, `updated_at`, `is_deleted`) VALUES (NULL, '1', 'verb', '==', 'trade-walk', '0', '2021-08-23 00:00:00', NULL, '0');
```

3. Create actions rules
The actions used the rules id and the rules_workflow_actions_id for dispatch the rule
```sql
INSERT INTO `rules_actions` (`id`, `rules_id`, `rules_workflow_actions_id`, `created_at`, `updated_at`, `is_deleted`) VALUES (NULL, '1', '1', '2021-05-14 17:40:43', NULL, '0');
```


## Note

<b>In your system maybe the ids are has other values, keep in mind this please.</b>
