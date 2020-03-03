import React from 'react';

import {Avatar, Cell} from '@vkontakte/vkui';



const TrackCell = ({name, artist, coverSrc}) => {
  return (
      <Cell size={'l'}
            description={artist}
            before={<Avatar mode={'image'} src={coverSrc}/>}
            expandable>
        {name}
      </Cell>
  )
};

export default TrackCell;
