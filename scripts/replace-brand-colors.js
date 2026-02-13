/**
 * Script to replace hardcoded brand colors with dynamic CSS variables
 * Run with: node scripts/replace-brand-colors.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Color replacement mappings
const replacements = [
  // Tailwind classes
  { pattern: /\bbg-purple-600\b/g, replacement: 'bg-primary' },
  { pattern: /\bbg-purple-700\b/g, replacement: 'bg-primary' },
  { pattern: /\bbg-violet-600\b/g, replacement: 'bg-primary' },
  { pattern: /\bbg-violet-700\b/g, replacement: 'bg-primary' },
  { pattern: /\btext-purple-600\b/g, replacement: 'text-primary' },
  { pattern: /\btext-purple-700\b/g, replacement: 'text-primary' },
  { pattern: /\btext-violet-600\b/g, replacement: 'text-primary' },
  { pattern: /\btext-violet-700\b/g, replacement: 'text-primary' },
  { pattern: /\bborder-purple-600\b/g, replacement: 'border-primary' },
  { pattern: /\bborder-violet-600\b/g, replacement: 'border-primary' },
  { pattern: /\bhover:bg-purple-700\b/g, replacement: 'hover:bg-primary/90' },
  { pattern: /\bhover:bg-violet-700\b/g, replacement: 'hover:bg-primary/90' },
  { pattern: /\bhover:text-purple-600\b/g, replacement: 'hover:text-primary' },
  { pattern: /\bhover:text-violet-600\b/g, replacement: 'hover:text-primary' },
  { pattern: /\bfrom-purple-600\b/g, replacement: 'from-primary' },
  { pattern: /\bfrom-violet-600\b/g, replacement: 'from-primary' },
  { pattern: /\bto-blue-600\b/g, replacement: 'to-accent' },
  { pattern: /\bbg-purple-50\b/g, replacement: 'bg-primary/5' },
  { pattern: /\bbg-violet-50\b/g, replacement: 'bg-primary/5' },
  { pattern: /\bbg-purple-100\b/g, replacement: 'bg-primary/10' },
  { pattern: /\bbg-violet-100\b/g, replacement: 'bg-primary/10' },
  
  // Inline hex colors in style attributes
  { pattern: /#7c3aed/g, replacement: 'var(--brand-primary, #0066cc)' },
  { pattern: /#2563eb/g, replacement: 'var(--brand-accent, #10b981)' },
  
  // Gradient backgrounds
  { 
    pattern: /linear-gradient\(135deg,\s*#7c3aed\s+0%,\s*#2563eb\s+100%\)/g, 
    replacement: 'linear-gradient(135deg, var(--brand-primary, #7c3aed), var(--brand-accent, #2563eb))' 
  },
  { 
    pattern: /from-violet-600\s+to-blue-600/g, 
    replacement: 'from-primary to-accent' 
  },
  { 
    pattern: /from-purple-600\s+to-blue-600/g, 
    replacement: 'from-primary to-accent' 
  },
];

// Files to process
const patterns = [
  'apps/web/src/**/*.tsx',
  'apps/web/src/**/*.ts',
  '!apps/web/src/**/*.test.{ts,tsx}',
  '!apps/web/src/**/*.spec.{ts,tsx}',
];

// Files to skip (already updated or special cases)
const skipFiles = [
  'branding-context.tsx',
  'brand-colors.ts',
  'tailwind.config.ts',
];

let filesProcessed = 0;
let totalReplacements = 0;

function shouldSkipFile(filePath) {
  return skipFiles.some(skip => filePath.includes(skip));
}

function processFile(filePath) {
  if (shouldSkipFile(filePath)) {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let fileReplacements = 0;
  let modified = false;

  replacements.forEach(({ pattern, replacement }) => {
    const matches = content.match(pattern);
    if (matches) {
      content = content.replace(pattern, replacement);
      fileReplacements += matches.length;
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesProcessed++;
    totalReplacements += fileReplacements;
    console.log(`✓ ${path.relative(process.cwd(), filePath)} (${fileReplacements} replacements)`);
  }
}

console.log('🎨 Replacing hardcoded brand colors with dynamic CSS variables...\n');

patterns.forEach(pattern => {
  const files = glob.sync(pattern, { 
    cwd: process.cwd(),
    absolute: true,
    ignore: ['**/node_modules/**', '**/.next/**', '**/dist/**']
  });
  
  files.forEach(processFile);
});

console.log(`\n✅ Complete! Processed ${filesProcessed} files with ${totalReplacements} total replacements.`);
console.log('\n📝 Next steps:');
console.log('1. Review changes with git diff');
console.log('2. Test the app to ensure colors work correctly');
console.log('3. Test with custom branding in Settings → Branding');
console.log('4. Commit changes');
