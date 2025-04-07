import { useCallback, useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import {
    ActionsTable,
    ActivateVeedor,
    BtnAdd,
    SectionImport,
} from "../../../components";
import { useUiVeedor, useVeedorStore } from "../../../hooks";
import { Group, Table } from "@mantine/core";

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
                /* enableColumnFilter: false, */
                size: 80,
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
                size: 80,
            },
            {
                accessorFn: (row) =>
                    row.nombres_veedor + " " + row.apellidos_veedor,
                header: "Delegado",
            },
            {
                accessorFn: (row) => row.telefono || "No registra...",
                header: "Teléfono",
                size: 80,
            },
            {
                accessorKey: "canton",
                header: "Cantón",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "recinto",
                header: "Recinto",
                filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) =>
                    row.junta !== null ? row.junta : "Sin registrar",
                header: "Junta",
                size: 80,
            },
            {
                accessorFn: (row) =>
                    row.nombres_coordinador + " " + row.apellidos_coordinador,
                header: "Coordinador",
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
        //enableFacetedValues: true,
        enableSorting: false,
        enableColumnOrdering: false,
        enableRowActions: true,
        positionActionsColumn: viewBtn === 1 ? "last" : null,
        state: { showProgressBars: isLoading },
        renderDetailPanel: ({ row }) => (
            <Table horizontalSpacing="lg" withBorder withColumnBorders>
                <thead>
                    <tr>
                        <th>Usuario que ingresó</th>
                        <th>Usuario que actualizó</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {row.original.usuario_created || "No registra..."}
                        </td>
                        <td>
                            {row.original.usuario_updated || "No registra..."}
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        ),
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
