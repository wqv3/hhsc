const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const Workspace = path.join(__dirname, 'sessions');
  if (!fs.existsSync(Workspace)) {
    fs.mkdirSync(Workspace);
  }

  const Session = fs.readdirSync(Workspace).length + 1;
  const SessionIn = path.join(Workspace, `session_${Session}`);
  fs.mkdirSync(SessionIn);

  const scUnit = await puppeteer.launch({
    headless: true,
  });

  const page = await scUnit.newPage();

  await page.setRequestInterception(true);

  let requestCount = 0;

  // brainrot algo
  page.on('request', (request) => {
    requestCount++;
    const url = request.url();
    const headers = request.headers();

    const scUnitResult = [
      `➡️ Request to: ${url}`, 'Headers:', JSON.stringify(headers, null, 2) ].join('\n\n');

    const Path = path.join(SessionIn, `request_${requestCount}.txt`);
    fs.writeFileSync(Path, scUnitResult);

    request.continue();
  });

  try {
    await page.goto('url', { // <------------ url 
      waitUntil: 'networkidle2',
      timeout: 30000
    });
  } catch (err) {
    console.error('err:', err.message);
  }

  await scUnit.close();
})();
