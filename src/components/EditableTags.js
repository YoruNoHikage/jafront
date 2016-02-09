import React from 'react';

import TagsInput from 'react-tagsinput';
import tagsStyles from '../../css/tags.css';
import IconButton from './IconButton';

const EditableTags = ({ tags = [], isEditing = false, placeholder, onChange = () => {} }) => {
  if(isEditing) {
    const tagNames = tags.map((tag) => {
      return tag.name;
    });
    return <TagsInput className={tagsStyles.default} inputProps={{className: tagsStyles.input}} tagProps={{className: tagsStyles.tag, classNameRemove: tagsStyles.remove}} value={tagNames} placeholder={placeholder} onChange={onChange} />;
  } else {
    const formatedTags = tags.map((tag, i) => { // put that in a Tags component
      return (
        <a key={tag.slug} className={tagsStyles.tag}>
          {tag.name}
        </a>
      );
    });
    return <ul>{formatedTags}</ul>;
  }
};

export default EditableTags;
