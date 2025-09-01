import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, FlatList, StyleSheet, Modal } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

export default function Home() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "90%"], []);

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  const [selectedCar, setSelectedCar] = useState<any | null>(null); // carro clicado
  const [carModalVisible, setCarModalVisible] = useState(false);

  // Mock dos carros
  const cars = [
    { id: "1", image: "https://via.placeholder.com/200x100.png?text=Carro+1", name: "Toyota Corolla", plate: "LD-45-23-AA" },
    { id: "2", image: "https://via.placeholder.com/200x100.png?text=Carro+2", name: "Hyundai i10", plate: "LG-22-11-BB" },
  ];

  // Serviços fixos
  const services = [
    { id: "1", name: "Pneu furado", price: "5.000 Kz" },
    { id: "2", name: "Bateria descarregada", price: "7.000 Kz" },
    { id: "3", name: "Problema nos travões", price: "10.000 Kz" },
  ];

  // Abrir Bottom Sheet
  const handleOpenHelp = (service?: { name: string; price: string }) => {
    if (service) {
      setSelectedService(service.name);
      setPrice(service.price);
    } else {
      setSelectedService(null);
      setPrice(null);
    }
    bottomSheetRef.current?.expand();
  };

  // Selecionar imagem
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Pegar localização
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão negada para acessar localização");
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    setLocation(`Lat: ${loc.coords.latitude}, Lon: ${loc.coords.longitude}`);
  };

  // Abrir modal de carro
  const openCarDetails = (car: any) => {
    setSelectedCar(car);
    setCarModalVisible(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      {/* Header */}
      <Text style={{ fontSize: 28, fontWeight: "bold", color: "green" }}>Mekanikus</Text>
      <Text style={{ color: "blue", marginBottom: 20 }}>Trabalhar na Mekanikus</Text>

      {/* Carrossel de Carros */}
      <FlatList
        data={[...cars, { id: "add", image: null }]}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          item.image ? (
            <TouchableOpacity style={styles.carCard} onPress={() => openCarDetails(item)}>
              <Image source={{ uri: item.image }} style={{ width: 200, height: 100, borderRadius: 10 }} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.addCard}>
              <Text style={{ fontSize: 20, color: "green" }}>+ Adicione um veículo</Text>
            </TouchableOpacity>
          )
        }
      />

      {/* Botão pedir ajuda */}
      <TouchableOpacity style={styles.helpButton} onPress={() => handleOpenHelp()}>
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Pedir ajuda</Text>
      </TouchableOpacity>

      {/* Serviços Fixos */}
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Serviços Fixos</Text>
      {services.map((s) => (
        <TouchableOpacity key={s.id} style={styles.serviceCard} onPress={() => handleOpenHelp(s)}>
          <Text>{s.name}</Text>
          <Text style={{ color: "green" }}>{s.price}</Text>
        </TouchableOpacity>
      ))}

      {/* Bottom Sheet para pedir ajuda */}
      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints}>
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Pedir Ajuda</Text>
          {selectedService && (
            <Text style={{ marginBottom: 10 }}>
              Serviço: <Text style={{ fontWeight: "bold" }}>{selectedService}</Text> ({price})
            </Text>
          )}
          <TextInput
            placeholder="Descreva o problema"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            multiline
          />

          <TouchableOpacity style={styles.smallBtn} onPress={pickImage}>
            <Text style={{ color: "#fff" }}>Adicionar Foto</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, marginVertical: 10 }} />}

          <TouchableOpacity style={styles.smallBtn} onPress={getLocation}>
            <Text style={{ color: "#fff" }}>Obter Localização</Text>
          </TouchableOpacity>
          {location && <Text style={{ marginTop: 5 }}>{location}</Text>}

          <TouchableOpacity style={[styles.helpButton, { marginTop: 20 }]}>
            <Text style={{ color: "#fff", fontSize: 16 }}>Confirmar Pedido</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      {/* Modal de Detalhes do Carro */}
      <Modal visible={carModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedCar && (
              <>
                <Image source={{ uri: selectedCar.image }} style={{ width: "100%", height: 150, borderRadius: 10 }} />
                <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>{selectedCar.name}</Text>
                <Text style={{ fontSize: 16, color: "gray" }}>{selectedCar.plate}</Text>

                <TouchableOpacity style={[styles.smallBtn, { marginTop: 20 }]}>
                  <Text style={{ color: "#fff" }}>Editar Carro</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.smallBtn, { backgroundColor: "red", marginTop: 10 }]}>
                  <Text style={{ color: "#fff" }}>Remover Carro</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.smallBtn, { backgroundColor: "gray", marginTop: 20 }]}
                  onPress={() => setCarModalVisible(false)}
                >
                  <Text style={{ color: "#fff" }}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  carCard: {
    marginRight: 10,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
  },
  addCard: {
    marginRight: 10,
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  helpButton: {
    marginTop: 20,
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  serviceCard: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    textAlignVertical: "top",
  },
  smallBtn: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
});
