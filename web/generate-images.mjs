/**
 * Image Generator — Gemini 3.1 Flash Image Preview
 * Generates one image at a time to avoid timeouts
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = 'AIzaSyC8a-sUf7jdMglj2UWYaDjfSHSSGz6KcJg';
const MODEL = 'gemini-3.1-flash-image-preview';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
const OUTPUT_DIR = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const NO_TEXT = 'Do not include any text, typography, letters, words, logos, watermarks, or signage in the image. Clean image only.';

// Which image to generate (pass as CLI arg: node generate-images.mjs 0)
const imageIndex = parseInt(process.argv[2] ?? '0', 10);

const IMAGES = [
    {
        name: 'hero-robot',
        prompt: `Hyper-realistic cinematic portrait of a futuristic female AI humanoid robot. Sleek white and silver metallic shell with translucent panels showing glowing blue neural circuits. Bright electric blue LED eyes. Dark tech lab background with floating holographic particles in blue and orange. Dramatic rim lighting, volumetric rays. Chest-up shot, slight angle. Ultra HD 8K quality. ${NO_TEXT}`,
    },
    {
        name: 'hero-bg',
        prompt: `Abstract dark futuristic technology background. Deep navy blue base (#0A2540). Floating streams of digital data, neural network connections, glowing particles. Electric blue (#00C2FF) and orange (#FF6A3D) light streaks. Bokeh orbs. Wide cinematic panoramic. Perfect for website hero background. ${NO_TEXT}`,
    },
    {
        name: 'pillar-software',
        prompt: `Professional photograph of a young male developer coding at a high-tech workstation with multiple curved monitors showing colorful code. Dark modern office with blue ambient LED lighting. Side profile, medium shot. Screen glow illuminates face. Shallow depth of field. Cinematic. ${NO_TEXT}`,
    },
    {
        name: 'pillar-ai',
        prompt: `Cinematic close-up of a sophisticated humanoid robot head and upper torso. Metallic white and dark gray materials with exposed mechanical details. Glowing blue sensors and eyes. Dark background with floating digital data particles. Blue and orange accent lighting. Dramatic portrait composition. ${NO_TEXT}`,
    },
    {
        name: 'pillar-data',
        prompt: `Professional photo of a young analyst looking at large monitors displaying real-time data dashboards with blue charts, graphs, and analytics. Dark control room environment with ambient screen glow. Side view, medium shot. Cinematic lighting. ${NO_TEXT}`,
    },
];

async function generateImage(imageConfig) {
    console.log(`\n🎨 Generating: ${imageConfig.name}...`);
    console.log(`   Prompt: ${imageConfig.prompt.substring(0, 100)}...`);

    const requestBody = {
        contents: [{
            parts: [{ text: imageConfig.prompt }],
        }],
        generationConfig: {
            responseModalities: ['TEXT', 'IMAGE'],
        },
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000); // 2 min timeout

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
            signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`   ❌ API Error ${response.status}:`, errorText.substring(0, 500));
            return false;
        }

        const data = await response.json();
        const parts = data.candidates?.[0]?.content?.parts || [];

        for (const part of parts) {
            if (part.inlineData) {
                const buffer = Buffer.from(part.inlineData.data, 'base64');
                const ext = (part.inlineData.mimeType || '').includes('png') ? 'png' : 'png';
                const outputPath = path.join(OUTPUT_DIR, `${imageConfig.name}.${ext}`);
                fs.writeFileSync(outputPath, buffer);
                console.log(`   ✅ Saved: ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
                return true;
            }
        }

        console.log('   ⚠️ No image data in response.');
        console.log('   Response parts:', JSON.stringify(parts.map(p => Object.keys(p)), null, 2));
        return false;
    } catch (error) {
        clearTimeout(timeout);
        if (error.name === 'AbortError') {
            console.error('   ❌ Request timed out (120s)');
        } else {
            console.error(`   ❌ Error:`, error.message);
        }
        return false;
    }
}

async function main() {
    if (imageIndex >= 0 && imageIndex < IMAGES.length) {
        // Generate single image
        const ok = await generateImage(IMAGES[imageIndex]);
        process.exit(ok ? 0 : 1);
    } else if (imageIndex === 99) {
        // Generate ALL images sequentially
        console.log(`\n🚀 Generating ALL ${IMAGES.length} images...\n`);
        let success = 0;
        for (let i = 0; i < IMAGES.length; i++) {
            const ok = await generateImage(IMAGES[i]);
            if (ok) success++;
            if (i < IMAGES.length - 1) {
                console.log('   ⏳ Waiting 5s...');
                await new Promise(r => setTimeout(r, 5000));
            }
        }
        console.log(`\n✅ Done: ${success}/${IMAGES.length} images generated.`);
        process.exit(success === IMAGES.length ? 0 : 1);
    } else {
        console.log('Usage: node generate-images.mjs [0-4|99]');
        console.log('  0 = hero-robot');
        console.log('  1 = hero-bg');
        console.log('  2 = pillar-software');
        console.log('  3 = pillar-ai');
        console.log('  4 = pillar-data');
        console.log('  99 = ALL images');
    }
}

main();
