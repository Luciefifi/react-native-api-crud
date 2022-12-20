import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../GloabalStylesheet";
import { Formik } from "formik";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 60,
        alignItems: "center",
      }}
    >
      <View style={styles.boxContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>LOGIN</Text>
      </View>
      <View style={styles.boxContainer}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values, { resetForm }) => {
            axios({
              method: "post",
              url: "https://0ab1-105-178-112-73.eu.ngrok.io/api/login",
              data: {
                email: values.email,
                password: values.password,
              },
            })
              .then((response) => {
                if (response.status === 200) {
                  const storeData = async () => {
                    try {
                      const JSONvalue = JSON.stringify(response.data.user);
                      const token = response.data.token;
                      await AsyncStorage.setItem("@user", JSONvalue);
                      await AsyncStorage.setItem("@token", token);
                    } catch (e) {
                      console.log(e);
                    }
                  };
                  const getData = async () => {
                    try {
                      const token = await AsyncStorage.getItem("@token");
                      navigation.navigate("Home", { token });
                    } catch (e) {
                      console.log(e);
                    }
                  };
                  storeData();
                  getData();
                }
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
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email"
                style={{
                  borderBottomWidth: 0.7,
                  width: 250,
                  marginBottom: 10,
                  fontSize: 15,
                  color: "black",
                }}
              />
              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="********"
                secureTextEntry={true}
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
                  bg="chocolate"
                  iconName="login"
                  width={100}
                  text="Login"
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
          NOT REGISTERED?
        </Text>
        <CustomButton
          bg="#00719c"
          text="REGISTER"
          width={200}
          iconName="add-user"
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </View>
  );
}
