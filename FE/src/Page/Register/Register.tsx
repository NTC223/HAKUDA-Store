import React from 'react';
import BreadCrumb from '../../Components/BreadCrumb';
import Form from '../../Components/Form';
import Navigation from '../../Components/Layout/DefaultLayout/Navigation';
export default function Register() {
    return (
        <main>
            <Navigation active="" />
            <BreadCrumb />
            <Form type="register" />
        </main>
    );
}
