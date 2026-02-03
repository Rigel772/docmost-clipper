# Docmost Clipper - Firefox Extension

A secure Firefox extension to clip web pages, articles, and selections directly to your self-hosted [Docmost](https://docmost.com) instance.

## Features

- **🔌 Seamless Integration**: Connects securely to your self-hosted Docmost instance
- **🔒 Secure Authentication**: Uses HttpOnly Session Cookies, no tokens stored in extension
- **📄 Smart Extraction**: Built with Mozilla's Readability library to strip clutter
- **✂️ Deep Clipping Control**: Full page or selection-only clipping
- **📝 User Notes**: Add context and thoughts to clipped content
- **📂 Smart Organization**: Fetch existing spaces or create new ones
- **🌗 Theme Customization**: Dark mode, light mode, or system sync
- **⚡ Robustness**: Built-in error handling and retry mechanisms
- **🌍 Internationalization**: English, French, and Chinese support

## Installation

### Development Mode (Temporary)

1. Open Firefox and navigate to `about:debugging`
2. Click **This Firefox** in the sidebar
3. Click **Load Temporary Add-on...**
4. Navigate to the `docmost-clipper-firefox/` folder and select the `manifest.json` file

### Building for Production

1. Ensure all files are in the `docmost-clipper-firefox` directory
2. The extension is ready to be packaged as-is
3. Create a `.zip` file or `.xpi` package for distribution
4. Submit to Mozilla Add-ons (AMO) for signing and distribution

## Usage

### 1. Connect to Docmost
1. Click the extension icon
2. Enter your Docmost URL (e.g., `https://docmost.mydomain.com`)
3. Enter your email and password
4. Click "Connect"

### 2. Clip Content
1. Navigate to the web page you want to save
2. (Optional) Highlight specific text for selection-only clipping
3. Click the extension icon
4. Review and edit the title if needed
5. Add optional notes
6. Select a space or create a new one
7. Click "Clip to Docmost"

### 3. Settings
- Access settings via the Settings button
- Switch between themes: System (Auto), Light, or Dark
- Disconnect to clear stored URL and return to login

## Firefox Extension Structure

### Core Files

**`manifest.json`** - Firefox-specific extension configuration
- Defines permissions: `activeTab`, `storage`, `scripting`, `cookies`
- Sets up popup action and icons
- Uses Manifest V3
- **Firefox-specific**: Includes `browser_specific_settings` with Gecko ID and minimum version
- **Firefox-specific**: Includes `data_collection_permissions` set to "none"

### Popup Interface (`popup/`)

**`popup.html`** - Main UI structure with three views:
- **Settings View**: Login form, URL configuration, theme selection
- **Clipper View**: Title editing, selection toggle, notes, space selection
- **Create Space View**: New space creation form

**`popup.js`** (718 lines) - Main application logic:
- Authentication and session management
- Space fetching and creation
- Content extraction coordination
- Theme management
- Internationalization
- **Firefox-specific**: Uses `browser.*` API namespace instead of `chrome.*`
- **Firefox-specific**: Uses native Promises instead of callbacks

**`popup.css`** - Styling with dark/light theme support

### Content Scripts (`src/`)

**`content.js`** - Content extraction script:
- Listens for `get-content` messages
- Uses Mozilla Readability to parse pages
- Handles text selection extraction
- Includes HTML sanitization for XSS protection
- **Firefox-specific**: Uses `browser.runtime.onMessage` instead of `chrome.runtime.onMessage`
- **Firefox-specific**: Returns Promises instead of using `sendResponse` callback

**`libs/Readability.js`** - Mozilla's Readability library (90KB)

### Localization (`_locales/`)

Supports three languages:
- **English** (`en/`)
- **French** (`fr/`)
- **Chinese** (`zh-cn/`)

Each contains `messages.json` with UI translations.

### Build Artifacts

**`docmost-clipper.zip`** - Packaged extension for distribution
**`docmost-clipper1.1.xpi`** - Signed Firefox extension package

## Where to Add Clipper Widget Functionalities

### Primary Location: `popup/popup.js`

This is the main controller where you should add new features:

1. **New UI Elements**: Add to `popup.html` first, then reference in `popup.js`
2. **Event Handlers**: Add to the `buttons` and `inputs` objects (lines 34-45)
3. **Core Logic**: Most functionality goes in the main event listener function

### Key Areas for Extension:

#### 1. UI Enhancements
- Add new form elements in `popup.html`
- Style them in `popup.css`
- Wire up handlers in `popup.js` around line 34-45 (buttons/inputs initialization)

#### 2. Content Processing
- Modify `content.js` for new extraction capabilities
- Add message handlers for new content types
- Enhance the `sanitizeHtml` function for security
- **Firefox Note**: Ensure message handlers return Promises

#### 3. Storage & Settings
- Use `browser.storage.local` for persistence (see line 55)
- Add new settings to the settings view
- Extend the theme system for more customization
- **Firefox Note**: Storage API returns Promises natively

#### 4. API Integration
- Add new API functions alongside existing `fetchSpaces()` and `clipToDocmost()`
- Handle authentication cookies (already set up)
- Add error handling and retry mechanisms
- **Firefox Note**: Use `fetch()` API which returns Promises

### Development Workflow

1. **Start with UI**: Add HTML elements in `popup.html`
2. **Add Styling**: Update `popup.css` for appearance
3. **Implement Logic**: Add handlers and functions in `popup.js`
4. **Test**: Load extension in Firefox using `about:debugging`
5. **Iterate**: Debug using Firefox DevTools for the popup (right-click → Inspect Element)

The architecture is well-structured with clear separation between UI (`popup/`), content extraction (`src/`), and configuration (`manifest.json`), making it straightforward to add new features.

## Key Differences from Chrome Version

### API Namespace
- **Chrome**: Uses `chrome.*` API
- **Firefox**: Uses `browser.*` API (WebExtensions standard)

### Async Patterns
- **Chrome**: Uses callbacks with `sendResponse`
- **Firefox**: Uses native Promises

### Manifest Additions
- **Firefox-specific fields**:
  - `browser_specific_settings.gecko.id`: Extension ID for Firefox
  - `browser_specific_settings.gecko.strict_min_version`: Minimum Firefox version (142.0)
  - `browser_specific_settings.gecko.data_collection_permissions`: Privacy settings

### Message Passing
- **Chrome**: `chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { ... })`
- **Firefox**: `browser.runtime.onMessage.addListener((request, sender) => { return Promise.resolve(...) })`

### Storage API
- **Chrome**: `chrome.storage.local.get()` with callbacks
- **Firefox**: `browser.storage.local.get()` returns Promise

## Key Functions in popup.js

- `loadSpacesWithRetry()`: Space management and session probing
- `clipToDocmost()`: Main clipping functionality
- `extractContent()`: Content extraction coordination
- `applyTheme()`: Theme management

## Content Extraction

The extension uses Mozilla's Readability library to:
- Parse main article content from web pages
- Extract text selections
- Sanitize HTML to prevent XSS attacks
- Preserve formatting while removing clutter

## Security & Permissions

The extension follows the "Least Privilege" principle:

- **`activeTab`**: Access current tab content only when explicitly clicked
- **`scripting`**: Inject content extraction logic on-demand
- **`storage`**: Save URL and preferences (no authentication tokens)
- **`cookies`**: Read CSRF tokens for secure POST requests
- **`<all_urls>`**: Allow sending clips to any self-hosted instance

## Troubleshooting

### Common Issues

1. **Connection Problems**: Check Docmost URL and network connectivity
2. **Authentication**: Ensure you're logged into Docmost in another tab
3. **Content Extraction**: Some pages may not be compatible with Readability
4. **Permissions**: Make sure the extension has required permissions
5. **Firefox-specific**: Check Browser Console (`Ctrl+Shift+J`) for errors

### Debug Mode

1. Navigate to `about:debugging` in Firefox
2. Click "This Firefox" in the sidebar
3. Find your extension and click "Inspect"
4. Use the Console tab for error messages
5. Use the Network tab to monitor API requests

## License

MIT License - see repository root for full license text.

## Support

This is an independent client for Docmost instances.
Not affiliated with Docmost, Inc.
For issues and feature requests, please use the repository's issue tracker.
