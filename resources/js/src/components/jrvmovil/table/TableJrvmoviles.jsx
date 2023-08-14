import { useCallback, useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useJrvmovilStore, useUiJrvmovil } from "../../../hooks";
import { ActionsTable, BtnAdd } from "../../../components";

export const TableJrvmoviles = () => {
    const {
        isLoading,
        jrvmoviles,
        startDeleteJrvmovil,
        setActivateJrvmovil,
        setClearActivateJrvmovil,
    } = useJrvmovilStore();
    const { modalActionJrvmovil } = useUiJrvmovil();

    const columns = useMemo(
        () => [
            {
                accessorKey: "dni",
                header: "Cédula",
                wrap: true,
            },
            {
                accessorKey: "nombres_completos",
                header: "JRV Móvil",
                wrap: true,
            },
        ],
        [jrvmoviles]
    );

    const handleEdit = useCallback(
        (selected) => {
            setActivateJrvmovil(selected);
            modalActionJrvmovil(1);
        },
        [jrvmoviles]
    );

    const handleDelete = useCallback(
        (selected) => {
            setActivateJrvmovil(selected);
            startDeleteJrvmovil(selected);
        },
        [jrvmoviles]
    );

    const handleOpen = (e) => {
        e.preventDefault();
        setClearActivateJrvmovil();
        modalActionJrvmovil(1);
    };

    const table = useMantineReactTable({
        columns,
        data: jrvmoviles,
        enableColumnOrdering: true,
        enableRowActions: true,
        positionActionsColumn: "last",
        state: { showProgressBars: isLoading },
        renderRowActionMenuItems: ({ row }) => (
            <ActionsTable
                row={row}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        ),

        renderTopToolbarCustomActions: () => (
            <BtnAdd title="Agregar JRV Móvil" handleAdd={handleOpen} />
        ),
    });

    return <MantineReactTable table={table} />;
};
