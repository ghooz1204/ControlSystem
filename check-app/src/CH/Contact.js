import React from 'react';
import './Contact.css';

class ContactTitle extends React.Component {
    render() {
        return (
            <h1 className="head-line3 medium">
                {this.props.title}
            </h1>
        );
    }
}

class ContactAction extends React.Component {
    handleChangeClick() {
        this.props.onChangeListener();
    }
    handleActiveClick() {
        this.props.onClickListener();
    }
    render() {
        return (
            <div className="ContactBtnArea">
                <button style={this.props.state.style.grey}
                    className="ContactBtn bold button"
                    onClick={this.handleChangeClick.bind(this)}>
                    {this.props.state.text.greyBtn}
                </button>
                <button style={this.props.state.style.blue} 
                    className="ContactBtn bold button"
                    onClick={this.handleActiveClick.bind(this)}>
                    {this.props.state.text.blueBtn}
                </button>
            </div>
        )
    }
}

class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : "",
            password : ""
        }
    }
    onChangeListener(e) {
        var newState = {}
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }
    handleChangeClick() {
        this.props.onChangeListener();
    }
    handleActiveClick() {
        if(this.state.name !== "" && this.state.password !== "")
            this.props.onClickListener(this.state.name, this.state.password);
        else
            alert('이름과 비밀번호를 입력하세요.');
    }
    render() {
        return (
            <div>
                <ContactTitle title={this.props.state.title}/>
                <input className="ContactBox bold sub-title2" 
                    name="name"
                    onChange={this.onChangeListener.bind(this)}
                    type="text"
                    placeholder="이름"
                />
                <br></br>
                <input className="ContactBox bold sub-title2"
                    name="password"
                    onChange={this.onChangeListener.bind(this)}
                    type="password"
                    placeholder="패스워드"
                />
                <ContactAction
                    state={this.props.state.button}
                    onChangeListener={this.handleChangeClick.bind(this)}
                    onClickListener={this.handleActiveClick.bind(this)}
                />
            </div>
        );
    }
};

export default Contact;