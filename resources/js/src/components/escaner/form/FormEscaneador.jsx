import { Box, Select, Stack, TextInput } from "@mantine/core";
import { BtnSubmit } from "../../../components";
import { useEscanerStore, useStateStore, useUiEscaner } from "../../../hooks";
import { useEffect } from "react";
import { IconChecks } from "@tabler/icons-react";

export const FormEscaneador = ({ form }) => {
    const { canton_id, parroquia_id } = form.values;
    const { startAddEscaner, activateEscaneador } = useEscanerStore();
    const {
        cantones,
        parroquias,
        recintos,
        startLoadCantones,
        startLoadParroquias,
        startLoadRecintos,
    } = useStateStore();
    const { modalActionEscaner } = useUiEscaner();

    useEffect(() => {
        startLoadCantones();
    }, []);

    useEffect(() => {
        startLoadParroquias(canton_id);
        form.setFieldValue(
            "parroquia_id",
            activateEscaneador?.parroquia_id ? activateEscaneador?.parroquia_id : 0
        );
    }, [canton_id]);

    useEffect(() => {
        startLoadRecintos(parroquia_id);
        form.setFieldValue(
            "recinto_id",
            activateEscaneador?.recinto_id ? activateEscaneador?.recinto_id : 0
        );
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
                <TextInput
                    placeholder="Número de teléfono"
                    label="Teléfono"
                    {...form.getInputProps("telefono")}
                />
                <Select
                    label="Seleccione el cantón"
                    placeholder="Cantón"
                    searchable
                    withAsterisk
                    nothingFound="No options"
                    {...form.getInputProps("canton_id")}
                    data={cantones?.map((canton) => {
                        return {
                            value: canton.id.toString(),
                            label: canton.nombre_canton,
                        };
                    })}
                />
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
                <BtnSubmit IconSection={IconChecks}>Guardar</BtnSubmit>
            </Stack>
        </Box>
    );
};
