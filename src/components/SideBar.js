import React, { Component } from "react";
import { Layout, Menu } from 'antd';
const { Sider } = Layout;
import _ from "underscore";

class SideBar extends Component {
    //collapsed={this.state.collapsed}
    render() {
        let { emiData, selectEmiHandler } = this.props;
        return (
            <Sider trigger={null} collapsible>
                <Menu theme="dark" mode="inline">
                    {
                       emiData.length > 0 && _.map(emiData, (data, index) => {
                            return (
                                <Menu.Item key={index}>
                                   <span onClick={() => selectEmiHandler(data) } className="history-record">
                                        <i className="fas fa-hand-holding-usd">  {data.principal.amount} $ </i>
                                        <i className="fas fa-hourglass-start">  {data.numPayments} m </i>
                                    </span>
                                </Menu.Item>
                            )
                        })
                    }
                   
                </Menu>
            </Sider>
        )
    }
}
export default SideBar;