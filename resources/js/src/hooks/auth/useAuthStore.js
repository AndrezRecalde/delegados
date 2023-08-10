import { useDispatch, useSelector } from "react-redux";
import {
  clearErrores,
  onAuthenticate,
  onLoading,
  onLogout,
  onProfile,
} from "../../store/auth/authSlice";
import eleccionApi from "../../api/eleccionApi";
import Swal from "sweetalert2";

export const useAuthStore = () => {
  const { isLoading, isLogin, user, profile, errores } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const startLogin = async ({ dni, password }) => {
    dispatch(onLoading());
    try {
      const { data } = await eleccionApi.post("/auth/login", { dni, password });
      const { user, access_token } = data;
      localStorage.setItem("token", access_token);
      localStorage.setItem("token_init_date", new Date().getTime());
      dispatch(onAuthenticate(user));
    } catch (error) {
      //console.log(error);
      dispatch(onLogout(error.response.data.msg));
      setTimeout(() => {
        dispatch(clearErrores());
      }, 10);
    }
  };

  const startProfile = async () => {
    dispatch(onLoading());
    try {
      const { data } = await eleccionApi.post("/profile");
      const { profile } = data;
      dispatch(onProfile(profile));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response ? error.response.data.msg : error,
        confirmButtonColor: "#c81d11",
      });
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await eleccionApi.get("/refresh");
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("token_init_date", new Date().getTime());
      dispatch(onAuthenticate(data.user));
    } catch (error) {
      //console.log(error)
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    isLoading,
    isLogin,
    user,
    profile,
    errores,

    startLogin,
    startProfile,
    checkAuthToken,
    startLogout,
  };
};
