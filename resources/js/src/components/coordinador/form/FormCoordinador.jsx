import { Box, Grid, MultiSelect, Select, TextInput } from "@mantine/core";
import { BtnSubmit } from "../../elements/BtnSubmit";
import { useCoordinadorStore, useStateStore, useSupervisorStore, useUiCoordinador } from "../../../hooks";
import { useEffect } from "react";
import { IconChecks } from "@tabler/icons-react";

export const FormCoordinador = ({ form }) => {
    const { canton_id, parroquia_id } = form.values;
    const { startAddCoordinador, activateCoordinador } = useCoordinadorStore();
    const { modalActionCoordinador } = useUiCoordinador();
    const { supervisores, startLoadSupervisoresForCanton } = useSupervisorStore();
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
        startLoadSupervisoresForCanton(canton_id);

    }, [canton_id]);


    useEffect(() => {
        if (activateCoordinador !== null) {
            form.setValues({
                ...activateCoordinador,
                recinto_id: activateCoordinador.recintos.map(
                    (recinto) => recinto.id
                ),
            });
            return;
        }
    }, [activateCoordinador]);

    useEffect(() => {
        startLoadParroquias(canton_id);
        form.setFieldValue(
            "parroquia_id",
            activateCoordinador?.parroquia_id ?? activateCoordinador?.parroquias?.map(parroquias => parroquias.id)
        );
    }, [canton_id]);

    useEffect(() => {
        startLoadRecintos(parroquia_id);
        form.setFieldValue(
            "recinto_id",
            activateCoordinador?.recinto_id ?? activateCoordinador?.recintos?.map(recinto => recinto.id)
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
                                value: canton.id,
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
                                value: supervisor.id,
                                label: supervisor.nombres_completos,
                            };
                        })}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <TextInput
                        placeholder="Apellidos y nombres del coordinador"
                        label="Apellidos y Nombres"
                        withAsterisk
                        {...form.getInputProps("nombres_completos")}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <TextInput
                        placeholder="Correo electrónico (opcional)"
                        label="Correo electrónico"
                        {...form.getInputProps("email")}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={6} xl={6}>
                    <TextInput
                        placeholder="Número de cédula"
                        label="Cédula"
                        withAsterisk
                        {...form.getInputProps("dni")}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={6} xl={6}>
                    <TextInput
                        placeholder="Número de teléfono"
                        label="Teléfono"
                        withAsterisk
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
                                value: parroquia.id,
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
                                value: recinto.id,
                                label: recinto.nombre_recinto,
                            };
                        })}
                    />
                </Grid.Col>
            </Grid>
            <BtnSubmit icon={IconChecks} texto="Agregar Coordinador" />
        </Box>
    );
};
