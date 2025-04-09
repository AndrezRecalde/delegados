import { useEffect } from "react";
import { Box, Select, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { IconChecks } from "@tabler/icons-react";
import {
    useCoordinadorStore,
    useJuntaStore,
    useStateStore,
    useSupervisorStore,
    useUiVeedor,
    useVeedorStore,
} from "../../../hooks";
import { BtnSubmit } from "../../../components";
import { ROLES } from "../../../helpers/getDictionary";

export const FormVeedor = ({ form }) => {
    const { canton_id, recinto_id } = form.values;
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { activateCoordinador, coordinadores, startLoadCoordsForCanton } =
        useCoordinadorStore();
    const { activateSupervisor } = useSupervisorStore();
    const { startAddVeedor, activateVeedor } = useVeedorStore();
    const { isOpenModalVeedor, modalActionVeedor } = useUiVeedor();
    const { cantones, recintos, startLoadCantones, startLoadAllRecintos } =
        useStateStore();
    const { juntas, startLoadJuntas } = useJuntaStore();

    useEffect(() => {
        if (isOpenModalVeedor) {
            startLoadCantones();
        }
    }, [isOpenModalVeedor]);

    useEffect(() => {
        if (
            (isOpenModalVeedor,
            usuario.role === ROLES.SUPERVISOR &&
                activateSupervisor &&
                activateSupervisor.canton_id)
        ) {
            const cantonId = activateSupervisor.canton_id;
            const canton = cantones.find((canton) => canton.id === cantonId);
            if (canton) {
                form.setFieldValue("canton_id", canton.id.toString());
            }
        }
    }, [isOpenModalVeedor, activateSupervisor, cantones]);

    useEffect(() => {
        if (
            (isOpenModalVeedor,
            usuario.role === ROLES.COORDINADOR &&
                activateCoordinador &&
                activateCoordinador.canton_id)
        ) {
            const cantonId = activateCoordinador.canton_id;
            const canton = cantones.find((canton) => canton.id === cantonId);
            if (canton) {
                form.setFieldValue("canton_id", canton.id.toString());
            }
        }
    }, [isOpenModalVeedor, activateCoordinador, cantones]);

    useEffect(() => {
        startLoadCoordsForCanton({ canton_id });
    }, [canton_id]);

    useEffect(() => {
        if (activateVeedor !== null) {
            form.setValues({
                ...activateVeedor,
                nombres: activateVeedor.nombres_veedor,
                apellidos: activateVeedor.apellidos_veedor,
                coordinador_id: activateVeedor.coordinador_id.toString(),
                canton_id: activateVeedor.canton_id.toString(),
                recinto_id: activateVeedor.recinto_id.toString(),
                junta_id: activateVeedor.junta_id.toString(),
            });
            return;
        }
    }, [activateVeedor]);

    useEffect(() => {
        startLoadAllRecintos(canton_id);
        form.setFieldValue(
            "recinto_id",
            activateVeedor?.recinto_id.toString()
                ? activateVeedor?.recinto_id.toString()
                : null
        );
    }, [canton_id]);

    useEffect(() => {
        startLoadJuntas(recinto_id);
        form.setFieldValue(
            "junta_id",
            activateVeedor?.junta_id
                ? activateVeedor?.junta_id.toString()
                : null
        );
    }, [recinto_id]);

    const handleSubmit = () => {
        if (
            usuario.role === ROLES.SUPERVISOR &&
            activateSupervisor &&
            activateSupervisor.parroquias?.length > 0
        ) {
            const parroquiasId = activateSupervisor?.parroquias.map(
                (parroquia) => parroquia.id
            );
            startAddVeedor(form.getTransformedValues(), [], parroquiasId, []);
            form.reset();
            modalActionVeedor(0);
            return;
        }

        if (
            usuario.role === ROLES.COORDINADOR &&
            activateCoordinador &&
            activateCoordinador.recintos?.length > 0
        ) {
            const recintosId = activateCoordinador?.recintos?.map(
                (recinto) => recinto.id
            );
            startAddVeedor(form.getTransformedValues(), [], [], recintosId);
            form.reset();
            modalActionVeedor(0);
            return;
        }

        if (
            usuario.role === ROLES.ADMIN
        ) {
            startAddVeedor(form.getTransformedValues(), [], [], []);
            form.reset();
            modalActionVeedor(0);
            return;
        }
    };

    return (
        <Box
            component="form"
            mx="auto"
            sx={(theme) => ({
                padding: theme.spacing.md,
            })}
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack>
                <Select
                    withAsterisk
                    label="Seleccione el cantón"
                    placeholder="Cantón"
                    searchable
                    nothingFound="No options"
                    {...form.getInputProps("canton_id")}
                    data={cantones?.map((canton) => {
                        return {
                            value: canton.id.toString(),
                            label: canton.nombre_canton,
                        };
                    })}
                />
                <Select
                    withAsterisk
                    label="Seleccione el coordinador"
                    placeholder="Coordinador"
                    searchable
                    nothingFound="No options"
                    {...form.getInputProps("coordinador_id")}
                    data={coordinadores?.map((coord) => {
                        return {
                            value: coord.id.toString(),
                            label:
                                coord.nombres_coordinador +
                                " " +
                                coord.apellidos_coordinador,
                        };
                    })}
                />
                <TextInput
                    withAsterisk
                    placeholder="Número de cédula"
                    label="Cédula"
                    {...form.getInputProps("dni")}
                />
                <SimpleGrid cols={2}>
                    <TextInput
                        withAsterisk
                        placeholder="Ingresar Apellidos"
                        label="Apellidos"
                        {...form.getInputProps("apellidos")}
                    />
                    <TextInput
                        withAsterisk
                        placeholder="Ingresar Nombres"
                        label="Nombres"
                        {...form.getInputProps("nombres")}
                    />
                </SimpleGrid>

                <TextInput
                    placeholder="Número de teléfono"
                    label="Teléfono"
                    {...form.getInputProps("telefono")}
                />

                <Select
                    withAsterisk
                    label="Seleccione el recinto"
                    placeholder="Recinto"
                    searchable
                    nothingFound="No options"
                    {...form.getInputProps("recinto_id")}
                    data={recintos?.map((recinto) => {
                        return {
                            value: recinto.id.toString(),
                            label: recinto.nombre_recinto,
                        };
                    })}
                />
                <Select
                    label="Seleccione la junta"
                    description="La junta se puede agregar posteriormente"
                    placeholder="Numero de junta"
                    searchable
                    nothingFound="No options"
                    {...form.getInputProps("junta_id")}
                    data={juntas?.map((junta) => {
                        return {
                            value: junta.id.toString(),
                            label: junta.junta_nombre,
                        };
                    })}
                />
            </Stack>
            <BtnSubmit IconSection={IconChecks}>Guardar</BtnSubmit>
        </Box>
    );
};
