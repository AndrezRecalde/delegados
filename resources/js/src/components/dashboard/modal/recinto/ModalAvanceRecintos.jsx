import { Modal, useMantineTheme } from "@mantine/core";
import { useDashboardStore, useUiDashboard } from "../../../../hooks";
import { TableAvanceRecintos, TitlePage } from "../../..";

export const ModalAvanceRecintos = () => {
    const theme = useMantineTheme();
    const { setClearActivateParroquia, setClearAvanceRecintos } = useDashboardStore();
    const { isOpenModalAvanceRecinto, modalActionAvanceRecinto } = useUiDashboard();


    const handleCloseModalAvance = () => {
        setClearActivateParroquia();
        setClearAvanceRecintos();
        modalActionAvanceRecinto(0);
    }

    return (
        <Modal
            opened={isOpenModalAvanceRecinto}
            onClose={handleCloseModalAvance}
            title={<TitlePage title="Avance de Recintos" fz={14} fw={700} />}
            overlayProps={{
                color:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2],
                opacity: 0.55,
                blur: 3,
            }}
            size="70%"
            radius="md"
        >
            <TableAvanceRecintos />
        </Modal>
    );
};
