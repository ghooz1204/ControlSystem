import React from 'react';
import Header from './CH/Header';
import Contact from './CH/Contact';
import Wrap from './JH/Wrap';
import './App.css';

import axios from 'axios';

const formLogin = {
  title: '통합 근무 관리 시스템',
  button: {
  text: {
    greyBtn: "회원가입",
    blueBtn: "로그인"
  },
  style: {
      blue: {
        backgroundColor: "#0066FF",
        marginLeft: "20px"
      }
    }
  }
}
const formRegist = {
  title: '회원가입',
  button: {
    text: {
      greyBtn: "취소",
      blueBtn: "등록"
    },
    style: {
      blue: {
        backgroundColor: "#0066FF",
        marginLeft: "20px"
      }
    }
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.state;
    this.state.onClickListener = this.onLoginListener;
  }

  onChangeListener() {
    if(this.state.form.title !== '회원가입') {
      this.setState({
        form: formRegist,
        onClickListener: this.onRegistListener
      });
    } else {
      this.setState({
        form: formLogin,
        onClickListener: this.onLoginListener
      });
    }
  }
  onRegistListener(name, password) {
    // 데이터베이스에 동일한 아이디가 있는지 확인
    axios.get('/api/users/' + name).then((res) => {
        if(res.data.error) {
          // 데이터가 없으면(아이디가 존재하지 않는다)
          axios.post('api/users', {
            // 입력된 아이디와 비밀번호로 회원가입 요청
            name: name,
            password: password      
          }).then((res) => {
            // 회원가입 요청 완료
            if(res.data.result)
              alert('회원가입 되었습니다');
            else
              alert('오류 발생');
            this.onChangeListener(); // 로그인 페이지로 넘어감
          }).catch(function(err){});
        }
        else alert('중복된 아이디입니다.');
    }).catch(function(err){});
  }
  onLoginListener(name, password) {
    // 데이터베이스에 저장된 아이디와 그에 매칭된 패스워드가 일치하는지 확인
    axios.get('/api/users/' + name).then((res) => {
      // 아이디가 존재하는지 확인
      if(res.data) {
        // 아이디가 존재하는 경우
        if(res.data.password === password) {
          // 그 패스워드가 일치하는지 확인 후 상태 변경(메인 화면 이동) 
          this.setState({
            user: res.data,
            type: 'off'
          });
        }
        else
          // 비밀번호가 다를 경우
          alert('이름과 비밀번호가 일치하지 않습니다.');
      }
    })
    .catch(function(err){
      console.log(err);
    });
  }

  render() {
    return (
      <div className="App">
        <section className="App-content">
          <Header type={this.state.type}/>
          {
            this.state.user === null ?
              (
                // 회원가입, 로그인 부
                <Contact
                  onChangeListener={this.onChangeListener.bind(this)}
                  onClickListener={this.state.onClickListener.bind(this)}
                  state = {this.state.form}
                />
              )
              :
              (
                // 회원가입 후 메인 화면
                <Wrap
                  user={this.state.user} // 유저 정보 넘김
                />
              )
          }
        </section>
      </div>
    );
  }
}
App.defaultProps = {
  state: {
    user: null, // 유저 명이 없다(로그인을 해야한다)
    type: 'on',
    form: formLogin
  }
}
export default App;
