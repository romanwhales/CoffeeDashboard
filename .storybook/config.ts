import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import theme from '../src/constants/theme';

library.add(fas)

const req = require.context('../src', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(req);
}

addDecorator(withThemesProvider([theme]));
configure(loadStories, module);