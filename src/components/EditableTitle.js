import React from 'react';

import IconButton from './IconButton';
import Input from './Input';

const style = {
  fontSize: '3em',
  margin: '35px 0',
  padding: '0',
  fontWeight: '100',
};

const EditableTitle = ({ title, isEditing, onChange, ...rest }) => (
  isEditing ?
    <Input style={style} type="text" placeholder="Grandma VS Alligator Zombies" defaultValue={title} onChange={onChange} {...rest} />
  :
    <h2 style={{color: 'white'}} {...rest}>{title}</h2>
);

export default EditableTitle;
