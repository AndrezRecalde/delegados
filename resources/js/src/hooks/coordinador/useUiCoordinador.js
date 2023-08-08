import { useDispatch, useSelector } from "react-redux";
import {
  onCloseModalCoordinador,
  onCloseModalImportCoord,
  onOpenModalCoordinador,
  onOpenModalImportCoord,
} from "../../store/app/coordinador/uiCoordinadorSlice";

export const useUiCoordinador = () => {
  const { isOpenModalCoordinador, isOpenModalImportCoord } = useSelector(
    (state) => state.uiCoordinador
  );

  const dispatch = useDispatch();

  const modalActionCoordinador = (behavior) => {
    if (behavior === 1) {
      dispatch(onOpenModalCoordinador());
    } else {
      dispatch(onCloseModalCoordinador());
    }
  };

  const modalActionImportCoord = (behavior) => {
    if(behavior === 1) {
        dispatch(onOpenModalImportCoord());
    } else {
        dispatch(onCloseModalImportCoord());
    }
  }

  return {
    isOpenModalCoordinador,
    isOpenModalImportCoord,

    modalActionCoordinador,
    modalActionImportCoord
  };
};
