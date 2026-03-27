# Cole Browser - Quick Start Guide

## 🚀 3 Ways to Use Cole

### Option 1: Standalone (Easiest - Open and Go!)

Just open `standalone.html` in your browser. No setup needed!

**Limitations:** Some sites may be blocked by CORS/iframe restrictions without a proper proxy server.

---

### Option 2: With Full Proxy (Recommended for TikTok, etc.)

This gives you full Ultraviolet proxy support to bypass restrictions.

**Step 1:** Install dependencies
```bash
./setup.sh
```

Or manually:
```bash
npm install
mkdir -p uv
cp node_modules/@titaniumnetwork-dev/ultraviolet/dist/* uv/
```

**Step 2:** Start the server
```bash
python3 server.py
```

**Step 3:** Open your browser
```
http://localhost:8080
```

---

### Option 3: Use Existing Setup (browser.html)

The simplified browser without proxy integration:
```bash
# Just open browser.html in your browser
open browser.html
```

---

## 🔧 Technologies Used

- **Ultraviolet** - Advanced web proxy by Titanium Network
- **Scramjet** - Web proxy framework by Mercury Workshop  
- **EpoxyTransport** - Network transport library
- **WISP** - WebSocket protocol implementation

---

## 📖 Which Version Should I Use?

| File | Best For | Proxy Support | Setup Required |
|------|----------|---------------|----------------|
| `standalone.html` | Quick testing | None | ❌ No |
| `index.html` | Full features | ✅ Ultraviolet | ✅ Yes |
| `browser.html` | Simple browsing | None | ❌ No |

---

## ⚠️ Important Notes

1. **Service Workers** require HTTPS or localhost
2. **TikTok/YouTube** work best with full proxy setup (Option 2)
3. Some sites block iframe embedding regardless of proxy
4. For best results, run the full server setup

---

## 🐛 Troubleshooting

**"Sites won't load"**
- Make sure you're using Option 2 with the server running
- Check that Ultraviolet files are in the `uv/` folder

**"allorigins.win error"**
- This means you're using the old browser.html
- Use `index.html` with the server instead

**"Service Worker failed"**
- Must use localhost or HTTPS
- Clear browser cache and try again

---

## 💡 Pro Tips

1. Use `index.html` + server for full proxy features
2. Add your own quick links in the code
3. Check the README.md for detailed documentation
4. Keep the repo updated for latest proxy improvements

---

**Enjoy your unblocked browsing! 🎉**
