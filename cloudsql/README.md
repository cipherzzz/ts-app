# Cloudsql proxy
This is only required when attempting to connect to the cloudsql postgres instance from your development machine. It basically proxies local requests from localhost:5432 to the pg instance socket connection as that is how the connection works in GAE. 

If you are attempting any database operation on a remote cloudsql database whether it be running the app or manually running a migration, you MUST have this proxy running. You need to do two things
- Edit the start_proxy.sh script to include the instance connection name of the cloudsql instance you are attempting to connect to. This is what is defined in the `app.yaml` as `INSTANCE_CONNECTION_NAME` - minus the `/cloudsql`
```
./cloud_sql_proxy -instances=<project>:<region>:<instance>=tcp:5432
```
- Run the proxy as follows
```
./start_proxy.sh
```