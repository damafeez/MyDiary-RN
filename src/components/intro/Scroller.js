import * as React from 'react';
import { ScrollableTabView } from '@valdio/react-native-scrollable-tabview'
import IntroSplash from './IntroView';
import { padding } from '../../styles/base';
import SlideIndicator from './SlideIndicator';

export default () => (
  <ScrollableTabView
    prerenderingSiblingsNumber={1}
    renderTabBar={() => <SlideIndicator />}
    style={{marginHorizontal: -padding.md, flexBasis: 200}}
    tabBarPosition="overlayBottom"
    showsHorizontalScrollIndicator={false}
  >
    <IntroSplash
      image={require('../../assets/intro1.jpeg')}
      title="Pen down your imagination"
      description="Your ideas have wings, let them fly!
      Give them a safe abode so you can easily refer to them anytime you wish." />
    <IntroSplash
      image={require('../../assets/intro2.jpeg')}
      title="The universe, your canvas"
      description="The universe is yours to write! Adventures, travel experiences, Diary is handy for your convenient use." />
    <IntroSplash
      image={require('../../assets/intro3.jpeg')}
      title="We care about your moods"
      description="Diary allows you to pen down stories that match your moods and emotions. It yours for the yours for the interest." />
  </ScrollableTabView>
);
