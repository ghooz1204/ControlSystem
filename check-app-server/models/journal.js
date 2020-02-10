var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var journalSchema = new Schema({
    userID: { // 사용자 이름
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    scheduleID: { // 스케줄 아이디
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule',
        required: true
    },
    startTime: {type: Date, required: true}, // 출근 시간
    endTime: Date, // 퇴근 시간
    summary: String, // 요약
    contents: [String], // 시간과 내용
    over: String // 야근 일지
});
JournalSchema = mongoose.model('Journal', journalSchema);

module.exports = JournalSchema;