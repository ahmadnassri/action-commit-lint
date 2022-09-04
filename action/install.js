#!/bin/node

const { dependencies } = require('./package.json')
const { spawn } = require('node:child_process')

const args = ['--no-fund', '--no-audit']
const opts = { stdio: 'inherit' }

const packages = Object.entries(dependencies)
  // limit to just @commitlint scope
  .filter(([dependency]) => dependency.startsWith('@commitlint'))
  // construct installable version
  .map(([dependency, version]) => `${dependency}@${version}`)

// install @commitlint dependencies globally
for (const name of packages) {
  spawn('npm', ['install', '--global', ...args, name], opts)
}

// instally local
spawn('npm', ['ci', '--omit=dev', ...args], opts)
