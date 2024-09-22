import { useCallback, useMemo } from "react";
import { Badge, useMantineTheme } from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { ActionsTable, ActivateUserButton, BtnAdd } from "../../../components";
import { useUiUsuario, useUsuarioStore } from "../../../hooks";
import Swal from "sweetalert2";

export const TableUsuarios = () => {
    const theme = useMantineTheme();
    const { modalActionUsuario, modalActivateUsuario } = useUiUsuario();
    const {
        isLoading,
        usuarios,
        setActivateUsuario,
        startDeleteUsuario,
        setClearActivateUsuario,
    } = useUsuarioStore();

    const columns = useMemo(
        () => [
            {
                accessorKey: "activo",
                header: "Activo",
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                enableColumnFilter: false,
                size: 40,
                Cell: ({ cell }) => (
                    <ActivateUserButton
                        cell={cell}
                        handleActivar={handleActivar}
                    />
                ),
            },
            {
                accessorKey: "dni",
                header: "Cédula",
                wrap: true,
            },
            {
                accessorKey: "nombres_completos",
                header: "Nombres",
                wrap: true,
            },
            {
                accessorKey: "roles",
                header: "Role",
                wrap: true,
                Cell: ({ cell }) =>
                    cell.row.original.roles.map((role, i) => (
                        <Badge
                            key={i}
                            mr={5}
                            mb={5}
                            radius="sm"
                            color="indigo.7"
                            variant={
                                theme.colorScheme === "dark"
                                    ? "light"
                                    : "outline"
                            }
                        >
                            {role.name}
                        </Badge>
                    )),
            },
        ],
        [usuarios, theme]
    );

    const handleActivar = useCallback(
        (selected) => {
            setActivateUsuario(selected);
            modalActivateUsuario(1);
        },
        [usuarios]
    );

    const handleEdit = useCallback(
        (selected) => {
            setActivateUsuario(selected);
            modalActionUsuario(1);
        },
        [usuarios]
    );

    const handleDelete = useCallback(
        (selected) => {
            setActivateUsuario(selected);
            Swal.fire({
                icon: "warning",
                title: "Estas seguro de eliminar?",
                showDenyButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Si",
                denyButtonText: "No",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    startDeleteUsuario(selected);
                    Swal.fire("¡Eliminado!", "", "success");
                }
            });
        },
        [usuarios]
    );

    const handleOpen = (e) => {
        e.preventDefault();
        setClearActivateUsuario();
        modalActionUsuario(1);
    };

    const table = useMantineReactTable({
        columns,
        data: usuarios,
        enableColumnOrdering: true,
        enableRowActions: true,
        positionActionsColumn: "last",
        rowNumberMode: "original",
        state: { showProgressBars: isLoading },
        renderRowActionMenuItems: ({ row }) => (
            <ActionsTable
                row={row}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        ),
        renderTopToolbarCustomActions: () => (
            <BtnAdd title="Agregar Usuario" handleAdd={handleOpen} />
        ),
    });

    return <MantineReactTable table={table} />;
};
