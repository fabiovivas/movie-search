const fs = require('fs')
const path = require('path')
const sut = require('../../src/generate-index/get-files-from-folder')

jest.mock('fs')
jest.mock('path')

describe('getFilesFromFolder', () => {
    const folderPath = '/path/to/folder'

    beforeEach(() => {
        jest.clearAllMocks()

        fs.readdirSync.mockReturnValue([])
        fs.statSync.mockReturnValue({ isFile: () => false })
        path.join.mockImplementation((folder, file) => `${folder}/${file}`)
    })

    it('should only include files and exclude directories', () => {
        fs.readdirSync.mockReturnValueOnce(['file1.txt', 'file2.txt', 'dir1'])
        fs.statSync.mockReturnValueOnce({ isFile: () => true })
            .mockReturnValueOnce({ isFile: () => true })
            .mockReturnValueOnce({ isFile: () => false })

        const result = sut(folderPath)
        expect(result).toEqual(['file1.txt', 'file2.txt'])
    })

    it('should return an empty array if the folder is empty', () => {
        fs.readdirSync.mockReturnValueOnce([])

        const result = sut(folderPath)
        expect(result).toEqual([])
    })

    it('should handle errors and return an empty array', () => {
        fs.readdirSync.mockImplementationOnce(() => {
            throw new Error('Permission denied')
        })

        const result = sut(folderPath)
        expect(result).toEqual([])
    })

    it('should handle paths correctly using path.join', () => {
        fs.readdirSync.mockReturnValueOnce(['file1.txt', 'file2.txt'])
        fs.statSync.mockReturnValueOnce({ isFile: () => true }).mockReturnValueOnce({ isFile: () => true })
        path.join.mockImplementation((folder, file) => `${folder}/${file}`)

        sut(folderPath)

        expect(path.join).toHaveBeenCalledWith(folderPath, 'file1.txt')
        expect(path.join).toHaveBeenCalledWith(folderPath, 'file2.txt')
    })
})
