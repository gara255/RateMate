export default function isFormEmpty(obj) {
    const emptyKeys = []
    for (const [key, value] of Object.entries(obj)) {
        const valueToStr = String(value)

        if (valueToStr.trim() === '') {
            emptyKeys.push(key)
        }
    }

    return {isEmpty : emptyKeys.length > 0, //returnining true if theres empty inputs
            keys: emptyKeys
    }
        
        
    
}