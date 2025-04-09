import {
    Card,
    Text,
    Group,
    Avatar,
    Badge,
    Container,
    Divider,
    SimpleGrid,
} from "@mantine/core";
import { ProgressGeneralChart, TitlePage } from "../../components";
import {
    useCoordinadorStore,
    useDashboardStore,
    useSupervisorStore,
} from "../../hooks";
import { useEffect, useState } from "react";
import { ROLES } from "../../helpers/getDictionary";

export const ProfilePage = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const {
        isLoading,
        totalJuntas,
        totalVeedores,
        startLoadVeedoresForParroquia,
        startLoadVeedoresForRecinto,
        startLoadJuntasForParroquia,
        startLoadJuntasForRecinto,
        startLoadTotalJuntas,
        startLoadTotalVeedores,
        startClearTotales,
    } = useDashboardStore();
    const { activateSupervisor, startLoadSupervisorForDNI } =
        useSupervisorStore();
    const { activateCoordinador, startLoadCoordinadorForDNI } =
        useCoordinadorStore();
    const [userRoleActive, setUserRoleActive] = useState({});

    useEffect(() => {
        if (usuario.role === ROLES.SUPERVISOR) {
            startLoadSupervisorForDNI(usuario.dni);
        }

        if (usuario.role === ROLES.COORDINADOR) {
            startLoadCoordinadorForDNI(usuario.dni);
        }
    }, []);

    useEffect(() => {
        // Esperar que los datos estén cargados antes de seguir
        if (usuario.role === ROLES.SUPERVISOR && activateSupervisor?.parroquias?.length > 0) {
            setUserRoleActive(activateSupervisor);
            const parroquiasId = activateSupervisor.parroquias.map(
                (parroquia) => parroquia.id
            );
            startLoadVeedoresForParroquia(parroquiasId);
            startLoadJuntasForParroquia(parroquiasId);
            return;
        }

        if (usuario.role === ROLES.COORDINADOR && activateCoordinador?.recintos?.length > 0) {
            setUserRoleActive(activateCoordinador);
            const recintosId = activateCoordinador.recintos.map(
                (recinto) => recinto.id
            );
            startLoadVeedoresForRecinto(recintosId);
            startLoadJuntasForRecinto(recintosId);
            return;
        }

        // Si no es supervisor ni coordinador, carga totales normales
        startLoadTotalVeedores();
        startLoadTotalJuntas();

        return () => {
            startClearTotales();
        };
    }, [usuario.role, activateSupervisor, activateCoordinador]);

    return (
        <Container size="lg" mt={20}>
            <TitlePage order={3} ta="left">
                Bienvenido
            </TitlePage>
            <Divider my="md" />
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group position="apart" mb="md">
                    <Group>
                        <Avatar color="indigo.5" radius="xl" size="lg">
                            CR
                        </Avatar>
                        <div>
                            <Text size="lg" weight={500}>
                                {usuario.nombres_completos}
                            </Text>
                            <Text size="sm" color="dimmed">
                                DNI: {usuario.dni}
                            </Text>
                        </div>
                    </Group>
                </Group>

                <Text size="sm" color="dimmed" mb="md">
                    Role: <Badge color="teal.5">{usuario.role}</Badge>
                </Text>

                {usuario.role !== ROLES.ADMIN ? (
                    <SimpleGrid cols={2} spacing="lg">
                        <Card shadow="sm" mt={5} withBorder>
                            <Text fz={12} weight={500}>
                                Cantón:{" "}
                            </Text>
                            <Card.Section withBorder inheritPadding py="xs">
                                {userRoleActive?.canton ? (
                                    <Badge radius="xs">
                                        {userRoleActive?.canton}
                                    </Badge>
                                ) : (
                                    "Sin datos..."
                                )}
                            </Card.Section>
                        </Card>
                        {usuario.role === ROLES.SUPERVISOR ? (
                            <Card shadow="sm" mt={5} withBorder>
                                <Text fz={12} weight={500}>
                                    Parroquias:{" "}
                                </Text>
                                <Card.Section withBorder inheritPadding py="xs">
                                    {userRoleActive?.parroquias?.length > 0
                                        ? userRoleActive?.parroquias?.map(
                                              (parroquia) => (
                                                  <Badge
                                                      key={parroquia.id}
                                                      radius="xs"
                                                  >
                                                      {
                                                          parroquia.nombre_parroquia
                                                      }
                                                  </Badge>
                                              )
                                          )
                                        : "Sin datos..."}
                                </Card.Section>
                            </Card>
                        ) : null}
                        {usuario.role === ROLES.COORDINADOR ? (
                            <Card shadow="sm" mt={5} withBorder>
                                <Text fz={12} weight={500}>
                                    Parroquia:{" "}
                                </Text>
                                <Card.Section withBorder inheritPadding py="xs">
                                    {userRoleActive?.parroquia ? (
                                        <Badge radius="xs">
                                            {userRoleActive?.parroquia}
                                        </Badge>
                                    ) : (
                                        "Sin datos..."
                                    )}
                                </Card.Section>
                            </Card>
                        ) : null}
                        {usuario.role === ROLES.COORDINADOR ? (
                            <Card shadow="sm" mt={5} withBorder>
                                <Text fz={12} weight={500}>
                                    Recintos:{" "}
                                </Text>
                                <Card.Section withBorder inheritPadding py="xs">
                                    {userRoleActive?.recintos?.length > 0
                                        ? userRoleActive?.recintos?.map(
                                              (recinto) => (
                                                  <Badge
                                                      key={recinto.id}
                                                      radius="xs"
                                                  >
                                                      {recinto.nombre_recinto}
                                                  </Badge>
                                              )
                                          )
                                        : "Sin datos..."}
                                </Card.Section>
                            </Card>
                        ) : null}
                    </SimpleGrid>
                ) : null}
            </Card>
            <Card shadow="sm" mt={20} padding="lg" radius="md" withBorder>
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
                        Faltan {Math.max(totalJuntas - totalVeedores, 0)}{" "}
                        delegados de ingresar
                    </TitlePage>
                </Card.Section>
            </Card>
        </Container>
    );
};
