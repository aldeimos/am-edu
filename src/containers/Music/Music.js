import React from "react";
import {
  View
} from "@vkontakte/vkui";

import Home from "../../components/Home";
import ViewRelease from "../../components/ViewRelease";
import {useDispatch, useSelector} from "react-redux";

const Music = ({id, goBack}) => {
  const musicActivePanel = useSelector(store => store.app.musicActivePanel);

  return (
      <View className={'music'}
            activePanel={musicActivePanel}
            header={false}
            onSwipeBack={goBack}>
        <Home id={'home'}> // activePanel и id панели должны совпадать, что все работало

        </Home>
        <ViewRelease id={'view-release'}>

        </ViewRelease>
      </View>
  );
};

export default Music;
