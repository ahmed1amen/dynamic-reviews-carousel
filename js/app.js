/**
 * Main Application Module
 * Coordinates the reviews carousel functionality
 */

class ReviewsApp {
    constructor() {
        this.config = new Config();
        this.carousel = new ReviewsCarousel();
        
        // DOM elements
        this.loadingElement = document.getElementById('loading');
        this.errorElement = document.getElementById('error');
        this.carouselElement = document.getElementById('reviews-carousel');
        this.configModal = document.getElementById('config-modal');
        this.retryBtn = document.getElementById('retry-btn');
        
        // Modal elements
        this.apiKeyInput = document.getElementById('api-key');
        this.placeIdInput = document.getElementById('place-id');
        this.saveConfigBtn = document.getElementById('save-config');
        this.demoModeBtn = document.getElementById('demo-mode');
        this.closeModalBtn = document.getElementById('close-modal');
        
        this.initializeEventListeners();
        this.checkConfiguration();
    }

    /**
     * Initialize event listeners
     */
    initializeEventListeners() {
        // Retry button
        this.retryBtn.addEventListener('click', () => {
            this.loadReviews();
        });
        
        // Modal controls
        this.saveConfigBtn.addEventListener('click', () => {
            this.saveConfiguration();
        });
        
        this.demoModeBtn.addEventListener('click', () => {
            this.loadDemoData();
        });
        
        this.closeModalBtn.addEventListener('click', () => {
            this.closeModal();
        });
        
        // Close modal on backdrop click
        this.configModal.addEventListener('click', (e) => {
            if (e.target === this.configModal) {
                this.closeModal();
            }
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.configModal.classList.contains('hidden')) {
                this.closeModal();
            }
        });
    }

    /**
     * Check if configuration exists and is valid
     */
    checkConfiguration() {
        // Always show the config modal since we don't store credentials
        this.showConfigModal();
    }

    /**
     * Show configuration modal
     */
    showConfigModal() {
        // Clear any previous values
        this.apiKeyInput.value = '';
        this.placeIdInput.value = '';
        this.configModal.classList.remove('hidden');
        this.apiKeyInput.focus();
    }

    /**
     * Close configuration modal
     */
    closeModal() {
        this.configModal.classList.add('hidden');
    }

    /**
     * Save configuration from modal inputs
     */
    saveConfiguration() {
        const apiKey = this.apiKeyInput.value.trim();
        const placeId = this.placeIdInput.value.trim();
        
        if (!apiKey || !placeId) {
            alert('Please enter both API key and Place ID.');
            return;
        }
        
        this.config.setCredentials(apiKey, placeId);
        this.closeModal();
        
        // Load Google Maps script with the API key
        this.loadGoogleMapsScript(apiKey);
    }

    /**
     * Load Google Maps JavaScript API with the provided API key
     * @param {string} apiKey - Google Maps API key
     */
    loadGoogleMapsScript(apiKey) {
        // Check if Google Maps is already loaded
        if (window.google && window.google.maps) {
            this.loadReviews();
            return;
        }

        this.showLoading();

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGooglePlaces`;
        script.async = true;
        script.defer = true;
        
        script.onerror = () => {
            console.error('Failed to load Google Maps API');
            this.showError('Failed to load Google Maps API. Please check your API key and ensure the Google Maps JavaScript API is enabled in your Google Cloud Console.');
        };

        // Listen for Google Maps API errors
        window.gm_authFailure = () => {
            console.error('Google Maps API authentication failed');
            this.showError('Google Maps API authentication failed. Please check your API key and ensure the Google Maps JavaScript API and Places API are enabled in your Google Cloud Console.');
        };

        document.head.appendChild(script);
    }

    /**
     * Load demo data
     */
    loadDemoData() {
        this.closeModal();
        this.showLoading();
        
        // Simulate API delay
        setTimeout(() => {
            const demoData = this.config.getDemoData();
            this.handleReviewsData(demoData);
        }, 1000);
    }

    /**
     * Load reviews from Google Places API
     */
    async loadReviews() {
        if (!this.config.isValid()) {
            this.showConfigModal();
            return;
        }
        
        this.showLoading();
        
        try {
            const reviews = await this.fetchReviews();
            this.handleReviewsData(reviews);
        } catch (error) {
            console.error('Error loading reviews:', error);
            this.showError();
        }
    }

    /**
     * Fetch reviews from Google Places API using JavaScript SDK
     * @returns {Promise<Object>} - Reviews data
     */
    async fetchReviews() {
        return new Promise((resolve, reject) => {
            if (!window.google || !window.google.maps || !window.google.maps.places) {
                console.warn('Google Places API not loaded, using demo data');
                resolve(this.config.getDemoData());
                return;
            }

            const service = new google.maps.places.PlacesService(
                document.createElement('div')
            );
            
            const request = {
                placeId: this.config.placeId,
                fields: ['reviews', 'name', 'rating', 'user_ratings_total']
            };

            service.getDetails(request, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                    const data = {
                        result: {
                            name: place.name,
                            rating: place.rating,
                            user_ratings_total: place.user_ratings_total,
                            reviews: place.reviews || []
                        },
                        status: 'OK'
                    };
                    resolve(data);
                } else {
                    console.warn('Google Places API request failed:', status);
                    console.warn('Using demo data instead');
                    resolve(this.config.getDemoData());
                }
            });
        });
    }

    /**
     * Handle reviews data from API
     * @param {Object} data - Reviews data from API
     */
    handleReviewsData(data) {
        if (data && data.result && data.result.reviews && data.result.reviews.length > 0) {
            this.carousel.setReviews(data.result.reviews);
            this.showCarousel();
        } else {
            this.showError('No reviews found for this place.');
        }
    }

    /**
     * Show loading state
     */
    showLoading() {
        this.hideAllStates();
        this.loadingElement.classList.remove('hidden');
    }

    /**
     * Show error state
     * @param {string} message - Optional error message
     */
    showError(message = null) {
        this.hideAllStates();
        this.errorElement.classList.remove('hidden');
        
        if (message) {
            const errorText = this.errorElement.querySelector('p');
            errorText.textContent = message;
        }
    }

    /**
     * Show carousel
     */
    showCarousel() {
        this.hideAllStates();
        this.carouselElement.classList.remove('hidden');
    }

    /**
     * Hide all state elements
     */
    hideAllStates() {
        this.loadingElement.classList.add('hidden');
        this.errorElement.classList.add('hidden');
        this.carouselElement.classList.add('hidden');
    }

    /**
     * Reset application state
     */
    reset() {
        this.carousel.clear();
        this.config.clear();
        this.hideAllStates();
        this.showConfigModal();
    }

    /**
     * Get application statistics
     * @returns {Object} - Application statistics
     */
    getStats() {
        return {
            totalReviews: this.carousel.reviews.length,
            currentPage: this.carousel.getCurrentPage() + 1,
            totalPages: this.carousel.getTotalPages(),
            reviewsPerPage: this.carousel.reviewsPerPage,
            hasValidConfig: this.config.isValid()
        };
    }
}

/**
 * Global callback for Google Places API initialization
 */
window.initGooglePlaces = function() {
    console.log('Google Places API loaded successfully');
    // If the app is already initialized, trigger loading reviews
    if (window.reviewsApp && window.reviewsApp.config.isValid()) {
        window.reviewsApp.loadReviews();
    }
};

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the reviews application
    const app = new ReviewsApp();
    
    // Make app available globally for debugging
    window.reviewsApp = app;
    
    // Add some helpful console methods for development
    console.log('Reviews Carousel App initialized!');
    console.log('Available methods:');
    console.log('- reviewsApp.reset() - Reset the application');
    console.log('- reviewsApp.getStats() - Get application statistics');
    console.log('- reviewsApp.loadDemoData() - Load demo reviews');
});

/**
 * Service Worker registration for offline functionality (optional)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(registrationError => {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}
