const core = require('@actions/core')
const { default: load } = require('@commitlint/load')
const { default: lint } = require('@commitlint/lint')

const CONFIG = {
  extends: ['@commitlint/config-conventional']
}

module.exports = async function (commits) {
  const { rules, parserPreset } = await load(CONFIG)
  const rawOpts = parserPreset ? { parserOpts: parserPreset.parserOpts } : {}

  let fail = false
  const report = []

  for (const { sha, commit: { message } } of commits) {
    core.info(`${sha.slice(-7)}: ${message}`)

    const result = await lint(message, rules, rawOpts)

    if (result.errors.length > 0) {
      fail = true
      result.errors.map(error => core.error(`✖ ${error.message}`))
    }

    if (result.warnings.length > 0) {
      result.warnings.map(warning => core.warning(`⚠ ${warning.message}`))
    }

    report.push(result)
  }

  core.setOutput('report', report)

  if (fail) {
    core.setFailed('commitlint failed')
    process.exit(1)
  }
}
