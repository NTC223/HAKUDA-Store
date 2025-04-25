import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './Routes';
import { DefaultLayout } from './Components/Layout';
import ScrollToTop from './Components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="App">
                    <ScrollToTop />
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
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
