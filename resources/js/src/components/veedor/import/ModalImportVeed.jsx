import { Modal, useMantineTheme } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { FormImportVeed, TitlePage } from "../../../components";
import { useUiVeedor } from "../../../hooks";

export const ModalImportVeed = () => {
    const theme = useMantineTheme();
    const { isOpenModalFileVeedor, modalActionFileVeedor } = useUiVeedor();

    const form = useForm({
        initialValues: {
            veedores_import: "",
        },
        validate: {
            veedores_import: isNotEmpty(
                "Por favor ingrese un archivo en formato CSV"
            ),
        },
    });

    const handleCloseModalImport = () => {
        form.reset();
        modalActionFileVeedor(0);
    };

    return (
        <Modal
            opened={isOpenModalFileVeedor}
            onClose={handleCloseModalImport}
            title={<TitlePage title="Importar Delegados" fz={14} fw={700} />}
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
            <FormImportVeed form={form} />
        </Modal>
    );
};
