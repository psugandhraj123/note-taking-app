const fs = require('fs')
const chalk = require('chalk')
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e){
        return []
    }
}
const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const readNote = (title)=>{
    const notes = loadNotes();
    const noteFound = notes.find(note => note.title === title)
    if(noteFound){
        console.log(chalk.bold.green(noteFound.title))
        console.log(noteFound.body)
    } else {
        console.log(chalk.red("Notes not found"))
    }
}

const addNote = (title,body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)
    debugger
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
    
}
const removeNote = title =>{
    const notes = loadNotes();
    const notesUnmatched = notes.filter(note => note.title !== title)
    if(notes.length > notesUnmatched.length){
        saveNotes(notesUnmatched)
        console.log(chalk.green.inverse('Note Deleted Successfully!'))
    } else {
        console.log(chalk.red.inverse('Note title not found!'))
    }
}
const listNotes = ()=>{ 
    const notes = loadNotes();
    if(notes.length == 0 ){
        console.log(chalk.red.inverse('No Notes Found!!!'))
    } else{
        console.log(chalk.green('Your Notes'))
        notes.forEach(note => console.log(note.title));
    }
}
module.exports = {
    readNote: readNote,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}