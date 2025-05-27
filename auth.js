// Authentication Functions
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (email && password) {
                // In a real app, you would verify credentials with a server
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', email.split('@')[0]);
                
                // Check for redirect URL
                const urlParams = new URLSearchParams(window.location.search);
                const redirect = urlParams.get('redirect');
                
                if (redirect) {
                    window.location.href = redirect;
                } else {
                    window.location.href = 'dashboard.html';
                }
            } else {
                alert('Please enter both email and password');
            }
        });
    }
    
    // Logout Button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            window.location.href = 'index.html';
        });
    }
    
    // Protect dashboard routes
    if (window.location.pathname.includes('dashboard.html') || 
        window.location.pathname.includes('apply.html')) {
        if (!isLoggedIn) {
            window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
        }
    }
    
    // Set user info in dashboard
    const userNameElement = document.getElementById('userName');
    const userEmailElement = document.getElementById('userEmail');
    
    if (userNameElement && userEmailElement) {
        const storedName = localStorage.getItem('userName') || 'User';
        const storedEmail = localStorage.getItem('userEmail') || 'user@example.com';
        
        userNameElement.textContent = storedName;
        userEmailElement.textContent = storedEmail;
        
        // Also set in profile form
        document.getElementById('fullName').value = storedName;
        document.getElementById('email').value = storedEmail;
    }
});