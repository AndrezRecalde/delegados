import { Container, createStyles, rem } from "@mantine/core";
import { AuthForm } from "../../components";

const useStyles = createStyles(() => ({
  wrapper: {
    minHeight: rem(980),
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },
}));

export const AuthenticationPage = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Container>
        <AuthForm />
      </Container>
    </div>
  );
};
