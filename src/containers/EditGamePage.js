import React from 'react';

import GamePage from './GamePage';

function onChangeTitle(newTitle) {
  return {
    title: newTitle,
  };
}

function onDropLogo(files) {
  let logo = '';
  files.forEach((file) => {
    logo = file.preview;
  });
  return {
    logo,
  };
}

const EditGamePage = (props) => <GamePage {...props} isEditing={true} onChangeTitle={onChangeTitle} onDropLogo={onDropLogo} />

export default EditGamePage;
