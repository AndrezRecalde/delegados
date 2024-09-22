import {
    Box,
    Center,
    FileInput,
    Flex,
    Group,
    Stack,
    ThemeIcon,
    rem,
} from "@mantine/core";
import {
    IconCsv,
    IconDatabaseImport,
    IconFileImport,
} from "@tabler/icons-react";
import { BtnSubmit } from "../../../components";
import { useReconteoStore, useUiReconteo } from "../../../hooks";

export const FormImportJrvreconteo = ({ form }) => {
    const { startImportJrvReconteos } = useReconteoStore();
    const { modalActionImportReconteo } = useUiReconteo();

    const handleSubmit = (e) => {
        e.preventDefault();
        startImportJrvReconteos(form.values);
        form.reset();
        modalActionImportReconteo(0);
    };

    function Value({ file }) {
        return (
            <Center
                inline
                sx={(theme) => ({
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[7]
                            : theme.colors.gray[1],
                    fontSize: theme.fontSizes.xs,
                    padding: `${rem(3)} ${rem(7)}`,
                    borderRadius: theme.radius.sm,
                })}
            >
                <IconCsv size={rem(14)} style={{ marginRight: rem(5) }} />
                <span
                    style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        maxWidth: rem(200),
                        display: "inline-block",
                    }}
                >
                    {file.name}
                </span>
            </Center>
        );
    }

    const ValueComponent = ({ value }) => {
        if (Array.isArray(value)) {
            return (
                <Group spacing="sm" py="xs">
                    {value.map((file, index) => (
                        <Value file={file} key={index} />
                    ))}
                </Group>
            );
        }

        return <Value file={value} />;
    };

    return (
        <Box
            component="form"
            mx="auto"
            sx={(theme) => ({
                padding: theme.spacing.md,
            })}
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack>
                <Flex
                    mih={50}
                    gap="md"
                    justify="center"
                    align="center"
                    direction="column"
                    wrap="wrap"
                >
                    <ThemeIcon
                        variant="light"
                        radius="xl"
                        size="lg"
                        color="teal.7"
                    >
                        <IconFileImport size={30} />
                    </ThemeIcon>
                </Flex>
                <FileInput
                    mt="md"
                    label="Importar archivo"
                    description="Importar archivos de formato CSV"
                    placeholder="Importar archivo"
                    withAsterisk
                    accept="text/csv"
                    valueComponent={ValueComponent}
                    {...form.getInputProps("reconteos_import")}
                />
                <BtnSubmit IconSection={IconDatabaseImport}>
                    Importar datos
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
