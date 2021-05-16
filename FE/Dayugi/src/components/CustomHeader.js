import React from 'react';
import { Header } from 'react-native-elements';

class CustomHeader extends React.Component {
    render() {
        return (
            <Header
                statusBarProps={{ barStyle: 'dark-content' }}
                leftComponent={{ icon: 'menu', color: '#000', onPress: () => this.props.navigation.openDrawer() }}
                containerStyle={{
                    backgroundColor: '#FFFAF0',
                    height:80,
                }}
            />
        );
    }
}

export default CustomHeader