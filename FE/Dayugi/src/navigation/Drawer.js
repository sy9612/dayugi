import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DrawerContent from '../components/DrawerContent';
import { AnalysisPage, DiaryArchivePage, DiaryCalendarPage, GalleryPage, GrowthDiaryPage, SettingPage } from '../screens/index';

const Drawer = createDrawerNavigator(
    {
      DiaryCalendar : { screen : DiaryCalendarPage },
      DiaryArchive : { screen : DiaryArchivePage },
      GrowthDiary : { screen : GrowthDiaryPage },
      Gallery : { screen : GalleryPage },
      Analysis : { screen : AnalysisPage },
      Setting : { screen : SettingPage },
    },
    {
      initialRouteName: "DiaryCalendar",
      unmountInactiveRoutes: true,
      headerMode: "none",
      contentComponent: props => <DrawerContent {...props} />
    }
)

export default Drawer;