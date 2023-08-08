import { useState } from "react";
import {
    createStyles,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    rem,
} from "@mantine/core";
import {
    IconLogout,
    IconSettings,
    IconChevronDown,
    IconUsersPlus,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../hooks";

const useStyles = createStyles((theme) => ({
    mainSection: {
        padding: theme.spacing.sm,
    },

    user: {
        color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        transition: "background-color 100ms ease",

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[1],
        },

        [theme.fn.smallerThan("xs")]: {
            display: "none",
        },
    },

    userActive: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },
}));

export function User() {
    const { classes, theme, cx } = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    const { user, startLogout } = useAuthStore();

    const navigate = useNavigate();

    const iniciales = () => {
        let n = user.nombres_completos.slice(0, 1);
        return n;
    };

    const changePassword = () => {
        navigate("/change-password");
    };

    const navigateForUsers = () => {
        navigate("/usuarios");
    };

    return (
        <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
            offset={-1}
        >
            <Menu.Target>
                <UnstyledButton
                    className={cx(classes.user, {
                        [classes.userActive]: userMenuOpened,
                    })}
                >
                    <Group spacing={7}>
                        <Avatar
                            radius="xl"
                            color="indigo.7"
                            alt={user.nombres_completos}
                        >
                            {iniciales()}
                        </Avatar>
                        <div style={{ flex: 1 }}>
                            <Text
                                weight={500}
                                size="sm"
                                sx={{ lineHeight: 1 }}
                                mr={3}
                            >
                                {user.nombres_completos}
                            </Text>
                        </div>
                        <IconChevronDown size={rem(14)} stroke={1.8} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                {user.role === "Administrador" ? (
                    <>
                        <Menu.Label>Administración</Menu.Label>
                        <Menu.Item
                            onClick={navigateForUsers}
                            icon={<IconUsersPlus size="1rem" stroke={1.8} />}
                        >
                            Administrar usuarios
                        </Menu.Item>

                        <Menu.Divider />
                    </>
                ) : null}
                <Menu.Label>Configuración</Menu.Label>
                <Menu.Item
                    onClick={changePassword}
                    icon={<IconSettings size="1rem" stroke={1.8} />}
                >
                    Cambiar contraseña
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Desconectarse</Menu.Label>
                <Menu.Item
                    onClick={startLogout}
                    icon={
                        <IconLogout
                            size="1rem"
                            stroke={1.8}
                            color={theme.colors.red[6]}
                        />
                    }
                >
                    Salir
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
