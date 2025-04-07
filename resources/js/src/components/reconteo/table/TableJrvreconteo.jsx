import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useCallback, useMemo } from "react";
import { ActionsTable, BtnAdd } from "../../../components";
import { useReconteoStore, useUiReconteo } from "../../../hooks";

export const TableJrvreconteo = () => {
    const {
        isLoading,
        reconteos,
        startDeleteJrvReconteo,
        setActivateJrvReconteo,
        setClearActivateJrvReconteo,
    } = useReconteoStore();
    const { modalActionReconteo } = useUiReconteo();

    const columns = useMemo(
        () => [
            {
                accessorKey: "dni",
                header: "Cédula",
            },
            {
                accessorFn: (row) => row.nombres + row.apellidos,
                header: "JRV Móvil",
            },
        ],
        [reconteos]
    );

    const handleEdit = useCallback(
        (selected) => {
            setActivateJrvReconteo(selected);
            modalActionReconteo(1);
        },
        [reconteos]
    );

    const handleDelete = useCallback(
        (selected) => {
            setActivateJrvReconteo(selected);
            startDeleteJrvReconteo(selected);
        },
        [reconteos]
    );

    const handleOpen = (e) => {
        e.preventDefault();
        setClearActivateJrvReconteo();
        modalActionReconteo(1);
    };

    const table = useMantineReactTable({
        columns,
        data: reconteos,
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
            <BtnAdd title="Agregar JRV Reconteo" handleAdd={handleOpen} />
        ),
        mantineTableProps: {
            withColumnBorders: true,
            withBorder: true,
            sx: {
                "thead > tr": {
                    backgroundColor: "inherit",
                },
                "thead > tr > th": {
                    backgroundColor: "inherit",
                },
                "tbody > tr > td": {
                    backgroundColor: "inherit",
                },
            },
        },
    });

    return <MantineReactTable table={table} />;
};
