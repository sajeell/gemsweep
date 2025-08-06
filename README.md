# GemSweep – Bulk Delete Gemini Chats

GemSweep is a Chrome extension designed to enhance your experience with Gemini conversations. It adds checkboxes to the Gemini conversation list, allowing you to delete multiple chats at once with ease.

## Features

- Adds checkboxes to Gemini conversation list.
- Bulk delete multiple chats in one go.
- Simple and intuitive interface.

## Installation

1. Clone this repository or download the ZIP file.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" using the toggle in the top-right corner.
4. Click "Load unpacked" and select the folder containing this project.

## Usage

1. Navigate to [Gemini](https://gemini.google.com/).
2. Use the checkboxes added by GemSweep to select conversations.
3. Click the delete button to remove selected chats.

## Files

- `manifest.json`: Configuration file for the Chrome extension.
- `background.js`: Handles background tasks and service worker logic.
- `content.js`: Injects functionality into the Gemini conversation list.
- `popup.html`: HTML for the extension's popup interface.
- `popup.js`: JavaScript for the popup interface.
- `icons/`: Contains icons used by the extension.

## Permissions

GemSweep requires the following permissions:

- `activeTab`: To interact with the currently active tab.

## Host Permissions

GemSweep works exclusively on the following domains:

- `https://gemini.google.com/*`
- `https://gemini.google.com/app/*`

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve GemSweep.

## Support

If you encounter any issues or have questions, please open an issue in this repository.
