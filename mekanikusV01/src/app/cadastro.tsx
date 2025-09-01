import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import CountryPicker, { Country } from "react-native-country-picker-modal";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

export default function Cadastro() {
  const [step, setStep] = useState<"pessoal" | "veiculo">("pessoal");

  // --- Dados pessoais ---
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState<Country["cca2"]>("AO"); // Angola como default
  const [callingCode, setCallingCode] = useState("244");

  // --- Dados do veículo ---
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cor, setCor] = useState("");
  const [images, setImages] = useState<string[]>([]);

  // Seleção de imagem
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos de acesso à sua galeria!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleNext = () => {
    if (step === "pessoal") {
      // Validação simples
      if (!firstName || !lastName || !phoneNumber) {
        Alert.alert("Erro", "Preencha todos os campos pessoais.");
        return;
      }
      setStep("veiculo");
    } else {
      if (!marca || !modelo || !matricula || !cor) {
        Alert.alert("Erro", "Preencha todos os dados do veículo.");
        return;
      }
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      router.push("/home");
    }
  };

  return (
    <View style={styles.container}>
      {step === "pessoal" ? (
        <>
          <Text style={styles.title}>Dados Pessoais</Text>
          <TextInput
            style={styles.input}
            placeholder="Primeiro Nome"
            placeholderTextColor="#999"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Último Nome"
            placeholderTextColor="#999"
            value={lastName}
            onChangeText={setLastName}
          />
          <View style={styles.phoneRow}>
            <CountryPicker
              countryCode={countryCode}
              withFilter
              withFlag
              withCallingCode
              withEmoji
              onSelect={(country) => {
                setCountryCode(country.cca2);
                setCallingCode(country.callingCode[0]);
              }}
            />
            <Text style={styles.callingCode}>+{callingCode}</Text>
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Número de telefone"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>Dados do Veículo</Text>
          <TextInput
            style={styles.input}
            placeholder="Marca"
            placeholderTextColor="#999"
            value={marca}
            onChangeText={setMarca}
          />
          <TextInput
            style={styles.input}
            placeholder="Modelo"
            placeholderTextColor="#999"
            value={modelo}
            onChangeText={setModelo}
          />
          <TextInput
            style={styles.input}
            placeholder="Matrícula"
            placeholderTextColor="#999"
            value={matricula}
            onChangeText={setMatricula}
          />
          <TextInput
            style={styles.input}
            placeholder="Cor"
            placeholderTextColor="#999"
            value={cor}
            onChangeText={setCor}
          />

          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>Adicionar Imagem</Text>
          </TouchableOpacity>
          <View style={styles.imagePreview}>
            {images.map((uri, index) => (
              <Image
                key={index}
                source={{ uri }}
                style={{ width: 70, height: 70, borderRadius: 10, margin: 5 }}
              />
            ))}
          </View>
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Prosseguir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "green",
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  callingCode: {
    fontSize: 16,
    marginHorizontal: 8,
    color: "#333",
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  imageButtonText: {
    color: "white",
    fontSize: 16,
  },
  imagePreview: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
});
