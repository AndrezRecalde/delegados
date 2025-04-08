import {
    Card,
    Text,
    Group,
    Avatar,
    Badge,
    Container,
    Divider,
} from "@mantine/core";
import { ProgressGeneralChart, TitlePage } from "../../components";
import { useDashboardStore } from "../../hooks";
import { useEffect } from "react";
import { ROLES } from "../../helpers/getDictionary";

export const ProfilePage = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const {
        isLoading,
        totalJuntas,
        totalVeedores,
        startLoadVeedoresForCanton,
        startClearTotales,
        startLoadJuntasForCanton,
        startLoadTotalJuntas,
        startLoadTotalVeedores
    } = useDashboardStore();

    useEffect(() => {
        if (usuario.role === ROLES.SUPERVISOR) {
            const cantonesIds = usuario.cantones.map((canton) => canton.id);
            console.log(cantonesIds);
            startLoadVeedoresForCanton(cantonesIds);
            startLoadJuntasForCanton(cantonesIds);
            return;
        }

        /* if (usuario.role === ROLES.COORDINADOR) {
            const parroquiasIds = usuario.parroquias.map((parroquia) => parroquia.id);
            console.log(parroquiasIds);
            //startLoadVeedoresForCanton(cantonesIds);
            //startLoadJuntasForCanton(cantonesIds);
            return;
        } */
        startLoadTotalVeedores();
        startLoadTotalJuntas();

        return () => {
            startClearTotales();
        };
    }, []);

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
                            {usuario.nombres_completos[0]}
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
                    <>
                        <Text size="sm" color="dimmed">
                            Cantones:
                        </Text>
                        <Group spacing="xs">
                            {usuario.cantones.map((canton, index) => (
                                <Badge key={canton.id} variant="outline">
                                    {canton.nombre_canton}
                                </Badge>
                            ))}
                        </Group>
                    </>
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
                        Faltan {Math.max(totalJuntas - totalVeedores, 0)} delegados de
                        ingresar
                    </TitlePage>
                </Card.Section>
            </Card>
        </Container>
    );
};
