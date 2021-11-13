const dateTimeUtils = require('./dateTimeUtils');

module.exports.error = function(message){
    console.log(`[Err | ${dateTimeUtils.getCurrentDateTimeString()}] : ${message}`);
}

module.exports.info = function(message){
    console.log(`[Info | ${dateTimeUtils.getCurrentDateTimeString()}] : ${message}`);
}
module.exports.debug = function(message){
    console.log(`[Debug | ${dateTimeUtils.getCurrentDateTimeString()}] : ${message}`);
}