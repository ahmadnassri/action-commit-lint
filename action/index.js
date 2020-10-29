// packages
const core = require('@actions/core')
const github = require('@actions/github')

// modules
const lint = require('./lib/lint.js')

// exit early
if (!['pull_request', 'push'].includes(github.context.eventName)) {
  core.error('action triggered outside of a push / pull_request')
  process.exit(0) // soft exit
}

// parse inputs
const inputs = {
  token: core.getInput('github-token', { required: true }),
  config: core.getInput('config', { required: true })
}

// error handler
function errorHandler ({ message, stack }) {
  core.error(`${message}\n${stack}`)
  process.exit(1)
}

// catch errors and exit
process.on('unhandledRejection', errorHandler)
process.on('uncaughtException', errorHandler)

// extract the pull_request
const { payload } = github.context // eslint-disable-line camelcase

// initiate the client
const octokit = github.getOctokit(inputs.token)

const commits = []

async function main () {
  // handle Pul Requests
  if (github.context.eventName === 'pull_request') {
    // fetch commits
    const { data } = await octokit.pulls.listCommits({
      ...github.context.repo,
      pull_number: payload.pull_request.number
    })

    commits.push(...data)
  } else {
    commits.push(...payload.commits)
  }

  if (commits.lengh === 0) {
    core.error('no commits found')
    process.exit(0) // soft exit
  }

  // process commits
  await lint(inputs.config, commits)
}

main()
