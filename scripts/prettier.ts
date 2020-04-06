/**
 * copy to https://github.com/facebook/react/blob/master/scripts/prettier/index.js
 * prettier api doc https://prettier.io/docs/en/api.html
 *----------*****--------------
 *  prettier all js and all css.
 *----------*****--------------
 */

const glob = require('glob');
const prettier = require('prettier');
const fs = require('fs');

const prettierConfigPath = require.resolve('../.prettierrc.json');

let didError = false;

let files = [];
const jsFiles = glob.sync('**/*.js*', {
  ignore: ['**/node_modules/**', 'dist/**', '.git/**', '.idea/**'],
});
const jsxFiles = glob.sync('**/*.jsx*', {
  ignore: ['**/node_modules/**', 'dist/**', '.git/**', '.idea/**'],
});
const tsFiles = glob.sync('**/*.ts*', {
  ignore: ['**/node_modules/**', 'dist/**', '.git/**', '.idea/**'],
});
const tsxFiles = glob.sync('**/*.tsx*', {
  ignore: ['**/node_modules/**', 'dist/**', '.git/**', '.idea/**'],
});
const cssFiles = glob.sync('**/*.less*', {
  ignore: ['**/node_modules/**', 'dist/**', '.git/**', '.idea/**'],
});
const eslint = glob.sync('eslintrc.js');

files = files.concat(jsFiles);
files = files.concat(jsxFiles);
files = files.concat(tsFiles);
files = files.concat(tsxFiles);
files = files.concat(cssFiles);
files = files.concat(eslint);

if (files.length) {
  files.forEach((file) => {
    const options = prettier.resolveConfig.sync(file, {
      config: prettierConfigPath,
    });
    const fileInfo = prettier.getFileInfo.sync(file);
    if (fileInfo.ignored) {
      return;
    }
    try {
      const input = fs.readFileSync(file, 'utf8');
      const withParserOptions = {
        ...options,
        parser: fileInfo.inferredParser,
      };
      const output = prettier.format(input, withParserOptions);
      if (output !== input) {
        fs.writeFileSync(file, output, 'utf8');
        console.log(`\x1b[34m ${file} is prettier`);
      }
    } catch (e) {
      didError = true;
    }
  });

  if (didError) {
    process.exit(1);
  }
  console.log('\x1b[32m prettier success!');
}
