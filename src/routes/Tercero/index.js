import React, { PureComponent } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { Table, Card, Button, Icon, Divider, Avatar, Modal, Form, Spin, Alert } from 'antd';

import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const GET_TERCEROS = gql`{
    Terceros{
        id
        identificacion
        nombre
        direccion
        telefono
    }
}`;

class Tercero extends PureComponent{
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
                title: 'Identificacion',
                dataIndex: 'identificacion',
                key: 'identificacion',
                sorter: (a, b) => a.identificacion.length - b.identificacion.length,
                sortOrder: sortedInfo.columnKey === 'identificacion' && sortedInfo.order,
            },
            {
                title: 'Nombres',
                dataIndex: 'nombre',
                key: 'nombre',
                sorter: (a, b) => a.nombre.length - b.nombre.length,
                sortOrder: sortedInfo.columnKey === 'nombre' && sortedInfo.order,
            },
            {
                title: 'Direccion',
                dataIndex: 'direccion',
                key: 'direccion',
                sorter: (a, b) => a.direccion.length - b.direccion.length,
                sortOrder: sortedInfo.columnKey === 'direccion' && sortedInfo.order,
            },
            {
                title: 'Telefono',
                dataIndex: 'telefono',
                key: 'telefono',
                sorter: (a, b) => a.telefono - b.telefono,
                sortOrder: sortedInfo.columnKey === 'telefono' && sortedInfo.order,
            },
        ];
        return(
            <PageHeaderLayout>
                <Card bordered={false}>
                    <Query query={GET_TERCEROS}>
                        {({ loading, error, data }) => {
                        if (loading) return <Spin/>;
                        if (error) return <Alert type="error" message={`Error! ${error.message}`} banner />;
                        return (
                            <StandardTable
                                dataSource={data.Terceros} 
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

export default Tercero;