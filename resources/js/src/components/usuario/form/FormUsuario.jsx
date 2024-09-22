import { useEffect } from "react";
import { Box, MultiSelect, Stack, TextInput } from "@mantine/core";
import { IconChecks } from "@tabler/icons-react";
import { BtnSubmit } from "../../../components";
import { useRoleStore, useUiUsuario, useUsuarioStore } from "../../../hooks";

export const FormUsuario = ({ form }) => {
    const { startAddUsuario, activeUsuario } = useUsuarioStore();
    const { modalActionUsuario } = useUiUsuario();
    const { startLoadRoles, roles } = useRoleStore();

    useEffect(() => {
        startLoadRoles();
        form.setFieldValue(
            "roles",
            activeUsuario?.roles ?? activeUsuario?.roles.map((role) => role.id)
        );
    }, []);

    useEffect(() => {
        if (activeUsuario !== null) {
            form.setValues({
                ...activeUsuario,
                roles: activeUsuario?.roles.map((role) => role.id),
            });

            return;
        }
    }, [activeUsuario]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startAddUsuario(form.values);
        form.reset();
        modalActionUsuario(0);
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
                    placeholder="Apellidos y nombres completos"
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
                <MultiSelect
                    label="Elija uno o varios roles"
                    placeholder="Role(s)"
                    searchable
                    nothingFound="No options"
                    withAsterisk
                    {...form.getInputProps("roles")}
                    data={roles.map((role) => {
                        return {
                            value: role.id,
                            label: role.name,
                        };
                    })}
                />
                <BtnSubmit IconSection={IconChecks}>Agregar Usuario</BtnSubmit>
            </Stack>
        </Box>
    );
};
