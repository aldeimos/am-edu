import React from 'react';
import {
  Panel,
  Header,
  List,
  Cell,
  Group,
  PanelHeaderSimple,
  Avatar,
  Separator
} from "@vkontakte/vkui";
import {useSelector, useDispatch} from "react-redux";
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import TrackCell from "../TrackCell";
import vkBridge from "@vkontakte/vk-bridge";
import {changeMusicActivePanel, updateHistory} from "../../store/app/actions";

const ViewRelease = ({id}) => {
  const stateHistory = useSelector(store => store.app.history);
  const dispatch = useDispatch();
  const selectedRelease = useSelector(store => store.releases.selectedRelease);
  const {releaseTitle, type, coverSrc, releaseStatus, releaseDate, genre, upc, tracklist, shortlink}  = selectedRelease[0];
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

  return (
      <Panel id={id}>
        <PanelHeaderSimple left={<Icon24BrowserBack onClick={goBack}/>}>
          {releaseTitle}
        </PanelHeaderSimple>
        <Group style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Avatar mode={'image'} size={80} src={coverSrc}/>
          <Header>{releaseTitle}</Header>
        </Group>
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
                ? <TrackCell name={releaseTitle} coverSrc={coverSrc} artist={'Joji'}/>
                : tracklist.map(track => <TrackCell key={track.id} {...track} coverSrc={coverSrc}/>)}
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
