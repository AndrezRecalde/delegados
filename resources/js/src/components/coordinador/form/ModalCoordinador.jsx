import { Modal, useMantineTheme } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useCoordinadorStore, useUiCoordinador } from "../../../hooks";
import { TitlePage, FormCoordinador } from "../../../components";

export const ModalCoordinador = () => {
    const theme = useMantineTheme();
    const { isOpenModalCoordinador, modalActionCoordinador } =
        useUiCoordinador();
    const { setClearActivateCoordinador } = useCoordinadorStore();

    const form = useForm({
        initialValues: {
            nombres_completos: "",
            dni: "",
            email: "",
            telefono: "",
            supervisor_id: "",
            canton_id: "",
            parroquia_id: "",
            recinto_id: "",
        },
        validate: {
            nombres_completos: isNotEmpty(
                "Por favor ingresa los apellidos y nombres"
            ),
            dni: isNotEmpty("Por favor ingresa el número de cedula"),
            telefono: isNotEmpty("Por favor ingresa el número de telefono"),
            supervisor_id: isNotEmpty("Por favor selecciona un supervisor"),
            canton_id: isNotEmpty("Por favor ingrese un cantón"),
            parroquia_id: isNotEmpty("Por favor ingrese una parroquia"),
            recinto_id: isNotEmpty(
                "Pore favor seleccione uno o varios recintos a cargo"
            ),
        },
    });

    const handleCloseModalCoord = () => {
        form.reset();
        setClearActivateCoordinador();
        modalActionCoordinador(0);
    };

    return (
        <Modal
            opened={isOpenModalCoordinador}
            onClose={handleCloseModalCoord}
            title={<TitlePage ta="left" order={3}>Coordinador</TitlePage>}
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
            <FormCoordinador form={form} />
        </Modal>
    );
};
