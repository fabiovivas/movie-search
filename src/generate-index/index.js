const path = require('path')
const getFilesFromFolder = require('./get-files-from-folder')
const buildDividedIndex = require('./build-divided-index')
const saveIndexToFile = require('./save-index-to-file')

const folderPath = path.join(__dirname, '../../data')
const indexFolderPath = path.join(__dirname, '../../index') 

const createDividedIndex = () => {
    const files = getFilesFromFolder(folderPath)
    const dividedIndex = buildDividedIndex(files, folderPath) 

    saveIndexToFile(dividedIndex, indexFolderPath) 
    console.log('Índice dividido criado com sucesso.')
}

createDividedIndex()
