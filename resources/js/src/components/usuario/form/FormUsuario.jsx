import { useEffect } from "react";
import {
    Box,
    MultiSelect,
    SimpleGrid,
    Stack,
    TextInput,
} from "@mantine/core";
import { IconChecks } from "@tabler/icons-react";
import { BtnSubmit } from "../../../components";
import {
    useRoleStore,
    useUiUsuario,
    useUsuarioStore,
} from "../../../hooks";

export const FormUsuario = ({ form }) => {
    //const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { startAddUsuario, activeUsuario } = useUsuarioStore();
    const { modalActionUsuario } = useUiUsuario();
    const { roles } = useRoleStore();


    useEffect(() => {
        if (activeUsuario) {
            form.setValues({
                ...activeUsuario,
                roles: activeUsuario.roles.map((role) => role.id.toString()),
            });
        }
    }, [activeUsuario]);


    const handleSubmit = (e) => {
        e.preventDefault();
        startAddUsuario(form.values);
        console.log(form.values);
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
                <SimpleGrid
                    breakpoints={[
                        { minWidth: "xs", cols: 1 },
                        { minWidth: "sm", cols: 2 },
                        { minWidth: "md", cols: 2 },
                        { minWidth: "lg", cols: 2 },
                    ]}
                >
                    <TextInput
                        label="Apellidos"
                        placeholder="Ingrese Apellidos"
                        withAsterisk
                        {...form.getInputProps("apellidos")}
                    />
                    <TextInput
                        label="Nombres"
                        placeholder="Ingrese Nombres"
                        withAsterisk
                        {...form.getInputProps("nombres")}
                    />
                </SimpleGrid>
                <TextInput
                    placeholder="Número de cédula"
                    label="Cédula"
                    withAsterisk
                    {...form.getInputProps("dni")}
                />
                <MultiSelect
                    maxSelectedValues={1}
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
