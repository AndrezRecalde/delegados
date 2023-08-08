import { Button, Group } from "@mantine/core";
import { TitlePage } from "../TitlePage";
import { IconTableImport } from "@tabler/icons-react";

export const SectionImport = ({ title, handleOpen }) => {
    return (
        <Group position="apart">
            <TitlePage title={title} fw={700} />
            <Button
                variant="light"
                color="teal.7"
                radius="md"
                uppercase
                leftIcon={<IconTableImport size="1.2rem" />}
                onClick={(e) => handleOpen(e)}
            >
                Importar
            </Button>
        </Group>
    );
};
