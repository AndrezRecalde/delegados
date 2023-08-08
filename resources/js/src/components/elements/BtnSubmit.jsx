import { Box, Button, Group } from "@mantine/core";

export const BtnSubmit = ({ icon: Icon, texto }) => {
    return (
        <Group position="center" mt="xl" mb="xl">
            <Box w={230}>
                <Button
                    fullWidth
                    variant="light"
                    leftIcon={<Icon />}
                    radius="md"
                    mt="md"
                    color="indigo.7"
                    type="submit"
                >
                    {texto}
                </Button>
            </Box>
        </Group>
    );
};
