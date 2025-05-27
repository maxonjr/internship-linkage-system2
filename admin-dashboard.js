// Admin Portal Functions
document.addEventListener('DOMContentLoaded', function() {
    // Check if admin is logged in
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (!isAdmin && window.location.pathname.includes('admin.html')) {
        window.location.href = 'login.html?redirect=admin.html';
    }
    
    // Admin logout
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', function() {
            localStorage.removeItem('isAdmin');
            window.location.href = 'index.html';
        });
    }
    
    // Sample data for admin portal
    const recentApplications = [
        {
            id: 1,
            name: "John Doe",
            internship: "Web Developer",
            company: "Techs Ltd",
            date: "2023-05-15",
            status: "pending"
        },
        {
            id: 2,
            name: "Jane Smith",
            internship: "Marketing Intern",
            company: "Creel",
            date: "2023-05-14",
            status: "accepted"
        },
        {
            id: 3,
            name: "Mike Johnson",
            internship: "Data Science",
            company: "DataFlow Inc.",
            date: "2023-05-13",
            status: "rejected"
        }
    ];
    
    const applicants = [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            applications: 2,
            status: "active"
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            applications: 1,
            status: "active"
        }
    ];
    
    const internships = [
        {
            id: 1,
            title: "Web Developer Intern",
            company: "Techs Ltd",
            location: "Kigali",
            duration: "3 months",
            applications: 5
        },
        {
            id: 2,
            title: "Marketing Intern",
            company: "Creel",
            location: "Remote",
            duration: "4 months",
            applications: 3
        }
    ];
    
    // Display recent applications
    function displayRecentApplications() {
        const container = document.getElementById('recentApplications');
        container.innerHTML = '';
        
        recentApplications.forEach(app => {
            let statusClass = 'status-pending';
            let statusText = 'Pending';
            
            if (app.status === 'accepted') {
                statusClass = 'status-accepted';
                statusText = 'Accepted';
            } else if (app.status === 'rejected') {
                statusClass = 'status-rejected';
                statusText = 'Rejected';
            }
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${app.name}</td>
                <td>${app.internship}</td>
                <td>${app.company}</td>
                <td>${app.date}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            `;
            container.appendChild(row);
        });
    }
    
    // Display applicants
    function displayApplicants() {
        const container = document.getElementById('applicantsTable');
        container.innerHTML = '';
        
        applicants.forEach(applicant => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${applicant.name}</td>
                <td>${applicant.email}</td>
                <td>${applicant.applications}</td>
                <td><span class="status-badge status-active">Active</span></td>
                <td>
                    <button class="action-btn edit-btn">View</button>
                    <button class="action-btn delete-btn">Delete</button>
                </td>
            `;
            container.appendChild(row);
        });
    }
    
    // Display internships
    function displayInternships() {
        const container = document.getElementById('internshipsTable');
        container.innerHTML = '';
        
        internships.forEach(internship => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${internship.title}</td>
                <td>${internship.company}</td>
                <td>${internship.location}</td>
                <td>${internship.duration}</td>
                <td>${internship.applications}</td>
                <td>
                    <button class="action-btn edit-btn">Edit</button>
                    <button class="action-btn delete-btn">Delete</button>
                </td>
            `;
            container.appendChild(row);
        });
    }
    
    // Initialize admin dashboard
    displayRecentApplications();
    displayApplicants();
    displayInternships();
    
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
    
    // Add internship button
    const addInternshipBtn = document.getElementById('addInternshipBtn');
    if (addInternshipBtn) {
        addInternshipBtn.addEventListener('click', function() {
            alert('In a complete application, this would open a form to add a new internship.');
        });
    }
});