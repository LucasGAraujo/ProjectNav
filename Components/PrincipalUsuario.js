import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Modal, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const PrincipalUsuario = () => {
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

  const [situacao, setSituacao] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState('');

  const handleOKPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSituacao("");
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

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Qual é a sua situação?"
          placeholderTextColor="white"
          value={situacao}
          onChangeText={text => setSituacao(text)}
          onSubmitEditing={handleOKPress}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Valor do Pedido: {situacao}</Text>

            <View style={styles.optionContainer}>
              <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionText}>Rápido</Text>
                <Text style={styles.optionValue}>22 min - R$200</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionText}>Normal</Text>
                <Text style={styles.optionValue}>120 min - R$100</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomContainer}>
        <Text style={styles.bottomTitle}>Mais Pesquisadas/Clique Rápido</Text>
        <ScrollView horizontal={true} style={styles.searchContainer}>
          <TouchableOpacity
            style={[styles.searchButton, selectedSearch && styles.selectedSearch]}
            onPress={() => {
              setSituacao("Trocar Pneu");
              setModalVisible(true);
            }}
          >
            <Icon name="car" size={50} color="white" style={styles.icon} />
            <Text style={styles.searchButtonText}>Trocar Pneu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.searchButton, selectedSearch && styles.selectedSearch]}
            onPress={() => {
              setSituacao("Falta de bateria");
              setModalVisible(true);
            }}
          >
            <Icon name="battery-empty" size={50} color="white" style={styles.icon} />
            <Text style={styles.searchButtonText}>Bateria</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.searchButton, selectedSearch && styles.selectedSearch]}
            onPress={() => {
              setSituacao("Problema com motor");
              setModalVisible(true);
            }}
          >
            <Icon name="gear" size={50} color="white" style={styles.icon} />
            <Text style={styles.searchButtonText}>Motor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.searchButton, selectedSearch && styles.selectedSearch]}
            onPress={() => {
              setSituacao("Falta de gasolina");
              setModalVisible(true);
            }}
          >
            <Icon name="car" size={50} color="white" style={styles.icon} />
            <Text style={styles.searchButtonText}>Gasolina</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.searchButton, selectedSearch && styles.selectedSearch]}
            onPress={() => {
              setSituacao("Preciso de um chaveiro");
              setModalVisible(true);
            }}
          >
            <Icon name="key" size={50} color="white" style={styles.icon} />
            <Text style={styles.searchButtonText}>Chaveiro</Text>
          </TouchableOpacity>
          {/* Adicione mais opções conforme necessário */}
        </ScrollView>
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
  inputContainer: {
    position: 'absolute',
    top: 70,
    width: '80%',
    backgroundColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 5,
  },
  input: {
    height: 40,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '100%',
    marginBottom: 30,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: 'black',
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
  },
  closeButtonText: {
    color: 'white',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
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
    marginTop: 5,
  },
  searchButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    height: 90,
    width: 'auto',
    borderRadius: 5,
    marginRight: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'black',
    textAlign: 'center',
    flex: 1,
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
  profileImager: {
    textAlign: "center",
    fontSize: 20,
    color: 'white',
    backgroundColor: 'black',
    left:-30,
    width: 130,
    height: 30,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  profileImage: {
    backgroundColor: 'black',
    width: 130,
    height: 30,
    borderRadius: 25,
    marginHorizontal: 10,
  },
});

export default PrincipalUsuario;
