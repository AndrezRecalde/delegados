import { useEffect } from "react";
import { Box, Select, SimpleGrid } from "@mantine/core";
import { IconDatabase } from "@tabler/icons-react";
import { BtnSubmit } from "../../../../components";
import { useStateStore, useSupervisorStore } from "../../../../hooks";

export const SupervSearchForm = ({ form }) => {
    const { canton_id } = form.values;
    const { startSearchSupervisores } = useSupervisorStore();
    const {
        cantones,
        startLoadCantones,
        parroquias,
        startLoadParroquias,
        starClearStates,
    } = useStateStore();

    useEffect(() => {
        startLoadCantones();

        return () => {
            starClearStates();
        };
    }, []);

    useEffect(() => {
        startLoadParroquias(canton_id);
        form.setFieldValue("parroquia_id", 0);
    }, [canton_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startSearchSupervisores(form.values);
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
            <SimpleGrid
                cols={4}
                spacing="lg"
                breakpoints={[
                    { minWidth: 'sm', cols: 1 },
                    { minWidth: 'md', cols: 2 },
                    { minWidth: 1200, cols: 2 },
                  ]}
            >
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
            </SimpleGrid>
            <BtnSubmit IconSection={IconDatabase}>
                Filtrar Supervisores
            </BtnSubmit>
        </Box>
    );
};
