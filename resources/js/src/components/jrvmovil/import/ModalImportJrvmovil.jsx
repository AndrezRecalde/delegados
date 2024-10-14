import { Modal, useMantineTheme } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { FormImportJrvmovil, TitlePage } from "../../../components";
import { useUiJrvmovil } from "../../../hooks";

export const ModalImportJrvmovil = () => {
    const theme = useMantineTheme();
    const { isOpenModalImportJrvmovil, modalActionImportJrvmovil } =
        useUiJrvmovil();

    const form = useForm({
        initialValues: {
            jrvmoviles_import: "",
        },
        validate: {
            jrvmoviles_import: isNotEmpty(
                "Por favor ingrese un archivo en formato CSV"
            ),
        },
    });

    const handleCloseModalImport = () => {
        form.reset();
        modalActionImportJrvmovil(0);
    };

    return (
        <Modal
            opened={isOpenModalImportJrvmovil}
            onClose={handleCloseModalImport}
            title={<TitlePage ta="left" order={3}>Importar JRV Móviles</TitlePage>}
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
            <FormImportJrvmovil form={form} />
        </Modal>
    );
};
