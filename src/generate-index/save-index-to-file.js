const fs = require('fs')
const path = require('path')

const saveIndexToFile = (dividedIndex, indexFolderPath) => {
    if (!fs.existsSync(indexFolderPath)) {
        fs.mkdirSync(indexFolderPath)
    }

    Object.entries(dividedIndex).forEach(([char, words]) => {
        const indexObject = {}

        Object.entries(words).forEach(([word, files]) => {
            indexObject[word] = Array.from(files)
        })

        const filePath = path.join(indexFolderPath, `${char}.json`)

        try {
            fs.writeFileSync(filePath, JSON.stringify(indexObject))
        } catch (error) {
            console.error(`Erro ao salvar o índice no arquivo: ${filePath}`, error)
        }
    })
}

module.exports = saveIndexToFile
