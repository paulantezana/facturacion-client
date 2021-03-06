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
import { PrivateRoute, Logout, GetUser } from '../utils/auth';
import menu from '../common/menu';

console.log(GetUser());
const fakeUser = {
    username: 'GetUser().nombre',
    avatar: 'GetUser().avatar',
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


//////////////////////////////////////////////////////////////////////////////////////////////////
import Compra from '../routes/Compra';
import Dashboard from '../routes/Dashboard';
import Producto from '../routes/Producto';
import Tercero from '../routes/Tercero';
import Usuario from '../routes/Usuario';
import Venta from '../routes/Venta';


//////////////////////////////////////////////////////////////////////////////////////////////////

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
            this.props.history.push('/');
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

                    <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                        <Switch>
                            <PrivateRoute exact path='/compra' component={Compra}/>
                            <PrivateRoute exact path='/' component={Dashboard}/>
                            <PrivateRoute exact path='/producto' component={Producto}/>
                            <PrivateRoute exact path='/tercero' component={Tercero}/>
                            <PrivateRoute exact path='/usuario' component={Usuario}/>
                            <PrivateRoute exact path='/venta' component={Venta}/>
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