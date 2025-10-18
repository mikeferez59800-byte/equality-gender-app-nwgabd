
# EgaDarras 🩷 - Deployment Guide

## How to Build and Deploy Your PWA

### Step 1: Build the PWA

Run the following command in your terminal:

```bash
npm run build:web
```

This will:
- Export your Expo app as a web application
- Generate all static files in the `dist/` directory
- Create a service worker for offline functionality

### Step 2: Create the ZIP File

After the build completes, create a ZIP file of the `dist/` folder:

**On macOS/Linux:**
```bash
cd dist
zip -r ../egadarras-pwa.zip .
cd ..
```

**On Windows (PowerShell):**
```powershell
Compress-Archive -Path dist\* -DestinationPath egadarras-pwa.zip
```

**Or manually:**
- Open your file explorer
- Navigate to the `dist/` folder
- Select all files inside
- Right-click and select "Compress to ZIP" (or similar)
- Name it `egadarras-pwa.zip`

### Step 3: Deploy to GitHub Pages

#### Option A: Using GitHub Web Interface

1. Go to your GitHub repository
2. Click on "Settings"
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Select the branch (usually `main` or `gh-pages`)
6. Click "Upload files"
7. Extract the ZIP file and upload all contents to the root of your repository
8. Commit the changes

#### Option B: Using Git Command Line

```bash
# Create a gh-pages branch
git checkout -b gh-pages

# Copy the contents of dist/ to the root
cp -r dist/* .

# Add all files
git add .

# Commit
git commit -m "Deploy EgaDarras PWA"

# Push to GitHub
git push origin gh-pages

# Go back to main branch
git checkout main
```

#### Option C: Using GitHub Actions (Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build:web
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Step 4: Configure GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages"
3. Set source to `gh-pages` branch
4. Your app will be available at: `https://yourusername.github.io/your-repo-name/`

### Step 5: Test Your PWA

1. Open your GitHub Pages URL in a browser
2. On mobile, you should see an "Install App" or "Add to Home Screen" prompt
3. Test offline functionality by turning off your internet connection

## Important Notes

- All paths in the build are relative, so it works on GitHub Pages
- The app is fully installable as a PWA
- Offline mode is enabled via the service worker
- The manifest includes proper icons and metadata

## Troubleshooting

### Issue: White screen on GitHub Pages
**Solution:** Make sure your repository name matches the `base` path, or set `base: '/'` in your config.

### Issue: App not installable
**Solution:** Ensure you're accessing the site via HTTPS (GitHub Pages provides this automatically).

### Issue: Assets not loading
**Solution:** Check that all paths are relative (no leading slashes like `/assets/...`).

## Need Help?

If you encounter any issues, check:
1. Browser console for errors
2. Network tab to see which files are failing to load
3. GitHub Pages deployment logs
