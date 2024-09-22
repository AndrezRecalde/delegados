import { Modal, useMantineTheme } from "@mantine/core";
import { FormUsuario, TitlePage } from "../../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import { useUiUsuario, useUsuarioStore } from "../../../hooks";

export const ModalUsuario = () => {
    const theme = useMantineTheme();
    const { isOpenModalUser, modalActionUsuario } = useUiUsuario();
    const { setClearActivateUsuario } = useUsuarioStore();

    const form = useForm({
        initialValues: {
            nombres_completos: "",
            dni: "",
            roles: "",
        },
        validate: {
            nombres_completos: isNotEmpty("Por favor ingresa los nombres"),
            dni: isNotEmpty("Por favor ingresa el número de cedula"),
            roles: isNotEmpty("Por favor selecciona uno o varios roles"),
        },
    });

    const handleCloseModalUsuario = () => {
        form.reset();
        setClearActivateUsuario();
        modalActionUsuario(0);
    };

    return (
        <Modal
            centered
            opened={isOpenModalUser}
            onClose={handleCloseModalUsuario}
            title={
                <TitlePage ta="left" order={3}>
                    Usuario
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
            size="lg"
            radius="md"
        >
            <FormUsuario form={form} />
        </Modal>
    );
};
