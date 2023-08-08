import { ActionIcon } from "@mantine/core";
import { IconBan, IconDiscountCheckFilled } from "@tabler/icons-react";

export const ActivateUserButton = ({ cell, handleActivar }) => {
    return (
        <ActionIcon
            onClick={() => handleActivar(cell.row.original)}
            color={cell.row.original.activo === 1 ? "indigo.8" : "red.8"}
        >
            {cell.row.original.activo === 1 ? (
                <IconDiscountCheckFilled />
            ) : (
                <IconBan />
            )}
        </ActionIcon>
    );
};
