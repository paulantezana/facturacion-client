import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import styles from './index.scss';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Badge } from 'antd';

export default class GlobalHeader extends PureComponent {
    constructor(props){
        super(props);
    }
    render(){
        const {
            currentUser = {},
            collapsed,
            isMobile,
            logo,
            onCollapse,
        } = this.props;

        const menu = (
            <Menu className={styles.menu} selectedKeys={[]}>
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
        )

        return (
            <header className={styles.header}>
                {isMobile && [
                    <Link to="/" className={styles.logo} key="logo">
                        <img src={logo} alt="logo" width="32" />
                    </Link>,
                    <Divider type="vertical" key="line" />,
                ]}
                <Icon
                    className={styles.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={onCollapse}/>
                <div className={styles.right}>
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
                    { currentUser.username ? (
                        <Dropdown overlay={menu}>
                            <span className={`${styles.action} ${styles.account}`}>
                                <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                                <span className={styles.name}>{currentUser.username}</span>
                            </span>
                        </Dropdown>
                    ) : (
                        <Spin size="small" style={{ marginLeft: 8 }} />
                    )}
                </div>
            </header>
        );
    }
}