import Home from '../Page/Home';
import News from '../Page/News';
import Payment from '../Page/Payment';
import Login from '../Page/Login';
import Register from '../Page/Register';
import Cart from '../Page/Cart';
import Favorite from '../Page/Favorite';
import MNQXH09X from '../Page/MNQXH09X';
import EmptyLayout from '../Components/Layout/EmptyLayout/EmptyLayout';
import Account from '../Page/Account';
import ProductSearch from '../Page/ProductSearch';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Admin from '../Page/Admin';

interface RouteType {
    path: string;
    Component: () => React.ReactElement;
    Layout?: (props: { children: React.ReactNode }) => React.ReactElement;
    isPrivate?: boolean;
    requireAdmin?: boolean;
}

const PrivateRoute = ({ children, requireAdmin = false }: { children: React.ReactNode; requireAdmin?: boolean }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requireAdmin && user?.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

const publicRoutes: RouteType[] = [
    { path: '/', Component: Home },
    { path: '/news', Component: News },
    { path: '/payment', Component: Payment, Layout: EmptyLayout },
    { path: '/login', Component: Login },
    { path: '/register', Component: Register },
    { path: '/favorite', Component: Favorite },
    { path: '/mnqxh09x', Component: MNQXH09X },
    { path: '/account', Component: Account },
    { path: '/productsearch', Component: ProductSearch },
    { path: '/cart', Component: Cart, isPrivate: true },
];

const adminRoutes: RouteType[] = [
    {
        path: '/admin',
        Component: Admin,
        Layout: EmptyLayout,
        isPrivate: true,
        requireAdmin: true,
    },
];

export const routes = [...publicRoutes, ...adminRoutes].map((route) => {
    if (route.isPrivate) {
        return {
            ...route,
            Component: () => (
                <PrivateRoute requireAdmin={route.requireAdmin}>
                    {route.Layout ? (
                        <route.Layout>
                            <route.Component />
                        </route.Layout>
                    ) : (
                        <route.Component />
                    )}
                </PrivateRoute>
            ),
        };
    }
    return route;
});
