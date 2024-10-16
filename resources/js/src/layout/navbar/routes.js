import {
    IconChartDonutFilled,
    IconEyeDown,
    IconEyePin,
    IconEyeShare,
    IconListCheck,
    IconListDetails,
    IconScan,
} from "@tabler/icons-react";
import { ROLES } from "../../helpers";

export const routes = [
    {
        label: "Dashboard",
        icon: IconChartDonutFilled,
        initiallyOpened: true,
        links: [
            { label: "Dashboard", link: "/gerencia/dashboard" },
            { label: "Ver resúmen", link: "/gerencia/dashboard/summary" },
        ],
        role: ROLES.ADMIN,
    },
    {
        label: "Supervisores",
        icon: IconListCheck,
        initiallyOpened: true,
        links: [
            { label: "Ver supervisores", link: "/gerencia/supervisores" },
            {
                label: "Exportar supervisores",
                link: "/gerencia/export/supervisores",
            },
        ],
        role: ROLES.ADMIN,
    },
    {
        label: "Coordinadores",
        icon: IconListDetails,
        initiallyOpened: true,
        links: [
            { label: "Ver coordinadores", link: "/gerencia/coordinadores" },
            {
                label: "Exportar coordinadores",
                link: "/gerencia/export/coordinadores",
            },
        ],
        role: ROLES.ADMIN,
    },
    {
        label: "Delegados",
        icon: IconEyeShare,
        initiallyOpened: true,
        links: [
            { label: "Ver delegados", link: "/gerencia/jrv/delegados" },
            { label: "Exportar delegados", link: "/gerencia/export/delegados" },
        ],
        role: ROLES.ADMIN,
    },
    {
        label: "JRV Móviles",
        icon: IconEyePin,
        initiallyOpened: true,
        links: [{ label: "Ver JRV Móviles", link: "/gerencia/jrv/moviles" }],
        role: ROLES.ADMIN,
    },
    {
        label: "JRV Reconteo",
        icon: IconEyeDown,
        initiallyOpened: false,
        links: [{ label: "Ver JRV Reconteo", link: "/gerencia/jrv/reconteos" }],
        role: ROLES.ADMIN,
    },
    {
        label: "Escaneadores",
        icon: IconScan,
        initiallyOpened: true,
        links: [
            { label: "Ver Escaneadores", link: "/gerencia/escaneadores" },
            {
                label: "Exportar escaneadores",
                link: "/gerencia/export/escaneadores",
            },
        ],
        role: ROLES.ADMIN,
    },
    {
        label: "Perfil (C)",
        icon: IconEyeShare,
        initiallyOpened: true,
        links: [
            { label: "Ver Perfil", link: "/space/profile" },
        ],
        role: ROLES.COORDINADOR,
    },

    {
        label: "Delegados (C)",
        icon: IconEyeShare,
        initiallyOpened: true,
        links: [
            { label: "Ver delegados", link: "/coordinador/jrv/delegados" },
            { label: "Exportar delegados", link: "/coordinador/export/delegados" },
        ],
        role: ROLES.COORDINADOR,
    },

    {
        label: "Perfil (S)",
        icon: IconEyeShare,
        initiallyOpened: true,
        links: [
            { label: "Ver Perfil", link: "/space/profile" },
        ],
        role: ROLES.SUPERVISOR,
    },

    {
        label: "Delegados (S)",
        icon: IconEyeShare,
        initiallyOpened: true,
        links: [
            { label: "Ver delegados", link: "/supervisor/jrv/delegados" },
            { label: "Exportar delegados", link: "/supervisor/export/delegados" },
        ],
        role: ROLES.SUPERVISOR,
    },
];
