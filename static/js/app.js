// School Management System - JavaScript

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        // Show main app and hide login
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainApp').style.display = 'flex';
        initializeApp();
    } else {
        // Show login page and setup login form
        document.getElementById('loginPage').style.display = 'flex';
        document.getElementById('mainApp').style.display = 'none';
        setupLoginForm();
        
        // Inject Sindh logo on login page
        const loginLogo = document.querySelector('.login-logo');
        if (loginLogo && !loginLogo.querySelector('.sindh-logo-login')) {
            const logoImg = document.createElement('img');
            logoImg.src = 'static/img/sindh-logo.svg';
            logoImg.alt = 'Government of Sindh';
            logoImg.className = 'sindh-logo-login';
            loginLogo.insertBefore(logoImg, loginLogo.firstChild);
        }
    }
});

// Setup login form
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    
    // Default credentials
    const validCredentials = {
        'admin': 'admin123',
        'principal': 'principal123',
        'teacher': 'teacher123'
    };
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (!username || !password) {
            showError('Please enter both username and password');
            return;
        }
        
        // Check default credentials first
        if (validCredentials[username] && validCredentials[username] === password) {
            // Successful login with default credentials
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            
            // Hide login and show main app
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('mainApp').style.display = 'flex';
            
            // Initialize the app
            initializeApp();
            return;
        }
        
        // Check registered users from sign up
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const registeredUser = users.find(u => u.username === username && u.password === password && u.isActive);
        
        if (registeredUser) {
            // Successful login with registered user
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            localStorage.setItem('currentUserData', JSON.stringify(registeredUser));
            
            // Hide login and show main app
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('mainApp').style.display = 'flex';
            
            // Initialize the app
            initializeApp();
        } else {
            // Failed login
            showError('Invalid username or password');
        }
    });
}

// Show error message
function showError(message) {
    const loginError = document.getElementById('loginError');
    loginError.textContent = message;
    loginError.style.display = 'block';
    
    // Hide error after 3 seconds
    setTimeout(() => {
        loginError.style.display = 'none';
    }, 3000);
}

// Logout function
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    logoutBtn.addEventListener('click', function() {
        // Clear login status
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserData');
        
        // Show login page and hide main app
        document.getElementById('loginPage').style.display = 'flex';
        document.getElementById('mainApp').style.display = 'none';
        
        // Reset form
        document.getElementById('loginForm').reset();
    });
}

// Data Management — BACKEND INTEGRATED
let schoolData = {
    students: [],
    teachers: [],
    courses: [],
    attendance: [],
    grades: [],
    schedules: [],
    fees: [],
    activities: [],
    events: []
};

let USE_BACKEND = true; // Toggle: true = Backend API, false = LocalStorage

async function loadData() {
    if (USE_BACKEND) {
        try {
            // Load from backend
            schoolData.students = await API.fetchStudents();
            schoolData.teachers = await API.fetchTeachers();
            schoolData.fees = await API.fetchFees();
            console.log('✅ Data loaded from backend:', schoolData.students.length, 'students');
        } catch (error) {
            console.error('❌ Backend load failed, using localStorage:', error);
            USE_BACKEND = false;
            loadDataFromLocalStorage();
        }
    } else {
        loadDataFromLocalStorage();
    }
}

function loadDataFromLocalStorage() {
    const savedData = localStorage.getItem('schoolData');
    if (savedData) {
        schoolData = JSON.parse(savedData);
    } else {
        initializeSampleData();
    }
}

function saveData() {
    // Always save to localStorage as backup
    localStorage.setItem('schoolData', JSON.stringify(schoolData));
}

function initializeSampleData() {
    // Check if Sindh enhanced data is available
    if (typeof sindhSchoolData !== 'undefined') {
        console.log('✅ Loading Sindh Enhanced Data...');
        schoolData.students = sindhSchoolData.students || [];
        schoolData.teachers = sindhSchoolData.teachers || [];
        schoolData.courses = sindhSchoolData.courses || [];
        console.log('✅ Loaded: ' + schoolData.students.length + ' students, ' + schoolData.teachers.length + ' teachers');
        
        // Keep other data structures
        schoolData.attendance = [];
        schoolData.grades = [];
        schoolData.schedules = [];
        schoolData.fees = [];
        schoolData.activities = [
            { icon: '👨‍🎓', text: 'System initialized with Sindh data', time: 'Just now' }
        ];
        schoolData.events = [
            { text: 'Parent-Teacher Meeting', date: 'May 20, 2026' },
            { text: 'Annual Exams', date: 'June 1, 2026' }
        ];
        
        saveData();
        return;
    }
    
    // Fallback: Original sample data
    console.log('⚠️ Sindh data not found, using original sample data');
    // Sample Students
    schoolData.students = [
        { 
            id: 'STU001', 
            name: 'Ali Ahmed', 
            fatherName: 'Abdul Rahman', 
            dob: '2010-05-15',
            gender: 'Male',
            admissionNumber: 'ADM001',
            nationality: 'Pakistani',
            religion: 'Islam',
            bloodGroup: 'A+',
            address: 'Main Street',
            street: 'House 12, Block A',
            city: 'Karachi',
            district: 'Karachi Central',
            postalCode: '74000',
            email: 'ali@example.com', 
            phone: '555-0101', 
            languages: 'Urdu, English',
            class: 'Class 5' 
        },
        { 
            id: 'STU002', 
            name: 'Ahsan Khan', 
            fatherName: 'Muhammad Khan', 
            dob: '2009-08-22',
            gender: 'Male',
            admissionNumber: 'ADM002',
            nationality: 'Pakistani',
            religion: 'Islam',
            bloodGroup: 'B+',
            address: 'Garden Road',
            street: 'House 5, Block B',
            city: 'Lahore',
            district: 'Lahore Cantonment',
            postalCode: '54000',
            email: 'ahsan@example.com', 
            phone: '555-0102', 
            languages: 'Urdu, English, Punjabi',
            class: 'Class 6' 
        },
        { 
            id: 'STU003', 
            name: 'Manzar Abbas', 
            fatherName: 'Hassan Ali', 
            dob: '2011-02-10',
            gender: 'Male',
            admissionNumber: 'ADM003',
            nationality: 'Pakistani',
            religion: 'Islam',
            bloodGroup: 'O+',
            address: 'University Road',
            street: 'House 8, Block C',
            city: 'Hyderabad',
            district: 'Hyderabad East',
            postalCode: '71000',
            email: 'manzar@example.com', 
            phone: '555-0103', 
            languages: 'Urdu, English, Sindhi',
            class: 'Class 4' 
        },
        { 
            id: 'STU004', 
            name: 'Shabab Haider', 
            fatherName: 'Ahmed Hassan', 
            dob: '2010-11-30',
            gender: 'Male',
            admissionNumber: 'ADM004',
            nationality: 'Pakistani',
            religion: 'Islam',
            bloodGroup: 'AB+',
            address: 'Railway Colony',
            street: 'House 15, Block D',
            city: 'Multan',
            district: 'Multan Sadar',
            postalCode: '60000',
            email: 'shabab@example.com', 
            phone: '555-0104', 
            languages: 'Urdu, English, Punjabi',
            class: 'Class 7' 
        },
        { 
            id: 'STU005', 
            name: 'Amna Javed', 
            fatherName: 'Umar Farooq', 
            dob: '2009-07-18',
            gender: 'Female',
            admissionNumber: 'ADM005',
            nationality: 'Pakistani',
            religion: 'Islam',
            bloodGroup: 'A-',
            address: 'Civil Lines',
            street: 'House 3, Block E',
            city: 'Peshawar',
            district: 'Peshawar Cantonment',
            postalCode: '25000',
            email: 'amna@example.com', 
            phone: '555-0105', 
            languages: 'Urdu, English, Pashto',
            class: 'Class 11' 
        }
    ];

    // Sample Teachers
    schoolData.teachers = [
        { 
            id: 'TCH001', 
            name: 'Imran Ali', 
            fatherName: 'Abdul Hameed', 
            dob: '1985-03-15',
            gender: 'Male',
            admissionNumber: 'TID001',
            email: 'imran@school.com', 
            subject: 'Mathematics', 
            qualification: 'M.Sc Mathematics, B.Ed',
            experience: '8',
            nationality: 'Pakistani',
            religion: 'Islam',
            bloodGroup: 'A+',
            address: 'University Road',
            street: 'House 10, Block C',
            city: 'Karachi',
            district: 'Karachi Central',
            postalCode: '74000',
            phone: '555-0201' 
        },
        { 
            id: 'TCH002', 
            name: 'Zahoor Ahmed', 
            fatherName: 'Muhammad Yousaf', 
            dob: '1982-07-22',
            gender: 'Male',
            admissionNumber: 'TID002',
            email: 'zahoor@school.com', 
            subject: 'Science', 
            qualification: 'M.Sc Chemistry, B.Ed',
            experience: '12',
            nationality: 'Pakistani',
            religion: 'Islam',
            bloodGroup: 'B+',
            address: 'Gulshan-e-Iqbal',
            street: 'House 25, Block F',
            city: 'Karachi',
            district: 'Gulshan',
            postalCode: '75300',
            phone: '555-0202' 
        },
        { 
            id: 'TCH003', 
            name: 'Badar Ul Din', 
            fatherName: 'Hafeez Ahmad', 
            dob: '1988-11-10',
            gender: 'Male',
            admissionNumber: 'TID003',
            email: 'badar@school.com', 
            subject: 'English', 
            qualification: 'M.A English Literature, B.Ed',
            experience: '6',
            nationality: 'Pakistani',
            religion: 'Islam',
            bloodGroup: 'O+',
            address: 'Defence Housing Authority',
            street: 'House 5, Block 1',
            city: 'Lahore',
            district: 'Cantonment',
            postalCode: '54700',
            phone: '555-0203' 
        },
        { 
            id: 'TCH004', 
            name: 'Mam Sadia', 
            fatherName: 'Abdul Rashid', 
            dob: '1990-05-18',
            gender: 'Female',
            admissionNumber: 'TID004',
            email: 'sadia@school.com', 
            subject: 'History', 
            qualification: 'M.A History, M.Ed',
            experience: '5',
            nationality: 'Pakistani',
            religion: 'Islam',
            bloodGroup: 'A-',
            address: 'Model Town',
            street: 'House 12, Block G',
            city: 'Lahore',
            district: 'Ravi Town',
            postalCode: '54000',
            phone: '555-0204' 
        }
    ];

    // Sample Courses
    schoolData.courses = [
        { id: 'CRS001', name: 'Mathematics 101', code: 'MATH101', teacherId: 'TCH001', credits: 4 },
        { id: 'CRS002', name: 'Science 101', code: 'SCI101', teacherId: 'TCH002', credits: 3 },
        { id: 'CRS003', name: 'English Literature', code: 'ENG201', teacherId: 'TCH003', credits: 3 },
        { id: 'CRS004', name: 'World History', code: 'HIS101', teacherId: 'TCH004', credits: 3 },
        { id: 'CRS005', name: 'Advanced Mathematics', code: 'MATH201', teacherId: 'TCH001', credits: 4 }
    ];

    // Sample Schedules
    schoolData.schedules = [
        { id: 'SCH001', day: 'Monday', time: '08:00', courseId: 'CRS001', room: 'Room 101' },
        { id: 'SCH002', day: 'Monday', time: '10:00', courseId: 'CRS002', room: 'Lab A' },
        { id: 'SCH003', day: 'Tuesday', time: '09:00', courseId: 'CRS003', room: 'Room 102' },
        { id: 'SCH004', day: 'Tuesday', time: '11:00', courseId: 'CRS004', room: 'Room 103' },
        { id: 'SCH005', day: 'Wednesday', time: '08:00', courseId: 'CRS001', room: 'Room 101' },
        { id: 'SCH006', day: 'Wednesday', time: '10:00', courseId: 'CRS002', room: 'Lab A' },
        { id: 'SCH007', day: 'Thursday', time: '09:00', courseId: 'CRS003', room: 'Room 102' },
        { id: 'SCH008', day: 'Thursday', time: '11:00', courseId: 'CRS004', room: 'Room 103' },
        { id: 'SCH009', day: 'Friday', time: '08:00', courseId: 'CRS001', room: 'Room 101' },
        { id: 'SCH010', day: 'Friday', time: '10:00', courseId: 'CRS005', room: 'Room 104' }
    ];

    // Sample Fees
    schoolData.fees = [
        { 
            id: 'INV001', 
            studentId: 'STU001', 
            feeType: 'Tuition', 
            amount: 500, 
            dueDate: '2024-02-15', 
            status: 'paid', 
            paidDate: '2024-02-10',
            paymentMethod: 'Cash',
            receiptNo: 'REC001'
        },
        { 
            id: 'INV002', 
            studentId: 'STU002', 
            feeType: 'Admission', 
            amount: 500, 
            dueDate: '2024-02-15', 
            status: 'pending',
            paymentMethod: ''
        },
        { 
            id: 'INV003', 
            studentId: 'STU003', 
            feeType: 'Library', 
            amount: 500, 
            dueDate: '2024-01-30', 
            status: 'overdue',
            paymentMethod: ''
        },
        { 
            id: 'INV004', 
            studentId: 'STU004', 
            feeType: 'Development', 
            amount: 600, 
            dueDate: '2024-02-20', 
            status: 'paid', 
            paidDate: '2024-02-18',
            paymentMethod: 'Bank Transfer',
            receiptNo: 'REC002'
        },
        { 
            id: 'INV005', 
            studentId: 'STU005', 
            feeType: 'Tuition', 
            amount: 550, 
            dueDate: '2024-02-15', 
            status: 'pending',
            paymentMethod: ''
        }
    ];

    // Sample Activities
    schoolData.activities = [
        { icon: '👨‍🎓', text: 'New student enrolled: Emma Johnson', time: '2 hours ago' },
        { icon: '📝', text: 'Grades uploaded for Mathematics 101', time: '4 hours ago' },
        { icon: '📅', text: 'Attendance marked for all classes', time: '5 hours ago' },
        { icon: '💰', text: 'Fee payment received from John Smith', time: '1 day ago' },
        { icon: '👨‍🏫', text: 'New teacher added: Jennifer Taylor', time: '2 days ago' }
    ];

    // Sample Events
    schoolData.events = [
        { text: 'Parent-Teacher Meeting', date: 'Feb 20, 2024' },
        { text: 'Science Fair', date: 'Feb 25, 2024' },
        { text: 'Midterm Exams Begin', date: 'Mar 1, 2024' },
        { text: 'Sports Day', date: 'Mar 15, 2024' }
    ];

    // Sample Grades
    schoolData.grades = [
        { studentId: 'STU001', courseId: 'CRS001', examType: 'midterm', score: 85, grade: 'B+' },
        { studentId: 'STU002', courseId: 'CRS001', examType: 'midterm', score: 92, grade: 'A' },
        { studentId: 'STU003', courseId: 'CRS001', examType: 'midterm', score: 78, grade: 'C+' },
        { studentId: 'STU001', courseId: 'CRS002', examType: 'midterm', score: 88, grade: 'B+' },
        { studentId: 'STU002', courseId: 'CRS002', examType: 'midterm', score: 95, grade: 'A' }
    ];

    saveData();
}

// Navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);

            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');

        // Refresh section data
        switch (sectionId) {
            case 'dashboard':
                updateDashboard();
                break;
            case 'students':
                renderStudentsTable();
                break;
            case 'teachers':
                renderTeachersTable();
                break;
            case 'courses':
                renderCoursesGrid();
                break;
            case 'attendance':
                renderAttendanceTable();
                break;
            case 'grades':
                renderGradesTable();
                break;
            case 'schedule':
                renderSchedule();
                break;
            case 'fees':
                renderFeesTable();
                break;
            case 'reports':
                renderReportsSummary();
                break;
            case 'about':
                // No special rendering needed for about section
                break;
        }
    }
}

// Menu Toggle
function setupMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevent body scroll when sidebar is open
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close sidebar when clicking on overlay
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnMenuButton = menuToggle.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickOnMenuButton && window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Handle window resize to close sidebar on larger screens
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Function to generate unique student ID
function generateStudentId() {
    let newId;
    let isUnique = false;
    let counter = schoolData.students.length + 1;
    
    // Keep generating IDs until we find one that's not in use
    while (!isUnique) {
        newId = 'STU' + String(counter).padStart(3, '0');
        
        // Check if this ID already exists in the students array
        const existingStudent = schoolData.students.find(student => student.id === newId);
        if (!existingStudent) {
            isUnique = true;
        } else {
            counter++;
        }
    }
    
    return newId;
}

// Function to generate unique teacher ID
function generateTeacherId() {
    let newId;
    let isUnique = false;
    let counter = schoolData.teachers.length + 1;
    
    // Keep generating IDs until we find one that's not in use
    while (!isUnique) {
        newId = 'TCH' + String(counter).padStart(3, '0');
        
        // Check if this ID already exists in the teachers array
        const existingTeacher = schoolData.teachers.find(teacher => teacher.id === newId);
        if (!existingTeacher) {
            isUnique = true;
        } else {
            counter++;
        }
    }
    
    return newId;
}

// Forms
function setupForms() {
    // Generate Student ID button
    document.getElementById('generateStudentIdBtn').addEventListener('click', function() {
        const newId = generateStudentId();
        document.getElementById('studentId').value = newId;
    });
    
    // Generate Teacher ID button
    document.getElementById('generateTeacherIdBtn').addEventListener('click', function() {
        const newId = generateTeacherId();
        document.getElementById('teacherId').value = newId;
    });
    
    // Student Form
    document.getElementById('studentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // CNIC/B-Form format validation
        const bForm = document.getElementById('studentBForm').value;
        const cnic = document.getElementById('studentCNIC').value;
        const guardianCNIC = document.getElementById('guardianCNIC').value;
        const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
        
        if (bForm && !cnicPattern.test(bForm)) {
            alert('B-Form format galat hai. Sahi format: 42201-1234567-1');
            return;
        }
        if (cnic && !cnicPattern.test(cnic)) {
            alert('CNIC format galat hai. Sahi format: 42201-1234567-1');
            return;
        }
        if (guardianCNIC && !cnicPattern.test(guardianCNIC)) {
            alert('Guardian CNIC format galat hai. Sahi format: 42201-1234567-1');
            return;
        }

        const studentId = document.getElementById('studentId').value;
        
        // Get photo as base64 if uploaded
        const photoInput = document.getElementById('studentPhoto');
        let photoUrl = '';
        if (photoInput.files && photoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(ev) {
                photoUrl = ev.target.result;
                saveStudentData(studentId, photoUrl);
            };
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            saveStudentData(studentId, '');
        }
    });
    
    async function saveStudentData(studentId, photoUrl) {
        if (USE_BACKEND) {
            try {
                const formData = new FormData();
                formData.append('student_id', studentId);
                formData.append('name', document.getElementById('studentName').value);
                formData.append('father_name', document.getElementById('studentFatherName').value);
                formData.append('dob', document.getElementById('studentDOB').value);
                formData.append('gender', document.getElementById('studentGender').value);
                formData.append('b_form_number', document.getElementById('studentBForm').value);
                formData.append('cnic_number', document.getElementById('studentCNIC').value);
                formData.append('class', document.getElementById('studentClass').value);
                formData.append('section', document.getElementById('studentSection').value);
                formData.append('roll_number', document.getElementById('studentRollNumber').value);
                formData.append('admission_date', document.getElementById('studentAdmissionDate').value);
                formData.append('nationality', document.getElementById('studentNationality').value);
                formData.append('religion', document.getElementById('studentReligion').value);
                formData.append('domicile', document.getElementById('studentDomicile').value);
                formData.append('blood_group', document.getElementById('studentBloodGroup').value);
                formData.append('address', document.getElementById('studentAddress').value);
                formData.append('city', document.getElementById('studentCity').value);
                formData.append('district', document.getElementById('studentDistrict').value);
                formData.append('postal_code', document.getElementById('studentPostalCode').value);
                formData.append('phone', document.getElementById('studentPhone').value);
                formData.append('email', document.getElementById('studentEmail').value);
                formData.append('guardian_type', document.getElementById('guardianType').value);
                formData.append('guardian_name', document.getElementById('guardianName').value);
                formData.append('guardian_cnic', document.getElementById('guardianCNIC').value);
                formData.append('guardian_phone', document.getElementById('guardianPhone').value);
                formData.append('guardian_occupation', document.getElementById('guardianOccupation').value);
                formData.append('guardian_income', document.getElementById('guardianIncome').value);
                formData.append('guardian_email', document.getElementById('guardianEmail').value);
                formData.append('emergency_contact', document.getElementById('emergencyContact').value);
                formData.append('fee_category', document.getElementById('feeCategory').value);
                formData.append('scholarship_type', document.getElementById('scholarshipType').value);
                formData.append('fee_discount', document.getElementById('feeDiscount').value);
                formData.append('transport_required', document.getElementById('transportRequired').value === 'true');
                
                const photoInput = document.getElementById('studentPhoto');
                if (photoInput.files && photoInput.files[0]) {
                    formData.append('photo', photoInput.files[0]);
                }
                
                const newStudent = await API.createStudent(formData);
                schoolData.students.push(newStudent);
                addActivity('👨‍🎓', `New student enrolled: ${newStudent.name}`);
                closeModal('studentModal');
                await renderStudentsTable();
                updateDashboard();
                populateDropdowns();
            } catch (error) {
                alert('Error saving student: ' + error.message);
            }
        } else {
            // LocalStorage fallback
            const student = {
                id: studentId,
                name: document.getElementById('studentName').value,
                fatherName: document.getElementById('studentFatherName').value,
                dob: document.getElementById('studentDOB').value,
                gender: document.getElementById('studentGender').value,
                admissionNumber: studentId,
                nationality: document.getElementById('studentNationality').value,
                religion: document.getElementById('studentReligion').value,
                domicile: document.getElementById('studentDomicile').value,
                bloodGroup: document.getElementById('studentBloodGroup').value,
                motherTongue: document.getElementById('studentMotherTongue').value,
                bFormNumber: document.getElementById('studentBForm').value,
                cnicNumber: document.getElementById('studentCNIC').value,
                class: document.getElementById('studentClass').value,
                section: document.getElementById('studentSection').value,
                rollNumber: document.getElementById('studentRollNumber').value,
                admissionDate: document.getElementById('studentAdmissionDate').value,
                previousSchool: document.getElementById('studentPreviousSchool').value,
                previousYearPercentage: document.getElementById('studentPrevPercentage').value,
                address: document.getElementById('studentAddress').value,
                street: document.getElementById('studentStreet').value,
                city: document.getElementById('studentCity').value,
                district: document.getElementById('studentDistrict').value,
                postalCode: document.getElementById('studentPostalCode').value,
                phone: document.getElementById('studentPhone').value,
                email: document.getElementById('studentEmail').value,
                languages: document.getElementById('studentLanguages').value,
                guardianType: document.getElementById('guardianType').value,
                guardianName: document.getElementById('guardianName').value,
                guardianCNIC: document.getElementById('guardianCNIC').value,
                guardianPhone: document.getElementById('guardianPhone').value,
                guardianOccupation: document.getElementById('guardianOccupation').value,
                guardianIncome: document.getElementById('guardianIncome').value,
                guardianEmail: document.getElementById('guardianEmail').value,
                emergencyContact: document.getElementById('emergencyContact').value,
                feeCategory: document.getElementById('feeCategory').value,
                scholarshipType: document.getElementById('scholarshipType').value,
                feeDiscount: document.getElementById('feeDiscount').value,
                transportRequired: document.getElementById('transportRequired').value === 'true',
                photoUrl: photoUrl,
                status: 'Active'
            };
            schoolData.students.push(student);
            saveData();
            addActivity('👨‍🎓', `New student enrolled: ${student.name}`);
            closeModal('studentModal');
            renderStudentsTable();
            updateDashboard();
            populateDropdowns();
        }
    }
    
    // Teacher Form
    document.getElementById('teacherForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const teacherId = document.getElementById('teacherId').value;
        saveTeacherWithPhoto(teacherId);
    });
    
    // Course Form
    document.getElementById('courseForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const course = {
            id: 'CRS' + String(schoolData.courses.length + 1).padStart(3, '0'),
            name: document.getElementById('courseName').value,
            code: document.getElementById('courseCode').value,
            teacherId: document.getElementById('courseTeacher').value,
            credits: document.getElementById('courseCredits').value
        };
        schoolData.courses.push(course);
        saveData();
        addActivity('📚', `New course added: ${course.name}`);
        closeModal('courseModal');
        renderCoursesGrid();
        updateDashboard();
        populateDropdowns();
    });

    // Fee Form
    document.getElementById('feeForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const fee = {
            id: 'INV' + String(schoolData.fees.length + 1).padStart(3, '0'),
            studentId: document.getElementById('feeStudent').value,
            feeType: document.getElementById('feeType').value,
            amount: document.getElementById('feeAmount').value,
            dueDate: document.getElementById('feeDueDate').value,
            paymentMethod: document.getElementById('feePaymentMethod').value,
            description: document.getElementById('feeDescription').value,
            status: document.getElementById('feeStatus').value,
            paidDate: document.getElementById('feePaidDate').value,
            receiptNo: document.getElementById('feeReceiptNo').value
        };
        schoolData.fees.push(fee);
        saveData();
        addActivity('💰', `Fee record created for student`);
        closeModal('feeModal');
        renderFeesTable();
    });

    // Schedule Form
    document.getElementById('scheduleForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const schedule = {
            id: 'SCH' + String(schoolData.schedules.length + 1).padStart(3, '0'),
            day: document.getElementById('scheduleDay').value,
            time: document.getElementById('scheduleTime').value,
            courseId: document.getElementById('scheduleCourse').value,
            room: document.getElementById('scheduleRoom').value
        };
        schoolData.schedules.push(schedule);
        saveData();
        addActivity('🕐', `New class scheduled: ${schedule.day} at ${schedule.time}`);
        closeModal('scheduleModal');
        renderSchedule();
    });
}

