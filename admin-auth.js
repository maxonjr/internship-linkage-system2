// Admin Authentication Logic
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('adminLoginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('adminPassword');
    const rememberMe = document.getElementById('rememberMe');
    
    // Toggle password visibility
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function(e) {
            e.preventDefault();
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    // Handle form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('adminEmail').value.trim();
            const password = document.getElementById('adminPassword').value;
            
            // Simple validation
            if (!email || !password) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            // Validate email format
            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
            submitBtn.disabled = true;
            
            // Simulate API call (replace with real authentication)
            setTimeout(() => {
                // Hardcoded admin credentials for demo
                // In production, verify against your backend
                if (email === 'admin@internshipcenter.com' && password === 'Admin@1234') {
                    // Success - save admin session
                    localStorage.setItem('adminLoggedIn', 'true');
                    
                    // Set remember me if checked
                    if (rememberMe.checked) {
                        localStorage.setItem('adminRememberMe', 'true');
                        localStorage.setItem('adminEmail', email);
                    } else {
                        localStorage.removeItem('adminRememberMe');
                        localStorage.removeItem('adminEmail');
                    }
                    
                    // Redirect to admin dashboard
                    window.location.href = 'dashboard.html';
                } else {
                    // Authentication failed
                    showAlert('Invalid admin credentials', 'error');
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }
            }, 1500);
        });
    }
    
    // Check for remembered email
    if (localStorage.getItem('adminRememberMe') === 'true') {
        const savedEmail = localStorage.getItem('adminEmail');
        if (savedEmail) {
            document.getElementById('adminEmail').value = savedEmail;
            document.getElementById('rememberMe').checked = true;
        }
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Show alert message
    function showAlert(message, type) {
        // Remove existing alerts
        const existingAlert = document.querySelector('.login-alert');
        if (existingAlert) existingAlert.remove();
        
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `login-alert alert-${type}`;
        alert.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            .login-alert {
                padding: 0.8rem 1rem;
                margin-bottom: 1.5rem;
                border-radius: 4px;
                display: flex;
                align-items: center;
                animation: slideIn 0.3s ease-out;
            }
            .alert-error {
                background-color: #fdecea;
                color: #d32f2f;
                border: 1px solid #ef9a9a;
            }
            .alert-success {
                background-color: #e8f5e9;
                color: #2e7d32;
                border: 1px solid #a5d6a7;
            }
            .login-alert i {
                margin-right: 0.5rem;
            }
            @keyframes slideIn {
                from { transform: translateY(-20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Insert alert
        loginForm.insertBefore(alert, loginForm.firstChild);
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            alert.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    }
});