import React from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import './TotalManage.css'

class UserScheduleViewer extends React.Component {

    render() {
        var schedule = this.props.schedule;
        var output;
        if (schedule) {
            var journal = schedule.journal;
            var startTime = null;
            var endTime = null;
            if (journal) {
                if (journal.startTime) {
                    // 출근을 했으면
                    var st = new Date(journal.startTime);
                    startTime =
                        st.getHours() + "시 " +
                        st.getMinutes() + "분 " +
                        st.getSeconds() + "초";
                    if (journal.endTime) {
                        // 퇴근 했으면
                        var et = new Date(journal.endTime);
                        endTime =
                            et.getHours() + "시 " +
                            et.getMinutes() + "분 " +
                            et.getSeconds() + "초";
                    }
                    output = (
                        <div className='personal-time'>
                            출근 : {startTime}<br />
                            퇴근 : {endTime}
                        </div>);
                }
                return (
                    <div className='personal-schedule'>
                        <div className='personal-user-name'>
                            이름: {this.props.user.name}
                        </div>
                        <div className='personal-summary'>
                            요약: {journal.summary}
                        </div>
                        {output}
                    </div>
                );
            }
        }
        return (
            <div className='personal-schedule'>
                <div className='personal-user-name'>
                    이름: {this.props.user.name}
                </div>
                <div className='personal-summary'>
                    미출근
                </div>
                {output}
            </div>
        );
    }

}

class TotalManage extends React.Component {

    users = [];

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            dateSchedules: []
        }
        axios.get('api/users')
        .then((res) => {
            this.users = res.data;
        }).catch((err)=>{});
    }

    onDateChange = date => {
        var userSchedules = [];
        var users = this.users;
        for (let i = 0; i < users.length; i++) {
            axios.get('/api/schedule/' + users[i]._id, {
                params: {
                    year: date.getYear(),
                    month: date.getMonth(),
                    day: date.getDate()
                }
            })
            .then((res) => {
                userSchedules.push({user: users[i], schedule: res.data});
                if (userSchedules.length === users.length) {
                    this.setState({date: date, dateSchedules: userSchedules});
                }
            }).catch((err) => { console.log(err); });
        }
    }

    render(){
        let scheduleList = this.state.dateSchedules.map((data, i) => {
            return (
                <UserScheduleViewer 
                    key={i}
                    user={data.user}
                    schedule={data.schedule}/>
                );
        });
        return (
            <div className='total-manage'>
                <Calendar
                    className="react-calendar"
                    onChange={this.onDateChange}
                />
                <div className='schedule-viewer'>
                    {
                        scheduleList
                    }
                </div>
            </div>
        );
    }
}

export default TotalManage;