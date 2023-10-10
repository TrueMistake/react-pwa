import React from 'react';
import './Input.css'

const Input = ({icon, name, type, placeholder, label, description, error, variant, radius = 'xs', size = 'xs', disabled, asterisk}) => {
  const wrapClass = ['input-block'];
  const inputClass = ['input'];
  const arrRadiusAndSize = ["xs", "sm", "md", "lg", "xl"];
  const arrVariant = ['default', 'filled', 'unstyled'];

  if (type === 'radio') {
    wrapClass.push('wrapper');
  }

  if (arrRadiusAndSize.includes(radius)) {
    inputClass.push(`R${radius}`);
  }

  if (arrRadiusAndSize.includes(size)) {
    wrapClass.push(size);
  }

  if (arrVariant.includes(variant)) {
    inputClass.push(variant);
  }

  if (typeof icon === 'object') {
    inputClass.push('icon');
  }

  if (error?.length) {
    inputClass.push("error");
  }


  return (
    <div className={wrapClass.join(' ')}>
      <label htmlFor="input" className="label">{label} <span>{asterisk ? '*': ''}</span></label>
      <div className="description">{description}</div>
      <div className="input-wrap">
        {icon ? icon : null}
        <input className={inputClass.join(' ')} name={name} type={type} placeholder={placeholder} id="input" disabled={disabled}/>
      </div>
      <div className="error-message">{error}</div>
    </div>
  );
};

export default Input;