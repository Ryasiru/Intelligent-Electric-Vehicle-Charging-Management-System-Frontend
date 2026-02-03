// src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = ({
  title,
  subtitle,
  showBackButton = false,
  rightIcon,
  onRightPress,
  backgroundColor = '#FFFFFF',
  titleColor = '#333333',
  subtitleColor = '#666666',
  showStatusBar = true,
  statusBarStyle = 'dark-content',
  elevation = 2,
  ...props
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <>
      {showStatusBar && (
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={backgroundColor}
        />
      )}
      
      <View
        style={[
          styles.container,
          { backgroundColor },
          elevation > 0 && styles.shadow,
          { elevation: elevation || 2 },
        ]}
      >
        <View style={styles.leftContainer}>
          {showBackButton && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color={titleColor}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.titleContainer}>
          {title && (
            <Text
              style={[styles.title, { color: titleColor }]}
              numberOfLines={1}
            >
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              style={[styles.subtitle, { color: subtitleColor }]}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          )}
        </View>

        <View style={styles.rightContainer}>
          {rightIcon && (
            <TouchableOpacity
              style={styles.rightButton}
              onPress={onRightPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialCommunityIcons
                name={rightIcon}
                size={24}
                color={titleColor}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    minHeight: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: 4,
  },
  rightButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default Header;