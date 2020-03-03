import React from 'react';

import {useSelector} from 'react-redux';

import {
  View
} from '@vkontakte/vkui';

import Home from '../../components/Home';
import ViewRelease from '../../components/ViewRelease';
import CreateRelease from '../../components/CreateRelease';

import './index.scss';

const Music = ({id, goBack}) => {
  const musicActivePanel = useSelector(store => store.app.musicActivePanel);

  return (
      <View className={'music'}
            activePanel={musicActivePanel}
            header={false}
            onSwipeBack={goBack}>
        <Home id={'home'}> {/*activePanel и id панели должны совпадать, что все работало*/}

        </Home>
        <ViewRelease id={'view-release'}>

        </ViewRelease>
        <CreateRelease id={'create-release'}>

        </CreateRelease>
      </View>
  );
};

export default Music;
