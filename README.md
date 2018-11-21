# Demo

* [NodeJS](https://nodejs.org/en/docs/)
* [Express](https://expressjs.com/en/starter/installing.html)
* [TypeScript](https://www.typescriptlang.org/docs/home.html)
* [InversifyJS](http://inversify.io)
* [TypeORM](http://typeorm.io/#/)
* [GraphQL](https://graphql.org/learn/) with [ApolloServer](ApolloServer)
* [Mocha](https://mochajs.org) with [Chai](https://www.chaijs.com/guide/)

## Install & Run

```bash
docker-compose up
npm install
npm test
npm start
```

The app is running on `http://localhost:3000/graphql`

You can try out to call GraphQL API: 

```graphql
mutation {
  createAuthor(firstName:"Jimmy", lastName: "Han") {
    firstName, lastName
  }
}

mutation {
  createBook(name:"My Book") {
    name
  }
  createAuthor(firstName:"Jimmy", lastName: "Han") {
    firstName, lastName
  }
}

query {
  getBooks {
    name
  }
  getAuthors{
    firstName, lastName
  }
}
```