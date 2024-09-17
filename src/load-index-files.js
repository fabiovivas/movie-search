const fs = require('fs')
const path = require('path')

const indexFolderPath = path.join(__dirname, '../index') 

const loadIndexFiles = async (words) => {
    const firstChars = words.map(word => word[0])

    const indexPromises = firstChars.map(char =>
        fs.promises.readFile(path.join(indexFolderPath, `${char}.json`), 'utf8')
    )

    const indexContents = await Promise.all(indexPromises)
    const index = indexContents.reduce((acc, content) => {
        Object.assign(acc, JSON.parse(content))
        return acc
    }, {})

    return index
}

module.exports = loadIndexFiles
