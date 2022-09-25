import File from '../../entities/file';

describe('Testing File class', () => {
    it('Should return the right props with the right data', () => {
        const expectedProperties = [
            "type",
            "size",
            "name",
            "key",
            "url",
            "createdAt",
            "deletedAt",
            'userId'
        ]

        const receivedProperties = Object.keys(new File(
            'jpg',
            25000,
            'teste.jpg',
            '109823477483928aksj',
            '/home',
            '6327a374394087be9d53a3ca'
        ))

        expect(expectedProperties).toStrictEqual(receivedProperties)
    })
})