import React, { ReactNode } from 'react';

interface DefaulayOutProps {
    children: ReactNode;
}

export default function EmptyLayout({ children }: DefaulayOutProps) {
    return (
        <div>
            <div>{children}</div>
        </div>
    );
}
