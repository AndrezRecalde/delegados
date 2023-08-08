import {
    Box,
    Card,
    Container,
    Grid,
    PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { BtnSubmit, TitlePage } from "../../components";
import { IconLockShare } from "@tabler/icons-react";
import { useAuthStore, useUsuarioStore } from "../../hooks";

export const PasswordPage = () => {
    const [visible, { toggle }] = useDisclosure(false);

    const { startUpdatePassword } = useUsuarioStore();

    const { user } = useAuthStore();

    const form = useForm({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validate: {
            confirmPassword: (value, values) =>
                value !== values.password ? "Contraseñas no coinciden" : null,
        },
    });

    const { password } = form.values;

    const handleSubmit = (e) => {
        e.preventDefault();
        startUpdatePassword(user, password);
        form.reset();
    };

    return (
        <Container size="sm">
            <Box
                component="form"
                mx="auto"
                sx={(theme) => ({
                    padding: theme.spacing.sm,
                })}
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <Card
                    withBorder
                    radius="md"
                    mt="md"
                    mb="md"
                    shadow="sm"
                    sx={{ position: "static" }}
                >
                    <Card.Section withBorder inheritPadding py="lg">
                        <TitlePage title="Cambio de contraseña" fw={700} />
                    </Card.Section>
                    <Card.Section inheritPadding py="lg">
                        <Grid justify="center">
                            <Grid.Col sm={12} md={10} lg={10} xl={10}>
                                <PasswordInput
                                    label="Contraseña"
                                    visible={visible}
                                    onVisibilityChange={toggle}
                                    {...form.getInputProps("password")}
                                />
                            </Grid.Col>
                            <Grid.Col sm={12} md={10} lg={10} xl={10}>
                                <PasswordInput
                                    label="Confirmar contraseña"
                                    visible={visible}
                                    onVisibilityChange={toggle}
                                    {...form.getInputProps("confirmPassword")}
                                />
                            </Grid.Col>
                        </Grid>
                    </Card.Section>
                    <Card.Section>
                        <BtnSubmit
                            icon={IconLockShare}
                            texto="Cambiar Contraseña"
                        />
                    </Card.Section>
                </Card>
            </Box>
        </Container>
    );
};
