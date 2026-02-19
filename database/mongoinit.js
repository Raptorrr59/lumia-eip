db = db.getSiblingDB("lumia");

if (!db.getCollectionNames().includes("roles")) {
    db.createCollection("roles");
}

let roleNames = ["USER", "STAFF", "ADMIN"];
roleNames.forEach(roleName => {
    if (db.roles.countDocuments({ name: roleName }) === 0) {
        db.roles.insertOne({ name: roleName });
    }
});