import { useEffect } from "react";
import { Card, Divider, Flex, Grid, Loader, Paper } from "@mantine/core";
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
    ModalAvanceRecintos,
} from "../../components";
import { useDashboardStore } from "../../hooks";
import { ModalAvanceParroquia } from "../../components/dashboard/modal/parroquia/ModalAvanceParroquia";

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
            <TitlePage ta="left" order={3}>
                Bienvenido al sistema de Delegados del Voto
            </TitlePage>
            <Divider my="md" />
            {!isLoading ? (
                <>
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
                                mb="lg"
                                shadow="sm"
                                sx={{ position: "static" }}
                            >
                                <Card.Section withBorder inheritPadding py="lg">
                                    <TitlePage ta="center" order={5}>
                                        Resumen de Progreso General de Delegados
                                    </TitlePage>
                                </Card.Section>
                                <Card.Section withBorder inheritPadding py="lg">
                                    <ProgressGeneralChart />
                                </Card.Section>
                                <Card.Section withBorder inheritPadding py="lg">
                                    <TitlePage ta="center" order={5}>
                                        Faltan{" "}
                                        {totalJuntas.totalJuntas -
                                            totalVeedores}{" "}
                                        delegados de ingresar
                                    </TitlePage>
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
                            <TableAvanceCantones />
                        </Grid.Col>
                    </Grid>
                    <ModalAvanceParroquia />
                    <ModalAvanceRecintos />
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
