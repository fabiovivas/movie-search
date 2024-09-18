const sut = require('../src/format-words')

describe('formatWords', () => {
  const originalExit = process.exit
  const originalError = console.error

  beforeEach(() => {
    process.exit = jest.fn()
    console.error = jest.fn()
  })

  afterEach(() => {
    process.exit = originalExit
    console.error = originalError
  })

  it('should return the formatted words when valid arguments are provided', () => {
    const argv = ['node', 'searchFiles.js', 'Hello', 'World!']

    const result = sut(argv)

    expect(result).toEqual(['hello', 'world'])
  })

  it('should log an error and exit the process if no arguments are provided', () => {
    const argv = ['node', 'searchFiles.js']

    sut(argv)

    expect(console.error).toHaveBeenCalledWith('Uso: node searchFiles.js <sentença>')

    expect(process.exit).toHaveBeenCalledWith(1)
  })

  it('should handle sentences with multiple spaces correctly', () => {
    const argv = ['node', 'searchFiles.js', 'This', '', 'is', '  ', 'a', 'test.']

    const result = sut(argv)

    expect(result).toEqual(['this', 'is', 'a', 'test'])
  })

  it('should remove special characters from the sentence', () => {
    const argv = ['node', 'searchFiles.js', 'Hello, World!!']

    const result = sut(argv)

    expect(result).toEqual(['hello', 'world'])
  })

  it('should handle sentences with mixed case characters', () => {
    const argv = ['node', 'searchFiles.js', 'Hello WORLD']

    const result = sut(argv)

    expect(result).toEqual(['hello', 'world'])
  })
})
