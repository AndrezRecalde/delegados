import { useEffect } from "react";
import { Box, Grid, TextInput } from "@mantine/core";
import { IconChecks } from "@tabler/icons-react";
import { BtnSubmit } from "../../../components";
import { useReconteoStore, useUiReconteo } from "../../../hooks";

export const FormJrvreconteo = ({ form }) => {
    const { startAddJrvReconteo, activateReconteo } = useReconteoStore();
    const { modalActionReconteo } = useUiReconteo();

    useEffect(() => {
        if (activateReconteo !== null) {
            form.setValues({
                ...activateReconteo,
            });
            return;
        }
    }, [activateReconteo]);

    const handleSubmit = () => {
        startAddJrvReconteo(form.values);
        form.reset();
        modalActionReconteo(0);
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
            </Grid>
            <BtnSubmit icon={IconChecks} texto="Agregar JRV Móvil" />
        </Box>
    );
};
