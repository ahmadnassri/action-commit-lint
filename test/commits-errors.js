// packages
const { test } = require('tap')
const sinon = require('sinon')
const core = require('@actions/core')

// module
const lint = require('../lib/lint')

const fixture = [{
  sha: 'ec26c3e57ca3a959ca5aad62de7213c562f8c821',
  commit: {
    message: 'Update README.md'
  }
}]

test('commits -> errors', async assert => {
  assert.plan(9)

  sinon.stub(core, 'info')
  sinon.stub(core, 'error')
  sinon.stub(core, 'setFailed')
  sinon.stub(core, 'setOutput') // silence output on terminal
  sinon.stub(process, 'exit')

  await lint('conventional', fixture)

  assert.ok(process.exit.called)
  assert.equal(process.exit.getCall(0).args[0], 1)

  assert.ok(core.info.called)
  assert.equal(core.info.getCall(1).args[0], '2f8c821: Update README.md')

  assert.ok(core.error.called)
  assert.equal(core.error.getCall(0).args[0], '✖ subject may not be empty')
  assert.equal(core.error.getCall(1).args[0], '✖ type may not be empty')

  assert.ok(core.setFailed.called)
  assert.equal(core.setFailed.getCall(0).args[0], 'commitlint failed')

  core.info.restore()
  core.error.restore()
  core.setFailed.restore()
  core.setOutput.restore()
  process.exit.restore()
})
