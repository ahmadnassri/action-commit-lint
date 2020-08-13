# GitHub Action: Conventional Commit Lint

[![license][license-img]][license-url]
[![version][version-img]][version-url]
[![super linter][super-linter-img]][super-linter-url]
[![release][release-img]][release-url]

[license-url]: LICENSE
[license-img]: https://badgen.net/github/license/ahmadnassri/action-conventional-commit-lint

[version-url]: https://github.com/ahmadnassri/action-conventional-commit-lint/releases
[version-img]: https://badgen.net//github/release/ahmadnassri/action-conventional-commit-lint

[super-linter-url]: https://github.com/ahmadnassri/action-conventional-commit-lint/actions?query=workflow%3Asuper-linter
[super-linter-img]: https://github.com/ahmadnassri/action-conventional-commit-lint/workflows/super-linter/badge.svg

[release-url]: https://github.com/ahmadnassri/action-conventional-commit-lint/actions?query=workflow%3Arelease
[release-img]: https://github.com/ahmadnassri/action-conventional-commit-lint/workflows/release/badge.svg

Runs [`commitlint`](https://commitlint.js.org/) as a GitHub Action, with default configuration set to `@commitlint/config-conventional`

## Usage

```yaml
name: commit-lint

on:
  pull_request:

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - uses: ahmadnassri/action-conventional-commit-lint@v1
        with:
          token: ${{ github.token }}
```

### Inputs & Outputs

| output   | type   | required | default  | description                                                   |
| -------- | ------ | -------- | -------- | ------------------------------------------------------------- |
| `token`  | input  | ✔        | `-`      | The GitHub token used to merge query the pull-request commits |
| `report` | output | `N/A`    | `-`      | a JSON object with the full `commitlint` report data          |
