import React,{Component} from 'react';
import './Contents.css';
import './Working.css';

import axios from 'axios';

class Timer extends Component {
    render() {
        return (
            <div className="working_time">
                {this.props.title} <strong>{this.props.time.getHours()}시 {this.props.time.getMinutes()}분</strong>
            </div>
        )
    }
}

class Working extends Component {

    constructor(props) {
        super(props);
        this.state = {
            summary: this.props.journal.summary,
            over: this.props.journal.over,
            end: this.props.journal.endTime
        }
        if(this.state.end) this.state.end = new Date(this.state.end);
    }

    onScheduleRegist() {
        // 스케줄 등록
        var summary = document.getElementsByName('summary')[0].value; // 업무 요약
        var time_slice = document.getElementsByName('time_slice'); // 업무 일지
        var contents = Array.prototype.slice.call(time_slice).map((ct) => { return ct.value; });
        var over = document.getElementsByName('add')[0].value; // 야근 일지
        axios.put('/api/journal', {
            scheduleID: this.props.schedule._id,
            summary: summary,
            contents: contents,
            over: over
        }).then((res) => {
            alert('스케줄 등록 완료');
        }).catch((err)=>{
            console.log(err);
        });
    }
    onScheduleEnd() {
        // 퇴근
        if (window.confirm("퇴근하시겠습니까?")) {
            var endTime = new Date();
            axios.put('/api/journal', {
                scheduleID: this.props.schedule._id,
                endTime: endTime
            }).then((res) => {
                alert('퇴근 완료');
                this.setState({ end: endTime });
            }).catch((err) => { });
        }
    }

    render() {
        const contentList = this.props.journal.contents.map((content, i) => {
            return <input 
                key={i}
                name='time_slice'
                type='text'
                placeholder={(i + 10) + "시 ~ " + (i + 11) + "시"}
                className='week_report_input'
                defaultValue={content}
            />
        });
        return(
            <div className='Working_Layout'>
                <div className='leave_box'>
                    <Timer 
                        title='출근'
                        time={this.props.today}/>
                    {
                        this.state.end ?
                        (<Timer 
                            title='퇴근'
                            time={this.state.end}/>)
                        :
                        (<button className='button_design'
                            disabled={this.state.end}
                            onClick={this.onScheduleEnd.bind(this)}>퇴근</button>)
                    }
                </div>
                 <div className='work_report_box'>
                    <div className='summary_box'>
                        <h2>업무일지</h2>
                        <div className='active_box'>
                            <input name='summary' defaultValue={this.state.summary} type="text" className='work_Summary' placeholder='업무요약'/>
                            <button className='button_design save_button'
                                disabled={this.state.end}>
                            저장</button>
                            <button className='button_design resist_button'
                                disabled={this.state.end}
                                    onClick={this.onScheduleRegist.bind(this)}>등록</button>
                        </div>
                    </div>
                    <div className='work_report'>
                        <div className='week_report'>
                        { contentList }
                    </div>
                    <div className='night_report'>
                        <textarea name='add' defaultValue={this.state.over} className='night_report_textarea' placeholder='야근 일지'>
                        </textarea>
                    </div>
                </div> 
                </div>
            </div>
        );
    }
}
 export default Working;