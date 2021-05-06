import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DrawerContent from '../components/DrawerContent';
import { AnalysisPage, DiaryArchivePage, DiaryCalendarPage, GalleryPage, GrowthDiaryPage, SettingPage, TutorialPage, LoginPage, SignUpPage } from '../screens/index';

const Drawer = createDrawerNavigator(
    {
      Tutorial : { screen : TutorialPage },
      Login: { screen: LoginPage },
      SignUp: { screen : SignUpPage },
      DiaryCalendar : { screen : DiaryCalendarPage },
      DiaryArchive : { screen : DiaryArchivePage },
      GrowthDiary : { screen : GrowthDiaryPage },
      Gallery : { screen : GalleryPage },
      Analysis : { screen : AnalysisPage },
      Setting : { screen : SettingPage },
    },
    {
      initialRouteName: "Tutorial",
      unmountInactiveRoutes: true,
      headerMode: "none",
      contentComponent: props => <DrawerContent {...props} />
    }
)

export default Drawer;