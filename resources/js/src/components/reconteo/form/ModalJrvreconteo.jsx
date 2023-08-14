import { Modal, useMantineTheme } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { FormJrvreconteo, TitlePage } from "../../../components";
import { useReconteoStore, useUiReconteo } from "../../../hooks";

export const ModalJrvreconteo = () => {
    const theme = useMantineTheme();
    const { isOpenModalReconteo, modalActionReconteo } = useUiReconteo();
    const { setClearActivateJrvReconteo } = useReconteoStore();

    const form = useForm({
        initialValues: {
            nombres_completos: "",
            dni: "",
        },
        validate: {
            nombres_completos: isNotEmpty(
                "Por favor ingrese apellidos y nombres"
            ),
            dni: isNotEmpty("Por favor ingrese número de cédula"),
        },
    });

    const handleCloseModalJrvreconteo = () => {
        form.reset();
        setClearActivateJrvReconteo();
        modalActionReconteo(0);
    };

    return (
        <Modal
            opened={isOpenModalReconteo}
            onClose={handleCloseModalJrvreconteo}
            title={<TitlePage title="JRV Reconteo" fz={14} fw={700} />}
            overlayProps={{
                color:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2],
                opacity: 0.55,
                blur: 3,
            }}
            size="xl"
            radius="md"
        >
            <FormJrvreconteo form={form} />
        </Modal>
    );
};
