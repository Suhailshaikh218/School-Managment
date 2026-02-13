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
        
        // Check credentials
        if (validCredentials[username] && validCredentials[username] === password) {
            // Successful login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            
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
        
        // Show login page and hide main app
        document.getElementById('loginPage').style.display = 'flex';
        document.getElementById('mainApp').style.display = 'none';
        
        // Reset form
        document.getElementById('loginForm').reset();
    });
}

// Data Management
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

function loadData() {
    const savedData = localStorage.getItem('schoolData');
    if (savedData) {
        schoolData = JSON.parse(savedData);
    } else {
        // Initialize with sample data
        initializeSampleData();
    }
}

function saveData() {
    localStorage.setItem('schoolData', JSON.stringify(schoolData));
}

function initializeSampleData() {
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
        
        // Use the ID from the input field
        const studentId = document.getElementById('studentId').value;

        const student = {
            id: studentId,
            name: document.getElementById('studentName').value,
            fatherName: document.getElementById('studentFatherName').value,
            dob: document.getElementById('studentDOB').value,
            gender: document.getElementById('studentGender').value,
            admissionNumber: document.getElementById('studentId').value,
            nationality: document.getElementById('studentNationality').value,
            religion: document.getElementById('studentReligion').value,
            bloodGroup: document.getElementById('studentBloodGroup').value,
            address: document.getElementById('studentAddress').value,
            street: document.getElementById('studentStreet').value,
            city: document.getElementById('studentCity').value,
            district: document.getElementById('studentDistrict').value,
            postalCode: document.getElementById('studentPostalCode').value,
            phone: document.getElementById('studentPhone').value,
            email: document.getElementById('studentEmail').value,
            languages: document.getElementById('studentLanguages').value,
            class: document.getElementById('studentClass').value
        };

        schoolData.students.push(student);
        saveData();
        addActivity('👨‍🎓', `New student enrolled: ${student.name}`);
        closeModal('studentModal');
        renderStudentsTable();
        updateDashboard();
        populateDropdowns();
    });
    
    // Teacher Form
    document.getElementById('teacherForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Use the ID from the input field
        const teacherId = document.getElementById('teacherId').value;
        
        const teacher = {
            id: teacherId,
            name: document.getElementById('teacherName').value,
            fatherName: document.getElementById('teacherFatherName').value,
            dob: document.getElementById('teacherDOB').value,
            gender: document.getElementById('teacherGender').value,
            admissionNumber: document.getElementById('teacherId').value,
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
            languages: document.getElementById('teacherLanguages').value
        };
        schoolData.teachers.push(teacher);
        saveData();
        addActivity('👨‍🏫', `New teacher added: ${teacher.name}`);
        closeModal('teacherModal');
        renderTeachersTable();
        updateDashboard();
        populateDropdowns();
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

    // Update dashboard
    updateDashboard();

    // Populate dropdowns
    populateDropdowns();

    // Initialize date picker
    document.getElementById('attendanceDate').valueAsDate = new Date();
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
function renderStudentsTable() {
    const tbody = document.getElementById('studentsTableBody');
    tbody.innerHTML = schoolData.students.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.fatherName || 'N/A'}</td>
            <td>${student.class}</td>
            <td>${student.phone}</td>
            <td>${student.email || 'N/A'}</td>
            <td class="actions">
                <button class="btn btn-sm btn-primary" onclick="viewStudentDetails('${student.id}')">View</button>
                <button class="btn btn-sm btn-primary" onclick="editStudent('${student.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function viewStudentDetails(id) {
    const student = schoolData.students.find(s => s.id === id);
    if (student) {
        let detailsHtml = `
            <h3>Student Details: ${student.name}</h3>
            <div class="student-details-grid">
                <p><strong>Student ID:</strong> ${student.id}</p>
                <p><strong>Full Name:</strong> ${student.name}</p>
                <p><strong>Father Name:</strong> ${student.fatherName || 'N/A'}</p>
                <p><strong>Date of Birth:</strong> ${student.dob || 'N/A'}</p>
                <p><strong>Gender:</strong> ${student.gender || 'N/A'}</p>
                <p><strong>Admission Number:</strong> ${student.admissionNumber || 'N/A'}</p>
                <p><strong>Nationality:</strong> ${student.nationality || 'N/A'}</p>
                <p><strong>Religion:</strong> ${student.religion || 'N/A'}</p>
                <p><strong>Blood Group:</strong> ${student.bloodGroup || 'N/A'}</p>
                <p><strong>Address:</strong> ${student.address || 'N/A'}, ${student.street || 'N/A'}, ${student.city || 'N/A'}, ${student.district || 'N/A'}, ${student.postalCode || 'N/A'}</p>
                <p><strong>Phone:</strong> ${student.phone || 'N/A'}</p>
                <p><strong>Email:</strong> ${student.email || 'N/A'}</p>
                <p><strong>Languages Spoken:</strong> ${student.languages || 'N/A'}</p>
                <p><strong>Class:</strong> ${student.class || 'N/A'}</p>
            </div>
        `;
        
        // Create a temporary modal to show details
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px; max-height: 80vh; overflow-y: auto;">
                <div class="modal-header">
                    <h3>Student Information</h3>
                    <button class="modal-close" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    ${detailsHtml}
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
        document.getElementById('studentNationality').value = student.nationality || '';
        document.getElementById('studentReligion').value = student.religion || '';
        document.getElementById('studentBloodGroup').value = student.bloodGroup || '';
        document.getElementById('studentAddress').value = student.address || '';
        document.getElementById('studentStreet').value = student.street || '';
        document.getElementById('studentCity').value = student.city || '';
        document.getElementById('studentDistrict').value = student.district || '';
        document.getElementById('studentPostalCode').value = student.postalCode || '';
        document.getElementById('studentPhone').value = student.phone || '';
        document.getElementById('studentEmail').value = student.email || '';
        document.getElementById('studentLanguages').value = student.languages || '';
        document.getElementById('studentClass').value = student.class || '';

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
            student.bloodGroup = document.getElementById('studentBloodGroup').value;
            student.address = document.getElementById('studentAddress').value;
            student.street = document.getElementById('studentStreet').value;
            student.city = document.getElementById('studentCity').value;
            student.district = document.getElementById('studentDistrict').value;
            student.postalCode = document.getElementById('studentPostalCode').value;
            student.phone = document.getElementById('studentPhone').value;
            student.email = document.getElementById('studentEmail').value;
            student.languages = document.getElementById('studentLanguages').value;
            student.class = document.getElementById('studentClass').value;
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
function renderTeachersTable() {
    const tbody = document.getElementById('teachersTableBody');
    tbody.innerHTML = schoolData.teachers.map(teacher => `
        <tr>
            <td>${teacher.id}</td>
            <td>${teacher.name}</td>
            <td>${teacher.fatherName || 'N/A'}</td>
            <td>${teacher.subject || 'N/A'}</td>
            <td>${teacher.phone || 'N/A'}</td>
            <td>${teacher.email || 'N/A'}</td>
            <td class="actions">
                <button class="btn btn-sm btn-primary" onclick="viewTeacherDetails('${teacher.id}')">View</button>
                <button class="btn btn-sm btn-primary" onclick="editTeacher('${teacher.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTeacher('${teacher.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Function to view teacher details
function viewTeacherDetails(id) {
    const teacher = schoolData.teachers.find(t => t.id === id);
    if (teacher) {
        let detailsHtml = `
            <h3>Teacher Details: ${teacher.name}</h3>
            <div class="teacher-details-grid">
                <p><strong>Teacher ID:</strong> ${teacher.id}</p>
                <p><strong>Full Name:</strong> ${teacher.name}</p>
                <p><strong>Father Name:</strong> ${teacher.fatherName || 'N/A'}</p>
                <p><strong>Date of Birth:</strong> ${teacher.dob || 'N/A'}</p>
                <p><strong>Gender:</strong> ${teacher.gender || 'N/A'}</p>
                <p><strong>Teacher ID:</strong> ${teacher.admissionNumber || 'N/A'}</p>
                <p><strong>Subject:</strong> ${teacher.subject || 'N/A'}</p>
                <p><strong>Qualification:</strong> ${teacher.qualification || 'N/A'}</p>
                <p><strong>Years of Experience:</strong> ${teacher.experience || 'N/A'}</p>
                <p><strong>Nationality:</strong> ${teacher.nationality || 'N/A'}</p>
                <p><strong>Religion:</strong> ${teacher.religion || 'N/A'}</p>
                <p><strong>Blood Group:</strong> ${teacher.bloodGroup || 'N/A'}</p>
                <p><strong>Address:</strong> ${teacher.address || 'N/A'}, ${teacher.street || 'N/A'}, ${teacher.city || 'N/A'}, ${teacher.district || 'N/A'}, ${teacher.postalCode || 'N/A'}</p>
                <p><strong>Phone:</strong> ${teacher.phone || 'N/A'}</p>
                <p><strong>Email:</strong> ${teacher.email || 'N/A'}</p>
                <p><strong>Languages Spoken:</strong> ${teacher.languages || 'N/A'}</p>
            </div>
        `;
        
        // Create a temporary modal to show details
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px; max-height: 80vh; overflow-y: auto;">
                <div class="modal-header">
                    <h3>Teacher Information</h3>
                    <button class="modal-close" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
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
        document.getElementById('teacherSubject').value = teacher.subject || '';
        document.getElementById('teacherQualification').value = teacher.qualification || '';
        document.getElementById('teacherExperience').value = teacher.experience || '';
        document.getElementById('teacherNationality').value = teacher.nationality || '';
        document.getElementById('teacherReligion').value = teacher.religion || '';
        document.getElementById('teacherBloodGroup').value = teacher.bloodGroup || '';
        document.getElementById('teacherAddress').value = teacher.address || '';
        document.getElementById('teacherStreet').value = teacher.street || '';
        document.getElementById('teacherCity').value = teacher.city || '';
        document.getElementById('teacherDistrict').value = teacher.district || '';
        document.getElementById('teacherPostalCode').value = teacher.postalCode || '';
        document.getElementById('teacherPhone').value = teacher.phone || '';
        document.getElementById('teacherEmail').value = teacher.email || '';
        document.getElementById('teacherLanguages').value = teacher.languages || '';

        const form = document.getElementById('teacherForm');
        form.onsubmit = function(e) {
            e.preventDefault();
            teacher.name = document.getElementById('teacherName').value;
            teacher.fatherName = document.getElementById('teacherFatherName').value;
            teacher.dob = document.getElementById('teacherDOB').value;
            teacher.gender = document.getElementById('teacherGender').value;
            teacher.admissionNumber = document.getElementById('teacherId').value;
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
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
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
                <td>$${fee.amount}</td>
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

    document.getElementById('totalCollected').textContent = '$' + totalCollected;
    document.getElementById('totalPending').textContent = '$' + totalPending;
    document.getElementById('totalOverdue').textContent = '$' + totalOverdue;
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