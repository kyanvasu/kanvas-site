# Send Mail Action

Use this action when you want send emails using emails_templates

# Setup

1. Create the actions

In the workflows database go to the actions table and insert this code

```sql
INSERT INTO actions(`name`,`model_name`) VALUES ('SendMail', 'Kanvas\Packages\WorkflowsRules\Actions\SendMail');
```

2. Asociate with the system_module in table rules_workflow_actions, this system_modules_id available the action for use the rules with this system_module.
For example, this actions can be used in any model, so you can associate this action with any model.

```sql
INSERT INTO actions(`system_modules_id`,`actions_id`) VALUES (1, 1);
```

# Create the Template
In this example we going to use the user model as entity. You can set the rule to any model;

```html
    <html>
        <p>Email: {{entity.email}}</p>
    </html>
```
# Create the rule

1. Create the rule, this rule use the fields params, this fields is a JSON value , look like 
```json
{
    "template_name":"new_user",
    "toEmail":"frederickpeal@mctekk.com",
    "fromEmail":"baka@baka.io",
    "subject":"New User"
}
```

```sql
INSERT INTO `rules` (`id`, `systems_modules_id`, `companies_id`, `rules_types_id`, `name`, `description`, `pattern`, `params`, `created_at`, `updated_at`, `is_deleted`) VALUES (NULL, '1', '108', '1', 'Send Email', 'This is a Rule for Sent email', '1', '{\r\n    \"template_name\":\"new_user\",\r\n    \"toEmail\":\"frederickpeal@mctekk.com\",\r\n    \"fromEmail\":\"baka@baka.io\",\r\n    \"subject\":\"New User\"\r\n}', '2021-08-18 00:00:00', NULL, '0');
```
2. Create conditions

*The list of operators is [here](https://symfony.com/doc/current/components/expression_language/syntax.html#comparison-operators)*

```sql
INSERT INTO `rules_conditions` (`id`, `rules_id`, `attribute_name`, `operator`, `value`, `is_custom_attriube`, `created_at`, `updated_at`, `is_deleted`) VALUES (NULL, '1', 'id', '>', '1', '0', '2021-08-23 00:00:00', NULL, '0');
```

3. Create actions rules
The actions used the rules id and the rules_workflow_actions_id for dispatch the rule
```sql
INSERT INTO `rules_actions` (`id`, `rules_id`, `rules_workflow_actions_id`, `created_at`, `updated_at`, `is_deleted`) VALUES (NULL, '1', '1', '2021-05-14 17:40:43', NULL, '0');
```

## Note

<b>In your system maybe the ids are has other values, keep in mind this please.</b>
