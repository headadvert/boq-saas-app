# BOQ Pro Construction Estimation Platform

BOQ Pro is a static HTML, CSS, and JavaScript construction estimation platform for:

- BOQ generation
- Cost estimation
- Project-type-based estimating
- Country standard selection
- PDF export
- WhatsApp upgrade flow

This project is ready to upload to GitHub and can run on GitHub Pages.

## Project Structure

```text
boq-saas-app/
+-- index.html
+-- dashboard.html
+-- admin.html
+-- README.md
+-- css/
¦   +-- styles.css
+-- js/
¦   +-- auth.js
¦   +-- app.js
¦   +-- boq.js
¦   +-- cost.js
¦   +-- cad.js
¦   +-- pricing.js
¦   +-- admin.js
¦   +-- pdf.js
¦   +-- utils.js
+-- assets/
¦   +-- logo.png
+-- data/
    +-- rates.js
```

## How To Run Locally

Because this is a static frontend project, you can run it very simply:

1. Open the folder `boq-saas-app`
2. Double-click `index.html`

You can also use a local server if you prefer, but it is not required.

## How To Upload To GitHub

### Option 1: Upload using GitHub website

1. Sign in to GitHub
2. Click `New repository`
3. Enter a repository name
4. Create the repository
5. Open the new repository
6. Click `uploading an existing file`
7. Drag all files and folders from `boq-saas-app` into GitHub
8. Click `Commit changes`

### Option 2: Upload using Git commands

Open PowerShell inside the `boq-saas-app` folder and run:

```powershell
git init
git add .
git commit -m "Initial BOQ Pro platform"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace:

- `YOUR-USERNAME` with your GitHub username
- `YOUR-REPOSITORY` with your repository name

## How To Publish With GitHub Pages

1. Open your repository on GitHub
2. Go to `Settings`
3. Click `Pages`
4. Under `Source`, choose `Deploy from a branch`
5. Select:
   - Branch: `main`
   - Folder: `/ (root)`
6. Click `Save`

GitHub will generate a live link like:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

## How To Use The App

1. Open `index.html`
2. Click `Start BOQ Mode` or `Start Cost Mode`
3. Enter your name and email
4. Continue to the dashboard
5. Select:
   - Project type
   - Country standard
   - Project details
6. Generate the estimate
7. Export the PDF report

## Supported Project Types

- Residential (Villas)
- Apartments (Low / High Rise)
- Commercial (Offices, Retail)
- Mixed-Use Developments
- Industrial (Warehouses, Factories)
- Hospitality (Hotels)
- Healthcare (Clinics, Hospitals)

## Supported Country Standards

- Saudi Arabia: `SBC`
- UAE: `Dubai Municipality`
- UK: `NRM`
- USA: `CSI MasterFormat`
- India: `CPWD / IS Codes`
- Australia: `Australian Standards`

## How Access Codes Work

The app includes a free usage limit:

- Up to 10 generated projects in free mode
- After that, the user is locked until:
  - a valid access code is entered, or
  - the WhatsApp upgrade button is used

Current demo access codes inside the app:

- `ALQ-UNLOCK-365`
- `QASWA-PRO-2026`

You can edit these in:

- `data/rates.js`

## How To Use The Admin Panel

The current `admin.html` file is a scaffold page and can be expanded later for:

- viewing users
- generating access codes
- managing expiry dates

At this stage, the access code configuration is controlled in:

- `data/rates.js`

## Important Notes

- This version stores user/session data in `localStorage`
- This is a frontend-only deployment
- No backend or database is required for GitHub Pages
- PDF export uses the browser print window
- WhatsApp upgrade opens a prefilled WhatsApp message link

## Recommended Next Step

If you want, the next upgrade can be:

1. Full admin panel with user list and code generator
2. Real backend database and login system
3. More advanced BOQ line items and trade-level breakdown
