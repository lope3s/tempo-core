function validateObjAgainstSchema(Class: any, obj: {[key: string]: any}) {
    const classInstanceKeys = Object.entries(new Class())
            .filter(([key, value]) => value === undefined)
        .map(([key, value]) => key)

    const objEntries = classInstanceKeys.map(key => [key, obj[key]])
    const missingEntries = objEntries.filter(([key, value]) => value === undefined)

    if (missingEntries.length) {
        return {
            valid: false,
            missingFields: missingEntries.map(([key, value]) => key)
        }
    }
    
    return {
        valid: true,
        obj: new Class(...objEntries.map(([key, value]) => value))
    }

}

export default validateObjAgainstSchema;
