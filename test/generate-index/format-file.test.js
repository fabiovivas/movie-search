const fs = require('fs')
const sut = require('../../src/generate-index/format-file')

jest.mock('fs')

describe('sut (processFile)', () => {
  const filePath = '/path/to/file.txt'

  beforeEach(() => {
    jest.clearAllMocks()
    fs.readFileSync.mockReturnValue('')
  })

  it('should process the file content and return words in lowercase, without punctuation', () => {
    fs.readFileSync.mockReturnValueOnce('Hello, World! This is a test.')

    const expectedWords = ['hello', 'world', 'this', 'is', 'a', 'test']
    const result = sut(filePath)
    expect(result).toEqual(expectedWords)
  })

  it('should return an empty array if the file is empty', () => {
    fs.readFileSync.mockReturnValueOnce('')

    const result = sut(filePath)
    expect(result).toEqual([])
  })

  it('should return an empty array if an error occurs during file reading', () => {
    fs.readFileSync.mockImplementationOnce(() => {
      throw new Error('File not found')
    })

    const result = sut(filePath)
    expect(result).toEqual([])
  })

  it('should split the file content by whitespace and handle multiple spaces', () => {
    fs.readFileSync.mockReturnValueOnce('Word1   Word2\n\nWord3')

    const expectedWords = ['word1', 'word2', 'word3']
    const result = sut(filePath)
    expect(result).toEqual(expectedWords)
  })

  it('should remove special characters and keep only words and spaces', () => {
    fs.readFileSync.mockReturnValueOnce('Word!@# $%Word&*()123')

    const expectedWords = ['word', 'word123']
    const result = sut(filePath)
    expect(result).toEqual(expectedWords)
  })
})
