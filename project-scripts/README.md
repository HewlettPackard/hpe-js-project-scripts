# Project Scripts

Commonly used scripts to bootstrap your project. This package currently supports eslint and prettier. Jest support is currently on the roadmap.

### To setup eslint

1. create a `.eslintrc.js` in your project's root folder
2. Add the following snippet to your eslintrc file

```javascript
const scripts = require('@karatechops/project-scripts');
module.exports = scripts.eslint;
```

3. Create a .eslintignore file. This file will vary depending on your project structure, here is a good starting point

```
node_modules/
coverage/
dist/
build/
prod/
out/
.next/
.cache/
public/
yarn.lock
package-lock.json
```

### To setup prettier

Prettier requires some setup on your IDE's end. The following instructions are for VS Code users.

1. Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) from the marketplace.

2. In your VS Code settings (Preferences -> Settings) click the curly brackets icon in the top right to enable the plain text settings view and add the following:

```
// Set the default
"editor.formatOnSave": false,
// Enable per-language
"[javascript]": {
    "editor.formatOnSave": true
}
```

3. Create a `.prettierrc.js` in your project's root folder.

4. Add the following to your prettierrc:

```
const scripts = require('@karatechops/project-scripts');
module.exports = scripts.prettier;
```

5. Create a `.prettierignore` in your root folder.

6. Similarly to eslint's ignore, the contents of this file will depend on your project's structure. Here's a good starting point:

```
package-lock.json
yarn.lock
.cache
public/
node_modules/
build/
dist/
```
