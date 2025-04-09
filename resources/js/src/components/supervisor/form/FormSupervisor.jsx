import { useEffect } from "react";
import { Box, Grid, MultiSelect, Select, TextInput } from "@mantine/core";
import {
    useStateStore,
    useSupervisorStore,
    useUiSupervisor,
} from "../../../hooks";
import { IconChecks } from "@tabler/icons-react";
import { BtnSubmit } from "../../../components";

export const FormSupervisor = ({ form }) => {
    const { canton_id } = form.values;
    const { startAddSupervisor, activateSupervisor } = useSupervisorStore();
    const { modalActionSupervisor } = useUiSupervisor();
    const { cantones, parroquias, startLoadCantones, startLoadParroquias } =
        useStateStore();

    useEffect(() => {
        startLoadCantones();
    }, []);

    useEffect(() => {
        startLoadParroquias(canton_id);
        form.setFieldValue(
            "parroquia_id",
            activateSupervisor?.parroquia_id ??
                activateSupervisor?.parroquias.map(
                    (parroquias) => parroquias.id.toString()
                )
        );
    }, [canton_id]);

    useEffect(() => {
        if (activateSupervisor !== null) {
            form.setValues({
                ...activateSupervisor,
                nombres: activateSupervisor.nombres_supervisor,
                apellidos: activateSupervisor.apellidos_supervisor,
                canton_id: activateSupervisor.canton_id
                    ? activateSupervisor.canton_id.toString()
                    : null,
                parroquia_id: activateSupervisor.parroquias.map(
                    (parroquia) => parroquia.id.toString()
                ),
            });
            return;
        }
    }, [activateSupervisor]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startAddSupervisor(form.values);
        form.reset();
        modalActionSupervisor(0);
    };

    return (
        <Box
            component="form"
            mx="auto"
            sx={(theme) => ({
                padding: theme.spacing.md,
            })}
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Grid>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <TextInput
                        placeholder="Número de cédula"
                        label="Cédula"
                        withAsterisk
                        {...form.getInputProps("dni")}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={6} xl={6}>
                    <TextInput
                        placeholder="Apellidos del Supervisor"
                        label="Apellidos"
                        withAsterisk
                        {...form.getInputProps("apellidos")}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={6} xl={6}>
                    <TextInput
                        placeholder="Nombres del Supervisor"
                        label="Nombres"
                        withAsterisk
                        {...form.getInputProps("nombres")}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={6} xl={6}>
                    <TextInput
                        placeholder="Correo electrónico (opcional)"
                        label="Correo electrónico"
                        {...form.getInputProps("email")}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={6} xl={6}>
                    <TextInput
                        placeholder="Número de teléfono"
                        label="Teléfono"
                        {...form.getInputProps("telefono")}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Select
                        label="Seleccione el cantón"
                        placeholder="Cantón"
                        searchable
                        withAsterisk
                        nothingFound="No options"
                        {...form.getInputProps("canton_id")}
                        data={cantones.map((canton) => {
                            return {
                                value: canton.id.toString(),
                                label: canton.nombre_canton,
                            };
                        })}
                    />
                </Grid.Col>
                <Grid.Col xs={12} md={12} lg={12}>
                    <MultiSelect
                        label="Elija la(s) parroquia(s)"
                        placeholder="Parroquia(s)"
                        searchable
                        nothingFound="No options"
                        radius="md"
                        withAsterisk
                        {...form.getInputProps("parroquia_id")}
                        data={parroquias.map((parroquia) => {
                            return {
                                value: parroquia.id.toString(),
                                label: parroquia.nombre_parroquia,
                            };
                        })}
                    />
                </Grid.Col>
            </Grid>
            <BtnSubmit IconSection={IconChecks}>Agregar Supervisor</BtnSubmit>
        </Box>
    );
};
