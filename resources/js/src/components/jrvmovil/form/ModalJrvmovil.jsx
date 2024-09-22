import { Modal, useMantineTheme } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { FormJrvmovil, TitlePage } from "../../../components";
import { useJrvmovilStore, useUiJrvmovil } from "../../../hooks";

export const ModalJrvmovil = () => {
    const theme = useMantineTheme();
    const { isOpenModalJrvmovil, modalActionJrvmovil } = useUiJrvmovil();
    const { setClearActivateJrvmovil } = useJrvmovilStore();

    const form = useForm({
        initialValues: {
            nombres_completos: "",
            dni: "",
        },
        validate: {
            nombres_completos: isNotEmpty(
                "Por favor ingrese apellidos y nombres"
            ),
            dni: isNotEmpty("Por favor ingrese número de cédula"),
        },
    });

    const handleCloseModalJrvmovil = () => {
        form.reset();
        setClearActivateJrvmovil();
        modalActionJrvmovil(0);
    };

    return (
        <Modal
            centered
            opened={isOpenModalJrvmovil}
            onClose={handleCloseModalJrvmovil}
            title={
                <TitlePage ta="left" order={3}>
                    JRV Móvil
                </TitlePage>
            }
            overlayProps={{
                color:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2],
                opacity: 0.55,
                blur: 3,
            }}
            size="xl"
            radius="md"
        >
            <FormJrvmovil form={form} />
        </Modal>
    );
};
