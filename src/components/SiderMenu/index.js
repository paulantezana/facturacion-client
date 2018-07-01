import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import styles from './index.scss';
import menuData from './menu';

import { Layout, Menu,  Icon } from 'antd';
import Item from "antd/lib/list/Item";
import { map } from "async";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

// trigger={null}
//         collapsible
//         collapsed={collapsed}
//         onCollapse={onCollapse}
//         width={256}
//         className={styles.sider}


        
const Aside = ({collapsed, onCollapse, logo})=>(
    <Sider 
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        onCollapse={onCollapse}
        // width={256}
        className={styles.sider}>
        <div className={styles.logo} key="logo">
            <Link to="/">
                <img src={logo} alt="logo" />
                <h1>Facturacion</h1>
            </Link>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline" className={styles.menu}>
            {
                menuData.map((menu,k)=>(
                    <Menu.Item key={k}>
                        <Icon type={menu.icon}/>
                        <span><Link to={menu.path}>{ menu.name }</Link></span>
                    </Menu.Item>
                ))
            }
        </Menu>
    </Sider>
);

Aside.prototype = {
    collapsed: PropTypes.bool.isRequired
}

export default Aside;