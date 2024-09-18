const fs = require('fs')

const processFile = (filePath) => {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8')
        return fileContent
            ? fileContent.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/)
            : []
    } catch (error) {
        console.error(`Erro ao processar o arquivo: ${filePath}`, error)
        return []
    }
}

module.exports = processFile
