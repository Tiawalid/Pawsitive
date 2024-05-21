import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper'; 

export default function App() {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate('Vets');
    };

    const handleCheckout = () => {
        navigation.navigate('Checkout'); 
      };
    

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Appbar.BackAction style={styles.backButton} />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                </View>
            </Appbar.Header>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Ask a question</Text>
                <TouchableOpacity style={styles.questionButton}>
                    <Text style={styles.questionText}>How often should I bring my pet in for check-ups?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.questionButton}>
                    <Text style={styles.questionText}>What should I include in a pet first aid kit?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.questionButton}>
                    <Text style={styles.questionText}>At what age is it recommended?</Text>
                </TouchableOpacity>
                
                <Text style={styles.sectionTitle}>Book an appointment</Text>
                <TouchableOpacity style={styles.dateButton}>
                    <Text style={styles.dateText}>No date selected</Text>
                </TouchableOpacity>
                <Calendar
                    style={styles.calendar}
                    theme={{
                        backgroundColor: '#FFFFFF',
                        calendarBackground: '#FFFFFF',
                        textSectionTitleColor: '#b6c1cd',
                        selectedDayBackgroundColor: '#ffffff',
                        selectedDayTextColor: '#000000',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        arrowColor: 'orange',
                        monthTextColor: 'blue',
                        indicatorColor: 'blue',
                        textDayFontFamily: 'monospace',
                        textMonthFontFamily: 'monospace',
                        textDayHeaderFontFamily: 'monospace',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                    }}
                />
                <TouchableOpacity style={styles.appointmentButton} onPress={handleCheckout}>
                    <Text style={styles.appointmentButtonText}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6', 
    },
    content: {
        paddingHorizontal: 18, 
        marginBottom: 70,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    questionButton: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    questionText: {
        fontSize: 16,
    },
    dateButton: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    dateText: {
        fontSize: 16,
        textAlign: 'center',
    },
    calendar: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 5,
    },
    appointmentButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    appointmentButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoContainer: {
        marginLeft: 10,
    },
    logo: {
        width: 90,
        height: 50,
    },
    header: {
        backgroundColor: '#ADD8E6',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 18,
    },
    backButton: {
        marginRight: 10,
    },
});
