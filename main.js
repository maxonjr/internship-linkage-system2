// Sample internship data
const internships = [
    {
        id: 1,
        title: "Web Developer Intern",
        company: "Techs Ltd",
        location: "Kigali",
        duration: "3 months",
        field: "tech",
        description: "Build responsive websites using modern frameworks like React and Node.js. Perfect for CS students.",
        remote: false
    },
    {
        id: 2,
        title: "Marketing Intern",
        company: "Creel",
        location: "Remote",
        duration: "4 months",
        field: "marketing",
        description: "Create social media campaigns and analyze digital marketing metrics. No experience required.",
        remote: true
    },
    {
        id: 3,
        title: "Data Science Intern",
        company: "DataFlow Inc.",
        location: "Nairobi",
        duration: "6 months",
        field: "tech",
        description: "Analyze datasets and build predictive models. Mentorship provided.",
        remote: false
    },
    {
        id: 4,
        title: "Graphic Design Intern",
        company: "Pixel Studios",
        location: "Lagos",
        duration: "2 months",
        field: "design",
        description: "Create visuals for brands and assist in design projects. Portfolio required.",
        remote: false
    },
    {
        id: 5,
        title: "Finance Intern",
        company: "CapitalTrust",
        location: "Johannesburg",
        duration: "3 months",
        field: "finance",
        description: "Support financial analysis and audit processes. Business/Finance majors preferred.",
        remote: false
    },
    {
        id: 6,
        title: "Healthcare Intern",
        company: "MedLife Group",
        location: "Cairo",
        duration: "5 months",
        field: "healthcare",
        description: "Assist in medical research and administrative tasks. Open to pre-med students.",
        remote: false
    }
];

// DOM Elements
const internshipContainer = document.getElementById('internship-container');
const fieldFilter = document.getElementById('field-filter');
const locationFilter = document.getElementById('location-filter');

// Display internships
function displayInternships(internshipsToDisplay) {
    internshipContainer.innerHTML = '';
    
    internshipsToDisplay.forEach(internship => {
        const card = document.createElement('div');
        card.className = 'internship-card';
        card.innerHTML = `
            <div class="internship-img" style="background-image: url('images/internship-${internship.id}.jpg')"></div>
            <div class="internship-content">
                <h4>${internship.title}</h4>
                <span class="company">${internship.company}</span>
                <div class="details">
                    <span class="detail-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        ${internship.location}
                    </span>
                    <span class="detail-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        ${internship.duration}
                    </span>
                </div>
                <p>${internship.description}</p>
                <button class="apply-btn" data-id="${internship.id}">Apply Now</button>
            </div>
        `;
        internshipContainer.appendChild(card);
    });
    
    // Add event listeners to apply buttons
    document.querySelectorAll('.apply-btn').forEach(button => {
        button.addEventListener('click', function() {
            const internshipId = this.getAttribute('data-id');
            // Check if user is logged in (in a real app, you would check authentication)
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            
            if (isLoggedIn) {
                window.location.href = `apply.html?id=${internshipId}`;
            } else {
                window.location.href = `login.html?redirect=apply.html?id=${internshipId}`;
            }
        });
    });
}

// Filter internships
function filterInternships() {
    const fieldValue = fieldFilter.value;
    const locationValue = locationFilter.value;
    
    let filtered = internships;
    
    if (fieldValue !== 'all') {
        filtered = filtered.filter(internship => internship.field === fieldValue);
    }
    
    if (locationValue !== 'all') {
        if (locationValue === 'remote') {
            filtered = filtered.filter(internship => internship.remote);
        } else {
            filtered = filtered.filter(internship => internship.location === locationValue);
        }
    }
    
    displayInternships(filtered);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayInternships(internships);
    
    // Add event listeners to filters
    fieldFilter.addEventListener('change', filterInternships);
    locationFilter.addEventListener('change', filterInternships);
    
    // Check if there's a success message to show (from login/application)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
        alert('Your application has been submitted successfully!');
    }
});