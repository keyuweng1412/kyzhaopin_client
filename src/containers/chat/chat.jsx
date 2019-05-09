// 对话聊天路由组件
import React, {Component} from 'react'
import {connect} from 'react-redux'
import{NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'

import {sendMsg} from '../../redux/actions'
const Item = List.Item

class Chat extends Component{
    state = {
        content: '',
        isShow: false   //是否显示表情列表
        
    }
    // 在第一次render()之前回调
    componentWillMount(){
        // 初始化表情列表数据
        const emojis = ['😀','😃','😄','😁','😴','😇','😀','😃',
                        '😀','😃','😄','😁','😴','😇','😀','😃',
                        '😀','😃','😄','😁','😴','😇','😀','😃',
                        '😀','😃','😄','😁','😴','😇','😀','😃',
                        '😀','😃','😄','😁','😴','😇','😀','😃'
                        ]
        this.emojis = emojis.map(emoji => ({text: emoji}))
    }

    componentDidMount(){
        // 初始化显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentDidUpdate(){
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }

    // 切换
    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({isShow})
        if(isShow){
            // 异步手动派发resize事件，解决表情列表显示的bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }
    // 点击发送
    handleSend = () => {
        // 收集数据
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        // 发送请求（发消息）
        if(content){
            this.props.sendMsg({from, to ,content})
        }
        // 清除输入的数据
        this.setState({
            content: '',
            isShow: false
        })
    }



    render(){
        const {user} = this.props
        const {users, chatMsgs} = this.props.chat
        // 计算当前聊天的chatId
        const meId = user._id
        if(!users[meId]){ //如果还没有获取数据，直接不做任何显示
            return null
        }
        const targetId = this.props.match.params.userid
        const chatId = [meId, targetId].sort().join('_')
       
        // 对chatMsgs进行过滤，因为chatMsg包含了我跟所有人的聊天信息，现在只需要我跟某一个人的
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
        // 得到目标用户的header图片对象
        const targetHeader = users[targetId].header
        const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.jpg`) : null
        return(
            <div id="chat-page">
                <NavBar 
                icon={<Icon type='left' />} 
                className='stick-header' 
                onLeftClick={() => this.props.history.goBack()}>{users[targetId].username}</NavBar>
                <List style={{marginTop:50, marginBottom: 50}}>
                    {
                        msgs.map(msg => {
                            if(targetId === msg.from){ //左边，对方发送给我
                                return  <Item key={msg._id} thumb={targetIcon}>{msg.content}</Item>
                            }else{ //右边, 我发送给别人
                                return  <Item key={msg._id} className="chat-me" extra='我'>{msg.content}</Item>
                            }
                        })
                    }

                    {/* <Item thumb={require('../../assets/images/头像1.jpg')}>你好</Item> */}
                    {/* <Item className="chat-me" extra='我'>很好2</Item> */}
                </List>

                <div className='am-tab-bar'>
                    <InputItem placeholder='请输入' 
                    value={this.state.content}
                    onChange ={val => this.setState({content: val})}
                    onFocus = {() => this.setState({isShow: false})}
                    extra={
                        <div>
                            <span aria-labelledby='jsx-a11y/accessible-emoji' 
                            role='img' 
                            onClick={this.toggleShow} 
                            style={{marginRight: 5}}>😀</span>  
                            <span onClick={this.handleSend}>发送</span>
                        </div>
                        } 
                    />
                    {this.state.isShow ? (
                        <Grid data={this.emojis} 
                        columnNum={8} 
                        carouselMaxRow={4} 
                        isCarousel={true} 
                        onClick={item =>{
                            this.setState({content: this.state.content + item.text})
                        }}>
                        </Grid>
                    ):null}
                    
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMsg}
)(Chat)