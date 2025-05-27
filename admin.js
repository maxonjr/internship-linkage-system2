// Admin Portal JavaScript - Enhanced Version
document.addEventListener('DOMContentLoaded', function() {
    // Check admin authentication
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'loginin.html';
        return;
    }

    // Sample Data (replace with API calls in production)
    const data = {
        recentApplications: [
            { id: 1, name: "John Doe", internship: "Web Developer", company: "Techs Ltd", date: "2023-05-15", status: "pending" },
            { id: 2, name: "Jane Smith", internship: "Marketing Intern", company: "Creel", date: "2023-05-14", status: "approved" },
            { id: 3, name: "Alex Johnson", internship: "Data Science", company: "DataFlow", date: "2023-05-13", status: "rejected" }
        ],
        applicants: [
            { id: 1, name: "John Doe", email: "john@example.com", phone: "555-123-4567", applications: 3, status: "active" },
            { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "555-987-6543", applications: 2, status: "active" }
        ],
        internships: [
            { id: 1, title: "Web Developer Intern", company: "Techs Ltd", location: "Kigali", duration: "3 months", applications: 5, status: "active" },
            { id: 2, title: "Marketing Intern", company: "Creel", location: "Remote", duration: "4 months", applications: 3, status: "active" }
        ],
        companies: [
            { id: 1, name: "Techs Ltd", industry: "Technology", contact: "contact@techs.com", internships: 3, status: "active" },
            { id: 2, name: "Creel", industry: "Marketing", contact: "hr@creel.com", internships: 2, status: "active" }
        ],
        schools: [
            { id: 1, name: "University of Rwanda", location: "Kigali", students: 1500, partnership: "active", status: "active" },
            { id: 2, name: "African Leadership University", location: "Kigali", students: 800, partnership: "active", status: "active" }
        ]
    };

    // DOM Elements
    const modal = document.getElementById('viewModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.close-modal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalSaveBtn = document.getElementById('modalSaveBtn');

    // Initialize Admin Dashboard
    function initAdminDashboard() {
        loadDashboard();
        setupNavigation();
        setupEventListeners();
    }

    // Load Dashboard Data
    function loadDashboard() {
        loadRecentApplications();
        loadApplicants();
        loadInternships();
        loadCompanies();
        loadSchools();
    }

    // Load Recent Applications
    function loadRecentApplications() {
        const container = document.getElementById('recentApplications');
        if (!container) return;
        
        container.innerHTML = data.recentApplications.map(app => `
            <tr>
                <td>${app.name}</td>
                <td>${app.internship}</td>
                <td>${app.company}</td>
                <td>${app.date}</td>
                <td><span class="status-badge status-${app.status}">${formatStatus(app.status)}</span></td>
                <td>
                    <button class="action-btn view-btn" data-type="application" data-id="${app.id}">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="action-btn edit-btn" data-type="application" data-id="${app.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Load Applicants
    function loadApplicants() {
        const container = document.getElementById('applicantsTable');
        if (!container) return;
        
        container.innerHTML = data.applicants.map(applicant => `
            <tr>
                <td>${applicant.id}</td>
                <td>${applicant.name}</td>
                <td>${applicant.email}</td>
                <td>${applicant.phone}</td>
                <td>${applicant.applications}</td>
                <td><span class="status-badge status-${applicant.status}">${formatStatus(applicant.status)}</span></td>
                <td>
                    <button class="action-btn view-btn" data-type="applicant" data-id="${applicant.id}">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="action-btn edit-btn" data-type="applicant" data-id="${applicant.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn delete-btn" data-type="applicant" data-id="${applicant.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Load Internships
    function loadInternships() {
        const container = document.getElementById('internshipsTable');
        if (!container) return;
        
        container.innerHTML = data.internships.map(internship => `
            <tr>
                <td>${internship.id}</td>
                <td>${internship.title}</td>
                <td>${internship.company}</td>
                <td>${internship.location}</td>
                <td>${internship.duration}</td>
                <td>${internship.applications}</td>
                <td><span class="status-badge status-${internship.status}">${formatStatus(internship.status)}</span></td>
                <td>
                    <button class="action-btn view-btn" data-type="internship" data-id="${internship.id}">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="action-btn edit-btn" data-type="internship" data-id="${internship.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn delete-btn" data-type="internship" data-id="${internship.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Load Companies
    function loadCompanies() {
        const container = document.getElementById('companiesTable');
        if (!container) return;
        
        container.innerHTML = data.companies.map(company => `
            <tr>
                <td>${company.id}</td>
                <td>${company.name}</td>
                <td>${company.industry}</td>
                <td>${company.contact}</td>
                <td>${company.internships}</td>
                <td><span class="status-badge status-${company.status}">${formatStatus(company.status)}</span></td>
                <td>
                    <button class="action-btn view-btn" data-type="company" data-id="${company.id}">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="action-btn edit-btn" data-type="company" data-id="${company.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn delete-btn" data-type="company" data-id="${company.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Load Schools
    function loadSchools() {
        const container = document.getElementById('schoolsTable');
        if (!container) return;
        
        container.innerHTML = data.schools.map(school => `
            <tr>
                <td>${school.id}</td>
                <td>${school.name}</td>
                <td>${school.location}</td>
                <td>${school.students}</td>
                <td>${school.partnership}</td>
                <td><span class="status-badge status-${school.status}">${formatStatus(school.status)}</span></td>
                <td>
                    <button class="action-btn view-btn" data-type="school" data-id="${school.id}">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="action-btn edit-btn" data-type="school" data-id="${school.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn delete-btn" data-type="school" data-id="${school.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Format status for display
    function formatStatus(status) {
        return status.charAt(0).toUpperCase() + status.slice(1);
    }

    // Setup Navigation
    function setupNavigation() {
        const links = document.querySelectorAll('.admin-sidebar a');
        const sections = document.querySelectorAll('.content-section');

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update active link
                links.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding section
                const target = this.getAttribute('href');
                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === target.substring(1)) {
                        section.classList.add('active');
                    }
                });
            });
        });
    }

    // Setup Event Listeners
    function setupEventListeners() {
        // Logout
        document.getElementById('logoutBtn').addEventListener('click', function() {
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'loginin.html';
        });

        // Modal Close Events
        closeModal.addEventListener('click', closeModalWindow);
        modalCloseBtn.addEventListener('click', closeModalWindow);
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModalWindow();
            }
        });

        // View/Edit/Delete Buttons (event delegation)
        document.addEventListener('click', function(e) {
            // View buttons
            if (e.target.closest('.view-btn')) {
                const btn = e.target.closest('.view-btn');
                const type = btn.getAttribute('data-type');
                const id = btn.getAttribute('data-id');
                showViewModal(type, id);
            }
            
            // Edit buttons
            if (e.target.closest('.edit-btn')) {
                const btn = e.target.closest('.edit-btn');
                const type = btn.getAttribute('data-type');
                const id = btn.getAttribute('data-id');
                showEditModal(type, id);
            }
            
            // Delete buttons
            if (e.target.closest('.delete-btn')) {
                const btn = e.target.closest('.delete-btn');
                const type = btn.getAttribute('data-type');
                const id = btn.getAttribute('data-id');
                deleteItem(type, id);
            }
        });

        // Add buttons
        document.getElementById('addInternshipBtn').addEventListener('click', function() {
            showAddModal('internship');
        });
        document.getElementById('addCompanyBtn').addEventListener('click', function() {
            showAddModal('company');
        });
        document.getElementById('addSchoolBtn').addEventListener('click', function() {
            showAddModal('school');
        });

        // Settings buttons
        document.getElementById('manageAdminsBtn').addEventListener('click', function() {
            alert('Admin management functionality would open here');
        });
    }

    // Show View Modal
    function showViewModal(type, id) {
        const item = findItem(type, id);
        if (!item) return;

        modalTitle.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Details`;
        
        let content = '';
        if (type === 'application') {
            content = `
                <div class="detail-row">
                    <span class="detail-label">Applicant:</span>
                    <span class="detail-value">${item.name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Internship:</span>
                    <span class="detail-value">${item.internship}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Company:</span>
                    <span class="detail-value">${item.company}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date Applied:</span>
                    <span class="detail-value">${item.date}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status:</span>
                    <span class="detail-value status-badge status-${item.status}">${formatStatus(item.status)}</span>
                </div>
            `;
        } else if (type === 'applicant') {
            content = `
                <div class="detail-row">
                    <span class="detail-label">Name:</span>
                    <span class="detail-value">${item.name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">${item.email}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Phone:</span>
                    <span class="detail-value">${item.phone}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Applications:</span>
                    <span class="detail-value">${item.applications}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status:</span>
                    <span class="detail-value status-badge status-${item.status}">${formatStatus(item.status)}</span>
                </div>
            `;
        }
        
        modalBody.innerHTML = content;
        modalSaveBtn.style.display = 'none';
        modal.style.display = 'block';
    }

    // Show Edit Modal
    function showEditModal(type, id) {
        const item = findItem(type, id);
        if (!item) return;

        modalTitle.textContent = `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`;
        
        let content = '';
        if (type === 'application') {
            content = `
                <div class="form-group">
                    <label for="editStatus">Status</label>
                    <select id="editStatus">
                        <option value="pending" ${item.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="approved" ${item.status === 'approved' ? 'selected' : ''}>Approved</option>
                        <option value="rejected" ${item.status === 'rejected' ? 'selected' : ''}>Rejected</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="editNotes">Admin Notes</label>
                    <textarea id="editNotes" placeholder="Add any notes about this application..."></textarea>
                </div>
            `;
        }
        
        modalBody.innerHTML = content;
        modalSaveBtn.style.display = 'inline-block';
        modal.style.display = 'block';
    }

    // Show Add Modal
    function showAddModal(type) {
        modalTitle.textContent = `Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`;
        
        let content = '';
        if (type === 'internship') {
            content = `
                <div class="form-group">
                    <label for="addTitle">Title</label>
                    <input type="text" id="addTitle" placeholder="Internship Title">
                </div>
                <div class="form-group">
                    <label for="addCompany">Company</label>
                    <select id="addCompany">
                        <option value="">Select Company</option>
                        ${data.companies.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="addLocation">Location</label>
                    <input type="text" id="addLocation" placeholder="e.g. Kigali or Remote">
                </div>
                <div class="form-group">
                    <label for="addDuration">Duration</label>
                    <input type="text" id="addDuration" placeholder="e.g. 3 months">
                </div>
            `;
        }
        
        modalBody.innerHTML = content;
        modalSaveBtn.style.display = 'inline-block';
        modal.style.display = 'block';
    }

    // Close Modal
    function closeModalWindow() {
        modal.style.display = 'none';
    }

    // Find Item in Data
    function findItem(type, id) {
        const collection = data[`${type}s`] || data.recentApplications;
        return collection.find(item => item.id == id);
    }

    // Delete Item
    function deleteItem(type, id) {
        if (confirm(`Are you sure you want to delete this ${type}?`)) {
            // In a real app, this would make an API call
            alert(`Successfully deleted ${type} with ID ${id}`);
            // Refresh the view
            loadDashboard();
        }
    }

    // Initialize the dashboard
    initAdminDashboard();
});