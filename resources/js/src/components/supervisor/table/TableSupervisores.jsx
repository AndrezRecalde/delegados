import { useCallback, useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { ActionsTable, BtnAdd } from "../../../components";
import { useSupervisorStore, useUiSupervisor } from "../../../hooks";

export const TableSupervisores = ({ viewBtn = 1 }) => {
    const {
        supervisores,
        isLoading,
        startDeleteSupervisor,
        setActivateSupervisor,
        setClearActivateSupervisor,
    } = useSupervisorStore();
    const { modalActionSupervisor } = useUiSupervisor();

    const columns = useMemo(
        () => [
            {
                accessorKey: "dni",
                header: "Cédula",
                wrap: true,
            },
            {
                accessorKey: "nombres_completos",
                header: "Supervisor",
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
                accessorFn: (row) =>
                    row.parroquias?.map(
                        (parroquias) => parroquias.nombre_parroquia + ", "
                    ),
                header: "Parroquia",
                wrap: true,
            },
        ],
        [supervisores]
    );

    const handleEdit = useCallback(
        (selected) => {
            setActivateSupervisor(selected);
            modalActionSupervisor(1);
        },
        [supervisores]
    );

    const handleDelete = useCallback(
        (selected) => {
            setActivateSupervisor(selected);
            startDeleteSupervisor(selected);
        },
        [supervisores]
    );

    const handleOpen = (e) => {
        e.preventDefault();
        setClearActivateSupervisor();
        modalActionSupervisor(1);
    };

    const table = useMantineReactTable({
        columns,
        data: supervisores,
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
                <BtnAdd title="Agregar Supervisor" handleAdd={handleOpen} />
            ) : null,
    });

    return <MantineReactTable table={table} />;
};
