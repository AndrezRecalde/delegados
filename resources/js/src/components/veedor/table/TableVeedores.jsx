import { useCallback, useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import {
    ActionsTable,
    ActivateVeedor,
    BtnAdd,
    SectionImport,
} from "../../../components";
import { useUiVeedor, useVeedorStore } from "../../../hooks";
import { Group } from "@mantine/core";

export const TableVeedores = ({ viewBtn = 1 }) => {
    const {
        isLoading,
        veedores,
        startDeleteVeedor,
        setActivateVeedor,
        setClearActivateVeedor,
    } = useVeedorStore();
    const {
        modalActionVeedor,
        modalActionActivateVeed,
        modalActionFileVeedor,
    } = useUiVeedor();

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
                accessorFn: (row) => row.telefono !== null ? row.telefono : "Sin Registrar",
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
                accessorKey: "recinto",
                header: "Recinto",
                wrap: true,
                filterVariant: "autocomplete",
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

    const handleImportVeed = (e) => {
        e.preventDefault();
        modalActionFileVeedor(1);
    };

    const table = useMantineReactTable({
        columns,
        data: veedores,
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
                    <BtnAdd title="Agregar Delegado" handleAdd={handleOpen} />
                    <SectionImport handleOpen={handleImportVeed} />
                </Group>
            ) : null,
    });

    return <MantineReactTable table={table} />;
};
