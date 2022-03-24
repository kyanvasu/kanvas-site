---
sidebar_position: 1
---

# Introduction

Kanvas Social package , allows you to implement a social layer to any kanvas app.

What do we consider a social layer?
- Follow Entity
- User Interactions
- Comment System
- User Feeds
- Group
- Channels
- Comment Interactions

Indexing Elastic Messages
-------------------------

To create a new index for messages use the following command:

``` bash
php cli/cli.php social indexMessages
```

Erasing the messages index
-------------------------

In case you want you want to erase the messages index, in your terminal, execute the following:

``` bash
 php cli/cli.php social eraseMessages
```