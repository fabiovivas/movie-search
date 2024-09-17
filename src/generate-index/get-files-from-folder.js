const fs = require('fs')
const path = require('path')

const getFilesFromFolder = (folderPath) => {
    try {
        const files = fs.readdirSync(folderPath)
        const fileList = []

        files.forEach((file) => {
            const filePath = path.join(folderPath, file)
            if (fs.statSync(filePath).isFile()) {
                fileList.push(file)
            }
        })

        return fileList
    } catch (error) {
        console.error(`Erro ao ler a pasta: ${folderPath}`, error)
        return []
    }
}

module.exports = getFilesFromFolder
