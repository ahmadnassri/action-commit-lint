// packages
const { test } = require('tap')
const sinon = require('sinon')
const core = require('@actions/core')

// module
const lint = require('../src/lint.js')

const commits = [
  {
    sha: 'ec26c3e57ca3a959ca5aad62de7213c562f8c821',
    commit: {
      message: 'feat(readme): update readme.md'
    }
  },
  {
    sha: '305de94a70157a995d29b11ead7197b3fbf4c344',
    commit: {
      message: 'feat(food): add ice cream'
    }
  }
]

test('commits -> valid', async assert => {
  assert.plan(6)

  sinon.stub(core, 'info')
  sinon.stub(core, 'error')
  sinon.stub(core, 'warning')
  sinon.stub(core, 'setOutput') // silence output on terminal

  await lint({ commits })

  assert.same(process.exitCode, null)

  assert.ok(core.info.called)
  assert.equal(core.info.getCall(1).args[0], '2f8c821: feat(readme): update readme.md')
  assert.equal(core.info.getCall(2).args[0], 'bf4c344: feat(food): add ice cream')
  assert.notOk(core.error.called)
  assert.notOk(core.warning.called)

  sinon.restore()
})
