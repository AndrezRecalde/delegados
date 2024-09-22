import { Button, Group } from "@mantine/core";
import { IconTableImport } from "@tabler/icons-react";

export const SectionImport = ({ title, handleOpen }) => {
    return (
        <Button
            variant="light"
            color="teal.7"
            leftIcon={<IconTableImport size="1.2rem" />}
            onClick={(e) => handleOpen(e)}
        >
            Importar
        </Button>
    );
};
