import { useCallback, useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { ActionsTable, BtnAdd, SectionImport } from "../../../components";
import { useSupervisorStore, useUiSupervisor } from "../../../hooks";
import { Group } from "@mantine/core";

export const TableSupervisores = ({ viewBtn = 1 }) => {
    const {
        supervisores,
        isLoading,
        startDeleteSupervisor,
        setActivateSupervisor,
        setClearActivateSupervisor,
    } = useSupervisorStore();
    const { modalActionSupervisor, modalActionImportSuper } = useUiSupervisor();

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
                filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) =>
                    row.parroquias?.map(
                        (parroquias) => parroquias.nombre_parroquia + ", "
                    ),
                header: "Parroquia",
                wrap: true,
                //filterVariant: "autocomplete",
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

    const handleImportSuperv = (e) => {
        e.preventDefault();
        modalActionImportSuper(1);
    };

    const table = useMantineReactTable({
        columns,
        data: supervisores,
        enableFacetedValues: true,
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
                <Group>
                    <BtnAdd title="Agregar Supervisor" handleAdd={handleOpen} />
                    <SectionImport handleOpen={handleImportSuperv} />
                </Group>
            ) : null,
    });

    return <MantineReactTable table={table} />;
};
