# The Rule

Rules are the conditional that need to be satisfied in order for a workflow to be executed
For example:

For any Company module on your app we will execute actions after creation or updating the record

## Before 
A the moment we still don't have a proper UI to manage the rules, so we will provide the SQL needed to manually setup the package


# Creating a new rule

First we need to insert the rules row specifying the system module for reach the rule as to run , companies_id will define if this rules runs for just a specific company or if we specify 0, will run for all companies in the app.

Params is a important field, this is a json structure that will be pass to the actions

```sql
INSERT INTO `rules`
            (`id`,
             `systems_modules_id`,
             `companies_id`,
             `rules_types_id`,
             `name`,
             `description`,
             `pattern`,
             `params`,
             `created_at`,
             `updated_at`,
             `is_deleted`)
VALUES      (NULL,
             '43',
             '108',
             '1',
             'ADF Trade In',
             'This is a Rule for ADF Trade In',
             '1',
'{\"template\":\"adf-trade-in\", \"template_name\":\"adf-trade-pdf\"}',
'2021-08-18 00:00:00',
NULL,
'0'); 
```

1. Set the logical condition needed for the rule to be executed, in this case the field verb must be trade-walk for execute the action

We use [Symfony ExpressionLanguage](https://symfony.com/doc/current/components/expression_language.html) , to handle the login of each rule condition

```sql
INSERT INTO `rules_conditions`
            (`id`,
             `rules_id`,
             `attribute_name`,
             `operator`,
             `value`,
             `is_custom_attriube`,
             `created_at`,
             `updated_at`,
             `is_deleted`)
VALUES      (NULL,
             '1',
             'verb',
             '==',
             'trade-walk',
             '0',
             '2021-08-23 00:00:00',
             NULL,
             '0'); 
```

1. Set the actions to execute if the rule is successful,
```sql
INSERT INTO `rules_actions`
            (`id`,
             `rules_id`,
             `rules_workflow_actions_id`,
             `created_at`,
             `updated_at`,
             `is_deleted`)
VALUES      (NULL,
             '1',
             '2',
             '2021-05-14 17:40:43',
             NULL,
             '0'),
            (NULL,
             '1',
             '3',
             '2021-05-14 17:40:43',
             NULL,
             '0'); 
```