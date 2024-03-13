import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Modal, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import getWeatherData from './getWeatherData';

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

  const [catchthewaves, setCatchthewaves] = useState(false);
  const [timer, setTimer] = useState(0);
  const [situacao, setSituacao] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState('');
  const [selectedTime, setSelectedTime] = useState(0); 
  const [weatherData, setWeatherData] = useState(null);
  const [pedidoValor, setPedidoValor] = useState(0); 
  const [valor, setValor] = useState(0);

  const enviarDadosParaAPI = async (dados) => {
    try {
      const response = await fetch('https://json-nav-soss-six.vercel.app/Solicitacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });
  
      if (response.ok) {
        const data = await response.json(); // Parse somente se a resposta for válida em JSON
        console.log('Resposta da API:', data);
      } else {
        const textResponse = await response.text(); // Se a resposta não for válida em JSON, leia como texto
        console.log('Resposta da API:', textResponse);
      }
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
    }
  };
  
  const idAleatorio = Math.floor(Math.random() * 101);
  const dadosParaEnviar = {
    "id":idAleatorio,
    "Valor": valor,
    "OquePrecisa": situacao
  };
  
 
  

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeatherData('Niterói');
        console.log('Dados climáticos recebidos:', data); 
        setWeatherData(data);
        const rate = calculateRate(data?.weather[0]?.description);
        setPedidoValor(rate);
      } catch (error) {
        console.error('Erro ao obter dados do clima:', error);
      }
    };
    fetchWeatherData();
  }, []);

  const handleOKPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSituacao("");
  };

  const closeModalCatch = () => {
    setTimer(0);
    setSelectedTime(0);
    setCatchthewaves(false);
  };

  const toggleModal = (time,valore) => {
    setValor(parseFloat(valore)); 
    setSelectedTime(time);
    enviarDadosParaAPI(dadosParaEnviar);
    setTimeout(() => {
      setCatchthewaves(true);
    }, 1000);
  };

  useEffect(() => {
    let interval;
    if (catchthewaves) {
      const intervalDuration = 1000; 
      setTimer(selectedTime * 60); 
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, intervalDuration);
    } else {
      clearInterval(interval);
      setTimer(0); 
    }
    return () => clearInterval(interval);
  }, [catchthewaves, selectedTime]);

  const filteredWeatherData = weatherData?.weather.filter(condition =>
    ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Thunderstorm', 'Snow', 'Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado'].includes(condition.description)
);

