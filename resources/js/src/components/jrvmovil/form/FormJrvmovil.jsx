import { useEffect } from "react";
import { Box, Grid, Stack, TextInput } from "@mantine/core";
import { BtnSubmit } from "../../../components";
import { IconChecks } from "@tabler/icons-react";
import { useJrvmovilStore, useUiJrvmovil } from "../../../hooks";

export const FormJrvmovil = ({ form }) => {
    const { startAddJrvmovil, activateJrvmovil } = useJrvmovilStore();
    const { modalActionJrvmovil } = useUiJrvmovil();

    useEffect(() => {
        if (activateJrvmovil !== null) {
            form.setValues({
                ...activateJrvmovil,
            });
            return;
        }
    }, [activateJrvmovil]);

    const handleSubmit = () => {
        startAddJrvmovil(form.values);
        form.reset();
        modalActionJrvmovil(0);
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
                <TextInput
                    placeholder="Apellidos y nombres del veedor"
                    label="Apellidos y Nombres"
                    withAsterisk
                    {...form.getInputProps("nombres_completos")}
                />
                <TextInput
                    placeholder="Número de cédula"
                    label="Cédula"
                    withAsterisk
                    {...form.getInputProps("dni")}
                />
                <BtnSubmit IconSection={IconChecks}>Guardar</BtnSubmit>
            </Stack>
        </Box>
    );
};
