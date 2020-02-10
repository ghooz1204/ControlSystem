import React,{Component} from 'react';
import './preWorking.css';
import './Contents.css';
class PreWorking extends Component{
    constructor(props) {
        super(props);
        this.now = new Date();
        this.now.setDate(this.now.getDate() - 1);
    }
    handleClick() {
        this.props.onClickListener();
    }
    render(){
        return(
            <div className='PreWorking_Layout'>
            {
                this.now < this.props.time ?
                (<button onClick={this.handleClick.bind(this)}
                    className="work_starting">+ 출근 및 업무 생성</button>)
                :
                (<button
                    className="work_starting">지난 날짜 띠</button>)
            }
            </div>
        );
    }
}
export default PreWorking;