# GraphQL-DocumentDB-Serverless



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
