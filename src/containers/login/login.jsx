// 登录路由组件
import React, {Component} from 'react';
import {NavBar, 
    WingBlank, 
    List, 
    InputItem, 
    WhiteSpace, 
    Button} from 'antd-mobile';
import Logo from '../../components/logo/logo';

import {connect} from 'react-redux';
import {login} from '../../redux/actions';

import {Redirect} from 'react-router-dom';

class Login extends Component{
    state = {
        username: '',
        password: ''
        
    }
    // 点击登录
    login = () =>{
        // console.log(this.state);
        this.props.login(this.state)
        
    }
    // 处理输入数据的改变
    handleChange = (name,val) =>{
        // 更新状态
        this.setState({
            // 属性名不是name，而是name变量的值，用过加中括号
            [name]:val 
        })
    }
    // 点击进入注册页面
    toRegister = ()=>{
        this.props.history.replace('/register')
    }

    render(){
        const {msg, redirectTo} = this.props.user;
        // 如果redirectTo有值，需要重定向到指定路由
        if(redirectTo){
            return <Redirect to={redirectTo} />
        }

        return(
            <div>
                <NavBar>K&nbsp;Y&nbsp;直聘</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        {msg ? <div className='error-msg'>{msg}</div> : null}
                        <InputItem placeholder='请输入用户名' onChange={(val) => {this.handleChange('username',val)}}>用户名:</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder='请输入密码' type='password' onChange={(val) => {this.handleChange('password',val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace />
                        <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
                        <WhiteSpace />
                        <Button onClick={this.toRegister}>还没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({
        user:state.user
    }),
    {login}
)(Login);