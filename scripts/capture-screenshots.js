import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function captureScreenshots() {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2, // High resolution
  });
  
  const page = await context.newPage();
  const baseUrl = 'http://localhost:3001';
  const outDir = path.join(__dirname, '..', 'public', 'screenshots');

  try {
    // 1. Dashboard
    console.log('Capturing Dashboard...');
    await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
    await new Promise(r => setTimeout(r, 1000)); // wait for any animations
    await page.screenshot({ path: path.join(outDir, 'dashboard.png') });

    // 2. Pipeline
    console.log('Capturing Pipeline...');
    await page.goto(`${baseUrl}/pipeline`, { waitUntil: 'networkidle' });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(outDir, 'pipeline.png') });

    // 3. Leads List
    console.log('Capturing Leads List...');
    await page.goto(`${baseUrl}/leads`, { waitUntil: 'networkidle' });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(outDir, 'leads.png') });

    // 4. Lead Details
    console.log('Capturing Lead Details...');
    // We need an ID, let's just go to the leads page, extract an ID and navigate
    const firstLeadLink = await page.getAttribute('table tbody tr:first-child a', 'href');
    if (firstLeadLink) {
        await page.goto(`${baseUrl}${firstLeadLink}`, { waitUntil: 'networkidle' });
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({ path: path.join(outDir, 'detail.png') });
    } else {
        console.log('No lead link found.');
    }

    console.log('Screenshots captured successfully!');
  } catch (err) {
    console.error('Error capturing screenshots:', err);
  } finally {
    await browser.close();
  }
}

captureScreenshots();
