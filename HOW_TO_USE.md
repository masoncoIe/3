# 🎯 Cole Browser - How To Use

## ✅ WORKING FILE

**USE THIS FILE:** `final.html`

This is the fully working version with:
- ✅ Your gothic background image (background.avif) 
- ✅ Navigation that actually works
- ✅ Gothic/sleek professional theme
- ✅ Cinzel + Cormorant Garamond fonts

---

## 🚀 Quick Start

1. **Open `final.html` in your browser**
2. Type a URL (e.g., `wikipedia.org`) or search term
3. Press **Enter** or click **"ENTER"** button
4. Website loads in the frame!

---

## 🎮 Controls

- **Enter URL** → Type and press Enter
- **Go Home** → Click the "C O L E" title or press ESC
- **Search** → Type any search term (uses DuckDuckGo)

---

## ⚠️ Important: Why TikTok Doesn't Work (Yet)

**The Problem:**
TikTok, Facebook, Instagram, Google, and many major sites **block iframe embedding** for security reasons. This is called X-Frame-Options.

**What Fern Does Differently:**
Fern uses a full **server-side proxy** (Ultraviolet) that:
1. Runs a Node.js server
2. Rewrites HTML/CSS/JS on the server
3. Bypasses X-Frame-Options
4. Makes the site think it's running on the original domain

**To Get TikTok Working, You Need:**

### Option 1: Run the Full Server (Recommended)

```bash
# Install Node.js first, then:
cd /root/3/Ultraviolet-main
npm install
npm run build
cd ..
node server.js  # Create this - see below
```

### Option 2: Use a Public Proxy

Some public proxies like:
- Rammerhead
- Holy Unblocker
- Incognito

But these require their own infrastructure.

---

## 🌐 Sites That WORK Right Now

These sites allow iframe embedding:

✅ **Wikipedia** - `wikipedia.org`
✅ **Reddit** - `reddit.com`  
✅ **DuckDuckGo** - `duckduckgo.com`
✅ **Archive.org** - `archive.org`
✅ **Stack Overflow** - `stackoverflow.com`
✅ **GitHub** - `github.com`
✅ **Most News Sites** - CNN, BBC, etc.
✅ **Your Own Sites** - test.html, etc.

❌ **Will NOT Work:**
- TikTok (blocks iframes)
- Facebook (blocks iframes)
- Instagram (blocks iframes)
- Google (blocks iframes)
- Netflix (blocks iframes)
- Twitter/X (blocks iframes)

---

## 🎨 Your Background Image

Your gothic texture image is set as `background.avif` with a 75% dark overlay for better text readability.

To change overlay darkness, edit `final.html` line ~37:
```css
background: rgba(0, 0, 0, 0.75);  /* Change 0.75 to 0.5 (lighter) or 0.9 (darker) */
```

---

## 🔧 To Make TikTok Work (Advanced)

You need to set up the full Ultraviolet proxy server:

1. **Extract Ultraviolet**: Already done (`Ultraviolet-main/`)
2. **Build It**:
   ```bash
   cd Ultraviolet-main
   npm install
   npm run build
   ```
3. **Create Server** (`server.js`):
   ```javascript
   const express = require('express');
   const { uvPath } = require('./Ultraviolet-main/lib');
   const app = express();
   
   app.use(express.static(__dirname));
   app.use('/uv/', express.static(uvPath));
   
   app.listen(8080, () => {
       console.log('http://localhost:8080');
   });
   ```
4. **Run**: `node server.js`
5. **Open**: `http://localhost:8080/final.html`

---

## 📊 Current Status

| Feature | Status |
|---------|--------|
| Background Image | ✅ Working |
| Gothic Theme | ✅ Working |
| Navigation | ✅ Working |
| Most Websites | ✅ Working |
| TikTok/Instagram | ❌ Need Server |

---

## 💡 Pro Tips

1. **Test it works** - Try `wikipedia.org` first
2. **Check console** - Press F12 to see logs
3. **Use full URLs** - `https://example.com` works best
4. **Local files work** - Try `test.html`

---

## 🐛 Debugging

If sites don't load:

1. **Open browser console** (F12)
2. **Look for errors** - "[Cole]" log messages show what's happening
3. **Check if site blocks iframes** - Most social media does
4. **Try different site** - Use Wikipedia to test

---

**File Locations:**
- `final.html` - Main browser (USE THIS)
- `background.avif` - Your gothic background image
- `test.html` - Test page to verify navigation works

---

🎉 **Enjoy your gothic browser!** For full TikTok support, you'll need to set up the server-side proxy.
