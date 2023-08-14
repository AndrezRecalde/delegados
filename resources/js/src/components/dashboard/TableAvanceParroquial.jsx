import { useCallback, useMemo } from "react";
import {
    Group,
    NavLink,
    Progress,
    Text,
    createStyles,
    rem,
} from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useDashboardStore, useUiDashboard } from "../../hooks";

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

export const TableAvanceParroquial = () => {
    const { classes, theme } = useStyles();

    const { isLoading, avanceParroquias, setActivateParroquia } =
        useDashboardStore();
    const { modalActionAvanceRecinto } =  useUiDashboard();

    const columns = useMemo(
        () => [
            {
                accessorKey: "nombre_parroquia",
                header: "Parroquia",
                wrap: true,
                Cell: ({ cell }) => (
                    <NavLink
                        onClick={() => activateParroquia(cell.row.original)}
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
                    row.total_veed !== null ? row.total_veed.toFixed(0) * 20 : 0,
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

    const activateParroquia = useCallback((selected) => {
        setActivateParroquia(selected);
        modalActionAvanceRecinto(1);
    }, []);

    const table = useMantineReactTable({
        columns,
        data: avanceParroquias, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableColumnOrdering: true,
        enablePagination: true,
        state: { showProgressBars: isLoading },
    });

    return <MantineReactTable table={table} />;
};
