var mongoose = require('mongoose');

module.exports = function (app, Journal) {
    app.get('/api/journals', function(req, res) {
        // 모든 스케줄 열람
        Journal.find(function(err, journals){
            if (err) res.status(500).send({ error: 'database failure' });
            else res.json(journals);
        });
    });
    app.get('/api/journal', function(req, res) {
        // 특정 날짜의 모든 인물의 스케줄 열람
        Journal.findOne({ 
            scheduleID: mongoose.Types.ObjectId(req.query.scheduleID)
        }, function(err, journal) {
            if(err) res.status(500).send({error: 'database failure'});
            else res.json(journal);
        });
    });
    app.get('/api/journal/:userID', function(req, res) {
        // 특정 인물의 업무일지 열람
        Journal.find({
            userID: mongoose.Types.ObjectId(req.params.userID)
        }, function(err, journals) {
            if(err) res.status(500).send({error: 'database failure'});
            else res.json(journals);
        });
    });
    app.post('/api/journal', function(req, res) {
        // 업무일지 생성 API
        var journal = new Journal();
        journal.userID = mongoose.Types.ObjectId(req.body.userID);
        journal.scheduleID = mongoose.Types.ObjectId(req.body.scheduleID);
        journal.startTime = req.body.startTime;
        journal.contents = req.body.contents;
        journal.save(function(err) {
            if(err) {
                res.json({ result: 0 });
                console.log(err);
            }
            else res.json(journal);
        });
    });
    app.put('/api/journal', function(req, res) {
        Journal.findOne({
            scheduleID: mongoose.Types.ObjectId(req.body.scheduleID)
        }, function(err, journal) {
            if (err) return res.status(500).json({ error: 'database failure' });
            if(req.body.endTime) journal.endTime = req.body.endTime;
            if(req.body.summary) journal.summary = req.body.summary;
            if(req.body.contents) journal.contents = req.body.contents;
            if(req.body.over) journal.over = req.body.over;
            journal.save(function (err) {
                if (err) res.status(500).json({ error: 'failed to update' });
                else res.json({ message: 'user update' });
            });
        });
    });

    app.options('/api/journal', function(req, res) {
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With');
        res.send();
      });
}