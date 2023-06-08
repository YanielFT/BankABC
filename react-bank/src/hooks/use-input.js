import { useRef, useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
  valid: true,
};
const inputReducer = (state, action) => {
  if (action.type === "ON_CHANGE") {
    return {value: action.value, isTouched: state.isTouched, valid: state.valid}
} else if (action.type === "ON_BLUR") {
    if (action.valid || !state.isTouched)
      return { value: state.value, isTouched: true, valid: action.valid };
    else return { value: state.value, isTouched: true, valid: action.valid };
  }else if (action.type === "ON_EDIT") {
    if (action.value != null)
      return { value: action.value, isTouched: state.isTouched, valid: state.valid };
  }
  return initialInputState;
};
const useInput = (validateValue, isEdit) => {
  const [inputState, dispatchInput] = useReducer(
    inputReducer,
    initialInputState
  );

  const inputRef = useRef("");

  let isValid  = validateValue(inputState.value);;
  let hasError = !isValid && inputState.isTouched;
 
  if (!inputState.valid) {
    isValid = false;
    hasError = true;
  } 


  const onChange = (e) => {
    dispatchInput({ type: "ON_CHANGE", value: e.target.value, valid: e.target.validity.valid  });
  };

  const onBlur = (e) => {
    dispatchInput({ type: "ON_BLUR", valid: e.target.validity.valid });
  };

  const reset = () => {
    dispatchInput({});
  };
  
  const onEdit = (e) => {
    dispatchInput({ type: "ON_EDIT", value: e });
  };



  return {
    value: inputState.value,
    isValid,
    hasError,
    inputRef,
    onChange,
    onBlur,
    reset,
    onEdit,
  };
};

export default useInput;
