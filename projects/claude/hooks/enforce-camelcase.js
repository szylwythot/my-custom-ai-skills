import { readFileSync, appendFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
  const raw = readFileSync(0, 'utf8');
  const input = JSON.parse(raw);
  const toolInput = input.tool_input || {};
  const filePath = toolInput.file_path || '';
  const content = toolInput.content || toolInput.new_string || '';

  appendFileSync(
    join(__dirname, 'debug.log'),
    JSON.stringify({ tool_name: input.tool_name, keys: Object.keys(toolInput), filePath, snippet: content.slice(0, 120) }) + '\n'
  );

  if (/\.ts$/.test(filePath) && !/\.tsx$/.test(filePath) && /(function\s+[A-Z]|const\s+[A-Z][a-z])/.test(content)) {
    process.stdout.write('BLOCKED: PascalCase name in ' + filePath + '. Team rule: use camelCase.\n');
    process.exit(2);
  }
} catch (e) {
  appendFileSync(
    join(__dirname, 'debug.log'),
    'ERROR: ' + e.message + '\n'
  );
  process.stdout.write('CHECK-NAMING ERROR: ' + e.message + '\n');
  process.exit(0);
}
