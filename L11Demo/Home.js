import React, { useState, useEffect } from 'react';
import { StatusBar, Button, FlatList, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    listStyle: {
        borderWidth: 1,
        margin: 5,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ddd',
    },
});

const Home = ({ navigation }) => {
    const [myData, setMyData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch('https://jsonhost.com/json/bfeff12809f23122684b4dfe47bdbdae'); // Replace with your jsonhost.com endpoint
            const data = await response.json();
            setMyData(data); // Assuming the response JSON is an array of items
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures this runs only once

    const renderItem = ({ item }) => (
        <View style={styles.listStyle}>
            <Text>{item.name}</Text>
        </View>
    );

    return (
        <View>
            <StatusBar />
            <Button
                title="Add Item"
                onPress={() => navigation.navigate('Add', { datastr: JSON.stringify(myData) })}
            />
            {isLoading ? (
                <Text>Loading data...</Text>
            ) : (
                <FlatList
                    data={myData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${item.id || index}`} // Assuming items have unique IDs
                />
            )}
        </View>
    );
};

export default Home;
