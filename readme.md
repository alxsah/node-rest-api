# API

`GET /bookings`

Returns all bookings in the bookings collection

`POST /bookings`

Create a new booking. Accepts the fields `name`, `address` and `datetime`.

`DELETE /bookings/:id`

Delete a booking with the associated booking ID

`UPDATE /users/:id`

Update booking with the associated booking ID

# DB implementation

Example booking document: 

~~~json
    {
        "id": "65118982",
        "name": "best pizza table for 2",
        "address": "43 smith drive",
    }
~~~