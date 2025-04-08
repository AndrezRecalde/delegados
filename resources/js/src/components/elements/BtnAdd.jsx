import { Button, rem } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons-react";

export const BtnAdd = ({
    title,
    handleAdd,
    heigh = 40,
    fontSize = 14,
    IconSection = IconPencilPlus,
}) => {
    return (
        <Button
            color="indigo.7"
            onClick={(e) => handleAdd(e)}
            variant="light"
            leftIcon={<IconSection />}
            styles={{
                root: {
                    "--button-height": rem(heigh),
                },
                inner: {
                    fontSize: fontSize,
                },
            }}
        >
            {title}
        </Button>
    );
};
