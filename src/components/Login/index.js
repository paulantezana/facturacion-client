import React, { Component, Fragment } from "react";
import {  Link }  from 'react-router-dom';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { message } from 'antd';

import styles from './index.scss';

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, { usuario, clave }) => {
            if (!err) {
                fetch("http://localhost:7070/login",{
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({usuario,clave})
                })
                .then(res => res.json())
                .then(data => {
                    if (data.type != undefined){
                        if (data.type == "error") {
                            message.error(data.message);
                            return;
                        }
                    }
                    
                    if(data.token == undefined){
                        message.error("Error Token de seguridad");
                        return;
                    }
                    message.success("Bienvenido al sistema de facturacion");
                    localStorage.setItem('lkti',data.token);
                    this.props.history.push("/"); // Redireccionando
                })
                .catch(err => {
                    message.error("Error fatal");
                });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className={styles.login}>
                <Form.Item>
                    {
                        getFieldDecorator('usuario', {
                            rules: [{ required: true, message: 'Por favor ingrese su nombre de usuario!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nombre de usuario" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('clave', {
                            rules: [{ required: true, message: 'Por favor ingrese su contraseña!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña"/>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: false,
                        })(
                            <Checkbox>Recuérdame</Checkbox>
                        )
                    }
                    <a className={styles.forgot} href="">¿Olvidaste tu cuenta?</a>
                    <Button type="primary" htmlType="submit" className={styles.submit}>Log in</Button>
                    O <a href="">¡Regístrate ahora!</a>
                </Form.Item>
            </Form>
        )
    }
}

const Login = Form.create()(LoginForm);

export default Login;