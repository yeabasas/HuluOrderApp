import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Fight = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    // Fetch your data from the API
    // For this example, I'm using a simple array
    const fetchData = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        console.log('API Response:', data);
        setRowData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderCell = ({ item }) => (
    <View style={styles.cell}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
    {rowData.length > 0 ? (
      <FlatList
        data={rowData}
        renderItem={renderCell}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    ) : (
      <Text>{rowData.length === 0 ? 'No data available' : 'Loading...'}</Text>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cell: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Fight;
