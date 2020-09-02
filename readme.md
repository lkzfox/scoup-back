## Testing
* Install Docker
* Run postgres 9.5 image 
```s
    docker run --name scoup_test_bd --publish 5433:5432 -e POSTGRES_HOST_AUTH_METHOD=trust postgres:9.5
```
* Create database for tests named 'scoup_tests'
* Create schema 'scoup_dev'