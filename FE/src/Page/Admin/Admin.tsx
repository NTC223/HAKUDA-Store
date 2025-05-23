import React, { useState } from 'react';
import styles from './Admin.module.scss';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import Product from './Product';
import Orders from './Orders';
import Customer from './Customer';

export default function AdminPage() {
    const [active, setActive] = useState('dashboard');

    let MainComponent;
    if (active === 'dashboard') MainComponent = <Dashboard />;
    else if (active === 'product') MainComponent = <Product />;
    else if (active === 'orders') MainComponent = <Orders />;
    else if (active === 'user') MainComponent = <Customer />;
    else MainComponent = <Dashboard />;

    return (
        <div className={styles.adminLayout}>
            <Sidebar active={active} onChange={setActive} />
            <div className={styles.mainContent}>
                <Header />
                <div className={styles.pageContent}>{MainComponent}</div>
            </div>
        </div>
    );
}
