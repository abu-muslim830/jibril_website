// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- SETTING 1: App-like Page Navigation ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const allSections = document.querySelectorAll('section');

    // Hide all sections initially EXCEPT the Home (hero) section
    allSections.forEach(section => {
        if (section.id !== 'hero') {
            section.style.display = 'none';
        }
    });

    // Change visible section when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            const targetId = this.getAttribute('href').substring(1);
            
            allSections.forEach(section => {
                section.style.display = 'none';
            });

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // --- Dynamic Copyright Year (Bonus) ---
    const footer = document.querySelector('footer p');
    if (footer) {
        footer.innerHTML = `&copy; ${new Date().getFullYear()} Jibril A Sadiq General Enterprises. All rights reserved.`;
    }

    // --- SETTING 2: Toggle Contact Form Visibility ---
    const showFormBtn = document.getElementById('show-form-btn');
    const contactForm = document.getElementById('contact-form'); 
    const formStatus = document.getElementById('form-status');

    if (showFormBtn && contactForm) {
        showFormBtn.addEventListener('click', () => {
            if (contactForm.style.display === 'none' || contactForm.style.display === '') {
                contactForm.style.display = 'flex'; // Shows the form
                showFormBtn.innerText = 'Hide Message Form';
                window.scrollBy({ top: 200, behavior: 'smooth' });
            } else {
                contactForm.style.display = 'none'; // Hides the form
                showFormBtn.innerText = 'Write Us a Message';
            }
        });
    }

    // --- SETTING 3: Server + WhatsApp Double Send ---
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stops the page from refreshing

            const messageData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            try {
                // PART A: Send to Server
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(messageData)
                });

                if (response.ok) {
                    if (formStatus) formStatus.style.display = 'block';
                    
                    // PART B: Send to WhatsApp
                    const whatsappNumber = "2348105307639"; 
                    const whatsappText = encodeURIComponent(
                        `Hello Jibril A Sadiq General Enterprises!\n\nI am contacting you from your website.\n\nName: ${messageData.name}\nPhone: ${messageData.phone}\nMessage: ${messageData.message}`
                    );
                    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
                    
                    // Opens WhatsApp
                    window.open(whatsappURL, '_blank');

                    // Reset the form layout
                    contactForm.reset();
                    setTimeout(() => {
                        if (formStatus) formStatus.style.display = 'none';
                        contactForm.style.display = 'none';
                        if (showFormBtn) showFormBtn.innerText = 'Write Us a Message';
                    }, 4000);
                } else {
                    alert('There was a problem sending your message. Please try again.');
                }
            } catch (error) {
                console.error('Error sending message:', error);
                alert('Server error. Please ensure the server is running.');
            }
        });
    }
});