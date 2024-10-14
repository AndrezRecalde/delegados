import { useEffect } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    Box,
    Divider,
    Flex,
    Grid,
    Select,
    Stack,
    Text,
    ThemeIcon,
} from "@mantine/core";
import { IconChecks, IconDiscountCheckFilled } from "@tabler/icons-react";
import { BtnSubmit } from "../../../../components";
import { useUiVeedor, useVeedorStore } from "../../../../hooks";

export const FormActivarVeed = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { modalActionActivateVeed } = useUiVeedor();
    const { activateVeedor, startUpdateConfirmVeed } = useVeedorStore();

    const form = useForm({
        initialValues: {
            confirmado: null,
        },
        validate: {
            confirmado: isNotEmpty("Por favor ingrese el estado del delegado"),
        },
    });

    useEffect(() => {
        if (activateVeedor !== null) {
            form.setValues({
                ...activateVeedor,
            });
            return;
        }
    }, [activateVeedor]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const cantonesIds = usuario.cantones.map((canton) => canton.id);
        startUpdateConfirmVeed(cantonesIds, form.values);
        form.reset();
        modalActionActivateVeed(0);
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
                <Flex
                    mih={50}
                    gap="md"
                    justify="center"
                    align="center"
                    direction="column"
                    wrap="wrap"
                >
                    <ThemeIcon
                        variant="light"
                        radius="xl"
                        size="lg"
                        color="indigo.7"
                    >
                        <IconDiscountCheckFilled size={30} />
                    </ThemeIcon>
                    <Text>{activateVeedor?.nombres_completos}</Text>
                </Flex>
                <Select
                    data={[
                        { label: "Si", value: 1 },
                        { label: "No", value: 0 },
                    ]}
                    placeholder="¿Desea confirmar al delegado?"
                    label="Activar"
                    description="Se confirma despues de autenticar los datos del delegado"
                    radius="md"
                    mb={20}
                    withAsterisk
                    {...form.getInputProps("confirmado")}
                />
            </Stack>
            <BtnSubmit IconSection={IconChecks}>Guardar</BtnSubmit>
        </Box>
    );
};
