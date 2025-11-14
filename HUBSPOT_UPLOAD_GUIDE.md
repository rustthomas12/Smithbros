# HubSpot Upload Guide - Smith Brothers Construction

## Quick Upload Steps

### Step 1: Login to HubSpot
1. Go to https://app.hubspot.com
2. Login with your HubSpot credentials

### Step 2: Access Design Manager
1. Click **Marketing** in the top navigation
2. Select **Files and Templates**
3. Click **Design Tools** (or **Design Manager**)

---

## Upload Your Files

### A. Upload CSS File
1. In Design Manager, create a new folder called `smith-brothers` (or any name you prefer)
2. Inside that folder, create a subfolder called `css`
3. Upload file: `public/css/styles.css`
4. **Copy the file URL** - you'll need this path (example: `/smith-brothers/css/styles.css`)

### B. Upload JavaScript Files
1. Create a subfolder called `js`
2. Upload file: `public/js/main.js`
3. **Copy the file URL**

### C. Upload Images (Optional - when you have photos)
1. Go to **Content** → **Files** in HubSpot
2. Create folders: `projects/`, `services/`, `team/`
3. Upload your images to respective folders
4. **Note the image URLs**

---

## Create Your Pages

### For Each HTML Page (index, about, services, team, quote):

#### 1. Create a New Page Template
1. In Design Manager, click **File** → **New File**
2. Select **HTML + HubL template**
3. Name it (e.g., "Home Template", "Services Template", etc.)

#### 2. Copy HTML Content
1. Open your local HTML file (e.g., `public/index.html`)
2. Copy ALL the content
3. Paste into the HubSpot template editor

#### 3. Update File Paths
Replace the following in EACH template:

**CSS Path:**
```html
<!-- FIND THIS: -->
<link rel="stylesheet" href="/css/styles.css">

<!-- REPLACE WITH: -->
<link rel="stylesheet" href="https://YOURPORTALID.hubspotfs.com/hubfs/smith-brothers/css/styles.css">
```

**JavaScript Path:**
```html
<!-- FIND THIS: -->
<script src="/js/main.js"></script>

<!-- REPLACE WITH: -->
<script src="https://YOURPORTALID.hubspotfs.com/hubfs/smith-brothers/js/main.js"></script>
```

**Or use HubSpot's asset URL helper:**
```html
<link rel="stylesheet" href="{{ get_asset_url('/smith-brothers/css/styles.css') }}">
<script src="{{ get_asset_url('/smith-brothers/js/main.js') }}"></script>
```

#### 4. Save the Template
- Click **Publish** to save your template

---

## Create Pages from Templates

### For Each Page:

1. Go to **Marketing** → **Website** → **Website Pages**
2. Click **Create** → **Website page**
3. Choose **Blank template** or your custom template
4. Select the template you just created
5. Configure page settings:
   - **Page Title**: Home, About Us, Services, Meet The Team, Get A Quote
   - **Page URL**: `/`, `/about`, `/services`, `/team`, `/quote`
   - **Meta Description**: Add description for SEO
6. Click **Publish** (top right)

---

## Important: Update the Quote Form

Your current quote form uses Node.js backend. You have 2 options:

### Option A: Use HubSpot Forms (Recommended)
1. Go to **Marketing** → **Lead Capture** → **Forms**
2. Create a new form with fields matching your quote form:
   - Full Name
   - Email
   - Phone
   - Zip Code
   - Project Type
   - Project Size
   - Square Footage
   - Timeline
   - Budget
   - Description
   - Additional Services (checkboxes)
3. Get the form embed code
4. Replace the form section in `quote.html` with the HubSpot form embed code

### Option B: Keep Your Node.js Backend
- Keep your Express server running separately
- Point HubSpot form to submit to your server endpoint
- More complex, requires API integration

---

## Files to Upload

### Required Files:
```
✓ public/index.html → Home Template
✓ public/about.html → About Template
✓ public/services.html → Services Template
✓ public/team.html → Team Template
✓ public/quote.html → Quote Template
✓ public/css/styles.css → CSS File
✓ public/js/main.js → JavaScript File
```

### Optional (when you add photos):
```
□ public/images/projects/ → Project Photos
□ public/images/services/ → Service Photos
□ public/images/team/ → Team Photos
```

---

## Quick Checklist

- [ ] Login to HubSpot
- [ ] Upload styles.css to Design Manager
- [ ] Upload main.js to Design Manager
- [ ] Create template for index.html
- [ ] Create template for about.html
- [ ] Create template for services.html
- [ ] Create template for team.html
- [ ] Create template for quote.html
- [ ] Update all CSS/JS paths in templates
- [ ] Create pages from templates
- [ ] Set correct URLs for each page
- [ ] Replace quote form with HubSpot form
- [ ] Test all pages
- [ ] Publish all pages

---

## Need Help?

- **HubSpot Support**: https://help.hubspot.com
- **HubSpot Community**: https://community.hubspot.com
- **Design Manager Guide**: https://knowledge.hubspot.com/design-manager

---

## Alternative: Use HubSpot CLI

If you're comfortable with command line:

1. Install HubSpot CLI:
```bash
npm install -g @hubspot/cli
```

2. Authenticate:
```bash
hs init
```

3. Upload files:
```bash
hs upload public smith-brothers --portal=YOUR_PORTAL_ID
```

---

## Contact Information Already Integrated

✓ Address: 173 South Street, Granby, MA 01033
✓ Phone: (413) 457-9020
✓ Email: Smithbroscarpentry@gmail.com
✓ Licenses: CS# 118944 | HIC# 209674

All team bios, services, and business information are already in the HTML files!

---

**Your files are ready to upload! Follow the steps above and your website will be live on HubSpot.**
