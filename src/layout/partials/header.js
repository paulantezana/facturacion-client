import React, { Component } from "react";
import PropTypes from 'prop-types';

import styles from './header.scss';

import { Layout, Menu, Breadcrumb, Icon, Avatar, Badge, Dropdown } from 'antd';
const SubMenu = Menu.SubMenu;
import { Row, Col } from 'antd';

import { Link } from 'react-router-dom';


const menu = (
    <Menu className="user-menu">
        <Menu.Item key="1" >
            <Icon type="user" />
            <Link to="/perfil">Perfil</Link>
        </Menu.Item>
        <Menu.Item key="2">
            <Icon type="setting" />
            <Link to="/perfil/config">Configuracion</Link>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="3">
            <Icon type="logout" />
            <Link to="/logout">Cerrar Session</Link>
        </Menu.Item>
    </Menu>
  );


  const onClick = function ({ key }) {
    message.info(`Click on item ${key}`);
  };


class HeaderApp extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {
            currentUser = {},
            collapsed,
            isMobile,
            logo,
            onToggleSide,
        } = this.props;
        return (
            <header className={styles.header}>
                { isMobile && [
                    <Link to="/" className={styles.logo} key="logo">  
                        <img src={logo} alt="logo" width="32" />
                    </Link>,
                    <Divider type="vertical" key="line" />,
                ]}
                <Row type="flex" justify="space-between">
                    <Col>
                        <Icon className="trigger trigger--toggle" type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={onToggleSide}/>
                    </Col>
                    <Col>
                        <span className={styles.action}>
                            <Badge count={15} dot>
                                <Icon type="notification" />
                            </Badge>
                        </span>
                        <span className={styles.action}>
                            <Badge count={10} dot>
                                <Icon type="bell" />
                            </Badge>
                        </span>
                        <Dropdown overlay={menu}>
                            <span className="ant-dropdown-link action">
                                <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf', margin: '0 8px 0 0' }}>U</Avatar>
                                <span>User name</span>
                            </span>
                        </Dropdown>
                    </Col>
                </Row>
            </header>
        );
    }
}

HeaderApp.prototype = {
    onToggleSide:  PropTypes.func.isRequired,
    collapsed: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
    isMobile: PropTypes.bool,
    logo: PropTypes.string,
}

export default HeaderApp;