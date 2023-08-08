/* eslint-disable react/prop-types */
import { Text } from "@mantine/core";

export const TitlePage = ({
    color = "dimmed",
    tt = "uppercase",
    fw,
    fz = 15,
    title,
}) => {
    return (
        <Text c={color} fz={fz} tt={tt} fw={fw}>
            {title}
        </Text>
    );
};
