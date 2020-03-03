import React from 'react';

import {Avatar, Cell} from '@vkontakte/vkui';

const AddTrackCard = () => {
  return (
      <Cell before={<Avatar mode={'image'}/>}
            expandable>
        Без названия
      </Cell>
  )
};

export default AddTrackCard;
