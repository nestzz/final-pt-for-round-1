document.addEventListener('DOMContentLoaded', () => {
    const createPlansBtn = document.getElementById('create-plans-btn');
    
    // Debug: Check if button is found
    console.log('Create Plans Button:', createPlansBtn);
    
    // Add click event handler for create plans buttons
    createPlansBtn.addEventListener('click', () => {
        console.log('Button clicked!'); // Debug: Verify click is working
        window.location.href = './create-plans.html'; // Note: Added ./ for relative path
    });
    
    // Calculate scrollbar height


});


document.addEventListener('DOMContentLoaded', () => {
    // Create custom scrollbar elements
    const scrollbarContainer = document.createElement('div');
    scrollbarContainer.className = 'custom-scrollbar-container';
    
    const scrollThumb = document.createElement('div');
    scrollThumb.className = 'custom-scrollbar-thumb';
    
    scrollbarContainer.appendChild(scrollThumb);
    document.body.appendChild(scrollbarContainer);

    // Add the necessary styles with !important to override defaults
    const style = document.createElement('style');
    style.textContent = `
        /* Hide default scrollbar */
        html, body {
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
        }

        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
            width: 0 !important;
            display: none !important;
        }

        .custom-scrollbar-container {
            position: fixed;
            right: 20px;
            top: 35%;
            height: 30%;
            width: 8px;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            z-index: 9999;
        }

        .custom-scrollbar-thumb {
            width: 100%;
            background: #FF65BE;
            border-radius: 10px;
            cursor: pointer;
            border: 1px solid rgba(0, 0, 0, 0.8);
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
            position: absolute;
            top: 0;
            right: 0;
        }
    `;
    document.head.appendChild(style);

    // Calculate and update scrollbar position
    function updateScrollbar() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Calculate thumb height
        const scrollPercent = windowHeight / documentHeight;
        const thumbHeight = Math.max(scrollPercent * scrollbarContainer.offsetHeight, 40); // minimum 40px height
        scrollThumb.style.height = `${thumbHeight}px`;
        
        // Calculate thumb position
        const maxScroll = documentHeight - windowHeight;
        const scrollFraction = scrollTop / maxScroll;
        const maxThumbTravel = scrollbarContainer.offsetHeight - thumbHeight;
        const thumbPosition = scrollFraction * maxThumbTravel;
        
        scrollThumb.style.top = `${thumbPosition}px`;
    }

    // Handle scrollbar drag
    let isDragging = false;
    let startY;
    let startScroll;

    scrollThumb.addEventListener('mousedown', (e) => {
        isDragging = true;
        startY = e.clientY;
        startScroll = window.pageYOffset;
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaY = e.clientY - startY;
        const scrollbarHeight = scrollbarContainer.offsetHeight;
        const thumbHeight = scrollThumb.offsetHeight;
        
        const scrollFraction = deltaY / (scrollbarHeight - thumbHeight);
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const maxScroll = documentHeight - windowHeight;
        
        window.scrollTo(0, startScroll + (scrollFraction * maxScroll));
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.userSelect = '';
    });

    // Update scrollbar on scroll and resize
    window.addEventListener('scroll', updateScrollbar);
    window.addEventListener('resize', updateScrollbar);

    // Initial update
    updateScrollbar();
});


document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader-container');
    
    // Check if this is the first visit
    if (loader && !sessionStorage.getItem('firstLoadDone')) {
        // Create particles
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'loader-particle';
            
            // Random position around the logo
            const angle = Math.random() * Math.PI * 2;
            const radius = 50 + Math.random() * 50;
            const startX = Math.cos(angle) * radius;
            const startY = Math.sin(angle) * radius;
            
            // Random movement
            const tx = (Math.random() - 0.5) * 100;
            const ty = (Math.random() - 0.5) * 100;
            
            particle.style.left = `calc(50% + ${startX}px)`;
            particle.style.top = `calc(50% + ${startY}px)`;
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            
            // Animate particle
            particle.style.animation = `particleFade ${1 + Math.random()}s ease-out forwards`;
            
            loader.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => particle.remove(), 2000);
        }
        
        // Create particles periodically
        const particleInterval = setInterval(createParticle, 100);
        
        // Show loader with particles
        loader.style.display = 'flex';
        loader.style.opacity = '1';
        
        // Hide loader after animation
        setTimeout(() => {
            clearInterval(particleInterval);
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                // Set the flag in sessionStorage
                sessionStorage.setItem('firstLoadDone', 'true');
            }, 800);
        }, 3000);
    } else if (loader) {
        // If not first visit, hide loader immediately
        loader.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const particles = document.querySelector('.particles');

    // Check if we're navigating within the same session
    if (performance.navigation.type === 2 || sessionStorage.getItem('hasVisited')) {
        // Hide loader immediately if coming back via back button or already visited
        if (particles) {
            particles.style.display = 'none';
        }
    } else {
        // First visit in this session - show animation
        sessionStorage.setItem('hasVisited', 'true');
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            createParticle();
        }

        // Remove loader after animation
        setTimeout(() => {
            if (particles) {
                particles.style.opacity = '0';
                setTimeout(() => {
                    particles.remove();
                }, 500);
            }
        }, 6000);
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position on the circle
        const angle = Math.random() * Math.PI * 2;
        const radius = 100; // This is the circle radius
        const startX = Math.cos(angle) * radius;
        const startY = Math.sin(angle) * radius;
        
        // Random end position (now always moving outward)
        const endRadius = radius + (Math.random() * 200 + 100); // Move 100-300px outward
        const endX = Math.cos(angle) * endRadius;
        const endY = Math.sin(angle) * endRadius;
        
        // Calculate the translation values
        const tx = endX - startX;
        const ty = endY - startY;
        
        particle.style.left = `calc(50% + ${startX}px)`;
        particle.style.top = `calc(50% + ${startY}px)`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        // Random delay and duration
        const delay = Math.random() * 1000;
        const duration = 1000 + Math.random() * 1000;
        
        particle.style.animation = `particleMove ${duration}ms ease-out ${delay}ms infinite`;
        particles.appendChild(particle);
    }
});

