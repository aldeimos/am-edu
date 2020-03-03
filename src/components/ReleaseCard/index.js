import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {changeMusicActivePanel, updateHistory} from '../../store/app/actions';
import {setSelectedRelease} from '../../store/releases/actions';

import vkBridge from '@vkontakte/vk-bridge';
import {Avatar, Cell} from '@vkontakte/vkui';
import Icon24View from '@vkontakte/icons/dist/24/view';

import './index.scss';


const ReleaseCard = ({id, releaseTitle, type, isObserved, coverSrc, releaseStatus}) => {
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
      <Cell className={'release-card'} size={'l'}
            description={type}
            before={<Avatar mode={'image'} src={coverSrc}/>}
            asideContent={releaseStatus ? 'Выпущен' : 'Скоро'}
            onClick={() => goForward('view-release')}>
        {releaseTitle}
        {isObserved && <Icon24View style={{color: 'var(--accent)'}}/>}
      </Cell>
  )
};


export default ReleaseCard;
