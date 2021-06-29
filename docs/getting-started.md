---
sidebar_position: 2
---

# Getting Started

To develop a Kanvas App you need to define on what environment you want to start developing:

*   Web or Mobile

After choosing the environment, you have to decide on the backend technology for your API. With this out of the way, you can either start using the SDK, or our Template solution already implementing the SDK.

We support this initial language:

*   PHP
    *   PhalconPHP 
    *   Laravel
*   JavaScript
*   Go

Kanvas API was built with PHP, using the PhalconPHP Framework v3.x+.

## Installing a Kanvas Backend PHP API with PhalconPHP

### Requirements

Kanvas PHP Backend Template has a few requirements, all these are satisfied by our Docker Images. We highly recommend you use them for your development environment.

However, if you plan on running without them, you will need the following requirements

*   PHP >= 7.2 with the following extensions:
    *   PhalconPHP Extension
    *   Swoole Extension
    *   Mbstring Extension
    *   MCrypt Extension
    *   OpenSSL Extension
    *   PDO Extension
    *   JSON Extension
    *   Redis Extension
    *   Memcached Extension
    *   RabbitMQ 


### Installation

You will need to access kanvas.dev and create your account. Register a new App and get the Private and Public Application keys.

Once you have the keys, you can download the API Templates on this link, or you can skip this section where you learn how to start working with the Kanvas SDK / Components.

### Configuration

**Public Director**

After downloading the template you will need to configure the web server to point to `/path/name/api/public`, this will be the root to run your app.

**Configuration Files**

All configuration for this app will be handled on the .env file which should be placed in the root of the project. Create a new one by renaming the .env.example  located in the ci folder which is inside the storage folder.

**Directory Permissions**

Directories within the `storage` directories should be writable by your web server

**Application Key**

You will need to set your application keys on the .env file. Update the following keyword KANVAS_APP_PRIVATE_KEY


**Web Server Configuration**

We recommend you use nginx over apache for PHP if you are starting a new project.

In your nginx configuration, setup the following 

```
location / {

    try_files $uri $uri/ /index.php?$query_string;

}
```
