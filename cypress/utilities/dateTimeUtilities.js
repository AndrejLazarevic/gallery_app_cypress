class dateTimeUtilities {
    
    currentDate() {
        const dayjs = require('dayjs')
        return dayjs().format(`MMM DD, YYYY`)
    }
}

export default dateTimeUtilities;