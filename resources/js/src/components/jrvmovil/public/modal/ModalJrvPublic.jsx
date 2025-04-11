import { Modal, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FormCoordinadorPublic, FormJvrPublic, TextSection } from "../../../../components";
import { useUiJrvmovil } from "../../../../hooks";

export const ModalJrvPublic = () => {
    const theme = useMantineTheme();
    const { isOpenModalJrvmovil, modalActionJrvmovil } = useUiJrvmovil();

    const form = useForm({
        initialValues: {
            jvrs: [
                {
                    nombres: "",
                    apellidos: "",
                    dni: "",
                },
            ],
        },
        transformValues: (values) => ({
            ...values,
            jvrs: values.jvrs.map((d) => ({
                ...d,
            })),
        }),
    });


    const handleCloseModalVeedor = () => {
        form.reset();
        modalActionJrvmovil(0);
    };

    return (
        <Modal
            opened={isOpenModalJrvmovil}
            onClose={handleCloseModalVeedor}
            title={
                <TextSection tt="" fz={18} fw={700}>
                    CDA Delegado
                </TextSection>
            }
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
            <FormJvrPublic form={form} />
        </Modal>
    );
};
