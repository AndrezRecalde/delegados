import { useEffect } from "react";
import { Box, Stack, TextInput } from "@mantine/core";
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
            <Stack>
                <TextInput
                    placeholder="Número de cédula"
                    label="Cédula"
                    withAsterisk
                    {...form.getInputProps("dni")}
                />
                <TextInput
                    placeholder="Apellidos del Veedor"
                    label="Apellidos"
                    withAsterisk
                    {...form.getInputProps("apellidos")}
                />
                <TextInput
                    placeholder="Nombres del Veedor"
                    label="Nombres"
                    withAsterisk
                    {...form.getInputProps("nombres")}
                />
                <BtnSubmit IconSection={IconChecks}>Guardar</BtnSubmit>
            </Stack>
        </Box>
    );
};
