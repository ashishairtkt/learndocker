db = db.getSiblingDB("testdb");

db.users.insertMany([
  { name: "Ravi", role: "Admin" },
  { name: "Neha", role: "User" },
]);

print("✅ Default users added to MongoDB!");
