import {
    createStyles,
    ThemeIcon,
    Text,
    Group,
    Badge,
    Paper,
    rem,
} from "@mantine/core";
import { IconCoins } from "@tabler/icons-react";
import { useDashboardStore } from "../../hooks";

const ICON_SIZE = rem(60);

const useStyles = createStyles((theme) => ({
    card: {
        position: "relative",
        overflow: "visible",
        padding: theme.spacing.xl,
        paddingTop: `calc(${theme.spacing.xl} * 1.5 + ${ICON_SIZE} / 3)`,
    },

    icon: {
        position: "absolute",
        top: `calc(-${ICON_SIZE} / 3)`,
        left: `calc(50% - ${ICON_SIZE} / 2)`,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
    },
}));

export function StatPayroll() {
    const { totalConfirmados } = useDashboardStore();
    const { classes } = useStyles();

    return (
        <Paper
            radius="md"
            withBorder
            className={classes.card}
            mt={`calc(${ICON_SIZE} / 3)`}
        >
            <ThemeIcon
                className={classes.icon}
                size={ICON_SIZE}
                radius={ICON_SIZE}
                color="indigo.7"
            >
                <IconCoins size="2rem" stroke={1.5} />
            </ThemeIcon>

            <Text ta="center" fw={700} className={classes.title}>
                Pago General de Delegados Confirmados
            </Text>
            <Text c="dimmed" ta="center" fz="lg">
                { `${totalConfirmados * 20} USD`}
            </Text>

            <Group position="apart" mt="md">
                {/* <Text fz="sm">20 / 36 km</Text> */}
                <Badge size="sm">20 de agosto</Badge>
            </Group>
        </Paper>
    );
}
