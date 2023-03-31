const dateFormat = ({ date, format }) => {
    if (format === 'short') {
        return new Date(date).toLocaleString().split(',')[0];
    } else if (format === 'with time') {
        return new Date(date).toLocaleString().split(',')[0] + ' ' + new Date(date).toLocaleTimeString()
    } else {
        return new Date(date).toDateString().split(',')[0];
    }
}

export default dateFormat;