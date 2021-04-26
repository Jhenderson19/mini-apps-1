import React from 'react';

var AddChip = (props) => {
  return (
    <button onClick={() => {
      props.functions.addChip(props.player, props.index) ?
      props.functions.stageUpdate() : null;
    }}>Add Chip</button>
  )
}

export default AddChip;