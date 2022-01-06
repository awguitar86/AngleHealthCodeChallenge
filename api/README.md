# Back-end for Front-end Interview

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)

## How to Use

### Start Backend

- Start Docker

```shell
docker build -t fe_interview .
docker run -t --name fe_interview -p 8000:8000 fe_interview
```

The backend will be accessible at `http://localhost:8000/`

### Stop Backend

```shell
docker stop fe_interview
docker rm -f fe_interview
```

## API Schema

### Get All Members

Sample request:

```http
GET /api/members HTTP/1.1
```

Sample response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "member_id": 1,
    "phone": "5551112222",
    "first_name": "Sour",
    "last_name": "Dough",
    "email": "sourdough@anglewellness.com"
  },
  {
    "member_id": 2,
    "phone": "",
    "first_name": "Sweet",
    "last_name": "Dough",
    "email": "sweetdough@anglewellness.com"
  }
]
```

### Get a Member

Sample request:

```http
GET /api/members/1 HTTP/1.1
```

Sample response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "member_id": 1,
  "phone": "5551112222",
  "first_name": "Sour",
  "last_name": "Dough",
  "email": "sourdough@anglewellness.com"
}
```

### Create a Member

Sample request:

```http
POST /api/members HTTP/1.1
Content-Type: application/json

{
  "first_name": "Spicy",
  "last_name": "Dough",
  "email": "spicydough@anglewellness.com"
}
```

Sample response:

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "member_id": 3,
  "phone": "",
  "first_name": "Spicy",
  "last_name": "Dough",
  "email": "spicydough@anglewellness.com"
}
```

### Change a Member

Sample request:

```http
PUT /api/members/1 HTTP/1.1
Content-Type: application/json

{
  "phone": "5552223333",
  "first_name": "Salty",
  "last_name": "Dough",
  "email": "saltydough@anglewellness.com"
}
```

Sample response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "member_id": 1,
  "phone": "5552223333",
  "first_name": "Salty",
  "last_name": "Dough",
  "email": "saltydough@anglewellness.com"
}
```

### Partially Change a Member

Sample request:

```http
PATCH /api/members/1 HTTP/1.1
Content-Type: application/json

{
  "phone": "5551234567"
}
```

Sample response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "member_id": 1,
  "phone": "5551234567",
  "first_name": "Sour",
  "last_name": "Dough",
  "email": "sourdough@anglewellness.com"
}
```

### Delete a Member

Sample request:

```http
DELETE /api/members/1 HTTP/1.1
```

Sample response:

```http
HTTP/1.1 204 No Content
```

## Fields

| Name         | Type     | Description                                                   |
| :----------- | :------- | :------------------------------------------------------------ |
| `member_id`  | `number` | Member ID (integer; read-only)                                |
| `first_name` | `string` | Member first name (max length 255)                            |
| `last_name`  | `string` | Member last name (max length 255)                             |
| `email`      | `string` | Member email (max length 254; has to be valid email)          |
| `phone`      | `string` | Member phone number (not required; empty string or 10 digits) |