const calculateRate = (description) => {
  if (!weatherData || !weatherData.weather || weatherData.weather.length === 0) {
    return 3; // Retorna 3 se não houver dados climáticos
  }

  switch(description) {
    case 'clear sky':
      return 10; // Retorna 10 para condição de céu limpo
    case 'light rain':
    case 'moderate rain':
    case 'heavy intensity rain':
    case 'very heavy rain':
    case 'extreme rain':
      return 5; // Retorna 5 para condição de chuva
    case 'few clouds':
    case 'scattered clouds':
    case 'broken clouds':
    case 'overcast clouds':
      return 7; // Retorna 7 para condição de nuvens
    case 'light intensity drizzle':
    case 'drizzle':
    case 'heavy intensity drizzle':
    case 'light intensity drizzle rain':
    case 'drizzle rain':
    case 'heavy intensity drizzle rain':
    case 'shower rain and drizzle':
    case 'heavy shower rain and drizzle':
    case 'shower drizzle':
      return 4; // Retorna 4 para condição de chuvisco
    case 'thunderstorm with light rain':
    case 'thunderstorm with rain':
    case 'thunderstorm with heavy rain':
    case 'light thunderstorm':
    case 'thunderstorm':
    case 'heavy thunderstorm':
    case 'ragged thunderstorm':
    case 'thunderstorm with light drizzle':
    case 'thunderstorm with drizzle':
    case 'thunderstorm with heavy drizzle':
      return 6; // Retorna 6 para condição de tempestade
    case 'light snow':
    case 'snow':
    case 'heavy snow':
    case 'sleet':
    case 'shower sleet':
    case 'light rain and snow':
    case 'rain and snow':
    case 'light shower snow':
    case 'shower snow':
    case 'heavy shower snow':
      return 8; // Retorna 8 para condição de neve
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'sand/ dust whirls':
    case 'fog':
    case 'sand':
    case 'dust':
    case 'volcanic ash':
    case 'squalls':
    case 'tornado':
      return 3; // Retorna 3 para outras condições de clima
    default:
      return 3; // Retorna 3 para outras condições de clima
  }
};


  
  const rate = calculateRate(weatherData?.weather[0].description);
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

      <Modal animationType="slide" transparent={true} visible={catchthewaves} onRequestClose={closeModalCatch}>
        <View style={styles.modalContentV}>
          <Text style={styles.modalTextV}>Profissional solicitado: Vagner Dom</Text>
          <Text style={styles.modalTextV}>Cronômetro: {timer} segundos</Text>
          <TouchableOpacity style={styles.closeButtonV} onPress={closeModalCatch}>
            <Text style={styles.closeButtonTextV}>Cancelar profissional</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Valor do Pedido: {situacao}</Text>

            <View style={styles.optionContainer}>
              <TouchableOpacity style={styles.optionButton} onPress={() => toggleModal(12,(12 * rate).toFixed(2))}>
                <Text style={styles.optionText}>Rápido</Text>
                <Text style={styles.optionValue}>12 min - R${(12 * rate).toFixed(2)}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.optionButton} onPress={() => toggleModal(30,(30 * rate).toFixed(2))}>
                <Text style={styles.optionText}>Normal</Text>
                <Text style={styles.optionValue}>30 min - R${(30 * rate).toFixed(2)}</Text>
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
    backgroundColor: '#1F1F1F', // Fundo escuro
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  inputContainer: {
    position: 'absolute',
    top: 70,
    width: '80%',
    backgroundColor: '#2D2D2D', // Cor mais escura
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 8,
  },

  input: {
    height: 40,
    color: '#FFFFFF', // Texto branco
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo escuro com transparência
  },

  modalContent: {
    backgroundColor: '#353535', // Cor mais escura
    padding: 20,
    borderRadius: 20,
    elevation: 8,
    width: '100%',
    marginBottom: 30,
  },

  modalText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#FFFFFF', // Texto branco
  },

  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  optionButton: {
    backgroundColor: '#FF6F61', // Cor laranja vibrante
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },

  optionText: {
    color: '#FFFFFF', // Texto branco
    marginBottom: 5,
  },

  optionValue: {
    color: '#FFFFFF', // Texto branco
  },

  closeButton: {
    marginTop: 20,
    backgroundColor: '#FF6F61', // Cor laranja vibrante
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#FFFFFF', // Texto branco
    fontSize: 16,
    fontWeight: 'bold',
  },

  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
    backgroundColor: '#2D2D2D', // Cor mais escura
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 8,
  },

  bottomTitle: {
    color: '#FFFFFF', // Texto branco
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  searchContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },

  searchButton: {
    backgroundColor: '#a32c28', // Cor amarela vibrante
    padding: 20,
    height: 120,
    width: 'auto',
    borderRadius: 15,
    marginRight: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },

  searchButtonText: {
    color: '#353535', // Texto escuro
    textAlign: 'center',
    flex: 1,
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },

  selectedSearch: {
    backgroundColor: '#1F1F1F', // Fundo escuro
  },

  profileContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },

  profileImager: {
    textAlign: "center",
    fontSize: 20,
    color: '#FFFFFF', // Texto branco
    backgroundColor: '#2D2D2D', // Cor mais escura
    marginLeft: -40,
    width: 150,
    height: 40,
    borderRadius: 25,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {
    backgroundColor: '#2D2D2D', // Cor mais escura
    width: 150,
    height: 40,
    borderRadius: 25,
    marginLeft: 150,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContentV: {
    backgroundColor: '#353535', // Cor mais escura
    padding: 20,
    borderRadius: 15,
    elevation: 8,
    width: '70%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: 120,
    marginBottom: 30,
  },

  modalTitleV: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFFFFF', // Texto branco
  },

  modalTextV: {
    fontSize: 18,
    marginBottom: 15,
    color: '#FFFFFF', // Texto branco
  },

  closeButtonV: {
    marginTop: 25,
    backgroundColor: '#FF6F61', // Cor laranja vibrante
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  closeButtonTextV: {
    color: '#FFFFFF', // Texto branco
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PrincipalUsuario;
