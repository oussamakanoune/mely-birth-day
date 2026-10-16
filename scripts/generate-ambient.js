import fs from 'fs';
import path from 'path';

// Generate a soothing, dreamy ambient track for birthday surprise
const sampleRate = 44100;
const duration = 24; // 24 seconds loop
const numSamples = sampleRate * duration;
const numChannels = 2;
const bytesPerSample = 2; // 16-bit
const blockAlign = numChannels * bytesPerSample;
const byteRate = sampleRate * blockAlign;
const dataSize = numSamples * blockAlign;

const buffer = Buffer.alloc(44 + dataSize);

// RIFF chunk descriptor
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);

// fmt sub-chunk
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
buffer.writeUInt16LE(1, 20);  // AudioFormat (1 = PCM)
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(blockAlign, 32);
buffer.writeUInt16LE(16, 34); // BitsPerSample (16)

// data sub-chunk
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

// Chords: Dm9, Bbmaj7, Fmaj7, C/E (dreamy, cinematic, relaxing night mood)
// Frequencies in Hz:
const chords = [
  // Chord 1: D3 (146.8), F3 (174.6), A3 (220.0), C4 (261.6), E4 (329.6)
  [146.83, 174.61, 220.00, 261.63, 329.63],
  // Chord 2: Bb2 (116.5), D3 (146.8), F3 (174.6), A3 (220.0), C4 (261.6)
  [116.54, 146.83, 174.61, 220.00, 261.63],
  // Chord 3: F2 (87.3), C3 (130.8), F3 (174.6), A3 (220.0), C4 (261.6), E4 (329.6)
  [87.31, 130.81, 174.61, 220.00, 261.63, 329.63],
  // Chord 4: C3 (130.8), E3 (164.8), G3 (196.0), B3 (246.9), D4 (293.7)
  [130.81, 164.81, 196.00, 246.94, 293.66],
];

// Chimes / bell notes at specific times
const bells = [
  { time: 1.0, freq: 523.25 }, // C5
  { time: 2.5, freq: 659.25 }, // E5
  { time: 4.0, freq: 783.99 }, // G5
  { time: 5.2, freq: 987.77 }, // B5
  { time: 7.0, freq: 880.00 }, // A5
  { time: 8.5, freq: 659.25 }, // E5
  { time: 10.0, freq: 587.33 }, // D5
  { time: 11.5, freq: 698.46 }, // F5
  { time: 13.0, freq: 880.00 }, // A5
  { time: 15.0, freq: 1046.50 }, // C6
  { time: 17.0, freq: 783.99 }, // G5
  { time: 19.5, freq: 659.25 }, // E5
  { time: 21.0, freq: 587.33 }, // D5
  { time: 22.5, freq: 523.25 }, // C5
];

let offset = 44;
for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  const chordIdx = Math.floor((t % 24) / 6);
  const currentChord = chords[chordIdx];
  const chordTime = (t % 6);

  // Soft envelope for pad chord
  const padAttack = Math.min(chordTime / 1.2, 1.0);
  const padRelease = Math.min((6 - chordTime) / 1.0, 1.0);
  const padEnv = padAttack * padRelease * 0.18;

  let left = 0;
  let right = 0;

  // Add chord pad notes with subtle stereo detuning
  for (let c = 0; c < currentChord.length; c++) {
    const freq = currentChord[c];
    // Gentle sine + soft second harmonic for warm Rhodes/pad sound
    const osc1 = Math.sin(2 * Math.PI * freq * t);
    const osc2 = Math.sin(2 * Math.PI * freq * 2 * t) * 0.25;
    const oscDetunedL = Math.sin(2 * Math.PI * (freq * 1.002) * t) * 0.5;
    const oscDetunedR = Math.sin(2 * Math.PI * (freq * 0.998) * t) * 0.5;

    left += (osc1 + osc2 + oscDetunedL) * padEnv;
    right += (osc1 + osc2 + oscDetunedR) * padEnv;
  }

  // Add crystal bell melody
  for (const bell of bells) {
    const dt = t - bell.time;
    if (dt >= 0 && dt < 4.0) {
      // Bell envelope: instant attack, exponential decay
      const bellEnv = Math.exp(-dt * 2.2) * 0.15;
      const chime = (Math.sin(2 * Math.PI * bell.freq * dt) +
                     Math.sin(2 * Math.PI * bell.freq * 2.75 * dt) * 0.2) * bellEnv;
      // Pan bells slightly
      const pan = (Math.sin(bell.freq) + 1) / 2; // 0 to 1
      left += chime * (1 - pan * 0.6);
      right += chime * (0.4 + pan * 0.6);
    }
  }

  // Master fade in / out at loop edges
  const masterFade = Math.min(t / 0.8, 1.0) * Math.min((duration - t) / 0.8, 1.0);
  left *= masterFade;
  right *= masterFade;

  // Clamp
  const leftClamped = Math.max(-1, Math.min(1, left));
  const rightClamped = Math.max(-1, Math.min(1, right));

  const leftInt16 = Math.floor(leftClamped * 32767);
  const rightInt16 = Math.floor(rightClamped * 32767);

  buffer.writeInt16LE(leftInt16, offset);
  buffer.writeInt16LE(rightInt16, offset + 2);
  offset += 4;
}

const dir = path.join(process.cwd(), 'public', 'audio');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'ambient_preview.wav'), buffer);
console.log('Successfully generated public/audio/ambient_preview.wav (24s ambient loop)');
