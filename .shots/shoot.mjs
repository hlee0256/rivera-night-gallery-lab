// Screenshot bot: real device emulation via CDP (no installs).
// usage: node shoot.mjs <url> <outPrefix> <mode:desktop|mobile> [maxShots]
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const [, , url, prefix, mode = 'desktop', maxShotsArg = '14'] = process.argv;
if (!url || !prefix) { console.error('need url prefix'); process.exit(1); }
const MAXSHOTS = parseInt(maxShotsArg, 10);
const OUT = new URL('.', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const PORT = 9339 + Math.floor(Math.random() * 40);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const udd = `/tmp/cdp-shots-${PORT}`;
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  '--force-color-profile=srgb', '--remote-debugging-port=' + PORT,
  `--user-data-dir=${udd}`, '--no-first-run', 'about:blank'
], { stdio: 'ignore' });

const sleep = ms => new Promise(r => setTimeout(r, ms));
async function getTarget() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const tabs = await r.json();
      const page = tabs.find(t => t.type === 'page');
      if (page && page.webSocketDebuggerUrl) return page;
    } catch {}
    await sleep(250);
  }
  throw new Error('chrome did not open debug port');
}

const target = await getTarget();
const ws = new WebSocket(target.webSocketDebuggerUrl);
let id = 0; const pending = new Map();
ws.onmessage = ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
};
function send(method, params = {}) {
  return new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
}
await new Promise(r => { ws.onopen = r; });

const mob = mode === 'mobile';
const W = mob ? 390 : 1440, H = mob ? 844 : 900, DSF = mob ? 2 : 1;

await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: DSF, mobile: mob });
await send('Page.enable');
await send('Runtime.enable');
await send('Page.navigate', { url });
await sleep(3000); // fonts + entrance animations

async function evaljs(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
  return r.result?.result?.value;
}
const docH = await evaljs('document.documentElement.scrollHeight');
console.log('docHeight:', docH);

let n = 0;
for (let y = 0; y < docH && n < MAXSHOTS; y += Math.floor(H * 0.85)) {
  if (n > 0) {
    await evaljs(`window.scrollTo(0,${y})`);
    await sleep(1400); // let reveal transitions finish
  }
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  const f = path.join(OUT, `${prefix}-${String(n).padStart(2, '0')}.png`);
  writeFileSync(f, Buffer.from(shot.result.data, 'base64'));
  console.log('shot', f, 'atY', y);
  n++;
  if (y + H >= docH) break;
}
// also capture an EN-toggle shot of the top for copy review (loop bots use it)
await evaljs('window.scrollTo(0,0)');
await evaljs(`document.getElementById('lang') && document.getElementById('lang').click()`);
await sleep(600);
const shotEN = await send('Page.captureScreenshot', { format: 'png' });
writeFileSync(path.join(OUT, `${prefix}-en.png`), Buffer.from(shotEN.result.data, 'base64'));
console.log('shot EN top');

ws.close(); chrome.kill(); process.exit(0);
