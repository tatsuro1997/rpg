const { sql } = require("@vercel/postgres");

async function resetDB() {
  try {
    // テーブルを個別に削除
    await sql`DROP TABLE IF EXISTS wm_experiences;`;
    await sql`DROP TABLE IF EXISTS wm_users;`;

    console.log("Existing tables dropped.");

    // 拡張機能を有効化
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

    // テーブルを再作成
    await sql`
      CREATE TABLE IF NOT EXISTS wm_users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        nickname VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS wm_experiences (
        user_id UUID NOT NULL,
        title TEXT NOT NULL,
        point INT NOT NULL,
        date DATE NOT NULL,
        PRIMARY KEY (user_id, date)
      );
    `;

    console.log("New tables created.");
  } catch (error) {
    console.error("Error resetting database:", error);
    throw error;
  }
}

(async () => {
  await resetDB();
})();
