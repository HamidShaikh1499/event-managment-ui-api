// add user for login and test a apis
// you can this script directly on 3T Studio
db.getCollection("userdetails").insertOne({
    "_id": ObjectId("6850379ffbede4b74744152e"),
    "name": "User",
    "email": "user@event.com",
    "password": "$2b$10$2xpQ/PGWmbj3tV9n.xGECeOXwDhvQgx9cNhb9BdIjjZWjImMdFBzq",
    "hashKey": "$2b$10$2xpQ/PGWmbj3tV9n.xGECe",
    "createdAt": new Date(),
    "updatedAt": new Date()
});
