import React, { PureComponent } from 'react';
import { Table, Card, Button, Icon, Divider, Avatar, Modal, Form, Spin, Alert } from 'antd';

import gql from "graphql-tag";
import { Query } from "react-apollo";

import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';


const GET_USUARIOS = gql`{
    Usuarios {
        id
        usuario
        avatar
        nombre
        email
    }
}`;



class Usuario extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            visibleModal: false,
        }
        this.showModal = this.showModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    showModal(){
        this.setState({
            visibleModal: true
        });
    }

    handleChange(pagination, filters, sorter){
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    render(){
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};

        const columns = [
            {
                title: 'Avatar',
                dataIndex: 'avatar',
                key: 'avatar',
                render: (text, record) => (
                    <Avatar src={record.avatar}/>
                ),
            },
            {
                title: 'Nombres',
                dataIndex: 'nombre',
                key: 'nombre',
                sorter: (a, b) => a.nombre.length - b.nombre.length,
                sortOrder: sortedInfo.columnKey === 'nombre' && sortedInfo.order,
            },
            {
                title: 'Usuario',
                dataIndex: 'usuario',
                key: 'usuario',
                sorter: (a, b) => a.usuario.length - b.usuario.length,
                sortOrder: sortedInfo.columnKey === 'usuario' && sortedInfo.order,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                sorter: (a, b) => a.email.length - b.email.length,
                sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
            },
        ]
        return(
            <PageHeaderLayout>
                <Card bordered={false}>
                    <Query query={GET_USUARIOS}>
                        {({ loading, error, data }) => {
                        if (loading) return <Spin/>;
                        if (error) return <Alert type="error" message={`Error! ${error.message}`} banner />;
                        return (
                            <StandardTable
                                dataSource={data.Usuarios} 
                                columns={columns}
                                rowKey={ record => record.id } 
                                onChange={this.handleChange}
                                loading={loading}/>
                        );
                        }}
                    </Query>
                </Card>
            </PageHeaderLayout>
        )
    }
}

export default Usuario;