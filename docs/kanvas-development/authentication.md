---
sidebar_position: 9
---

# Authentication

Kanvas provides authentication from the get go, using JWT as our security protocol.

You will find an AuthController in the controller folder. This is just an extension of the CanvasAuthController, allowing you to overwrite any of the defined methods if you see fit.


```php
class AuthController extends CanvasAuthController
{
    
}
```


Methods Available: 

*   login: User login
*   signup: User Signup
*   changeUserEmail: Allow the user to change its email
*   socialLogin: Allow the user to use any of the different social login drivers we provide
*   recover: Recover user password

**Note:** We send all of the auth notification email via our central kanvas notification app, so go to your admin and overwrite the template if needed.

Routes Available: 
```
*   POST /v1/auth
*   POST /v1/auth/forgot
*   POST /v1/auth/rest/{key}
*   PUT /v1/auth/logout
*   POST /v1/users (signup)
*   CRUD /v1/users : We don’t allow you to create new users, they either have to register or you have to invite them to the app
```

So how those auth work?

*   To **login** you will need to POST /v1/auth , sending **email** and **password** in the body of the request. We send back a token for the frontend handle 

```json
{
   "token": "",
   "time": "2019-11-01 04:04:24",
   "expires": "2019-11-04 15:58:04",
   "id": 18
}
```

*   To **signup**, send via POST  /v1/users 

```
- firstname
- lastname
- email
- password 
- verify_password
- default_company 
```

We send back the user signup info + token so they can login 


```json
{
   "user": {
       "id": "90",
       "email": "test@mctekk.com",
       "password": null,
       "firstname": "algo",
       "lastname": "spou",
       "roles_id": 1,
       "displayname": "algo33",
       "default_company": 113,
       "default_company_branch": 96,
       "city_id": null,
       "state_id": null,
       "country_id": null,
       "registered": "2019-11-01 12:28:20",
       "lastvisit": "2019-11-01 12:28:20",
       "sex": "U",
       "dob": "2019-11-01",
       "timezone": "America/New_York",
       "phone_number": null,
       "cell_phone_number": null,
       "profile_privacy": 0,
       "profile_image": null,
       "profile_header": " ",
       "profile_header_mobile": null,
       "user_active": 1,
       "user_login_tries": 0,
       "user_last_login_try": 0,
       "session_time": 1572611302,
       "session_page": 1,
       "welcome": 0,
       "user_activation_key": "9fce3f9b0a91b7cdb86ac9b1d061553d92b51f07",
       "user_activation_email": "d7b80c79-fa11-4b92-a555-8090beb810e6",
       "user_activation_forgot": "",
       "language": "EN",
       "karma": null,
       "votes": null,
       "votes_points": null,
       "banned": "N",
       "system_modules_id": 2,
       "stripe_id": "cus_G7MFK67RsTFfhn",
       "card_last_four": null,
       "card_brand": null,
       "trial_ends_at": null,
       "created_at": "2019-11-01 12:28:20",
       "updated_at": "2019-11-01 12:28:22",
       "is_deleted": 0,
       "status": 1
   },
   "session": {
       "token": "",
       "time": "2019-11-01 12:28:22",
       "expires": "2019-11-05 00:22:02",
       "id": 90
   }
```
