![alt text](mulpericms.png "MulperiCMS")

# WORK IN PROGRESS

MulperiCMS is a markdown blogging platform that includes following applications:

#### Client

Blogging app and editor for creating new posts.
To start development, use `npm start`.

#### Node.js API for DynamoDB

Server side application with endpoints that the client app use for communicating with the database. To run API locally, use `npm run dev`. Then use http://localhost:3000/ to access the endpoints.

You need to have `mulpericms-posts` table in your DynamoDB with primary key `id`.

# Note:
Only fetching all posts work at the moment.

