/* eslint-disable react/prop-types */
import {
    createStyles,
    Header,
    Group,
    Burger,
    rem,
    MediaQuery,
    useMantineTheme,
    ActionIcon,
    useMantineColorScheme,
  } from "@mantine/core";
  import { IconMoonStars, IconSunHigh } from "@tabler/icons-react";
import { User } from "../../../layout";
import logo  from "../../../assets/images/logoveed.png";



  const useStyles = createStyles((theme) => ({
    header: {
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
    },

    inner: {
      height: rem(56),
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    links: {
      [theme.fn.smallerThan("md")]: {
        display: "none",
      },
    },

    search: {
      [theme.fn.smallerThan("xs")]: {
        display: "none",
      },
    },

    link: {
      display: "block",
      lineHeight: 1,
      padding: `${rem(8)} ${rem(12)}`,
      borderRadius: theme.radius.sm,
      textDecoration: "none",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.gray[7],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      },
    },
  }));

  export const MainHeader = ({opened, setOpened}) => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const { classes } = useStyles();
    const theme = useMantineTheme();

    return (
      <Header height={62} className={classes.header} mb={120}>
        <div className={classes.inner}>
          <Group>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            {/* <Logo colorScheme={colorScheme}  size={28} /> */}
            {/* <Image maw={170} mx="auto" radius="md" src={logo} alt="Random image" /> */}
          </Group>

          <Group>
            <ActionIcon variant="light" radius="xl" size="lg" color="dark" onClick={() => toggleColorScheme()}>
                {colorScheme === 'dark' ? <IconSunHigh stroke={1.9} size="1.3rem" /> : <IconMoonStars stroke={1.9} size="1.3rem" />}
            </ActionIcon>
            <User />

          </Group>
        </div>
      </Header>
    );
  }
