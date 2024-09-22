import { Modal, useMantineTheme } from "@mantine/core";
import { FormImportEscaneador, TitlePage } from "../../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import { useUiEscaner } from "../../../hooks";

export const ModalImportEscaneador = () => {
    const theme = useMantineTheme();
    const { isOpenModalImportEscaner, modalActionImportEscaner } = useUiEscaner();

    const form = useForm({
        initialValues: {
            escaneadores_import: "",
        },
        validate: {
            escaneadores_import: isNotEmpty(
                "Por favor ingrese un archivo en formato CSV"
            ),
        },
    });

    const handleCloseModalImport = () => {
        form.reset();
        modalActionImportEscaner(0);
    };

    return (
        <Modal
            opened={isOpenModalImportEscaner}
            onClose={handleCloseModalImport}
            title={<TitlePage ta="left" order={3}>Importar Escaneadores</TitlePage>}
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
            <FormImportEscaneador form={form} />
        </Modal>
    );
};
