const fs = require('fs')
const path = require('path')
const sut = require('../src/load-index-files')

jest.mock('fs')
jest.mock('path')

describe('loadIndexFiles', () => {
  const indexFolderPath = path.join(__dirname, '../index')

  beforeEach(() => {
    jest.clearAllMocks()

    fs.promises = {
      readFile: jest.fn(),
    }

    path.join.mockImplementation((...args) => args.join('/'))
  })

  it('should load the correct index files based on the first character of each word', async () => {
    const words = ['apple', 'banana', 'avocado']

    fs.promises.readFile.mockResolvedValueOnce('{"apple": ["file1.txt", "file2.txt"]}')
                        .mockResolvedValueOnce('{"banana": ["file3.txt"]}')
                        .mockResolvedValueOnce('{"avocado": ["file1.txt"]}')

    const result = await sut(words)

    expect(path.join).toHaveBeenCalledWith(indexFolderPath, 'a.json')
    expect(path.join).toHaveBeenCalledWith(indexFolderPath, 'b.json')

    expect(result).toEqual({
      apple: ['file1.txt', 'file2.txt'],
      banana: ['file3.txt'],
      avocado: ['file1.txt'],
    })
  })

  it('should throw an error if readFile fails', async () => {
    const words = ['apple']

    fs.promises.readFile.mockRejectedValueOnce(new Error('File not found'))

    await expect(sut(words)).rejects.toThrow('File not found')
  })

  it('should return an empty index if no words are provided', async () => {
    const words = []

    const result = await sut(words)

    expect(fs.promises.readFile).not.toHaveBeenCalled()

    expect(result).toEqual({})
  })

  it('should correctly parse multiple index files', async () => {
    const words = ['apple', 'banana']

    fs.promises.readFile.mockResolvedValueOnce('{"apple": ["file1.txt"]}')
                        .mockResolvedValueOnce('{"banana": ["file2.txt", "file3.txt"]}')

    const result = await sut(words)

    expect(result).toEqual({
      apple: ['file1.txt'],
      banana: ['file2.txt', 'file3.txt'],
    })
  })
})
