// Utility to generate distinct PNG car images for each color option on canvas
const imageCache = new Map();

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h, s, l];
}

function hslToRgb(h, s, l) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function generateColoredCarImage(baseImageUrl, hexColor, callback) {
  if (!baseImageUrl || !hexColor) return callback(baseImageUrl);

  const cacheKey = `${baseImageUrl}_${hexColor}`;
  if (imageCache.has(cacheKey)) {
    return callback(imageCache.get(cacheKey));
  }

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = baseImageUrl;

  img.onload = () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Target color RGB & HSL
      const rT = parseInt(hexColor.slice(1, 3), 16);
      const gT = parseInt(hexColor.slice(3, 5), 16);
      const bT = parseInt(hexColor.slice(5, 7), 16);
      const [hT, sT, lT] = rgbToHsl(rT, gT, bT);

      // If target color is liquid silver (#d1d5db), use base image
      if (hexColor.toLowerCase() === "#d1d5db" || hexColor.toLowerCase() === "#f8fafc") {
        imageCache.set(cacheKey, baseImageUrl);
        return callback(baseImageUrl);
      }

      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha < 15) continue; // Skip background transparency

        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const [h, s, l] = rgbToHsl(r, g, b);

        // Identify body paint pixels (light metallic surfaces, avoiding glass/wheels/shadows)
        const isBodyPaint = l > 0.15 && l < 0.94 && s < 0.35;

        if (isBodyPaint) {
          // Calculate new lightness matching target tone while preserving highlights & shadows
          const targetLightness = Math.max(0.08, Math.min(0.92, (l * 0.4) + (lT * 0.6)));
          const targetSat = Math.max(0.15, sT);

          const [nR, nG, nB] = hslToRgb(hT, targetSat, targetLightness);

          // Specular highlights & reflections preservation factor
          const blend = 0.88;
          data[i]     = Math.round(nR * blend + r * (1 - blend));
          data[i + 1] = Math.round(nG * blend + g * (1 - blend));
          data[i + 2] = Math.round(nB * blend + b * (1 - blend));
        }
      }

      ctx.putImageData(imgData, 0, 0);
      const resultDataUrl = canvas.toDataURL("image/png");
      imageCache.set(cacheKey, resultDataUrl);
      callback(resultDataUrl);
    } catch (e) {
      console.warn("Canvas image recolor fallback:", e);
      callback(baseImageUrl);
    }
  };

  img.onerror = () => {
    callback(baseImageUrl);
  };
}
