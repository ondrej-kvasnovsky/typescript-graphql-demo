# Demo for NodeJS, TypeScript, TypeORM, ApolloServer (GraphQL), Express

## Install & Run

```bash
docker-compose up
npm install
npm test
npm start
```

The app is running on http://localhost:3000/graphql

You can try out to call GraphQL API: 

```graphql
mutation {
  createBook(name:"My Book") {
    name
  }
}

query {
  getBooks {
    name
  }
  getAuthors{
    firstName
  }
}
```