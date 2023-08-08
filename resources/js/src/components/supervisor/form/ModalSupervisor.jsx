import { Modal, useMantineTheme } from "@mantine/core";
import { FormSupervisor, TitlePage } from "../../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import { useSupervisorStore, useUiSupervisor } from "../../../hooks";

export const ModalSupervisor = () => {
    const theme = useMantineTheme();
    const { isOpenModalSupervisor, modalActionSupervisor } = useUiSupervisor();
    const { setClearActivateSupervisor } = useSupervisorStore();

    const form = useForm({
        initialValues: {
            nombres_completos: "",
            dni: "",
            email: "",
            telefono: "",
            canton_id: "",
            parroquia_id: ""
        },
        validate: {
            nombres_completos: isNotEmpty("Por favor ingresa los apellidos y nombres"),
            dni: isNotEmpty("Por favor ingresa el # de cédula"),
            telefono: isNotEmpty("Por favor ingresa el número de teléfono"),
            canton_id: isNotEmpty("Por favor ingresa el cantón"),
            parroquia_id: isNotEmpty("Por favor ingresa uno o varias parroquias")
        }
    });

    const handleCloseModalSuper = () => {
        form.reset();
        setClearActivateSupervisor();
        modalActionSupervisor(0);
    }

    return (
        <Modal
            opened={isOpenModalSupervisor}
            onClose={handleCloseModalSuper}
            title={<TitlePage title="Supervisor" fz={14} fw={700} />}
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
            <FormSupervisor form={form} />
        </Modal>
    );
};
