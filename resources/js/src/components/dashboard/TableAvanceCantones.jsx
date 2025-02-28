import { useCallback, useMemo } from "react";
import {
    createStyles,
    Progress,
    Text,
    Group,
    rem,
    NavLink,
} from "@mantine/core";
import { useDashboardStore, useUiDashboard } from "../../hooks";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";

const useStyles = createStyles((theme) => ({
    progressBar: {
        "&:not(:first-of-type)": {
            borderLeft: `${rem(3)} solid ${
                theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.white
            }`,
        },
    },
}));

export const TableAvanceCantones = () => {
    const { classes, theme } = useStyles();

    const { isLoading, avanceCantones, setActivateCanton } = useDashboardStore();
    const { modalActionAvanceParroquia } = useUiDashboard();

    const columns = useMemo(
        () => [
            {
                accessorKey: "nombre_canton",
                header: "Cantón",
                wrap: true,
                Cell: ({ cell }) => (
                    <NavLink
                        onClick={() => activateCanton(cell.row.original)}
                        label={cell.getValue()}
                    />
                ),
            },
            {
                accessorFn: (row) =>
                    row.total_veed !== null ? row.total_veed : 0,
                header: "Veedores Registrados",
                wrap: true,
            },
            {
                accessorKey: "total_juntas",
                header: "Total Juntas",
                wrap: true,
            },
            {
                accessorFn: (row) =>
                    row.total_veed !== null
                        ? row.total_veed.toFixed(0) * 30
                        : 0,
                header: "Monetización (20 USD)",
                wrap: true,
            },
            {
                accessorFn: (row) => {
                    let totalVeedores =
                        (parseInt(
                            row.total_veed !== null ? row.total_veed : 0
                        ) *
                            100) /
                        parseInt(row.total_juntas);
                    let totalJuntas =
                        100 -
                        (parseInt(
                            row.total_veed !== null ? row.total_veed : 0
                        ) *
                            100) /
                            parseInt(row.total_juntas);

                    if (totalVeedores > 100) {
                        totalVeedores = 100;
                    }

                    if (totalJuntas > 100) {
                        totalJuntas = 100;
                    }
                    return (
                        <>
                            <Group position="apart">
                                <Text fz="xs" c="teal.7" weight={700}>
                                    {totalVeedores.toFixed(0)}%
                                </Text>
                                <Text fz="xs" c="red.7" weight={700}>
                                    {totalJuntas.toFixed(0)}%
                                </Text>
                            </Group>
                            <Progress
                                classNames={{ bar: classes.progressBar }}
                                sections={[
                                    {
                                        value: totalVeedores,
                                        color:
                                            theme.colorScheme === "dark"
                                                ? theme.colors.teal[9]
                                                : theme.colors.teal[6],
                                    },
                                    {
                                        value: totalJuntas,
                                        color:
                                            theme.colorScheme === "dark"
                                                ? theme.colors.red[9]
                                                : theme.colors.red[6],
                                    },
                                ]}
                            />
                        </>
                    );
                },
                header: "Progreso",
                wrap: true,
            },
        ],
        []
    );

    const activateCanton = useCallback((selected) => {
        setActivateCanton(selected);
        modalActionAvanceParroquia(1);
    }, []);

    const table = useMantineReactTable({
        columns,
        data: avanceCantones, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableColumnOrdering: true,
        enablePagination: true,
        state: { showProgressBars: isLoading },
    });

    return <MantineReactTable table={table} />;
};
