# PixelIt Desktop Application

This version packages PixelIt as a standalone desktop application using Electron.

## Features
- ✅ Copy/Paste images (Ctrl+V / Cmd+V)
- ✅ Drag & Drop images
- ✅ Upload images via file picker
- ✅ Multiple color palettes
- ✅ Custom palette creation
- ✅ Grayscale conversion
- ✅ Adjustable pixel block size
- ✅ Image resizing options
- ✅ Download pixelated images

## How to Run the Desktop App

### Development Mode
1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the source files:
   ```bash
   npm run build
   ```

3. Start the desktop app:
   ```bash
   npm start
   ```

### Building an Executable

**For Windows:**
```bash
npm run package-win
```
This creates an installer in `dist/` folder that you can distribute.

**For macOS:**
```bash
npm run package-mac
```

**For Linux:**
```bash
npm run package-linux
```

## After Building

The executable will be in the `dist/` folder. You can:
- **Windows**: Run the `.exe` file or install using the NSIS installer
- **macOS**: Open the `.dmg` file and drag to Applications
- **Linux**: Run the `.AppImage` file

## Usage

Once the app is running:
1. **Paste an image**: Copy any image and press Ctrl+V (or Cmd+V on Mac)
2. **Drag & drop**: Drag an image file onto the canvas
3. **Upload**: Click "Upload Image" button
4. **Adjust settings**: Use the sliders and checkboxes to modify the pixel art
5. **Change palette**: Select from 12+ built-in palettes or create your own
6. **Download**: Click "Download Image" to save your pixel art

Enjoy creating pixel art! 🎨
