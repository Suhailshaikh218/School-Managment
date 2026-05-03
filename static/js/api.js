// ============================================================
// SEMIS API CLIENT — Backend Integration Layer
// Connects frontend to Node.js + Neon DB + Cloudinary backend
// ============================================================

const API_BASE_URL = 'http://localhost:3000/api';

// ==================== HELPER: API Request ====================
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'API request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// ==================== STUDENTS API ====================

async function fetchStudents() {
    const result = await apiRequest('/students');
    return result.data || [];
}

async function fetchStudent(id) {
    const result = await apiRequest(`/students/${id}`);
    return result.data;
}

async function createStudent(formData) {
    const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        body: formData // FormData with photo
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data.data;
}

async function updateStudent(id, formData) {
    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'PUT',
        body: formData
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data.data;
}

async function deleteStudent(id) {
    return await apiRequest(`/students/${id}`, { method: 'DELETE' });
}

// ==================== TEACHERS API ====================

async function fetchTeachers() {
    const result = await apiRequest('/teachers');
    return result.data || [];
}

async function fetchTeacher(id) {
    const result = await apiRequest(`/teachers/${id}`);
    return result.data;
}

async function createTeacher(formData) {
    const response = await fetch(`${API_BASE_URL}/teachers`, {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data.data;
}

async function updateTeacher(id, formData) {
    const response = await fetch(`${API_BASE_URL}/teachers/${id}`, {
        method: 'PUT',
        body: formData
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data.data;
}

async function deleteTeacher(id) {
    return await apiRequest(`/teachers/${id}`, { method: 'DELETE' });
}

// ==================== ATTENDANCE API ====================

async function markAttendanceAPI(studentId, date, status, markedBy, remarks = '') {
    return await apiRequest('/attendance', {
        method: 'POST',
        body: JSON.stringify({ student_id: studentId, date, status, marked_by: markedBy, remarks })
    });
}

async function fetchAttendanceByDate(date) {
    const result = await apiRequest(`/attendance/${date}`);
    return result.data || [];
}

// ==================== FEES API ====================

async function fetchFees() {
    const result = await apiRequest('/fees');
    return result.data || [];
}

async function createFee(feeData) {
    return await apiRequest('/fees', {
        method: 'POST',
        body: JSON.stringify(feeData)
    });
}

async function markFeePaidAPI(id, paymentMethod, receiptNo) {
    return await apiRequest(`/fees/${id}/pay`, {
        method: 'PUT',
        body: JSON.stringify({ payment_method: paymentMethod, receipt_no: receiptNo })
    });
}

// ==================== REPORTS API ====================

async function fetchFeeSummary() {
    const result = await apiRequest('/reports/fees/summary');
    return result.data;
}

async function fetchClassReport(className) {
    const result = await apiRequest(`/reports/class/${encodeURIComponent(className)}`);
    return result.data || [];
}

// ==================== HEALTH CHECK ====================

async function checkHealth() {
    return await apiRequest('/health');
}

// Export all functions
window.API = {
    // Students
    fetchStudents,
    fetchStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    
    // Teachers
    fetchTeachers,
    fetchTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    
    // Attendance
    markAttendanceAPI,
    fetchAttendanceByDate,
    
    // Fees
    fetchFees,
    createFee,
    markFeePaidAPI,
    
    // Reports
    fetchFeeSummary,
    fetchClassReport,
    
    // Health
    checkHealth
};
