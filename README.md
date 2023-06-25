[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/8AapHqUJ)
# Exam #N: "Exam Title"
## Student: s315906 Yarahmadi Pegah 

## React Client Application Routes

- Route `/`: page content and purpose
- Route `/something/:param`: page content and purpose, param specification
- ...

## API Server

- POST `/api/something`
  - request parameters and request body content
  - response body content
- GET `/api/something`
  - request parameters
  - response body content
- POST `/api/something`
  - request parameters and request body content
  - response body content
- ...

------------------------------------------------------------------------------------

### User management

#### Login

* HTTP method: `POST`  URL: `/api/sessions`
* Description: authenticate the user who is trying to login
* Request body: credentials of the user who is trying to login

``` JSON
{
    "username": "username",
    "password": "password"
}
```

* Response: `200 OK` (success)
* Response body: authenticated user

``` JSON
{
    "id": 1,
    "username": "john.doe@polito.it", 
    "name": "John"
}
```

* Error responses:  `500 Internal Server Error` (generic error), `401 Unauthorized User` (login failed)

------------------------------------------------------------------------------------

#### Check if user is logged in

* HTTP method: `GET`  URL: `/api/sessions/current`
* Description: check if current user is logged in and get her data
* Request body: _None_
* Response: `200 OK` (success)

* Response body: authenticated user

``` JSON
{
    "id": 1,
    "username": "john.doe@polito.it", 
    "name": "John"
}
```

* Error responses: `500 Internal Server Error` (generic error), `401 Unauthorized User` (user is not logged in)

------------------------------------------------------------------------------------

#### Logout

* HTTP method: `DELETE`  URL: `/api/sessions/current`
* Description: logout current user
* Request body: _None_
* Response: `200 OK` (success)

* Response body: _None_

* Error responses: `500 Internal Server Error` (generic error), `401 Unauthorized User` (user is not logged in)

------------------------------------------------------------------------------------

#### Get all pages

* HTTP method: `GET`  URL: `/api/pages`
* Description: Get the full list of pages
* Request body: _None_
* Request query parameter: _filter_ name of the filter to apply (filter-all, filter-published)
* Response: `200 OK` (success)
* Response body: Array of objects, each describing one page:

``` json
[
 {
    "id": 1,
    "user": 1,
    "title": "Season 2",
    "author": "John",
    "Creation_date": "2023-06-24",
    "publication_date": "2023-06-25",
    "blocks": [
      {"type":"HEADER","value":"This is the first header"},
      {"type":"IMAGE","value":{"title":"Image3","src":"/src/images/3.jpg"}},
      {"type":"PARAGRAPH","value":"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."},
      {"type":"IMAGE","value":{"title":"Image4","src":"/src/images/4.jpg"}}
          ]
  },
  {
    "id": 4,
    "user": 2,
    "title": "Sahar",
    "author": "Mario",
    "Creation_date": "2023-06-25",
    "publication_date": "2023-06-26",
    "blocks": [
      {"type":"HEADER","value":"asd"},
      {"type":"PARAGRAPH","value":"dfdfg"}
      ]
  },
  ...
]
```

* Error responses:  `500 Internal Server Error` (generic error)






## Database Tables

- Table `users` - contains id email name hash salt type
- Table `pages` - contains id user title author creation-date publication-date blocks
- Table `configuration` - contains titles for managing the change functionality of the website name

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)

Here you can find a list of the users already registered inside the provided database.

|         email         |   name   | plain-text password |
|-----------------------|----------|---------------------|
| john.doe@polito.it    | John     | password            |
| mario.rossi@polito.it | Mario    | password            |
| testuser@polito.it    | Testuser | password            |
