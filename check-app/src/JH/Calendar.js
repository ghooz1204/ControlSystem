import React,{Component} from 'react';
import Calendar from 'react-calendar';
import DatePicker from "react-datepicker";
import axios from 'axios';
import './Calendar.css';
import './Contents.css';
import '../../node_modules/react-datepicker/dist/react-datepicker.css'

class Schedule extends Component {

    state = { 
        startDate: new Date(),
        endDate: new Date()
    }
    
    handleStartChange = date => {
        if(this.state.endDate > date){
            this.setState({
                startDate: date
            });
        }
        else {
            alert('날짜를 초과할 수 없습니다.');
        }
    };

    handleEndChange = date => {
        if(this.state.startDate < date){
            this.setState({
                endDate: date
            });
        }
        else {
            alert('날짜를 초과할 수 없습니다.');
        }
    };

    onCreateSchedule() {
        let contents = ["", "", "", "", "", "", "", ""];
        let status = 1;
        let title = document.getElementById('scheduleTitle').value;
        axios.get('/api/schedule/' + this.props.user._id, {
            params: {
                year: this.state.startDate.getYear(),
                month: this.state.startDate.getMonth(),
                day: this.state.startDate.getDate()
            }
        }).then((res)=>{
            if(!res.data) {
                // 그 날 기록이 존재하지 않으면
                axios.post('api/schedule', {
                    userID: this.props.user._id,
                    year: this.state.startDate.getYear(),
                    month: this.state.startDate.getMonth(),
                    day: this.state.startDate.getDate(),
                    status: status // 스케줄은 있으나 출근일지가 없는 상태
                }).then((res)=>{
                    let schedule = res.data;
                    axios.post('/api/journal', {
                        userID: this.props.user._id,
                        scheduleID: schedule._id,
                        startTime: this.state.startDate,
                        summary: title,
                        contents: contents,
                        over: ""
                    }).then((res) => {
                        axios.put('/api/schedule', {
                            scheduleID: schedule._id,
                            journal: res.data._id
                        })
                    })
                })
            }
            else {
                // 기록이 있다면 기록 갱신
                if(window.confirm('이전 기록을 갱신할까요?')){
                    let schedule = res.data;
                    axios.post('/api/journal', {
                        userID: this.props.user._id,
                        scheduleID: schedule._id,
                        startTime: this.state.startDate,
                        summary: title,
                        contents: contents,
                        over: ""
                    }).then((res) => {
                        axios.put('/api/schedule', {
                            scheduleID: schedule._id,
                            status: status,
                            journal: res.data._id
                        })
                    })
                }
            }
        })
    }

    render(){
        return(
            <div className='Schedule'>
                <div className='Calender_wrap'>
                    <div className='Calendar_Contents'>
                       <Calendar className='react-calendar'></Calendar>
                    </div>
                    <div className='Schedule_Contents'>
                        <strong className='schedule_text'>제목</strong> <br/>
                        <input type='text' id='scheduleTitle'/>
                        <br/><br/>
                        <strong className='schedule_text'>일자</strong> <br/>
                        <DatePicker 
                            onChange={this.handleStartChange}
                            selected={this.state.startDate}
                            showTimeSelect
                            dateFormat="Pp"/>
                        &nbsp;부터&nbsp;
                        <DatePicker 
                            onChange={this.handleEndChange}
                            selected={this.state.endDate}
                            showTimeSelect
                            dateFormat="Pp"/>
                        <br/><br/>

                        <strong className='schedule_text'>일정 종류</strong> <br/>
                
                        <input type='checkbox' name='reason' value='vacation'/>휴가 &nbsp; &nbsp;
                        <input type='checkbox' name='reason' value='homework'/>자택근무 &nbsp; &nbsp;
                        <input type='checkbox' name='reason' value='businesstrip'/>출장 &nbsp; &nbsp;
                        <input type='checkbox' name='reason' value='meeting'/>미팅 &nbsp; &nbsp;
                        <input type='checkbox' name='reason' value='etc'/>기타일정 &nbsp; &nbsp;
                        <br/><br/>

                        <strong className='schedule_text'>참여자</strong> <br/>
                        <input type='checkbox' name='participant' value='sole'/>개인 &nbsp; &nbsp;
                        <input type='checkbox' name='participant' value='team'/>팀 &nbsp; &nbsp;
                        <br/><br/>
                        <button 
                            className='button_design Schedule_submit_btn'
                            onClick={this.onCreateSchedule.bind(this)}>일정생성</button>
                    </div>
                    <div className='View_Working_State'>
                        
                    </div>

                </div>
                   
            </div>
        );
    }
}
export default Schedule;