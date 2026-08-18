/**
 * Fix broken nested <script> from restore-dual-flywheels patch.
 * Pattern: <script>\n\n<script>toggle...</script>\n\nfunction toggleMobileMenu...
 * Becomes one clean script block.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const files = [
  'sequoia-legacy.html',
  'barn-pods.html',
  'k9-lifeline.html',
  'new-beginnings.html',
  'pay-it-forward.html',
  'mercy-blueprint.html'
];

const re = /<script>\s*<script>\s*function toggleProgramsDropdown[\s\S]*?<\/script>\s*(function toggleMobileMenu[\s\S]*?<\/script>)/;

const report = [];
for (const file of files) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    report.push(file + ': skip missing');
    continue;
  }
  let html = fs.readFileSync(full, 'utf8');
  if (!/<script>\s*<script>\s*function toggleProgramsDropdown/.test(html)) {
    report.push(file + ': already clean');
    continue;
  }
  const next = html.replace(re, function (_m, rest) {
    return '<script>\nfunction toggleProgramsDropdown(e) {\n' +
      " if (e) e.preventDefault();\n" +
      " var menu = document.getElementById('programs-menu');\n" +
      " var chev = document.getElementById('programs-chevron');\n" +
      ' if (!menu) return;\n' +
      " menu.classList.toggle('hidden');\n" +
      " if (chev) chev.style.transform = menu.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';\n" +
      ' if (window.SHHProgFlywheelNav && window.SHHProgFlywheelNav.init) {\n' +
      '  try { window.SHHProgFlywheelNav.init(); } catch (err) {}\n' +
      ' }\n' +
      '}\n' +
      "document.addEventListener('click', function (ev) {\n" +
      " var dd = document.getElementById('programs-dropdown');\n" +
      " var menu = document.getElementById('programs-menu');\n" +
      ' if (dd && menu && !dd.contains(ev.target)) {\n' +
      "  menu.classList.add('hidden');\n" +
      "  var chev = document.getElementById('programs-chevron');\n" +
      "  if (chev) chev.style.transform = 'rotate(0deg)';\n" +
      ' }\n' +
      '});\n\n' +
      rest;
  });
  if (next === html) {
    report.push(file + ': regex miss');
    continue;
  }
  fs.writeFileSync(full, next);
  report.push(file + ': fixed');
}
console.log(report.join('\n'));
