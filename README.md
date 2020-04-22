# monterail-elearning

# BE architecture
Backend architecture is constructed by microservices.
The entrypoint to each of them is authentication-api which provides authentication and proxy service. 
To access resources, the user (student) has to be authenticated.
To add resources, the user (teacher) needs to be an admin (has flag set to `is_staff=True` in authentication-api).

# Run BE microservices
In the main directory `monterail-elearning` run `make run` to start docker-compose.
Microservices: 
- authentication-api: `http://localhost:8080/swagger/`
- lesson-api: `http://localhost:8000/swagger/`
- tests-api: `http://localhost:3000/swagger/`

Register your email address using POST authentication-api endpoint `/auth/email/register/` via Swagger.
Copy token and use it to authorize your request, using `Bearer <token>`
Route each request to microservice through `authentication-api`.

# Add lessons to database
- In the main directory `monterail-elearning` run `make lesson_load_data`

# Create developer account
- In the main directory `monterail-elearning` run `make auth_api_superuser`

# Create student account
- Register your email address using POST authentication-api endpoint `/auth/email/register/` via Swagger.
  Log in (via Swagger `http://localhost:8080/swagger`) and use obtained credentials to GET lessons and tests.

# Create teacher account
- Register your email address using POST authentication-api endpoint `/auth/email/register/` via Swagger.
  Use developer account to login on `http://localhost:8080/admin/`.
  Navigate to `Users`, choose the previously registered account and assign the admin rights marking `is_staff` as True.
  Log out and log in using teacher's credentials (via Swagger `http://localhost:8080/swagger`).
  Right now you are able to add/update lessons and tests.

# Cleanup docker containers
- In the main directory `monterail-elearning` run `make cleanup`


# FE architecture
TBD
