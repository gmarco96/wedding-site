# Vite Setup Guide for Wedding Site

## What is Vite?

**Vite** is a modern build tool that:
- 🚀 Serves your code instantly in development (no waiting for builds)
- 📦 Bundles and optimizes for production
- 🎯 Zero-config setup for HTML/CSS/JS projects
- ⚡ Lightning-fast build times

Think of it as: **Dev server + Bundler in one tool**

---

## How It Works

### **Development Mode** (`npm run dev`)
```
Your Files → Vite Dev Server → Browser
     ↓
   Hot reload (refresh automatically when you change files)
```

### **Production Mode** (`npm run build`)
```
Your Files → Vite Bundler → Optimized dist/ folder
     ↓
   - Minified CSS/JS
   - Image optimization
   - Content hashing (cache busting)
   - Ready to deploy
```

---

## Commands Explained

### **1. Start Development Server**
```bash
npm run dev
```

**What happens:**
- Opens `http://localhost:3000` automatically
- Watches for file changes
- Hot reloads in browser (no manual refresh needed)
- Shows errors in browser console

**Use when:** Developing, testing, making changes

**Example workflow:**
```bash
npm run dev
# Now edit index.html, save → browser updates instantly
```

---

### **2. Build for Production**
```bash
npm run build
```

**What happens:**
- Minifies HTML/CSS/JS
- Optimizes images
- Creates `dist/` folder with optimized files
- Adds content hashes to filenames (e.g., `style.abc123.css`)

**Output structure:**
```
dist/
├── index.html                    (5 KB - minified)
├── assets/
│   ├── style.abc123.css         (105 KB - minified)
│   ├── script.def456.js         (85 KB - minified)
│   ├── images/
│   │   ├── photo1.jpg
│   │   └── photo2.jpg
│   └── fonts/
│       └── fontawesome.woff2
```

**Use when:** Ready to deploy

---

### **3. Preview Production Build**
```bash
npm run preview
```

**What happens:**
- Runs the built `dist/` folder locally
- Shows you exactly what users will see
- Good for testing before deployment

**Use when:** Want to test the final build locally

---

## Project Structure

Your current structure works perfectly with Vite:

```
wedding-site/
├── index.html              ← Entry point (Vite reads this)
├── assets/
│   ├── css/
│   │   └── main.css       ← Vite optimizes this
│   ├── js/
│   │   ├── main.js        ← Vite bundles this
│   │   └── util.js
│   └── images/            ← Vite copies & optimizes
├── images/
│   ├── photo1.jpg
│   └── photo2.jpg
├── vite.config.js         ← Configuration
├── package.json           ← Scripts & dependencies
└── dist/                  ← Generated (don't edit)
```

---

## How Vite Processes Files

### **HTML Files**
```html
<!-- Input (index.html) -->
<link rel="stylesheet" href="assets/css/main.css">
<script src="assets/js/main.js"></script>

<!-- Output (dist/index.html after build) -->
<link rel="stylesheet" href="/assets/style.abc123.css">
<script src="/assets/script.def456.js"></script>
```

### **CSS Files**
- Automatically minified
- Vendor prefixes added automatically
- Images in CSS are optimized

### **JavaScript Files**
- Bundled together
- Minified
- Dead code removed
- Content hashed

### **Images**
- Copied to dist
- Optimized (smaller file size)
- URLs updated automatically

---

## Step-by-Step Workflow

### **1. Make Changes**
```bash
npm run dev
# Edit index.html, assets/css/main.css, assets/js/main.js
# Browser auto-refreshes
```

### **2. Test Production Build**
```bash
npm run build
npm run preview
# Test at http://localhost:4173
# Verify everything works
```

### **3. Deploy**
The `dist/` folder is ready to upload to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting

---

## Configuration (`vite.config.js`)

Current settings explained:

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,           // Dev server runs on port 3000
    open: true            // Auto-open browser
  },
  build: {
    outDir: 'dist',       // Output folder name
    minify: 'terser',     // Use terser for JS minification
    sourcemap: false      // No source maps (smaller build)
  }
})
```

**To change:**
- Dev port: Change `port: 3000` to any number (e.g., 5000)
- Output folder: Change `outDir: 'dist'` (e.g., 'build', 'public')
- Keep sourcemaps for debugging: Change `sourcemap: false` to `true`

---

## Common Workflows

### **Local Development**
```bash
npm run dev
# Edit files → Browser updates automatically
# Press Ctrl+C to stop
```

### **Before Deploying**
```bash
npm run build      # Create optimized dist/
npm run preview    # Test locally
# If OK, upload dist/ folder to hosting
```

### **Deploy to GitHub Pages**
```bash
npm run build
# Upload dist/ contents to GitHub Pages
# Your site goes live!
```

### **Deploy to Netlify/Vercel**
```bash
# Connect repo to Netlify/Vercel
# Set build command: npm run build
# Set publish directory: dist
# Push to GitHub → Auto-deploys!
```

---

## Vite Features for Your Site

### **Hot Module Replacement (HMR)**
When you edit a file:
- CSS changes appear instantly
- JavaScript reloads without losing state
- No manual browser refresh needed

### **Optimizations**
Vite automatically:
- Minifies all code
- Removes unused CSS
- Optimizes images
- Adds cache-busting hashes
- Compresses assets

### **Browser Support**
Works on all modern browsers:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

---

## Troubleshooting

### **Port 3000 Already in Use**
Edit `vite.config.js`:
```javascript
server: {
  port: 3001  // Use different port
}
```

### **Images Not Loading**
Make sure images are in project folder (they are):
```
assets/images/   ← Images here
images/          ← Or here
```

### **Styles Not Applied**
Check that CSS is linked in HTML:
```html
<link rel="stylesheet" href="assets/css/main.css">
```

### **Build Takes Long**
Usually just a few seconds. If longer, check:
- Large image files (optimize them)
- Many dependencies (keep minimal)

---

## Next Steps

1. **Try it out:**
   ```bash
   npm run dev
   # Edit a file and watch it update
   ```

2. **Build for production:**
   ```bash
   npm run build
   # Check dist/ folder
   ```

3. **Deploy:**
   Upload `dist/` folder to your hosting

---

## Summary

| Task | Command | Output |
|------|---------|--------|
| **Development** | `npm run dev` | Live preview on localhost:3000 |
| **Build** | `npm run build` | Optimized `dist/` folder |
| **Test build** | `npm run preview` | Preview at localhost:4173 |

That's it! Vite handles the rest. 🚀
