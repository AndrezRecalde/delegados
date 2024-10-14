import { useEffect } from "react";
import { Box, MultiSelect, Select, Stack, TextInput } from "@mantine/core";
import { IconChecks } from "@tabler/icons-react";
import { BtnSubmit } from "../../../components";
import {
    useRoleStore,
    useStateStore,
    useUiUsuario,
    useUsuarioStore,
} from "../../../hooks";

export const FormUsuario = ({ form }) => {
    //const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { roles: rolesSelected = [] } = form.values;
    const { startAddUsuario, activeUsuario } = useUsuarioStore();
    const { modalActionUsuario } = useUiUsuario();
    const { roles } = useRoleStore();
    const { cantones } = useStateStore();

    useEffect(() => {
        if (activeUsuario !== null) {
            form.setValues({
                ...activeUsuario,
                roles: activeUsuario?.roles.map((role) => role.id),
                cantones: activeUsuario?.cantones.map((canton) => canton.id),
            });

            return;
        }
    }, [activeUsuario]);

    // Vaciar cantones si rolesSelected contiene el rol con id = 1
    useEffect(() => {
        if (rolesSelected.includes(1) && form.values.cantones.length > 0) {
            form.setFieldValue('cantones', []); // Solo vacía si no está ya vacío
        }
    }, [rolesSelected, form]);

    // Verificar si rolesSelected contiene "Supervisor" o "Coordinador"
    const canShowMultiSelect = rolesSelected?.some((roleId) => {
        const roleName = roles.find((role) => role.id === roleId);
        //console.log(roleName)
        return roleName?.id === 2 || roleName?.id === 3;
    });


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
                {canShowMultiSelect && (
                    <MultiSelect
                        label="Elija uno o varios cantones al usuario"
                        placeholder="Selecciona uno o varios cantones"
                        searchable
                        nothingFound="No options"
                        withAsterisk
                        {...form.getInputProps("cantones")}
                        data={cantones.map((canton) => {
                            return {
                                value: canton.id,
                                label: canton.nombre_canton,
                            };
                        })}
                    />
                )}
                <BtnSubmit IconSection={IconChecks}>Agregar Usuario</BtnSubmit>
            </Stack>
        </Box>
    );
};
