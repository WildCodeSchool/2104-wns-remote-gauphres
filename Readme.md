# !MOOWDY

!Moowdy is here to improve your study experience and help you to share hobbies with others students.

# Components

Different components (an API and two clients - web and mobile -) compose the application.
Each componenthas his own README.

```bash 
.
├── Back # a Node GraphQL API with a mongo database
├── Front # a web interface in React and typescript
├── mobile # a mobile interface in expo, react native and typescript
```

MaJ projets en mono-repo : 23/06/2021
 
MaJ add mobile project: 6/09/2021

## Infrastructure
Docker is used to manage the project.

At First init :

- Folder Back : ``npm i``

- Folder Front: ``npm i``
  
- Folder Mobile `` yarn ``

Then, at the root of project : 

- CMD : `docker-compose up --build`
  
- Folder Mobile `` expo start ``
  
