import {
    Group,
    Loader,
    Paper,
    SimpleGrid,
    Text,
    createStyles,
    rem,
} from "@mantine/core";
import {
    IconListCheck,
    IconListDetails,
    IconScan,
    IconUserShare,
    IconUsers,
} from "@tabler/icons-react";
import { useDashboardStore } from "../../hooks";

const useStyles = createStyles((theme) => ({
    root: {
        /*padding: `calc(${theme.spacing.xl} * 1.5)`, */
        marginTop: rem(25),
        marginBottom: rem(30),
    },

    value: {
        fontSize: rem(24),
        fontWeight: 700,
        lineHeight: 1,
    },

    diff: {
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
    },

    icon: {
        color:
            theme.colorScheme === "dark"
                ? theme.colors.indigo[7]
                : theme.colors.indigo[7],
    },

    title: {
        fontWeight: 700,
        textTransform: "uppercase",
    },
}));

const icons = {
    veed_enrroled: IconUsers,
    veed_confirmed: IconUserShare,
    supervisores: IconListCheck,
    coordinadores: IconListDetails,
    escaneadores: IconScan,
    usuarios: IconUserShare,
};

export const Stats = ({ data }) => {
    const { classes } = useStyles();

    const {
        totalSupervisores,
        totalCoordinadores,
        totalVeedores,
        totalConfirmados,
        totalUsuarios,
        totalEscaneadores,
    } = useDashboardStore();

    const valores = {
        veed_enrroled: totalVeedores,
        veed_confirmed: totalConfirmados,
        supervisores: totalSupervisores,
        coordinadores: totalCoordinadores,
        escaneadores: totalEscaneadores,
        usuarios: totalUsuarios,
    };

    const stats = data.map((stat) => {
        const Icon = icons[stat.icon];
        const totales = valores[stat.value];
        return (
            <Paper withBorder p="md" radius="md" key={stat.title}>
                <div>
                    <Group position="apart">
                        <Text
                            size="xs"
                            color="dimmed"
                            className={classes.title}
                        >
                            {stat.title}
                        </Text>
                        <Icon
                            className={classes.icon}
                            size="1.4rem"
                            stroke={1.9}
                        />
                    </Group>

                    <Group align="flex-end" spacing="xs" mt={25}>
                        <Text className={classes.value}>{totales}</Text>
                    </Group>
                </div>
            </Paper>
        );
    });

    return (
        <div className={classes.root}>
            <SimpleGrid
                cols={1}
                breakpoints={[
                    { maxWidth: "md", cols: 1 },
                    { maxWidth: "xs", cols: 1 },
                ]}
            >
                {stats}
            </SimpleGrid>
        </div>
    );
};
