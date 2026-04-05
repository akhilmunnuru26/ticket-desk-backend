import { db } from './index';
import { users } from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Insert 3 dummy users
    await db.insert(users).values([
      { name: 'Alice Frontend', email: 'alice@zeto.com' },
      { name: 'Bob Backend', email: 'bob@zeto.com' },
      { name: 'Charlie Devops', email: 'charlie@zeto.com' },
    ]);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();