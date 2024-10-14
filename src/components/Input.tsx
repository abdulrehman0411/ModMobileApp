import {Text, View, TextInput} from 'react-native';
import {useFormikContext, FormikValues} from 'formik';
import React from 'react';

type InputProps = {
  label: string;
  name: string;
};

const Input = ({label, name}: InputProps) => {
  const {values, handleChange, handleBlur, errors, touched} =
    useFormikContext<FormikValues>();

  return (
    <View className=" mt-3 mx-3">
      <Text className="text-white font-bold mb-2">{label}</Text>
      <TextInput
        value={values[name]}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        className="bg-[#FAFAFA] p-2 mx-1 pl-4 text-black rounded-lg"
        placeholder="Type here"
      />
      {touched[name] && errors[name] ? (
        <Text className="text-red-600 text-base pl-1">{`${errors[name]}`}</Text>
      ) : null}
    </View>
  );
};

export default Input;
