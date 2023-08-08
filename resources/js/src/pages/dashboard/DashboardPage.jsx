import { useEffect } from "react";
import { Card, Flex, Grid, Loader, Paper, SimpleGrid } from "@mantine/core";
import { data } from "../../components/dashboard/data.json";
import {
    ProgressGeneralChart,
    StatPayroll,
    Stats,
    TitlePage,
    TableAvanceCantones,
} from "../../components";
import { useDashboardStore } from "../../hooks";

export const DashboardPage = () => {
    const {
        isLoading,
        totalVeedores,
        totalJuntas,
        startLoadTotalSupervisores,
        startLoadTotalCoordinadores,
        startLoadTotalVeedores,
        startLoadTotalVeedoresConfirmed,
        startLoadTotalUsuarios,
        startLoadTotalEscaneadores,
        startLoadTotalJuntas,
        startAvanceCantones,
        startClearTotales,
    } = useDashboardStore();

    useEffect(() => {
        startLoadTotalSupervisores();
        startLoadTotalCoordinadores();
        startLoadTotalVeedores();
        startLoadTotalVeedoresConfirmed();
        startLoadTotalUsuarios();
        startLoadTotalEscaneadores();
        startLoadTotalJuntas();
        startAvanceCantones();

        return () => {
            startClearTotales();
        };
    }, []);

    let porcentajeIngreso = () => {
        let porcentaje =
            (parseInt(totalVeedores) * 100) / parseInt(totalJuntas.totalJuntas);
        return parseFloat(porcentaje).toFixed(2);
    };

    return (
        <>
            <TitlePage
                tt="capitalize"
                fz={18}
                fw={700}
                title={`Bienvenido al sistema de Delegados del Voto`}
            />

            {!isLoading ? (
                <>
                    <SimpleGrid
                        cols={2}
                        spacing="md"
                        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                    >
                        <Stats data={data} />
                        <Grid gutter="md">
                            <Grid.Col>
                                <Card
                                    withBorder
                                    radius="md"
                                    mt="lg"
                                    mb="lg"
                                    shadow="sm"
                                    sx={{ position: "static" }}
                                >
                                    <Card.Section
                                        withBorder
                                        inheritPadding
                                        py="lg"
                                    >
                                        <TitlePage
                                            tt="capitalize"
                                            fz={14}
                                            fw={700}
                                            title="Resumen de Progreso General de Delegados"
                                        />
                                    </Card.Section>
                                    <Card.Section
                                        withBorder
                                        inheritPadding
                                        py="lg"
                                    >
                                        <ProgressGeneralChart />
                                    </Card.Section>
                                    <Card.Section
                                        withBorder
                                        inheritPadding
                                        py="lg"
                                    >
                                        <TitlePage
                                            tt="capitalize"
                                            color="indigo.7"
                                            fw={700}
                                            title={`${porcentajeIngreso()} % Registrado a nivel provincial`}
                                        />
                                    </Card.Section>
                                </Card>
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <StatPayroll />
                            </Grid.Col>
                        </Grid>
                    </SimpleGrid>
                    <Paper shadow="sm" radius="md" p="md">
                        <TableAvanceCantones />
                    </Paper>
                </>
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
        </>
    );
};
