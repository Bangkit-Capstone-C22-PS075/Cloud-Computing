# Cloud Computing
Express JS rest-api for D-jahit application

Built with :
* Node v16 (Express js)
* MySql RDBMS
* Google App Engine
* Google Cloud Storage
* Google Cloud SQL

## Install the dependencies
```bash
npm install
```

### Start the app in development mode
```bash
npm start
```

## Configure app.yaml file
<pre>
runtime: nodejs16

env_variables:
  INSTANCE_UNIX_SOCKET: /cloudsql/{your-sql-instance-connection-name}
  DB_USER: {your-db-user}
  DB_NAME: {your-database-name}
  GCLOUD_STORAGE_BUCKET: {your-bucket}
</pre>

Migrate database schema :
* Import d-jahit-relational.sql database

