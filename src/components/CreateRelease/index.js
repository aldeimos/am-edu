import React, {useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {addRelease} from '../../store/releases/actions';
import {changeMusicActivePanel, updateHistory} from '../../store/app/actions';

import vkBridge from '@vkontakte/vk-bridge';
import {
  Avatar,
  File,
  Checkbox, Link,
  FormLayout, FormLayoutGroup,
  Header, Input,
  Panel, Cell, List,
  PanelHeaderSimple, Textarea, Button
} from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import Icon28Document from '@vkontakte/icons/dist/28/document';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';

import AddTrackCard from '../AddTrackCard';
import './index.scss';


const CreateRelease = ({id}) => {
  const stateHistory = useSelector(store => store.app.history);
  const dispatch = useDispatch();
  // const [type, setReleaseType] = useState('Single');
  const [artist] =  useState('Joji');
  const [isObserved] = useState(true);
  const [releaseTitle, setReleaseTitle] = useState('');
  const [coverSrc, setCover] = useState(null);
  const [releaseStatus] = useState(true);
  const [genre, setGenre] = useState('');
  const [shortlink, setShortlink] = useState('');
  const [tracklist, setTracklist] = useState([]);
  const [standartPackage, setStandartPackage] = useState(false);
  const [extendedPackage, setExtendedPackage] = useState(false);
  const [distribution, setDistribution] = useState(false);
  const [copyright, setCopyright] = useState(false);

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

  const addTrack = () => {
    const updatedTracklist = [...tracklist, {id: Math.floor(Math.random() * 999)}];
    setTracklist(updatedTracklist);
  };

  const addCover = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    fileReader.addEventListener('load', () => {
      setCover(fileReader.result)
    });
    fileReader.readAsDataURL(file);
  };

  const sendRelease = () => {
    dispatch(addRelease({
      id: Date.now(),
      artist,
      type: tracklist ? 'Album' : 'Single',
      isObserved,
      releaseTitle,
      coverSrc,
      releaseStatus,
      genre,
      releaseDate: new Date().toISOString(),
      upc: '12312312',
      shortlink,
      tracklist
    }));
    goBack();
  };


  return (
      <Panel className={'create-release'} id={id}>
        <PanelHeaderSimple left={<Icon24BrowserBack onClick={goBack}/>}>
          Создание релиза
        </PanelHeaderSimple>
        <FormLayout>
          <FormLayoutGroup className={'create-release__wrapper'}>
              <Avatar src={coverSrc} className={'create-release__cover'} mode={'image'} size={200}/>
              <File align={'center'}
                    className={'create-release__load-cover-btn'}
                    before={<Icon28Document/>}
                    onChange={(e) => addCover(e)}
              >
                Выбрать обложку
              </File>
          </FormLayoutGroup>
          <FormLayoutGroup>
            <Header>Основная информация</Header>
            <Input
                type={'text'}
                value={releaseTitle}
                placeholder={'Название релиза'}
                onChange={(e) => setReleaseTitle(e.target.value)}
            />
            <Input
                type={'text'}
                value={genre}
                placeholder={'Жанр'}
                onChange={(e) => setGenre(e.target.value)}
            />
            <Input
                type={'text'}
                placeholder={'Пустой инпут'}
            />
          </FormLayoutGroup>
          <FormLayoutGroup>
            <Header>Треклист</Header>

              {tracklist
                  ? <List>
                      {tracklist.map(track => <AddTrackCard key={track.id}/>)}
                    </List>
                  : ''}

            <Button align={'center'}
                    className={'create-release__create-track'}
                    before={<Icon28AddOutline/>}
                    onClick={addTrack}
            >
              Добавить трек
            </Button>
          </FormLayoutGroup>
          <FormLayoutGroup>
            <Cell selectable
                  onChange={() => {
                    setStandartPackage(true);
                    setExtendedPackage(false)
                  }}
                  checked={standartPackage}
                  description={'Стандартный пакет'}
                  before={<Avatar size={40} mode="image" src={''}/>
            }>
              Стаднартный
            </Cell>
            <Cell selectable
                  onChange={() => {
                    setStandartPackage(false);
                    setExtendedPackage(true)
                  }}
                  checked={extendedPackage}
                  description={'Расширенный пакет'}
                  before={<Avatar size={40} mode="image" src={''}/>
                  }>
              Расширенный
            </Cell>
          </FormLayoutGroup>
          <FormLayoutGroup>
            <Header>Инструменты AlphaMusic</Header>
            <Input type={'text'}
                   value={shortlink}
                   onChange={(e) => setShortlink(e.target.value)}
                   placeholder={'Короткая ссылка (необязательно)'}
            />
          </FormLayoutGroup>
          <FormLayoutGroup>
            <Header>Комментарий для модерации</Header>
            <Textarea type={'text'}
                   placeholder={'Необязательно'}
            />
          </FormLayoutGroup>
          <FormLayoutGroup>
            <Checkbox checked={copyright}
                      onChange={() => setCopyright(!copyright)}
            >
              Я владею эксклюзивными правами на весь загружаемый мною контент
            </Checkbox>
            <Checkbox checked={distribution}
                      onChange={() => setDistribution(!distribution)}
            >
              Я согласен с <Link>Соглашеним о дистрибуции</Link>
            </Checkbox>
            <Button
                disabled={(!copyright || !distribution)} /*Я так понимаю, нельзя залить то,что тебе не принаджлежит и не согласившись с правилам*/
                className={'create-release__submit-btn'}
                stretched
                onClick={() => sendRelease()}
            >
              Отправить на модерацию
            </Button>
          </FormLayoutGroup>
        </FormLayout>
      </Panel>
  )
};

export default CreateRelease;
