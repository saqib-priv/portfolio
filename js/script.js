document.addEventListener('DOMContentLoaded', () => {

    const particlesConfig = {
        "particles": {
            "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.4, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 120, "color": "#ffffff", "opacity": 0.3, "width": 1 },
            "move": { "enable": true, "speed": 4, "direction": "none", "random": false, "straight": false, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "onresize": { "enable": true } },
            "modes": { "grab": { "distance": 150, "line_linked": { "opacity": 0.7 } }, "push": { "particles_nb": 3 } }
        },
        "retina_detect": true
    };
    
    particlesJS('particles-js', particlesConfig);

    const header = document.querySelector('.top-header');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 100) {
            if (window.scrollY < lastScrollY) {
                header.classList.remove('hide');
            } else {
                header.classList.add('hide');
            }
        }
        lastScrollY = window.scrollY;
    });

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    gsap.to('.hero-title', { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: "power2.out" });
    gsap.to('.hero-subtitle', { opacity: 1, y: 0, duration: 1.5, delay: 1, ease: "power2.out" });
    gsap.to('#view-work-btn', { opacity: 1, y: 0, duration: 1.5, delay: 1.5, ease: "power2.out" });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    function initializeScrollReveal() {
        ScrollReveal().reveal('.reveal', {
            delay: 200,
            duration: 1000,
            easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
            distance: '50px',
            origin: 'bottom',
            interval: 150
        });
    }

    const projectsData = [
        {
            title: "Email-to-Log Automation (Zapier)",
            solution: "Designed and deployed a serverless workflow using Zapier to automatically parse and log structured data (Name, Date, Time-in/out) from specific inbound emails into a centralized Google Sheet.",
            tech: ["Zapier", "Workflow Automation", "Spreadsheets"],
            problem: "Critical time-in/out log data was being submitted via email, requiring slow, error-prone manual transfer by an HR representative.",
            impact: "Eliminated manual data entry entirely, ensuring real-time logging with 100% accuracy. This provided instant, reliable data for reporting, saving HR personnel approximately 4 hours per week.",
            link: "https://github.com/saqib-priv/portfolio-assets/blob/main/zapier.png?raw=true",
            image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zapier.svg" 
        },
        {
            title: "Work Schedule Automation",
            solution: "Designed a rule-driven automation engine in Google Sheets for seamless staff scheduling, compliance checks, and real-time updates.",
            tech: ["HTML", "JavaScript", "CSS", "Google Apps Script"],
            problem: "Saturday staffing relied on siloed spreadsheets and manual coordination, creating systemic inefficiencies and frequent errors.",
            impact: "Reduced manual scheduling effort by over 90%, eliminated data discrepancies, and enhanced compliance accountability.",
            link: "https://script.google.com/macros/s/AKfycbx4YzkO4qOjWGyST8oKFZ1XQ6dH9hNVkqt1N_bltLSM/dev",
            image: "https://via.placeholder.com/600x300/1a4d7d/FFFFFF?text=Automation+Screenshot"
        },
        {
            title: "Full-Cycle Attendance Audit Engine (Python)",
            solution: "Automated audit system in Python that detects and categorizes three key exceptions: Full Absence, Missing Tap, and Misclassified Taps (e.g., late Time-In swaps). Deploys contextual alerts for proactive reconciliation and managerial compliance.",
            tech: ["Python", "Pandas", "Data Pivoting", "Automation"],
            problem: "Manual auditing caused protracted HR disputes and high administrative overhead due to delayed, reactive reconciliation of attendance failures (including single-tap exit strategies).",
            impact: "Achieved 95%+ reduction in manual auditing. Minimized payroll risk and enhanced data integrity by establishing a verified, daily audit trail, making it the cornerstone of compliance and efficiency.",
            link: "https://github.com/saqib-priv/portfolio-assets/blob/main/Gemini_Generated_Image_m4x3xkm4x3xkm4x3.png?raw=true",
            image: "https://github.com/saqib-priv/portfolio-assets/blob/main/Gemini_Generated_Image_m4x3xkm4x3xkm4x3.png?raw=true"
        },
    ];

    function createProjectCards() {
        const container = document.getElementById('projects-container');
        container.innerHTML = '';
        
        if (projectsData.length === 0) {
            container.innerHTML = '<p class="reveal" style="text-align:center;">No projects found. Please add them to your local array.</p>';
            return;
        }
        
        projectsData.forEach(project => {
            const card = document.createElement('div');
            card.className = 'card reveal';
            
            const techArray = Array.isArray(project.tech) ? project.tech : (project.tech ? project.tech.split(',').map(s => s.trim()) : []);
            const techTagsHtml = techArray.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
            
            const descriptionText = project.solution || 'No description provided.';
            const shortDescription = descriptionText.length > 90 
                ? descriptionText.substring(0, 87) + '...' 
                : descriptionText;
            
            card.innerHTML = `
                ${project.image ? `<div class="card-img-container"><img src="${project.image}" alt="${project.title} screenshot" loading="lazy"></div>` : ''}
                <div class="card-content">
                    <h3>${project.title}</h3>
                    <p class="card-description">${shortDescription}</p>
                    <div class="card-tech-list">${techTagsHtml}</div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                document.getElementById("modalTitle").textContent = project.title;
                document.getElementById("modalTech").textContent = techArray.join(', ');
                document.getElementById("modalProblem").textContent = project.problem;
                document.getElementById("modalSolution").textContent = project.solution;
                document.getElementById("modalImpact").textContent = project.impact;
                
                document.getElementById("modalLink").target = '_blank'; 
                document.getElementById("modalLink").href = project.link || '#';
                
                const modalLinkElement = document.getElementById("modalLink");
                const newModalLinkElement = modalLinkElement.cloneNode(true);
                modalLinkElement.parentNode.replaceChild(newModalLinkElement, modalLinkElement);

                newModalLinkElement.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const url = e.currentTarget.href;
                    if (url && url !== '#') {
                        window.open(url, '_blank');
                    }
                });
                
                document.getElementById("modalLink").href = project.link || '#';
                document.getElementById("modalLink").target = '_blank';


                const modal = document.getElementById("projectModal");
                modal.style.display = "block";
                modal.setAttribute('aria-hidden', 'false');
            });
            
            container.appendChild(card);
        });
        
        initializeScrollReveal();
    }
    
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');

    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
        modal.setAttribute('aria-hidden', 'true');
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            modal.setAttribute('aria-hidden', 'true');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }
    });

    const form = document.getElementById("contactForm");
    const statusEl = document.getElementById("status");

    form.addEventListener("submit", async function(e){
        e.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]'); 

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        statusEl.textContent = "Sending message...";
        statusEl.style.color = "#888";
        
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                statusEl.textContent = "Message sent successfully! I will get back to you soon.";
                statusEl.style.color = "green";
                form.reset();
            } else {
                const data = await response.json();
                if (Object.hasOwnProperty.call(data, 'errors')) {
                    statusEl.textContent = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    statusEl.textContent = "Oops! There was a problem submitting your form.";
                }
                statusEl.style.color = "red";
            }
        } catch(err) {
            statusEl.textContent = "Network error. Please try again later.";
            statusEl.style.color = "red";
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Send Message & Get a Project Idea";
        }
    });

    createProjectCards();
});
