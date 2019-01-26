![alt text](mulpericms.png 'MulperiCMS')

---

# WORK IN PROGRESS

MulperiCMS is a markdown blogging platform that includes following applications.

# AWS (Cognito, DynamoDB)

At first time you need to use `npm run make-bucket` to create bucket for the cloudformation template. After that, use `npm run package-deploy` to deploy CloudFormation stack with Cognito and it's app client settings and DynamoDB for the blog posts.

# Client

Angular blogging app and editor for creating new posts.

To start development, use `npm start`.

To deploy Angular client to S3 first time, use `npm run make-bucket` to create bucket for the app and then `npm run deploy`. The idea is that you have serve the Angular app as a static website from S3.

# API

Node.js REST API for DynamoDB

Server side application with endpoints that the client app use for communicating with the database.

To run API locally, use `npm run dev`. You need `.env` file with AWS credentials. Use http://localhost:3000/ to access the endpoints.

You need to have `mulpericms-posts` table in your DynamoDB with primary key `id`.

# Notes

#### Cognito notes

You need to create a userpool to Cognito and add it's details to API Node.js app.

Also do not enable client secret when creating user pool app client:

"When creating the App, the generate client secret box must be unchecked because the JavaScript SDK doesn't support apps that have a client secret."

### tsconfig.app.json notes

Add compiler option -> "types": ["node"]

### aws-sdk (if in use) requires global window object

Add this to polyfills.ts

(window as any).global = window;

# Helpful links

### Verifying Cognito JWT

https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html

## CloudFormation: Cognito app client

https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html

## CloudFormation: Cognito user pool

https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-emailverificationmessage
