import Colors from "@/utils/Colors";
import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Loader } from "./ui/Loader";
import { AnimatedLogoApp } from "./ui/AnimatedLogoApp";

export const LoadingIndicator = memo(() => {
  return (
    <View style={styles.container}>
      <View style={styles.dialogContainer}>
        <AnimatedLogoApp size="lg" />
        <Text style={styles.title}>Contacts</Text>
        <Text style={styles.subtitle}>Stay connected with everyone</Text>
      </View>
      <Loader text=" Loading Hangout App" />
    </View>
  );
});

const styles = StyleSheet.create({
  dialogContainer: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background.screen,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  card: {
    width: 128,
    height: 128,
    borderRadius: 24,
    backgroundColor: Colors.primary.orange[100],
    borderWidth: 2,
    borderColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  title: {
    paddingTop: 20,
    fontSize: 32,
    fontFamily: "Baloo2-Bold",
    color: Colors.black,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Baloo2-SemiBold",
    color: Colors.text.gray,
    marginBottom: 24,
  },
});
