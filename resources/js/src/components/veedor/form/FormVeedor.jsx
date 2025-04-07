import { useEffect } from "react";
import { Box, Select, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { IconChecks } from "@tabler/icons-react";
import {
    useCoordinadorStore,
    useJuntaStore,
    useStateStore,
    useUiVeedor,
    useVeedorStore,
} from "../../../hooks";
import { BtnSubmit } from "../../../components";

export const FormVeedor = ({ form }) => {
    const { canton_id, recinto_id } = form.values;
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { coordinadores, startLoadCoordsForCanton } = useCoordinadorStore();
    const { startAddVeedor, activateVeedor } = useVeedorStore();
    const { modalActionVeedor } = useUiVeedor();
    const { cantones, recintos, startLoadCantones, startLoadAllRecintos } =
        useStateStore();
    const { juntas, startLoadJuntas } = useJuntaStore();

    useEffect(() => {
        if (usuario.role !== "Administrador") {
            const cantonesIds = usuario.cantones.map((canton) => canton.id);
            startLoadCantones(cantonesIds);
            return;
        }
        startLoadCantones();
    }, []);

    useEffect(() => {
        startLoadCoordsForCanton(canton_id);
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
            activateVeedor?.recinto_id.toString() ? activateVeedor?.recinto_id.toString() : null
        );
    }, [canton_id]);

    useEffect(() => {
        startLoadJuntas(recinto_id);
        form.setFieldValue(
            "junta_id",
            activateVeedor?.junta_id ? activateVeedor?.junta_id.toString() : null
        );
    }, [recinto_id]);

    const handleSubmit = () => {
        startAddVeedor(form.getTransformedValues());
        form.reset();
        modalActionVeedor(0);
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
                            label: coord.nombres_coordinador + " " + coord.apellidos_coordinador,
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
