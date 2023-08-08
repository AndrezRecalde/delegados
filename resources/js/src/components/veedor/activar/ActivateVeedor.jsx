import { ActionIcon } from "@mantine/core";
import { IconAlertCircleFilled, IconDiscountCheckFilled } from "@tabler/icons-react";

export const ActivateVeedor = ({ cell, handleActivar }) => {

    const handleActivate = (e) => {
        e.preventDefault();
        handleActivar(cell.row.original);
    };

    return (
        <ActionIcon
            radius="xl"
            onClick={(e) => handleActivate(e)}
            color={cell.row.original.confirmado === 1 ? "indigo.8" : "orange.5"}
        >
            {cell.row.original.confirmado === 1 ? (
                <IconDiscountCheckFilled />
            ) : (
                <IconAlertCircleFilled />
            )}
        </ActionIcon>
    );
};
