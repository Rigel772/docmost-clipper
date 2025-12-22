# Docmost Clipper for Firefox

This directory contains the Firefox version of the Docmost Clipper extension, adapted to use the native `browser` namespace and Promises.

## 🛠 Installation

### Temporary Installation (Development)

1.  Open Firefox and navigate to `about:debugging`.
2.  Click **This Firefox** in the sidebar.
3.  Click **Load Temporary Add-on...**.
4.  Navigate to this folder (`docmost-clipper-firefox`) and select the `manifest.json` file.

## 📂 Structure

- **`manifest.json`**: Firefox-specific manifest (includes Gecko ID).
- **`popup/`**: Interface logic refactored for Firefox (uses `browser.*` and Promises).
- **`src/`**: Content scripts refactored for Firefox.

For general usage instructions and features, please refer to the [Main Project README](../README.md).