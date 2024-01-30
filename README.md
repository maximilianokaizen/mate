## Create User CURL

curl -X POST http://localhost:3030/v1/users -H "Content-Type: application/json" -d '{
"uuid": "",
"name": "John",
"userName": "johndoe123",
"lastName": "Doe",
"email": "johndoe@example.com",
"password": "P@ssw0rd123",
"active": true,
"createdAt": "2022-01-30T12:00:00Z"
}'

## Get all users CURL

curl -X GET http://localhost:3030/v1/users

## Ger user by UUID

curl -X GET http://localhost:3030/v1/users/e2fbadaf-7f56-4a47-86d8-439e655369d8
