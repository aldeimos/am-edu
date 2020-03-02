import React from 'react';
import {Avatar, Cell} from "@vkontakte/vkui";
import {useDispatch, useSelector} from "react-redux";
import {changeMusicActivePanel, updateHistory} from "../../store/app/actions";
import vkBridge from "@vkontakte/vk-bridge";
import {setSelectedRelease} from "../../store/releases/actions";


const RealeaseCard = ({id, releaseTitle, type, coverSrc, releaseStatus}) => {
  const dispatch = useDispatch();
  const stateHistory = useSelector(store => store.app.history);

  const selectRelease = () => {
    dispatch(setSelectedRelease(id));
  };

  const goForward = (activeMusicPanel) => {
    const history = [...stateHistory];
    history.push(activeMusicPanel);
    if (activeMusicPanel === 'home') {
      vkBridge.send('VKWebAppEnableSwipeBack');
    }
    dispatch(updateHistory(history));
    dispatch(changeMusicActivePanel(activeMusicPanel));
    selectRelease();
  };

  return (
      <Cell size={'l'}
            description={type}
            before={<Avatar mode={'image'} src={coverSrc}/>}
            asideContent={releaseStatus ? 'Выпущен' : 'Скоро'}
            onClick={() => goForward('view-release')}>
        {releaseTitle}
      </Cell>
  )
};


export default RealeaseCard;
