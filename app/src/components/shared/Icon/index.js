import React from 'react';
import './outline-icons.css';

export default function MaterialIcon({
  size = 'small',
  name,
  outline,
  ...rest
}) {
  const sizes = {
    tiny: 'md-18',
    small: 'md-24',
    medium: 'md-36',
    large: 'md-48'
  };
  const sizeClass = sizes[size];

  let icon;

  if (outline) {
    icon = (
      <i
        className={`outline-${name} material-icons-outline outline-${sizeClass}`}
        {...rest}
      />
    );
  } else {
    icon = (
      <i className={`material-icons ${sizeClass}`} {...rest}>
        {name}
      </i>
    );
  }

  return icon;
}
