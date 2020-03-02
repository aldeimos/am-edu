import types from "./action-types";

const initialState = {
  releases: [
    {
      id: 1,
      type: 'Album',
      releaseTitle: 'BALLADS 1',
      coverSrc: 'https://upload.wikimedia.org/wikipedia/ru/thumb/9/94/Ballads_1.png/274px-Ballads_1.png',
      releaseStatus: true,
      genre: 'Soul',
      releaseDate: '14/08/2019',
      upc: 1234567891231,
      shortlink: 'short.co/ballads',
      tracklist: [
        {
          id: 1,
          name: 'ATTENTION',
          artist: 'Joji'
        },
        {
          id: 2,
          name: 'SLOW DANCING IN THE DARK',
          artist: 'Joji'
        },
        {
          id: 3,
          name: 'Meme machine',
          artist: 'Joji'
        },
        {
          id: 4,
          name: 'Dora, The explorer',
          artist: 'Joji'
        },
        {
          id: 5,
          name: 'Keke',
          artist: 'Joji'
        },
      ]
    },
    {
      id: 2,
      type: 'Single',
      releaseTitle: 'Run',
      coverSrc: 'https://upload.wikimedia.org/wikipedia/ru/thumb/e/eb/Run_%28%D0%BF%D0%B5%D1%81%D0%BD%D1%8F%29.png/274px-Run_%28%D0%BF%D0%B5%D1%81%D0%BD%D1%8F%29.png',
      releaseStatus: true,
      genre: 'Soul',
      releaseDate: '10/05/2019',
      upc: 1234567891231,
      shortlink: 'short.co/run',
      tracklist: null
    },
    {
      id: 3,
      type: 'Single',
      releaseTitle: 'Sanctuary',
      coverSrc: 'https://upload.wikimedia.org/wikipedia/ru/3/35/Sanctuary_%28%D0%BF%D0%B5%D1%81%D0%BD%D1%8F%29.jpg',
      releaseStatus: true,
      genre: 'Soul',
      releaseDate: '22/11/2020',
      upc: 1234567891231,
      shortlink: 'short.co/sanctuary',
      tracklist: null
    },
  ],
  selectedRelease: {}
};

const releasesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_REALESE:
      return {
        ...state,
        releases: [...state.releases, {...action.payload}]
      };
    case types.SET_SELECTED_RELEASE:
      console.log()
          return {
            ...state,
            selectedRelease: state.releases.filter(release => {
              if (release.id === action.payload) {
                return release;
              }
            })
          };
    default: return state;
  }
};

export default  releasesReducer;
