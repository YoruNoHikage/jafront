import React from 'react';

import IconButton from './IconButton';

const EditableTitle = ({ title, isEditing }) => (
  isEditing ?
    <input type="text" placeholder="Grandma VS Alligator Zombies" defaultValue={title} />
  :
    <h2 style={{color: 'white'}}>{title}</h2>
);

export default EditableTitle;
