# GraphQL-DocumentDB-Serverless

This a serverless application that can be deployed to Amazon Web Services. It creates a Lambda function that provides GraphQL-endpoints to query WordPress data from a DocumentDB database. 

Install and deploy to Amazon Web Services:

```
npm install
serverless deploy
```

The project comes with a pipeline that automatically deploys to a development and a production environment.
In order to make this work correctly, the Gitlab variables `DOCUMENTDB_USER`. `DOCUMENTDB_PASSWORD` and 
`DOCUMENTDB_URL` must be provided.

## Local Development 

You need to start Mongodb for Local development.
The local serverless instance can be started with the following command: 

```
sls offline start --allowCache
```

The URL for local MongoDB can be changed in the start.js file. 

## Docs
The documentation for all available GraphQL queries can be found by opening the `index.html` file in the `doc/schema` folder.
