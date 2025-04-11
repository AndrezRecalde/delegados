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
import { useJrvmovilStore } from "../../../../hooks";

export const FormJvrPublic = ({ form }) => {
    const { startExportCredencialCda } = useJrvmovilStore();
    const handleSubmit = (e) => {
        e.preventDefault();
        startExportCredencialCda(form.values);
        console.log(form.values);
        form.reset();
    };

    const addJvr = () => {
        form.insertListItem("jvrs", {
            nombres: "",
            apellidos: "",
            dni: "",
        });
    };

    const removeJvr = (index) => {
        form.removeListItem("jvrs", index);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack spacing="md">
                {form.values.jvrs.map((jvr, index) => (
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
                            <div>JVR {index + 1}</div>
                            <Button
                                variant="subtle"
                                color="red"
                                size="xs"
                                leftIcon={<IconTrash size={14} />}
                                onClick={() => removeJvr(index)}
                                disabled={form.values.jvrs.length === 1}
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
                                    `jvrs.${index}.nombres`
                                )}
                            />
                            <TextInput
                                withAsterisk
                                label="Apellidos"
                                placeholder="Ingrese apellidos"
                                {...form.getInputProps(
                                    `jvrs.${index}.apellidos`
                                )}
                            />
                            <TextInput
                                withAsterisk
                                label="Cédula"
                                placeholder="Ingrese cédula"
                                {...form.getInputProps(
                                    `jvrs.${index}.dni`
                                )}
                            />
                        </SimpleGrid>
                    </Box>
                ))}

                <Button
                    leftIcon={<IconPlus size={18} />}
                    onClick={addJvr}
                    variant="outline"
                    fullWidth
                    disabled={form.values.jvrs.length >= 4} // 🔥 aquí se deshabilita
                >
                    Agregar JVR
                </Button>
                <BtnSubmit IconSection={IconChecks}>Generar</BtnSubmit>
            </Stack>
        </Box>
    );
};
