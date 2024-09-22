import { Button } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons-react";

export const BtnAdd = ({ title, handleAdd }) => {
    return (
        <Button
            color="indigo.7"
            onClick={(e) => handleAdd(e)}
            variant="light"
            leftIcon={<IconPencilPlus />}
        >
            {title}
        </Button>
    );
};
