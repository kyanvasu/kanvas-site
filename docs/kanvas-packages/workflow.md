---
sidebar_position: 1
---

# Workflow

As Kanvas grows it is necessary to add new features that support one or more types of applications. In the case of a CRM application, there is a fundamental feature that helps with the management of new or existing workable entities and guarantees specific actions upon them, given certain conditions. These Workflow Rules, define specific workflow processes a workable entity must go through in order to meet certain requirements of the business model.

## Glossary

| Term           | Meaning |
|----------------|---------|
|Workflow        | A workflow is a series of sequential tasks that are carried out based on user-defined rules or conditions, to execute a business process.|
|Workflow Rules  | A series of rules that are part of the process of a given workflow. They take into account specific conditions within a workflow and execute actions based on them.
|Rule Conditions  | A series of conditions within a rule by which a business data may comply in order to trigger certain actions.
|Rule Actions     | Actions that execute during or after a workflow process. An action may be sending an email after the workflow completes, or contacting a third party to further take action on a given business data.

## Dependencies

| Packages | Version |
|----------|---------|
|mctekk/zohocrm|^0.1 |
|symfony/expression-language|^5.1|

## Setup

1 In the canvas project, composer require kanvas/packages

2 In the .env file set this variables
	 - WORKFLOW_MYSQL_HOST
   - WORKFLOW_MYSQL_NAME
   - WORKFLOW_MYSQL_USER
   - WORKFLOW_MYSQL_PAS
   - WORKFLOW_CORE_PATH
   
3 Set Kanvas\Packages\WorkflowsRules\Providers\DatabaseProvider to provider list

4 In the model that you want use Rules, implement this interface    Kanvas\Packages\WorkflowsRules\Contracts\Interfaces\WorkflowsEntityInterfaces;

5 Use this trait Kanvas\Packages\WorkflowsRules\Contracts\Traits\RulesTrait;

6 Copy phinx config file, on bash is cp vendor/kanvas/packages/src/WorkflowsRules/storage/phinx.example phinx-workflow.php

7 Execute workflows migrations vendor/bin/phinx migrate -c phinx-workflow.php

8 Execute seed vendor/bin/phinx seed:run -s Actions -c phinx-workflows.php && vendor/bin/phinx seed:run -s RulesTypes -c phinx-workflows.php

## Basic Usage

### **First step**
The first step is to fill the tables rules_workflow_actions, for create a relation between the systems_modules and actions

For example, in Gewaer we have a system_modules named Leads, her id is 20 and in the actions table we have an action named SendToZoho with an id 1, on rules_workflow_action there are two fields actions_id  and system_modules_id, for this example we are going to insert actions_id = 1 and systems_modules_id = 20 


### **Second step**

 **Rule**
We are going to create our first rule called Test Zoho. On the rules table insert these values

Rule
systems_modules_id=20
companies_id=1
rules_types_id=1
name= Test Zoho
description = it is our first rule
pattern = 1

----------------------------
Systems_modules_id 
Is the id of system module, in this example 20

companies_id
Is the id of the logued companies, you must set your companies id

rules_types_id
The id of rules types, now we have 3 id, created, updated and deleted

name
The name of your rule, in this example test zoho

description
A description for the rules, you are free to custom this description

pattern
1 because on this example we have a only conditions

-----------------


## Rule Condition
rules_id = 1
attribute_name=created_at
operator = >
value = 2000-01-01
is_custom_attribute = 0


rules_id *The id of rule*

attribute_name
created_at , the field of the entity
operator >

> we support operator logical and arithmetic operators

value
We put this value, and all leads created with a date mayor to year 2000, will send to zooho

## **Rules Actions**
rules_id =1 
rules_workflow_actions_id=1

## Examples

### ADF

The ADF is an action for Dealer App, when a lead is created if the lead has the customs fields rooftopid and vehiculesid, the action will be triggered.

Example requested
```
firstname:first name test
lastname:last name test
email:joe.edwards@bellsouth.net
phone:404-787-2747
leads_owner_id:1
users_id:1
companies_id:1
leads_status_id:1
vehicleid: 1919
rooftopid: 106
```
The fields for this action are
 - message
 - username
 - vehicleid **required**
 - rooftopid **required** 
 - dealergroupid
 
For creating a new rule with this action, you can do the same that SendToZoho, just change the action for ADF.