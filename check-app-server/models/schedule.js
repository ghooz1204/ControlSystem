var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
    userID: { // 사용자 이름
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    year: Number, // 날짜(연)
    month: Number, // 날짜(월)
    day: Number, // 날짜(일)
    status: Number, // 출근 상태
    journal: { // 출근 일지
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journal'
    }
});
ScheduleSchema = mongoose.model('Schedule', scheduleSchema);

module.exports = ScheduleSchema;
