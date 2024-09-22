import { useEffect } from "react";
import { useForm } from "@mantine/form";
import {
    Box,
    Button,
    Checkbox,
    Group,
    LoadingOverlay,
    PasswordInput,
    Stack,
    TextInput,
} from "@mantine/core";
import { useAuthStore } from "../../hooks";
import { AlertSection, BtnSubmit } from "../../components";
import {
    IconChevronsRight,
    IconInfoCircle,
    IconKey,
} from "@tabler/icons-react";

export const AuthForm = () => {
    const { isLoading, validate, startLogin, errores } = useAuthStore();

    const form = useForm({
        initialValues: {
            dni: "",
            password: "",
            remember: true,
        },
    });

    useEffect(() => {
        if (validate !== undefined) {
            form.setErrors(validate);
            return;
        }

        return () => {
            form.clearErrors();
        };
    }, [validate]);

    const handleLogin = (e) => {
        e.preventDefault();
        startLogin(form.values);
    };

    return (
        <Box
            pos="relative"
            component="form"
            onSubmit={form.onSubmit((_, e) => handleLogin(e))}
        >
            <LoadingOverlay zIndex={1000} visible={isLoading} />
            <Stack>
                <TextInput
                    withAsterisk
                    label="Número de cedula"
                    placeholder="ejemp: 0800223344"
                    {...form.getInputProps("dni")}
                />
                <PasswordInput
                    withAsterisk
                    label="Contraseña"
                    placeholder="Tu contraseña"
                    {...form.getInputProps("password")}
                />
                <Checkbox
                    label="Mantenme conectado"
                    color="indigo.7"
                    {...form.getInputProps("remember", {
                        type: "checkbox",
                    })}
                />
                {errores ? (
                    <AlertSection
                        variant="light"
                        color="red.8"
                        icon={IconInfoCircle}
                        title="Error"
                    >
                        {errores}
                    </AlertSection>
                ) : null}
                <BtnSubmit
                    IconSection={IconChevronsRight}
                    loading={isLoading}
                    disabled={isLoading}
                >
                    Autenticarse
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
