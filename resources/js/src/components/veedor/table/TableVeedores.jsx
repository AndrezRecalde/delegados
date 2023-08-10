import { useCallback, useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { ActionsTable, ActivateVeedor, BtnAdd } from "../../../components";
import { useUiVeedor, useVeedorStore } from "../../../hooks";

export const TableVeedores = ({ viewBtn = 1 }) => {
    const {
        isLoading,
        veedores,
        startDeleteVeedor,
        setActivateVeedor,
        setClearActivateVeedor,
    } = useVeedorStore();
    const { modalActionVeedor, modalActionActivateVeed } = useUiVeedor();

    const columns = useMemo(
        () => [
            {
                accessorKey: "confirmado",
                header: viewBtn === 1 ? "¿Confirmado?" : null,
                enableColumnOrdering: false,
                enableEditing: false,
                enableSorting: false,
                /* enableColumnFilter: false, */
                size: 40,
                Cell: ({ cell }) =>
                    viewBtn === 1 ? (
                        <ActivateVeedor
                            cell={cell}
                            handleActivar={handleActivar}
                        />
                    ) : null,
            },
            {
                accessorKey: "dni",
                header: "Cédula",
                wrap: true,
            },
            {
                accessorKey: "nombres_completos",
                header: "Delegado",
                wrap: true,
            },
            {
                accessorKey: "telefono",
                header: "Teléfono",
                wrap: true,
            },
            {
                accessorKey: "canton",
                header: "Cantón",
                wrap: true,
            },
            {
                accessorKey: "recinto",
                header: "Recinto",
                wrap: true,
            },
            {
                accessorFn: (row) =>
                    row.junta !== null ? row.junta : "Sin registrar",
                header: "Junta",
                wrap: true,
            },
        ],
        [veedores]
    );

    const handleActivar = useCallback(
        (selected) => {
            setActivateVeedor(selected);
            modalActionActivateVeed(1);
        },
        [veedores]
    );

    const handleEdit = useCallback(
        (selected) => {
            setActivateVeedor(selected);
            modalActionVeedor(1);
        },
        [veedores]
    );

    const handleDelete = useCallback(
        (selected) => {
            setActivateVeedor(selected);
            startDeleteVeedor(selected);
        },
        [veedores]
    );

    const handleOpen = (e) => {
        e.preventDefault();
        setClearActivateVeedor();
        modalActionVeedor(1);
    };

    const table = useMantineReactTable({
        columns,
        data: veedores,
        enableColumnOrdering: true,
        enableRowActions: true,
        positionActionsColumn: viewBtn === 1 ? "last" : null,
        state: { showProgressBars: isLoading },
        renderRowActionMenuItems: ({ row }) =>
            viewBtn === 1 ? (
                <ActionsTable
                    row={row}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ) : null,
        renderTopToolbarCustomActions: () =>
            viewBtn === 1 ? (
                <BtnAdd title="Agregar Veedor" handleAdd={handleOpen} />
            ) : null,
    });

    return <MantineReactTable table={table} />;
};
