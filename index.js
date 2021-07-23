#! /usr/bin/env node

const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const readline = require("readline");
const createEntity = require('./commands/entity_create')

const argv = yargs(hideBin(process.argv)).argv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

if (argv._[0] === 'entity:create') {
  if (!argv.name || argv.name === '' || typeof argv.name != 'string') {
    console.log("you need to specify entity name.");
    rl.close()
  } else {
    const dirName = argv.name.replace(/[^a-zA-Z ]/g, "").toLowerCase();
    createEntity(dirName, rl)
  }
} else {
  console.log('unknown command.')
  rl.close()
}

rl.on("close", function () {
  console.log("done.");
  process.exit(0);
});







