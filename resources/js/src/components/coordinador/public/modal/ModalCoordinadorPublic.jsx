import { Modal, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FormCoordinadorPublic, TextSection } from "../../../../components";
import { useStateStore, useUiCoordinador, useUiVeedor } from "../../../../hooks";
import { useEffect } from "react";

export const ModalCoordinadorPublic = () => {
    const theme = useMantineTheme();
    const { isOpenModalCoordinador, modalActionCoordinador } = useUiCoordinador();
    const { startLoadCantones } = useStateStore();

    const form = useForm({
        initialValues: {
            coordinadores: [
                {
                    nombres: "",
                    apellidos: "",
                    dni: "",
                },
            ],
        },
        transformValues: (values) => ({
            ...values,
            coordinadores: values.coordinadores.map((d) => ({
                ...d,
            })),
        }),
    });

    useEffect(() => {
        if (isOpenModalCoordinador) {
            startLoadCantones();
        }
    }, [isOpenModalCoordinador]);

    const handleCloseModalVeedor = () => {
        form.reset();
        modalActionCoordinador(0);
    };

    return (
        <Modal
            opened={isOpenModalCoordinador}
            onClose={handleCloseModalVeedor}
            title={
                <TextSection tt="" fz={18} fw={700}>
                    Delegado
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
            <FormCoordinadorPublic form={form} />
        </Modal>
    );
};
