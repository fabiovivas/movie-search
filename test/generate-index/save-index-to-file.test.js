const fs = require('fs')
const path = require('path')
const sut = require('../../src/generate-index/save-index-to-file')

jest.mock('fs')
jest.mock('path')

describe('saveIndexToFile', () => {
  const indexFolderPath = '/path/to/indexFolder'
  const dividedIndex = {
    a: {
      apple: new Set(['file1.txt', 'file2.txt']),
      avocado: new Set(['file1.txt']),
    },
    b: {
      banana: new Set(['file3.txt']),
    },
  }

  beforeAll(() => {
    fs.existsSync.mockReturnValue(true)
    fs.mkdirSync.mockImplementation(() => {})
    fs.writeFileSync.mockImplementation(() => {})
    path.join.mockImplementation((folder, file) => `${folder}/${file}`)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create the index folder if it does not exist', () => {
    fs.existsSync.mockReturnValueOnce(false)

    sut(dividedIndex, indexFolderPath)

    expect(fs.mkdirSync).toHaveBeenCalledWith(indexFolderPath)
  })

  it('should not create the folder if it already exists', () => {
    fs.existsSync.mockReturnValueOnce(true)

    sut(dividedIndex, indexFolderPath)

    expect(fs.mkdirSync).not.toHaveBeenCalled()
  })

  it('should write JSON files for each character in the divided index', () => {
    sut(dividedIndex, indexFolderPath)

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/path/to/indexFolder/a.json',
      JSON.stringify({
        apple: ['file1.txt', 'file2.txt'],
        avocado: ['file1.txt'],
      })
    )

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/path/to/indexFolder/b.json',
      JSON.stringify({
        banana: ['file3.txt'],
      })
    )
  })

  it('should handle errors during file writing gracefully', () => {
    fs.writeFileSync.mockImplementationOnce(() => {
      throw new Error('Disk is full')
    })

    console.error = jest.fn()

    sut(dividedIndex, indexFolderPath)

    expect(console.error).toHaveBeenCalledWith(
      'Erro ao salvar o índice no arquivo: /path/to/indexFolder/a.json',
      expect.any(Error)
    )
  })

  it('should convert sets to arrays before saving to JSON', () => {
    sut(dividedIndex, indexFolderPath)

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/path/to/indexFolder/a.json',
      JSON.stringify({
        apple: ['file1.txt', 'file2.txt'],
        avocado: ['file1.txt'],
      })
    )

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/path/to/indexFolder/b.json',
      JSON.stringify({
        banana: ['file3.txt'],
      })
    )
  })

  it('should use path.join to correctly build file paths', () => {
    sut(dividedIndex, indexFolderPath)

    expect(path.join).toHaveBeenCalledWith(indexFolderPath, 'a.json')
    expect(path.join).toHaveBeenCalledWith(indexFolderPath, 'b.json')
  })
})
