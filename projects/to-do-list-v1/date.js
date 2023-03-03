const dateOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
};

exports.today = new Date().toLocaleDateString('en-US',  dateOptions);