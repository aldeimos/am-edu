import React from 'react';
import {ConfigProvider, Epic, Separator, Tabbar, TabbarItem} from '@vkontakte/vkui';
import Icon24Song from '@vkontakte/icons/dist/24/song';
import Icon24Poll from '@vkontakte/icons/dist/24/poll';
import Icon24MoneyCircle from '@vkontakte/icons/dist/24/money_circle';
import '@vkontakte/vkui/dist/vkui.css';
import Music from "./containers/Music/Music";
import Streams from "./containers/Streams/Streams";
import Wallet from "./containers/Wallet/Wallet";
import {useDispatch, useSelector} from "react-redux";
import {changeActiveStory, changeMusicActivePanel, updateHistory} from "./store/app/actions";
import vkBridge from "@vkontakte/vk-bridge";

const App = () => {
	const dispatch = useDispatch();
	const activeStory = useSelector(store => store.app.activeStory);
	const musicActivePanel = useSelector(store => store.app.musicActivePanel);
	const stateHistory = useSelector(store => store.app.history);

	const tabBarItemClickHandler = (e) => {
		dispatch(changeActiveStory(e.currentTarget.dataset.story));
	};

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


	return(
			<ConfigProvider isWebView={true}>
				<Epic activeStory={activeStory} tabbar={
					<Tabbar shadow>
					<TabbarItem onClick={(e) => tabBarItemClickHandler(e)}
											text={'Музыка'}
											selected={activeStory === 'music'}
											data-story={'music'}>
						<Icon24Song/>
					</TabbarItem>
					<TabbarItem onClick={(e) => tabBarItemClickHandler(e)}
											text={'Прослушивания'}
											selected={activeStory === 'streams'}
											data-story={'streams'}>
						<Icon24Poll/>
					</TabbarItem>
					<TabbarItem onClick={(e) => tabBarItemClickHandler(e)}
											text={'Кошелек'}
											selected={activeStory === 'wallet'}
											data-story={'wallet'}>
						<Icon24MoneyCircle/>
					</TabbarItem>
				</Tabbar>
				}>
					<Separator/>
					<Music goBack={goBack} id={'music'} activePanel={musicActivePanel}>

					</Music>
					<Streams  goBack={goBack} id={'streams'} activePanel={musicActivePanel}>

					</Streams>
					<Wallet goBack={goBack} id={'wallet'} activePanel={musicActivePanel}>

					</Wallet>
				</Epic>
			</ConfigProvider>
	)
};

export default App;
