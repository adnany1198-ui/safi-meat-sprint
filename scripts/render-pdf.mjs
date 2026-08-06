import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const routes = process.argv.slice(2);
if (!routes.length) {
  console.error('usage: node scripts/render-pdf.mjs /processing.html');
  process.exit(1);
}

mkdirSync('out', { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || '/opt/pw-browsers/chromium',
});
const page = await browser.newPage();

for (const route of routes) {
  await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(() => document.fonts.ready);

  const name = route.replace(/\//g, '-').replace(/^-/, '').replace(/\.html$/, '') || 'index';
  await page.pdf({
    path: `out/${name}.pdf`,
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', right: '18mm', bottom: '20mm', left: '18mm' },
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `<div style="width:100%;font-size:8pt;padding:0 18mm;display:flex;
      justify-content:space-between;opacity:.7;">
      <span class="title"></span>
      <span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
  });
  console.log(`✓ out/${name}.pdf`);
}
await browser.close();
