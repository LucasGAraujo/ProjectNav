import React, { useState,useEffect } from 'react';
import { View, StyleSheet, TextInput, Modal, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const PrincipalPrestador = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (

          
          <View style={styles.profileContainer}>
                   <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Carteira')}>
  <Text style={styles.buttonText}>Carteira</Text>
</TouchableOpacity>
          </View>
      ),
    });
  }, [navigation]);
  const niteroiCoords = {
    latitude: -22.898590,
    longitude: -43.114353,
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState('');

  useEffect(() => {
    
    const intervalId = setInterval(() => {
      setModalVisible(true);
    }, 10000);

    
    return () => clearInterval(intervalId);
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };
  const closeModals = () => {
    setModalVisible(false);
    Alert.alert("Dirija ate o local ...")
  };

  const closeDetailsModal = () => {
    setDetailsModalVisible(false);
  };
  return (
    
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        latitude: niteroiCoords.latitude,
        longitude: niteroiCoords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>
        <Marker coordinate={niteroiCoords} title="Niterói" />
      </MapView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Precisamos de você</Text>

            <View style={styles.optionContainer}>
              <TouchableOpacity style={styles.optionButton}>
              <MapView style={styles.map} initialRegion={{
        latitude: niteroiCoords.latitude,
        longitude: niteroiCoords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>
        <Marker coordinate={niteroiCoords} title="Niterói" />
      </MapView>
              </TouchableOpacity>

              <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionText}>Local:João Brasil - Travessa 26 / RJ</Text>
                <Text style={styles.optionValue}>R$50,00</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.optionContainer}>
            <TouchableOpacity onPress={closeModals} style={styles.closeButtonAceitar}>
              <Text style={styles.closeButtonText}>Aceitar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Recusar</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      <View style={styles.bottomContainer}>
      
      <View style={styles.imageContainer}>
        <Image
          source={require('./foto.png')}
          style={styles.images}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>VagnerDom</Text>
        <Text style={styles.cpf}>111111111111</Text>
      
    </View>
</View>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F4F4F4', // Light gray background color
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: '#333', // Dark gray background color
    padding: 20,
    borderRadius: 15,
    width: '100%',
    marginBottom: 20,
  },
  modalText: {
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 15,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: '#484848',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
  optionText: {
    color: '#FFFFFF',
    marginBottom: 8,
  },
  optionValue: {
    color: '#FFFFFF',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#FF5353',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: 140,
    height: 50,
    textAlign: 'center',
  },
  closeButtonAceitar: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: 140,
    height: 50,
    textAlign: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  bottomTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  searchButton: {
    backgroundColor: '#E0E0E0', // Light gray background color
    height: 160,
    width: 108,
    borderRadius: 15,
    marginRight: 15,
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  searchButtonText: {
    backgroundColor: '#333',
    color: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginTop: 15,
  },
  searchButtonTexts: {
    backgroundColor: '#333',
    color: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginTop: 15,
  },
  selectedSearch: {
    backgroundColor: '#1E1E1E',
  },
  profileContainer: {
    marginLeft: 10,
  },
  profileImage: {
    backgroundColor: 'gray',
    width: 40,
    height: 40,
    borderRadius: 25,
  },

  profileContainer: {
    marginLeft: 220,
    flexDirection: 'row',
    backgroundColor: 'red',
    height: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  profileImage: {
    textAlign: 'center',
    fontSize: 20,
    color: '#FFFFFF',
    backgroundColor: '#333', // Dark gray background color
    width: 130,
    height: 30,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  detailsModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  detailsModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 330,
  },
  detailsModalText: {
    color: '#3498db',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  detailsModalDescription: {
    color: '#333',
    marginBottom: 10,
  },
  detailsModalInfo: {
    color: '#555',
    marginBottom: 10,
  },
  detailsCloseButton: {
    marginTop: 10,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  detailsCloseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    borderRadius: 50,
    overflow: 'hidden', 
    alignItems: 'center', 
  },
  images: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  infoContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // cor do texto do nome
  },
  cpf: {
    fontSize: 16,
    color: 'lightgray', // cor do texto do CPF
  },
});


export default PrincipalPrestador;
