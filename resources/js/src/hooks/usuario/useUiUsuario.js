import { useDispatch, useSelector } from "react-redux";
import {
  onCloseModalActivateUser,
  onCloseModalUser,
  onOpenModalActivateUser,
  onOpenModalUser,
} from "../../store/app/usuario/uiUsuarioSlice";

export const useUiUsuario = () => {
  const { isOpenModalUser, isOpenModalActivateUser } = useSelector(
    (state) => state.uiUsuario
  );

  const dispatch = useDispatch();

  const modalActionUsuario = (behavior) => {
    if (behavior === 1) {
      dispatch(onOpenModalUser());
    } else {
      dispatch(onCloseModalUser());
    }
  };

  const modalActivateUsuario = (behavior) => {
    if (behavior === 1) {
      dispatch(onOpenModalActivateUser());
    } else {
      dispatch(onCloseModalActivateUser());
    }
  };

  return {
    isOpenModalUser,
    isOpenModalActivateUser,

    modalActionUsuario,
    modalActivateUsuario
  };
};
