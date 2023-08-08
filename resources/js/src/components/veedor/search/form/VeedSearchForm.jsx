import { useEffect } from "react";
import { Box, Grid, Select } from "@mantine/core";
import { IconDatabase } from "@tabler/icons-react";
import { BtnSubmit } from "../../../../components";
import {
    useCoordinadorStore,
    useStateStore,
    useSupervisorStore,
    useVeedorStore,
} from "../../../../hooks";

export const VeedSearchForm = ({ form }) => {
    const { canton_id } = form.values;
    const { startSearchVeedor } = useVeedorStore();
    const { supervisores, startLoadSupervisores, startClearSupervisores } = useSupervisorStore();
    const { coordinadores, startLoadCoordinadores, startClearCoordinadores } = useCoordinadorStore();
    const { cantones, recintos, startLoadCantones, startLoadAllRecintos, starClearStates } =
        useStateStore();

    useEffect(() => {
        startLoadCantones();
        startLoadSupervisores();
        startLoadCoordinadores();

        return () => {
            starClearStates();
            startClearCoordinadores();
            startClearSupervisores();
        }

    }, []);

    useEffect(() => {
        startLoadAllRecintos(canton_id);
        form.setFieldValue("recinto_id", 0);
    }, [canton_id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        startSearchVeedor(form.values);
    }

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
                <Grid.Col sm={12} md={6} lg={6} xl={6}>
                    <Select
                        label="Selecciona el Cantón"
                        placeholder="Cantón"
                        searchable
                        clearable
                        nothingFound="No options"
                        {...form.getInputProps("canton_id")}
                        data={cantones.map((canton) => {
                            return {
                                value: canton.id,
                                label: canton.nombre_canton,
                            };
                        })}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={6} xl={6}>
                    <Select
                        label="Selecciona el Recinto"
                        placeholder="Recinto"
                        searchable
                        clearable
                        nothingFound="No options"
                        {...form.getInputProps("recinto_id")}
                        data={recintos.map((recinto) => {
                            return {
                                value: recinto.id,
                                label: recinto.nombre_recinto,
                            };
                        })}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={6} xl={6}>
                    <Select
                        label="Selecciona el Supervisor"
                        placeholder="Supervisor"
                        searchable
                        clearable
                        nothingFound="No options"
                        {...form.getInputProps("supervisor_id")}
                        data={supervisores.map((supervisor) => {
                            return {
                                value: supervisor.id,
                                label: supervisor.nombres_completos,
                            };
                        })}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={6} xl={6}>
                    <Select
                        label="Selecciona el coordinador"
                        placeholder="Coordinador"
                        searchable
                        clearable
                        nothingFound="No options"
                        {...form.getInputProps("coordinador_id")}
                        data={coordinadores.map((coordinador) => {
                            return {
                                value: coordinador.id,
                                label: coordinador.nombres_completos,
                            };
                        })}
                    />
                </Grid.Col>
            </Grid>
            <BtnSubmit icon={IconDatabase} texto="Filtrar Delegados" />
        </Box>
    );
};
