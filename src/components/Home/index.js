import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {changeMusicActivePanel, updateHistory} from '../../store/app/actions';

import vkBridge from '@vkontakte/vk-bridge';
import {
  Avatar, Button,
  Cell, Div,
  Group,
  Header,
  List, Panel,
  PanelHeaderContent,
  PanelHeaderSimple
} from '@vkontakte/vkui';
import Icon24Gallery from '@vkontakte/icons/dist/24/gallery';
import Icon24Song from '@vkontakte/icons/dist/24/song';

import ReleaseCard from '../ReleaseCard';
import './index.scss';


const Home = ({id}) => {
  const releases = useSelector(store => store.releases.releases);
  const stateHistory = useSelector(store => store.app.history);
  const dispatch = useDispatch();

  const goForward = (activeMusicPanel) => {
    const history = [...stateHistory];
    history.push(activeMusicPanel);
    if (activeMusicPanel === 'home') {
      vkBridge.send('VKWebAppEnableSwipeBack');
    }
    dispatch(updateHistory(history));
    dispatch(changeMusicActivePanel(activeMusicPanel));
  };

  return (
      <Panel className={'music__panel'} id={id} separator={false} style={{backgroundColor: 'grey'}}>
        <PanelHeaderSimple className={'music__header music_border-bottom'} separator={false}>
          <PanelHeaderContent status={'For Artists'}>
            AlphaMusic
          </PanelHeaderContent>
        </PanelHeaderSimple>
        <Group className={'music_border-bottom'} header={<Header mode={'secondary'}> Добро пожаловать!</Header>}>
          <Cell size={'l'}
                description={'Joji'}
                before={<Avatar src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQw-LJjbBQ4Uerfp_2WtBb1MzCOS5yDWX-RwgkGzyI7Q08jF7Vv'}/>}
                expandable>
            George Miller
          </Cell>
        </Group>
        <Group className={'music_border-bottom'}>
          <Header>
            Вы в шаге от своей мечты!
            <span role={'img'} aria-label={'sparkles emoji'}>✨</span>
          </Header>
          <Cell multiline>Давайте скорее начнем, для этого нам понадобится:</Cell>
          <List>
            <Cell multiline
                  size={'l'}
                  description={'Большая обложка. Идеально подойдет квадратное изображание со стороной не меньше, чем 3500px (JPG или PNG)'}
                  before={<Icon24Gallery/>}>

            </Cell>
            <Cell multiline
                  size={'l'}
                  description={'Качественные аудио файлы, в 44.1kHz и 16-битном стерео (WAV или FLAC)'}
                  before={<Icon24Song/>}>
            </Cell>
            <Div>
              <Button
                  size="l"
                  stretched
                  onClick={() => goForward('create-release')}>
                Создать релиз
              </Button>
            </Div>
          </List>
        </Group>
        <Group header={<Header mode={'secondary'}>Мои релизы</Header>}>
          <List>
            {releases.length === 0
                ? <Cell>У вас пока нет релизов :(</Cell>
                : releases.map(release => <ReleaseCard key={release.id} {...release}/>)}
          </List>
        </Group>
      </Panel>
  )
};

export default Home;
