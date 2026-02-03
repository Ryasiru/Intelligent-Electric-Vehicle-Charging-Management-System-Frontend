// src/components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Button = ({
  title,
  onPress,
  style,
  textStyle,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'danger':
        return styles.danger;
      case 'success':
        return styles.success;
      case 'outline':
        return styles.outline;
      case 'ghost':
        return styles.ghost;
      default:
        return styles.primary;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'medium':
        return styles.medium;
      case 'large':
        return styles.large;
      default:
        return styles.medium;
    }
  };

  const getVariantTextStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'danger':
        return styles.dangerText;
      case 'success':
        return styles.successText;
      case 'outline':
        return styles.outlineText;
      case 'ghost':
        return styles.ghostText;
      default:
        return styles.primaryText;
    }
  };

  const getSizeTextStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallText;
      case 'medium':
        return styles.mediumText;
      case 'large':
        return styles.largeText;
      default:
        return styles.mediumText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyle(),
        getSizeStyle(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'primary' || variant === 'danger' || variant === 'success'
              ? '#FFFFFF'
              : '#2E64FE'
          }
          size="small"
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <MaterialCommunityIcons
              name={icon}
              size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
              style={[styles.icon, styles.iconLeft]}
              color={
                variant === 'outline' || variant === 'ghost'
                  ? '#2E64FE'
                  : variant === 'primary' || variant === 'danger' || variant === 'success'
                  ? '#FFFFFF'
                  : '#333333'
              }
            />
          )}
          <Text style={[styles.text, getVariantTextStyle(), getSizeTextStyle(), textStyle]}>
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <MaterialCommunityIcons
              name={icon}
              size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
              style={[styles.icon, styles.iconRight]}
              color={
                variant === 'outline' || variant === 'ghost'
                  ? '#2E64FE'
                  : variant === 'primary' || variant === 'danger' || variant === 'success'
                  ? '#FFFFFF'
                  : '#333333'
              }
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  // Variant styles
  primary: {
    backgroundColor: '#2E64FE',
  },
  secondary: {
    backgroundColor: '#E3F2FD',
  },
  danger: {
    backgroundColor: '#FF3B30',
  },
  success: {
    backgroundColor: '#4CAF50',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2E64FE',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  // Size styles
  small: {
    height: 36,
    paddingHorizontal: 12,
  },
  medium: {
    height: 48,
    paddingHorizontal: 20,
  },
  large: {
    height: 56,
    paddingHorizontal: 24,
  },
  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#1976D2',
  },
  dangerText: {
    color: '#FFFFFF',
  },
  successText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#2E64FE',
  },
  ghostText: {
    color: '#2E64FE',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  // Icon styles
  icon: {
    marginHorizontal: 4,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  // Disabled state
  disabled: {
    opacity: 0.6,
  },
});

export default Button;