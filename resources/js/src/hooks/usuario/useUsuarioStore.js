import { useDispatch, useSelector } from "react-redux";
import {
    //onAddUsuario,
    onClearUsuarios,
    onDeleteUsuario,
    onLoadErrores,
    onLoading,
    onLoadMessage,
    onSetActivateUsuario,
    //onUpdateUsuario,
    onUsuarios,
} from "../../store/app/usuario/usuarioSlice";
import { useErrorException } from "../../hooks";
import eleccionApi from "../../api/eleccionApi";

export const useUsuarioStore = () => {
    const { isLoading, usuarios, activeUsuario, message, errores } = useSelector(
        (state) => state.usuario
    );

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadUsuarios = async () => {
        dispatch(onLoading(true));
        try {
            const { data } = await eleccionApi.get("/usuarios/listar");
            const { usuarios } = data;
            dispatch(onUsuarios(usuarios));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddUsuario = async (usuario) => {
        try {
            if (usuario.id) {
                const { data } = await eleccionApi.put(
                    `/usuario/update/${usuario.id}`,
                    usuario
                );
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                startLoadUsuarios();
                return;
            }

            const { data } = await eleccionApi.post("/usuario/create", usuario);
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadUsuarios();
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startUpdateActivo = async (usuario) => {
        try {
            const { data } = await eleccionApi.put(
                `/usuario/update/activo/${usuario.id}`,
                usuario
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadUsuarios();
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const setActivateUsuario = (usuario) => {
        dispatch(onSetActivateUsuario(usuario));
    };

    const startDeleteUsuario = async (usuario) => {
        try {
            const { data } = await eleccionApi.delete(
                `/usuario/delete/${usuario.id}`
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            dispatch(onDeleteUsuario());
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startUpdatePassword = async (usuario, password) => {
        try {
            const { data } = await eleccionApi.put(
                `/usuario/update/password/${usuario.id}`,
                { password }
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startClearUsuarios = () => {
        dispatch(onClearUsuarios());
    };

    const setClearActivateUsuario = () => {
        dispatch(onSetActivateUsuario(null));
    };

    return {
        isLoading,
        usuarios,
        activeUsuario,
        message,
        errores,

        startLoadUsuarios,
        startAddUsuario,
        startUpdateActivo,
        setActivateUsuario,
        startDeleteUsuario,
        startUpdatePassword,
        startClearUsuarios,
        setClearActivateUsuario,
    };
};
