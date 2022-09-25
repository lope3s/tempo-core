import validateObjAgainstSchema from "../../helpers/validateObjAgainstSchema";

describe('Validating data from request body', () => {
    class MockClass {
        a: string;
        b: null | number;

        constructor(a: string, b?: number) {
            this.a = a;
            this.b = b ? b : null;
        }
    }

    it('Should return missing fields properly', () => {
        const testingObj = {
            b: 'c'
        }

        const received = validateObjAgainstSchema(MockClass, testingObj)

        const expected = {
            valid: false,
            missingFields: [
                'a'
            ]
        }

        expect(expected).toStrictEqual(received)
    })

    it('Should validate right object', () => {
        const testingObj = {
            a: 'test',
        }

        const received = validateObjAgainstSchema(MockClass, testingObj)

        const expected = {
            valid: true,
            obj: new MockClass(testingObj.a)
        }

        expect(expected).toStrictEqual(received)
    })

    it('Should ignore not mapped fields', () => {
        const testingObj = {
            a: 'test',
            c: 'test2'
        }

        const received = validateObjAgainstSchema(MockClass, testingObj)

        const expected = {
            valid: true,
            obj: new MockClass(testingObj.a)
        }

        expect(expected).toStrictEqual(received)
    })
})