import { Container } from "@mantine/core";
import { Route } from "react-router-dom";
import { RoutesNotFound } from "../not-found/RoutesNotFound";
import { SearchVeedPage, VeedorPage } from "../../pages";

export const SupervisorPages = () => {
    return (
        <Container size="xxl">
            <RoutesNotFound>
                <Route path="/jrv/delegados" element={<VeedorPage />} />
                <Route path="/export/delegados" element={<SearchVeedPage />} />
            </RoutesNotFound>
        </Container>
    );
};
