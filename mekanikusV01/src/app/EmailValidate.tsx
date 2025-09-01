import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);

  const handleNext = () => {
    if (step === "email") {
      console.log("Email inserido:", email);
      // Aqui pode chamar o Supabase para enviar o código
      setStep("code");
    } else {
      console.log("Código inserido:", code.join(""));
      // Aqui pode validar o código
      router.navigate("./cadastro");
    }
  };

  const handleBack = () => {
    if (step === "code") {
      setStep("email");
    } else {
      router.back();
    }
  };

  const handleCodeChange = (value: string, index: number) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backText}>◀ Voltar</Text>
      </TouchableOpacity>

      {step === "email" ? (
        <>
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
        </>
      ) : (
        <>
          <Text style={styles.label}>Digite o código de verificação:</Text>
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.codeInput}
                value={digit}
                onChangeText={(value) => handleCodeChange(value, index)}
                keyboardType="numeric"
                maxLength={1}
              />
            ))}
          </View>
          <TouchableOpacity>
            <Text style={styles.resendText}>Reenviar código</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleNext} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Prosseguir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", padding: 20 },
  label: { fontSize: 18, fontWeight: "bold", alignSelf: "flex-start", marginBottom: 8 },
  backButton: { position: "absolute", top: 40, left: 20, padding: 5 },
  backText: { fontSize: 16, color: "blue", fontWeight: "bold" },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 20 },
  codeContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20, width: "100%" },
  codeInput: { width: 45, height: 55, borderWidth: 1, borderColor: "#ccc", borderRadius: 12, textAlign: "center", fontSize: 20 },
  resendText: { color: "blue", marginBottom: 20, fontSize: 16, alignSelf: "center" },
  button: { backgroundColor: "green", paddingVertical: 14, borderRadius: 8, width: "100%", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
