// ============================================================
// SEMIS DATABASE SEEDER
// Populates Neon PostgreSQL with Sindh sample data
// ============================================================

require('dotenv').config();
const { Pool } = require('pg');
const sindhData = require('./sample_data_sindh.js');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function seedDatabase() {
    console.log('🌱 Starting database seeding...\n');
    
    try {
        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await pool.query('DELETE FROM fees');
        await pool.query('DELETE FROM attendance');
        await pool.query('DELETE FROM students');
        await pool.query('DELETE FROM teachers');
        console.log('✅ Existing data cleared\n');
        
        // Seed Students
        console.log('👨‍🎓 Seeding students...');
        for (const student of sindhData.students) {
            await pool.query(`
                INSERT INTO students (
                    student_id, name, father_name, b_form_number, cnic_number, dob, gender,
                    class, section, roll_number, admission_date, nationality, religion, domicile,
                    blood_group, guardian_type, guardian_name, guardian_cnic, guardian_phone,
                    guardian_occupation, guardian_income, guardian_email, emergency_contact,
                    address, city, district, postal_code, phone, email, fee_category,
                    scholarship_type, fee_discount, transport_required
                ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33)
            `, [
                student.studentId, student.name, student.fatherName, student.bFormNumber,
                student.cnicNumber, student.dob, student.gender, student.class, student.section,
                student.rollNumber, student.admissionDate, student.nationality, student.religion,
                student.domicile, student.bloodGroup, student.guardianType, student.guardianName,
                student.guardianCNIC, student.guardianPhone, student.guardianOccupation,
                student.guardianIncome, student.guardianEmail, student.emergencyContact,
                student.address, student.city, student.district, student.postalCode,
                student.phone, student.email, student.feeCategory, student.scholarshipType,
                student.feeDiscount, student.transportRequired
            ]);
        }
        console.log(`✅ Seeded ${sindhData.students.length} students\n`);
        
        // Seed Teachers
        console.log('👨‍🏫 Seeding teachers...');
        for (const teacher of sindhData.teachers) {
            await pool.query(`
                INSERT INTO teachers (
                    teacher_id, name, father_name, cnic_number, dob, gender, designation,
                    bps, subject, qualification, experience, joining_date, basic_salary,
                    total_salary, phone, email, address, city, district, postal_code
                ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)
            `, [
                teacher.teacherId, teacher.name, teacher.fatherName, teacher.cnicNumber,
                teacher.dob, teacher.gender, teacher.designation, teacher.bps, teacher.subject,
                teacher.qualification, teacher.experience, teacher.joiningDate,
                teacher.basicSalary, teacher.totalSalary, teacher.phone, teacher.email,
                teacher.address, teacher.city, teacher.district, teacher.postalCode
            ]);
        }
        console.log(`✅ Seeded ${sindhData.teachers.length} teachers\n`);
        
        // Verify counts
        const studentCount = await pool.query('SELECT COUNT(*) FROM students');
        const teacherCount = await pool.query('SELECT COUNT(*) FROM teachers');
        
        console.log('📊 Database Summary:');
        console.log(`   Students: ${studentCount.rows[0].count}`);
        console.log(`   Teachers: ${teacherCount.rows[0].count}`);
        console.log('\n✅ Database seeding completed successfully!');
        
    } catch (error) {
        console.error('❌ Seeding error:', error.message);
        throw error;
    } finally {
        await pool.end();
    }
}

// Run seeder
seedDatabase().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
