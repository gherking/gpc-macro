# gpc-macro: macro for GherKing

![Downloads](https://img.shields.io/npm/dw/gpc-macro?style=flat-square)
![Version@npm](https://img.shields.io/npm/v/gpc-macro?label=version%40npm&style=flat-square)
![Version@git](https://img.shields.io/github/package-json/v/gherking/gpc-macro/master?label=version%40git&style=flat-square)
![CI](https://img.shields.io/github/workflow/status/gherking/gpc-macro/CI/master?label=ci&style=flat-square)
![Docs](https://img.shields.io/github/workflow/status/gherking/gpc-macro/Docs/master?label=docs&style=flat-square)

This pre-processor is responsible for defining macros in feature files and then executing them.

## Usage

1. Defining a macro by creating  macro scenario. Using `@macro(${macroName})` tag on the scenario defines a macro with the provided name and steps that are included.

   Note: this scenario will not be run during test execution, it is removed during pre-processing. The definition cannot contain macro execution step (see next step).

   Errors are thrown when no name or steps are included in the definition, or when defining a macro with an already existing name.
   
2. Executing the macro. In another scenario using step `'macro ${macroName} is executed'` will replace this step with the steps in the definition of `${macroName}` macro.

   Throws error when no `${macroName}` is provided in the step, or when no macro is defined by name provided.

See examples for the input files and an output in the `tests/data` folder.

```javascript
'use strict';
const compiler = require('gherking');
const Macro = require('gpc-macro');

let ast = compiler.load('./features/src/login.feature');
ast = compiler.process(
    ast,
    new Macro(),
);
compiler.save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```

```typescript
import {load, process, save} from "gherking";
import Macro = require("gpc-macro");

let ast = load("./features/src/login.feature");
ast = process(
    ast,
    new Macro(),
);
save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```
## API

### `Macro.createStep(name)`

**Params**:
- `{String} name` - The name of the macro

**Returns**: `{Step}` - A macro step for the given macro.

For detailed documentation see the [TypeDocs documentation](https://gherking.github.io/gpc-macro/).

This package uses [debug](https://www.npmjs.com/package/debug) for logging.