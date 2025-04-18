import { Box, Grid, MultiSelect, Select, TextInput } from "@mantine/core";
import { BtnSubmit } from "../../elements/BtnSubmit";
import {
    useCoordinadorStore,
    useStateStore,
    useSupervisorStore,
    useUiCoordinador,
} from "../../../hooks";
import { useEffect } from "react";
import { IconChecks } from "@tabler/icons-react";

export const FormCoordinador = ({ form }) => {
    const { canton_id, parroquia_id } = form.values;
    const { startAddCoordinador, activateCoordinador } = useCoordinadorStore();
    const { modalActionCoordinador } = useUiCoordinador();
    const { supervisores, startLoadSupervisores } = useSupervisorStore();
    const {
        cantones,
        parroquias,
        recintos,
        startLoadCantones,
        startLoadParroquias,
        startLoadRecintos,
    } = useStateStore();

    useEffect(() => {
        startLoadCantones();
    }, []);

    useEffect(() => {
        startLoadSupervisores({ canton_id });
    }, [canton_id]);

    useEffect(() => {
        if (activateCoordinador !== null) {
            form.setValues({
                ...activateCoordinador,
                nombres: activateCoordinador.nombres_coordinador,
                apellidos: activateCoordinador.apellidos_coordinador,
                supervisor_id: activateCoordinador?.supervisor_id?.toString() || null,
                canton_id: activateCoordinador.canton_id.toString(),
                parroquia_id: activateCoordinador.parroquia_id.toString(),
                recinto_id: activateCoordinador.recintos.map(
                    (recinto) => recinto.id.toString()
                ),
            });
            return;
        }
    }, [activateCoordinador]);

    useEffect(() => {
        startLoadParroquias(canton_id);
        form.setFieldValue(
            "parroquia_id",
            activateCoordinador?.parroquia_id
                ? activateCoordinador.parroquia_id.toString()
                : null
        );
    }, [canton_id]);

    useEffect(() => {
        startLoadRecintos(parroquia_id);
        form.setFieldValue(
            "recinto_id",
            activateCoordinador?.recinto_id ??
                activateCoordinador?.recintos?.map((recinto) => recinto.id.toString())
        );
    }, [parroquia_id]);

    const handleSubmit = () => {
        startAddCoordinador(form.values);
        form.reset();
        modalActionCoordinador(0);
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
            <Grid>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Select
                        label="Seleccione el cantón"
                        placeholder="Cantón"
                        searchable
                        withAsterisk
                        nothingFound="No options"
                        {...form.getInputProps("canton_id")}
                        data={cantones.map((canton) => {
                            return {
                                value: canton.id.toString(),
                                label: canton.nombre_canton,
                            };
                        })}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Select
                        label="Seleccione el supervisor"
                        placeholder="Supervisor"
                        searchable
                        withAsterisk
                        nothingFound="No options"
                        {...form.getInputProps("supervisor_id")}
                        data={supervisores.map((supervisor) => {
                            return {
                                value: supervisor.id.toString(),
                                label:
                                    supervisor.nombres_supervisor +
                                    " " +
                                    supervisor.apellidos_supervisor,
                            };
                        })}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <TextInput
                        placeholder="Número de cédula"
                        label="Cédula"
                        withAsterisk
                        {...form.getInputProps("dni")}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={6} xl={6}>
                    <TextInput
                        placeholder="Apellidos del Coordinador"
                        label="Apellidos"
                        withAsterisk
                        {...form.getInputProps("apellidos")}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={6} xl={6}>
                    <TextInput
                        placeholder="Nombres del coordinador"
                        label="Nombres"
                        withAsterisk
                        {...form.getInputProps("nombres")}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={6} xl={6}>
                    <TextInput
                        placeholder="Correo electrónico (opcional)"
                        label="Correo electrónico"
                        {...form.getInputProps("email")}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={6} xl={6}>
                    <TextInput
                        placeholder="Número de teléfono (opcional)"
                        label="Teléfono"
                        {...form.getInputProps("telefono")}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={6} xl={6}>
                    <Select
                        label="Seleccione la parroquia"
                        placeholder="Parroquia"
                        searchable
                        withAsterisk
                        nothingFound="No options"
                        {...form.getInputProps("parroquia_id")}
                        data={parroquias.map((parroquia) => {
                            return {
                                value: parroquia.id.toString(),
                                label: parroquia.nombre_parroquia,
                            };
                        })}
                    />
                </Grid.Col>
                <Grid.Col xs={12} md={12} lg={6} xl={6}>
                    <MultiSelect
                        label="Elija el/los recinto(s)"
                        placeholder="Recinto(s)"
                        searchable
                        nothingFound="No options"
                        radius="md"
                        withAsterisk
                        {...form.getInputProps("recinto_id")}
                        data={recintos.map((recinto) => {
                            return {
                                value: recinto.id.toString(),
                                label: recinto.nombre_recinto,
                            };
                        })}
                    />
                </Grid.Col>
            </Grid>
            <BtnSubmit IconSection={IconChecks}>Guardar</BtnSubmit>
        </Box>
    );
};
