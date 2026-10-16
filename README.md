# ✨ Premium Interactive Birthday Website

A custom-designed, interactive digital birthday celebration website created for a university classmate. Designed with a cinematic, night-sky starlight aesthetic inspired by moonlit lake terraces, glowing pink neon typography, and delicate blush-pink stationery.

---

## 🌟 Key Features

1. **Interactive 3D Envelope Opening**
   - Centered blush-pink envelope with 3D flap physics (`perspective-1200` + `rotateX(180deg)`).
   - Detailed deep-red wax seal with embossed tree-of-life seal and delicate white baby's breath floral sprig.
   - User gesture directly triggers audio playback attempt for `Uranus — PNL` to comply with browser autoplay policies.
   - Pastel celebratory sparkles burst upon unsealing, transitioning smoothly into the main birthday celebration.

2. **Cinematic Night Atmosphere**
   - High-performance, lightweight HTML5 Canvas rendering twinkling stars, occasional shooting stars, and drifting soft pink petals.
   - Vector crescent moon with soft radial halo, distant mountain silhouettes, and warm amber lantern glows.
   - Full support for `prefers-reduced-motion` to provide a calm experience when requested.

3. **Approved Typography & Copy**
   - Elegant display serif ("Playfair Display" / "Cinzel") paired with glowing pink neon cursive ("Great Vibes") for the main `"Happy Birthday"` heading.
   - Approved Subtitle: `"A Little Birthday Surprise Just for You"`
   - Approved Message Heading: `"A New Year, New Achievements!"`
   - Approved Birthday Message: Friendly, warm, celebratory, respectful university tone.
   - Approved Secondary Phrase: `"A New Age, A Thousand New Possibilities."`
   - Approved Footer: `"Cheers to Another Year of Success!"`
   - Zero romantic sentiment, zero personal birthdate/age disclosures.

4. **Synchronized Dual Music Interface**
   - **Top-Right Background Controller**: Floating compact pill displaying current track, artist, play/pause button, and volume popover.
   - **Full Bottom Player**: Docked frosted glass bar with artwork, track title, artist, shuffle, previous, glowing play/pause button, next, repeat, progress seekbar with timestamps, and volume slider.
   - **Unified Audio Engine**: Powered by a single `AudioContext` and shared `<audio>` instance to eliminate duplicate audio streams.

5. **Curated 9-Track Playlist**
   - Track 1: `Uranus` — `PNL` (Background track, initiated on envelope click)
   - Track 2: `J'oublie tout` — `Jul`
   - Track 3: `Despacito` — `Luis Fonsi`
   - Track 4: `À l'ammoniaque` — `PNL`
   - Track 5: `Sometimes It Is Hard to Face Reality` — `Unknown` (metadata preserved exactly)
   - Track 6: `ضيعت عليه العمر يبويا` — `Unknown` (Arabic title preserved exactly)
   - Track 7: `Meleğim` — `Soolking feat. Dadju` (Replaces We Maloh per instructions)
   - Track 8: `Ray'a` — `Amr Diab` (Visual card 100% identical to others; clicking strictly does NOT start audio per master prompt rules)
   - Track 9: `La misère est si belle` — `PNL`

---

## 🛠️ Project Structure

```
.
├── .github/workflows/deploy.yml  # GitHub Actions automated deployment
├── public/
│   └── audio/                    # Place authorized MP3 audio files here
│       └── ambient_preview.wav   # Optional 24s synthesized test loop for local dev
├── src/
│   ├── components/
│   │   ├── AtmosphereCanvas.tsx  # Twinkling stars, shooting stars, petals
│   │   ├── BottomPlayer.tsx      # Full floating bottom music bar
│   │   ├── Footer.tsx            # Approved footer component
│   │   ├── HeroSection.tsx       # Headings and approved birthday message
│   │   ├── Navbar.tsx            # Navigation & top-right music controller
│   │   ├── OpeningEnvelope.tsx   # 3D interactive envelope & wax seal
│   │   ├── PlaylistSection.tsx   # 8-card responsive carousel & playlist
│   │   ├── ScenicBackground.tsx  # Crescent moon, lake, mountains & lanterns
│   │   └── SongArtwork.tsx       # Bespoke artwork renderer for all 8 tracks
│   ├── context/
│   │   └── AudioContext.tsx      # Unified audio player engine & state
│   ├── data/
│   │   └── tracks.ts             # 8 approved tracks metadata & behavior rules
│   ├── App.tsx                   # Master orchestration component
│   ├── index.css                 # Neon glow, glassmorphism, responsive styles
│   └── main.tsx                  # React DOM root entry
├── index.html                    # Fonts, favicon, viewport & SEO setup
├── vite.config.ts                # Vite config with Tailwind v4 & relative base
└── package.json                  # Dependencies & build scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher recommended; verified on Node v24)
- npm (v9 or higher)

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` to explore the experience locally.

### 4. Build for Production
```bash
npm run build
```
The static website bundle will be compiled into the `dist/` directory, ready to be hosted anywhere.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🎵 Audio Files & Connected Tracks

The audio files placed in `public/audio/` are connected to the playlist entries:

1. **`Uranus` — `PNL`**
   - File: `public/audio/Uranus(256k) (1).mp3`
   - Role: Background track (initiates on envelope click) and playable playlist entry #1.
2. **`J'oublie tout` — `Jul`**
   - File: `public/audio/Jul_-_J_oublie_tout_[Son_Officiel](256k) (1).mp3`
   - Role: Playable playlist entry #2.
3. **`Despacito` — `Luis Fonsi`**
   - File: `public/audio/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee(256k) (1).mp3`
   - Role: Playable playlist entry #3.
4. **`À l'ammoniaque` — `PNL`**
   - File: `public/audio/PNL_-_A_l_Ammoniaque_[Clip_Officiel](256k).mp3`
   - Role: Playable playlist entry #4.
5. **`Sometimes It Is Hard to Face Reality` — `Unknown`**
   - File: `public/audio/Poo_Bear_ft_Justin_Bieber_Jay_Electronica_Hard_2_Face_Reality_Lyric.mp3`
   - Role: Playable playlist entry #5. Metadata preserved exactly per specifications.
6. **`ضيعت عليه العمر يبويا` — `Unknown`**
   - File: `public/audio/Abdel_Halim_Hafez_Ala_Hesb_Wedad_عبد_الحليم_حافظ_على_حسب_وداد_قلبى256k.mp3`
   - Role: Playable playlist entry #6. Verified as the classic song containing this verse ("على حسب وداد قلبي"); exact Arabic title and Unknown artist preserved per specifications.
7. **`Meleğim` — `Soolking feat. Dadju`**
   - File: `public/audio/Soolking_feat_Dadju_Meleğim_Clip_Officiel_Prod_by_Nyadjiko256k.mp3`
   - Role: Playable playlist entry #7.
8. **`Ray'a` — `Amr Diab`**
   - File: None (`src: null`).
   - Role: Playlist entry #8. Visually identical to other cards; clicking strictly does not start audio.
9. **`La misère est si belle` — `PNL`**
   - File: `public/audio/PNL_-_La_misère_est_si_belle__Clip_Vidéo_(256k).mp3`
   - Role: Playable playlist entry #9. Verified and connected.

---

## 🌐 GitHub Pages Deployment Guide

The project is pre-configured for GitHub Pages static hosting using relative asset paths (`base: './'`).

### Automated Deployment via GitHub Actions
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of premium birthday surprise website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository, navigate to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your site at `https://<your-username>.github.io/<your-repo-name>/`.
