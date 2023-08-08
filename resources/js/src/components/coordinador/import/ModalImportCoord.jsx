import { Modal, useMantineTheme } from "@mantine/core";
import { FormImportCoord, TitlePage } from "../../../components";
import { useUiCoordinador } from "../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";


export const ModalImportCoord = () => {
    const theme = useMantineTheme();
    const { isOpenModalImportCoord, modalActionImportCoord } = useUiCoordinador();

    const form = useForm({
        initialValues: {
            coordinadores_import: "",
        },
        validate: {
            coordinadores_import: isNotEmpty(
                "Por favor ingrese un archivo en formato CSV"
            ),
        },
    });

    const handleCloseModalImport = () => {
        form.reset();
        modalActionImportCoord(0);
    }

    return (
        <Modal
            opened={isOpenModalImportCoord}
            onClose={handleCloseModalImport}
            title={<TitlePage title="Importar Coordinadores" fz={14} fw={700} />}
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
            <FormImportCoord form={form} />
        </Modal>
    );
};
