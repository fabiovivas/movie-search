const path = require('path')
const sut = require('../../src/generate-index/build-divided-index')
const formatFile = require('../../src/generate-index/format-file')

jest.mock('../../src/generate-index/format-file')

describe('buildDividedIndex', () => {
  const folderPath = '/folder'
  const files = ['file1.txt', 'file2.txt']

  beforeAll(() => {
    formatFile.mockReturnValue([])
  })

  it('should return a correctly divided index', () => {
    formatFile.mockReturnValueOnce(['apple', 'banana', 'avocado'])
             .mockReturnValueOnce(['banana', 'berry', 'cherry'])

    const expectedIndex = {
      a: {
        apple: new Set(['file1.txt']),
        avocado: new Set(['file1.txt']),
      },
      b: {
        banana: new Set(['file1.txt', 'file2.txt']),
        berry: new Set(['file2.txt']),
      },
      c: {
        cherry: new Set(['file2.txt']),
      },
    }

    const result = sut(files, folderPath)
    expect(result).toEqual(expectedIndex)
  })

  it('should handle empty files', () => {
    formatFile.mockReturnValueOnce([]).mockReturnValueOnce([])

    const result = sut(files, folderPath)
    expect(result).toEqual({})
  })

  it('should handle duplicate words in the same file', () => {
    formatFile.mockReturnValueOnce(['apple', 'apple', 'avocado'])

    const expectedIndex = {
      a: {
        apple: new Set(['file1.txt']),
        avocado: new Set(['file1.txt']),
      },
    }

    const result = sut(files, folderPath)
    expect(result).toEqual(expectedIndex)
  })
})
