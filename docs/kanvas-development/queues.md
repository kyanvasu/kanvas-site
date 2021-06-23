---
sidebar_position: 13
---

# Queues

Kanvas provides two backends to handle queues, Rabbitmq or AWS SQS. These queues will allow you to move time-consuming tasks, such as sending push notifications, to a later time in the app. 

One of the key differences when using our queue manager is that it runs asynchronous thanks to Swoole. This means that even if you send multiple tasks to it, it won't slow down because it has to wait until one process ends to process the other one.

## Creating a Job

All our jobs are stored in `_cli/jobs_`, we follow the same flow as a laravel Job where the logic is located on the handle function. 


```php
<?php

use Baka\Contracts\Queue\QueueableJobInterface;
use Baka\Jobs\Job;
use Canvas\Notifications\PusherNotification;
use Phalcon\Di;

class Pusher extends Job implements QueueableJobInterfase
{
    /**
     * Realtime channel.
     *
     * @var string
     */
    protected $channel;

    /**
     * Realtime event.
     *
     * @var string
     */
    protected $event;

    /**
     * Realtime params.
     *
     * @var array
     */
    protected $params;

    /**
     * Constructor setup info for Pusher.
     *
     * @param string $channel
     * @param string $event
     * @param array $params
     */
    public function __construct(PusherNotification $pusherNotification)
    {
        $this->channel = $pusherNotification->channel;
        $this->event = $pusherNotification->event;
        $this->params = $pusherNotification->params;
    }

    /**
     * Handle the pusher request.
     *
     * @return void
     */
    public function handle()
    {
        $pusher = Di::getDefault()->getPusher();
        return $pusher->trigger($this->channel, $this->event, $this->params);
    }
}
```


As you can see, we use the constructor to pass the information needed on this queue, and you can process it using your own logic on the handle function. 

In order to call this job, we need to run the dispatch function and pass the information the job is expecting on its constructor.


```php
 Pusher::dispatch($pusherNotification);
```

**Note:** All logs of the jobs running are stored on `storage/logs/api.log`


## Available Queue Types

Kanvas runs 3 different queues: **Events**, **Notifications** and **Jobs**. If you need to define another queue, you can do so by writing your queue process action on the **_QueueTask_** located in `cli/tasks/QueueTask`.

We hope you don't have to, since our jobs are async, you won't run into many FIFO issues where you have slow jobs halting your progress.


## Firing Events

Kanvas events serve as a simpler interface to Phalcon own Event Manager, by providing a way to handle them.

**Note:** If you still don't know how events work please read [phalcon documentation](https://docs.phalcon.io/4.0/en/events).

Events Listeners are located in `library/Listeners`. Listeners provide you an easy way to handle multiple events. 


```php
<?php

declare(strict_types=1);

namespace Canvas\Listener;

use Phalcon\Events\Event;
use Baka\Mail\Message;
use Canvas\Cli\Jobs\Pusher;
use Canvas\Cli\Jobs\PushNotifications;
use Canvas\Notifications\PusherNotification;
use Canvas\Notifications\PushNotification;

class Notification
{
    /**
     * From a given mail message send it now.
     *
     * @param Event $event
     * @param Message $mail
     * @return mixed
     */
    public function sendMail(Event $event, Message $mail)
    {
        return $mail->sendNow();
    }

    /**
     * From a given push notification send it to the user.
     *
     * @param Event $event
     * @param PusherNotification $pusherNotification
     * @return void
     */
    public function sendPushNotification(Event $event, PushNotification $pushNotification)
    {
        return PushNotifications::dispatch($pushNotification);
    }

    /**
     * From a given notification send its realtime websocket.
     *
     * @param Event $event
     * @param PusherNotification $pusherNotification
     * @return void
     */
    public function sendRealtime(Event $event, PusherNotification $pusherNotification)
    {
        return Pusher::dispatch($pusherNotification);
    }
}
```


First, you have to register them on the EventManagerProvider


```php
    protected $listeners = [
        'subscription' => Subscription::class,
        'user' => User::class,
        'company' => Company::class,
        'notification' => Notification::class,
    ];
```


Then, you can call them from within your app by firing them


```php
 $this->fire('notification:sendMail', $toMail);
```


In order to use this simple **_fire_** function you must specify the trait EventManagerAwareTrait when using events, if not you can call them directly from the DI 

**Note:** Again we are just using normal phalcon events


## Firing Events to Queues:

We allow you to send the events to background process, this will help with slow tasks like sending emails and so on. 

In order to do so, you just need to call fireToQueue instead of fire


```php
$this->fireToQueue('notification:sendMail', $toMail);
```


This process will run on the **events** queue