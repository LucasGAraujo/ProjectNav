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
            <TouchableOpacity onPress={() => console.log('Perfil Pressionado')}>
              <Image source={require('./foto.png')} style={styles.profileImage} />
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
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailsModalVisible}
        onRequestClose={closeDetailsModal}
      >
        <View style={styles.detailsModalContainer}>
          <View style={styles.detailsModalContent}>
            <Text style={styles.detailsModalText}>Detalhes da Troca de Pneu</Text>
            <Text style={styles.detailsModalDescription}>Descrição: O serviço inclui a troca de pneu na localidade especificada.</Text>
            <Text style={styles.detailsModalDescription}>Data: 12 de novembro de 2023</Text>
            <Text style={styles.detailsModalDescription}>Hora: 15:30</Text>

            <TouchableOpacity onPress={closeDetailsModal} style={styles.detailsCloseButton}>
              <Text style={styles.detailsCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomTitle}>Historico de trabalho</Text>
        <View horizontal={true} style={styles.searchContainer}>
          <TouchableOpacity
            style={[styles.searchButton, selectedSearch && styles.selectedSearch]}
            onPress={() => {
              setDetailsModalVisible(true);
            }}
          >
              <MapView style={styles.map} initialRegion={{
        latitude: niteroiCoords.latitude,
        longitude: niteroiCoords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
         scrollEnabled={false}
      zoomEnabled={false}>
        <Marker coordinate={niteroiCoords} title="Niterói" />
      </MapView>

            <Text style={styles.searchButtonText}>Trocou Pneu</Text>
            <Text style={styles.searchButtonTexts}>R$20,00</Text>
            
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.searchButton, selectedSearch && styles.selectedSearch]}
            onPress={() => {
              setDetailsModalVisible(true);
            }}
          >
              <MapView style={styles.map} initialRegion={{
        latitude: niteroiCoords.latitude,
        longitude: niteroiCoords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
         scrollEnabled={false}
      zoomEnabled={false}>
        <Marker coordinate={niteroiCoords} title="Niterói" />
      </MapView>

            <Text style={styles.searchButtonText}>Trocou Pneu</Text>
            <Text style={styles.searchButtonTexts}>R$20,00</Text>
            
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.searchButton, selectedSearch && styles.selectedSearch]}
            onPress={() => {
              setDetailsModalVisible(true);
            }}
          >
              <MapView style={styles.map} initialRegion={{
        latitude: niteroiCoords.latitude,
        longitude: niteroiCoords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
         scrollEnabled={false}
      zoomEnabled={false}>
        <Marker coordinate={niteroiCoords} title="Niterói" />
      </MapView>

            <Text style={styles.searchButtonText}>Trocou Pneu</Text>
            <Text style={styles.searchButtonTexts}>R$20,00</Text>
            
          </TouchableOpacity>
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
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'black',

    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom:330,
  },
  modalText: {
    color:'white',
    fontSize: 28,
    textAlign:'center',
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
  optionText: {
    color: 'white',
    marginBottom: 5,
  },
  optionValue: {
    color: 'white',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width:140,
    height:50,
    textAlign:'center',
    backgroundColor:'red',
  },

  closeButtonAceitar: {
    marginTop: 10,
    backgroundColor: 'black',
    padding: 10,
    textAlign:'center',
    width:140,
    height:50,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor:'green',
  },
  closeButtonText: {
    color: 'white',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '40%',
    backgroundColor: 'black',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 5,
  },
  bottomTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  
  searchContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  
  
  searchButton: {
    backgroundColor: '#F0F0F0',
    height: 160,
    width: 108,
    borderRadius: 10,
    marginRight: 10,
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 3, 
  },
  
  searchButtonText: {
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 10,
  },
  
  searchButtonTexts: {
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 10,
  },
  
  selectedSearch: {
    backgroundColor: 'black',
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
    width:"90%",
    left:176,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  profileImage: {
    textAlign:"center",
    fontSize:20,
    color:'white',
    backgroundColor: 'black',
    width: 130,
    height: 30,
    borderRadius: 25,
    marginHorizontal: 10, }, 
    
    
    
  
    // Estilos para o modal de detalhes
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
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });


export default PrincipalPrestador;
