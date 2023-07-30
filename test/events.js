// packages
const { test } = require('tap')
const sinon = require('sinon')
const core = require('@actions/core')

// module
const lint = require('../src/lint.js')

test('event -> PR', async assert => {
  assert.plan(5)

  sinon.stub(core, 'info')
  sinon.stub(core, 'error')
  sinon.stub(core, 'warning')
  sinon.stub(core, 'setOutput') // silence output on terminal

  await lint({
    config: 'conventional',
    commits: [{
      sha: 'ec26c3e57ca3a959ca5aad62de7213c562f8c821',
      commit: { message: 'feat(readme): update readme.md' }
    }]
  })

  assert.same(process.exitCode, null)

  assert.ok(core.info.called)
  assert.equal(core.info.getCall(1).args[0], '2f8c821: feat(readme): update readme.md')
  assert.notOk(core.error.called)
  assert.notOk(core.warning.called)

  core.info.restore()
  core.error.restore()
  core.warning.restore()
  core.setOutput.restore()
})

test('event -> push', async assert => {
  assert.plan(5)

  sinon.stub(core, 'info')
  sinon.stub(core, 'error')
  sinon.stub(core, 'warning')
  sinon.stub(core, 'setOutput') // silence output on terminal

  await lint({
    config: 'conventional',
    commits: [{
      id: 'ec26c3e57ca3a959ca5aad62de7213c562f8c821',
      message: 'feat(readme): update readme.md'
    }]
  })

  assert.same(process.exitCode, null)

  assert.ok(core.info.called)
  assert.equal(core.info.getCall(1).args[0], '2f8c821: feat(readme): update readme.md')
  assert.notOk(core.error.called)
  assert.notOk(core.warning.called)

  core.info.restore()
  core.error.restore()
  core.warning.restore()
  core.setOutput.restore()
})
