---
sidebar_position: 3
---

# Architecture Concepts

## **Kanvas Basic Concepts**

At its core Kanvas will handle the overall features a SaaS system needs but with a little twist; it manages not one, but an ecosystem of apps.

![ecosystem.png](/ecosystem.png)

In a future version, we plan to allow multiple ecosystems to connect between them

### **Users** 
   
   Are the people that will be using any of the apps for the ecosystem. Few things need to be pointed out:

*   Doesn't matter how many apps the users sign up to, we only have 1 record in the user table
*   Users will always belong to 1 or _N_ companies.
*   We use the table _user_associate_apps_ to assign which apps the users are associated with. A user can be associated with an app in 1 company and not have access to this same app in another company.
*   Users can have different roles per app & company.
*   Each app within the ecosystem can determine if they have a unique authentication (password). This means that app 1 and 2 can share the same credential for the user but app 3 and 4 can have unique credentials for the same user.

### **Companies** 
   
Is an entity made up of associations of users, allowing the users to interact with the apps the company has subscribed to.

*   Each company has 1 or _N_ branches. 
*   Users will always be working on a specific Company Branch.
*   We have a group of companies, this is just a way to group multiple companies under a name to allow Super admin users to view a General Invoice of their different apps.
*   Subscription by apps is associated with the company and not the user.
   
### **Subscriptions** 

Is the business model we chose for the Kanvas ecosystem, each company will be paying monthly / yearly fees for the different apps they subscribe to.

*   Subscriptions are tied to companies.
*   Each app has different Subscription plans.
*   Each Subscription plan belongs to an app_plan that defines its price and features for the app.
*   At the moment all subscriptions are managed through Stripe.
    
## **Apps** 

Apps are the core of the Ecosystem. Each app will be independent of the other, but since they are all using the Kanvas ecosystem, they will be able to access shared services via our SDK, allowing them to avoid having to develop any of the extra services. 

The overall idea is to allow you to just focus on the business side.

*   Each app has a unique private and public key. That's the way the ecosystem knows who is interacting with whom.
*   Each app has its 
    *   Subscription Plans
    *   Plans Settings: Permission, specific configuration
    *   Roles to allow the user to manage permissions
    *   Custom Fields
    *   Email Templates
    *   Webhooks
    *   System Modules

## **System Modules**

These are the sections of your app that the user has access to, and at the same time, you can enhance them by adding custom fields.

There is a field in our database that makes a module visible on the app menu, you can disable this if you like. You can also manually add any section in the app menu not based on the System Module.

## **Custom Fields**

Extend any of your entities by adding dynamic fields to them. This gives you the flexibility to add new fields apart from the ones we support directly on your app manager.

As a side note, we use elastic search to manage custom fields to simplify the lookup of information.

## **FileSystem** 

Allows you to manage files (upload, list, edit, delete) for any system modules of the ecosystem. This helps to have a simple interface to manage all our files.

*   Any System Module can use the file system
*   No need to create new entities to manage file upload in your system
*   Files can be stored either in an AWS S3 bucket or locally.
*   One file can be related to multiple system modules
    
## **Sessions**

[JWT](https://jwt.io/) is used to manage access to all of the API resources via the access token. We provide an additional level of control for these tokens, allowing each of the admins, if needed, to expire or block a user session token after creation.

## **HashTables** 

Provide a simple interface for Redis hash table creation to any of your system tables. Is it the same as custom fields? In theory yes, the only difference is we don't provide web UI to manage the different keys, this is more for developers to manage.

## **Notifications** 

Notifications are  short, informational messages that notify users of something that has occurred in your application. W_**e extend this feature by allowing you to manage this for multiple applications on the ecosystem. 

Notifications can be sent via:
*   Email
*   SMS
*   Push Notification
*   Websocket
*   3rd party system

## **Linked Sources** 

Allows you to associate users to different sources. Sources are 3rd party sites or apps the user will interact with, examples
    *   Managing social login
    *   Managing user mobile devices relationship with the user for push notification
