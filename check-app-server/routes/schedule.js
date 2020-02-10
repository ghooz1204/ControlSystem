var mongoose = require('mongoose');

module.exports = function(app, Schedule) {
    app.get('/api/schedules', function(req, res) {
        // 모든 스케줄 열람
        Schedule.find(function(err, schedules){
            if(err) res.status(500).send({error: 'database failure'});
            else res.json(schedules);
        });
    });

    app.get('/api/schedule', function(req, res) {
        // 특정 날짜의 모든 인물의 스케줄 열람
        Schedule.find({ 
            year: req.query.year,
            month: req.query.month,
            day: req.query.day
        }, function(err, schedules) {
            if(err) res.status(500).send({error: 'database failure'});
            else res.json(schedules);
        });
    });

    app.get('/api/schedule/:userID', function(req, res) {
        // 개인의 특정 날짜 스케줄 열람
        Schedule.findOne({
            userID: mongoose.Types.ObjectId(req.params.userID),
            year: req.query.year,
            month: req.query.month,
            day: req.query.day
        }).populate('journal').exec((err, schedule) => {
            if(err) res.status(500).send({err: 'database faulure'});
            else res.json(schedule);
        });
    });

    app.post('/api/schedule', function(req, res) {
        // 스케줄 생성 API
        var schedule = new Schedule();
        schedule.userID = mongoose.Types.ObjectId(req.body.userID);
        schedule.year = req.body.year;
        schedule.month = req.body.month;
        schedule.day = req.body.day;
        schedule.status = req.body.status;
        schedule.save(function(err) {
            if(err) {
                res.json({result:0});
                console.log(err);
            }
            else res.json(schedule);
        });
    });

    app.put('/api/schedule', function(req, res) {
        // 스케줄 갱신 API()
        Schedule.findOne({
            _id: mongoose.Types.ObjectId(req.body.scheduleID)
        }, function(err, schedule) {
            schedule.journal = mongoose.Types.ObjectId(req.body.journal);
            schedule.save(function (err) {
                if (err) {
                    res.json({ result: 0 });
                    console.log(err);
                }
                else res.json(schedule);

            })
        })
    });


    app.options('/api/schedule', function(req, res) {
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With');
        res.send();
      });
}