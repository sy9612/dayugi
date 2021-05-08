import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DrawerContent from '../components/DrawerContent';
import { AnalysisPage, DiaryArchivePage, DiaryCalendarPage, GalleryPage, GrowthDiaryPage, SettingPage, TutorialPage, LoginPage, SignUpPage, UserInfoPage } from '../screens/index';

const Routes = {
  Tutorial : { screen : TutorialPage },
  Login: { screen: LoginPage },
  SignUp: { screen: SignUpPage },
  UserInfo: { screen: UserInfoPage },
  DiaryCalendar : { screen : DiaryCalendarPage },
  DiaryArchive : { screen : DiaryArchivePage },
  GrowthDiary : { screen : GrowthDiaryPage },
  Gallery: { screen: GalleryPage },
  Analysis : { screen : AnalysisPage },
  Setting : { screen : SettingPage },
}

const Drawer = createDrawerNavigator(
    Routes,
    {
      initialRouteName: "DiaryCalendar",
      unmountInactiveRoutes: true,
      headerMode: "none",
      contentComponent: props => <DrawerContent {...props} />
    }
)

export default Drawer;