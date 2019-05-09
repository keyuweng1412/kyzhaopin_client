// 主界面路由组件
import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import LaobanInfo from '../laoban-info/laoban-info'
import DashenINfo from '../dashen-info/dashen-info'
import {connect} from 'react-redux'
// 操作前端cookie的对象
import Cookies from 'js-cookie';
import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'

import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import {NavBar} from 'antd-mobile'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'


class Main extends Component{


    navList = [
        {
            path: '/laoban',
            component: Laoban,
            title: '大神列表',
            icon: 'dashen',
            text: '大神'
        },
        {
            path: '/dashen',
            component: Dashen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板'
        },
        {
            path: '/message',
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息'
        },
        {
            path: '/personal',
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人' 
        }
    ]

    componentDidMount(){
        // 登录过（cookie中有userid），但没有登录（redux管理的user中没有_id)，发请求获取对应的user
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if (userid && !_id) {
            // 发送异步请求，获取user
            // console.log('发送ajax');
            this.props.getUser()
        }
    }

    render(){
        // // 检查用户是否登录，如果没有，自动重定向到登录界面
        // const {user} = this.props
        // if (!user._id) {
        //     return <Redirect to='/login' />
        // }

        
        // 读取cookie中的userid
        const userid = Cookies.get('userid')
        // 如果没有，自动重定向到登录界面
        if (!userid) {
            return <Redirect to='/login' />
        }
        // 如果有，读取redux中的user状态
        const {user} = this.props
        // 如果user没有_id, 返回null（不做任何显示）
        if (!user._id) {
            return null
        }else{
            // 如果有_id,显示对应的界面
            // 如果请求根路径，根据user的type和header来计算出一个重定向的路由路径，并自动重定向
            let path = this.props.location.pathname
            if (path === '/') {
                // 得到一个重定向的路由路径
                path = getRedirectTo(user.type, user.header)
                return <Redirect to={path} />
            }
        }

        const {navList} = this
        // 请求的路径
        const path = this.props.location.pathname
        // 得到当前的nav，可能没有
        const currentNav = navList.find(nav => nav.path === path)

        if (currentNav) {
            // 决定哪个路由需要隐藏
            if(user.type === 'laoban'){
                // 隐藏数组的第2个
                navList[1].hide = true
            }else{
                // 隐藏数组的第一个
                navList[0].hide = true
            }
        }

        return(
            <div>
                {currentNav ? <NavBar className='stick-header'>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map(nav =>  <Route key={nav.path} path={nav.path} component={nav.component} />)
                    }
                    <Route path='/laobaninfo' component={LaobanInfo} />
                    <Route path='/dasheninfo' component={DashenINfo} />
                    <Route path='/chat/:userid' component={Chat}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
                {currentNav ? <NavFooter navList={navList}></NavFooter> : null}
            </div>
        )
    }
}

export default connect(
    // 接收一个state
    (state) => ({user:state.user}),
    {getUser}
)(Main)