/**
 * Reviews Carousel Module
 * Handles the display and navigation of reviews
 */

class ReviewsCarousel {
    constructor() {
        this.reviews = [];
        this.currentPage = 0;
        this.reviewsPerPage = this.getReviewsPerPage();
        this.totalPages = 0;
        
        // DOM elements
        this.reviewsGrid = document.getElementById('reviews-grid');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.pageIndicator = document.getElementById('page-indicator');
        this.dotsContainer = document.getElementById('dots-container');
        
        // Bind methods
        this.handleResize = this.handleResize.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        
        this.initializeEventListeners();
    }

    /**
     * Initialize event listeners
     */
    initializeEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', this.prevPage);
        this.nextBtn.addEventListener('click', this.nextPage);
        
        // Window resize handler
        window.addEventListener('resize', this.handleResize);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevPage();
            } else if (e.key === 'ArrowRight') {
                this.nextPage();
            }
        });
    }

    /**
     * Get number of reviews per page based on screen size
     * @returns {number} - Number of reviews to show per page
     */
    getReviewsPerPage() {
        const width = window.innerWidth;
        
        // Desktop: 4 reviews side by side
        if (width >= 1200) {
            return 4;
        }
        // Large tablet/small desktop: 4 reviews
        else if (width >= 992) {
            return 4;
        }
        // Tablet: 3 reviews
        else if (width >= 768) {
            return 3;
        }
        // Mobile large: 2 reviews (can be side by side or stacked based on CSS)
        else if (width >= 576) {
            return 2;
        }
        // Mobile small: 2 reviews (stacked vertically as per requirement)
        else {
            return 2; // Changed from 1 to 2 for mobile vertical stack
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        const newReviewsPerPage = this.getReviewsPerPage();
        
        if (newReviewsPerPage !== this.reviewsPerPage) {
            this.reviewsPerPage = newReviewsPerPage;
            this.calculateTotalPages();
            this.adjustCurrentPage();
            this.updateDisplay();
        }
    }

    /**
     * Set reviews data
     * @param {Array} reviews - Array of review objects
     */
    setReviews(reviews) {
        this.reviews = reviews;
        this.currentPage = 0;
        this.calculateTotalPages();
        this.render();
        this.updateNavigation();
        this.createDots();
    }

    /**
     * Calculate total number of pages
     */
    calculateTotalPages() {
        this.totalPages = Math.ceil(this.reviews.length / this.reviewsPerPage);
    }

    /**
     * Adjust current page when reviews per page changes
     */
    adjustCurrentPage() {
        if (this.currentPage >= this.totalPages) {
            this.currentPage = Math.max(0, this.totalPages - 1);
        }
    }

    /**
     * Render all reviews in the grid
     */
    render() {
        this.reviewsGrid.innerHTML = '';
        
        this.reviews.forEach((review, index) => {
            const reviewCard = this.createReviewCard(review);
            this.reviewsGrid.appendChild(reviewCard);
        });
        
        this.updateDisplay();
    }

    /**
     * Update the display of visible reviews
     */
    updateDisplay() {
        const startIndex = this.currentPage * this.reviewsPerPage;
        const endIndex = startIndex + this.reviewsPerPage;
        
        // Hide all reviews
        Array.from(this.reviewsGrid.children).forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        
        this.updateNavigation();
        this.updateDots();
    }

    /**
     * Create a review card element
     * @param {Object} review - Review data object
     * @returns {HTMLElement} - Review card element
     */
    createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'review-card';
        
        const initials = this.getInitials(review.author_name);
        const stars = this.generateStars(review.rating);
        
        card.innerHTML = `
            <div class="review-header">
                <div class="reviewer-avatar">
                    ${review.profile_photo_url ? 
                        `<img src="${review.profile_photo_url}" alt="${review.author_name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">` : 
                        initials
                    }
                </div>
            </div>
            <div class="reviewer-info">
                <div class="reviewer-name">${this.escapeHtml(review.author_name)}</div>
                <div class="review-rating">
                    ${stars}
                </div>
            </div>
            <div class="review-text">
                ${this.escapeHtml(review.text)}
            </div>
        `;
        
        return card;
    }

    /**
     * Get initials from a name
     * @param {string} name - Full name
     * @returns {string} - Initials
     */
    getInitials(name) {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .slice(0, 2)
            .join('');
    }

    /**
     * Generate star rating HTML
     * @param {number} rating - Rating value (1-5)
     * @returns {string} - HTML string for single star with rating
     */
    generateStars(rating) {
        return `<svg class="star filled" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <span class="rating-number">${rating.toFixed(1)}</span>`;
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} - Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Update navigation buttons and page indicator
     */
    updateNavigation() {
        // Update navigation buttons
        this.prevBtn.disabled = this.currentPage === 0;
        this.nextBtn.disabled = this.currentPage === this.totalPages - 1;
        
        // Update page indicator
        this.pageIndicator.textContent = `${this.currentPage + 1} / ${this.totalPages}`;
    }

    /**
     * Create navigation dots
     */
    createDots() {
        this.dotsContainer.innerHTML = '';
        
        for (let i = 0; i < this.totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => this.goToPage(i));
            this.dotsContainer.appendChild(dot);
        }
        
        this.updateDots();
    }

    /**
     * Update navigation dots
     */
    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentPage);
        });
    }

    /**
     * Go to specific page
     * @param {number} pageIndex - Page index to navigate to
     */
    goToPage(pageIndex) {
        if (pageIndex >= 0 && pageIndex < this.totalPages) {
            this.currentPage = pageIndex;
            this.updateDisplay();
        }
    }

    /**
     * Go to next page
     */
    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.updateDisplay();
        }
    }

    /**
     * Go to previous page
     */
    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.updateDisplay();
        }
    }

    /**
     * Get current page
     * @returns {number} - Current page index
     */
    getCurrentPage() {
        return this.currentPage;
    }

    /**
     * Get total pages
     * @returns {number} - Total number of pages
     */
    getTotalPages() {
        return this.totalPages;
    }

    /**
     * Clear carousel
     */
    clear() {
        this.reviews = [];
        this.currentPage = 0;
        this.totalPages = 0;
        this.reviewsGrid.innerHTML = '';
        this.dotsContainer.innerHTML = '';
        this.updateNavigation();
    }
}

// Make ReviewsCarousel available globally
window.ReviewsCarousel = ReviewsCarousel;
