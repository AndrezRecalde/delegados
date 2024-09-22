import { useEffect } from "react";
import { Box, Grid, Select } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import { IconDatabase } from "@tabler/icons-react";
import { useCoordinadorStore, useStateStore, useSupervisorStore } from "../../../../hooks";

export const CoordSearchForm = ({ form }) => {
    const { canton_id, parroquia_id } = form.values;
    const { startSearchCoordinador } = useCoordinadorStore();
    const { supervisores, startLoadSupervisores, startClearSupervisores } = useSupervisorStore();
    const {
        cantones,
        parroquias,
        recintos,
        startLoadCantones,
        startLoadParroquias,
        startLoadRecintos,
        starClearStates
    } = useStateStore();

    useEffect(() => {
        startLoadCantones();
        startLoadSupervisores({});

        return () => {
            startClearSupervisores();
            starClearStates();
          }

    }, []);

    useEffect(() => {
        startLoadParroquias(canton_id);
        form.setFieldValue("parroquia_id", 0);
    }, [canton_id]);

    useEffect(() => {
        startLoadRecintos(parroquia_id);
        form.setFieldValue("recinto_id", 0);
    }, [parroquia_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startSearchCoordinador(form.values);
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
                        label="Selecciona el Parroquia"
                        placeholder="Parroquia"
                        searchable
                        clearable
                        nothingFound="No options"
                        {...form.getInputProps("parroquia_id")}
                        data={parroquias.map((parroquia) => {
                            return {
                                value: parroquia.id,
                                label: parroquia.nombre_parroquia,
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
            </Grid>
            <BtnSubmit IconSection={IconDatabase}>Filtrar Coordinadores</BtnSubmit>
        </Box>
    );
};
