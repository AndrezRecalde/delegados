import { Navigate, Route, Routes } from "react-router-dom";
import {
    CoordinadorPage,
    DashboardPage,
    EscanerPage,
    HomePage,
    JrvmovilPage,
    JrvreconteoPage,
    PasswordPage,
    SearchCoordPage,
    SearchEscanerPage,
    SearchSuperPage,
    SearchVeedPage,
    SummaryPage,
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
                    <Route path="/dashboard/summary" element={<SummaryPage />} />

                    <Route path="usuarios" element={<UsuarioPage />} />
                    <Route path="change-password" element={<PasswordPage />} />

                    <Route path="supervisores" element={<SupervisorPage />} />
                    <Route path="/export/supervisores" element={<SearchSuperPage />} />

                    <Route path="coordinadores" element={<CoordinadorPage />} />
                    <Route path="/export/coordinadores" element={<SearchCoordPage />} />

                    <Route path="/jrv/delegados" element={<VeedorPage />} />
                    <Route path="/export/delegados" element={<SearchVeedPage />} />

                    <Route path="/jrv/moviles" element={<JrvmovilPage />} />

                    <Route path="/jrv/reconteos" element={<JrvreconteoPage />} />

                    <Route path="escaneadores" element={<EscanerPage />} />
                    <Route path="/export/escaneadores" element={<SearchEscanerPage />} />


                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </Container>
        </HomePage>
    );
};
