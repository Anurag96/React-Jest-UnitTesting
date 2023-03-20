import * as React from "react";
import './App.css';
import "../src/css/reconuploadfile.css";
import "bootstrap/dist/css/bootstrap.css";
import './index.css'
import "../src/css/common.css";
import { Outlet, Routes, Route, Navigate } from 'react-router-dom'
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Dashboard from "./components/dashboard/dashBoard";
import Filerecon from "./components/file-recon/fileRecon";
import Sidebar from "./components/file-recon/SideBar";
import ErrorHandler from "./components/errors/errorHandler";
import { ErrorBoundary } from 'react-error-boundary'
import { useSelector } from "react-redux";
import { KiteProgressIndicator } from '@kite/react-kite';
import { useKeyClockContext } from "./hooks/useAuthContext";

function BasicLayout() {
    const [explode, setExplode] = React.useState(false);
    const isLoading = useSelector(state => state.loadingSlice);

    return (
        <>
            <Header explode={explode} onChange={() => setExplode(e => !e)} />
            <ErrorBoundary FallbackComponent={ErrorHandler} onReset={() => setExplode(true)}
                resetKeys={[explode]}>
                <Outlet />
                {isLoading && (
                    <KiteProgressIndicator
                        id="kp1"
                        title="Loading"
                    />
                )}
            </ErrorBoundary>
            <Footer />
        </>
    )
}

function App() {
    const authenticatedData = useKeyClockContext();
    return authenticatedData && authenticatedData.authenticated && authenticatedData.keyClockValue.resourceAccess ? (
        <Routes>
            <Route exact path="/" element={<Navigate to="dashboard" replace />} >
            </Route>
            <Route path="dashboard" element={<BasicLayout />}>
                <Route index element={<Dashboard />} />
            </Route>
            <Route path="filerecon" element={<BasicLayout />}>
                <Route index element={<Filerecon />} />
            </Route>       
            <Route path="Sidebar" element={<BasicLayout />}>
                <Route index element={<Sidebar />} />
            </Route>     
        </Routes>
    ) : (<></>);
}

export default App;
