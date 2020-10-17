import React, {useState} from 'react';
import classes from './Input.module.css'

function isInvalid({valid, touched, shouldValidate}) {
  // console.log(!valid, touched, shouldValidate);
  return !valid && shouldValidate && touched;
};

 const Input = props => {


 let inputType = props.type || 'text';
 const cls = [classes.Input];
 const htmlFor = `${inputType}-${Math.random()}`;
 const clsIcon = ['fa'];
   const [visible, setVisible] = useState(false);

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }

  if (visible) {
    inputType = 'text';
    clsIcon.push( 'fa-eye ' + classes.fa);
  } else {
    clsIcon.push( 'fa-eye-slash ' + classes.fa);
    inputType = props.type || 'text';
  }



  const iconClickHandler = (value) => {
    setVisible(value);
  }
  //
  // const onBlurHandler = () => {
  //   isFocus = false;
  //   isBlur = true;
  //
  //   console.log('isFocus', isFocus);
  // };
  //
  // const focusHandler = () => {
  //   isFocus = true;
  //   isBlur = false;
  //
  //   console.log('isFocus', isFocus);
  // };

  return (
    <div className={cls.join(' ')}>
      {props.label
        ? <label htmlFor={htmlFor}>{props.label}</label>
        : null
      }
      <div>
        <input type={inputType}
               id={htmlFor}
               value={props.value}
               onChange={props.onChange}
               onBlur={(event) => {
                 props.onChange(event);
               }}

        />
        <div className={classes.faWrapper}>
          {
            props.showPasswordIcon ?
              <div>
                {
                  visible
                    ? <i className={clsIcon.join(' ')} aria-hidden="true" onClick={() => {iconClickHandler(false)}}></i>
                    : <i className={clsIcon.join(' ')} aria-hidden="true" onClick={() => {iconClickHandler(true)}}></i>
                }
              </div>
              : null
          }
        </div>
      </div>

      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Введите верное значение'}</span>
          : null
      }
    </div>
  );
};

export default Input;