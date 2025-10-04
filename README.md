# Smith Brothers Construction Website

A modern, rustic construction company website featuring Charles Smith, William Smith, Michael Smith, and accountant Bret Ulibarri.

## Features

- **4 Pages:**
  - Homepage with hero section and services
  - About Us page with company story and values
  - Meet The Team page with detailed team profiles
  - Get A Quote page with intelligent quote calculator

- **Smart Quote System:**
  - Automatic rough estimate calculation based on project type and size
  - Supports 11 different project types
  - Multiple size options with square footage input
  - Email notifications via Resend API

- **Modern Design:**
  - Rustic construction theme with wood-inspired color palette
  - Smooth animations and scroll effects
  - Fully responsive for mobile, tablet, and desktop
  - Professional typography and spacing

- **SEO Optimized:**
  - Meta tags on all pages
  - Schema.org structured data for business and team
  - XML sitemap
  - robots.txt
  - Semantic HTML5
  - Fast loading times

## Project Structure

```
New_Website/
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js
│   │   └── quote.js
│   ├── images/
│   │   ├── team/
│   │   │   ├── charles-smith.jpg
│   │   │   ├── william-smith.jpg
│   │   │   ├── michael-smith.jpg
│   │   │   └── bret-ulibarri.jpg
│   │   └── README.md
│   ├── index.html
│   ├── about.html
│   ├── team.html
│   ├── quote.html
│   ├── sitemap.xml
│   └── robots.txt
├── server.js
├── package.json
├── .env.example
└── README.md
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Add your Resend API key:
   ```
   RESEND_API_KEY=your_resend_api_key_here
   ADMIN_EMAIL=your_email@example.com
   PORT=3000
   ```

3. **Get a Resend API Key:**
   - Sign up at https://resend.com
   - Create an API key
   - Add it to your `.env` file

4. **Add team photos:**
   - Add professional headshots to `public/images/team/`
   - See `public/images/README.md` for image requirements
   - Website will show placeholder initials if photos aren't available

## Running the Website

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The website will be available at `http://localhost:3000`

## Quote System

The quote calculator provides rough estimates based on:

- **Project Type:** Different base rates per square foot
  - New Construction: $150/sqft
  - Full Renovation: $100/sqft
  - Home Addition: $120/sqft
  - Kitchen Remodel: $85/sqft
  - Bathroom Remodel: $75/sqft
  - And more...

- **Project Size:** Multiplier based on scale
  - Small (< 500 sqft): 1x
  - Medium (500-1500 sqft): 1.5x
  - Large (1500-3000 sqft): 2.5x
  - Extra Large (3000+ sqft): 4x

Formula: `Base Rate × Square Footage × Size Multiplier = Rough Estimate`

## Email Notifications

When a quote is submitted:
1. **Admin receives:** Full quote details with client info and estimate
2. **Client receives:** Confirmation email with their estimate
3. Both emails are professionally formatted HTML

## Technologies Used

- **Frontend:**
  - HTML5
  - CSS3 (Custom properties, Grid, Flexbox, Animations)
  - Vanilla JavaScript (ES6+)

- **Backend:**
  - Node.js
  - Express.js
  - Resend API for email

- **SEO:**
  - Schema.org markup
  - Open Graph tags
  - XML Sitemap
  - Semantic HTML

## Customization

### Changing Colors

Edit CSS variables in `public/css/styles.css`:
```css
:root {
    --primary-color: #8B4513;
    --secondary-color: #D2691E;
    --accent-color: #CD853F;
    /* etc... */
}
```

### Updating Quote Rates

Edit the `data-rate` attributes in `public/quote.html`:
```html
<option value="new-construction" data-rate="150">New Construction</option>
```

### Modifying Team Members

Edit team profiles in `public/team.html` and add corresponding photos to `public/images/team/`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Production Deployment

Before deploying:
1. Update all domain references from `smithbrothersconstruction.com` to your actual domain
2. Set up your Resend API with your verified domain
3. Update email addresses in `.env`
4. Add real team photos
5. Consider adding a favicon
6. Test the quote form thoroughly
7. Set up SSL certificate

## License

Proprietary - Smith Brothers Construction

## Support

For questions or issues, contact the development team.
