# gpc-template

![Downloads](https://img.shields.io/npm/dw/gpc-template?style=flat-square)
![Version@npm](https://img.shields.io/npm/v/gpc-template?label=version%40npm&style=flat-square)
![Version@git](https://img.shields.io/github/package-json/v/gherking/gpc-template/master?label=version%40git&style=flat-square)
![CI](https://img.shields.io/github/workflow/status/gherking/gpc-template/CI/master?label=ci&style=flat-square)
![Docs](https://img.shields.io/github/workflow/status/gherking/gpc-template/Docs/master?label=docs&style=flat-square)

This repository is a template to create precompilers for GherKing.

## Usage

```javascript
'use strict';
const compiler = require('gherking');
const {Template} = require('gpc-template');

let ast = compiler.load('./features/src/login.feature');
ast = compiler.process(
    ast,
    new Template({
        // config
    })
);
compiler.save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```

```typescript
'use strict';
import {load, process, save} from "gherking";
import {Template} from "gpc-template";

let ast = load("./features/src/login.feature");
ast = process(
    ast,
    new Template({
        // config
    })
);
save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```

For detailed documentation see the [TypeDocs documentation](https://gherking.github.io/gpc-template/).

This package uses [debug](https://www.npmjs.com/package/debug) for logging.