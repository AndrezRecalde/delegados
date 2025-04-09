import { Modal, useMantineTheme } from "@mantine/core";
import { FormActivarVeed, TextSection } from "../../../../components";
import { useUiVeedor, useVeedorStore } from "../../../../hooks";

export const ModalActivateVeed = () => {
    const theme = useMantineTheme();

    const { isOpenActiveVeedor, modalActionActivateVeed } = useUiVeedor();
    const { setClearActivateVeedor } = useVeedorStore();

    const handleCloseModal = () => {
        //e.preventDefault();
        setClearActivateVeedor();
        modalActionActivateVeed(0);
    };

    return (
        <Modal
            opened={isOpenActiveVeedor}
            onClose={handleCloseModal}
            title={
                <TextSection tt="" fz={18} fw={700}>
                    Confirmar Delegado
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
            <FormActivarVeed />
        </Modal>
    );
};
