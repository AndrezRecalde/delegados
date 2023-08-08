import { useEffect } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  Group,
  Image,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useAuthStore } from "../../hooks";
import { TitlePage } from "../../components";
import Swal from "sweetalert2";
import logo from "../../assets/images/7533464_2.png";
import { IconKey } from "@tabler/icons-react";

export const AuthForm = () => {
  const { startLogin, errores } = useAuthStore();

  const form = useForm({
    initialValues: {
      dni: "",
      password: "",
    },
    validate: {
      dni: isNotEmpty("Por favor ingrese su número de cedula"),
      password: isNotEmpty("Por favor ingrese su contraseña"),
    },
  });

  const { dni, password } = form.values;

  const handleLogin = (e) => {
    e.preventDefault();
    startLogin({ dni, password });
  };

  useEffect(() => {
    if (errores !== undefined) {
      Swal.fire("Error", errores, "error");
    }
  }, [errores]);

  return (
    <Box
      component="form"
      mx="auto"
      onSubmit={form.onSubmit((_, e) => handleLogin(e))}
    >
      <Grid justify="center">
        <Grid.Col sm={7} md={7} lg={7} xl={7}>
          <Card
            withBorder
            shadow="lg"
            p="lg"
            radius="md"
            sx={{ position: "static" }}
            mt={100}
          >
            <Card.Section withBorder inheritPadding py="xs">
              <Group position="apart">
                <TitlePage fw={700} title="Sistema de Delegación del Voto" />
              </Group>
            </Card.Section>
            <Card.Section inheritPadding mt="xl" pb="lg">
              <Image
                maw={220}
                mx="auto"
                mt="md"
                mb="md"
                radius="xs"
                src={logo}
                alt="logo"
              />
              <TextInput
                label="Número de cedula"
                placeholder="ejemp: 0800223344"
                withAsterisk
                {...form.getInputProps("dni")}
              />
              <PasswordInput
                label="Contraseña"
                placeholder="Tu contraseña"
                mt="md"
                withAsterisk
                {...form.getInputProps("password")}
              />
              <Checkbox label="Mantenme conectado" mt="xl" color="indigo.7" />
            </Card.Section>
            <Card.Section inheritPadding mt="md" pb="md">
              <Group position="center">
                <Button
                  leftIcon={<IconKey size="1.1rem" />}
                  radius="md"
                  variant="filled"
                  color="indigo.7"
                  type="submit"
                >
                  Autenticarse
                </Button>
              </Group>
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
};
