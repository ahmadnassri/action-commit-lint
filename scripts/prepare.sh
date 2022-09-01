#!/bin/bash

# using typescript loader fails to compile with @vercel/ncc, so we're commenting out this functionality for now at the source package

sed -i 's/\x27.ts\x27:/\/\/ \x27.ts\x27:/g' node_modules/@commitlint/load/lib/utils/load-config.js
sed -i 's/`.${moduleName}rc.ts`/\/\/ `.${moduleName}rc.ts`/g' node_modules/@commitlint/load/lib/utils/load-config.js
sed -i 's/`${moduleName}.config.ts`/\/\/ `${moduleName}.config.ts`/g' node_modules/@commitlint/load/lib/utils/load-config.js
sed -i 's/const .* = require("cosmiconfig-typescript-loader");/ /g' node_modules/@commitlint/load/lib/utils/load-config.js
