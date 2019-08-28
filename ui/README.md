# Simple Booking Tool

The Simple Booking Tool is a CRUD web-app, developed with React on the front end and a Node.js server and MongoDB database on the back end.

## Setup

Once you have cloned the repository:
* `cd api` to navigate to the API directory
* `npm install` to install dependencies
* `docker-compose up` to start the Node.js and MongoDB services.

To run the React front end in development mode, follow the steps below in another terminal window:

* `cd ui` to navigate to the UI directory
* `npm install` to install dependencies
* `npm start` to start the local React dev-server

It's that simple!

##

## API Documentation

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

## DB implementation

Example booking document: 

~~~json
    {
        "_id": "5bcf9a8724aeed010fbe0469",
        "name": "My Booking",
        "date": "2018-02-04T00:00:00.000Z",
    }
~~~