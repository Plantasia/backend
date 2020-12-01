module.exports={
   "type": "mysql",
   "host": "localhost",
   "port": 3306,
   "username": "root",
   "password": "porangaba2305",
   "database": "plantasia",
   "synchronize": true,
   "logging": false,
   "entities": ["build/**/*.entity.js"],
   "migrations": [
      "build/migration/*.js"
   ],
   "cli": {
      "entitiesDir": "build/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}