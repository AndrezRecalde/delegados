import { Box, Grid, Select } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import { useEscanerStore, useStateStore } from "../../../../hooks";
import { useEffect } from "react";
import { IconDatabase } from "@tabler/icons-react";

export const EscSearchForm = ({ form }) => {

    const { startSearchEscaneador } = useEscanerStore();
    const { cantones, startLoadCantones } = useStateStore();

    useEffect(() => {
        startLoadCantones();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        startSearchEscaneador(form.values);
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
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
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
            </Grid>
            <BtnSubmit icon={IconDatabase} texto="Filtrar Delegados" />
        </Box>
    );
};
