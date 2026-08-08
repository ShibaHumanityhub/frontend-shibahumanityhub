'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.join(__dirname, '..');
const code = fs.readFileSync(path.join(root, 'js/program-video-amplify.js'), 'utf8');
const sandbox = {
  window: {},
  document: {
    getElementById: () => null,
    head: { appendChild: () => {} },
    createElement: () => ({ setAttribute: () => {}, style: {}, classList: { add: () => {} } })
  },
  location: { pathname: '/programs/x.html' }
};
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const d = fs.readFileSync(path.join(root, 'js/programs-data.js'), 'utf8');
const PV = sandbox.window.SHHProgramVideo;

// Split by id blocks more reliably
const parts = d.split(/\n \{\s*\n id:\s*/);
let ok = 0;
const miss = [];
parts.slice(1).forEach((part) => {
  const id = parseInt(part, 10);
  const title = (part.match(/title:\s*"([^"]+)"/) || [])[1] || '';
  const fm = part.match(/fullHTML:\s*`([\s\S]*?)`\s*(?:,\s*)?$/m) || part.match(/fullHTML:\s*`([\s\S]*?)`/);
  const html = fm ? fm[1] : '';
  const e = PV.extractFirstVideo(html);
  if (e && e.src) {
    ok++;
    console.log('OK', id, title, '->', e.src.split('/').pop());
  } else {
    miss.push(id + ':' + title);
    const hasVid = /<video/i.test(html);
    console.log('MISS', id, title, 'hasVideoTag', hasVid, 'len', html.length);
  }
});
console.log('summary ok', ok, 'miss', miss.length);
if (miss.length) console.log(miss.join('\n'));
