import React,{Component} from 'react'
import './Nav.css';
import './Wrap.css';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [
                {name: "업무관리"},
                {name: "캘린더"},
                {name: "종합관리"},
            ]
        };
    }
    
    handleClick(key) {
        this.props.onClickListener(key);
    }

    render(){
        return(
            <div className="Nav_Layout">
            {
                this.state.Data.map((Data, i) => {
                    return (
                        <Category 
                            name={Data.name}
                            key={i}
                            id={i}
                            selectedKey={this.props.selectedKey}
                            onClickListener={this.handleClick.bind(this)}        
                        />
                    );
                })
            }
            </div>
        );
    }
}
class Category extends React.Component {
    
    handleClick() {
        this.props.onClickListener(this.props.id);
    }

    render() {
        return(
            <li className='select_Category'
                onClick={this.handleClick.bind(this)}
            >
            {this.props.name}
            </li>
        );
    }
}
export default Nav;