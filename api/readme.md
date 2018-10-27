# API

`POST /register`

Register an account. Responds with auth token if successful.

`POST /login`

Log in with your username and password. Responds with auth token if successful.

`GET /bookings`

Returns all bookings created by the user

`GET /bookings/:id`

Returns a particular booking made by the user

`POST /bookings`

Create a new booking. Currently accepts the fields `name` and `date` (more will be added soon!)

`DELETE /bookings/:id`

Delete a booking with the associated booking ID

`UPDATE /users/:id`

Update booking with the associated booking ID

# DB implementation

Example booking document: 

~~~json
    {
        "_id": "5bcf9a8724aeed010fbe0469",
        "name": "My Booking",
        "date": "2018-02-04T00:00:00.000Z",
    }
~~~