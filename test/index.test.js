const formatWords = require('../src/format-words')
const loadIndexFiles = require('../src/load-index-files')
const findMatchingFiles = require('../src/find-matching-files')
const { performance } = require('perf_hooks')

jest.mock('../src/format-words')
jest.mock('../src/load-index-files')
jest.mock('../src/find-matching-files')

describe('main', () => {
  const originalArgv = process.argv
  const originalLog = console.log

  beforeEach(() => {
    jest.clearAllMocks()

    process.argv = ['node', 'script.js', 'apple', 'banana']
    console.log = jest.fn()
    performance.now = jest.fn()
      .mockReturnValueOnce(1000)
      .mockReturnValueOnce(1100)

    formatWords.mockReturnValue(['apple', 'banana'])
    loadIndexFiles.mockResolvedValue({
      apple: ['file1.txt', 'file2.txt'],
      banana: ['file2.txt'],
    })
    findMatchingFiles.mockReturnValue(['file2.txt'])
  })

  afterEach(() => {
    process.argv = originalArgv
    console.log = originalLog
  })

  it('should format words, load index, and find matching files', async () => {
    await require('../src/index')

    expect(formatWords).toHaveBeenCalledWith(process.argv)
    expect(loadIndexFiles).toHaveBeenCalledWith(['apple', 'banana'])
    expect(findMatchingFiles).toHaveBeenCalledWith(['apple', 'banana'], {
      apple: ['file1.txt', 'file2.txt'],
      banana: ['file2.txt'],
    })
  })
})
