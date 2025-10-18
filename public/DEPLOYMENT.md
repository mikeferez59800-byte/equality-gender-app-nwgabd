
# EgaDarras 🩷 - Deployment Guide

## Hosting on GitHub Pages

### Step 1: Prepare Your Repository

1. Create a new repository on GitHub (or use an existing one)
2. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

### Step 2: Build the Web App

Before deploying, you need to build the web version of your app:

```bash
npm install
npm run build:web
```

This will create a `dist` folder with all the static files.

### Step 3: Copy Build Files

Copy all files from the `dist` folder to your repository root (or to a `docs` folder if you prefer).

Make sure these files are included:
- `index.html`
- `manifest.webmanifest`
- `service-worker.js`
- `offline.html`
- All assets in the `_expo` folder
- All images in the `assets` folder

### Step 4: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** section
4. Under **Source**, select:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)` or `/docs` (depending on where you placed the files)
5. Click **Save**

### Step 5: Update Base Path (if needed)

If your GitHub Pages URL is `https://username.github.io/repo-name/` (not a custom domain), you may need to update the base path in your files:

1. In `index.html`, update all relative paths to include your repo name:
   ```html
   <link rel="manifest" href="./manifest.webmanifest">
   <!-- becomes -->
   <link rel="manifest" href="/repo-name/manifest.webmanifest">
   ```

2. In `manifest.webmanifest`, update the `start_url`:
   ```json
   "start_url": "/repo-name/"
   ```

3. In `service-worker.js`, update the cache URLs to include the base path.

### Step 6: Push to GitHub

```bash
git add .
git commit -m "Deploy EgaDarras PWA"
git push origin main
```

### Step 7: Access Your App

Your app will be available at:
- `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/` (for project pages)
- `https://YOUR_USERNAME.github.io/` (for user/organization pages)

## PWA Installation

Once deployed, users can install the app:

### On Mobile (iOS/Android):
1. Open the website in Safari (iOS) or Chrome (Android)
2. Tap the share button
3. Select "Add to Home Screen"
4. The app will appear as a standalone app icon

### On Desktop (Chrome/Edge):
1. Open the website
2. Click the install icon in the address bar
3. Or use the install prompt that appears
4. The app will be installed as a desktop application

## Offline Functionality

The service worker caches all necessary files, allowing the app to work offline after the first visit.

## Troubleshooting

### App not loading correctly
- Check browser console for errors
- Verify all file paths are correct and relative
- Clear browser cache and reload

### Service Worker not registering
- Ensure you're using HTTPS (GitHub Pages provides this automatically)
- Check that `service-worker.js` is in the correct location
- Verify the service worker registration code in `index.html`

### PWA not installable
- Verify `manifest.webmanifest` is correctly linked in `index.html`
- Check that all required manifest fields are present
- Ensure icons are accessible and in the correct format

### Assets not loading
- Verify all asset paths are relative
- Check that the `_expo` and `assets` folders are included in your deployment
- Ensure file names match exactly (case-sensitive)

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to your repository root with your domain name:
   ```
   yourdomain.com
   ```

2. Configure your domain's DNS settings:
   - Add an A record pointing to GitHub's IP addresses
   - Or add a CNAME record pointing to `YOUR_USERNAME.github.io`

3. In GitHub Pages settings, enter your custom domain

4. Update the `start_url` in `manifest.webmanifest` to use your custom domain

## Updates

To update your app:

1. Make changes to your source code
2. Rebuild: `npm run build:web`
3. Copy new files to your repository
4. Commit and push to GitHub
5. GitHub Pages will automatically deploy the updates

## Support

For issues or questions:
- Check the browser console for error messages
- Verify all files are correctly deployed
- Test in different browsers
- Clear cache and try again

---

**Note:** The first load requires an internet connection. After that, the app will work offline thanks to the service worker caching strategy.
