"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const schema_1 = require("./schema");
async function seed() {
    console.log('🌱 Seeding database...');
    try {
        // Insert 3 dummy users
        await index_1.db.insert(schema_1.users).values([
            { name: 'Alice Frontend', email: 'alice@zeto.com' },
            { name: 'Bob Backend', email: 'bob@zeto.com' },
            { name: 'Charlie Devops', email: 'charlie@zeto.com' },
        ]);
        console.log('✅ Database seeded successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seed();
