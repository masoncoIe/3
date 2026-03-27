# Cole Browser

A minimalist black-themed web proxy browser powered by advanced proxy technologies.

## 🚀 Technologies

Cole is built using these powerful open-source proxy frameworks:

- **[Ultraviolet](https://github.com/titaniumnetwork-dev/Ultraviolet)** - Highly sophisticated proxy for evading internet censorship
- **[Scramjet](https://github.com/MercuryWorkshop/scramjet)** - Powerful web proxy framework
- **[EpoxyTransport](https://github.com/MercuryWorkshop/epoxy-transport)** - Flexible network transport library
- **[wisp-server-python](https://github.com/MercuryWorkshop/wisp-server-python)** - Python implementation of WISP protocol

## 🎨 Features

- **Pure Black Minimalist Design** - Clean, distraction-free interface
- **No New Tabs** - Everything loads within the browser
- **Advanced Proxy Support** - Access blocked sites like TikTok, YouTube, etc.
- **Fast Navigation** - Quick links and history controls
- **Service Worker Powered** - Seamless proxy integration

## 📦 Installation

### Option 1: Using Python (Recommended)

```bash
# Clone or download this repository
cd cole-browser

# Install Ultraviolet dependencies
npm install

# Run the server
python3 server.py
# or
npm start
```

Then open http://localhost:8080 in your browser.

### Option 2: Static Hosting

1. Download Ultraviolet bundle:
```bash
npm install
cp -r node_modules/@titaniumnetwork-dev/ultraviolet/dist/* uv/
```

2. Host the files on any static server or open `index.html` directly.

## 🔧 Setup Instructions

### Step 1: Install Ultraviolet

```bash
npm install @titaniumnetwork-dev/ultraviolet
```

### Step 2: Copy Ultraviolet files

```bash
mkdir -p uv
cp node_modules/@titaniumnetwork-dev/ultraviolet/dist/* uv/
```

### Step 3: Run the server

```bash
python3 server.py
```

## 🌐 Usage

1. Enter any URL or search term in the search bar
2. Click "Go" or press Enter
3. Use quick links for popular sites (TikTok, YouTube, etc.)
4. Navigate with Back/Forward buttons
5. Click "Home" to return to the start screen

## 🛠️ Configuration

Edit `uv/uv.config.js` to customize proxy settings:

- `prefix` - URL prefix for proxied content
- `bare` - Bare server endpoint
- `encodeUrl/decodeUrl` - URL encoding methods

## 📝 How It Works

1. **Service Worker Registration** - Registers UV service worker to intercept requests
2. **URL Encoding** - Encodes target URLs using Ultraviolet's codec
3. **Proxy Routing** - Routes requests through the UV proxy
4. **Content Delivery** - Delivers unblocked content in the iframe

## 🔒 Security Notes

- Service workers require HTTPS or localhost
- Some sites may block iframe embedding regardless of proxy
- Use responsibly and respect website terms of service

## 🤝 Credits

Built with technologies from:
- [Titanium Network](https://github.com/titaniumnetwork-dev)
- [Mercury Workshop](https://github.com/MercuryWorkshop)

## 📄 License

This project uses open-source proxy libraries. Please check individual library licenses.

---

**Cole Browser** - Clean. Simple. Unblocked.
