import {StyleSheet, Text, View, TextInput, TextStyle, ViewStyle} from 'react-native';
import {useFormikContext, FormikValues} from 'formik';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type InputProps = {
  label: string;
  name: string;
  style?: TextStyle | ViewStyle; // Accepting custom style
};

const Input = ({label, name, style}: InputProps) => {
  const {values, handleChange, handleBlur, errors, touched} = useFormikContext<FormikValues>();

  return (
    <View style={styles.ip1}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={values[name]} // Access value dynamically using the name prop
        onChangeText={handleChange(name)} // Handle change dynamically
        onBlur={handleBlur(name)} // Handle blur dynamically
        style={[styles.input, style]} // Apply default and custom style
        placeholder="Type here"
      />
      {touched[name] && errors[name] ? (
        <Text style={{color: 'red', fontSize: wp(4), marginLeft: wp(2)}}>
          {`${errors[name]}`}
        </Text>
      ) : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  ip1: {
    gap: hp(1),
    marginTop: hp(2),
    marginHorizontal: wp(3),
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    padding: wp(2.1),
    backgroundColor: '#FAFAFA',
    borderRadius: wp(2.5),
    paddingLeft: wp(4),
    color: 'black',
  },
});
