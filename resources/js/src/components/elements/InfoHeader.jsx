import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export const InfoHeader = ({ texto }) => {
    return (
        <Alert
            icon={<IconAlertCircle size="2rem" />}
            title="Informacion!"
            color="indigo.7"
            mb={15}
            mt={15}
            radius="md"
        >
            {texto}
        </Alert>
    );
};