function initializeApp() {
    // Load data from localStorage or initialize with sample data
    loadData();

    // Setup event listeners
    setupNavigation();
    setupModals();
    setupForms();
    setupMenuToggle();
    setupLogout(); // Add logout functionality
    setupNotifications(); // Add notification functionality

    // Update dashboard
    updateDashboard();

    // Populate dropdowns
    populateDropdowns();

    // Initialize date picker
    document.getElementById('attendanceDate').valueAsDate = new Date();
    
    // Update user name in header
    updateUserName();
    
    // Inject Sindh Government logo
    injectSindhLogo();
}

// Inject Sindh Government logo into sidebar and header
function injectSindhLogo() {
    const LOGO_SRC = 'static/img/sindh-logo.svg';
    
    // Sidebar logo
    const sidebarHeader = document.querySelector('.sidebar-header') || document.querySelector('.logo');
    if (sidebarHeader && !sidebarHeader.querySelector('.sindh-logo')) {
        const logoImg = document.createElement('img');
        logoImg.src = LOGO_SRC;
        logoImg.alt = 'Government of Sindh';
        logoImg.className = 'sindh-logo';
        sidebarHeader.insertBefore(logoImg, sidebarHeader.firstChild);
    }
    
    // Header title logo
    const headerTitle = document.querySelector('.header-title');
    if (headerTitle && !headerTitle.querySelector('.sindh-logo-header')) {
        const logoImg = document.createElement('img');
        logoImg.src = LOGO_SRC;
        logoImg.alt = 'Sindh';
        logoImg.className = 'sindh-logo-header';
        headerTitle.insertBefore(logoImg, headerTitle.firstChild);
    }
    
    // Login page logo
    const loginLogo = document.querySelector('.login-logo');
    if (loginLogo && !loginLogo.querySelector('.sindh-logo-login')) {
        const logoImg = document.createElement('img');
        logoImg.src = LOGO_SRC;
        logoImg.alt = 'Government of Sindh';
        logoImg.className = 'sindh-logo-login';
        loginLogo.insertBefore(logoImg, loginLogo.firstChild);
    }
}

// Update user name in header
function updateUserName() {
    const currentUser = localStorage.getItem('currentUser');
    const userNameElement = document.querySelector('.user-name');
    
    if (currentUser) {
        // Check if it's a registered user with full data
        const userData = localStorage.getItem('currentUserData');
        if (userData) {
            const user = JSON.parse(userData);
            userNameElement.textContent = user.fullName || currentUser;
        } else {
            // Default user (admin, principal, teacher)
            userNameElement.textContent = currentUser.charAt(0).toUpperCase() + currentUser.slice(1);
        }
    }
}

// Setup notification dropdown functionality
function setupNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const markAllReadBtn = document.querySelector('.mark-all-read');
    
    // Toggle notification dropdown
    notificationBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!notificationDropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
            notificationDropdown.classList.remove('active');
        }
    });
    
    // Mark all as read
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            const notificationItems = document.querySelectorAll('.notification-item');
            notificationItems.forEach(item => {
                item.classList.remove('unread');
            });
            
            // Update badge count
            const badge = document.querySelector('.notification-badge');
            if (badge) {
                badge.textContent = '0';
                badge.style.display = 'none';
            }
        });
    }
    
    // Mark individual notification as read when clicked
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.remove('unread');
            
            // Update badge count
            const unreadCount = document.querySelectorAll('.notification-item.unread').length;
            const badge = document.querySelector('.notification-badge');
            if (badge) {
                badge.textContent = unreadCount;
                if (unreadCount === 0) {
                    badge.style.display = 'none';
                }
            }
        });
    });
}

// Dashboard
function updateDashboard() {
    // Update stats
    document.getElementById('totalStudents').textContent = schoolData.students.length;
    document.getElementById('totalTeachers').textContent = schoolData.teachers.length;
    document.getElementById('totalCourses').textContent = schoolData.courses.length;

    // Calculate today's attendance
    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = schoolData.attendance.filter(a => a.date === today);
    if (todayAttendance.length > 0) {
        const presentCount = todayAttendance.filter(a => a.status === 'present').length;
        const attendancePercent = Math.round((presentCount / todayAttendance.length) * 100);
        document.getElementById('todayAttendance').textContent = attendancePercent + '%';
    } else {
        document.getElementById('todayAttendance').textContent = 'N/A';
    }

    // Render activities
    renderActivities();

    // Render events
    renderEvents();
}

function renderActivities() {
    const activityList = document.getElementById('activityList');
    activityList.innerHTML = schoolData.activities.slice(0, 5).map(activity => `
        <li>
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <p>${activity.text}</p>
                <span>${activity.time}</span>
            </div>
        </li>
    `).join('');
}

function renderEvents() {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = schoolData.events.map(event => `
        <li>
            <div class="activity-icon">📅</div>
            <div class="event-content">
                <p>${event.text}</p>
                <span>${event.date}</span>
            </div>
        </li>
    `).join('');
}

function addActivity(icon, text) {
    schoolData.activities.unshift({
        icon: icon,
        text: text,
        time: 'Just now'
    });
    // Keep only last 10 activities
    schoolData.activities = schoolData.activities.slice(0, 10);
    saveData();
}

// Students Table
async function renderStudentsTable() {
    if (USE_BACKEND) {
        try {
            schoolData.students = await API.fetchStudents();
        } catch (error) {
            console.error('Error loading students:', error);
        }
    }
    
    const tbody = document.getElementById('studentsTableBody');
    if (!tbody) return;
    tbody.innerHTML = schoolData.students.map(student => {
        const section = student.section ? ` - ${student.section}` : '';
        const idDoc = student.b_form_number || student.cnic_number || 'N/A';
        const feeBadge = student.fee_category === 'Free' ? '🆓' :
                         student.fee_category === 'Scholarship' ? '🏅' :
                         student.fee_category === 'Subsidized' ? '💸' : '';
        const photoHtml = student.photo_url
            ? `<img src="${student.photo_url}" style="width:36px; height:40px; object-fit:cover; border-radius:4px; border:1px solid #ddd; vertical-align:middle; margin-right:6px;">`
            : `<span style="display:inline-block; width:36px; height:40px; background:#e8f0fe; border-radius:4px; text-align:center; line-height:40px; font-size:1.2rem; margin-right:6px; vertical-align:middle;">👤</span>`;
        return `
        <tr>
            <td>${student.student_id || student.id}</td>
            <td>${photoHtml}${student.name}</td>
            <td>${student.father_name || 'N/A'}</td>
            <td>${student.class}${section}</td>
            <td style="font-size:0.82rem; color:#555;">${idDoc}</td>
            <td>${student.phone || 'N/A'}</td>
            <td><span class="status-badge ${(student.fee_category||'Regular').toLowerCase()}">${feeBadge} ${student.fee_category || 'Regular'}</span></td>
            <td class="actions">
                <button class="btn btn-sm btn-primary" onclick="viewStudentDetails('${student.id}')">View</button>
                <button class="btn btn-sm btn-primary" onclick="editStudent('${student.id}')">Edit</button>
                <button class="btn btn-sm btn-secondary" onclick="printStudentCard('${student.id}')" title="Print/PDF">🖨️</button>
                <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student.id}')">Delete</button>
            </td>
        </tr>`;
    }).join('');
}