// Timeline Animation
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function callbackFunc() {
        timelineItems.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', callbackFunc);
    window.addEventListener('load', callbackFunc);
});

document.addEventListener('DOMContentLoaded', () => {
    const sapText = document.querySelector('.sap-text');
    if (sapText) {
        // Split text into words first, then characters
        const words = sapText.textContent.split(' ');
        sapText.textContent = '';
        
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            
            // Add characters within each word
            word.split('').forEach((char, charIndex) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.className = 'char';
                span.style.setProperty('--char-index', charIndex);
                span.style.setProperty('--word-index', wordIndex);
                wordSpan.appendChild(span);
            });
            
            sapText.appendChild(wordSpan);
            
            // Add space between words (except for last word)
            if (wordIndex < words.length - 1) {
                const space = document.createElement('span');
                space.textContent = ' ';
                space.className = 'space';
                sapText.appendChild(space);
            }
        });

        // Create floating particles
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 4px and 8px
            const size = Math.random() * 4 + 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position around the text
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            particle.style.left = `calc(50% + ${x}px)`;
            particle.style.top = `calc(50% + ${y}px)`;
            
            sapText.appendChild(particle);
            
            // Animate the particle
            requestAnimationFrame(() => {
                particle.style.opacity = '0.8';
                particle.style.transform = `translate(${x * 2}px, ${y * 2}px) scale(0)`;
                particle.style.transition = 'all 1s ease-out';
                
                setTimeout(() => particle.remove(), 1000);
            });
        }

        // Create particles on hover
        sapText.addEventListener('mouseover', () => {
            const interval = setInterval(() => {
                createParticle();
            }, 50);
            
            sapText.addEventListener('mouseleave', () => {
                clearInterval(interval);
            }, { once: true });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const timelineBoxes = document.querySelectorAll('.timeline-box');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    timelineBoxes.forEach(box => {
        observer.observe(box);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements you want to animate on scroll
    const elementsToFade = document.querySelectorAll('.timeline-box, .curve-container, .simple-hello, .sap-logo, .sap-text');
    elementsToFade.forEach(element => {
        element.classList.add('fade-in-element');
    });

    // Create intersection observer
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in-element').forEach(element => {
        observer.observe(element);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll reveal
    const elementsToAnimate = document.querySelectorAll(`
        .wrapper,
        .h6-content,
        .plans-button,
        .marquee-container,
        .timeline-box,
        .curve-container,
        .simple-hello,
        .sap-logo,
        .sap-text,
        .animated-line,
        .timeline-content,
        .second-last
    `);

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(element => {
        element.classList.add('scroll-fade');
        observer.observe(element);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        // Scrolling down
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        }
        // Scrolling up
        else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    
    // Track mouse position for gradient effect
    header.addEventListener('mousemove', (e) => {
        const rect = header.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / header.offsetWidth) * 100;
        const y = ((e.clientY - rect.top) / header.offsetHeight) * 100;
        
        header.style.setProperty('--mouse-x', `${x}%`);
        header.style.setProperty('--mouse-y', `${y}%`);
        
        // Create dynamic light effect
        updateLightEffect(e.clientX, e.clientY);
    });
    
    // Function to create dynamic light effect
    function updateLightEffect(mouseX, mouseY) {
        document.body.style.background = `
            radial-gradient(
                circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.03) 0%,
                rgba(255, 255, 255, 0) 60%
            ),
            whitesmoke
        `;
    }
    
    // Reset background when mouse leaves header
    header.addEventListener('mouseleave', () => {
        document.body.style.background = 'whitesmoke';
    });
});

// SAP Text Animation
document.addEventListener('DOMContentLoaded', () => {
    // Split SAP text into words
    document.querySelectorAll('.sap-text').forEach((element) => {
        const words = element.textContent.trim().split(/\s+/);
        element.innerHTML = ''; // Clear existing content
        
        words.forEach((word, index) => {
            // Create word span with index
            const span = document.createElement('span');
            span.textContent = word;
            span.className = 'word';
            span.style.setProperty('--word-index', index); // Add index for staggered animation
            element.appendChild(span);
            
            // Add space after word (except for last word)
            if (index < words.length - 1) {
                const space = document.createElement('span');
                space.className = 'space';
                space.innerHTML = '&nbsp;';
                element.appendChild(space);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const lastText = document.querySelector('.last-text');
    
    if (lastText) {
        // Split text into specific word groups with character spans
        const text = lastText.textContent;
        lastText.innerHTML = `
            <div class="word-group word-sap-ai">
                ${'SAP AI'.split('').map((char, index) => 
                    `<span class="char" style="--char-index: ${index}">${char}</span>`
                ).join('')}
            </div>
            <span class="last-span">&</span>
            <div class="word-group word-you">
                ${`you`.split('').map((char, index) => 
                    `<span class="char" style="--char-index: ${index}">${char}</span>`
                ).join('')}
            </div>
        `;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        const preview = link.querySelector('.preview-window');
        
        // Create floating particles
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'preview-particle';
            preview.appendChild(particle);
            
            // Random position and animation
            const animate = () => {
                const startX = Math.random() * 100;
                const startY = Math.random() * 100;
                const endX = Math.random() * 100;
                const endY = Math.random() * 100;
                const duration = 2000 + Math.random() * 3000;
                
                particle.style.left = `${startX}%`;
                particle.style.top = `${startY}%`;
                
                particle.animate([
                    { left: `${startX}%`, top: `${startY}%`, opacity: 0 },
                    { opacity: 1, offset: 0.2 },
                    { opacity: 1, offset: 0.8 },
                    { left: `${endX}%`, top: `${endY}%`, opacity: 0 }
                ], {
                    duration: duration,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    fill: 'forwards'
                }).onfinish = animate;
            };
            
            animate();
        }
        
        // Add hover sound effect (optional)
        link.addEventListener('mouseenter', () => {
            const hoverSound = new Audio('path-to-your-hover-sound.mp3'); // Optional
            hoverSound.volume = 0.2;
            hoverSound.play().catch(() => {}); // Catch and ignore autoplay restrictions
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const thankYou = document.querySelector('.thank-you');
    if (thankYou) {
        thankYou.addEventListener('click', () => {
            // Create particles
            for (let i = 0; i < 20; i++) {
                createThankYouParticle(thankYou);
            }

            // Get the header start position
            const headerStart = document.querySelector('.header').offsetTop;
            
            // Super fast scroll animation to header
            const duration = 500;
            const start = window.pageYOffset;
            const startTime = performance.now();

            function scroll() {
                const currentTime = performance.now();
                const progress = (currentTime - startTime) / duration;

                if (progress < 1) {
                    const currentPos = start * (1 - progress);
                    window.scrollTo(0, currentPos);
                    requestAnimationFrame(scroll);
                } else {
                    window.scrollTo(0, headerStart);
                }
            }

            requestAnimationFrame(scroll);
        });

        // Add styles to prevent shrinking on hover
        const style = document.createElement('style');
        style.textContent = `
            .thank-you {
                transform-origin: center center;
                transition: all 0.3s ease;
                transform: scale(1);
            }
            
            .thank-you:hover {
                transform: scale(1) !important;
                /* Prevent any unintended scaling */
                transform-origin: center center !important;
            }

            .collaborate-text {
                transform-origin: center center;
                transition: all 0.3s ease;
                transform: scale(1);
            }
            
            .collaborate-text:hover {
                transform: scale(1) !important;
                /* Prevent any unintended scaling */
                transform-origin: center center !important;
            }
        `;
        document.head.appendChild(style);
    }
});

// Fallback smooth scroll function
function smoothScrollToTop() {
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(smoothScrollToTop);
        window.scrollTo(0, currentScroll - currentScroll / 8);
    }
}

// Optional: Add scroll progress tracking
function scrollProgress() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    console.log(`Scroll Progress: ${progress}%`);
}

// Optional: Add scroll event listener to track progress
window.addEventListener('scroll', scrollProgress);

function createThankYouParticle(element) {
    const particle = document.createElement('span');
    particle.className = 'thank-you-particle';
    
    // Random position around the text
    const rect = element.getBoundingClientRect();
    const angle = Math.random() * Math.PI * 2;
    const radius = 50;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    particle.style.cssText = `
        position: absolute;
        left: ${rect.width/2 + x}px;
        top: ${rect.height/2 + y}px;
        width: 8px;
        height: 8px;
        background: ${Math.random() > 0.5 ? '#bc787a' : '#a15d5f'};
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
    `;
    
    element.appendChild(particle);
    
    // Animate the particle
    const animation = particle.animate([
        {
            transform: 'translate(0, 0) scale(1)',
            opacity: 1
        },
        {
            transform: `translate(${x * 2}px, ${y * 2}px) scale(0)`,
            opacity: 0
        }
    ], {
        duration: 1000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });
    
    animation.onfinish = () => particle.remove();
}

document.addEventListener('DOMContentLoaded', () => {
    const bottomSection = document.querySelector('.bottom-section');
    if (bottomSection) {
        // Add the necessary styles with !important to override defaults
        const style = document.createElement('style');
        style.textContent = `
            .bottom-section {
                position: relative;
                width: 100%;
                background: linear-gradient(to bottom, #ffe6e7, #ffd6d9);
                padding: 50px 0;
                margin-top: 100px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }

            .bottom-section::before,
            .bottom-section::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 2px;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(188, 120, 122, 0.5),
                    transparent
                );
            }

            .bottom-section::before {
                top: 0;
            }

            .bottom-section::after {
                bottom: 0;
            }

            .thank-you-div {
                position: relative;
                padding: 20px;
                perspective: 1000px;
                transform-style: preserve-3d;
                margin: 100px auto 50px auto; /* Adjust top/bottom margins */
                width: fit-content;
                z-index: 10;
            }

            .thank-you {
                font-size: 45px;
                margin-bottom: 20px; /* Add space below text */
                /* ... rest of existing thank-you styles ... */
            }

            .thank-you-div {
                position: relative;
                background-image: 
                    radial-gradient(circle at 50% 50%, rgba(188, 120, 122, 0.1) 0%, transparent 50%),
                    linear-gradient(to bottom, #ffe6e7, #ffd6d9);
                background-size: 30px 30px, 100% 100%;
            }
        `;
        document.head.appendChild(style);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const bottomSection = document.querySelector('.bottom-section');
    if (bottomSection) {
        // Add the necessary styles with !important to override defaults
        const style = document.createElement('style');
        style.textContent = `
            .bottom-section {
                position: relative;
                width: 100%;
                background: linear-gradient(to bottom, #ffe6e7, #ffd6d9);
                padding: 50px 0;
                margin-top: 100px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }

            .bottom-section::before,
            .bottom-section::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 2px;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(188, 120, 122, 0.5),
                    transparent
                );
            }

            .bottom-section::before {
                top: 0;
            }

            .bottom-section::after {
                bottom: 0;
            }

            .thank-you-div {
                position: relative;
                padding: 20px;
                perspective: 1000px;
                transform-style: preserve-3d;
                margin: 100px auto 50px auto; /* Adjust top/bottom margins */
                width: fit-content;
                z-index: 10;
            }

            .thank-you {
                font-size: 45px;
                margin-bottom: 20px; /* Add space below text */
                /* ... rest of existing thank-you styles ... */
            }

            .thank-you-div {
                position: relative;
                background-image: 
                    radial-gradient(circle at 50% 50%, rgba(188, 120, 122, 0.1) 0%, transparent 50%),
                    linear-gradient(to bottom, #ffe6e7, #ffd6d9);
                background-size: 30px 30px, 100% 100%;
            }
        `;
        document.head.appendChild(style);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const contactCircle = document.querySelector('.contact-circle');
    
    if (contactCircle) {
        contactCircle.addEventListener('click', () => {
            // Replace with your actual Gmail address
            window.location.href = 'john.doe@gmail.com';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Add click event handler for career counselling button
    const careerButton = document.querySelector('.career-button');
    if (careerButton) {
        careerButton.addEventListener('click', () => {
            window.location.href = './pages/career.html';
        });
    }
});

// Career Test Handler
document.addEventListener('DOMContentLoaded', () => {
    // Only run this code if we're on the career test page
    if (!document.querySelector('.career-test-form')) return;

    let currentPage = 1;
    const totalPages = 5;

    function updatePage(newPage) {
        // Hide all pages
        document.querySelectorAll('.question-page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show current page
        document.querySelector(`[data-page="${newPage}"]`).classList.add('active');
        
        // Update progress steps
        document.querySelectorAll('.step').forEach((step, index) => {
            if (index + 1 <= newPage) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update navigation buttons
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        prevBtn.disabled = newPage === 1;
        if (newPage === totalPages) {
            nextBtn.textContent = 'Submit Test';
            nextBtn.classList.add('submit-btn');
        } else {
            nextBtn.textContent = 'Next Page >';
            nextBtn.classList.remove('submit-btn');
        }
        
        // Update page indicator
        document.querySelector('.page-indicator').textContent = `Page ${newPage} of ${totalPages}`;
    }
    
    // Handle navigation
    document.querySelector('.next-btn').addEventListener('click', () => {
        if (validateCurrentPage()) {
            if (currentPage < totalPages) {
                currentPage++;
                updatePage(currentPage);
            } else {
                submitTest();
            }
        }
    });
    
    document.querySelector('.prev-btn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePage(currentPage);
        }
    });
    
    function validateCurrentPage() {
        const currentQuestions = document.querySelector(`[data-page="${currentPage}"]`)
            .querySelectorAll('.question-item');
        
        let isValid = true;
        currentQuestions.forEach(question => {
            const answered = question.querySelector('input[type="radio"]:checked');
            if (!answered) {
                isValid = false;
                question.classList.add('unanswered');
            } else {
                question.classList.remove('unanswered');
            }
        });
        
        if (!isValid) {
            alert('Please answer all questions before proceeding.');
        }
        return isValid;
    }
    
    function submitTest() {
        const answers = {};
        document.querySelectorAll('.question-item').forEach((question, index) => {
            const answer = question.querySelector('input[type="radio"]:checked').value;
            answers[`q${index + 1}`] = answer;
        });
        
        // Store answers in sessionStorage
        sessionStorage.setItem('careerResults', JSON.stringify(answers));
        
        // Redirect to results page
        window.location.href = 'results.html';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Make sure the first page is visible when the page loads
    document.getElementById('page1').style.display = 'block';
    
    // Initialize progress bar
    document.querySelector('.progress').style.width = '20%';
});

function nextPage() {
    const currentPage = parseInt(document.querySelector('.current-step').textContent);
    const nextPageNum = currentPage + 1;
    
    // Hide current page
    document.getElementById(`page${currentPage}`).style.display = 'none';
    
    // Show next page
    const nextPageElement = document.getElementById(`page${nextPageNum}`);
    if (nextPageElement) {
        nextPageElement.style.display = 'block';
        document.querySelector('.current-step').textContent = nextPageNum;
        document.querySelector('.progress').style.width = `${(nextPageNum/5) * 100}%`;
    }
    
    // Update button text on last page
    if (nextPageNum === 5) {
        document.querySelector('.next-btn').textContent = 'Submit Test';
    }
}

// Add these smooth scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced timeline animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                entry.target.style.transitionDelay = `${entry.target.dataset.delay || 0}ms`;
            }
        });
    }, observerOptions);

    // Observe timeline boxes with staggered delays
    document.querySelectorAll('.timeline-box').forEach((box, index) => {
        box.dataset.delay = index * 200; // Stagger the animations
        observer.observe(box);
    });

    // Enhanced particle effects for hover states
    function createParticle(x, y, parent) {
        const particle = document.createElement('div');
        particle.className = 'hover-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 101, 190, 0.6);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        parent.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 2 + 1;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;

        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${dx * 40}px, ${dy * 40}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).onfinish = () => particle.remove();
    }

    // Add particle effects to interactive elements
    document.querySelectorAll('.plans-button, .career-button, .option').forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (Math.random() < 0.1) { // Throttle particle creation
                createParticle(x, y, element);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Animate stats counting up
    const statsNumbers = document.querySelectorAll('.stats-number');
    statsNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50; // Adjust for animation speed
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            stat.textContent = Math.round(current).toLocaleString() + 
                (stat.textContent.includes('+') ? '+' : '') +
                (stat.textContent.includes('min') ? 'min' : '');
        }, 30);
    });

    // Animate questions appearing
    const questions = document.querySelectorAll('.question-item');
    questions.forEach((question, index) => {
        question.style.animationDelay = `${index * 0.1}s`;
    });

    // Smooth progress bar updates
    function updateProgress(currentPage, totalPages) {
        const progress = document.querySelector('.progress');
        const targetWidth = (currentPage / totalPages) * 100;
        let currentWidth = parseFloat(progress.style.width) || 0;
        
        const animate = () => {
            if (currentWidth < targetWidth) {
                currentWidth += 2;
                progress.style.width = `${currentWidth}%`;
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.curve-container');
    
    // Create particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 4 and 8 pixels
        const size = Math.random() * 4 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position around the button
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;
        
        // Random movement direction
        const tx = (Math.random() - 0.5) * 100;
        const ty = (Math.random() - 0.5) * 100;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        button.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 200);
    
    // 3D hover effect
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const rotateY = (x / rect.width - 0.5) * 20;
        
        button.style.setProperty('--rotateY', `${rotateY}deg`);
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.setProperty('--rotateY', '0deg');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const marquee = document.querySelector('.marquee-container');
    
    // Create particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'marquee-particle';
        
        // Random size
        const size = Math.random() * 6 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;
        
        // Random movement
        const tx = (Math.random() - 0.5) * 50;
        const ty = (Math.random() - 0.5) * 50;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        marquee.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 300);
    
    // Pause marquee on hover
    marquee.addEventListener('mouseenter', () => {
        document.querySelector('.marquee-text').style.animationPlayState = 'paused';
    });
    
    marquee.addEventListener('mouseleave', () => {
        document.querySelector('.marquee-text').style.animationPlayState = 'running';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.option');
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options in the same question
            const questionContainer = this.closest('.question-item');
            questionContainer.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Check the radio input
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
        });
    });
});

function initializeQuestionNavigation() {
    let currentQuestion = 0;
    const questions = document.querySelectorAll('.question-item');
    const totalQuestions = questions.length;
    
    function showQuestion(index) {
        questions.forEach((q, i) => {
            q.style.display = i === index ? 'block' : 'none';
            q.style.opacity = '0';
            if (i === index) {
                setTimeout(() => {
                    q.style.opacity = '1';
                    q.style.transform = 'translateY(0)';
                }, 50);
            }
        });
        
        updateProgress(index);
    }
    
    function updateProgress(index) {
        const progress = ((index + 1) / totalQuestions) * 100;
        document.querySelector('.progress').style.width = `${progress}%`;
        
        // Animate progress number
        const progressText = document.querySelector('.progress-text');
        animateNumber(progressText, progress);
    }
    
    function animateNumber(element, target) {
        const duration = 400;
        const start = parseInt(element.textContent);
        const increment = (target - start) / (duration / 16);
        let current = start;
        
        const animate = () => {
            current += increment;
            element.textContent = `${Math.round(current)}%`;
            
            if (increment > 0 ? current < target : current > target) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    // Initialize first question
    showQuestion(0);
}

document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.question-page');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const steps = document.querySelectorAll('.step');
    let currentPage = 1;

    // Hide all pages except first one on initial load
    pages.forEach((page, index) => {
        if (index !== 0) {
            page.style.display = 'none';
        }
    });

    // Next button handler
    nextBtn.addEventListener('click', function() {
        if (validateCurrentPage()) {
            if (currentPage < pages.length) {
                // Hide current page
                pages[currentPage - 1].style.display = 'none';
                
                // Show next page
                currentPage++;
                pages[currentPage - 1].style.display = 'block';
                
                // Update UI
                updateNavigation();
            } else {
                submitTest();
            }
        }
    });

    // Previous button handler
    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            // Hide current page
            pages[currentPage - 1].style.display = 'none';
            
            // Show previous page
            currentPage--;
            pages[currentPage - 1].style.display = 'block';
            
            // Update UI
            updateNavigation();
        }
    });

    function validateCurrentPage() {
        const currentQuestions = pages[currentPage - 1].querySelectorAll('input[type="radio"]');
        const questionGroups = {};
        
        // Group radio buttons by their name attribute
        currentQuestions.forEach(radio => {
            if (!questionGroups[radio.name]) {
                questionGroups[radio.name] = [];
            }
            questionGroups[radio.name].push(radio);
        });

        // Check if each question group has a selected option
        let isValid = true;
        Object.values(questionGroups).forEach(group => {
            if (!group.some(radio => radio.checked)) {
                isValid = false;
                // Add visual feedback for unanswered questions
                const questionItem = group[0].closest('.question-item');
                questionItem.classList.add('unanswered');
                setTimeout(() => {
                    questionItem.classList.remove('unanswered');
                }, 2000);
            }
        });

        if (!isValid) {
            alert('Please answer all questions before proceeding.');
        }
        return isValid;
    }

    function updateNavigation() {
        // Update progress steps
        steps.forEach((step, index) => {
            if (index + 1 === currentPage) {
                step.classList.add('active');
            } else if (index + 1 < currentPage) {
                step.classList.add('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        // Update buttons
        prevBtn.disabled = currentPage === 1;
        nextBtn.textContent = currentPage === pages.length ? 'Submit Test' : 'Next Page >';
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Add this at the end of your script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Get navigation elements
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const pages = document.querySelectorAll('.question-page');
    const steps = document.querySelectorAll('.step');
    let currentPage = 1;

    // Add navigation buttons if they don't exist
    if (!document.querySelector('.nav-buttons')) {
        const navButtons = document.createElement('div');
        navButtons.className = 'nav-buttons';
        navButtons.innerHTML = `
            <button type="button" class="nav-btn prev-btn" disabled>Previous</button>
            <div class="page-indicator">Page 1 of 5</div>
            <button type="button" class="nav-btn next-btn">Next Page ></button>
        `;
        document.querySelector('.question-container').appendChild(navButtons);
    }

    if (nextBtn) { // Only run if we're on the career test page
        nextBtn.addEventListener('click', function() {
            if (currentPage < 5) {
                // Hide current page
                const currentPageElement = document.querySelector(`.question-page[data-page="${currentPage}"]`);
                if (currentPageElement) {
                    currentPageElement.style.display = 'none';
                    currentPageElement.classList.remove('active');
                }
                
                // Show next page
                currentPage++;
                const nextPageElement = document.querySelector(`.question-page[data-page="${currentPage}"]`);
                if (nextPageElement) {
                    nextPageElement.style.display = 'block';
                    nextPageElement.classList.add('active');
                }
                
                // Update steps
                steps.forEach((step, index) => {
                    if (index + 1 <= currentPage) {
                        step.classList.add('active');
                    } else {
                        step.classList.remove('active');
                    }
                });
                
                // Update buttons
                prevBtn.disabled = false;
                nextBtn.textContent = currentPage === 5 ? 'Submit Test' : 'Next Page >';
                
                // Update page indicator
                document.querySelector('.page-indicator').textContent = `Page ${currentPage} of 5`;
            }
        });

        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                // Hide current page
                const currentPageElement = document.querySelector(`.question-page[data-page="${currentPage}"]`);
                if (currentPageElement) {
                    currentPageElement.style.display = 'none';
                    currentPageElement.classList.remove('active');
                }
                
                // Show previous page
                currentPage--;
                const prevPageElement = document.querySelector(`.question-page[data-page="${currentPage}"]`);
                if (prevPageElement) {
                    prevPageElement.style.display = 'block';
                    prevPageElement.classList.add('active');
                }
                
                // Update steps
                steps.forEach((step, index) => {
                    if (index + 1 <= currentPage) {
                        step.classList.add('active');
                    } else {
                        step.classList.remove('active');
                    }
                });
                
                // Update buttons
                prevBtn.disabled = currentPage === 1;
                nextBtn.textContent = 'Next Page >';
                
                // Update page indicator
                document.querySelector('.page-indicator').textContent = `Page ${currentPage} of 5`;
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const steps = document.querySelectorAll('.step');
    const pageIndicator = document.querySelector('.page-indicator');
    let currentPage = 1;

    function updatePage(pageNumber) {
        // Hide all pages
        document.querySelectorAll('.question-page').forEach(page => {
            page.style.display = 'none';
        });

        // Show current page
        const currentPageElement = document.querySelector(`[data-page="${pageNumber}"]`);
        if (currentPageElement) {
            currentPageElement.style.display = 'block';
        }

        // Update steps
        steps.forEach((step, index) => {
            if (index + 1 <= pageNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update buttons
        prevBtn.disabled = pageNumber === 1;
        nextBtn.textContent = pageNumber === 5 ? 'Submit Test' : 'Next Page >';
        
        // Update page indicator
        pageIndicator.textContent = `Page ${pageNumber} of 5`;
    }

    nextBtn.addEventListener('click', function() {
        if (currentPage < 5) {
            currentPage++;
            updatePage(currentPage);
        }
    });

    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updatePage(currentPage);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('career-test');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const steps = document.querySelectorAll('.step');
    let currentPage = 1;

    // Define questions for pages 2-5
    const pages = {
        2: {
            title: "Business & Leadership",
            questions: [
                "Lead and manage business teams",
                "Develop marketing strategies",
                "Analyze financial data and create reports",
                "Create and execute business plans",
                "Negotiate contracts and partnerships",
                "Manage project timelines and resources",
                "Present to stakeholders and clients",
                "Solve complex organizational problems",
                "Develop business growth strategies",
                "Manage budgets and financial planning"
            ]
        },
        3: {
            title: "Creative & Design",
            questions: [
                "Design visual content and graphics",
                "Create artistic compositions and artwork",
                "Write creative content and stories",
                "Edit videos and create animations",
                "Develop brand identities and logos",
                "Plan and execute creative campaigns",
                "Style and direct photoshoots",
                "Create user experiences and interfaces",
                "Design physical or digital products",
                "Develop creative concepts and ideas"
            ]
        },
        4: {
            title: "Social & Communication",
            questions: [
                "Counsel and support individuals",
                "Teach and train groups or teams",
                "Mediate conflicts and negotiations",
                "Write professional communications",
                "Present to large audiences",
                "Build and maintain relationships",
                "Lead community programs and events",
                "Provide customer service solutions",
                "Facilitate group discussions",
                "Develop training programs"
            ]
        },
        5: {
            title: "Research & Analysis",
            questions: [
                "Conduct research studies and surveys",
                "Analyze complex data sets",
                "Write technical reports and papers",
                "Solve analytical problems",
                "Design and conduct experiments",
                "Review scientific literature",
                "Document research findings",
                "Present research results",
                "Develop research methodologies",
                "Analyze statistical data"
            ]
        }
    };

    // Function to create a new page
    function createPage(pageNum, pageData) {
        const page = document.createElement('div');
        page.className = 'question-page';
        page.setAttribute('data-page', pageNum);
        page.style.display = 'none';

        page.innerHTML = `
            <div class="question-container">
                <div class="question-header">
                    <h2>${pageData.title}</h2>
                    <p class="instruction">Rate your interest in each activity:</p>
                </div>
                <div class="questions-list">
                    ${pageData.questions.map((question, index) => `
                        <div class="question-item">
                            <div class="question-text">${(pageNum-1)*10 + index + 1}. ${question}</div>
                            <div class="options">
                                <label class="option">
                                    <input type="radio" name="q${(pageNum-1)*10 + index + 1}" value="dislike" required>
                                    <span class="option-text">Dislike</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="q${(pageNum-1)*10 + index + 1}" value="neutral">
                                    <span class="option-text">Neutral</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="q${(pageNum-1)*10 + index + 1}" value="like">
                                    <span class="option-text">Like</span>
                                </label>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        return page;
    }

    // Add pages 2-5 to the form
    Object.entries(pages).forEach(([pageNum, pageData]) => {
        const newPage = createPage(pageNum, pageData);
        form.insertBefore(newPage, form.querySelector('.nav-buttons'));
    });

    // Validate current page
    function validateCurrentPage() {
        const currentPageElement = document.querySelector(`.question-page[data-page="${currentPage}"]`);
        const questions = currentPageElement.querySelectorAll('.question-item');
        let isValid = true;

        questions.forEach(question => {
            const answered = question.querySelector('input[type="radio"]:checked');
            if (!answered) {
                isValid = false;
                question.classList.add('unanswered');
                setTimeout(() => {
                    question.classList.remove('unanswered');
                }, 2000);
            }
        });

        if (!isValid) {
            alert('Please answer all questions before proceeding.');
        }
        return isValid;
    }

    // Navigation event listeners
    nextBtn.addEventListener('click', function() {
        if (validateCurrentPage()) {
            if (currentPage < 5) {
                // Hide current page
                document.querySelector(`.question-page[data-page="${currentPage}"]`).style.display = 'none';
                
                // Show next page
                currentPage++;
                document.querySelector(`.question-page[data-page="${currentPage}"]`).style.display = 'block';
                
                // Update UI
                steps.forEach((step, index) => {
                    if (index + 1 <= currentPage) {
                        step.classList.add('active');
                    }
                });
                
                prevBtn.disabled = false;
                nextBtn.textContent = currentPage === 5 ? 'Submit Test' : 'Next Step >';
                document.querySelector('.step-label').textContent = `Step ${currentPage} of 5`;
            } else {
                // Handle test submission
                form.submit();
            }
        }
    });

    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            // Hide current page
            document.querySelector(`.question-page[data-page="${currentPage}"]`).style.display = 'none';
            
            // Show previous page
            currentPage--;
            document.querySelector(`.question-page[data-page="${currentPage}"]`).style.display = 'block';
            
            // Update UI
            steps.forEach((step, index) => {
                if (index + 1 > currentPage) {
                    step.classList.remove('active');
                }
            });
            
            prevBtn.disabled = currentPage === 1;
            nextBtn.textContent = 'Next Step >';
            document.querySelector('.step-label').textContent = `Step ${currentPage} of 5`;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.career-test-form');
    if (!form) return; // Only run on career test page
    
    const pages = document.querySelectorAll('.question-page');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const steps = document.querySelectorAll('.step');
    const pageIndicator = document.querySelector('.page-indicator');
    let currentPage = 1;
    
    // Show initial page
    showPage(currentPage);
    
    // Handle next button click
    nextBtn.addEventListener('click', () => {
        if (validateCurrentPage()) {
            if (currentPage < pages.length) {
                hidePage(currentPage);
                currentPage++;
                showPage(currentPage);
                updateUI();
            }
        }
    });
    
    // Handle previous button click
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            hidePage(currentPage);
            currentPage--;
            showPage(currentPage);
            updateUI();
        }
    });
    
    function showPage(pageNum) {
        const page = document.querySelector(`[data-page="${pageNum}"]`);
        if (page) {
            page.style.display = 'block';
            page.classList.add('active');
        }
    }
    
    function hidePage(pageNum) {
        const page = document.querySelector(`[data-page="${pageNum}"]`);
        if (page) {
            page.style.display = 'none';
            page.classList.remove('active');
        }
    }
    
    function updateUI() {
        // Update progress steps
        steps.forEach((step, index) => {
            if (index + 1 <= currentPage) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update navigation buttons
        prevBtn.disabled = currentPage === 1;
        nextBtn.textContent = currentPage === pages.length ? 'Submit Test' : 'Next Page >';
        
        // Update page indicator
        pageIndicator.textContent = `Page ${currentPage} of ${pages.length}`;
    }
    
    function validateCurrentPage() {
        const currentPageElement = document.querySelector(`[data-page="${currentPage}"]`);
        const questions = currentPageElement.querySelectorAll('.question-item');
        let isValid = true;

        questions.forEach(question => {
            const answered = question.querySelector('input[type="radio"]:checked');
            if (!answered) {
                isValid = false;
                question.classList.add('unanswered');
                setTimeout(() => {
                    question.classList.remove('unanswered');
                }, 2000);
            }
        });

        if (!isValid) {
            alert('Please answer all questions before proceeding.');
        }
        return isValid;
    }
});

// Add this new event listener for career test navigation
document.addEventListener('DOMContentLoaded', function() {
    // Only run this code if we're on the career test page
    const careerForm = document.querySelector('.career-test-form');
    if (!careerForm) return;

    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentPage = 1;

    // Show only first page initially
    showPage(1);

    nextBtn?.addEventListener('click', function() {
        console.log('Next clicked, current page:', currentPage); // Debug
        // Hide current page
        const currentPageEl = document.querySelector(`[data-page="${currentPage}"]`);
        if (currentPageEl) {
            currentPageEl.style.display = 'none';
        }
        
        // Show next page
        currentPage++;
        showPage(currentPage);
        
        // Update buttons
        if (prevBtn) prevBtn.disabled = false;
        if (currentPage === 5) {
            nextBtn.textContent = 'Submit Test';
        }
    });

    prevBtn?.addEventListener('click', function() {
        console.log('Previous clicked, current page:', currentPage); // Debug
        // Hide current page
        const currentPageEl = document.querySelector(`[data-page="${currentPage}"]`);
        if (currentPageEl) {
            currentPageEl.style.display = 'none';
        }
        
        // Show previous page
        currentPage--;
        showPage(currentPage);
        
        // Update buttons
        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.textContent = 'Next Page >';
    });

    function showPage(pageNum) {
        console.log('Showing page:', pageNum); // Debug
        const page = document.querySelector(`[data-page="${pageNum}"]`);
        if (page) {
            page.style.display = 'block';
            const indicator = document.querySelector('.page-indicator');
            if (indicator) {
                indicator.textContent = `Page ${pageNum} of 5`;
            }
        }
    }
});

