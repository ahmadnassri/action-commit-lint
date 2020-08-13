const { promises: { readFile } } = require('fs')

const { Octokit } = require('@octokit/rest')

const env = require('./lib/env')
const lint = require('./lib/lint')

async function main () {
  // over write default github token with the input if provided
  if (process.env.INPUT_GITHUB_TOKEN) process.env.GITHUB_TOKEN = process.env.INPUT_GITHUB_TOKEN

  // validate env variables
  env()

  // init octokit
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    userAgent: 'action-commitlint'
  })

  // find context data
  const contents = await readFile(process.env.GITHUB_EVENT_PATH)

  // parse data
  const event = JSON.parse(contents)

  // extract the pull request info
  const { number, repository } = event

  // fetch commits
  const { data } = await octokit.pulls.listCommits({
    owner: repository.owner.login,
    repo: repository.name,
    pull_number: number
  })

  // process commits
  await lint(data)
}

main()
