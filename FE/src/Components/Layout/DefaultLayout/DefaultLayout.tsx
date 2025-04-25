import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface DefaulayOutProps {
    children: ReactNode;
}

export default function DefaultLayout({ children }: DefaulayOutProps) {
    return (
        <div>
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    );
}
