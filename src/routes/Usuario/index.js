import React, { PureComponent } from 'react';
import { Table, Card, Button, Icon, Divider, Avatar, Modal, Form } from 'antd';

import gql from "graphql-tag";
import { Query } from "react-apollo";

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
            // const { getFieldDecorator } = this.props.form;
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div className="table-operations">
                        <Button.Group>
                            <Button onClick={this.showModal}>
                                <Icon type="plus-circle-o"/>Nuevo
                            </Button>   
                            <Button>
                                <Icon type="printer"/>Imprimir 
                            </Button>
                        </Button.Group>
                    </div>
                    <Query query={GET_USUARIOS}>
                        {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;

                        return (
                            <Table 
                                columns={ columns } 
                                rowKey={ record => record.id } 
                                dataSource={ data.Usuarios } 
                                onChange={this.handleChange}
                                loading={ loading } />
                        );
                        }}
                    </Query>

                    <Modal
                        title="Basic Modal"
                        visible={this.state.visibleModal}
                        // onOk={this.handleOk}
                        // onCancel={this.handleCancel}
                        >
                        {/* <Form onSubmit={this.handleSubmit}>
                            <Form.Item
                                label="Confirm Password">
                                {
                                    getFieldDecorator('usuario', {
                                        rules: [{ required: true, message: 'Por favor ingrese su nombre de usuario!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nombre de usuario" />
                                    )
                                }
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">Register</Button>
                            </Form.Item>
                        </Form> */}
                    </Modal>

                </Card>
            </PageHeaderLayout>
        )
    }
}

export default Usuario;