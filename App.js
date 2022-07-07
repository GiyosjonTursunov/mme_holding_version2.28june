import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
import ChooseScreen from './src/ChooseScreen';

import {enableFreeze} from 'react-native-screens';

enableFreeze(true);

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <ChooseScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
