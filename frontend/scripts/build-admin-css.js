const path = require('path');
const fs = require('fs');

const sass = require('sass');

const projectRoot = path.resolve(__dirname, '..');
const entry = path.resolve(projectRoot, 'scss', 'admin.scss');
const outDir = path.resolve(projectRoot, 'admin', 'assets', 'css');
const outFile = path.join(outDir, 'main.css');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

ensureDir(outDir);

const result = sass.compile(entry, {
  loadPaths: [path.resolve(projectRoot, 'scss')],
  style: 'compressed',
});

fs.writeFileSync(outFile, result.css, 'utf8');
console.log(`Built admin CSS -> ${path.relative(process.cwd(), outFile)}`);

