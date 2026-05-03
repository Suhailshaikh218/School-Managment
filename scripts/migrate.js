require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const schema = `
-- ==================== USERS TABLE ====================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    clerk_user_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user',
    phone VARCHAR(20),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== SCHOOLS TABLE ====================
CREATE TABLE IF NOT EXISTS schools (
    id SERIAL PRIMARY KEY,
    school_code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    taluka VARCHAR(100),
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    principal_id INTEGER REFERENCES users(id),
    total_capacity INTEGER,
    current_strength INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== STUDENTS TABLE ====================
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(50) UNIQUE NOT NULL,
    school_id INTEGER REFERENCES schools(id),
    name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255) NOT NULL,
    b_form_number VARCHAR(20),
    cnic_number VARCHAR(15),
    dob DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    class VARCHAR(50) NOT NULL,
    section VARCHAR(10),
    roll_number VARCHAR(20),
    admission_date DATE NOT NULL,
    nationality VARCHAR(50) DEFAULT 'Pakistani',
    religion VARCHAR(50),
    domicile VARCHAR(100),
    blood_group VARCHAR(5),
    photo_url TEXT,
    
    -- Guardian Information
    guardian_type VARCHAR(20),
    guardian_name VARCHAR(255),
    guardian_cnic VARCHAR(15),
    guardian_phone VARCHAR(20),
    guardian_occupation VARCHAR(100),
    guardian_income DECIMAL(10,2),
    guardian_email VARCHAR(255),
    emergency_contact VARCHAR(20),
    
    -- Address
    address TEXT,
    city VARCHAR(100),
    district VARCHAR(100),
    postal_code VARCHAR(10),
    
    -- Financial
    fee_category VARCHAR(50) DEFAULT 'Regular',
    scholarship_type VARCHAR(50),
    fee_discount DECIMAL(5,2) DEFAULT 0,
    transport_required BOOLEAN DEFAULT FALSE,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== TEACHERS TABLE ====================
CREATE TABLE IF NOT EXISTS teachers (
    id SERIAL PRIMARY KEY,
    teacher_id VARCHAR(50) UNIQUE NOT NULL,
    school_id INTEGER REFERENCES schools(id),
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    cnic_number VARCHAR(15) UNIQUE NOT NULL,
    dob DATE,
    gender VARCHAR(10),
    designation VARCHAR(100),
    bps VARCHAR(10),
    subject VARCHAR(100),
    qualification VARCHAR(255),
    experience INTEGER,
    joining_date DATE,
    basic_salary DECIMAL(10,2),
    total_salary DECIMAL(10,2),
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    photo_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== ATTENDANCE TABLE ====================
CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    marked_by INTEGER REFERENCES users(id),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, date)
);

-- ==================== FEES TABLE ====================
CREATE TABLE IF NOT EXISTS fees (
    id SERIAL PRIMARY KEY,
    invoice_id VARCHAR(50) UNIQUE NOT NULL,
    student_id INTEGER REFERENCES students(id),
    fee_type VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0,
    net_amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    payment_date DATE,
    payment_method VARCHAR(50),
    receipt_no VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== INDEXES ====================
CREATE INDEX IF NOT EXISTS idx_students_school ON students(school_id);
CREATE INDEX IF NOT EXISTS idx_students_class ON students(class);
CREATE INDEX IF NOT EXISTS idx_teachers_school ON teachers(school_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
CREATE INDEX IF NOT EXISTS idx_fees_student ON fees(student_id);
CREATE INDEX IF NOT EXISTS idx_fees_status ON fees(status);
`;

async function migrate() {
    try {
        console.log('🔄 Starting database migration...');
        
        await pool.query(schema);
        
        console.log('✅ Database migration completed successfully!');
        console.log('📊 Tables created:');
        console.log('   - users');
        console.log('   - schools');
        console.log('   - students');
        console.log('   - teachers');
        console.log('   - attendance');
        console.log('   - fees');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

migrate();
