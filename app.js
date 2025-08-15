// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        navLinks.classList.remove('active');
    });
});

// Floating tech elements generator
function createFloatingElement() {
    const shapes = ['circle', 'hexagon'];
    const hero = document.querySelector('.hero');
    
    if (!hero) return;

    const element = document.createElement('div');
    element.className = 'floating-tech';
    element.style.cssText = `
        position: absolute;
        width: ${10 + Math.random() * 30}px;
        height: ${10 + Math.random() * 30}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${0.2 + Math.random() * 0.5};
        animation: techFloat ${20 + Math.random() * 20}s infinite linear;
        background: ${Math.random() > 0.5 ? 
            'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)' : 
            'linear-gradient(45deg, rgba(46,204,113,0.3) 0%, rgba(39,174,96,0.3) 100%)'};
        border-radius: ${shapes[Math.floor(Math.random() * shapes.length)] === 'circle' ? '50%' : '10%'};
    `;

    hero.appendChild(element);
}

// Generate elements on load and resize
function generateTechElements() {
    const count = window.innerWidth > 768 ? 25 : 10;
    document.querySelectorAll('.floating-tech').forEach(el => el.remove());
    Array.from({ length: count }).forEach(createFloatingElement);
}

window.addEventListener('load', generateTechElements);
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
    }
    generateTechElements();
});

// Animation frame for continuous movement
function animateTech() {
    document.querySelectorAll('.floating-tech').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.left > window.innerWidth) {
            el.style.left = `${Math.random() * 100}%`;
            el.style.top = `-${30 + Math.random() * 20}%`;
        }
    });
    requestAnimationFrame(animateTech);
}

animateTech();

// Contact form handling
const contactForm = document.getElementById('contactForm');

function showMessage(message, isError = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isError ? 'error-message' : 'success-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: ${isError ? '#ff4444' : '#4CAF50'};
        color: white;
        padding: 15px 30px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Form validation
    if (!name || !email || !message) {
        showMessage('Please fill in all fields', true);
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage('Please enter a valid email address', true);
        return;
    }
    
    if (message.length < 10) {
        showMessage('Message must be at least 10 characters long', true);
        return;
    }
    
    // Disable submit button during submission
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Simulate form submission (since we don't have a backend)
    setTimeout(() => {
        const formattedMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
        const mailtoLink = `mailto:ss9830872697@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(formattedMessage)}`;
        window.location.href = mailtoLink;
        
        showMessage('Message sent successfully! Thank you for contacting me.');
        contactForm.reset();
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }, 1000);
});

// Add fade animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -20px); }
        to { opacity: 1; transform: translate(-50%, 0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, 0); }
        to { opacity: 0; transform: translate(-50%, -20px); }
    }
`;
document.head.appendChild(style);