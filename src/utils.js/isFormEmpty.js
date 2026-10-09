export default function isFormEmpty(obj) {
    for (const [key, value] of Object.entries(obj)) {
        const valueToStr = String(value)

        if (valueToStr.trim() === '') {
            return {
                isEmpty: true,
                key: key
            }
        }
    }

    return {
        isEmpty: false,
        key: null
    }
}