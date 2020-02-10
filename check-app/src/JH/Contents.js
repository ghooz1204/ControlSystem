import React, {Component} from 'react';
import Working from './Working.js';
import PreWorking from './PreWorking.js';
import './Contents.css';
import axios from 'axios';

class Contents extends Component{
    constructor(props){
        super(props);
        this.state = {
            now: new Date(), // 지금 순간의 시간
            status: false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.now.getTime() !== nextState.now.getTime();
    }

    onClickListener(){
        // 오늘 저장된 출근 일지가 없을 경우(출근 시)
        let now = new Date();
        var emptyContents = ["", "", "", "", "", "", "", ""];
        axios.post('/api/journal', {
            userID: this.props.user._id,
            scheduleID: this.schedule._id,
            startTime: now,
            summary: "",
            contents: emptyContents,
            over: ""
        }).then((res) => {
            axios.put('/api/schedule', {
                scheduleID: this.schedule._id,
                journal: res.data._id
            }).then((res) => {}).catch((err) => {});
            this.journal = res.data;
            this.setState({
                now: now,
                status: true,
            });
        }).catch((err) => {});
    }

    onDateDownListener() {
        let newDate = new Date(this.state.now.getTime() + 1);
        newDate.setDate(newDate.getDate() - 1);
        this.setState({status: false, now: newDate});
    }
    onDateUpListener() {
        let newDate = new Date(this.state.now.getTime() + 1);
        newDate.setDate(newDate.getDate() + 1);
        this.setState({status: false, now: newDate});
    }

    render() {
        axios.get('/api/schedule/' + this.props.user._id, {
            params: {
                year: this.state.now.getYear(),
                month: this.state.now.getMonth(),
                day: this.state.now.getDate()
            }
        }).then((res)=>{
            if(res.data) {
                // 그 날 기록이 존재하면
                this.schedule = res.data;
                if(res.data.journal) {
                    this.journal = res.data.journal;
                    this.setState({
                        status: true,
                        now: new Date(res.data.journal.startTime)
                    });
                }
            }
            else {
                // 그 날 기록이 존재하지 않으면
                axios.post('api/schedule', {
                    userID: this.props.user._id,
                    year: this.state.now.getYear(),
                    month: this.state.now.getMonth(),
                    day: this.state.now.getDate(),
                    status: 0 // 스케줄은 있으나 출근일지가 없는 상태
                }).then((res)=>{
                    this.schedule = res.data;
                }).catch((err)=>{});
            }
        }).catch((err)=>{});

        var month=(this.state.now.getMonth()+1);
        var date=this.state.now.getDate();
        return(
            <div className='Contents_Layout'>
                <div className="date_box">
                    <button onClick={this.onDateDownListener.bind(this)}>-</button> 
                    {month}월 {date}일
                    <button onClick={this.onDateUpListener.bind(this)}>+</button>
                </div>
                {
                    this.state.status ?
                    <Working 
                        today={this.state.now}
                        user={this.props.user}
                        journal={this.journal}
                        schedule={this.schedule}
                    />
                    :                
                    <PreWorking
                        time={this.state.now}
                        onClickListener={this.onClickListener.bind(this)}
                    />
                }
            </div>
        );
    }
}
export default Contents;