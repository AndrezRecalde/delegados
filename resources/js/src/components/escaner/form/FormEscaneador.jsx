import { Box, Grid, Select, TextInput } from "@mantine/core";
import { BtnSubmit } from "../../../components";
import { useEscanerStore, useStateStore, useUiEscaner } from "../../../hooks";
import { useEffect } from "react";
import { IconChecks } from "@tabler/icons-react";

export const FormEscaneador = ({ form }) => {
    const { canton_id, parroquia_id } = form.values;
    const { startAddEscaner, activateEscaneador } = useEscanerStore();
    const { cantones, parroquias, recintos, startLoadCantones, startLoadParroquias, startLoadRecintos } = useStateStore();
    const { modalActionEscaner } = useUiEscaner();

    useEffect(() => {
        startLoadCantones();
    }, []);

    useEffect(() => {
        startLoadParroquias(canton_id);
        form.setFieldValue("parroquia_id", 0);
    }, [canton_id]);

    useEffect(() => {
        startLoadRecintos(parroquia_id);
        form.setFieldValue("recinto_id", 0);
    }, [parroquia_id]);


    useEffect(() => {
        if (activateEscaneador !== null) {
            form.setValues({
                ...activateEscaneador,
            });
            return;
        }
    }, [activateEscaneador]);

    const handleSubmit = () => {
        startAddEscaner(form.values);
        form.reset();
        modalActionEscaner(0);
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
                    <TextInput
                        placeholder="Apellidos y nombres del veedor"
                        label="Apellidos y Nombres"
                        withAsterisk
                        {...form.getInputProps("nombres_completos")}
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
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <TextInput
                        placeholder="Número de teléfono"
                        label="Teléfono"
                        withAsterisk
                        {...form.getInputProps("telefono")}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Select
                        label="Seleccione el cantón"
                        placeholder="Cantón"
                        searchable
                        withAsterisk
                        nothingFound="No options"
                        {...form.getInputProps("canton_id")}
                        data={cantones?.map((canton) => {
                            return {
                                value: canton.id,
                                label: canton.nombre_canton,
                            };
                        })}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Select
                        label="Seleccione la parroquia"
                        placeholder="Parroquia"
                        searchable
                        withAsterisk
                        nothingFound="No options"
                        {...form.getInputProps("parroquia_id")}
                        data={parroquias?.map((parroquia) => {
                            return {
                                value: parroquia.id,
                                label: parroquia.nombre_parroquia,
                            };
                        })}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Select
                        label="Seleccione el recinto"
                        placeholder="Recinto"
                        searchable
                        withAsterisk
                        nothingFound="No options"
                        {...form.getInputProps("recinto_id")}
                        data={recintos?.map((recinto) => {
                            return {
                                value: recinto.id,
                                label: recinto.nombre_recinto,
                            };
                        })}
                    />
                </Grid.Col>
            </Grid>
            <BtnSubmit icon={IconChecks} texto="Agregar Escaneador" />
        </Box>
    );
};
