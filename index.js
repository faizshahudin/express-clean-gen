#! /usr/bin/env node

const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const createEntity = require('./commands/entity_create')

const argv = yargs(hideBin(process.argv)).argv;

if (argv._[0] === 'entity:create') {
  if (!argv.name || argv.name === '' || typeof argv.name != 'string') {
  console.log("you need to specify entity name.");
  } else {
const dirName = argv.name.replace(/[^a-zA-Z ]/g, "").toLowerCase();
  createEntity(dirName)
  }
} else {
  console.log('unknown command.')
}

process.exit(0)







