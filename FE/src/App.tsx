import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { routes } from './Routes';
import { DefaultLayout } from './Components/Layout';
import ScrollToTop from './Components/ScrollToTop';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './Page/ProductDetail/ProductDetail';

const AuthRouteWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const { checkLoginStatus } = useAuth();

    React.useEffect(() => {
        checkLoginStatus();
    }, [location, checkLoginStatus]);

    return <>{children}</>;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="App">
                    <ScrollToTop />
                    <AuthRouteWrapper>
                        <Routes>
                            {routes.map((route, index) => {
                                const Page = route.Component;

                                let Layout = DefaultLayout;
                                if (route.Layout) Layout = route.Layout;

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                            <Route path="/product/:id" element={<ProductDetail />} />
                        </Routes>
                    </AuthRouteWrapper>
                    <ToastContainer />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
