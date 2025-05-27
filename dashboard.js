// Dashboard Functions
document.addEventListener('DOMContentLoaded', function() {
    // Sample applications data
    const applications = [
        {
            id: 1,
            internshipId: 1,
            title: "Web Developer Intern",
            company: "Techs Ltd",
            date: "2023-05-15",
            status: "pending"
        },
        {
            id: 2,
            internshipId: 2,
            title: "Marketing Intern",
            company: "Creel",
            date: "2023-05-10",
            status: "accepted"
        }
    ];
    
    // Display applications
    function displayApplications() {
        const container = document.getElementById('applicationsContainer');
        container.innerHTML = '';
        
        applications.forEach(app => {
            const card = document.createElement('div');
            card.className = 'application-card';
            
            let statusClass = 'status-pending';
            let statusText = 'Pending';
            
            if (app.status === 'accepted') {
                statusClass = 'status-accepted';
                statusText = 'Accepted';
            } else if (app.status === 'rejected') {
                statusClass = 'status-rejected';
                statusText = 'Rejected';
            }
            
            card.innerHTML = `
                <div class="application-header">
                    <div class="application-title">${app.title}</div>
                    <div class="application-status ${statusClass}">${statusText}</div>
                </div>
                <div class="application-details">
                    <span>${app.company}</span>
                    <span>Applied on ${app.date}</span>
                </div>
                <div class="application-actions">
                    <button class="btn-secondary">View Details</button>
                    <button class="btn-secondary">Withdraw</button>
                </div>
            `;
            
            container.appendChild(card);
        });
    }
    
    // Initialize dashboard
    displayApplications();
    
    // Navigation between sections
    document.querySelectorAll('.dashboard-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.dashboard-nav a').forEach(l => {
                l.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections
            document.querySelectorAll('.dashboard-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show corresponding section
            const sectionId = this.getAttribute('href').substring(1);
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // Profile form submission
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            
            // Save to localStorage
            localStorage.setItem('userName', fullName);
            localStorage.setItem('userEmail', email);
            
            // Update displayed name
            document.getElementById('userName').textContent = fullName;
            document.getElementById('userEmail').textContent = email;
            
            alert('Profile updated successfully!');
        });
    }
    
    // Edit profile button
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hide all sections
            document.querySelectorAll('.dashboard-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show profile section
            document.getElementById('profile').classList.add('active');
            
            // Update nav
            document.querySelectorAll('.dashboard-nav a').forEach(link => {
                link.classList.remove('active');
            });
            
            document.querySelector('.dashboard-nav a[href="#profile"]').classList.add('active');
        });
    }
});