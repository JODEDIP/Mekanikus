import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from 'expo-router';

export default function App() {
  const [email, setEmail] = useState("");

  const handleNext = () =>
    {
    console.log("Email inserido:", email);
    // Aqui podes colocar a navegação ou validação
  };

   const handleBack = () => 
    {
        router.back()
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backText}>◀ Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Email:</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o seu email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleNext} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Prosseguir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  backButton: 
  {
    position: "absolute",
    top: 40, 
    left: 20,
    padding: 5,
  } ,
  backText : 
  {
    fontSize: 16,
    color: "blue",
    fontWeight: "bold",
  } ,

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
