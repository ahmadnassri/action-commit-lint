# GitHub Action: Commit Lint

[![license][license-img]][license-url]
[![version][version-img]][version-url]
[![super linter][super-linter-img]][super-linter-url]
[![release][release-img]][release-url]

[license-url]: LICENSE
[license-img]: https://badgen.net/github/license/ahmadnassri/action-commit-lint

[version-url]: https://github.com/ahmadnassri/action-commit-lint/releases
[version-img]: https://badgen.net//github/release/ahmadnassri/action-commit-lint

[super-linter-url]: https://github.com/ahmadnassri/action-commit-lint/actions?query=workflow%3Asuper-linter
[super-linter-img]: https://github.com/ahmadnassri/action-commit-lint/workflows/super-linter/badge.svg

[release-url]: https://github.com/ahmadnassri/action-commit-lint/actions?query=workflow%3Arelease
[release-img]: https://github.com/ahmadnassri/action-commit-lint/workflows/release/badge.svg

Runs [`commitlint`](https://commitlint.js.org/) as a GitHub Action, a default configuration auto applied.

## Usage

###### simple

```yaml
name: commit-lint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - uses: ahmadnassri/action-commit-lint@v1
```

###### use different built-in config

```yaml
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

```yaml
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

> **Notes** _for custom rules_:
> - must use `action/checkout` first_
> - `config` is relative to your repo's root
> - config file format must follow [`commitlint` configuration format](https://commitlint.js.org/#/reference-configuration)

### Inputs & Outputs

| output         | type   | required | default        | description                                               |
| -------------- | ------ | -------- | -------------- | --------------------------------------------------------- |
| `github-token` | input  | ❌        | `-`            | The GitHub token used to inspect the pull-request commits |
| `config`       | input  | ❌        | `conventional` | name of config to use, or path to config file             |
| `report`       | output | `N/A`    | `-`            | a JSON object with the full `commitlint` report data      |

#### built-in configs

the following are available without any additional requirement

- [`angular-type-enum`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-angular-type-enum)
- [`angular`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-angular)
- [`conventional`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
- [`lerna-scopes`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-lerna-scopes)
- [`patternplate`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-patternplate)


[config]: https://commitlint.js.org/#/concepts-shareable-config
