/* eslint-disable react/prop-types */
import { AppShell, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { MainHeader, NavbarSegmented } from "../../layout";
import { Outlet } from "react-router-dom";

export const HomePage = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(true);

    return (
        <AppShell
            styles={{
                main: {
                    background:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            navbar={<NavbarSegmented opened={opened} role={usuario?.role} />}
            header={<MainHeader opened={opened} setOpened={setOpened} />}
        >
            <Outlet />
        </AppShell>
    );
};
