import { Modal, useMantineTheme } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { TitlePage, FormImportJrvreconteo } from "../../../components";
import { useUiReconteo } from "../../../hooks";

export const ModalImportJrvReconteo = () => {

    const theme = useMantineTheme();
    const { isOpenModalImportReconteo, modalActionImportReconteo } =
        useUiReconteo();

    const form = useForm({
        initialValues: {
            reconteos_import: "",
        },
        validate: {
            reconteos_import: isNotEmpty(
                "Por favor ingrese un archivo en formato CSV"
            ),
        },
    });

    const handleCloseModalImport = () => {
        form.reset();
        modalActionImportReconteo(0);
    };

    return (
        <Modal
            opened={isOpenModalImportReconteo}
            onClose={handleCloseModalImport}
            title={<TitlePage title="Importar JRV Reconteo" fz={14} fw={700} />}
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
            <FormImportJrvreconteo form={form} />
        </Modal>
    );
};
