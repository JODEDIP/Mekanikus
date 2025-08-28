import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Image } from "react-native";
import { styles } from "./style";
import {router} from "expo-router";
export default function App() {
  const [showPopup, setShowPopup] = useState(false);

    function NextPage()
    {
        router.navigate("/EmailValidate");

    }



  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Insere o teu número</Text>

      {/* Campo de número de telefone */}
      <TouchableOpacity onPress={() => setShowPopup(true)} style={styles.phoneInput}>
        <Image
          source={{ uri: "https://flagcdn.com/w40/ao.png" }} // Bandeira de Angola
          style={styles.flag}
        />
        <Text style={styles.phoneText}>+244</Text>
      </TouchableOpacity>

      {/* Texto divisor */}
      <Text style={styles.orText}>Ou</Text>

      {/* Botão Google */}
      <TouchableOpacity style={styles.googleBtn}>
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" }}
          style={styles.icon}
        />
        <Text style={styles.btnText}>Entrar com o Google</Text>
      </TouchableOpacity>

      {/* Botão Email */}
      <TouchableOpacity style={styles.emailBtn} onPress={NextPage}>
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Mail_%28iOS%29.svg" }}
          style={styles.icon}
        />
        <Text style={styles.btnText}>Entrar com o E-mail</Text>
      </TouchableOpacity>

      {/* Texto de Termos */}
      <Text style={styles.footer}>
        Ao registar-te, estás a aceitar os nossos{" "}
        <Text style={styles.link}>Termos & Condições</Text>, a reconhecer a nossa{" "}
        <Text style={styles.link}>Política de Privacidade</Text> e a confirmar que tens mais de 18 anos.
        Podemos enviar ofertas relacionadas com os nossos serviços. Podes cancelar a subscrição a qualquer altura nas "Preferências de comunicação" no teu perfil da app.
      </Text>

      {/* Pop-up interativo */}
      <Modal transparent visible={showPopup} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              O cadastramento com número de telemóvel estará disponível em breve.
            </Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowPopup(false)}>
              <Text style={styles.closeBtnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


