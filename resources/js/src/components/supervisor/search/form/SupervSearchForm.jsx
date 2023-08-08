import { useEffect } from "react";
import { Box, Grid, Select } from "@mantine/core";
import { IconDatabase } from "@tabler/icons-react";
import { BtnSubmit } from "../../../../components";
import { useStateStore, useSupervisorStore } from "../../../../hooks";

export const SupervSearchForm = ({ form }) => {
    const { canton_id } = form.values;
    const { startSearchSupervisores } = useSupervisorStore();
    const { cantones, startLoadCantones, parroquias, startLoadParroquias, starClearStates } = useStateStore();


    useEffect(() => {
        startLoadCantones();

        return () => {
            starClearStates();
        }

    }, []);

    useEffect(() => {
        startLoadParroquias(canton_id);
        form.setFieldValue("parroquia_id", 0);
    }, [canton_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startSearchSupervisores(form.values);
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
            </Grid>
            <BtnSubmit icon={IconDatabase} texto="Filtrar Supervisores" />
        </Box>
    );
};
