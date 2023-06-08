import { useEffect } from "react";
import useInput from "../../hooks/use-input";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./ContactForm.module.css";

const ContactForm = (props) => {

  const {
    value: firstNameValue,
    isValid: isNameValid,
    hasError: hasNameError,
    onBlur: firstNameBlurHandler,
    onChange: firstNameChangeHandler,
    inputRef: firstNameRef,
    reset: resetFirtstName,
    onEdit: onEditFirtstName
  } = useInput((value) => value.trim() !== "");

  const {
    value: photoValue,
    isValid: photoValid,
    hasError: hasPhotoError,
    onBlur: photoBlurHandler,
    onChange: photoChangeHandler,
    inputRef: photoRef,
    reset: resetPhoto,
    onEdit: onEditPhoto
  } = useInput((value) => value.trim() !== "");
  

  const {
    value: lastNameValue,
    isValid: isLastNameValid,
    hasError: hasLastNameError,
    onBlur: lastNameBlurHandler,
    onChange: lastNameChangeHandler,
    inputRef: lastNameRef,
    reset: resetLastName,
    onEdit: onEditLastName
  } = useInput((value) => value.trim() !== "");

  const {
    value: birthValue,
    isValid: isBirthValid,
    hasError: hasBirthError,
    onBlur: birthBlurHandler,
    onChange: birthChangeHandler,
    inputRef: birthRef,
    reset: resetBirth,
    onEdit: onEditBirthday
  } = useInput((value) => value.trim() !== "");

  const {
    value: addressValue,
    isValid: isAddressValid,
    hasError: hasAddressError,
    onBlur: addressBlurHandler,
    onChange: addressChangeHandler,
    inputRef: addressRef,
    reset: resetAddress,
    onEdit: onEditAddress
  } = useInput((value) => value.trim() !== "");

  const {
    value: phoneValue,
    isValid: isPhoneValid,
    hasError: hasPhoneError,
    onBlur: phoneBlurHandler,
    onChange: phoneChangeHandler,
    inputRef: phoneRef,
    reset: resetPhone,
    onEdit: onEditPhone
  } = useInput((value) => value.trim() !== "");


  function submitFormHandler(event) {
    event.preventDefault();

    props.onAddContact(
      {
        firstName: firstNameValue,
        lastName: lastNameValue,
        address: addressValue,
        phone: phoneValue,
        photo: photoValue,
        birthday: birthValue
      }
      ,props.contact.id
    )
    
  }

  useEffect(() => {
    onEditAddress( props.contact.address);
    onEditLastName( props.contact.lastName);
    onEditFirtstName( props.contact.firstName);
    onEditPhone( props.contact.phone);
    onEditBirthday( props.contact.birthday);
    onEditPhoto( props.contact.photo);
  },[])

  useEffect(()=>{
      if(props.error === null && props.isLoading === false){
        resetFirtstName();
        resetLastName();
        resetBirth();
        resetAddress();
        resetPhone();
        resetPhoto();
    }
  },[props.error,props.isLoading])

  const classesFirstName = hasNameError
    ? "form-control invalid"
    : "form-control";
  const classesLastName = hasLastNameError
    ? "form-control invalid"
    : "form-control";
  const classesBirth = hasBirthError ? "form-control invalid" : "form-control";
  const classesAddress = hasAddressError
    ? "form-control invalid"
    : "form-control";
  const classesPhone = hasPhoneError ? "form-control invalid" : "form-control";
  const classesPhoto = hasPhotoError ? "form-control invalid" : "form-control";
  let formIsValid = true;
  if (
    isNameValid &&
    isLastNameValid &&
    isBirthValid &&
    isAddressValid &&
    isPhoneValid &&
    photoValid
   
  ) {
    formIsValid = false;
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitFormHandler}>
        {props.isLoading && (
          <div className="loading">
            <LoadingSpinner />
          </div>
        )}

        <div className={classesFirstName}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            ref={firstNameRef}
          />
          {hasNameError && (
            <p className="error-text">First name must not be empty</p>
          )}
        </div>

        <div className={classesLastName}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            ref={lastNameRef}
          />
          {hasLastNameError && (
            <p className="error-text">Last name must not be empty</p>
          )}
        </div>

        <div className={classesPhoto}>
          <label htmlFor="url">URL photo</label>
          <input
            type="url"
            id="url"
            value={photoValue}
            onChange={photoChangeHandler}
            onBlur={photoBlurHandler}
            ref={photoRef}
          />
          {hasPhotoError && (
            <p className="error-text">URL must not be empty</p>
          )}
        </div>

        <div className={classesBirth}>
          <label htmlFor="birthday">Birthday</label>
          <input
            type="date"
            id="birthday"
            value={birthValue}
            onChange={birthChangeHandler}
            onBlur={birthBlurHandler}
            ref={birthRef}
          />
          {hasBirthError && (
            <p className="error-text">Birthday must not be empty</p>
          )}
        </div>

        <div className={classesAddress}>
          <label htmlFor="address">Address</label>
          <textarea
            rows="3"
            id="address"
            value={addressValue}
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
            ref={addressRef}
          />
          {hasAddressError && (
            <p className="error-text">Address must not be empty</p>
          )}
        </div>

        <div className={classesPhone}>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            pattern="^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$"
            value={phoneValue}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
            ref={phoneRef}
          />
          <small>1 555 555 5555</small>
          {hasPhoneError && (
            <p className="error-text">Phone must not be empty. Follow the pattern</p>
          )}
        </div>

        <div className={classes.actions}>
        <button disabled={formIsValid} className="btn">
        {props.error ? 'Retry' : 'Add contact'}
          </button> 
        </div>
      </form>
    </Card>
  );
};

export default ContactForm;
