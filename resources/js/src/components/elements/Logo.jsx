import { Image } from "@mantine/core";
import logo from '../../assets/images/logo.png'

export const Logo = ({ maw = 80 }) => {
    return (
        <Image
            maw={maw}
            mx="auto"
            mt="md"
            mb="md"
            radius="xs"
            src={logo}
            alt="logo"
        />
    );
};
