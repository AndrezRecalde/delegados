import { useDispatch, useSelector } from "react-redux";
import {
    onAddUsuario,
    onClearUsuarios,
    onDeleteUsuario,
    onLoading,
    onSetActivateUsuario,
    onUpdateUsuario,
    onUsuarios,
} from "../../store/app/usuario/usuarioSlice";
import Swal from "sweetalert2";
import eleccionApi from "../../api/eleccionApi";

export const useUsuarioStore = () => {
    const { isLoading, usuarios, activeUsuario, errores } = useSelector(
        (state) => state.usuario
    );

    const dispatch = useDispatch();

    const startLoadUsuarios = async () => {
        dispatch(onLoading());
        try {
            const { data } = await eleccionApi.get("/usuarios/listar");
            const { usuarios } = data;
            dispatch(onUsuarios(usuarios));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.msg
                    ? error.response.data.errores
                    : Object.values(error.response.data.errores),
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startAddUsuario = async (usuario) => {
        try {
            if (usuario.id) {
                const { data } = await eleccionApi.put(
                    `/usuario/update/${usuario.id}`,
                    usuario
                );
                dispatch(onUpdateUsuario({ ...usuario }));
                Swal.fire({
                    icon: "success",
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1000,
                });
                startLoadUsuarios();
                return;
            }

            const { data } = await eleccionApi.post("/usuario/create", usuario);
            dispatch(onAddUsuario({ ...usuario }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1000,
            });
            startLoadUsuarios();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.msg
                    ? error.response.data.errores
                    : Object.values(error.response.data.errores),
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startUpdateActivo = async (usuario) => {
        try {
            const { data } = await eleccionApi.put(
                `/usuario/update/activo/${usuario.id}`,
                usuario
            );
            dispatch(onUpdateUsuario({ ...usuario }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1000,
            });
            startLoadUsuarios();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.msg
                    ? error.response.data.errores
                    : Object.values(error.response.data.errores),
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const setActivateUsuario = (usuario) => {
        dispatch(onSetActivateUsuario(usuario));
    };

    const startDeleteUsuario = async (usuario) => {
        Swal.fire({
            icon: "info",
            text: `Estas seguro de eliminar ${usuario.nombres_completos}?`,
            showDenyButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Si",
            denyButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await eleccionApi.delete(`/usuario/delete/${usuario.id}`);
                    Swal.fire("¡Eliminado!", "", "success");
                    dispatch(onDeleteUsuario(usuario));
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.response.data.msg
                            ? error.response.data.msg
                            : error.response.data.msg
                            ? error.response.data.errores
                            : Object.values(error.response.data.errores),
                        confirmButtonColor: "#c81d11",
                    });
                }
            }
        });
    };

    const startUpdatePassword = async (usuario, password) => {
        Swal.fire({
            icon: "warning",
            title: `¿Estas seguro de cambiar la contraseña?`,
            showDenyButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Si",
            denyButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await eleccionApi.put(
                        `/usuario/update/password/${usuario.id}`,
                        { password }
                    );
                    Swal.fire({
                        icon: "success",
                        title: data.msg,
                        showConfirmButton: false,
                        timer: 1000,
                    });
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.response.data.msg
                            ? error.response.data.msg
                            : error.response.data.msg
                            ? error.response.data.errores
                            : Object.values(error.response.data.errores),
                        confirmButtonColor: "#c81d11",
                    });
                }
            }
        });
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
