"""
SEMIS — Sindh Education Management Information System
Pure Python Flask Application (No HTML Files)
All UI generated dynamically from Python
"""

from flask import Flask, jsonify, request, session, redirect, make_response
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests
import json

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.getenv('SESSION_SECRET', 'sindh-school-management-secret-2026')
CORS(app)

# Configuration
CLERK_PUBLISHABLE_KEY = os.getenv('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY')
BACKEND_API_URL = 'http://localhost:3000/api'

# ==================== HTML GENERATORS ====================

def generate_login_page():
    """Generate login page HTML dynamically"""
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SEMIS — Login</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }}
        .login-container {{
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            max-width: 450px;
            width: 100%;
        }}
        .login-header {{
            background: linear-gradient(135deg, #1a56db 0%, #0d3a8c 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }}
        .login-header h1 {{
            font-size: 2rem;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }}
        .login-body {{ padding: 40px 30px; min-height: 400px; }}
        .loading {{
            text-align: center;
            padding: 60px 20px;
            color: #666;
        }}
        .loading-spinner {{
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #1a56db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }}
        @keyframes spin {{
            0% {{ transform: rotate(0deg); }}
            100% {{ transform: rotate(360deg); }}
        }}
        .footer {{
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            color: #666;
            font-size: 0.85rem;
        }}
        .footer a {{ color: #1a56db; text-decoration: none; }}
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <div style="display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 12px;">
                <img src="/static/img/sindh-logo.svg"
                     alt="Government of Sindh Logo"
                     style="width: 75px; height: 75px; object-fit: contain; filter: brightness(0) invert(1);">
                <div style="text-align: left;">
                    <h1 style="font-size: 1.8rem; margin: 0;">SEMIS</h1>
                    <p style="font-size: 0.8rem; margin: 2px 0 0; opacity: 0.9;">حکومت سندھ</p>
                </div>
            </div>
            <p>Sindh Education Management Information System</p>
            <p style="font-size: 0.85rem; margin-top: 8px;">Government of Sindh</p>
        </div>
        <div class="login-body">
            <div class="loading">
                <div class="loading-spinner"></div>
                <p>Loading authentication...</p>
            </div>
            <div id="clerk-signin"></div>
        </div>
        <div class="footer">
            <p>Secure authentication powered by Clerk</p>
            <p style="margin-top: 8px;"><a href="/signup">Create Account</a></p>
        </div>
    </div>
    <script>
        const CLERK_KEY = '{CLERK_PUBLISHABLE_KEY}';
        const script = document.createElement('script');
        script.src = 'https://accounts.clerk.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js';
        script.async = true;
        script.onload = async () => {{
            try {{
                const clerk = window.Clerk;
                await clerk.load({{ publishableKey: CLERK_KEY }});
                document.querySelector('.loading').style.display = 'none';
                if (clerk.user) {{
                    window.location.href = '/dashboard';
                    return;
                }}
                clerk.mountSignIn(document.getElementById('clerk-signin'), {{
                    redirectUrl: '/dashboard',
                    signUpUrl: '/signup'
                }});
            }} catch (error) {{
                console.error('Clerk error:', error);
                document.querySelector('.loading').innerHTML = '<p style="color: #dc2626;">Failed to load authentication</p>';
            }}
        }};
        document.head.appendChild(script);
    </script>
</body>
</html>
"""

def generate_signup_page():
    """Generate signup page HTML dynamically"""
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SEMIS — Sign Up</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }}
        .signup-container {{
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            max-width: 450px;
            width: 100%;
        }}
        .signup-header {{
            background: linear-gradient(135deg, #16a34a 0%, #0d7a33 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }}
        .signup-header h1 {{
            font-size: 2rem;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }}
        .signup-body {{ padding: 40px 30px; min-height: 500px; }}
        .loading {{
            text-align: center;
            padding: 60px 20px;
            color: #666;
        }}
        .loading-spinner {{
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #16a34a;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }}
        @keyframes spin {{
            0% {{ transform: rotate(0deg); }}
            100% {{ transform: rotate(360deg); }}
        }}
        .footer {{
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            color: #666;
            font-size: 0.85rem;
        }}
        .footer a {{ color: #16a34a; text-decoration: none; }}
    </style>
</head>
<body>
    <div class="signup-container">
        <div class="signup-header">
            <div style="display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 12px;">
                <img src="/static/img/sindh-logo.svg"
                     alt="Government of Sindh Logo"
                     style="width: 75px; height: 75px; object-fit: contain; filter: brightness(0) invert(1);">
                <div style="text-align: left;">
                    <h1 style="font-size: 1.8rem; margin: 0;">SEMIS</h1>
                    <p style="font-size: 0.8rem; margin: 2px 0 0; opacity: 0.9;">حکومت سندھ</p>
                </div>
            </div>
            <p>Create Your Account</p>
            <p style="font-size: 0.85rem; margin-top: 8px;">Sindh Education Management System</p>
        </div>
        <div class="signup-body">
            <div class="loading">
                <div class="loading-spinner"></div>
                <p>Loading registration...</p>
            </div>
            <div id="clerk-signup"></div>
        </div>
        <div class="footer">
            <p>Already have an account? <a href="/login">Sign In</a></p>
        </div>
    </div>
    <script>
        const CLERK_KEY = '{CLERK_PUBLISHABLE_KEY}';
        const script = document.createElement('script');
        script.src = 'https://accounts.clerk.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js';
        script.async = true;
        script.onload = async () => {{
            try {{
                const clerk = window.Clerk;
                await clerk.load({{ publishableKey: CLERK_KEY }});
                document.querySelector('.loading').style.display = 'none';
                if (clerk.user) {{
                    window.location.href = '/dashboard';
                    return;
                }}
                clerk.mountSignUp(document.getElementById('clerk-signup'), {{
                    redirectUrl: '/dashboard',
                    signInUrl: '/login'
                }});
            }} catch (error) {{
                console.error('Clerk error:', error);
                document.querySelector('.loading').innerHTML = '<p style="color: #dc2626;">Failed to load authentication</p>';
            }}
        }};
        document.head.appendChild(script);
    </script>
</body>
</html>
"""

def generate_dashboard_page():
    """Generate dashboard page HTML dynamically"""
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SEMIS — Dashboard</title>
    <link rel="stylesheet" href="/static/style.css">
</head>
<body>
    <div class="loading-overlay" id="loadingOverlay">
        <div style="text-align: center;">
            <div class="loading-spinner"></div>
            <p style="margin-top: 20px; color: #666;">Loading your profile...</p>
        </div>
    </div>
    
    <div id="loginPage" style="display: none;">
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <div style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); text-align: center; max-width: 400px;">
                <h2 style="color: #1a56db; margin-bottom: 20px;">🏛️ SEMIS</h2>
                <p style="color: #666; margin-bottom: 30px;">Please sign in to continue</p>
                <a href="/login" style="display: inline-block; background: #1a56db; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                    Sign In with Clerk
                </a>
            </div>
        </div>
    </div>

    <div id="mainApp" style="display: none;">
        <header class="header">
            <div class="header-left">
                <button class="menu-toggle" id="menuToggle">
                    <span></span><span></span><span></span>
                </button>
                <h2 class="header-title">
                    <img src="/static/img/sindh-logo.svg"
                         alt="Sindh Logo"
                         style="width: 36px; height: 36px; object-fit: contain; vertical-align: middle; margin-right: 8px;">
                    SEMIS — Government Boys High School Badin
                </h2>
            </div>
            <div class="header-right">
                <div class="search-box">
                    <input type="text" id="searchInput" placeholder="Search...">
                    <span class="search-icon">🔍</span>
                </div>
                <div class="user-profile" id="userProfile">
                    <img src="" alt="User" class="user-avatar" id="userAvatar">
                    <div class="user-info">
                        <div class="user-name" id="userName">Loading...</div>
                        <div class="user-email" id="userEmail"></div>
                    </div>
                    <span style="font-size: 1.2rem;">▼</span>
                    <div class="profile-dropdown" id="profileDropdown">
                        <div class="profile-header">
                            <img src="" alt="Profile" id="profileAvatar">
                            <h3 id="profileName">User Name</h3>
                            <p id="profileEmail">user@example.com</p>
                            <div class="auth-badge" id="authBadge">
                                <span>🔐</span><span>Clerk Authenticated</span>
                            </div>
                        </div>
                        <div class="profile-menu">
                            <a href="#" class="profile-menu-item" onclick="openUserProfile(); return false;">
                                <span>👤</span><span>My Profile</span>
                            </a>
                            <a href="#" class="profile-menu-item" onclick="openAccountSettings(); return false;">
                                <span>⚙️</span><span>Account Settings</span>
                            </a>
                            <div class="profile-divider"></div>
                            <a href="#" class="profile-menu-item danger" onclick="signOut(); return false;">
                                <span>🚪</span><span>Sign Out</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <div class="logo" style="display: flex; align-items: center; gap: 10px; justify-content: center;">
                    <img src="/static/img/sindh-logo.svg"
                         alt="Sindh Logo"
                         style="width: 48px; height: 48px; object-fit: contain; filter: brightness(0) invert(1);">
                    <span>SEMIS</span>
                </div>
                <p class="subtitle">Sindh Education System</p>
                <p class="subtitle" style="font-size: 0.75rem; opacity: 0.8;">حکومت سندھ</p>
            </div>
            <nav class="nav">
                <a href="#" class="nav-item active" data-section="dashboard">
                    <span class="nav-icon">🏠</span><span class="nav-text">Dashboard</span>
                </a>
                <a href="#" class="nav-item" data-section="students">
                    <span class="nav-icon">👨‍🎓</span><span class="nav-text">Students</span>
                </a>
                <a href="#" class="nav-item" data-section="teachers">
                    <span class="nav-icon">👨‍🏫</span><span class="nav-text">Teachers</span>
                </a>
                <a href="#" class="nav-item" data-section="attendance">
                    <span class="nav-icon">📅</span><span class="nav-text">Attendance</span>
                </a>
                <a href="#" class="nav-item" data-section="fees">
                    <span class="nav-icon">💰</span><span class="nav-text">Fees</span>
                </a>
                <a href="#" class="nav-item" data-section="reports">
                    <span class="nav-icon">📊</span><span class="nav-text">Reports</span>
                </a>
            </nav>
        </aside>

        <main class="main-content">
            <div id="dashboard" class="section active">
                <h2>Welcome to SEMIS Dashboard</h2>
                <p>Your profile is loaded with Clerk authentication!</p>
                <div class="stats-grid" style="margin-top: 30px;">
                    <div class="stat-card">
                        <div class="stat-icon">👨‍🎓</div>
                        <div class="stat-info">
                            <h3 id="totalStudents">0</h3>
                            <p>Total Students</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">👨‍🏫</div>
                        <div class="stat-info">
                            <h3 id="totalTeachers">0</h3>
                            <p>Total Teachers</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script>
        const CLERK_KEY = '{CLERK_PUBLISHABLE_KEY}';
        let clerkInstance = null;
        
        const script = document.createElement('script');
        script.src = 'https://accounts.clerk.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js';
        script.async = true;
        
        script.onload = async () => {{
            try {{
                const clerk = window.Clerk;
                await clerk.load({{ publishableKey: CLERK_KEY }});
                clerkInstance = clerk;

                if (clerk.user) {{
                    loadUserProfile(clerk.user);
                    document.getElementById('loadingOverlay').style.display = 'none';
                    document.getElementById('mainApp').style.display = 'flex';
                }} else {{
                    document.getElementById('loadingOverlay').style.display = 'none';
                    document.getElementById('loginPage').style.display = 'block';
                }}
            }} catch (error) {{
                console.error('Clerk error:', error);
                document.getElementById('loadingOverlay').style.display = 'none';
                document.getElementById('loginPage').style.display = 'block';
            }}
        }};

        document.head.appendChild(script);

        function loadUserProfile(user) {{
            const name = user.fullName || user.firstName || 'User';
            const email = user.primaryEmailAddress?.emailAddress || '';
            const avatar = user.imageUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name);

            document.getElementById('userName').textContent = name;
            document.getElementById('userEmail').textContent = email;
            document.getElementById('userAvatar').src = avatar;
            document.getElementById('profileName').textContent = name;
            document.getElementById('profileEmail').textContent = email;
            document.getElementById('profileAvatar').src = avatar;
        }}

        document.addEventListener('click', (e) => {{
            const profile = document.getElementById('userProfile');
            const dropdown = document.getElementById('profileDropdown');
            
            if (profile && profile.contains(e.target)) {{
                dropdown.classList.toggle('active');
            }} else {{
                dropdown.classList.remove('active');
            }}
        }});

        function openUserProfile() {{
            if (clerkInstance) clerkInstance.openUserProfile();
        }}

        function openAccountSettings() {{
            if (clerkInstance) clerkInstance.openUserProfile();
        }}

        async function signOut() {{
            if (clerkInstance) {{
                await clerkInstance.signOut();
                window.location.href = '/login';
            }}
        }}
    </script>
    
    <script src="/static/api.js"></script>
    <script src="/static/app.js"></script>
</body>
</html>
"""

# ==================== ROUTES ====================

@app.route('/')
def index():
    """Main landing page"""
    return redirect('/login')

@app.route('/login')
def login():
    """Login page - generated from Python"""
    html = generate_login_page()
    return html

@app.route('/signup')
def signup():
    """Signup page - generated from Python"""
    html = generate_signup_page()
    return html

@app.route('/dashboard')
def dashboard():
    """Dashboard - generated from Python"""
    html = generate_dashboard_page()
    return html

# ==================== STATIC FILES ====================

@app.route('/static/<path:filename>')
def serve_static(filename):
    """Serve static files"""
    import mimetypes
    
    # Map of known files to their paths
    file_map = {
        'style.css': ('style.css', 'text/css'),
        'app.js': ('app.js', 'application/javascript'),
        'api.js': ('api.js', 'application/javascript'),
    }
    
    if filename in file_map:
        filepath, content_type = file_map[filename]
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                response = make_response(f.read())
                response.headers['Content-Type'] = content_type
                return response
        except FileNotFoundError:
            return "File not found", 404
    
    # Serve files from static/ folder (images, etc.)
    static_path = os.path.join('static', filename)
    if os.path.exists(static_path):
        content_type, _ = mimetypes.guess_type(static_path)
        content_type = content_type or 'application/octet-stream'
        mode = 'r' if content_type.startswith('text') or 'svg' in content_type else 'rb'
        with open(static_path, mode) as f:
            response = make_response(f.read())
            response.headers['Content-Type'] = content_type
            return response
    
    return "File not found", 404

# ==================== API PROXY ====================

@app.route('/api/students', methods=['GET', 'POST'])
def api_students():
    """Students API"""
    try:
        if request.method == 'GET':
            response = requests.get(f'{BACKEND_API_URL}/students')
            return jsonify(response.json())
        elif request.method == 'POST':
            response = requests.post(f'{BACKEND_API_URL}/students', json=request.json)
            return jsonify(response.json())
    except Exception as e:
        return jsonify({{'success': False, 'error': str(e)}}), 500

@app.route('/api/teachers', methods=['GET', 'POST'])
def api_teachers():
    """Teachers API"""
    try:
        if request.method == 'GET':
            response = requests.get(f'{BACKEND_API_URL}/teachers')
            return jsonify(response.json())
        elif request.method == 'POST':
            response = requests.post(f'{BACKEND_API_URL}/teachers', json=request.json)
            return jsonify(response.json())
    except Exception as e:
        return jsonify({{'success': False, 'error': str(e)}}), 500

@app.route('/api/health')
def api_health():
    """Health check"""
    try:
        response = requests.get(f'{BACKEND_API_URL}/health')
        return jsonify(response.json())
    except Exception as e:
        return jsonify({{'status': 'ERROR', 'error': str(e)}}), 500

# ==================== RUN APP ====================

if __name__ == '__main__':
    print("""
╔════════════════════════════════════════════════════════════╗
║  🏛️  SEMIS — Pure Python Flask Application               ║
║  🚀 Server: http://localhost:5000                         ║
║  🔐 Auth: Clerk (Google, Email, Phone)                    ║
║  📊 No HTML Files - All Generated from Python!            ║
╚════════════════════════════════════════════════════════════╝
    """)
    
    app.run(host='0.0.0.0', port=5000, debug=True)
