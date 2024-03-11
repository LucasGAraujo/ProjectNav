import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const CarteiraPrestador = () => {
  const niteroiCoords = {
    latitude: -22.898590,
    longitude: -43.114353,
  };

  const [balance, setBalance] = useState(7000);

  const handleWithdraw = () => {
    const withdrawAmount = 100;
    if (balance >= withdrawAmount) {
      setBalance(balance - withdrawAmount);
    } else {
      alert("Saldo insuficiente!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Saldo disponível</Text>
        <Text style={styles.balanceAmount}>R${balance.toFixed(2)}</Text>
      </View>
      <View style={styles.transactionContainer}>
        <Text style={styles.transactionHeader}>Transações relacionadas ao trabalho</Text>
        {/* Transação 1 */}
        <View style={styles.transaction}>
          <Text style={styles.transactionType}>Troca de pneu</Text>
          <Text style={styles.transactionAmount}>+ R$80.00</Text>
        </View>
        {/* Transação 2 */}
        <View style={styles.transaction}>
          <Text style={styles.transactionType}>Reparo de freios</Text>
          <Text style={styles.transactionAmount}>+ R$120.00</Text>
        </View>
        {/* Transação 3 */}
        <View style={styles.transaction}>
          <Text style={styles.transactionType}>Troca de óleo</Text>
          <Text style={styles.transactionAmount}>+ R$50.00</Text>
        </View>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: niteroiCoords.latitude,
            longitude: niteroiCoords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker coordinate={niteroiCoords} title="Niterói" />
        </MapView>
        {/* Detalhes da transação 1 */}
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionType}>Troca de pneu</Text>
          <Text style={styles.transactionAmount}>R$80.00</Text>
        </View>
      </View>
      <View style={styles.mapContainer}>
        {/* Mapa para a transação 2 */}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: niteroiCoords.latitude,
            longitude: niteroiCoords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker coordinate={niteroiCoords} title="Niterói" />
        </MapView>
        {/* Detalhes da transação 2 */}
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionType}>Reparo de freios</Text>
          <Text style={styles.transactionAmount}>R$120.00</Text>
        </View>
      </View>
      <View style={styles.mapContainer}>
        {/* Mapa para a transação 3 */}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: niteroiCoords.latitude,
            longitude: niteroiCoords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker coordinate={niteroiCoords} title="Niterói" />
        </MapView>
        {/* Detalhes da transação 3 */}
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionType}>Troca de óleo</Text>
          <Text style={styles.transactionAmount}>R$50.00</Text>
        </View>
      </View>
      <View style={styles.space}></View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleWithdraw}>
          <Ionicons name="wallet-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Sacar com PIX</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleWithdraw}>
          <Ionicons name="swap-horizontal-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Transferência</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  balanceContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  balanceText: {
    fontSize: 18,
    color: '#666',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionContainer: {
    width: '80%',
    marginBottom: 20,
  },
  transactionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  transactionType: {
    fontSize: 16,
    color: '#333',
  },
  transactionAmount: {
    fontSize: 16,
    color: '#a32c28',
  },
  mapContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  map: {
    width: '30%',
    height: 80,
    marginBottom: 20,
  },
  transactionDetails: {
    marginLeft: 20,
  },
  space: {
    height: 40,
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#a32c28',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default CarteiraPrestador;
