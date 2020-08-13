// packages
const { test } = require('tap')
const sinon = require('sinon')
const core = require('@actions/core')

// module
const lint = require('../lib/lint')

const fixture = [{
  sha: 'ec26c3e57ca3a959ca5aad62de7213c562f8c821',
  commit: {
    message: 'feat(readme): update readme.md'
  }
}]

test('commits -> valid', async assert => {
  assert.plan(5)

  sinon.stub(core, 'info')
  sinon.stub(core, 'error')
  sinon.stub(core, 'warning')
  sinon.stub(core, 'setOutput') // silence output on terminal

  await lint(fixture)

  assert.same(process.exitCode, null)

  assert.ok(core.info.called)
  assert.equal(core.info.getCall(0).args[0], '2f8c821: feat(readme): update readme.md')
  core.info.restore()

  assert.notOk(core.error.called)
  core.error.restore()

  assert.notOk(core.warning.called)
  core.warning.restore()
})
