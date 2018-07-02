import React, { PureComponent } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { Table, Card, Button, Icon, Divider, Avatar, Modal, Form, Spin, Alert } from 'antd';

import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const GET_VENTAS = gql`{
    Ventas{
        id
        fecha
    }
}`;

class Venta extends PureComponent{
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
                title: 'Fecha',
                dataIndex: 'fecha',
                key: 'fecha',
                sorter: (a, b) => a.fecha.length - b.fecha.length,
                sortOrder: sortedInfo.columnKey === 'fecha' && sortedInfo.order,
            },
        ];
        return(
            <PageHeaderLayout>
                <Card bordered={false}>
                    <Query query={GET_VENTAS}>
                        {({ loading, error, data }) => {
                        if (loading) return <Spin/>;
                        if (error) return <Alert type="error" message={`Error! ${error.message}`} banner />;
                        return (
                            <StandardTable
                                dataSource={data.Ventas} 
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

export default Venta;