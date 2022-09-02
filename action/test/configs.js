// packages
const { test } = require('tap')
const sinon = require('sinon')
const core = require('@actions/core')

// module
const lint = require('../lib/lint.js')

test('commits -> success', async assert => {
  assert.plan(2)

  sinon.stub(core, 'info')
  sinon.stub(core, 'error')
  sinon.stub(core, 'setOutput') // silence output on terminal

  await lint({
    config: 'angular-type-enum',
    commits: [{
      sha: 'ec26c3e57ca3a959ca5aad62de7213c562f8c821',
      commit: { message: 'feat: update README.md.' }
    }]
  })

  assert.equal(core.info.getCall(0).args[0], 'config: angular-type-enum')
  assert.notOk(core.error.called)

  core.info.restore()
  core.error.restore()
  core.setOutput.restore()
})

test('commits -> fail', async assert => {
  assert.plan(6)

  sinon.stub(core, 'info')
  sinon.stub(core, 'error')
  sinon.stub(core, 'setFailed')
  sinon.stub(core, 'setOutput') // silence output on terminal
  sinon.stub(process, 'exit')

  await lint({
    config: 'conventional',
    commits: [{
      sha: 'ec26c3e57ca3a959ca5aad62de7213c562f8c821',
      commit: { message: 'feat: update README.md.' }
    }]
  })

  assert.ok(process.exit.called)
  assert.equal(process.exit.getCall(0).args[0], 1)

  assert.ok(core.error.called)
  assert.equal(core.error.getCall(0).args[0], '✖ subject may not end with full stop')

  assert.ok(core.setFailed.called)
  assert.equal(core.setFailed.getCall(0).args[0], 'commitlint failed')

  core.info.restore()
  core.error.restore()
  core.setFailed.restore()
  core.setOutput.restore()
  process.exit.restore()
})

test('config -> custom', async assert => {
  assert.plan(7)

  sinon.stub(core, 'info')
  sinon.stub(core, 'error')
  sinon.stub(core, 'setFailed')
  sinon.stub(core, 'setOutput') // silence output on terminal
  sinon.stub(process, 'exit')

  await lint({
    config: 'test/fixtures/config.yml',
    commits:[{
      sha: 'ec26c3e57ca3a959ca5aad62de7213c562f8c821',
      commit: {
        message: 'feat: update README.md.'
      }
    }]
  })

  assert.equal(core.info.getCall(0).args[0], 'config: test/fixtures/config.yml')

  assert.ok(process.exit.called)
  assert.equal(process.exit.getCall(0).args[0], 1)

  assert.ok(core.error.called)
  assert.equal(core.error.getCall(0).args[0], '✖ subject may not end with full stop')

  assert.ok(core.setFailed.called)
  assert.equal(core.setFailed.getCall(0).args[0], 'commitlint failed')

  core.info.restore()
  core.error.restore()
  core.setFailed.restore()
  core.setOutput.restore()
  process.exit.restore()
})

test('configs -> undefined', async assert => {
  assert.plan(1)

  sinon.stub(core, 'info')
  sinon.stub(core, 'error')
  sinon.stub(core, 'setOutput') // silence output on terminal

  await lint({
    commits: [{
      sha: 'ec26c3e57ca3a959ca5aad62de7213c562f8c821',
      commit: { message: 'feat: update README.md' }
    }]
  })

  assert.notOk(core.error.called)

  core.info.restore()
  core.error.restore()
  core.setOutput.restore()
})
