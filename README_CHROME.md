# Docmost Clipper - Chrome Extension

A secure Chrome extension to clip web pages, articles, and selections directly to your self-hosted [Docmost](https://docmost.com) instance.

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

### Development Mode

1. Clone this repository
2. Navigate to `docmost-clipper-chrome/`
3. Install dependencies:
   ```bash
   npm install
   ```
4. Open Chrome and go to `chrome://extensions/`
5. Enable "Developer mode"
6. Click "Load unpacked" and select the `docmost-clipper-chrome` directory

### Building for Production

1. Ensure all dependencies are installed
2. The extension is ready to be packaged as-is
3. Zip the `docmost-clipper-chrome` directory for distribution

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

## Chrome Extension Structure

### Core Files

**`manifest.json`** - Extension configuration
- Defines permissions: `activeTab`, `storage`, `scripting`, `cookies`
- Sets up popup action and icons
- Uses Manifest V3

**`package.json`** - Dependencies
- Main dependency: `@mozilla/readability` for content extraction

### Popup Interface (`popup/`)

**`popup.html`** - Main UI structure with three views:
- **Settings View**: Login form, URL configuration, theme selection
- **Clipper View**: Title editing, selection toggle, notes, space selection
- **Create Space View**: New space creation form

**`popup.js`** (714 lines) - Main application logic:
- Authentication and session management
- Space fetching and creation
- Content extraction coordination
- Theme management
- Internationalization

**`popup.css`** - Styling with dark/light theme support

### Content Scripts (`src/`)

**`content.js`** - Content extraction script:
- Listens for `get-content` messages
- Uses Mozilla Readability to parse pages
- Handles text selection extraction
- Includes HTML sanitization for XSS protection

**`libs/Readability.js`** - Mozilla's Readability library (90KB)

### Localization (`_locales/`)

Supports three languages:
- **English** (`en/`)
- **French** (`fr/`)
- **Chinese** (`zh-cn/`)

Each contains `messages.json` with UI translations.

## Where to Add Clipper Widget Functionalities

### Primary Location: `popup/popup.js`

This is the main controller where you should add new features:

1. **New UI Elements**: Add to `popup.html` first, then reference in `popup.js`
2. **Event Handlers**: Add to the `buttons` and `inputs` objects
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

#### 3. Storage & Settings
- Use `chrome.storage.local` for persistence (see line 55)
- Add new settings to the settings view
- Extend the theme system for more customization

#### 4. API Integration
- Add new API functions alongside existing `fetchSpaces()` and `clipToDocmost()`
- Handle authentication cookies (already set up)
- Add error handling and retry mechanisms

### Development Workflow

1. **Start with UI**: Add HTML elements in `popup.html`
2. **Add Styling**: Update `popup.css` for appearance
3. **Implement Logic**: Add handlers and functions in `popup.js`
4. **Test**: Load extension in Chrome developer mode
5. **Iterate**: Debug using Chrome DevTools for the popup

The architecture is well-structured with clear separation between UI (`popup/`), content extraction (`src/`), and configuration (`manifest.json`), making it straightforward to add new features.

### Key Functions in popup.js

- `loadSpacesWithRetry()`: Space management and session probing
- `clipToDocmost()`: Main clipping functionality
- `extractContent()`: Content extraction coordination
- `applyTheme()`: Theme management

### Content Extraction

The extension uses Mozilla's Readability library to:
- Parse main article content from web pages
- Extract text selections
- Sanitize HTML to prevent XSS attacks
- Preserve formatting while removing clutter

## Troubleshooting

### Common Issues

1. **Connection Problems**: Check Docmost URL and network connectivity
2. **Authentication**: Ensure you're logged into Docmost in another tab
3. **Content Extraction**: Some pages may not be compatible with Readability
4. **Permissions**: Make sure the extension has required permissions

### Debug Mode

1. Open Chrome DevTools for the popup (right-click extension → Inspect)
2. Check the Console tab for error messages
3. Use the Network tab to monitor API requests

## License

MIT License - see repository root for full license text.

## Support

This is an independent client for Docmost instances.
Not affiliated with Docmost, Inc.
For issues and feature requests, please use the repository's issue tracker.
