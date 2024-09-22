import { Modal, useMantineTheme } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { FormImportSuperv, TitlePage } from "../../../components";
import { useUiSupervisor } from "../../../hooks";

export const ModalImportSuperv = () => {
    const theme = useMantineTheme();
    const { isOpenModalImportSuper, modalActionImportSuper } = useUiSupervisor();

    const form = useForm({
        initialValues: {
            supervisores_import: "",
        },
        validate: {
            supervisores_import: isNotEmpty(
                "Por favor ingrese un archivo en formato CSV"
            ),
        },
    });

    const handleCloseModalImport = () => {
        form.reset();
        modalActionImportSuper(0);
    }

    return (
        <Modal
            opened={isOpenModalImportSuper}
            onClose={handleCloseModalImport}
            title={<TitlePage ta="left" order={3}>Importar Supervisores</TitlePage>}
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
            <FormImportSuperv form={form} />
        </Modal>
    );
};
