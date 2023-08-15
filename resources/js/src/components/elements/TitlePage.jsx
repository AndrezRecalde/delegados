/* eslint-disable react/prop-types */
import { Text } from "@mantine/core";

export const TitlePage = ({
    color = "dimmed",
    tt = "uppercase",
    ta = "left",
    fw,
    fz = 15,
    title,
}) => {
    return (
        <Text c={color} fz={fz} tt={tt} ta={ta} fw={fw}>
            {title}
        </Text>
    );
};
