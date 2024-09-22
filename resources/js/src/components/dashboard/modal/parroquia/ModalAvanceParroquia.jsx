import { Modal, useMantineTheme } from "@mantine/core";
import { TableAvanceParroquial, TitlePage } from "../../../../components";
import { useDashboardStore, useUiDashboard } from "../../../../hooks";

export const ModalAvanceParroquia = () => {
    const theme = useMantineTheme();
    const { setClearActivateCanton, setClearAvanceParroquias } = useDashboardStore();
    const { isOpenModalAvanceParroquia, modalActionAvanceParroquia } = useUiDashboard();

    const handleCloseModalAvance = () => {
        setClearActivateCanton();
        setClearAvanceParroquias();
        modalActionAvanceParroquia(0);
    }

    return (
        <Modal
            opened={isOpenModalAvanceParroquia}
            onClose={handleCloseModalAvance}
            title={<TitlePage ta="left" order={3}>Avance de Parroquias</TitlePage>}
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
            centered
        >
            <TableAvanceParroquial />
        </Modal>
    );
};
