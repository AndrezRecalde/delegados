import { Button, Group } from "@mantine/core";
import { TitlePage } from "../TitlePage";
import { IconCards, IconFileDownload, IconFileTypePdf } from "@tabler/icons-react";

export const SectionExport = ({ title, handleExportCrendencial, handleExportPDF, handleExportExcel }) => {
    return (
        <Group position="apart">
            <TitlePage title={title} fw={700} />
            <Group>
                <Button
                    variant="light"
                    color="teal.7"
                    radius="md"
                    uppercase
                    leftIcon={<IconFileDownload size="1.2rem" />}
                    onClick={(e) => handleExportExcel(e)}
                >
                    Excel
                </Button>
                <Button
                    variant="light"
                    color="red.7"
                    radius="md"

                    leftIcon={<IconFileTypePdf size="1.2rem" />}
                    onClick={(e) => handleExportPDF(e)}
                >
                    PDF
                </Button>
                <Button
                    variant="light"
                    color="indigo.7"
                    radius="md"
                    uppercase
                    leftIcon={<IconCards size="1.2rem" />}
                    onClick={(e) => handleExportCrendencial(e)}
                >
                    Credenciales
                </Button>
            </Group>
        </Group>
    );
};