function viewStudentDetails(id) {
    const student = schoolData.students.find(s => s.id === id);
    if (student) {
        const section = student.section ? ` - Section ${student.section}` : '';
        const rollNo = student.rollNumber ? ` | Roll No: ${student.rollNumber}` : '';
        let detailsHtml = `
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px 20px;">
                <div style="grid-column:1/-1; background:#f0f4ff; padding:10px 15px; border-radius:8px; margin-bottom:5px; display:flex; align-items:center; gap:15px;">
                    ${student.photoUrl ? `<img src="${student.photoUrl}" style="width:60px; height:70px; object-fit:cover; border-radius:6px; border:2px solid #1a56db;">` : `<div style="width:60px; height:70px; background:#e8f0fe; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:2rem;">👤</div>`}
                    <div>
                        <strong style="font-size:1.1rem;">👨‍🎓 ${student.name}</strong><br>
                        <span style="color:#555;">${student.class}${section}${rollNo}</span>
                    </div>
                </div>
                <p><strong>Student ID:</strong> ${student.id}</p>
                <p><strong>Admission No:</strong> ${student.admissionNumber || 'N/A'}</p>
                <p><strong>B-Form No:</strong> ${student.bFormNumber || 'N/A'}</p>
                <p><strong>CNIC:</strong> ${student.cnicNumber || 'N/A'}</p>
                <p><strong>Father Name:</strong> ${student.fatherName || 'N/A'}</p>
                <p><strong>Date of Birth:</strong> ${student.dob || 'N/A'}</p>
                <p><strong>Gender:</strong> ${student.gender || 'N/A'}</p>
                <p><strong>Blood Group:</strong> ${student.bloodGroup || 'N/A'}</p>
                <p><strong>Nationality:</strong> ${student.nationality || 'N/A'}</p>
                <p><strong>Religion:</strong> ${student.religion || 'N/A'}</p>
                <p><strong>Domicile:</strong> ${student.domicile || 'N/A'}</p>
                <p><strong>Mother Tongue:</strong> ${student.motherTongue || 'N/A'}</p>
                <p style="grid-column:1/-1;"><strong>Address:</strong> ${student.address || ''} ${student.street || ''}, ${student.city || ''}, ${student.district || ''} ${student.postalCode || ''}</p>
                <p><strong>Phone:</strong> ${student.phone || 'N/A'}</p>
                <p><strong>Email:</strong> ${student.email || 'N/A'}</p>
                <p><strong>Emergency Contact:</strong> ${student.emergencyContact || 'N/A'}</p>
                <p><strong>Languages:</strong> ${student.languages || 'N/A'}</p>
                <div style="grid-column:1/-1; border-top:1px solid #eee; padding-top:10px; margin-top:5px;">
                    <strong>👨‍👩‍👦 Guardian Information</strong>
                </div>
                <p><strong>Guardian Type:</strong> ${student.guardianType || 'N/A'}</p>
                <p><strong>Guardian Name:</strong> ${student.guardianName || student.fatherName || 'N/A'}</p>
                <p><strong>Guardian CNIC:</strong> ${student.guardianCNIC || 'N/A'}</p>
                <p><strong>Guardian Phone:</strong> ${student.guardianPhone || student.phone || 'N/A'}</p>
                <p><strong>Occupation:</strong> ${student.guardianOccupation || 'N/A'}</p>
                <p><strong>Monthly Income:</strong> ${student.guardianIncome ? 'Rs. ' + Number(student.guardianIncome).toLocaleString() : 'N/A'}</p>
                <div style="grid-column:1/-1; border-top:1px solid #eee; padding-top:10px; margin-top:5px;">
                    <strong>💰 Financial Information</strong>
                </div>
                <p><strong>Fee Category:</strong> ${student.feeCategory || 'Regular'}</p>
                <p><strong>Scholarship Type:</strong> ${student.scholarshipType || 'None'}</p>
                <p><strong>Fee Discount:</strong> ${student.feeDiscount || 0}%</p>
                <p><strong>Transport Required:</strong> ${student.transportRequired ? 'Yes' : 'No'}</p>
                <p><strong>Previous School:</strong> ${student.previousSchool || 'N/A'}</p>
                <p><strong>Previous Year %:</strong> ${student.previousYearPercentage ? student.previousYearPercentage + '%' : 'N/A'}</p>
                <p><strong>Status:</strong> <span style="color:green; font-weight:600;">${student.status || 'Active'}</span></p>
            </div>
        `;
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px; max-height: 85vh; overflow-y: auto;">
                <div class="modal-header">
                    <h3>Student Information — SEMIS</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    ${detailsHtml}
                    <div style="margin-top:15px; text-align:right;">
                        <button class="btn btn-secondary" onclick="printStudentCard('${student.id}'); this.closest('.modal').remove()">🖨️ Print / PDF</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

function editStudent(id) {
    const student = schoolData.students.find(s => s.id === id);
    if (student) {
        openModal('studentModal', 'Edit Student');
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentFatherName').value = student.fatherName || '';
        document.getElementById('studentDOB').value = student.dob || '';
        document.getElementById('studentGender').value = student.gender || '';
        document.getElementById('studentId').value = student.admissionNumber || student.id;
        document.getElementById('studentNationality').value = student.nationality || 'Pakistani';
        document.getElementById('studentReligion').value = student.religion || 'Islam';
        document.getElementById('studentDomicile').value = student.domicile || '';
        document.getElementById('studentBloodGroup').value = student.bloodGroup || '';
        document.getElementById('studentBForm').value = student.bFormNumber || '';
        document.getElementById('studentCNIC').value = student.cnicNumber || '';
        document.getElementById('studentAddress').value = student.address || '';
        document.getElementById('studentStreet').value = student.street || '';
        document.getElementById('studentCity').value = student.city || '';
        document.getElementById('studentDistrict').value = student.district || '';
        document.getElementById('studentPostalCode').value = student.postalCode || '';
        document.getElementById('studentPhone').value = student.phone || '';
        document.getElementById('studentEmail').value = student.email || '';
        document.getElementById('studentLanguages').value = student.languages || '';
        document.getElementById('studentClass').value = student.class || '';
        document.getElementById('studentSection').value = student.section || '';
        document.getElementById('studentRollNumber').value = student.rollNumber || '';
        document.getElementById('studentAdmissionDate').value = student.admissionDate || '';
        document.getElementById('studentPreviousSchool').value = student.previousSchool || '';
        document.getElementById('studentPrevPercentage').value = student.previousYearPercentage || '';
        document.getElementById('studentMotherTongue').value = student.motherTongue || '';
        // Show existing photo
        if (student.photoUrl) {
            const preview = document.getElementById('studentPhotoPreview');
            if (preview) preview.innerHTML = `<img src="${student.photoUrl}" style="width:100%; height:100%; object-fit:cover;">`;
        }
        // Guardian
        document.getElementById('guardianType').value = student.guardianType || 'Father';        document.getElementById('guardianName').value = student.guardianName || student.fatherName || '';
        document.getElementById('guardianCNIC').value = student.guardianCNIC || '';
        document.getElementById('guardianPhone').value = student.guardianPhone || student.phone || '';
        document.getElementById('guardianOccupation').value = student.guardianOccupation || '';
        document.getElementById('guardianIncome').value = student.guardianIncome || '';
        document.getElementById('guardianEmail').value = student.guardianEmail || '';
        document.getElementById('emergencyContact').value = student.emergencyContact || '';
        // Financial
        document.getElementById('feeCategory').value = student.feeCategory || 'Regular';
        document.getElementById('scholarshipType').value = student.scholarshipType || '';
        document.getElementById('feeDiscount').value = student.feeDiscount || 0;
        document.getElementById('transportRequired').value = student.transportRequired ? 'true' : 'false';

        // Change form to update mode
        const form = document.getElementById('studentForm');
        form.onsubmit = function(e) {
            e.preventDefault();
            student.name = document.getElementById('studentName').value;
            student.fatherName = document.getElementById('studentFatherName').value;
            student.dob = document.getElementById('studentDOB').value;
            student.gender = document.getElementById('studentGender').value;
            student.admissionNumber = document.getElementById('studentId').value;
            student.nationality = document.getElementById('studentNationality').value;
            student.religion = document.getElementById('studentReligion').value;
            student.domicile = document.getElementById('studentDomicile').value;
            student.bloodGroup = document.getElementById('studentBloodGroup').value;
            student.bFormNumber = document.getElementById('studentBForm').value;
            student.cnicNumber = document.getElementById('studentCNIC').value;
            student.address = document.getElementById('studentAddress').value;
            student.street = document.getElementById('studentStreet').value;
            student.city = document.getElementById('studentCity').value;
            student.district = document.getElementById('studentDistrict').value;
            student.postalCode = document.getElementById('studentPostalCode').value;
            student.phone = document.getElementById('studentPhone').value;
            student.email = document.getElementById('studentEmail').value;
            student.languages = document.getElementById('studentLanguages').value;
            student.class = document.getElementById('studentClass').value;
            student.section = document.getElementById('studentSection').value;
            student.rollNumber = document.getElementById('studentRollNumber').value;
            student.admissionDate = document.getElementById('studentAdmissionDate').value;
            student.previousSchool = document.getElementById('studentPreviousSchool').value;
            student.previousYearPercentage = document.getElementById('studentPrevPercentage').value;
            student.motherTongue = document.getElementById('studentMotherTongue').value;
            student.guardianType = document.getElementById('guardianType').value;
            student.guardianName = document.getElementById('guardianName').value;
            student.guardianCNIC = document.getElementById('guardianCNIC').value;
            student.guardianPhone = document.getElementById('guardianPhone').value;
            student.guardianOccupation = document.getElementById('guardianOccupation').value;
            student.guardianIncome = document.getElementById('guardianIncome').value;
            student.guardianEmail = document.getElementById('guardianEmail').value;
            student.emergencyContact = document.getElementById('emergencyContact').value;
            student.feeCategory = document.getElementById('feeCategory').value;
            student.scholarshipType = document.getElementById('scholarshipType').value;
            student.feeDiscount = document.getElementById('feeDiscount').value;
            student.transportRequired = document.getElementById('transportRequired').value === 'true';
            saveData();
            closeModal('studentModal');
            renderStudentsTable();
        };
    }
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        schoolData.students = schoolData.students.filter(s => s.id !== id);
        saveData();
        addActivity('🗑️', `Student removed from system`);
        renderStudentsTable();
        updateDashboard();
        populateDropdowns();
    }
}

// Teachers Table
async function renderTeachersTable() {
    if (USE_BACKEND) {
        try {
            schoolData.teachers = await API.fetchTeachers();
        } catch (error) {
            console.error('Error loading teachers:', error);
        }
    }
    
    const tbody = document.getElementById('teachersTableBody');
    if (!tbody) return;
    tbody.innerHTML = schoolData.teachers.map(teacher => {
        const photoHtml = teacher.photo_url
            ? `<img src="${teacher.photo_url}" style="width:36px; height:40px; object-fit:cover; border-radius:4px; border:1px solid #ddd; vertical-align:middle; margin-right:6px;">`
            : `<span style="display:inline-block; width:36px; height:40px; background:#e8f0fe; border-radius:4px; text-align:center; line-height:40px; font-size:1.2rem; margin-right:6px; vertical-align:middle;">👤</span>`;
        return `
        <tr>
            <td>${teacher.teacher_id || teacher.id}</td>
            <td>${photoHtml}${teacher.name}</td>
            <td>${teacher.designation || 'N/A'}</td>
            <td><span style="background:#e8f0fe; color:#1a56db; padding:2px 8px; border-radius:12px; font-size:0.8rem; font-weight:600;">${teacher.bps || 'N/A'}</span></td>
            <td>${teacher.subject || 'N/A'}</td>
            <td>${teacher.phone || 'N/A'}</td>
            <td class="actions">
                <button class="btn btn-sm btn-primary" onclick="viewTeacherDetails('${teacher.id}')">View</button>
                <button class="btn btn-sm btn-primary" onclick="editTeacher('${teacher.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTeacher('${teacher.id}')">Delete</button>
            </td>
        </tr>`;
    }).join('');
}

// Function to view teacher details
function viewTeacherDetails(id) {
    const teacher = schoolData.teachers.find(t => t.id === id);
    if (teacher) {
        let detailsHtml = `
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px 20px;">
                <div style="grid-column:1/-1; background:#f0f4ff; padding:10px 15px; border-radius:8px; margin-bottom:5px; display:flex; align-items:center; gap:15px;">
                    ${teacher.photoUrl ? `<img src="${teacher.photoUrl}" style="width:60px; height:70px; object-fit:cover; border-radius:6px; border:2px solid #1a56db;">` : `<div style="width:60px; height:70px; background:#e8f0fe; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:2rem;">👤</div>`}
                    <div>
                        <strong style="font-size:1.1rem;">👨‍🏫 ${teacher.name}</strong><br>
                        <span style="color:#555;">${teacher.designation || ''} | ${teacher.bps || ''}</span>
                    </div>
                </div>
                <p><strong>Teacher ID:</strong> ${teacher.id}</p>
                <p><strong>Employee No:</strong> ${teacher.employeeNumber || 'N/A'}</p>
                <p><strong>CNIC:</strong> ${teacher.cnicNumber || 'N/A'}</p>
                <p><strong>Father Name:</strong> ${teacher.fatherName || 'N/A'}</p>
                <p><strong>Date of Birth:</strong> ${teacher.dob || 'N/A'}</p>
                <p><strong>Gender:</strong> ${teacher.gender || 'N/A'}</p>
                <p><strong>Designation:</strong> ${teacher.designation || 'N/A'}</p>
                <p><strong>BPS Grade:</strong> ${teacher.bps || 'N/A'}</p>
                <p><strong>Appointment Type:</strong> ${teacher.appointmentType || 'N/A'}</p>
                <p><strong>Joining Date:</strong> ${teacher.joiningDate || 'N/A'}</p>
                <p><strong>Subject:</strong> ${teacher.subject || 'N/A'}</p>
                <p><strong>Qualification:</strong> ${teacher.qualification || 'N/A'}</p>
                <p><strong>Experience:</strong> ${teacher.experience || 'N/A'} years</p>
                <p><strong>Nationality:</strong> ${teacher.nationality || 'N/A'}</p>
                <p><strong>Religion:</strong> ${teacher.religion || 'N/A'}</p>
                <p><strong>Blood Group:</strong> ${teacher.bloodGroup || 'N/A'}</p>
                <p style="grid-column:1/-1;"><strong>Address:</strong> ${teacher.address || ''} ${teacher.street || ''}, ${teacher.city || ''}, ${teacher.district || ''} ${teacher.postalCode || ''}</p>
                <p><strong>Phone:</strong> ${teacher.phone || 'N/A'}</p>
                <p><strong>Email:</strong> ${teacher.email || 'N/A'}</p>
                <div style="grid-column:1/-1; border-top:1px solid #eee; padding-top:10px; margin-top:5px;">
                    <strong>💰 Salary Information</strong>
                </div>
                <p><strong>Basic Salary:</strong> ${teacher.basicSalary ? 'Rs. ' + Number(teacher.basicSalary).toLocaleString() : 'N/A'}</p>
                <p><strong>Total Salary:</strong> ${teacher.totalSalary ? 'Rs. ' + Number(teacher.totalSalary).toLocaleString() : 'N/A'}</p>
                <p><strong>Bank Name:</strong> ${teacher.bankName || 'N/A'}</p>
                <p><strong>Account No:</strong> ${teacher.accountNumber || 'N/A'}</p>
                <p><strong>Status:</strong> <span style="color:green; font-weight:600;">${teacher.status || 'Active'}</span></p>
            </div>
        `;
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px; max-height: 85vh; overflow-y: auto;">
                <div class="modal-header">
                    <h3>Teacher Information — SEMIS</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    ${detailsHtml}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

function editTeacher(id) {
    const teacher = schoolData.teachers.find(t => t.id === id);
    if (teacher) {
        openModal('teacherModal', 'Edit Teacher');
        document.getElementById('teacherName').value = teacher.name;
        document.getElementById('teacherFatherName').value = teacher.fatherName || '';
        document.getElementById('teacherDOB').value = teacher.dob || '';
        document.getElementById('teacherGender').value = teacher.gender || '';
        document.getElementById('teacherId').value = teacher.admissionNumber || teacher.id;
        document.getElementById('teacherCNIC').value = teacher.cnicNumber || '';
        document.getElementById('teacherEmployeeNo').value = teacher.employeeNumber || '';
        document.getElementById('teacherDesignation').value = teacher.designation || '';
        document.getElementById('teacherBPS').value = teacher.bps || '';
        document.getElementById('teacherAppointmentType').value = teacher.appointmentType || 'Permanent';
        document.getElementById('teacherJoiningDate').value = teacher.joiningDate || '';
        document.getElementById('teacherSubject').value = teacher.subject || '';
        document.getElementById('teacherQualification').value = teacher.qualification || '';
        document.getElementById('teacherExperience').value = teacher.experience || '';
        document.getElementById('teacherNationality').value = teacher.nationality || 'Pakistani';
        document.getElementById('teacherReligion').value = teacher.religion || 'Islam';
        document.getElementById('teacherBloodGroup').value = teacher.bloodGroup || '';
        document.getElementById('teacherAddress').value = teacher.address || '';
        document.getElementById('teacherStreet').value = teacher.street || '';
        document.getElementById('teacherCity').value = teacher.city || '';
        document.getElementById('teacherDistrict').value = teacher.district || '';
        document.getElementById('teacherPostalCode').value = teacher.postalCode || '';
        document.getElementById('teacherPhone').value = teacher.phone || '';
        document.getElementById('teacherEmail').value = teacher.email || '';
        document.getElementById('teacherLanguages').value = teacher.languages || '';
        document.getElementById('teacherBasicSalary').value = teacher.basicSalary || '';
        document.getElementById('teacherTotalSalary').value = teacher.totalSalary || '';
        document.getElementById('teacherBankName').value = teacher.bankName || '';
        document.getElementById('teacherAccountNumber').value = teacher.accountNumber || '';

        const form = document.getElementById('teacherForm');
        form.onsubmit = function(e) {
            e.preventDefault();
            teacher.name = document.getElementById('teacherName').value;
            teacher.fatherName = document.getElementById('teacherFatherName').value;
            teacher.dob = document.getElementById('teacherDOB').value;
            teacher.gender = document.getElementById('teacherGender').value;
            teacher.admissionNumber = document.getElementById('teacherId').value;
            teacher.cnicNumber = document.getElementById('teacherCNIC').value;
            teacher.employeeNumber = document.getElementById('teacherEmployeeNo').value;
            teacher.designation = document.getElementById('teacherDesignation').value;
            teacher.bps = document.getElementById('teacherBPS').value;
            teacher.appointmentType = document.getElementById('teacherAppointmentType').value;
            teacher.joiningDate = document.getElementById('teacherJoiningDate').value;
            teacher.subject = document.getElementById('teacherSubject').value;
            teacher.qualification = document.getElementById('teacherQualification').value;
            teacher.experience = document.getElementById('teacherExperience').value;
            teacher.nationality = document.getElementById('teacherNationality').value;
            teacher.religion = document.getElementById('teacherReligion').value;
            teacher.bloodGroup = document.getElementById('teacherBloodGroup').value;
            teacher.address = document.getElementById('teacherAddress').value;
            teacher.street = document.getElementById('teacherStreet').value;
            teacher.city = document.getElementById('teacherCity').value;
            teacher.district = document.getElementById('teacherDistrict').value;
            teacher.postalCode = document.getElementById('teacherPostalCode').value;
            teacher.phone = document.getElementById('teacherPhone').value;
            teacher.email = document.getElementById('teacherEmail').value;
            teacher.languages = document.getElementById('teacherLanguages').value;
            teacher.basicSalary = document.getElementById('teacherBasicSalary').value;
            teacher.totalSalary = document.getElementById('teacherTotalSalary').value;
            teacher.bankName = document.getElementById('teacherBankName').value;
            teacher.accountNumber = document.getElementById('teacherAccountNumber').value;
            saveData();
            closeModal('teacherModal');
            renderTeachersTable();
        };
    }
}

function deleteTeacher(id) {
    if (confirm('Are you sure you want to delete this teacher?')) {
        schoolData.teachers = schoolData.teachers.filter(t => t.id !== id);
        saveData();
        addActivity('🗑️', `Teacher removed from system`);
        renderTeachersTable();
        updateDashboard();
        populateDropdowns();
    }
}

// Courses Grid
function renderCoursesGrid() {
    const grid = document.getElementById('coursesGrid');
    grid.innerHTML = schoolData.courses.map(course => {
        const teacher = schoolData.teachers.find(t => t.id === course.teacherId);
        return `
            <div class="course-card">
                <div class="course-header">
                    <h3>${course.name}</h3>
                    <span>${course.code}</span>
                </div>
                <div class="course-body">
                    <div class="course-info">
                        <span>👨‍🏫 ${teacher ? teacher.name : 'N/A'}</span>
                        <span>📊 ${course.credits} Credits</span>
                    </div>
                    <div class="course-actions">
                        <button class="btn btn-sm btn-primary" onclick="viewCourse('${course.id}')">View</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteCourse('${course.id}')">Delete</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function viewCourse(id) {
    const course = schoolData.courses.find(c => c.id === id);
    if (course) {
        const teacher = schoolData.teachers.find(t => t.id === course.teacherId);
        alert(`Course Details:\n\nName: ${course.name}\nCode: ${course.code}\nTeacher: ${teacher ? teacher.name : 'N/A'}\nCredits: ${course.credits}`);
    }
}

function deleteCourse(id) {
    if (confirm('Are you sure you want to delete this course?')) {
        schoolData.courses = schoolData.courses.filter(c => c.id !== id);
        saveData();
        addActivity('🗑️', `Course removed from system`);
        renderCoursesGrid();
        updateDashboard();
        populateDropdowns();
    }
}

// Attendance
function renderAttendanceTable() {
    const classSelect = document.getElementById('attendanceClass');
    const tbody = document.getElementById('attendanceTableBody');

    if (!classSelect.value) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center">Please select a class</td></tr>';
        return;
    }

    const students = schoolData.students.filter(s => s.class === classSelect.value);
    const today = new Date().toISOString().split('T')[0];

    tbody.innerHTML = students.map(student => {
        const attendance = schoolData.attendance.find(a => a.studentId === student.id && a.date === today);
        const status = attendance ? attendance.status : 'not_marked';

        return `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>
                    <div class="attendance-status">
                        <button class="status-btn present ${status === 'present' ? 'active' : ''}"
                                onclick="markAttendance('${student.id}', 'present')">Present</button>
                        <button class="status-btn absent ${status === 'absent' ? 'active' : ''}"
                                onclick="markAttendance('${student.id}', 'absent')">Absent</button>
                        <button class="status-btn late ${status === 'late' ? 'active' : ''}"
                                onclick="markAttendance('${student.id}', 'late')">Late</button>
                    </div>
                </td>
                <td>${status === 'not_marked' ? 'Not marked' : status.charAt(0).toUpperCase() + status.slice(1)}</td>
            </tr>
        `;
    }).join('');
}

function markAttendance(studentId, status) {
    const today = new Date().toISOString().split('T')[0];
    const existingIndex = schoolData.attendance.findIndex(a => a.studentId === studentId && a.date === today);

    if (existingIndex >= 0) {
        schoolData.attendance[existingIndex].status = status;
    } else {
        schoolData.attendance.push({
            studentId: studentId,
            date: today,
            status: status
        });
    }

    saveData();
    addActivity('📅', `Attendance marked for student`);
    renderAttendanceTable();
    updateDashboard();
}

// Grades
function renderGradesTable() {
    const courseSelect = document.getElementById('gradeCourse');
    const examSelect = document.getElementById('gradeExam');
    const tbody = document.getElementById('gradesTableBody');

    tbody.innerHTML = schoolData.students.map(student => {
        let score = '';
        let grade = '';

        if (courseSelect.value && examSelect.value) {
            const gradeRecord = schoolData.grades.find(g =>
                g.studentId === student.id &&
                g.courseId === courseSelect.value &&
                g.examType === examSelect.value
            );
            if (gradeRecord) {
                score = gradeRecord.score;
                grade = gradeRecord.grade;
            }
        }

        return `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>
                    <input type="number" min="0" max="100" value="${score}"
                           onchange="updateGrade('${student.id}', this.value)"
                           style="width: 80px; padding: 5px;">
                </td>
                <td>${grade || '-'}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="saveGrade('${student.id}')">Save</button>
                </td>
            </tr>
        `;
    }).join('');
}

function updateGrade(studentId, score) {
    const gradeRecord = schoolData.grades.find(g =>
        g.studentId === studentId &&
        g.courseId === document.getElementById('gradeCourse').value &&
        g.examType === document.getElementById('gradeExam').value
    );

    if (gradeRecord) {
        gradeRecord.score = score;
        gradeRecord.grade = calculateGrade(score);
    }
}

function calculateGrade(score) {
    // Sindh Board Grading System
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    if (score >= 40) return 'E';
    return 'F';
}

function saveGrade(studentId) {
    const courseId = document.getElementById('gradeCourse').value;
    const examType = document.getElementById('gradeExam').value;
    const score = document.querySelector(`input[onchange="updateGrade('${studentId}', this.value)"]`).value;

    if (!courseId || !examType) {
        alert('Please select a course and exam type');
        return;
    }

    const existingIndex = schoolData.grades.findIndex(g =>
        g.studentId === studentId &&
        g.courseId === courseId &&
        g.examType === examType
    );

    if (existingIndex >= 0) {
        schoolData.grades[existingIndex].score = score;
        schoolData.grades[existingIndex].grade = calculateGrade(score);
    } else {
        schoolData.grades.push({
            studentId: studentId,
            courseId: courseId,
            examType: examType,
            score: score,
            grade: calculateGrade(score)
        });
    }

    saveData();
    addActivity('📝', `Grade updated for student`);
    renderGradesTable();
}

// Schedule
function renderSchedule() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    days.forEach(day => {
        const scheduleList = document.getElementById(day.toLowerCase() + 'Schedule');
        const daySchedules = schoolData.schedules
            .filter(s => s.day === day)
            .sort((a, b) => a.time.localeCompare(b.time));

        scheduleList.innerHTML = daySchedules.map(schedule => {
            const course = schoolData.courses.find(c => c.id === schedule.courseId);
            return `
                <div class="schedule-item">
                    <h4>${course ? course.name : 'Unknown Course'}</h4>
                    <p>⏰ ${schedule.time} | 📍 ${schedule.room}</p>
                    <button class="btn btn-sm btn-danger" style="margin-top: 5px;"
                            onclick="deleteSchedule('${schedule.id}')">Remove</button>
                </div>
            `;
        }).join('');
    });
}

function deleteSchedule(id) {
    if (confirm('Are you sure you want to remove this class from the schedule?')) {
        schoolData.schedules = schoolData.schedules.filter(s => s.id !== id);
        saveData();
        renderSchedule();
    }
}

// Fees
function renderFeesTable() {
    const tbody = document.getElementById('feesTableBody');
    let totalCollected = 0;
    let totalPending = 0;
    let totalOverdue = 0;

    tbody.innerHTML = schoolData.fees.map(fee => {
        const student = schoolData.students.find(s => s.id === fee.studentId);

        if (fee.status === 'paid') totalCollected += parseFloat(fee.amount);
        else if (fee.status === 'pending') totalPending += parseFloat(fee.amount);
        else if (fee.status === 'overdue') totalOverdue += parseFloat(fee.amount);

        return `
            <tr>
                <td>${fee.id}</td>
                <td>${student ? student.name : 'Unknown'}</td>
                <td>${fee.feeType || 'N/A'}</td>
                <td>Rs. ${Number(fee.amount).toLocaleString()}</td>
                <td>${fee.dueDate}</td>
                <td>${fee.paymentMethod || 'N/A'}</td>
                <td><span class="status-badge ${fee.status}">${fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}</span></td>
                <td class="actions">
                    ${fee.status !== 'paid' ?
                        `<button class="btn btn-sm btn-success" onclick="markFeePaid('${fee.id}')">Mark Paid</button>` :
                        '<span class="status-badge paid">Paid</span>'
                    }
                    <button class="btn btn-sm btn-danger" onclick="deleteFee('${fee.id}')">Delete</button>
                </td>
            </tr>
        `;
    }).join('');

    document.getElementById('totalCollected').textContent = 'Rs. ' + totalCollected.toLocaleString();
    document.getElementById('totalPending').textContent = 'Rs. ' + totalPending.toLocaleString();
    document.getElementById('totalOverdue').textContent = 'Rs. ' + totalOverdue.toLocaleString();
}

function markFeePaid(id) {
    const fee = schoolData.fees.find(f => f.id === id);
    if (fee) {
        fee.status = 'paid';
        fee.paidDate = new Date().toISOString().split('T')[0];
        saveData();
        addActivity('💰', `Fee payment received for invoice ${id}`);
        renderFeesTable();
    }
}

function deleteFee(id) {
    if (confirm('Are you sure you want to delete this fee record?')) {
        schoolData.fees = schoolData.fees.filter(f => f.id !== id);
        saveData();
        renderFeesTable();
    }
}

// Modals
function setupModals() {
    // Close modal buttons
    const closeButtons = document.querySelectorAll('.modal-close, [data-modal]');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal') || this.closest('.modal').id;
            closeModal(modalId);
        });
    });

    // Add button listeners
    document.getElementById('addStudentBtn').addEventListener('click', () => openModal('studentModal', 'Add Student'));
    document.getElementById('addTeacherBtn').addEventListener('click', () => openModal('teacherModal', 'Add Teacher'));
    document.getElementById('addCourseBtn').addEventListener('click', () => openModal('courseModal', 'Add Course'));
    document.getElementById('addFeeBtn').addEventListener('click', () => openModal('feeModal', 'Add Fee Record'));
    document.getElementById('addScheduleBtn').addEventListener('click', () => openModal('scheduleModal', 'Add Class'));

    // Close modal on outside click
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
}

function openModal(modalId, title) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        const titleElement = modal.querySelector('.modal-header h3');
        if (titleElement) {
            titleElement.textContent = title;
        }
        
        // Special handling for fee modal to ensure dropdowns are populated
        if (modalId === 'feeModal') {
            // Populate student dropdown specifically for fee modal
            const feeStudent = document.getElementById('feeStudent');
            if (feeStudent && schoolData.students.length > 0) {
                feeStudent.innerHTML = '<option value="">Select Student</option>' +
                    schoolData.students.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
            }
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        // Reset form if exists
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

// Populate Dropdowns
function populateDropdowns() {
    // Class dropdown for attendance
    const attendanceClass = document.getElementById('attendanceClass');
    const classes = [...new Set(schoolData.students.map(s => s.class))];
    attendanceClass.innerHTML = '<option value="">Select Class</option>' +
        classes.map(c => `<option value="${c}">${c}</option>`).join('');

    // Teacher dropdown for courses
    const courseTeacher = document.getElementById('courseTeacher');
    courseTeacher.innerHTML = '<option value="">Select Teacher</option>' +
        schoolData.teachers.map(t => `<option value="${t.id}">${t.name}</option>`).join('');

    // Student dropdown for fees
    const feeStudent = document.getElementById('feeStudent');
    feeStudent.innerHTML = '<option value="">Select Student</option>' +
        schoolData.students.map(s => `<option value="${s.id}">${s.name}</option>`).join('');

    // Course dropdown for schedule
    const scheduleCourse = document.getElementById('scheduleCourse');
    scheduleCourse.innerHTML = '<option value="">Select Course</option>' +
        schoolData.courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

    // Course dropdown for grades
    const gradeCourse = document.getElementById('gradeCourse');
    gradeCourse.innerHTML = '<option value="">Select Course</option>' +
        schoolData.courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();

    // Search in students
    const studentRows = document.querySelectorAll('#studentsTableBody tr');
    studentRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

// Export functions to global scope for onclick handlers
window.editStudent = editStudent;
window.deleteStudent = deleteStudent;
window.editTeacher = editTeacher;
window.deleteTeacher = deleteTeacher;
window.viewCourse = viewCourse;
window.deleteCourse = deleteCourse;
window.markAttendance = markAttendance;
window.saveGrade = saveGrade;
window.deleteSchedule = deleteSchedule;
window.markFeePaid = markFeePaid;
window.deleteFee = deleteFee;

// ============================================================
// SEMIS — SINDH EDUCATION MANAGEMENT INFORMATION SYSTEM
// Export & Print Functions
// ============================================================

// ---- PDF: Print Student Profile Card ----
function printStudentCard(id) {
    const student = schoolData.students.find(s => s.id === id);
    if (!student) return;

    // Use jsPDF if available, otherwise fallback to window.print
    if (typeof window.jspdf !== 'undefined') {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Header
        doc.setFillColor(26, 86, 219);
        doc.rect(0, 0, 210, 28, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('SINDH EDUCATION MANAGEMENT INFORMATION SYSTEM', 105, 10, { align: 'center' });
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text('Government Boys High School Badin — Student Profile', 105, 20, { align: 'center' });

        // Reset text color
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);

        let y = 38;

        // Student basic info box
        doc.setFillColor(240, 244, 255);
        doc.rect(10, y - 5, 190, 14, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(student.name, 14, y + 3);
        const classText = student.class + (student.section ? ' - Section ' + student.section : '');
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(classText + (student.rollNumber ? '  |  Roll No: ' + student.rollNumber : ''), 14, y + 9);
        y += 20;

        // Two-column layout
        const col1 = 14, col2 = 110;
        const lineH = 8;

        const fields = [
            ['Student ID', student.id],
            ['Admission No', student.admissionNumber || 'N/A'],
            ['B-Form No', student.bFormNumber || 'N/A'],
            ['CNIC', student.cnicNumber || 'N/A'],
            ['Father Name', student.fatherName || 'N/A'],
            ['Date of Birth', student.dob || 'N/A'],
            ['Gender', student.gender || 'N/A'],
            ['Blood Group', student.bloodGroup || 'N/A'],
            ['Nationality', student.nationality || 'Pakistani'],
            ['Religion', student.religion || 'Islam'],
            ['Domicile', student.domicile || 'N/A'],
            ['Phone', student.phone || 'N/A'],
            ['Address', (student.city || '') + ', ' + (student.district || '')],
            ['Guardian Name', student.guardianName || student.fatherName || 'N/A'],
            ['Guardian CNIC', student.guardianCNIC || 'N/A'],
            ['Guardian Phone', student.guardianPhone || 'N/A'],
            ['Fee Category', student.feeCategory || 'Regular'],
            ['Scholarship', student.scholarshipType || 'None'],
            ['Fee Discount', (student.feeDiscount || 0) + '%'],
            ['Status', student.status || 'Active'],
        ];

        fields.forEach((field, idx) => {
            const col = idx % 2 === 0 ? col1 : col2;
            if (idx % 2 === 0 && idx > 0) y += lineH;
            doc.setFont('helvetica', 'bold');
            doc.text(field[0] + ':', col, y);
            doc.setFont('helvetica', 'normal');
            doc.text(String(field[1]).substring(0, 35), col + 32, y);
        });

        y += lineH + 10;

        // Grades section
        const studentGrades = schoolData.grades.filter(g => g.studentId === id);
        if (studentGrades.length > 0) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text('Academic Performance', 14, y);
            y += 6;

            const tableData = studentGrades.map(g => {
                const course = schoolData.courses.find(c => c.id === g.courseId);
                return [course ? course.name : 'N/A', g.examType || 'N/A', String(g.score), g.grade || 'N/A'];
            });

            doc.autoTable({
                startY: y,
                head: [['Subject', 'Exam Type', 'Marks', 'Grade']],
                body: tableData,
                theme: 'striped',
                headStyles: { fillColor: [26, 86, 219] },
                margin: { left: 14, right: 14 }
            });
            y = doc.lastAutoTable.finalY + 10;
        }

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        doc.text('Generated by SEMIS — Sindh Education Management Information System | ' + new Date().toLocaleDateString(), 105, 290, { align: 'center' });

        doc.save('Student_Profile_' + student.name.replace(/\s+/g, '_') + '.pdf');
    } else {
        // Fallback: open print window
        const printWin = window.open('', '_blank');
        printWin.document.write(`
            <html><head><title>Student Profile - ${student.name}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; font-size: 13px; }
                h2 { color: #1a56db; border-bottom: 2px solid #1a56db; padding-bottom: 8px; }
                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; margin-top: 15px; }
                .field { padding: 4px 0; border-bottom: 1px solid #eee; }
                .label { font-weight: bold; color: #333; }
                .header { background: #1a56db; color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
                @media print { button { display: none; } }
            </style></head><body>
            <div class="header">
                <h2 style="color:white; border:none; margin:0;">SEMIS — Sindh Education Management Information System</h2>
                <p style="margin:5px 0 0 0;">Government Boys High School Badin — Student Profile</p>
            </div>
            <div class="grid">
                <div class="field"><span class="label">Name:</span> ${student.name}</div>
                <div class="field"><span class="label">Class:</span> ${student.class}${student.section ? ' - ' + student.section : ''}</div>
                <div class="field"><span class="label">Student ID:</span> ${student.id}</div>
                <div class="field"><span class="label">Admission No:</span> ${student.admissionNumber || 'N/A'}</div>
                <div class="field"><span class="label">B-Form No:</span> ${student.bFormNumber || 'N/A'}</div>
                <div class="field"><span class="label">Father Name:</span> ${student.fatherName || 'N/A'}</div>
                <div class="field"><span class="label">Date of Birth:</span> ${student.dob || 'N/A'}</div>
                <div class="field"><span class="label">Gender:</span> ${student.gender || 'N/A'}</div>
                <div class="field"><span class="label">Blood Group:</span> ${student.bloodGroup || 'N/A'}</div>
                <div class="field"><span class="label">Domicile:</span> ${student.domicile || 'N/A'}</div>
                <div class="field"><span class="label">Phone:</span> ${student.phone || 'N/A'}</div>
                <div class="field"><span class="label">Address:</span> ${student.city || ''}, ${student.district || ''}</div>
                <div class="field"><span class="label">Guardian CNIC:</span> ${student.guardianCNIC || 'N/A'}</div>
                <div class="field"><span class="label">Guardian Phone:</span> ${student.guardianPhone || 'N/A'}</div>
                <div class="field"><span class="label">Fee Category:</span> ${student.feeCategory || 'Regular'}</div>
                <div class="field"><span class="label">Scholarship:</span> ${student.scholarshipType || 'None'}</div>
                <div class="field"><span class="label">Fee Discount:</span> ${student.feeDiscount || 0}%</div>
                <div class="field"><span class="label">Status:</span> ${student.status || 'Active'}</div>
            </div>
            <br><button onclick="window.print()">🖨️ Print</button>
            </body></html>
        `);
        printWin.document.close();
    }
}

// ---- PDF: Generate Class Result Report ----
function generateClassReport(className) {
    if (typeof window.jspdf === 'undefined') {
        alert('PDF library not loaded. Please check your internet connection.');
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape');

    const classStudents = schoolData.students.filter(s => s.class === className);
    if (classStudents.length === 0) {
        alert('No students found for ' + className);
        return;
    }

    // Header
    doc.setFillColor(26, 86, 219);
    doc.rect(0, 0, 297, 22, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('SEMIS — Government Boys High School Badin', 148, 9, { align: 'center' });
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Class Report: ' + className + '  |  Total Students: ' + classStudents.length, 148, 17, { align: 'center' });

    doc.setTextColor(0, 0, 0);

    const tableData = classStudents.map((s, idx) => [
        idx + 1,
        s.id,
        s.name,
        s.fatherName || 'N/A',
        s.section || 'N/A',
        s.rollNumber || 'N/A',
        s.bFormNumber || 'N/A',
        s.phone || 'N/A',
        s.feeCategory || 'Regular',
        s.status || 'Active'
    ]);

    doc.autoTable({
        startY: 28,
        head: [['#', 'ID', 'Student Name', 'Father Name', 'Section', 'Roll No', 'B-Form', 'Phone', 'Fee Cat.', 'Status']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [26, 86, 219], fontSize: 9 },
        bodyStyles: { fontSize: 8 },
        margin: { left: 10, right: 10 }
    });

    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text('Generated by SEMIS | ' + new Date().toLocaleDateString(), 148, 200, { align: 'center' });

    doc.save('Class_Report_' + className.replace(/\s+/g, '_') + '.pdf');
}

// ---- Excel Export: Students ----
function exportStudentsExcel() {
    if (typeof XLSX === 'undefined') {
        alert('Excel library not loaded. Please check your internet connection.');
        return;
    }
    const exportData = schoolData.students.map(s => ({
        'Student ID': s.id,
        'Admission No': s.admissionNumber || '',
        'Full Name': s.name,
        'Father Name': s.fatherName || '',
        'Date of Birth': s.dob || '',
        'Gender': s.gender || '',
        'Class': s.class,
        'Section': s.section || '',
        'Roll No': s.rollNumber || '',
        'B-Form No': s.bFormNumber || '',
        'CNIC': s.cnicNumber || '',
        'Nationality': s.nationality || 'Pakistani',
        'Religion': s.religion || 'Islam',
        'Domicile': s.domicile || '',
        'Blood Group': s.bloodGroup || '',
        'Phone': s.phone || '',
        'Email': s.email || '',
        'City': s.city || '',
        'District': s.district || '',
        'Guardian Type': s.guardianType || '',
        'Guardian Name': s.guardianName || '',
        'Guardian CNIC': s.guardianCNIC || '',
        'Guardian Phone': s.guardianPhone || '',
        'Guardian Occupation': s.guardianOccupation || '',
        'Monthly Income (PKR)': s.guardianIncome || '',
        'Fee Category': s.feeCategory || 'Regular',
        'Scholarship Type': s.scholarshipType || '',
        'Fee Discount (%)': s.feeDiscount || 0,
        'Transport Required': s.transportRequired ? 'Yes' : 'No',
        'Previous School': s.previousSchool || '',
        'Previous Year %': s.previousYearPercentage || '',
        'Status': s.status || 'Active'
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');

    // Auto column widths
    const colWidths = Object.keys(exportData[0] || {}).map(k => ({ wch: Math.max(k.length, 15) }));
    ws['!cols'] = colWidths;

    XLSX.writeFile(wb, 'SEMIS_Students_' + new Date().toISOString().split('T')[0] + '.xlsx');
    addActivity('📊', 'Students data exported to Excel');
}

// ---- Excel Export: Teachers ----
function exportTeachersExcel() {
    if (typeof XLSX === 'undefined') {
        alert('Excel library not loaded. Please check your internet connection.');
        return;
    }
    const exportData = schoolData.teachers.map(t => ({
        'Teacher ID': t.id,
        'Employee No': t.employeeNumber || '',
        'Full Name': t.name,
        'Father Name': t.fatherName || '',
        'CNIC': t.cnicNumber || '',
        'Date of Birth': t.dob || '',
        'Gender': t.gender || '',
        'Designation': t.designation || '',
        'BPS Grade': t.bps || '',
        'Appointment Type': t.appointmentType || '',
        'Joining Date': t.joiningDate || '',
        'Subject': t.subject || '',
        'Qualification': t.qualification || '',
        'Experience (Years)': t.experience || '',
        'Phone': t.phone || '',
        'Email': t.email || '',
        'City': t.city || '',
        'District': t.district || '',
        'Basic Salary (PKR)': t.basicSalary || '',
        'Total Salary (PKR)': t.totalSalary || '',
        'Bank Name': t.bankName || '',
        'Account No': t.accountNumber || '',
        'Status': t.status || 'Active'
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Teachers');

    const colWidths = Object.keys(exportData[0] || {}).map(k => ({ wch: Math.max(k.length, 15) }));
    ws['!cols'] = colWidths;

    XLSX.writeFile(wb, 'SEMIS_Teachers_' + new Date().toISOString().split('T')[0] + '.xlsx');
    addActivity('📊', 'Teachers data exported to Excel');
}

// ---- CSV Export: Students ----
function exportStudentsCSV() {
    const headers = ['Student ID', 'Name', 'Father Name', 'Class', 'Section', 'B-Form', 'Phone', 'City', 'District', 'Fee Category', 'Status'];
    const rows = schoolData.students.map(s => [
        s.id, s.name, s.fatherName || '', s.class, s.section || '',
        s.bFormNumber || '', s.phone || '', s.city || '', s.district || '',
        s.feeCategory || 'Regular', s.status || 'Active'
    ]);

    const csv = [headers, ...rows].map(row =>
        row.map(cell => '"' + String(cell).replace(/"/g, '""') + '"').join(',')
    ).join('\n');

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SEMIS_Students_' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
    URL.revokeObjectURL(url);
    addActivity('📄', 'Students data exported to CSV');
}

// ---- Export All Data (Backup) ----
function exportAllDataBackup() {
    const data = JSON.stringify(schoolData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SEMIS_Backup_' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    URL.revokeObjectURL(url);
    addActivity('💾', 'Full data backup exported');
}

// ---- Dashboard: Extra Stats ----
function updateDashboardExtras() {
    // Fee collection summary
    const totalFees = schoolData.fees.reduce((sum, f) => sum + (parseFloat(f.amount) || 0), 0);
    const collectedFees = schoolData.fees
        .filter(f => f.status === 'paid')
        .reduce((sum, f) => sum + (parseFloat(f.amount) || 0), 0);

    // Scholarship students count
    const scholarshipCount = schoolData.students.filter(s => s.scholarshipType && s.scholarshipType !== '').length;
    const freeCount = schoolData.students.filter(s => s.feeCategory === 'Free').length;

    // Update notification badge with pending fees count
    const pendingFees = schoolData.fees.filter(f => f.status === 'pending' || f.status === 'overdue').length;
    const badge = document.querySelector('.notification-badge');
    if (badge && pendingFees > 0) {
        badge.textContent = pendingFees;
        badge.style.display = 'flex';
    }
}

// ---- Sindh Board Grade Remarks ----
function getGradeRemarks(grade) {
    const remarks = {
        'A+': 'Outstanding',
        'A': 'Excellent',
        'B': 'Very Good',
        'C': 'Good',
        'D': 'Satisfactory',
        'E': 'Pass',
        'F': 'Fail'
    };
    return remarks[grade] || '';
}

// ---- Search Enhancement: search across all sections ----
function setupEnhancedSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const term = e.target.value.toLowerCase().trim();

        // Students table
        document.querySelectorAll('#studentsTableBody tr').forEach(row => {
            row.style.display = !term || row.textContent.toLowerCase().includes(term) ? '' : 'none';
        });
        // Teachers table
        document.querySelectorAll('#teachersTableBody tr').forEach(row => {
            row.style.display = !term || row.textContent.toLowerCase().includes(term) ? '' : 'none';
        });
        // Fees table
        document.querySelectorAll('#feesTableBody tr').forEach(row => {
            row.style.display = !term || row.textContent.toLowerCase().includes(term) ? '' : 'none';
        });
    });
}

// Override the old search setup with enhanced version
document.addEventListener('DOMContentLoaded', function() {
    // Remove old search listener by replacing the element clone trick
    const oldInput = document.getElementById('searchInput');
    if (oldInput) {
        const newInput = oldInput.cloneNode(true);
        oldInput.parentNode.replaceChild(newInput, oldInput);
        newInput.addEventListener('input', function(e) {
            const term = e.target.value.toLowerCase().trim();
            ['#studentsTableBody', '#teachersTableBody', '#feesTableBody'].forEach(sel => {
                document.querySelectorAll(sel + ' tr').forEach(row => {
                    row.style.display = !term || row.textContent.toLowerCase().includes(term) ? '' : 'none';
                });
            });
        });
    }
});

// ---- Update initializeApp to call extras ----
const _origInitializeApp = initializeApp;
function initializeApp() {
    _origInitializeApp();
    updateDashboardExtras();
}

// ---- Export new functions to global scope ----
window.viewStudentDetails = viewStudentDetails;
window.viewTeacherDetails = viewTeacherDetails;
window.printStudentCard = printStudentCard;
window.generateClassReport = generateClassReport;
window.exportStudentsExcel = exportStudentsExcel;
window.exportTeachersExcel = exportTeachersExcel;
window.exportStudentsCSV = exportStudentsCSV;
window.exportAllDataBackup = exportAllDataBackup;

// ---- Reports Section: Fee Summary ----
function renderReportsSummary() {
    const container = document.getElementById('feeSummaryReport');
    if (!container) return;

    const total = schoolData.fees.reduce((s, f) => s + (parseFloat(f.amount) || 0), 0);
    const collected = schoolData.fees.filter(f => f.status === 'paid').reduce((s, f) => s + (parseFloat(f.amount) || 0), 0);
    const pending = schoolData.fees.filter(f => f.status === 'pending').reduce((s, f) => s + (parseFloat(f.amount) || 0), 0);
    const overdue = schoolData.fees.filter(f => f.status === 'overdue').reduce((s, f) => s + (parseFloat(f.amount) || 0), 0);

    const scholarshipStudents = schoolData.students.filter(s => s.scholarshipType && s.scholarshipType !== '').length;
    const freeStudents = schoolData.students.filter(s => s.feeCategory === 'Free').length;
    const subsidizedStudents = schoolData.students.filter(s => s.feeCategory === 'Subsidized').length;

    container.innerHTML = `
        <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:10px; padding:15px; text-align:center;">
            <div style="font-size:1.5rem; font-weight:700; color:#16a34a;">Rs. ${collected.toLocaleString()}</div>
            <div style="color:#555; font-size:0.9rem; margin-top:4px;">✅ Collected</div>
        </div>
        <div style="background:#fefce8; border:1px solid #fde047; border-radius:10px; padding:15px; text-align:center;">
            <div style="font-size:1.5rem; font-weight:700; color:#ca8a04;">Rs. ${pending.toLocaleString()}</div>
            <div style="color:#555; font-size:0.9rem; margin-top:4px;">⏳ Pending</div>
        </div>
        <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:10px; padding:15px; text-align:center;">
            <div style="font-size:1.5rem; font-weight:700; color:#dc2626;">Rs. ${overdue.toLocaleString()}</div>
            <div style="color:#555; font-size:0.9rem; margin-top:4px;">⚠️ Overdue</div>
        </div>
        <div style="background:#eff6ff; border:1px solid #93c5fd; border-radius:10px; padding:15px; text-align:center;">
            <div style="font-size:1.5rem; font-weight:700; color:#2563eb;">Rs. ${total.toLocaleString()}</div>
            <div style="color:#555; font-size:0.9rem; margin-top:4px;">📊 Total Billed</div>
        </div>
        <div style="background:#fdf4ff; border:1px solid #d8b4fe; border-radius:10px; padding:15px; text-align:center;">
            <div style="font-size:1.5rem; font-weight:700; color:#9333ea;">${scholarshipStudents}</div>
            <div style="color:#555; font-size:0.9rem; margin-top:4px;">🏅 Scholarship Students</div>
        </div>
        <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:10px; padding:15px; text-align:center;">
            <div style="font-size:1.5rem; font-weight:700; color:#16a34a;">${freeStudents}</div>
            <div style="color:#555; font-size:0.9rem; margin-top:4px;">🆓 Free Education</div>
        </div>
        <div style="background:#fff7ed; border:1px solid #fdba74; border-radius:10px; padding:15px; text-align:center;">
            <div style="font-size:1.5rem; font-weight:700; color:#ea580c;">${subsidizedStudents}</div>
            <div style="color:#555; font-size:0.9rem; margin-top:4px;">💸 Subsidized</div>
        </div>
    `;
}

window.renderReportsSummary = renderReportsSummary;
window.generateClassReport = generateClassReport;

// ============================================================
// PHOTO PREVIEW & VALIDATION FUNCTIONS
// ============================================================

// Photo preview for student/teacher forms
function previewPhoto(input, previewId) {
    const preview = document.getElementById(previewId);
    if (!preview) return;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('Photo size 2MB se zyada nahi honi chahiye.');
            input.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" style="width:100%; height:100%; object-fit:cover; border-radius:6px;">`;
        };
        reader.readAsDataURL(file);
    }
}

// CNIC/B-Form format auto-formatter
function formatCNIC(input) {
    let val = input.value.replace(/[^0-9]/g, '');
    if (val.length > 5 && val.length <= 12) {
        val = val.substring(0, 5) + '-' + val.substring(5);
    } else if (val.length > 12) {
        val = val.substring(0, 5) + '-' + val.substring(5, 12) + '-' + val.substring(12, 13);
    }
    input.value = val;
}

// Auto-format CNIC fields on input
document.addEventListener('DOMContentLoaded', function() {
    const cnicFields = ['studentBForm', 'studentCNIC', 'guardianCNIC', 'teacherCNIC'];
    cnicFields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', function() { formatCNIC(this); });
        }
    });
});

// ============================================================
// STUDENTS TABLE — with photo thumbnails
// ============================================================

// Override renderStudentsTable to show photos
const _origRenderStudentsTable = renderStudentsTable;
function renderStudentsTable() {
    const tbody = document.getElementById('studentsTableBody');
    if (!tbody) return;
    tbody.innerHTML = schoolData.students.map(student => {
        const section = student.section ? ` - ${student.section}` : '';
        const idDoc = student.bFormNumber || student.cnicNumber || 'N/A';
        const feeBadge = student.feeCategory === 'Free' ? '🆓' :
                         student.feeCategory === 'Scholarship' ? '🏅' :
                         student.feeCategory === 'Subsidized' ? '💸' : '';
        const photoHtml = student.photoUrl
            ? `<img src="${student.photoUrl}" style="width:36px; height:40px; object-fit:cover; border-radius:4px; border:1px solid #ddd; vertical-align:middle; margin-right:6px;">`
            : `<span style="display:inline-block; width:36px; height:40px; background:#e8f0fe; border-radius:4px; text-align:center; line-height:40px; font-size:1.2rem; margin-right:6px; vertical-align:middle;">👤</span>`;
        return `
        <tr>
            <td>${student.id}</td>
            <td>${photoHtml}${student.name}</td>
            <td>${student.fatherName || 'N/A'}</td>
            <td>${student.class}${section}</td>
            <td style="font-size:0.82rem; color:#555;">${idDoc}</td>
            <td>${student.phone || 'N/A'}</td>
            <td><span class="status-badge ${(student.feeCategory||'Regular').toLowerCase()}">${feeBadge} ${student.feeCategory || 'Regular'}</span></td>
            <td class="actions">
                <button class="btn btn-sm btn-primary" onclick="viewStudentDetails('${student.id}')">View</button>
                <button class="btn btn-sm btn-primary" onclick="editStudent('${student.id}')">Edit</button>
                <button class="btn btn-sm btn-secondary" onclick="printStudentCard('${student.id}')" title="Print/PDF">🖨️</button>
                <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student.id}')">Delete</button>
            </td>
        </tr>`;
    }).join('');
}

// ============================================================
// TEACHERS TABLE — with photo thumbnails
// ============================================================

const _origRenderTeachersTable = renderTeachersTable;
function renderTeachersTable() {
    const tbody = document.getElementById('teachersTableBody');
    if (!tbody) return;
    tbody.innerHTML = schoolData.teachers.map(teacher => {
        const photoHtml = teacher.photoUrl
            ? `<img src="${teacher.photoUrl}" style="width:36px; height:40px; object-fit:cover; border-radius:4px; border:1px solid #ddd; vertical-align:middle; margin-right:6px;">`
            : `<span style="display:inline-block; width:36px; height:40px; background:#e8f0fe; border-radius:4px; text-align:center; line-height:40px; font-size:1.2rem; margin-right:6px; vertical-align:middle;">👤</span>`;
        return `
        <tr>
            <td>${teacher.id}</td>
            <td>${photoHtml}${teacher.name}</td>
            <td>${teacher.designation || 'N/A'}</td>
            <td><span style="background:#e8f0fe; color:#1a56db; padding:2px 8px; border-radius:12px; font-size:0.8rem; font-weight:600;">${teacher.bps || 'N/A'}</span></td>
            <td>${teacher.subject || 'N/A'}</td>
            <td>${teacher.phone || 'N/A'}</td>
            <td class="actions">
                <button class="btn btn-sm btn-primary" onclick="viewTeacherDetails('${teacher.id}')">View</button>
                <button class="btn btn-sm btn-primary" onclick="editTeacher('${teacher.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTeacher('${teacher.id}')">Delete</button>
            </td>
        </tr>`;
    }).join('');
}

// ============================================================
// TEACHER PHOTO SAVE
// ============================================================

// Override teacher form submit to handle photo
const _origTeacherFormSetup = setupForms;
document.addEventListener('DOMContentLoaded', function() {
    const teacherForm = document.getElementById('teacherForm');
    if (!teacherForm) return;
    
    // Wrap the existing submit to handle photo
    const origSubmit = teacherForm.onsubmit;
    teacherForm._photoHandled = false;
});

// Save teacher with photo
function saveTeacherWithPhoto(teacherId) {
    const photoInput = document.getElementById('teacherPhoto');
    if (photoInput && photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(ev) {
            _doSaveTeacher(teacherId, ev.target.result);
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        _doSaveTeacher(teacherId, '');
    }
}

function _doSaveTeacher(teacherId, photoUrl) {
    const teacher = {
        id: teacherId,
        name: document.getElementById('teacherName').value,
        fatherName: document.getElementById('teacherFatherName').value,
        dob: document.getElementById('teacherDOB').value,
        gender: document.getElementById('teacherGender').value,
        admissionNumber: teacherId,
        cnicNumber: document.getElementById('teacherCNIC').value,
        employeeNumber: document.getElementById('teacherEmployeeNo').value,
        designation: document.getElementById('teacherDesignation').value,
        bps: document.getElementById('teacherBPS').value,
        appointmentType: document.getElementById('teacherAppointmentType').value,
        joiningDate: document.getElementById('teacherJoiningDate').value,
        subject: document.getElementById('teacherSubject').value,
        qualification: document.getElementById('teacherQualification').value,
        experience: document.getElementById('teacherExperience').value,
        nationality: document.getElementById('teacherNationality').value,
        religion: document.getElementById('teacherReligion').value,
        bloodGroup: document.getElementById('teacherBloodGroup').value,
        address: document.getElementById('teacherAddress').value,
        street: document.getElementById('teacherStreet').value,
        city: document.getElementById('teacherCity').value,
        district: document.getElementById('teacherDistrict').value,
        postalCode: document.getElementById('teacherPostalCode').value,
        phone: document.getElementById('teacherPhone').value,
        email: document.getElementById('teacherEmail').value,
        languages: document.getElementById('teacherLanguages').value,
        basicSalary: document.getElementById('teacherBasicSalary').value,
        totalSalary: document.getElementById('teacherTotalSalary').value,
        bankName: document.getElementById('teacherBankName').value,
        accountNumber: document.getElementById('teacherAccountNumber').value,
        photoUrl: photoUrl,
        status: 'Active'
    };
    schoolData.teachers.push(teacher);
    saveData();
    addActivity('👨‍🏫', `New teacher added: ${teacher.name}`);
    closeModal('teacherModal');
    renderTeachersTable();
    updateDashboard();
    populateDropdowns();
}

// Export new functions
window.previewPhoto = previewPhoto;
window.formatCNIC = formatCNIC;
window.renderStudentsTable = renderStudentsTable;
window.renderTeachersTable = renderTeachersTable;
