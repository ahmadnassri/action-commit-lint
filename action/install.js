const { dependencies } = require('./package.json')
const { spawn } = require('child_process')

for (const [dependency, version] of Object.entries(dependencies)) {
  spawn('npm', ['install', '--global', `${dependency}@${version}`], { stdio: 'inherit' })
}
