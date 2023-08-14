import {
    Navbar,
    ScrollArea,
    createStyles,
    getStylesRef,
    rem,
} from "@mantine/core";
import {
    IconChartDonutFilled,
    IconEyeDown,
    IconEyePin,
    IconEyeShare,
    IconListCheck,
    IconListDetails,
    IconLogout,
    IconScan,
} from "@tabler/icons-react";
import { LinksGroup } from "./LinksGroup";
import { useAuthStore } from "../../hooks";
import { TitlePage } from "../../components";

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
        paddingBottom: 0,
    },

    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        borderBottom: `${rem(1)} solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
    },

    links: {
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
    },
    link: {
        ...theme.fn.focusStyles(),
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        fontSize: theme.fontSizes.sm,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
            color: theme.colorScheme === "dark" ? theme.white : theme.black,

            [`& .${getStylesRef("icon")}`]: {
                color: theme.colorScheme === "dark" ? theme.white : theme.black,
            },
        },
    },

    linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
    },

    linkIcon: {
        ref: getStylesRef("icon"),
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[2]
                : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    footer: {
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
    },
}));

const mockdata = [
    {
        label: "Dashboard",
        icon: IconChartDonutFilled,
        links: [
            { label: "Dashboard", link: "/dashboard" },
            { label: "Ver resúmen", link: "/dashboard/summary" },
        ],
    },
    {
        label: "Supervisores",
        icon: IconListCheck,
        initiallyOpened: true,
        links: [
            { label: "Ver supervisores", link: "/supervisores" },
            { label: "Exportar supervisores", link: "/export/supervisores" },
        ],
    },
    {
        label: "Coordinadores",
        icon: IconListDetails,
        initiallyOpened: true,
        links: [
            { label: "Ver coordinadores", link: "/coordinadores" },
            { label: "Exportar coordinadores", link: "/export/coordinadores" },
        ],
    },
    {
        label: "Delegados",
        icon: IconEyeShare,
        initiallyOpened: true,
        links: [
            { label: "Ver delegados", link: "/jrv/delegados" },
            { label: "Exportar delegados", link: "/export/delegados" },
        ],
    },
    {
        label: "JRV Móviles",
        icon: IconEyePin,
        initiallyOpened: true,
        links: [
            { label: "Ver JRV Móviles", link: "/jrv/moviles" },
        ],
    },
    {
        label: "JRV Reconteo",
        icon: IconEyeDown,
        initiallyOpened: false,
        links: [
            { label: "Ver JRV Reconteo", link: "/jrv/reconteos" },
        ],
    },
    {
        label: "Escaneadores",
        icon: IconScan,
        initiallyOpened: false,
        links: [
            { label: "Ver Escaneadores", link: "/escaneadores" },
            { label: "Exportar escaneadores", link: "/export/escaneadores" },
        ],
    },
];

export const NavbarSegmented = ({ opened }) => {
    const { startLogout } = useAuthStore();
    const { classes } = useStyles();
    const links = mockdata.map((item) => (
        <LinksGroup {...item} key={item.label} />
    ));

    return (
        <Navbar
            height="auto"
            width={{ sm: 300, lg: 300 }}
            p="md"
            className={classes.navbar}
            hiddenBreakpoint="sm"
            hidden={!opened}
        >
            {/* <Navbar.Section className={classes.header}>
        <Group position="apart">
          <Logo width={rem(120)} />
          <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
        </Group>
      </Navbar.Section> */}

            <Navbar.Section
                grow
                className={classes.links}
                component={ScrollArea}
            >
                <div className={classes.linksInner}>{links}</div>
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <a href="#" className={classes.link} onClick={startLogout}>
                    <IconLogout
                        className={classes.linkIcon}
                        stroke={1.9}
                        color="red"
                    />
                    <TitlePage tt="capitalize" fw={500} fz={18} title="Salir" />
                </a>
            </Navbar.Section>
        </Navbar>
    );
};
