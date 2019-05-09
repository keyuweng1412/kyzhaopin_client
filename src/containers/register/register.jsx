// 注册路由组件
import React, {Component} from 'react';
import {NavBar, 
        WingBlank, 
        List, 
        InputItem, 
        WhiteSpace, 
        Radio, 
        Button} from 'antd-mobile';
import Logo from '../../components/logo/logo';

import {connect} from 'react-redux';
import {registers} from '../../redux/actions';

import {Redirect} from 'react-router-dom';

const ListItem = List.Item;

class Register extends Component{
    state = {
        username: '',
        password: '',
        password2: '',
        type: 'laoban'
    }
    // 点击注册
    register = ()=>{
        // console.log(this.state);
        this.props.registers(this.state)
        
    }
    // 处理输入数据的改变
    handleChange = (name,val) =>{
        // 更新状态
        this.setState({
            // 属性名不是name，而是name变量的值，用过加中括号
            [name]:val 
        })
    }
    // 点击已有账户进入登录页面
    toLogin = ()=>{
        this.props.history.replace('/login')
    }
    
    render(){
        const {type} = this.state;
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
                        <InputItem placeholder='请输入确认密码' type='password' onChange={(val) => {this.handleChange('password2',val)}}>确认密码:</InputItem>
                        <WhiteSpace />
                        <ListItem>
                            <span>用户类型:</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'dashen'} onChange={() => {this.handleChange('type','dashen')}}>大神</Radio>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'laoban'}onChange={() => {this.handleChange('type','laoban')}}>老板</Radio>
        
                        </ListItem>
                        <WhiteSpace />
                        <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace />
                        <Button onClick={this.toLogin}>已有账户</Button>
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
    {registers}
)(Register);