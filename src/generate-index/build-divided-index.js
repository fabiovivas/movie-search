const path = require('path') 
const formatFile = require('./format-file') 

const buildDividedIndex = (files, folderPath) => {
    const dividedIndex = {}

    files.forEach(file => {
        const filePath = path.join(folderPath, file) 
        const words = formatFile(filePath)

        words.forEach(word => {
            const firstChar = word[0]
            if (!dividedIndex[firstChar]) {
                dividedIndex[firstChar] = {}
            }

            if (!dividedIndex[firstChar][word]) {
                dividedIndex[firstChar][word] = new Set()
            }
            dividedIndex[firstChar][word].add(file)
        })
    })

    return dividedIndex
}

module.exports = buildDividedIndex
