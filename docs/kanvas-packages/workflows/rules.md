# The Rule

The rules are the main feature in this. The rule is compose for the Rule, the actions trigered and the conditions. Each Actions have the specifics System modules,
For Example, PDF currently just work with the Messages system modules, no leads.

## Before 
Currently the Workflow no have the interface for create rule, here we going to create the rule in the database. You must have the system_modules_id of the entity 
will to execute the rule, the companies_id.


# Creating a new rule

We going to create a rule  for this example we have a create a rule for sent the ADF and create the PDF. This rules will be trigered when a 
1. In the table rules, you must insert the new rows. 

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

2. In the rules_conditions table, you going to create a conditions for the rule, in this case the field verb must be trade-walk for execute the action

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

3. In the rules_actions table
Here you going to insert the actions that the rule will execute if is successful. This actions are the PDF and the ADF. <i>Note the rules_workflow_actions_id is a foreing key of rules_workflow_actions no the actions</i >
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


- The ADF in the internal handle method use the package [Hengen](https://github.com/bakaphp/hengen), this package receive the Leads model as first argument and n models as seconds. Hengen use volt engine for create the XMl, 
this XML is a email_template. So, each model that you send to rule will be parse to array and set to data with your slug system module.

For example you sent the lead and the message model, in the xml you have the data array with two keys leads and messages

So your template can be 
```html
{% set message_decode = data['messages']['message']|json_decode %}

<?xml version='1'>
<customer>
    <name>{{ data['lead']['firstname'] }}<name>
</customer>
<vehicle>
    <vin>{{ message_decode.data.form.vin }}</vin>
</vehicle>
```
The ADF take the email template value for the params rules, the template value in the step 1 in this page

- The PDF just receive the message like a model, so into the pdf you must manipulate this as you want

```html

{% set form = entity.messages()['data']['form'] %}
{% set lead = entity.entity() %}
{% set companies = entity.companies %}

<div>
    <p> My companies name is{{companies.name}}</p>
    </p> My name is {{lead.people.name}}
    <p> My vehicle is {{ form['make'] }}</p>
</div>
```

