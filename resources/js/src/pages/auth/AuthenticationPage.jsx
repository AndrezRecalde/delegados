import { createStyles, Paper, rem } from "@mantine/core";
import { AuthForm, Logo, TitlePage } from "../../components";

const useStyles = createStyles(() => ({
    wrapper: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundSize: "cover",
        backgroundImage:
            "url(https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2024/09/4850037-scaled.jpg)",
    },
    wrapper_paper: {
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        maxWidth: rem(450),
    },
    title: {
        marginTop: "auto",
        fontWeight: "900",
    },
}));

export const AuthenticationPage = () => {
    const { classes } = useStyles();
    return (
        <div className={classes.wrapper}>
            <TitlePage ta="center" className={classes.title}>
                Sistema de Delegación del Voto
            </TitlePage>
            <Logo />
            <Paper
                withBorder
                shadow="md"
                p={30}
                radius="md"
                className={classes.wrapper_paper}
            >
                <AuthForm />
            </Paper>
        </div>
    );
};
