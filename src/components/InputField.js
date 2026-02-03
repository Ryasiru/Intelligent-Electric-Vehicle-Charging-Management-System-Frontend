// src/components/InputField.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  icon,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
          !editable && styles.inputContainerDisabled,
        ]}
      >
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={error ? '#FF3B30' : isFocused ? '#2E64FE' : '#666666'}
            style={styles.icon}
          />
        )}
        
        <TextInput
          style={[
            styles.input,
            multiline && styles.multilineInput,
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999999"
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#666666"
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
      
      {maxLength && (
        <Text style={styles.charCount}>
          {value?.length || 0}/{maxLength}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputContainerFocused: {
    borderColor: '#2E64FE',
    backgroundColor: '#FFFFFF',
    shadowColor: '#2E64FE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputContainerError: {
    borderColor: '#FF3B30',
  },
  inputContainerDisabled: {
    backgroundColor: '#F5F5F5',
    opacity: 0.7,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: Platform.OS === 'ios' ? 44 : 48,
    fontSize: 16,
    color: '#333333',
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },
  multilineInput: {
    height: 'auto',
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 4,
    marginLeft: 4,
  },
  charCount: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'right',
    marginTop: 4,
  },
});

export default InputField;