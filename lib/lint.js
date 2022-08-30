const core = require('@actions/core')
const load = require('@commitlint/load').default
const lint = require('@commitlint/lint').default

const builtInConfig = ['angular-type-enum', 'angular', 'conventional', 'lerna-scopes', 'patternplate']

module.exports = async function (config = 'conventional', commits) {
  const file = builtInConfig.includes(config) ? `config/${config}.js` : config
  const cwd = builtInConfig.includes(config) ? __dirname : process.env.GITHUB_WORKSPACE

  const { rules, parserPreset } = await load({}, { file, cwd })
  const rawOpts = parserPreset ? { parserOpts: parserPreset.parserOpts } : {}

  let fail = false
  const report = []

  core.info(`config: ${config}`)

  for (let { sha, id, commit, message } of commits) {
    message = message || commit.message
    sha = sha || id

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
