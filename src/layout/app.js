import React, { PureComponent } from "react";
import { Layout, Menu, Breadcrumb, Icon, Avatar, Badge } from 'antd';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import Aside from './partials/aside';


import GlobalHeader from '../components/GlobalHeader';
import SiderMenu from '../components/SiderMenu';

import logo from '../assets/logo.png';

const fakeUser = {
    username: 'paul',
    avatar: 'http://www.gravatar.com/avatar',
}


import { ContainerQuery }  from 'react-container-query';
import classNames from 'classnames';
import { enquireScreen, unenquireScreen } from 'enquire-js';

const query = {
    'screen-xs': {
      maxWidth: 575,
    },
    'screen-sm': {
      minWidth: 576,
      maxWidth: 767,
    },
    'screen-md': {
      minWidth: 768,
      maxWidth: 991,
    },
    'screen-lg': {
      minWidth: 992,
      maxWidth: 1199,
    },
    'screen-xl': {
      minWidth: 1200,
      maxWidth: 1599,
    },
    'screen-xxl': {
      minWidth: 1600,
    },
};
let isMobile;
enquireScreen(b => {
  isMobile = b;
});


class App extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
            isMobile,
        };
        this.handleMenuCollapse = this.handleMenuCollapse.bind(this);
    }

    componentDidMount(){
        this.enquireHandler = enquireScreen(mobile => {
            this.setState({
              isMobile: mobile,
            });
        });
    }

    componentWillUnmount() {
        unenquireScreen(this.enquireHandler);
    }

    handleMenuCollapse(){
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render(){
        const { isMobile: mb } = this.state;
        const layout = (
            <Layout>
                <SiderMenu
                    logo={logo}
                    // Authorized={Authorized}
                    // menuData={getMenuData()}
                    collapsed={this.state.collapsed}
                    // location={location}
                    isMobile={mb}
                    onCollapse={this.handleMenuCollapse}
                />
                <Layout>
                    <Header style={{ padding: 0 }}>
                        <GlobalHeader
                            logo={logo}
                            currentUser={fakeUser}
                            collapsed={this.setState.collapsed}
                            isMobile={mb}
                            // onNoticeClear={this.handleNoticeClear}
                            onCollapse={this.handleMenuCollapse}
                            // onNoticeVisibleChange={this.handleNoticeVisibleChange}
                        />
                    </Header>

                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            { this.props.children }
                        </div>
                    </Content>
                </Layout>
                
            </Layout>
        )
        return (
            <ContainerQuery query={query}>
                {params => <div className={classNames(params)}>{layout}</div>}
            </ContainerQuery>
        )
    }
}

export default App;