import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {deleteRelease} from '../../store/releases/actions';
import {changeMusicActivePanel, updateHistory} from '../../store/app/actions';

import vkBridge from '@vkontakte/vk-bridge';
import {
  Panel,
  Header,
  List,
  Cell,
  Group,
  PanelHeaderSimple,
  Avatar,
  Separator,
  Div, CellButton
} from "@vkontakte/vkui";
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import Icon28Delete from '@vkontakte/icons/dist/28/delete';

import TrackCell from '../TrackCell';
import './index.scss';

const ViewRelease = ({id}) => {
  const stateHistory = useSelector(store => store.app.history);
  const dispatch = useDispatch();
  const selectedRelease = useSelector(store => store.releases.selectedRelease);
  const {releaseTitle, type, artist, coverSrc, releaseStatus, releaseDate, genre, upc, tracklist, shortlink}  = selectedRelease[0];
  // и еще я тут чет с деструктуризацией запутался малеха
  // В общем, как я понимаю, что если хоть раз внутри вьюхи заюзад PHS, то уже не дает отрендерить обычный PH
  const goBack = () => {
    const history = [...stateHistory];
    history.pop();
    const musicActivePanel = history[history.length - 1];
    if (musicActivePanel === 'home') {
      vkBridge.send('VKWebAppDisableSwipeBack');
    }
    dispatch(updateHistory(history));
    dispatch(changeMusicActivePanel(musicActivePanel));
  };

  const removeRelease = () => {
    dispatch(deleteRelease(selectedRelease[0].id));
    goBack();
  };

  return (
      <Panel className={'view-release'} id={id}>
        <PanelHeaderSimple className={'music_border-bottom'} left={<Icon24BrowserBack onClick={goBack}/>}>
          {releaseTitle}
        </PanelHeaderSimple>
        <Group className={'music_border-bottom'} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Avatar mode={'image'} size={80} src={coverSrc}/>
          <Header>{releaseTitle}</Header>
        </Group>
        <Div className={'music_border-bottom'}>
          <CellButton className={'view-release__delete-release-btn'} mode="danger"
                      align={'center'}
                      onClick={removeRelease}>
            <Icon28Delete/>
            Удалить
          </CellButton>
        </Div>
        <Group header={<Header  mode={'secondary'}>Основная информация</Header>}>
            <List>
              <Cell indicator={releaseStatus ? 'Выпущен' : 'Скоро'}>
                Статус
              </Cell>
              <Separator/>
              <Cell indicator={releaseTitle}>
                Название
              </Cell>
              <Separator/>
              <Cell indicator={type}>
                Тип
              </Cell>
              <Cell indicator={genre}>
                Жанр
              </Cell>
              <Cell indicator={releaseDate}>
                Дата релиза
              </Cell>
              <Cell indicator={upc}>
                UPC
              </Cell>
              <Separator/>
            </List>
        </Group>
        <Group header={<Header mode={'secondary'}>Треклист</Header>}>
          <List>
            {!tracklist
                ? <TrackCell name={releaseTitle} coverSrc={coverSrc} artist={artist}/>
                : tracklist.map(track => <TrackCell key={track.id} artist={artist} {...track} coverSrc={coverSrc}/>)}
          </List>
        </Group>
        <Group header={<Header mode={'secondary'}>Инструменты Alphamusic</Header>}>
          <List>
            <Cell indicator={shortlink}>
              Короткая ссылка
            </Cell>
            <Separator/>
            <Cell indicator={5}
                  expandable>
              Наблюдатели
            </Cell>
          </List>
        </Group>
      </Panel>
  )
};

export default ViewRelease;
