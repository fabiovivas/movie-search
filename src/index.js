const { performance } = require('perf_hooks')
const formatWords = require('./format-words')
const loadIndexFiles = require('./load-index-files')
const findMatchingFiles = require('./find-matching-files')

const main = async () => {
    const startTime = performance.now()

    const words = formatWords(process.argv)
    const index = await loadIndexFiles(words)
    const result = findMatchingFiles(words, index)

    console.log(`Número de arquivos que contêm todas as palavras da sentença: ${result.length}`)
    console.log('Arquivos:')
    result.forEach(file => console.log(file))

    const endTime = performance.now()
    const executionTime = endTime - startTime
    console.log(`Tempo de execução: ${executionTime.toFixed(2)} ms`)
}

main()
