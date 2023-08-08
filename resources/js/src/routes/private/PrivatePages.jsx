import { Navigate, Route, Routes } from "react-router-dom";
import {
    CoordinadorPage,
    DashboardPage,
    EscanerPage,
    HomePage,
    PasswordPage,
    SearchCoordPage,
    SearchEscanerPage,
    SearchSuperPage,
    SearchVeedPage,
    SupervisorPage,
    UsuarioPage,
    VeedorPage,
} from "../../pages";
import { Container } from "@mantine/core";

export const PrivatePages = () => {
    return (
        <HomePage>
            <Container size="xl">
                <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="usuarios" element={<UsuarioPage />} />
                    <Route path="change-password" element={<PasswordPage />} />

                    <Route path="supervisores" element={<SupervisorPage />} />
                    <Route path="/export/supervisores" element={<SearchSuperPage />} />

                    <Route path="coordinadores" element={<CoordinadorPage />} />
                    <Route path="/export/coordinadores" element={<SearchCoordPage />} />

                    <Route path="veedores" element={<VeedorPage />} />
                    <Route path="/export/veedores" element={<SearchVeedPage />} />

                    <Route path="escaneadores" element={<EscanerPage />} />
                    <Route path="/export/escaneadores" element={<SearchEscanerPage />} />


                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </Container>
        </HomePage>
    );
};
