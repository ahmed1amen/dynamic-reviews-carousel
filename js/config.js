/**
 * Configuration module for Google Places API
 * Handles API key and Place ID management (in-memory only)
 */

class Config {
    constructor() {
        this.apiKey = '';
        this.placeId = '';
    }

    /**
     * Set API credentials
     * @param {string} apiKey - Google Places API key
     * @param {string} placeId - Google Place ID
     */
    setCredentials(apiKey, placeId) {
        this.apiKey = apiKey;
        this.placeId = placeId;
    }

    /**
     * Check if configuration is valid
     * @returns {boolean} - True if both API key and Place ID are set
     */
    isValid() {
        return this.apiKey.length > 0 && this.placeId.length > 0;
    }

    /**
     * Get demo reviews data for testing purposes
     * @returns {Object} - Mock reviews data in Google Places API format
     */
    getDemoData() {
        return {
            result: {
                reviews: [
                    {
                        author_name: "John D.",
                        author_url: "",
                        profile_photo_url: "",
                        rating: 5,
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
                        time: 1703097600
                    },
                    {
                        author_name: "Maria G.",
                        author_url: "",
                        profile_photo_url: "",
                        rating: 5,
                        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
                        time: 1700419200
                    },
                    {
                        author_name: "Alex P.",
                        author_url: "",
                        profile_photo_url: "",
                        rating: 5,
                        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
                        time: 1705689600
                    },
                    {
                        author_name: "Emily R.",
                        author_url: "",
                        profile_photo_url: "",
                        rating: 5,
                        text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.",
                        time: 1707868800
                    },
                    {
                        author_name: "Thomas W.",
                        author_url: "",
                        profile_photo_url: "",
                        rating: 5,
                        text: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
                        time: 1708473600
                    },
                    {
                        author_name: "Lisa C.",
                        author_url: "",
                        profile_photo_url: "",
                        rating: 4,
                        text: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
                        time: 1707264000
                    },
                    {
                        author_name: "Robert H.",
                        author_url: "",
                        profile_photo_url: "",
                        rating: 5,
                        text: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.",
                        time: 1708819200
                    },
                    {
                        author_name: "Sophie L.",
                        author_url: "",
                        profile_photo_url: "",
                        rating: 5,
                        text: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores.",
                        time: 1705689600
                    }
                ]
            }
        };
    }

    /**
     * Clear configuration
     */
    clear() {
        this.apiKey = '';
        this.placeId = '';
    }
}

// Make Config available globally
window.Config = Config;
