import { useCallback, useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useCoordinadorStore, useUiCoordinador } from "../../../hooks";
import { ActionsTable, BtnAdd, SectionImport } from "../../../components";
import { Group } from "@mantine/core";

export const TableCoordinadores = ({ viewBtn = 1 }) => {
    const { modalActionCoordinador, modalActionImportCoord } = useUiCoordinador();
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
                filterVariant: "autocomplete",
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
                accessorKey: "parroquia",
                header: "Parroquia",
                filterVariant: "autocomplete",
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
                filterVariant: "autocomplete",
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

    const handleImportCoord = (e) => {
        e.preventDefault();
        modalActionImportCoord(1);
    };

    const table = useMantineReactTable({
        columns,
        data: coordinadores,
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
                    <BtnAdd title="Agregar Coordinador" handleAdd={handleOpen} />
                    <SectionImport handleOpen={handleImportCoord} />
                </Group>
            ) : null,
    });

    return <MantineReactTable table={table} />;
};
