import React from 'react';

import TagsInput from 'react-tagsinput';
import tagscss from 'style!css!react-tagsinput/react-tagsinput.css'; // TODO: erk css
import IconButton from './IconButton';

const EditableTags = ({ tags = [], isEditing = false, placeholder }) => {
  if(isEditing) {
    const tagNames = tags.map((tag) => {
      return tag.name;
    });
    return <TagsInput defaultValue={tagNames} placeholder={placeholder} />;
  } else {
    const formatedTags = tags.map((tag, i) => { // put that in a Tags component
      return (<span key={tag.slug}>{i !== 0 ? ',' : ''} <a href="">{tag.name}</a></span>);
    });
    return <div>{formatedTags}</div>;
  }
};

export default EditableTags;
