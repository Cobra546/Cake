# 3D Cake Studio

Mobile-friendly static 3D cake editor for GitHub Pages.

## Files
- `index.html`: page structure
- `style.css`: responsive mobile-first styling
- `script.js`: Three.js cake geometry, controls, decorations, photo reference and GLB export

## Features
- Rotate and zoom the 3D cake
- Upload a photo as a visual reference
- Adjust cake size and six colours
- Add stars, hearts, balls, bows, a cute character, and a music topper
- Export a real coloured `.glb` model

## Limitation
The uploaded photo is shown as a reference; it is not automatically converted into an exact 3D cake. The GLB contains the constructed cake geometry and materials, not the reference photo.

## GitHub Pages
Open repository **Settings → Pages → Deploy from a branch**, select branch `main` and folder `/(root)`, then Save. Wait for GitHub Pages to publish the site.

The editor imports Three.js from jsDelivr, so an internet connection is needed.