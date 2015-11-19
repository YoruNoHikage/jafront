import React from 'react';

import IconButton from './IconButton';
import Input from './Input';

const style = {
  fontSize: '3em',
  margin: '20px 0',
  padding: '15px 0',
  fontWeight: '100',
};

const EditableTitle = ({ title, isEditing, onChange }) => (
  isEditing ?
    <Input style={style} type="text" placeholder="Grandma VS Alligator Zombies" defaultValue={title} onChange={onChange} />
  :
    <h2 style={{color: 'white'}}>{title}</h2>
);

export default EditableTitle;
