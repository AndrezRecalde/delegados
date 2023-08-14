import { useEffect } from "react";
import { Card, Flex, Grid, Loader, Paper } from "@mantine/core";
import { ModalAvanceRecintos, TableAvanceParroquial, TitlePage } from "../../components";
import { useDashboardStore } from "../../hooks";

export const SummaryPage = () => {
    const { isLoading, startAvanceParroquias, startClearTotales } =
        useDashboardStore();

    useEffect(() => {
        startAvanceParroquias();

        return () => {
            startClearTotales();
        };
    }, []);

    return (
        <>
            {!isLoading ? (
                <Grid>
                    <Grid.Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card
                            withBorder
                            radius="md"
                            mt="lg"
                            mb="lg"
                            shadow="sm"
                            sx={{ position: "static" }}
                        >
                            <Card.Section withBorder inheritPadding py="lg">
                                <TitlePage
                                    tt="capitalize"
                                    fz={18}
                                    fw={700}
                                    title={`Resumen Territorial Parroquial`}
                                />
                            </Card.Section>
                            <Card.Section withBorder inheritPadding py="lg">
                                <TableAvanceParroquial />
                            </Card.Section>
                        </Card>
                    </Grid.Col>
                </Grid>
            ) : (
                <Flex
                    mih={150}
                    gap="md"
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="wrap"
                >
                    <Loader color="indigo.7" size="xl" />
                </Flex>
            )}
            <ModalAvanceRecintos />
        </>
    );
};
