import { View, Text, TextInput, Button } from "react-native";
import React, { useEffect } from "react";
import { styles } from "../GloabalStylesheet";
import { Formik } from "formik";
import CustomButton from "../components/CustomButton";
import axios from "axios";

export default function Update({ navigation, route }) {
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
          UPDATE ITEM DETAILS
        </Text>
      </View>
      <View style={styles.boxContainer}>
        <Formik
          initialValues={{
            name: route.params.name,
            quantity: route.params.quantity,
            color: route.params.color,
            weight: route.params.weight,
          }}
          onSubmit={(values, { resetForm }) => {
            let URL = `https://0ab1-105-178-112-73.eu.ngrok.io/api/items/${route.params.id}`;
            axios({
                method:'put',
                url: URL,
                data: {
                  name: values.name,
                  quantity: values.quantity,
                  color: values.color,
                  weight: values.weight,
                },
                headers: { Authorization: `Bearer ${route.params.token}` },
              })
              .then((response) => {
                console.log(response.status);
                // navigation.navigate("Home");
              })
              .catch((e) => console.log(e));
            console.log(URL);
            // navigation.navigate("Home");
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
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
                  text="Update"
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
