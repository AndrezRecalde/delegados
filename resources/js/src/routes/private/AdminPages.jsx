import { Container } from "@mantine/core";
import { Navigate, Route } from "react-router-dom";
import { RoutesNotFound } from "../not-found/RoutesNotFound";
import { CoordinadorPage, DashboardPage, EscanerPage, JrvmovilPage, JrvreconteoPage, SearchCoordPage, SearchEscanerPage, SearchSuperPage, SearchVeedPage, SummaryPage, SupervisorPage, UsuarioPage, VeedorPage } from "../../pages";

export const AdminPages = () => {
    return (
        <Container size="xxl">
            <RoutesNotFound>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard/summary" element={<SummaryPage />} />

                <Route path="usuarios" element={<UsuarioPage />} />

                <Route path="supervisores" element={<SupervisorPage />} />
                <Route
                    path="/export/supervisores"
                    element={<SearchSuperPage />}
                />

                <Route path="coordinadores" element={<CoordinadorPage />} />
                <Route
                    path="/export/coordinadores"
                    element={<SearchCoordPage />}
                />

                <Route path="/jrv/delegados" element={<VeedorPage />} />
                <Route path="/export/delegados" element={<SearchVeedPage />} />

                <Route path="/jrv/moviles" element={<JrvmovilPage />} />

                <Route path="/jrv/reconteos" element={<JrvreconteoPage />} />

                <Route path="escaneadores" element={<EscanerPage />} />
                <Route
                    path="/export/escaneadores"
                    element={<SearchEscanerPage />}
                />

                <Route path="/" element={<Navigate to="/dashboard" />} />
            </RoutesNotFound>
        </Container>
    );
};
