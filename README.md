# Intro to MongoDB
> Scott Moss & Frontend Masters

- [Resources](#resources)
- [Course](#course)
- [Excercises](#excercises)
  - [Installing MongoDB](#installing-mongodb)
  - [Models](#models)
  - [Queries](#queries)
  - [Hooks](#hooks)
  - [App](#app)

## Resources
* [MongoDB Docs](https://docs.mongodb.com/)
* [MongoDB Installation](https://www.mongodb.com/download-center#community)
* [Mongoose](https://mongoosejs.com/docs/guide.html)
* [mLab](https://mlab.com/)

## Course
Thanks for taking the [Introduction to MongoDB course](https://frontendmasters.com/courses/mongodb/), created by Scott Moss & Frontend Masters. This course aims to cover a wide intro into using MongoDb with Nodejs. Topics refrain from going deep, but instead, focus on a wide view.

## Exercises

### Installing MongoDB
There are many ways to install MongoDB. [The offical website](https://www.mongodb.com/download-center#community) has you covered either way. After installation, you might have to add a `dbPath`, a location where mongodb saves your data. You can do so like this.
```bash
mkdir -p /data/db
```
Note: If you have an error like "data directory not found" or "permission denied" while installing MongoDB:
```bash
sudo mkdir -p /data/db
sudo chown -R $USER /data/db
```

### Models
* location - `exercises/models`
* commands
  * test - `yarn test exercises/models/__test__/` or `npm test exercises/models/__test__/`

This exercise will have you create connection logic and mongoose schemas. Using the schema, you must create some CRUD functionality.

- [ ] check out to the `start` branch
- [ ] install node modules with npm or yarn
- [ ] check the README on how to run test
- [ ] create connection logic on `connect.js`
- [ ] finish the user schema so that the the user model tests pass
- [ ] complete the crud functions with the user model and get all the crud test to pass 

### Queries
* location - `exercises/queries`
* commands
  * test - `yarn test exercises/queries/__test__/` or `npm test exercises/queries/__test__/`

This exercise will have you add relationships between models. You'll then use those models to create slightly more advanced queries than the last exercise

- [ ] check out to the `start` branch
- [ ] check the README on how to run your test
- [ ] the post model should have have a one-to-one author field that points to the author collection
- [ ] the post model should have a one-to-many similarPost field that points to posts
- [ ] get all the post model tests to pass
- [ ] get all the query tests to pass

### Hooks
* location - `exercises/hooks`
* commands
  * test - `yarn test exercises/hooks/__test__/` or `npm test exercises/hooks/__test__/`

In this exercise, you'll learn how to use schema middleware and virtuals. Also, you'll dig into indexes in more detail and create compound indexes.

- [ ] check out to the `start` branch
- [ ] check the README on how to run your test
- [ ] add a compound index to the project schema so that project names are unique per org
- [ ] add a virtual getter to the project schema called `budgetLeft` that calculates how much budget is left vs how much is spent so far
- [ ] add a post remove hook to the org schema that removes all projects associated with the org
- [ ] add a virtual getter to the org schema called `avatar` that creates the fill url to the org avatar by concatinating the cdnUrl with the org id
- [ ] get all org tests to pass
- [ ] get all project tests to pass

### App
* location - `exercises/app`
* commands
  * start the server - `node exercises/app/index.js`

In this exercise, you'll have to create queries in Expressjs controllers to satisfy the request. You'll learn how to use mongodb in an API environment. You'll also have the couse to use a hosted MongoDB.

- [ ] check out to the `start` branch
- [ ] check the README on how to run your server
- [ ] create db query for `GET /todo/:id`
- [ ] create db query for `GET /todo`
- [ ] create db mutation for `POST /todo/`
- [ ] **optional** create a mLab sandbox and use your hosted DB

## Debugging
Note: To handle the error `MongoError: E11000 duplicate key error collection` drop the database.

```bash
mongo
use dbName;
db.dropDatabase();
exit
```

(dbName is the name of the database)
