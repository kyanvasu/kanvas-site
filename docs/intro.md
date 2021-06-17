---
sidebar_position: 1
---

# Introduction

Kanvas is the name we’re giving to more robust packages and components that offer solutions to specific needs. In essence, it is a collection of interconnected **Baka** packages and components that fulfill a specific role.

In simpler terms: a **Kanvas** package or component is built by layering multiple **Baka** packages or components together to create a more complex and robust solution catered to a larger challenge.

Here are some examples:

*   [vue-upload-component](https://github.com/lian-yue/vue-upload-component)
*   [Vue-form-json](https://github.com/14nrv/vue-form-json)
*   [Kanvas Core](https://github.com/bakaphp/canvas-core)

**Baka** has long been the name we’ve been using to denote packages created to address a solution. For some time this has only been done for backend challenges and we now want to extend them to solve frontend challenges.

With **Kanvas** we want to go beyond and above being just another boilerplate. We aim to offer solutions to common (and sometimes uncommon) needs developers have. We want to help developers quickly deploy apps by writing as little code as possible, while still keeping a high degree of customization and adaptability.

The aim of this layer is to address compact and agnostic solutions to specific challenges that we find in our everyday coding. By writing agnostic packages and components we can assure a large degree of portability and compatibility throughout many different systems that utilize them.

Here are some brief reasons as to why this way of thinking and implementation are important:

*   **Save energy.** By allowing the developer to focus on developing the actual app.
*   **Reusable code.** Spending less time having to re-code the same things repeatedly.
*   **Better understanding for individuals and teams.** With compact solutions geared towards specific challenges.

Here are some examples:

*   [Vuetable-2](https://github.com/ratiw/vuetable-2)
*   [Vue-multiselect](https://github.com/shentao/vue-multiselect)
*   PHP [blameable](https://github.com/bakaphp/blameable)
*   Phalcon [router](https://github.com/bakaphp/router)

# **How it Works**

Kanvas works by providing you with a layer of common issues your app will face and microservices  connected to its common layer that will help you speed up the development process.

After registering your app with our ecosystem or launching your own, you will register an app and get your unique key, this will help identify with the different services. From that point on, you can use our SDK or pre-boilerplate API (PHP, JS & Go) to start with your Backend. The same goes for Frontend or Mobile, download the boilerplate project or just use the components.

You can either use some components as stand-alone or use them all together to speed up the development process of your app.

Features
*   User Management
*   Permission Management 
*   App based configuration
*   Notification System
    *   Email, Pusher, Push Notification
*   Custom Fields
*   Ecosystem SDK
    *   API BoilerPlate
    *   Frontend BoilerPlate
    *   Mobile App BoilerPlate

**Why not … ?**

**Low Code Solutions or Boilerplates,** it's not that you can't use them, we are just trying to make a different approach to the problem. We are trying to provide 2 different things from them:

*   Multi App Solutions 
*   Freedom

## **Main Components and Structure**

![kanvas_structure_1.png](/kanvas_structure_1.png)

**Kanvas API** → This API controls the whole ecosystem. (console.kanvas.dev)

**Canvas-core** → Contains specific core logic of Kanvas

**Canvas-library** → Contains Kanvas  components that we may want to share with other canvas related implementations

**Phalcon-api** → As of now, contains both the canvas-core and canvas-library merged together, and currently acts as the main API. This will eventually disappear and be divided into the two components mentioned above.

**Frontend Admin** → Frontend of the Admin/Console Ecosystem connects directly to the main Kanvas API.

**Backend API SDK Skeletons** → Indirectly uses the Kanvas API via the SDK which also acts as a passthrough. Uses the canvas-library suite of components.