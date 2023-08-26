import User from './user';

const database = {
  User
}

Object.keys(database).forEach(function (modelName) {
  if (database[modelName].associate) {
    database[modelName].associate(database);
  }
});

export default database;