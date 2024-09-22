const formatWords = (argv) => {
    const args = argv.slice(2)
    if (args.length < 1) {
        console.error('Uso: node src/index.js <sentença para pesquisa>')
        process.exit(1)
    }
    const sentence = args.join(' ')
    const words = sentence.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/)
    return words
}

module.exports = formatWords
