curl -X POST http://localhost:3030/v1/users -H "Content-Type: application/json" -d '{
"uuid": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
"name": "John",
"userName": "johndoe123",
"lastName": "Doe",
"email": "johndoe@example.com",
"password": "P@ssw0rd123",
"active": true,
"createdAt": "2022-01-30T12:00:00Z"
}'
