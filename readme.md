# API

`GET /bookings/:id`

Returns the booking with the associated ID

`POST /bookings`

Create a new booking. Accepts the fields `name`, `address` and `datetime`.

`DELETE /bookings/:id`

Delete a booking with the associated ID

`GET /users/:id/bookings`

Returns all bookings for a particular user

# DB implementation

Two collections, `users` and `bookings`. 
Example user document: 

~~~json
    {
        "id": "00001111",
        "username": "alex123",
        "email": "alex123@gmail.com",
        "bookings" [
            {
                "id": "65118982",
                "name": "...",
                "location": "...",
            }
            ...
        ]
    }
~~~


Example booking document: 

~~~json
    {
        "id": "65118982",
        "name": "best pizza table for 2",
        "address": "43 smith drive",
        ...
    }
~~~