
# 🎵 Beat Drop - Modern Music Player

A beautiful, feature-rich music player built with vanilla HTML, CSS, and JavaScript. Designed with a premium glassmorphism interface and packed with amazing features!

## ✨ Features

### 🎧 Core Features
- **Beautiful Glassmorphism UI**: Modern, elegant design with smooth animations
- **Vinyl Turntable Visualization**: Rotating vinyl with moving tonearm
- **Full Playlist Management**: Browse through your songs
- **Favorites Collection**: Save your most-loved tracks
- **Real-time Search**: Quickly find songs and artists
- **Shuffle & Repeat Controls**: Customize your listening experience
- **Keyboard Shortcuts**: Control playback with your keyboard
- **Light/Dark Theme**: Switch between themes with one click

### 🎨 Visual Features
- **Animated Visualizer**: Frequency-based bars at the bottom
- **Colorful Gradients**: Warm orange-pink theme
- **Smooth Transitions**: Every interaction feels polished
- **Mini Player Mode**: Compact view for multitasking
- **Recently Played List**: Horizontal scrollable thumbnails

### 🎛️ Audio & Equalizer
- **5-Band Equalizer**: Customize your sound
- **8 Presets**: Flat, Pop, Rock, Jazz, Classical, Bass Boost, Vocal, Party
- **Playback Speed Control**: 0.5x to 2x speed options
- **Mute Toggle**: Quick mute/unmute with toast notifications

### 😴 Sleep Timer
- Set timer for 15, 30, 45, 60, or 90 minutes
- Real-time countdown display
- Auto-pauses when time is up

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for best experience)

### Installation & Usage

#### Option 1: Open Directly
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Add your music files to the `songs/` directory
4. Update the `SONGS` array in `script.js` with your songs

#### Option 2: Use a Local Server (Recommended)
```bash
# Clone the repository
git clone https://github.com/your-username/pulse-drop-music-player.git
cd pulse-drop-music-player

# Start a local server (e.g., using Python)
python -m http.server 8000

# Or using Node.js
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

## 📁 File Structure
```
pulse-drop-music-player/
├── index.html         # Main HTML file
├── style.css          # All styles
├── script.js          # Main functionality
├── songs/             # Your music files (add .mp3 here)
├── images/            # Album covers
└── README.md          # This file
```

## 🎹 Keyboard Shortcuts
| Key Combination | Action |
|-----------------|--------|
| `Space` | Play/Pause |
| `→` | Next Track |
| `←` | Previous Track |
| `↑` | Increase Volume |
| `↓` | Decrease Volume |
| `S` | Toggle Shuffle |
| `R` | Toggle Repeat (Off → All → One) |
| `L` | Toggle Favorite |
| `M` | Mute/Unmute |
| `E` | Open Equalizer |
| `T` | Open Sleep Timer |
| `Escape` | Close Modal |

## 🎨 Customization

### Adding Your Own Songs
Open `script.js` and update the `SONGS` array with your tracks:
```javascript
const SONGS = [
  {
    id: 1,
    title: "Your Song Title",
    artist: "Artist Name",
    duration: "3:45",
    cover: "images/your-album-cover.jpg",
    src: "songs/your-song.mp3",
  },
  // Add more songs here
];
```

### Changing Colors
Open `style.css` and modify the color variables at the top:
```css
:root{
  --cyan:#f97316;         /* Main color */
  --cyan-soft:#fed7aa;   /* Light version */
  --pink:#ec4899;        /* Secondary color */
  --accent:#f43f5e;      /* Accent color */
  /* ... */
}
```

## 📱 Responsive Design
Pulse Drop works perfectly on all screen sizes:
- Mobile devices
- Tablets
- Desktops

## 🔧 Built With
- **HTML5**: Structure and markup
- **CSS3**: Styling with custom properties and gradients
- **Vanilla JavaScript**: All functionality without frameworks
- **Web Audio API**: Equalizer and visualizer
- **LocalStorage**: Saving preferences

## 🌟 Future Enhancements
- [ ] Drag and drop playlist reordering
- [ ] Audio waveform visualization
- [ ] Gapless playback
- [ ] Crossfade support
- [ ] Last.fm scrobbling
- [ ] Custom theme builder



## 📄 License
This project is licensed under the MIT License.

## 💝 Credits
Developed with ❤️ by **Kattamanchi Gnanasudhama**



Enjoy the music! 🎵✨
=======
# Beat-Drop
>>>>>>> 8c2acd635a2036bf0558b31b44359b496954390a
