/**
 * Single image generator — Gemini API
 * Usage: node gen-one.mjs <index>
 *   0 = hero-robot
 *   1 = hero-bg
 *   2 = pillar-software
 *   3 = pillar-ai
 *   4 = pillar-data
 */
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = 'AIzaSyC8a-sUf7jdMglj2UWYaDjfSHSSGz6KcJg';
const MODEL = 'gemini-3.1-flash-image-preview';
const OUTPUT_DIR = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const NO_TEXT = 'No text, no letters, no words, no logo, no watermark.';

const PROMPTS = [
    { name: 'hero-robot', prompt: `Generate an image: Cinematic portrait of a futuristic female AI robot, white silver metallic skin, glowing blue eyes, dark tech background with blue and orange particles. 8K quality. ${NO_TEXT}` },
    { name: 'hero-bg', prompt: `Generate an image: Dark futuristic abstract technology background, deep navy blue, floating digital data streams, neural network lights in electric blue and orange, bokeh effect. Wide panoramic. ${NO_TEXT}` },
    { name: 'pillar-software', prompt: `Generate an image: Young developer coding at dark workstation with multiple monitors showing code, blue ambient lighting, side profile, cinematic photography. ${NO_TEXT}` },
    { name: 'pillar-ai', prompt: `Generate an image: Close-up of sophisticated humanoid robot head, white metallic with blue glowing sensors, dark background with data particles, cinematic lighting. ${NO_TEXT}` },
    { name: 'pillar-data', prompt: `Generate an image: Data analyst at monitors with data dashboards and charts in blue colors, dark office, screen glow, side view, cinematic. ${NO_TEXT}` },
];

const idx = parseInt(process.argv[2] ?? '-1', 10);
if (idx < 0 || idx >= PROMPTS.length) {
    console.log('Usage: node gen-one.mjs <0-4>');
    PROMPTS.forEach((p, i) => console.log(`  ${i} = ${p.name}`));
    process.exit(0);
}

const imageConfig = PROMPTS[idx];
console.log(`🎨 Generating: ${imageConfig.name}`);
console.log(`📝 Prompt: ${imageConfig.prompt}`);

const body = JSON.stringify({
    contents: [{ parts: [{ text: imageConfig.prompt }] }],
    generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
});

const url = new URL(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`);

const options = {
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
    },
    timeout: 300000, // 5 min timeout
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        if (res.statusCode !== 200) {
            console.error(`❌ API Error ${res.statusCode}:`, data.substring(0, 500));
            process.exit(1);
        }

        try {
            const json = JSON.parse(data);
            const parts = json.candidates?.[0]?.content?.parts || [];

            for (const part of parts) {
                if (part.inlineData) {
                    const buffer = Buffer.from(part.inlineData.data, 'base64');
                    const outputPath = path.join(OUTPUT_DIR, `${imageConfig.name}.png`);
                    fs.writeFileSync(outputPath, buffer);
                    console.log(`✅ Saved: ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
                    process.exit(0);
                }
            }

            console.log('⚠️ No image in response');
            if (parts.length > 0 && parts[0].text) {
                console.log('Text response:', parts[0].text.substring(0, 200));
            }
            process.exit(1);
        } catch (e) {
            console.error('❌ Parse error:', e.message);
            process.exit(1);
        }
    });
});

req.on('timeout', () => {
    console.error('❌ Request timed out after 5 minutes');
    req.destroy();
    process.exit(1);
});

req.on('error', (e) => {
    console.error('❌ Request error:', e.message);
    process.exit(1);
});

req.write(body);
req.end();

console.log('⏳ Waiting for Gemini API response (this may take 1-2 minutes)...');
