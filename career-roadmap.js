document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const checkScroll = () => {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.8;
            
            if (itemTop < triggerBottom) {
                item.classList.add('show');
            }
        });
    };
    
    // Check items on load
    checkScroll();
    
    // Check items on scroll
    window.addEventListener('scroll', checkScroll);
});
