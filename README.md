# GitHub Action: commitlint

commitlint as a GitHub Action

[![license][license-img]][license-url]
[![release][release-img]][release-url]
[![semantic][semantic-img]][semantic-url]

## Usage

###### simple

``` yaml
name: commit-lint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - uses: ahmadnassri/action-commit-lint@v1
```

###### use different built-in config

``` yaml
name: commit-lint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - uses: ahmadnassri/action-commit-lint@v1
        with:
          config: angular
```

###### use your own rules

``` yaml
name: commit-lint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: ahmadnassri/action-commit-lint@v1
        with:
          config: ./path/to/commitlint.config
```

> **Notes** *for custom rules*:
>
> -   must use `action/checkout` first\_
> -   `config` is relative to your repo's root
> -   config file format must follow [`commitlint` configuration format][]

### Inputs & Outputs

| output   | type   | required | default        | description                                               |
|----------|--------|----------|----------------|-----------------------------------------------------------|
| `token`  | input  | ❌       | `-`            | The GitHub token used to inspect the pull-request commits |
| `config` | input  | ❌       | `conventional` | name of config to use, or path to config file             |
| `report` | output | `N/A`    | `-`            | a JSON object with the full `commitlint` report data      |

#### built-in configs

the following are available without any additional requirement

-   [`angular-type-enum`][]
-   [`angular`][]
-   [`conventional`][]
-   [`lerna-scopes`][]
-   [`patternplate`][]

  [`commitlint` configuration format]: https://commitlint.js.org/#/reference-configuration
  [`angular-type-enum`]: https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-angular-type-enum
  [`angular`]: https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-angular
  [`conventional`]: https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional
  [`lerna-scopes`]: https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-lerna-scopes
  [`patternplate`]: https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-patternplate

----
> Author: [Ahmad Nassri](https://www.ahmadnassri.com/) &bull;
> Twitter: [@AhmadNassri](https://twitter.com/AhmadNassri)

[license-url]: LICENSE
[license-img]: https://badgen.net/github/license/ahmadnassri/action-commit-lint

[release-url]: https://github.com/ahmadnassri/action-commit-lint/releases
[release-img]: https://badgen.net/github/release/ahmadnassri/action-commit-lint

[semantic-url]: https://github.com/ahmadnassri/action-commit-lint/actions?query=workflow%3Arelease
[semantic-img]: https://badgen.net/badge/📦/semantically%20released/blue
