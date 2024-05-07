// const add = require('./utils.js')

// const sum = add(4, -2)

// console.log(sum)

// const validator = require('validator')
const notes = require('./notes.js')
const chalk = require('chalk')
const { title } = require('process')
const yargs = require('yargs')

//const msg = getNotes()

//console.log(msg) 
//console.log(validator.isURL('yzcom'))
// console.log(chalk.red.inverse.bold('Success!'))
// console.log(process.argv[2])

//const command = process.argv[2];

//console.log(process.argv)
// if(command === 'add'){
//     console.log('Adding Notes')
// } else if (command === 'remove'){
//     console.log('removing notes')
// }

// customize yargs version
yargs.version('1.1.0')

// add, remove, read, list

// add
yargs.command({
    command: 'add',
    describe: 'Add the note',
    builder: {
        title: {
            describe: 'Note tiltle',
            demandOption: true,       // need to provide argument
            type: 'string'    // type of value in title, int this case --> string
        },
        body: {
            describe: 'Add body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body)
    }
})

// remove
yargs.command({
    command: 'remove',
    describe: 'Remove the note',
    builder: {
        title: {
            describe: 'Node Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title)
    }
})

// list
yargs.command({
    command: 'list',
    describe: 'list the note',
    handler() {
        notes.listNotes()
        //console.log('listing the note')
    }
})

// read
yargs.command({
    command: 'read',
    describe: 'read the note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title)
        //console.log('readin the note')
    }
})


//console.log(yargs.argv)

yargs.parse()  