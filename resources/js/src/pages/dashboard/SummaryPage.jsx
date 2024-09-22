import { useEffect } from "react";
import { Card, Divider, Grid } from "@mantine/core";
import {
    ModalAvanceRecintos,
    TableAvanceParroquial,
    TitlePage,
} from "../../components";
import { useDashboardStore } from "../../hooks";

export const SummaryPage = () => {
    const { startAvanceParroquias, startClearTotales } = useDashboardStore();

    useEffect(() => {
        startAvanceParroquias();

        return () => {
            startClearTotales();
        };
    }, []);

    return (
        <>
            <TitlePage ta="left" order={3}>
                Resumen Territorial Parroquial
            </TitlePage>
            <Divider my="md" />
            <Grid>
                <Grid.Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <TableAvanceParroquial />
                </Grid.Col>
            </Grid>

            <ModalAvanceRecintos />
        </>
    );
};
