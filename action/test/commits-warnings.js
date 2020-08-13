// packages
const { test } = require('tap')
const sinon = require('sinon')
const core = require('@actions/core')

// module
const lint = require('../lib/lint')

const fixture = [{
  sha: 'ec26c3e57ca3a959ca5aad62de7213c562f8c821',
  commit: {
    message: 'fix: some message\nbody'
  }
}]

test('commits -> warnings', async assert => {
  assert.plan(7)

  sinon.stub(core, 'info')
  sinon.stub(core, 'error')
  sinon.stub(core, 'warning')
  sinon.stub(core, 'setFailed')
  sinon.stub(core, 'setOutput') // silence output on terminal

  await lint(fixture)

  assert.same(process.exitCode, null)

  assert.ok(core.info.called)
  assert.equal(core.info.getCall(0).args[0], '2f8c821: fix: some message\nbody')
  core.info.restore()

  assert.notOk(core.error.called)
  core.error.restore()

  assert.ok(core.warning.called)
  assert.equal(core.warning.getCall(0).args[0], '⚠ body must have leading blank line')
  core.warning.restore()

  assert.notOk(core.setFailed.called)
  core.setFailed.restore()
})
