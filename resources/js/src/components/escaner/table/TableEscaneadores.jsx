import { useCallback, useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { BtnAdd, ActionsTable } from "../../../components";
import { useEscanerStore, useUiEscaner } from "../../../hooks";

export const TableEscaneadores = ({ viewBtn = 1 }) => {
    const {
        isLoading,
        escaneadores,
        startDeleteEscaner,
        setActivateEscaner,
        setClearActivateEscaner,
    } = useEscanerStore();
    const { modalActionEscaner } = useUiEscaner();

    const columns = useMemo(
        () => [
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
        ],
        [escaneadores]
    );

    const handleEdit = useCallback(
        (selected) => {
            setActivateEscaner(selected);
            modalActionEscaner(1);
        },
        [escaneadores]
    );

    const handleDelete = useCallback(
        (selected) => {
            setActivateEscaner(selected);
            startDeleteEscaner(selected);
        },
        [escaneadores]
    );

    const handleOpen = (e) => {
        e.preventDefault();
        setClearActivateEscaner();
        modalActionEscaner(1);
    };

    const table = useMantineReactTable({
        columns,
        data: escaneadores,
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
                <BtnAdd title="Agregar Escaner" handleAdd={handleOpen} />
            ) : null,
    });

    return <MantineReactTable table={table} />;
};
