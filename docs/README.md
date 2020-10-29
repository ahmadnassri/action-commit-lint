
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
