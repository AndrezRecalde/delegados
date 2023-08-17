import {
    Group,
    Progress,
    ScrollArea,
    Table,
    Text,
    createStyles,
    rem,
} from "@mantine/core";
import { useEffect } from "react";
import { useDashboardStore } from "../../../../hooks";

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

export const TableAvanceRecintos = () => {
    const { classes, theme } = useStyles();
    const { avanceRecintos, activateParroquia, startAvanceRecintos, setClearActivateParroquia } = useDashboardStore();


    useEffect(() => {
        startAvanceRecintos(activateParroquia);

      return () => {
        setClearActivateParroquia();
      }
    }, []);

    const totales = avanceRecintos?.map(recinto => recinto.total_veed !== null ? recinto.total_veed : 0).reduce((prev, curr) => prev + curr, 0);


    const rows = avanceRecintos.map((row) => {
        let totalVeedores =
            (parseInt(row.total_veed !== null ? row.total_veed : 0) * 100) /
            parseInt(row.total_juntas);
        let totalJuntas =
            100 -
            (parseInt(row.total_veed !== null ? row.total_veed : 0) * 100) /
                parseInt(row.total_juntas);

        if (totalVeedores > 100) {
            totalVeedores = 100;
        }

        if (totalJuntas > 100) {
            totalJuntas = 100;
        }

        return (
            <tr key={row.id}>
                <td>
                    {/* <Anchor component="button" fz="sm"> */}
                    {row.nombre_recinto}
                    {/*  </Anchor> */}
                </td>
                <td>{row.total_veed !== null ? row.total_veed : 0}</td>
                <td>{row.total_juntas}</td>
                <td>{row.total_veed !== null ? row.total_veed.toFixed(0) * 20 : 0}</td>
                <td>
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
                </td>
            </tr>
        );
    });

    return (
        <ScrollArea>
            <Table
                withBorder
                withColumnBorders
                sx={{ minWidth: 800 }}
                verticalSpacing="xs"
            >
                <thead>
                    <tr>
                        <th>Recinto</th>
                        <th>Veedores Registrados</th>
                        <th>Total Juntas</th>
                        <th>Monetización (20$)</th>
                        <th>Progreso del Recinto</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
            <Table
                withBorder
                withColumnBorders>
                    <tbody>
                        <tr>
                          <td><Text fz="xs" c="teal.7" weight={700}>TOTAL (20 USD)</Text></td>
                          <td>{totales * 20} USD</td>
                        </tr>
                    </tbody>
                </Table>
        </ScrollArea>
    );
};
