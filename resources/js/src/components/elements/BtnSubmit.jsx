import { Button, rem } from "@mantine/core";

export const BtnSubmit = ({
    children,
    fullwidth = true,
    heigh = 45,
    fontSize = 18,
    IconSection,
    loading = false,
    disabled = false
}) => {
    return (
        <Button
            color="indigo.5"
            type="submit"
            fullWidth={fullwidth}
            mt="md"
            mb="md"
            rightIcon={<IconSection />}
            disabled={disabled}
            loading={loading}
            loaderProps={{ type: "dots" }}
            styles={(theme) => ({
                root: {
                    height: rem(heigh),
                },
                inner: {
                    fontSize: fontSize,
                },
            })
        }
        >
            {children}
        </Button>
    );
};
