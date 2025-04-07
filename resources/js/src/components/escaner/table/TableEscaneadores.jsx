import { useCallback, useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { BtnAdd, ActionsTable, SectionImport } from "../../../components";
import { useEscanerStore, useUiEscaner } from "../../../hooks";
import { Group } from "@mantine/core";

export const TableEscaneadores = ({ viewBtn = 1 }) => {
    const {
        isLoading,
        escaneadores,
        startDeleteEscaner,
        setActivateEscaner,
        setClearActivateEscaner,
    } = useEscanerStore();
    const { modalActionEscaner, modalActionImportEscaner } = useUiEscaner();

    const columns = useMemo(
        () => [
            {
                accessorKey: "dni",
                header: "Cédula",
                size: 80,
            },
            {
                accessorKey: "nombres_completos",
                header: "Delegado",
            },
            {
                accessorKey: "telefono",
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
                accessorKey: "recinto",
                header: "Recinto",
                //filterVariant: "autocomplete",
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

    const handleImportEsc = (e) => {
        e.preventDefault();
        modalActionImportEscaner(1);
    };

    const table = useMantineReactTable({
        columns,
        data: escaneadores,
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
                    <BtnAdd title="Agregar Escaner" handleAdd={handleOpen} />
                    <SectionImport handleOpen={handleImportEsc} />
                </Group>
            ) : null,
        mantineTableProps: {
            withColumnBorders: true,
            withTableBorder: true,
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
