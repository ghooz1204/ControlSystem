import React,{Component} from 'react';
import Nav from './Nav';
import Contents from './Contents';
import Calendar from './Calendar';
import TotalManage from '../CH/TotalManage';
import './Wrap.css';

class Wrap extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selector: [
                (<Contents user={this.props.user}/>),
                (<Calendar user={this.props.user}/>),
                (<TotalManage user={this.props.user}/>)
            ],
            selectedKey: 0
        }
    }

    onNaviClick(key) {
        this.setState({selectedKey: key});
    }

    render(){
        return(
            <div className="wrap">
                <Nav selectedKey={this.state.selectedKey} 
                    onClickListener={this.onNaviClick.bind(this)}
                />
                {this.state.selector[this.state.selectedKey]}
            </div>
        );
    }
}
export default Wrap;
