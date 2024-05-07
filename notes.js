const { default: chalk } = require('chalk')
const fs = require('fs')
const { title } = require('process')

const getNotes = () => {
    return 'your notes are returned'
}

const addNotes = (title, body) => {
    const notes = loadNotes()

    const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('notes added'))
    }
    else {
        console.log(chalk.red.inverse('notes already exist'))
    }    
}

const readNotes = (title) => {
    const notes = loadNotes()

    const searchNote = notes.find((note) => note.title === title)
    if (searchNote) {
        console.log(chalk.blue.inverse('Title:' + searchNote.title))
        console.log('Body: ' + searchNote.body)
    } else {
        console.log(chalk.red.inverse('No note found!! ERROR!!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const removeNotes = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Note removed'))
    }
    else {
        console.log(chalk.red.inverse('Note not found'))
    }
    
}

const listNotes = () => {
    const notes = loadNotes();

    notes.forEach((note) => {
        console.log(note.title) 
    });
    console.log(chalk.green('your notes'))
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}