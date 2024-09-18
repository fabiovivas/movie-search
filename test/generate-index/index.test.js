const path = require('path')
const getFilesFromFolder = require('../../src/generate-index/get-files-from-folder')
const buildDividedIndex = require('../../src/generate-index/build-divided-index')
const saveIndexToFile = require('../../src/generate-index/save-index-to-file')

jest.mock('../../src/generate-index/get-files-from-folder')
jest.mock('../../src/generate-index/build-divided-index')
jest.mock('../../src/generate-index/save-index-to-file')

describe('createDividedIndex', () => {
  const folderPath = path.join(__dirname, '../../data')
  const indexFolderPath = path.join(__dirname, '../../index')

  beforeEach(() => {
    jest.clearAllMocks()

    getFilesFromFolder.mockReturnValue(['file1.txt', 'file2.txt'])
    buildDividedIndex.mockReturnValue({
      a: {
        apple: new Set(['file1.txt', 'file2.txt']),
      },
    })
    saveIndexToFile.mockImplementation(() => {})
    console.log = jest.fn()
  })

  it('should call getFilesFromFolder with the correct folder path', () => {
    jest.isolateModules(() => {
      require('../../src/generate-index/index')
    })

    expect(getFilesFromFolder).toHaveBeenCalledWith(folderPath)
  })

  it('should call buildDividedIndex with the correct arguments', () => {
    const files = ['file1.txt', 'file2.txt']

    getFilesFromFolder.mockReturnValueOnce(files)

    jest.isolateModules(() => {
      require('../../src/generate-index/index')
    })

    expect(buildDividedIndex).toHaveBeenCalledWith(files, folderPath)
  })

  it('should call saveIndexToFile with the correct arguments', () => {
    const dividedIndex = {
      a: {
        apple: new Set(['file1.txt', 'file2.txt']),
      },
    }

    buildDividedIndex.mockReturnValueOnce(dividedIndex)

    jest.isolateModules(() => {
      require('../../src/generate-index/index')
    })

    expect(saveIndexToFile).toHaveBeenCalledWith(dividedIndex, indexFolderPath)
  })

  it('should log success message to the console', () => {
    jest.isolateModules(() => {
      require('../../src/generate-index/index')
    })

    expect(console.log).toHaveBeenCalledWith('Índice dividido criado com sucesso.')
  })
})
