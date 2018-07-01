import React, { PureComponent } from "react";
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;


import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
} from "react-router-dom";


import GlobalHeader from '../components/GlobalHeader';
import SiderMenu from '../components/SiderMenu';
import GlobalFooter from '../components/GlobalFooter';

import logo from '../assets/logo.png';
import { PrivateRoute, Logout } from '../utils/auth';
import menu from '../common/menu';

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


const con1 = ()=> <h1>H1</h1>
const con2 = ()=> <h1>H2</h1>
const con3 = ()=> <h1>H3</h1>
const con4 = ()=> <h1>H4</h1>


class App extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
            isMobile,
        };
        this.handleMenuCollapse = this.handleMenuCollapse.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleSideMenuClick = this.handleSideMenuClick.bind(this);
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

    handleSideMenuClick({key}){
        menu & menu.map(m=>{
            if (m.id === key){
                this.props.history.push(m.path);
            }
        });
    }

    handleMenuClick({key}){
        if(key === 'logout'){
            Logout();
        }
    }

    render(){
        const { isMobile: mb } = this.state;
        const layout = (
            <Layout>
                <SiderMenu
                    logo={logo}
                    onMenuClick={this.handleSideMenuClick}
                    // Authorized={Authorized}
                    menuData={menu}
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
                            onMenuClick={this.handleMenuClick}
                            onCollapse={this.handleMenuCollapse}
                        />
                    </Header>

                    <Content style={{ margin: '0 16px' }}>
                        <Switch>
                            <PrivateRoute path='/1' component={con1}/>
                            <PrivateRoute path='/2' component={con2}/>
                            <PrivateRoute path='/3' component={con3}/>
                        </Switch>
                    </Content>

                    <Footer style={{ padding: 0 }}>
                        {/* <GlobalFooter
                            links={[
                                {
                                    key: 'client',
                                    title: [<Icon type="github" />,' Client'],
                                    href: 'https://github.com/paulantezana/facturacion-client',
                                    blankTarget: true,
                                },
                                {
                                    key: 'server',
                                    title: [<Icon type="github"/>,' Server'],
                                    href: 'https://github.com/paulantezana/facturacion-go',
                                    blankTarget: true,
                                },
                                {
                                    key: 'author',
                                    title: [<Icon type="user" />,' Paul Antezana'],
                                    href: 'https://paulantezana.com',
                                    blankTarget: true,
                                },
                            ]}
                        /> */}
                    </Footer>
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