const findMatchingFiles = (words, index) => {
    let matchingFiles = null
    if (words.length === 0) return []

    for (const word of words) {
        if (!index[word]) return []

        const currentFiles = new Set(index[word])
        if (!matchingFiles) matchingFiles = currentFiles
        else matchingFiles = new Set([...matchingFiles].filter(file => currentFiles.has(file)))
    }

    return Array.from(matchingFiles).sort()
}

module.exports = findMatchingFiles
