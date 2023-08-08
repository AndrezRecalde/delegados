import { Box, Grid, Select, TextInput } from "@mantine/core";
import { BtnSubmit } from "../../../components";
import { useEscanerStore, useStateStore, useUiEscaner } from "../../../hooks";
import { useEffect } from "react";
import { IconChecks } from "@tabler/icons-react";

export const FormEscaneador = ({ form }) => {

    const { startAddEscaner, activateEscaneador } = useEscanerStore();
    const { cantones, startLoadCantones } = useStateStore();
    const { modalActionEscaner } = useUiEscaner();

    useEffect(() => {
        startLoadCantones();
    }, []);

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
            </Grid>
            <BtnSubmit icon={IconChecks} texto="Agregar Escaneador" />
        </Box>
    );
};
