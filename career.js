document.addEventListener('DOMContentLoaded', function() {
    console.log('Form:', document.getElementById('careerForm'));
    console.log('Next button:', document.querySelector('.next-btn'));
    console.log('Prev button:', document.querySelector('.prev-btn'));
    console.log('All pages:', document.querySelectorAll('.questions-container'));
    
    // Debug: Log initial state
    console.log('DOM Content Loaded');
    
    const form = document.getElementById('careerForm');
    if (!form) {
        console.error('Career form not found!');
        return;
    }
    
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    if (!nextBtn || !prevBtn) {
        console.error('Navigation buttons not found!');
        return;
    }

    let currentPage = 1;
    const totalPages = 5;

    // Debug: Log all pages
    const allPages = document.querySelectorAll('.questions-container');
    console.log('Total pages found:', allPages.length);
    allPages.forEach(page => {
        console.log('Page:', page.getAttribute('data-page'), 'Display:', page.style.display);
    });

    function showPage(pageNumber) {
        console.log('Attempting to show page:', pageNumber);
        
        // Hide all pages first
        allPages.forEach(page => {
            page.style.display = 'none';
            console.log('Hiding page:', page.getAttribute('data-page'));
        });

        // Show the target page
        const targetPage = document.querySelector(`.questions-container[data-page="${pageNumber}"]`);
        if (targetPage) {
            targetPage.style.display = 'block';
            console.log('Showing page:', pageNumber);
        } else {
            console.error('Target page not found:', pageNumber);
        }

        // Update UI elements
        updateUI(pageNumber);
    }

    function updateUI(pageNumber) {
        // Update buttons state
        prevBtn.disabled = pageNumber === 1;
        nextBtn.textContent = pageNumber === totalPages ? 'Submit Test' : 'Next Page >';

        // Update page indicator
        const indicator = document.querySelector('.page-indicator');
        if (indicator) {
            indicator.textContent = `Page ${pageNumber} of ${totalPages}`;
        }

        // Update progress bar if it exists
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            const progress = ((pageNumber - 1) / (totalPages - 1)) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        console.log('Next button clicked. Current page:', currentPage);
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    prevBtn.addEventListener('click', () => {
        console.log('Previous button clicked. Current page:', currentPage);
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    // Initialize the first page
    console.log('Initializing first page');
    showPage(1);
});
