import { View, Text, TextInput } from "react-native";
import React from "react";
import { styles } from "../GloabalStylesheet";
import { Formik } from "formik";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUp({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 60,
        alignItems: "center",
      }}
    >
      <View style={styles.boxContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>SIGN UP</Text>
      </View>
      <View style={styles.boxContainer}>
        <Formik
          initialValues={{
            email: "",
            name: "",
            password: "",
            phone: "",
          }}
          onSubmit={(values, { resetForm }) => {
            axios({
              method: "post",
              url: "https://0ab1-105-178-112-73.eu.ngrok.io/api/signup",
              data: {
                name: values.name,
                password: values.password,
                phone: values.phone,
                email: values.email,
              },
            })
              .then((response) => {
                if (response.status === 201) {
                  const storeData = async () => {
                    try {
                      let JSONvalue = JSON.stringify(response.data.user);
                      await AsyncStorage.setItem("@user", JSONvalue);
                      await AsyncStorage.setItem("@token", response.data.token);
                      navigation.navigate("Home");
                    } catch (e) {
                      console.log(e);
                    }
                  };
                  storeData();
                }
              })
              .catch((e) => console.log(e));
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
                placeholder="Name"
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
              <TextInput
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                placeholder="Phone number"
                style={{
                  borderBottomWidth: 0.7,
                  width: 250,
                  marginBottom: 10,
                  fontSize: 15,
                  color: "black",
                }}
              />
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
          ALREADY REGISTERED?
        </Text>
        <CustomButton
          bg="chocolate"
          text="LOGIN"
          width={200}
          iconName="login"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
}
