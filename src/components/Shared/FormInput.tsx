import React from "react";
import { TextInput, View, Text, TextInputProps } from "react-native";

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const FormInput = ({ label, error, ...props }: FormInputProps) => {
  return (
    <View className="mb-4">
      <Text className="text-textPrimary font-medium mb-1 text-sm">{label}</Text>
      <TextInput
        className={`bg-surface border rounded-lg p-3 text-base text-textPrimary ${
          error ? "border-danger" : "border-gray-300"
        }`}
        placeholderTextColor="#94a3b8"
        {...props}
      />
      {error ? <Text className="text-danger text-xs mt-1">{error}</Text> : null}
    </View>
  );
};
