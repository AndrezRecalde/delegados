import { useEffect } from "react";
import { Card, Flex, Grid, Loader, Paper } from "@mantine/core";
import { sistema } from "../../components/dashboard/sistema.json";
import { delegados } from "../../components/dashboard/delegados.json";
import {
    ProgressGeneralChart,
    Stats,
    TitlePage,
    TableAvanceCantones,
    StatsDelegados,
    StatPayrollDelegados,
    StatPayrollCoords,
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
        startLoadTotalJrvMoviles,
        startLoadTotalJrvReconteos,
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
        startLoadTotalJrvMoviles();
        startLoadTotalJrvReconteos();
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
                <Grid>
                    <Grid.Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <StatsDelegados data={delegados} />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Stats data={sistema} />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Card
                            withBorder
                            radius="md"
                            mt={5}
                            mb="lg"
                            shadow="sm"
                            sx={{ position: "static" }}
                        >
                            <Card.Section withBorder inheritPadding py="lg">
                                <TitlePage
                                    tt="capitalize"
                                    fz={14}
                                    fw={700}
                                    title="Resumen de Progreso General de Delegados"
                                />
                            </Card.Section>
                            <Card.Section withBorder inheritPadding py="lg">
                                <ProgressGeneralChart />
                            </Card.Section>
                            <Card.Section withBorder inheritPadding py="lg">
                                <TitlePage
                                    tt="capitalize"
                                    color="indigo.7"
                                    ta="center"
                                    fw={700}
                                    title={`Faltan ${totalJuntas.totalJuntas} delegados de ingresar`}
                                />
                            </Card.Section>
                        </Card>
                    </Grid.Col>
                    <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <StatPayrollDelegados />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <StatPayrollCoords />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Paper shadow="sm" radius="md" p="md">
                            <TableAvanceCantones />
                        </Paper>
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
        </>
    );
};
