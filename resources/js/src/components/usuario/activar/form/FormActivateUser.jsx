import { Box, Divider, Flex, Grid, Select, Text } from "@mantine/core";
import { IconChecks, IconUserCheck } from "@tabler/icons-react";
import { BtnSubmit } from "../../../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import { useUiUsuario, useUsuarioStore } from "../../../../hooks";
import { useEffect } from "react";

export const FormActivateUser = () => {

    const { modalActivateUsuario } = useUiUsuario();
    const { activeUsuario, startUpdateActivo } = useUsuarioStore();

    const form = useForm({
        initialValues: {
            activo: null
        },
        validate: {
            activo: isNotEmpty("Por favor ingrese un estado para el usuario")
        }
    });

    useEffect(() => {
        if(activeUsuario !== null){
          form.setValues({ ...activeUsuario });
          return;
        }

      }, [activeUsuario]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startUpdateActivo(form.values);
        form.reset();
        modalActivateUsuario(0);
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
            <Grid>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Flex
                        mih={50}
                        gap="md"
                        justify="center"
                        align="center"
                        direction="column"
                        wrap="wrap"
                    >
                        <IconUserCheck size={30} />
                        <Text>{activeUsuario?.nombres_completos}</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Select
                        data={[
                            { label: "Si", value: 1 },
                            { label: "No", value: 0 },
                        ]}
                        placeholder="¿Desea activar el usuario?"
                        label="Activar"
                        description="El usuario podrá acceder a la plataforma cuando este activado."
                        radius="md"
                        mb={20}
                        withAsterisk
                        {...form.getInputProps("activo")}
                    />
                    <Divider />
                </Grid.Col>
            </Grid>
            <BtnSubmit icon={IconChecks} texto="Activar usuario" />
        </Box>
    );
};
