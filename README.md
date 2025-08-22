# Dynamic Reviews Carousel

A responsive, interactive reviews carousel that displays customer testimonials from Google Places API with a clean, modern design. Perfect for showcasing customer feedback on your website.

## 🌟 Features

- **Responsive Design**: Adapts to all screen sizes (mobile, tablet, desktop)
- **Google Places Integration**: Fetches real reviews from Google Places API
- **Demo Mode**: Includes sample data for testing without API setup
- **Interactive Navigation**: Arrow buttons, dot indicators, and keyboard navigation
- **Modern UI**: Clean design with smooth animations and transitions
- **Loading States**: Proper loading and error state handling
- **No External Dependencies**: Built with vanilla JavaScript, HTML, and CSS

## 🚀 Live Demo

Visit the live demo: [Dynamic Reviews Carousel](https://ahmed1amen.github.io/dynamic-reviews-carousel/)

## 📱 Responsive Layout

- **Desktop (1200px+)**: 4 reviews per page in a grid
- **Large Tablet (992px+)**: 4 reviews per page
- **Tablet (768px+)**: 3 reviews per page
- **Mobile Large (576px+)**: 2 reviews per page
- **Mobile Small (<576px)**: 2 reviews per page (stacked vertically)

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ahmed1amen/dynamic-reviews-carousel.git
   cd dynamic-reviews-carousel
   ```

2. **Open in your web server** or simply open `index.html` in your browser.

3. **For GitHub Pages deployment**: The project is already configured with relative paths and ready to deploy.

## ⚙️ Configuration

### Option 1: Use Demo Data
Click "Use Demo Data" to see the carousel in action with sample reviews.

### Option 2: Connect to Google Places API

1. **Get a Google Places API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google Places API and Google Maps JavaScript API
   - Create credentials (API key)

2. **Find your Place ID**:
   - Use the [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
   - Search for your business and copy the Place ID

3. **Configure the application**:
   - Open the application in your browser
   - Enter your API key and Place ID in the configuration modal
   - Click "Save & Load Reviews"

## 📁 Project Structure

```
dynamic-reviews-carousel/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles and responsive design
├── js/
│   ├── app.js          # Main application logic
│   ├── carousel.js     # Carousel functionality
│   └── config.js       # Configuration and demo data
└── README.md           # This file
```

## 🎨 Customization

### Colors and Styling
Edit `css/styles.css` to customize:
- Color scheme (CSS custom properties at the top)
- Fonts and typography
- Card styles and spacing
- Animation timing

### Reviews Per Page
Modify the `getReviewsPerPage()` method in `js/carousel.js` to change how many reviews display at different screen sizes.

### Demo Data
Update the demo reviews in `js/config.js` in the `getDemoData()` method.

## 🔧 API Integration

The carousel uses the Google Places API to fetch reviews. Key features:

- **Fallback to Demo Data**: If API fails, automatically shows demo data
- **Error Handling**: Proper error states with retry functionality
- **Security**: API keys are not stored locally (enter each session)

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## 📊 Features Breakdown

### Navigation
- **Arrow Buttons**: Previous/Next navigation
- **Dot Indicators**: Jump to any page directly
- **Keyboard Support**: Arrow keys for navigation
- **Page Indicator**: Shows current page (e.g., "1 / 3")

### Responsive Behavior
- **Automatic Adjustment**: Reviews per page change based on screen size
- **Touch Friendly**: Large touch targets for mobile devices
- **Fluid Layout**: Smooth transitions between breakpoints

### Data Handling
- **Google Places API**: Live reviews from your business
- **Demo Mode**: 8 sample reviews for testing
- **Error Recovery**: Graceful fallback when API unavailable

## 🔒 Security Notes

- API keys are handled in-memory only (not stored)
- HTML content is escaped to prevent XSS attacks
- No external dependencies reduce security surface

## 🚀 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Other Hosting
Upload all files to your web server. No special configuration needed.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Check the demo for expected behavior
- Verify Google Places API setup if using real data

## 🙏 Acknowledgments

- Built with vanilla JavaScript for maximum compatibility
- Designed with accessibility and performance in mind
- Inspired by modern web design patterns
