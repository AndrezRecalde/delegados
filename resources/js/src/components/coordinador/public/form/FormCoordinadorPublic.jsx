import {
    Box,
    SimpleGrid,
    Stack,
    TextInput,
    Button,
    Group,
} from "@mantine/core";
import { IconChecks, IconPlus, IconTrash } from "@tabler/icons-react";

import { BtnSubmit } from "../../../elements/BtnSubmit";
import { useCoordinadorStore } from "../../../../hooks";

export const FormCoordinadorPublic = ({ form }) => {
    const { startExportCredencialCoordinador } = useCoordinadorStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        startExportCredencialCoordinador(form.getTransformedValues());
        console.log(form.values);
        form.reset();
    };

    const addCoordinador = () => {
        form.insertListItem("coordinadores", {
            nombres: "",
            apellidos: "",
            dni: "",
        });
    };

    const removeCoordinador = (index) => {
        form.removeListItem("coordinadores", index);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack spacing="md">
                {form.values.coordinadores.map((coordinador, index) => (
                    <Box
                        key={index}
                        sx={(theme) => ({
                            border: `1px solid ${theme.colors.gray[3]}`,
                            borderRadius: theme.radius.md,
                            padding: theme.spacing.md,
                            position: "relative",
                        })}
                    >
                        <Group position="apart" mb="md">
                            <div>Coordinador {index + 1}</div>
                            <Button
                                variant="subtle"
                                color="red"
                                size="xs"
                                leftIcon={<IconTrash size={14} />}
                                onClick={() => removeCoordinador(index)}
                                disabled={form.values.coordinadores.length === 1}
                            >
                                Eliminar
                            </Button>
                        </Group>

                        <SimpleGrid cols={1} spacing="md">
                            <TextInput
                                withAsterisk
                                label="Nombres"
                                placeholder="Ingrese nombres"
                                {...form.getInputProps(
                                    `coordinadores.${index}.nombres`
                                )}
                            />
                            <TextInput
                                withAsterisk
                                label="Apellidos"
                                placeholder="Ingrese apellidos"
                                {...form.getInputProps(
                                    `coordinadores.${index}.apellidos`
                                )}
                            />
                            <TextInput
                                withAsterisk
                                label="Cédula"
                                placeholder="Ingrese cédula"
                                {...form.getInputProps(
                                    `coordinadores.${index}.dni`
                                )}
                            />
                        </SimpleGrid>
                    </Box>
                ))}

                <Button
                    leftIcon={<IconPlus size={18} />}
                    onClick={addCoordinador}
                    variant="outline"
                    fullWidth
                    disabled={form.values.coordinadores.length >= 4} // 🔥 aquí se deshabilita
                >
                    Agregar Coordinador
                </Button>
                <BtnSubmit IconSection={IconChecks}>Generar</BtnSubmit>
            </Stack>
        </Box>
    );
};
