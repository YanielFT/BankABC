import classes from "./photoPerfil.module.css";

const PhotoPerfil = (props) => {
  return (
    <div className={classes.container}>
      <img src={props.photo}></img>
    </div>
  );
};

export default PhotoPerfil;
