import React, { PureComponent } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { Table, Card, Button, Icon, Divider, Avatar, Modal, Form, Spin, Alert } from 'antd';

import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const GET_PRODUCTOS = gql`{
    Productos{
        id
        nombre
        cantidad
        precio
    }
}`;


class Producto extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            // visibleModal: false,
        }
        this.handleChange = this.handleChange.bind(this);
        // this.showModal = this.showModal.bind(this);
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
                title: 'Nombres',
                dataIndex: 'nombre',
                key: 'nombre',
                sorter: (a, b) => a.nombre.length - b.nombre.length,
                sortOrder: sortedInfo.columnKey === 'nombre' && sortedInfo.order,
            },
            {
                title: 'Cantidad',
                dataIndex: 'cantidad',
                key: 'cantidad',
                sorter: (a, b) => a.cantidad - b.cantidad,
                sortOrder: sortedInfo.columnKey === 'cantidad' && sortedInfo.order,
            },
            {
                title: 'Precio',
                dataIndex: 'precio',
                key: 'precio',
                sorter: (a, b) => a.precio - b.precio,
                sortOrder: sortedInfo.columnKey === 'precio' && sortedInfo.order,
            },
        ];

        return(
            <PageHeaderLayout>
                <Card bordered={false}>
                    <Query query={GET_PRODUCTOS}>
                        {({ loading, error, data }) => {
                        if (loading) return <Spin/>;
                        if (error) return <Alert type="error" message={`Error! ${error.message}`} banner />;
                        return (
                            <StandardTable
                                dataSource={data.Productos} 
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

export default Producto;