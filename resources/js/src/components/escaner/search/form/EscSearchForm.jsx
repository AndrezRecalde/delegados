import { Box, Grid, Select, Stack } from "@mantine/core";
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
            <Stack>
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
                <BtnSubmit IconSection={IconDatabase}>Filtrar Delegados</BtnSubmit>
            </Stack>
        </Box>
    );
};
