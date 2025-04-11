import {
    Box,
    Select,
    SimpleGrid,
    Stack,
    TextInput,
    Button,
    Group,
} from "@mantine/core";
import { IconChecks, IconPlus, IconTrash } from "@tabler/icons-react";

import { useStateStore, useVeedorStore } from "../../../../hooks";
import { BtnSubmit } from "../../../elements/BtnSubmit";

export const FormDelegadoPublic = ({ form }) => {
    const { cantones } = useStateStore();
    const { startExportCredencialDelegado } = useVeedorStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        startExportCredencialDelegado(form.getTransformedValues());
        console.log(form.values);
        form.reset();
    };

    const addDelegado = () => {
        form.insertListItem("delegados", {
            nombres: "",
            apellidos: "",
            dni: "",
            canton_id: null,
            parroquia: null,
            recinto: "",
            junta: "",
        });
    };

    const removeDelegado = (index) => {
        form.removeListItem("delegados", index);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack spacing="md">
                {form.values.delegados.map((delegado, index) => (
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
                            <div>Delegado {index + 1}</div>
                            <Button
                                variant="subtle"
                                color="red"
                                size="xs"
                                leftIcon={<IconTrash size={14} />}
                                onClick={() => removeDelegado(index)}
                                disabled={form.values.delegados.length === 1}
                            >
                                Eliminar
                            </Button>
                        </Group>

                        <SimpleGrid cols={2} spacing="md">
                            <TextInput
                                withAsterisk
                                label="Nombres"
                                placeholder="Ingrese nombres"
                                {...form.getInputProps(
                                    `delegados.${index}.nombres`
                                )}
                            />
                            <TextInput
                                withAsterisk
                                label="Apellidos"
                                placeholder="Ingrese apellidos"
                                {...form.getInputProps(
                                    `delegados.${index}.apellidos`
                                )}
                            />
                            <TextInput
                                withAsterisk
                                label="Cédula"
                                placeholder="Ingrese cédula"
                                {...form.getInputProps(
                                    `delegados.${index}.dni`
                                )}
                            />
                            <Select
                                withAsterisk
                                label="Seleccione el cantón"
                                placeholder="Cantón"
                                searchable
                                nothingFound="No options"
                                {...form.getInputProps(
                                    `delegados.${index}.canton_id`
                                )}
                                data={cantones?.map((canton) => {
                                    return {
                                        value: canton.id.toString(),
                                        label: canton.nombre_canton,
                                    };
                                })}
                            />
                            <TextInput
                                withAsterisk
                                label="Parroquia"
                                placeholder="Ingrese la parroquia"
                                {...form.getInputProps(
                                    `delegados.${index}.parroquia`
                                )}
                            />
                            <TextInput
                                label="Recinto"
                                placeholder="Ingrese recinto"
                                {...form.getInputProps(
                                    `delegados.${index}.recinto`
                                )}
                            />
                            <TextInput
                                label="Junta"
                                placeholder="Ingrese junta"
                                {...form.getInputProps(
                                    `delegados.${index}.junta`
                                )}
                            />
                        </SimpleGrid>
                    </Box>
                ))}

                <Button
                    leftIcon={<IconPlus size={18} />}
                    onClick={addDelegado}
                    variant="outline"
                    fullWidth
                    disabled={form.values.delegados.length >= 4} // 🔥 aquí se deshabilita
                >
                    Agregar Delegado
                </Button>
                <BtnSubmit IconSection={IconChecks}>Generar</BtnSubmit>
            </Stack>
        </Box>
    );
};
