const sut = require('../src/find-matching-files')

describe('findMatchingFiles', () => {
  let index

  beforeEach(() => {
    index = {
      apple: ['file1.txt', 'file2.txt', 'file3.txt'],
      banana: ['file2.txt', 'file3.txt'],
      cherry: ['file3.txt'],
    }
  })

  it('should return files matching all the words', () => {
    const words = ['apple', 'banana']

    const result = sut(words, index)

    expect(result).toEqual(['file2.txt', 'file3.txt'])
  })

  it('should return an empty array if any word does not exist in the index', () => {
    const words = ['apple', 'grape']

    const result = sut(words, index)

    expect(result).toEqual([])
  })

  it('should return all files for a single word in the index', () => {
    const words = ['cherry']

    const result = sut(words, index)

    expect(result).toEqual(['file3.txt'])
  })

  it('should return sorted files even if initially unordered', () => {
    index = {
      apple: ['file3.txt', 'file1.txt', 'file2.txt'],
    }

    const words = ['apple']

    const result = sut(words, index)

    expect(result).toEqual(['file1.txt', 'file2.txt', 'file3.txt'])
  })

  it('should return an empty array if no words are provided', () => {
    const words = []

    const result = sut(words, index)

    expect(result).toEqual([])
  })

  it('should return an empty array if the index is empty', () => {
    const emptyIndex = {}
    const words = ['apple']

    const result = sut(words, emptyIndex)

    expect(result).toEqual([])
  })

  it('should return an empty array if there are no matching files across words', () => {
    index = {
      apple: ['file1.txt'],
      banana: ['file2.txt'],
    }

    const words = ['apple', 'banana']

    const result = sut(words, index)

    expect(result).toEqual([])
  })
})
