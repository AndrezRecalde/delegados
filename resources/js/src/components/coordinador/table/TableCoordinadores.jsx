import { useCallback, useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useCoordinadorStore, useUiCoordinador } from "../../../hooks";
import { ActionsTable, BtnAdd, SectionImport } from "../../../components";
import { Group } from "@mantine/core";

export const TableCoordinadores = ({ viewBtn = 1 }) => {
    const { modalActionCoordinador, modalActionImportCoord } =
        useUiCoordinador();
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
                size: 80,
            },
            {
                accessorFn: (row) => row.nombres_coordinador + " " + row.apellidos_coordinador,
                header: "Coordinador",
                filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) => row?.telefono || "No registra...",
                header: "Teléfono",
                size: 80,
            },
            {
                accessorKey: "canton",
                header: "Cantón",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "parroquia",
                header: "Parroquia",
                filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) =>
                    row.recintos?.map(
                        (recinto) => recinto.nombre_recinto + ", "
                    ),
                header: "Recinto(s)",
            },
            {
                accessorFn: (row) => row.nombres_supervisor + row.apellidos_supervisor,
                header: "Supervisor",
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
                    <BtnAdd
                        title="Agregar Coordinador"
                        handleAdd={handleOpen}
                    />
                    <SectionImport handleOpen={handleImportCoord} />
                </Group>
            ) : null,
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
