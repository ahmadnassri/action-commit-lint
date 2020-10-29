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

```yaml
name: commit-lint

on:
  pull_request:

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: ahmadnassri/action-commit-lint@v1
```

### Inputs & Outputs

| output         | type   | required | default                           | description                                               |
| -------------- | ------ | -------- | --------------------------------- | --------------------------------------------------------- |
| `github-token` | input  | ❌        | `-`                               | The GitHub token used to inspect the pull-request commits |
| `config`       | input  | ❌        | `@commitlint/config-conventional` | name of [`commitlint` shareable config][config]   |
| `report`       | output | `N/A`    | `-`                               | a JSON object with the full `commitlint` report data      |

[config]: https://commitlint.js.org/#/concepts-shareable-config
