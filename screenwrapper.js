import { View, Text, StatusBar } from 'react-native';
import React from 'react';

export default function ScreenWrapper({ children }) {
    const statusBarHeight = StatusBar.currentHeight || 0;
    return (
        <View style={{ paddingTop: statusBarHeight }}>
            {children}
        </View>
    );
};
