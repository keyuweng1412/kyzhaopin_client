import React, {Component} from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item
// 如何在非路由组件中使用路由库的api
// withRouter()

class NavFooter extends Component{
    // 接收传过来属性
    static propTypes = {
        navList: PropTypes.array.isRequired
    }

    render(){
        let {navList} = this.props
        // 过滤掉hide为true的nav
        navList = navList.filter(nav => !nav.hide)
        // 路由组件才能读取this.props.location.pathname
        const path = this.props.location.pathname
       return (
           <TabBar>
               {
                   navList.map((nav,index) => (
                    <Item key={nav.path} 
                    title={nav.text}
                    icon={{uri:require(`./images/${nav.icon}.png`)}} 
                    selectedIcon={{uri:require(`./images/${nav.icon}-selected.png`)}}
                    selected={path === nav.path}
                    onPress={()=>this.props.history.replace(nav.path)}></Item>
                   ))
               }
           </TabBar>
       )
    }
}
// 向外暴露一个withRouter()包装产生的组件
// 内部会向被包装的组件传入一些路由组件特有的属性:history/location/math
export default withRouter(NavFooter)