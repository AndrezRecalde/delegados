import { Route } from "react-router-dom";
import {
    PasswordPage,
    ProfilePage,
} from "../../pages";
import { Container } from "@mantine/core";
import { RoutesNotFound } from "../not-found/RoutesNotFound";

export const PrivatePages = () => {
    return (
        <Container size="xxl">
            <RoutesNotFound>
                <Route path="/profile" element={<ProfilePage />} />

                <Route path="change-password" element={<PasswordPage />} />
            </RoutesNotFound>
        </Container>
    );
};
