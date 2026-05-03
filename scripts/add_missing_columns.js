require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function addMissingColumns() {
    console.log('🔄 Adding missing columns...\n');
    
    try {
        // Add missing columns to students table
        await pool.query(`
            ALTER TABLE students 
            ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
            ADD COLUMN IF NOT EXISTS email VARCHAR(255);
        `);
        console.log('✅ Added phone and email to students');
        
        // Add missing columns to teachers table
        await pool.query(`
            ALTER TABLE teachers 
            ADD COLUMN IF NOT EXISTS city VARCHAR(100),
            ADD COLUMN IF NOT EXISTS district VARCHAR(100),
            ADD COLUMN IF NOT EXISTS postal_code VARCHAR(10);
        `);
        console.log('✅ Added city, district, postal_code to teachers');
        
        console.log('\n✅ All missing columns added successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

addMissingColumns();
