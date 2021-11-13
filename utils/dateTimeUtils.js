function getTimeZone(){
    var offset = new Date().getTimezoneOffset() / -60;
    if(offset < 0){
        return `(UTC ${offset})`
    }else{
        return `(UTC +${offset})`
    }
}


module.exports.getCurrentDateTimeString = function() {
    var date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    var date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    var year = date_ob.getFullYear();

    // current hours
    var hours = date_ob.getHours();

    // current minutes
    var minutes = date_ob.getMinutes();

    // current seconds
    var seconds = date_ob.getSeconds();

    var timezone = getTimeZone();

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + " " + timezone;
}