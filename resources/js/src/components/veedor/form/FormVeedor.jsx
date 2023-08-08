import { useEffect } from "react";
import { Box, Grid, Select, TextInput } from "@mantine/core";
import { IconChecks } from "@tabler/icons-react";
import { useCoordinadorStore, useStateStore, useUiVeedor, useVeedorStore } from "../../../hooks";
import { BtnSubmit } from "../../../components";


export const FormVeedor = ({ form }) => {
    const { canton_id } = form.values;
    const { coordinadores, startLoadCoordinadores } = useCoordinadorStore();
    const { startAddVeedor, activateVeedor } = useVeedorStore();
    const { modalActionVeedor } = useUiVeedor();
    const { cantones, recintos, startLoadCantones, startLoadAllRecintos } = useStateStore();

    useEffect(() => {
        startLoadCantones();
        startLoadCoordinadores();
    }, []);

    useEffect(() => {
        if (activateVeedor !== null) {
            form.setValues({
                ...activateVeedor,
            });
            return;
        }
    }, [activateVeedor]);

    useEffect(() => {
        startLoadAllRecintos(canton_id);
        form.setFieldValue("recinto_id", activateVeedor?.recinto_id ?? activateVeedor?.recinto_id);
    }, [canton_id]);



    const handleSubmit = () => {
        startAddVeedor(form.values);
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
            <Grid>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Select
                        label="Seleccione el coordinador"
                        placeholder="Coordinador"
                        searchable
                        withAsterisk
                        nothingFound="No options"
                        {...form.getInputProps("coordinador_id")}
                        data={coordinadores?.map((coord) => {
                            return {
                                value: coord.id,
                                label: coord.nombres_completos
                            };
                        })}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <TextInput
                        placeholder="Apellidos y nombres del veedor"
                        label="Apellidos y Nombres"
                        withAsterisk
                        {...form.getInputProps("nombres_completos")}
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
                        label="Seleccione el cantón"
                        placeholder="Cantón"
                        searchable
                        withAsterisk
                        nothingFound="No options"
                        {...form.getInputProps("canton_id")}
                        data={cantones?.map(canton => {
                            return {
                                value: canton.id,
                                label: canton.nombre_canton
                            }
                        })}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={6} xl={6}>
                    <Select
                        label="Seleccione el recinto"
                        placeholder="Recinto"
                        searchable
                        withAsterisk
                        nothingFound="No options"
                        {...form.getInputProps("recinto_id")}
                        data={recintos?.map(recinto => {
                            return {
                                value: recinto.id,
                                label: recinto.nombre_recinto
                            }
                        })}
                    />
                </Grid.Col>
            </Grid>
            <BtnSubmit icon={IconChecks} texto="Agregar Veedor" />
        </Box>
    );
};
