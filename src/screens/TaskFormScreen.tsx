import React, { useState, useLayoutEffect } from "react";
import { View, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { FormInput, Button } from "../components/Shared";
import { useTasks } from "../../context/TaskContext";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "TaskForm">;

export const TaskFormScreen = ({ navigation, route }: Props) => {
  const { taskId } = route.params;
  const { addTask, updateTask, getTaskById } = useTasks();

  const existingTask = taskId ? getTaskById(taskId) : null;
  const isEditing = !!existingTask;

  const [title, setTitle] = useState(existingTask?.title || "");
  const [description, setDescription] = useState(
    existingTask?.description || ""
  );
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Task" : "Add Task",
    });
  }, [navigation, isEditing]);

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError("Title is required");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (!description.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    if (isEditing && taskId) {
      updateTask(taskId, title.trim(), description.trim());
      navigation.goBack();
      Toast.show({
        type: "success",
        text1: "Task Updated",
        text2: "Your task has been updated successfully",
      });
    } else {
      addTask(title.trim(), description.trim());
      navigation.goBack();
      Toast.show({
        type: "success",
        text1: "Task Created",
        text2: "Your task has been created successfully",
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <FormInput
          label="Title"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            if (titleError) setTitleError("");
          }}
          placeholder="Enter task title"
          error={titleError}
        />

        <FormInput
          label="Description"
          value={description}
          onChangeText={(text) => {
            setDescription(text);
            if (descriptionError) setDescriptionError("");
          }}
          placeholder="Enter task description"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          error={descriptionError}
        />

        <View className="gap-3 mt-4">
          <Button
            title={isEditing ? "Update Task" : "Create Task"}
            variant="primary"
            onPress={handleSave}
          />
          <Button
            title="Cancel"
            variant="outline"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </ScrollView>
  );
};
