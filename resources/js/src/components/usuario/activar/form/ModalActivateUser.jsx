import { Modal, useMantineTheme } from "@mantine/core";
import { FormActivateUser, TextSection } from "../../../../components";
import { useUiUsuario, useUsuarioStore } from "../../../../hooks";

export const ModalActivateUser = () => {
    const theme = useMantineTheme();

    const { isOpenModalActivateUser, modalActivateUsuario } = useUiUsuario();
    const { setClearActivateUsuario } = useUsuarioStore();

    const handleCloseModal = () => {
        modalActivateUsuario(0);
        setClearActivateUsuario();
    };

    return (
        <Modal
            opened={isOpenModalActivateUser}
            onClose={handleCloseModal}
            title={
                <TextSection tt="" fz={18} fw={700}>
                    Activar Usuario
                </TextSection>
            }
            centered
            overlayProps={{
                color:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2],
                opacity: 0.55,
                blur: 3,
            }}
        >
            <FormActivateUser />
        </Modal>
    );
};
