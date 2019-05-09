// 消息主界面路由容器组件
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief
// 对chatMsgs按chat_id进行分组，并得到每一个组的lastMsg组成的数组
// 1.找出每一个聊天的lastMsg，并用一个对象容器来保存 {chat_id: lastMsg}
// 2.得到所有lastMsg的数组
// 3.对数组进行排序(按create_time降序)

function getLastMsgs(chatMsgs){
    const lastMsgObjs ={}
    chatMsgs.forEach(msg => {
        // 得到msg的聊天标示id
        const chatId = msg.chat_id;
        // 获取已保存的当前组件的lastMsg
        let lastMsg = lastMsgObjs[chatId]
        if(!lastMsg){ //没有，则当前msg就是所在组的lastMsg
            lastMsgObjs[chatId] = msg
        }else{ //有
            // 如果msg比lastMsg晚，就将msg保存为lastMsg
            if(msg.create_time > lastMsg.create_time){
                lastMsgObjs[chatId] = msg
            }
        }
    })
    // 2.得到所有lastMsg的数组
   const lastMsgs = Object.values(lastMsgObjs)
    // 3.排序
    lastMsgs.sort(function (m1, m2){//如果结果<0, 将m1放在前面，如果结果为0,不变， 如果结果>0, m2前面
        return m1.create_time - m2.create_time
    })
}

class Message extends Component{
    render(){
        const {user} = this.props
        const {users, chatMsgs} = this.props.chat
        // 对chatMsgs按chat_id进行分组
        const lastMsgs = getLastMsgs(chatMsgs)

        return (
            <List style={{marginTop:50, marginBottom: 50}}>
                <Item extra={<Badge text={3}></Badge>} 
                thumb={require(`../../assets/images/头像1.jpg`)} 
                arrow ='horizontal'>你好
                <Brief>nr1</Brief>
                </Item>
            </List>
        )
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {}
)(Message)