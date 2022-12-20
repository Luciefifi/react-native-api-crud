import { View, Text, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../GloabalStylesheet";
import { Formik } from "formik";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register({ navigation }) {
  const [token, setToken] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        const tokenGenerated = await AsyncStorage.getItem("@token");
        setToken(tokenGenerated);
        console.log(token);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  });
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 60,
        alignItems: "center",
      }}
    >
      <View style={styles.boxContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          REGISTER NEW ITEM
        </Text>
      </View>
      <View style={styles.boxContainer}>
        <Formik
          initialValues={{
            name: "",
            quantity: "",
            color: "",
            weight: "",
          }}
          onSubmit={(values, { resetForm }) => {
            axios({
              method: "post",
              url: "https://0ab1-105-178-112-73.eu.ngrok.io/api/items",
              data: {
                name: values.name,
                color: values.color,
                weight: values.weight,
                quantity: values.quantity,
              },
              headers: { Authorization: `Bearer ${token}` },
            })
              .then((response) => {
                resetForm();
              })
              .catch((error) => console.log(error));
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            resetForm,
            handleReset,
          }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextInput
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                placeholder="Item name"
                style={{
                  borderBottomWidth: 0.7,
                  width: 250,
                  marginBottom: 10,
                  fontSize: 15,
                  color: "black",
                }}
              />
              <TextInput
                onChangeText={handleChange("color")}
                onBlur={handleBlur("color")}
                value={values.color}
                placeholder="Item color"
                style={{
                  borderBottomWidth: 0.7,
                  width: 250,
                  marginBottom: 10,
                  fontSize: 15,
                  color: "black",
                }}
              />
              <TextInput
                onChangeText={handleChange("quantity")}
                onBlur={handleBlur("quantity")}
                value={values.quantity}
                placeholder="Quantity"
                style={{
                  borderBottomWidth: 0.7,
                  width: 250,
                  marginBottom: 10,
                  fontSize: 15,
                  color: "black",
                }}
              />
              <TextInput
                onChangeText={handleChange("weight")}
                onBlur={handleBlur("weight")}
                value={values.weight}
                placeholder="Weight"
                style={{
                  borderBottomWidth: 0.7,
                  width: 250,
                  marginBottom: 10,
                  fontSize: 15,
                  color: "black",
                }}
              />

              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <CustomButton
                  bg="#00719c"
                  iconName="save"
                  width={100}
                  text="Register"
                  onPress={handleSubmit}
                />
                <CustomButton
                  bg="#7f6000"
                  iconName="flat-brush"
                  width={100}
                  text="Clear"
                  onPress={handleReset}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
      <View style={styles.boxContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>
          DASHBOARD? IT'S THIS WAY
        </Text>
        <CustomButton
          bg="black"
          text="DASHBOARD"
          width={200}
          iconName="back"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </View>
  );
}
