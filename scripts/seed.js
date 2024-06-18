const { sql } = require("@vercel/postgres");
const { users, experiences } = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedUsers() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS wm_users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        nickname VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "wm_users" table`);

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return sql`
          INSERT INTO wm_users (id, nickname, email, password)
          VALUES (${user.id}, ${user.nickname}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} wm_users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedExperiences() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS wm_experiences (
        user_id UUID NOT NULL,
        title TEXT NOT NULL,
        point INT NOT NULL,
        date DATE NOT NULL,
        PRIMARY KEY (user_id, date)
      );
    `;

    console.log(`Created "wm_experiences" table`);

    const insertedExperiences = await Promise.all(
      experiences.map(
        (experience) => sql`
        INSERT INTO wm_experiences (user_id, title, point, date)
        VALUES (${experience.userId}, ${experience.title}, ${experience.point}, ${experience.date})
      `
      )
    );

    console.log(`Seeded ${insertedExperiences.length} experiences`);

    return {
      createTable,
      experiences: insertedExperiences,
    };
  } catch (error) {
    console.error("Error seeding experiences:", error);
    throw error;
  }
}

(async () => {
  await seedUsers();
  await seedExperiences();
})();
