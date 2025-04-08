import { Button, Container, Divider, Group, rem, Stack, TextInput } from "@mantine/core";
import { BtnAdd, InfoHeader, TitlePage } from "../../../../components";
import { IconPencilPlus, IconSearch } from "@tabler/icons-react";

export const DelegadoViewPage = () => {
    const handleOpen = () => {
        console.log("clic");
    };

    return (
        <Container size="lg" px={40} py={40}>
            <Group position="apart">
                <TitlePage ta="left" order={3}>
                    Delegados de la Junta
                </TitlePage>
                <BtnAdd title="Inscribirme" handleAdd={handleOpen} heigh={45} />
            </Group>
            <Divider my="md" />
            <InfoHeader texto="Si ya se registró, puede buscar su nombre usando su número de cédula y volver a imprimir su ficha de delegado" />

            <Stack>
                <TextInput
                    label="Buscar por cédula"
                    placeholder="Ingrese su número de cédula"
                />
                <Button
                    height={50}
                    color="indigo.7"
                    variant="filled"
                    leftIcon={<IconSearch />}
                    styles={(theme) => ({
                        root: {
                          height: rem(45),
                        },
                    })}
                >
                    Buscar
                </Button>
            </Stack>
        </Container>
    );
};
