---
sidebar_position: 14
---

# Notifications

Kanvas provides a notification service. Similar to laravel, it's an information messaging system  used for sending PushNotifications, Email, SmS, Real time notification and any other type of channel you decide to add. Notifications are located at `library\Notifications`


## Creating a notification

```php
<?php

namespace Canvas\Notifications;

use Canvas\Contracts\Notifications\NotificationInterface;
use Baka\Mail\Message;
use Phalcon\Di;

class ResetPassword extends Notification implements NotificationInterface
{
    protected $type = Notification::APPS;
    //protected $useQueue = true;

    /**
     * Notification msg.
     *
     * @return string
     */
    public function message(): string
    {
        $app = Di::getDefault()->getApp();

        $resetPasswordUrl = $app->url . '/users/reset-password/' . $this->fromUser->user_activation_forgot;

        return "Hi {$this->fromUser->firstname} {$this->fromUser->lastname}, click the following link to reset your password: <a href='{$resetPasswordUrl}'>Reset Password</a> <br /><br />
                Thanks ";
    }

    /**
     * Email body.
     *
     * @return Message|null
     */
    public function toMail(): ?Message
    {
        $app = Di::getDefault()->getApp();

        return $this->mail->to($this->fromUser->getEmail())
            ->subject($app->name .' - Password Reset')
            ->content($this->message());
    }
}
```


You have to define a class that extends from **_Canvas\Notifications\Notification_** and implements **_NotificationInterfase._**

You define the message you want to be processed and the message function and then  provide you with the following methods:


*   toMail
*   toPushNotification
*   toRealTime

You will always have the properties **toUser **and **fromUser **, with User entities so that you know who we are notifying and how is sending the notification. Also, notifications expect to receive a Phalcon Model in its construct, in reference to the entity where the action occurred that we are letting the user know.


```php
    /**
     * Constructor.
     *
     * @param AbstractModel $entity
     */
    public function __construct(Model $entity)
    {
        $this->entity = $entity;
    }
```


## Using Kanvas Notification Templates

For distributed apps, it's recommended not to store files locally and use 3rd party services like S3. With kanvas we recommend using our template management interface. Basically we allow you to save volts templates for your app on the DB for easier access.

```php
class Signup extends Notification implements NotificationInterfase
{
    //protected $useQueue = true;
    /**
     * Notification msg.
     *
     * @return string
     */
    public function message(): string
    {
        return Template::generate('users-registration', $this->entity->toArray());
    }
    
    /**
     * Email body.
     *
     * @return Message|null
     */
    public function toMail(): ?Message
    {
        $app = Di::getDefault()->getApp();
        return $this->mail->to($this->entity->getEmail())
            ->subject('Welcome to ' . $app->name)
            ->content($this->message());
    }
        
```

In order to create a template just access Kanvas Admin App and go to the template section. Remember we use [volt](https://docs.phalcon.io/4.0/en/volt) to parse the template you can most of its features.

In order to use Kanvas templates, generate providing the name, and the array of the variables you want it to replace.

`Template::generate('users-registration', $this->entity->toArray())`

## Sending Notifications

Notifications are sent to users, so you will need to add NotifiableTrait to your User model. By default Kanvas Users model already has it implemented.


```php
 $user>notify(new ResetPassword($recoverUser));
```


As you can tell we didn't run the toAction function since it internally will do so for us.

If we need to notify more than one user we can use **_all._**


```php
 $notify::all($user, new ResetPassword($recoverUser));
```


Where users is a user array list.


## Queue Notifications

We can queue a notification by just setting the property useQueue 


```php
class Invitation extends Notification implements NotificationInterface
{
    protected $useQueue = true;
```


This will use the Kanvas queue notification and run async.
