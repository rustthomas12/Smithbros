# HubSpot Upload Instructions

## Quick Upload Method (Recommended)

### Step 1: Access HubSpot Design Manager
1. Log in to your HubSpot account
2. Go to **Marketing** → **Files and Templates** → **Design Tools**

### Step 2: Upload Files

#### Upload CSS Files:
1. In Design Manager, navigate to **@hubspot** → **styles** (or create a new folder)
2. Upload: `public/css/styles.css`
3. Note the file path (e.g., `/styles/styles.css`)

#### Upload JavaScript Files:
1. Navigate to **@hubspot** → **js** (or create a new folder)
2. Upload: `public/js/main.js`
3. If you have other JS files, upload them too

#### Upload Images:
1. Navigate to **Files** → **Images** in HubSpot
2. Upload all images from `public/images/` folder
3. Keep the same folder structure if possible

#### Upload HTML Files as Templates:
1. In Design Manager, go to **Templates** section
2. Click **New Template** → **Page Template**
3. For each HTML file (index.html, about.html, services.html, team.html, quote.html):
   - Create a new coded template
   - Copy the HTML content
   - Update the CSS and JS paths to match HubSpot paths
   - Save the template

### Step 3: Update File Paths in Templates

For each template, update these paths:

**CSS Link:**
```html
<!-- Change from: -->
<link rel="stylesheet" href="/css/styles.css">

<!-- To: -->
<link rel="stylesheet" href="https://your-hubspot-domain.com/hubfs/styles/styles.css">
<!-- OR use HubSpot's built-in path: -->
<link rel="stylesheet" href="{{ get_asset_url('/styles/styles.css') }}">
```

**JavaScript:**
```html
<!-- Change from: -->
<script src="/js/main.js"></script>

<!-- To: -->
<script src="{{ get_asset_url('/js/main.js') }}"></script>
```

**Images:**
```html
<!-- Change image paths from: -->
<img src="/images/projects/deck-1.jpg">

<!-- To: -->
<img src="https://your-portal-id.hs-sites.com/hubfs/images/projects/deck-1.jpg">
```

### Step 4: Create Pages from Templates
1. Go to **Marketing** → **Website** → **Website Pages**
2. Click **Create** → **Website Page**
3. Select your uploaded template
4. Configure page settings (URL, meta description, etc.)
5. Publish the page

---

## Alternative: Use HubSpot CLI (For Developers)

If you prefer command-line tools:

### Install HubSpot CLI:
```bash
npm install -g @hubspot/cli
```

### Authenticate:
```bash
hs init
```

### Upload Files:
```bash
hs upload public my-theme
```

---

## Files to Upload

### Essential Files:
- `public/index.html`
- `public/about.html`
- `public/services.html`
- `public/team.html`
- `public/quote.html`
- `public/css/styles.css`
- `public/js/main.js`

### Optional (if you created them):
- Any images in `public/images/`
- Additional JavaScript files

---

## Notes:

1. **Form Integration**: Your current quote form uses Node.js/Express backend. You'll need to:
   - Replace it with a HubSpot form, OR
   - Keep your Express server running and use HubSpot for front-end only

2. **Navigation**: Update navigation links in HubSpot templates to point to your HubSpot pages

3. **Domain**: Configure your custom domain in HubSpot settings if needed

4. **Testing**: Always preview pages before publishing

---

## Need the Simple Way?

Just copy-paste the HTML files into HubSpot's Design Manager as templates, then manually upload CSS and JS files. HubSpot will handle the hosting.

Contact HubSpot support if you need help with the upload process!
