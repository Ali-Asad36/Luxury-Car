let audioCtx = null;
let unlocked = false;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

export function unlockAudio() {
  const ctx = getCtx();
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  unlocked = true;
}

function now() {
  return getCtx().currentTime;
}

function tone(freq, start, duration, { type = "sine", gain = 0.08, endGain = 0.001 } = {}) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.008);
  g.gain.exponentialRampToValueAtTime(endGain, start + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

function sweep(startFreq, endFreq, start, duration, { gain = 0.06 } = {}) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(startFreq, start);
  osc.frequency.exponentialRampToValueAtTime(endFreq, start + duration);
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

function noiseBurst(start, duration, { gain = 0.04 } = {}) {
  const ctx = getCtx();
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1200, start);
  filter.frequency.exponentialRampToValueAtTime(400, start + duration);
  filter.Q.value = 2;
  const g = ctx.createGain();
  g.gain.setValueAtTime(gain, start);
  g.gain.exponentialRampToValueAtTime(0.001, start + duration);
  source.connect(filter);
  filter.connect(g);
  g.connect(ctx.destination);
  source.start(start);
  source.stop(start + duration + 0.02);
}

export function playSound(name) {
  if (!unlocked) return;
  const t = now();

  switch (name) {
    case "click":
      tone(880, t, 0.06, { gain: 0.07 });
      tone(1320, t + 0.012, 0.04, { gain: 0.035 });
      break;

    case "nav":
      tone(620, t, 0.05, { gain: 0.06 });
      sweep(620, 980, t + 0.03, 0.12, { gain: 0.05 });
      break;

    case "transition":
      noiseBurst(t, 0.28, { gain: 0.035 });
      sweep(280, 720, t, 0.32, { gain: 0.045 });
      tone(440, t + 0.18, 0.2, { gain: 0.025, type: "triangle" });
      break;

    case "select":
      tone(520, t, 0.08, { gain: 0.07 });
      tone(780, t + 0.06, 0.1, { gain: 0.06 });
      tone(1040, t + 0.12, 0.12, { gain: 0.045 });
      break;

    case "hover":
      tone(640, t, 0.04, { gain: 0.025, type: "triangle" });
      break;

    case "tab":
      tone(700, t, 0.05, { gain: 0.055 });
      tone(950, t + 0.04, 0.06, { gain: 0.04 });
      break;

    case "color":
      tone(560, t, 0.07, { gain: 0.065, type: "triangle" });
      sweep(560, 840, t + 0.02, 0.1, { gain: 0.04 });
      break;

    case "success":
      [523, 659, 784, 1047].forEach((f, i) => {
        tone(f, t + i * 0.09, 0.18, { gain: 0.06 - i * 0.008, type: "triangle" });
      });
      break;

    case "remove":
      sweep(600, 220, t, 0.18, { gain: 0.05 });
      tone(180, t + 0.12, 0.1, { gain: 0.04, type: "square" });
      break;

    case "confirm":
      tone(440, t, 0.1, { gain: 0.07 });
      tone(554, t + 0.08, 0.1, { gain: 0.065 });
      tone(659, t + 0.16, 0.15, { gain: 0.06 });
      tone(880, t + 0.24, 0.25, { gain: 0.055, type: "triangle" });
      break;

    case "pulse":
      tone(320, t, 0.15, { gain: 0.02, type: "sine" });
      break;

    default:
      tone(660, t, 0.05, { gain: 0.06 });
  }
}

export function bindClickSound(handler, sound = "click") {
  return (...args) => {
    playSound(sound);
    return handler?.(...args);
  };
}
