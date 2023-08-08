import { useCallback, useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useCoordinadorStore, useUiCoordinador } from "../../../hooks";
import { ActionsTable, BtnAdd } from "../../../components";

export const TableCoordinadores = ({ viewBtn = 1 }) => {
    const { modalActionCoordinador } = useUiCoordinador();
    const {
        coordinadores,
        isLoading,
        startDeleteCoordinador,
        setActivateCoordinador,
        setClearActivateCoordinador,
    } = useCoordinadorStore();

    const columns = useMemo(
        () => [
            {
                accessorKey: "dni",
                header: "Cédula",
                wrap: true,
            },
            {
                accessorKey: "nombres_completos",
                header: "Coordinador",
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
                accessorKey: "parroquia",
                header: "Parroquia",
                wrap: true,
            },
            {
                accessorFn: (row) =>
                    row.recintos?.map(
                        (recinto) => recinto.nombre_recinto + ", "
                    ),
                header: "Recinto(s)",
                wrap: true,
            },
            {
                accessorKey: "supervisor",
                header: "Supervisor",
                wrap: true,
            },
        ],
        [coordinadores]
    );

    const handleEdit = useCallback(
        (selected) => {
            setActivateCoordinador(selected);
            modalActionCoordinador(1);
        },
        [coordinadores]
    );

    const handleDelete = useCallback(
        (selected) => {
            setActivateCoordinador(selected);
            startDeleteCoordinador(selected);
        },
        [coordinadores]
    );

    const handleOpen = (e) => {
        e.preventDefault();
        setClearActivateCoordinador();
        modalActionCoordinador(1);
    };

    const table = useMantineReactTable({
        columns,
        data: coordinadores,
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
                <BtnAdd title="Agregar Coordinador" handleAdd={handleOpen} />
            ) : null,
    });

    return <MantineReactTable table={table} />;
};
