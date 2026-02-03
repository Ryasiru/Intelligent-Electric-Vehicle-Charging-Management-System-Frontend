// src/components/StationCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const StationCard = ({
  name,
  address,
  availableSlots,
  totalSlots,
  distance,
  price,
  fastChargers,
  slowChargers,
  onPress,
  isSelected = false,
  showDistance = true,
  showPricing = true,
  ...props
}) => {
  const availabilityPercentage = (availableSlots / totalSlots) * 100;
  
  const getAvailabilityColor = () => {
    if (availabilityPercentage >= 50) return '#4CAF50';
    if (availabilityPercentage >= 25) return '#FF9800';
    return '#FF3B30';
  };

  const getAvailabilityText = () => {
    if (availabilityPercentage >= 50) return 'Available';
    if (availabilityPercentage >= 25) return 'Limited';
    return 'Busy';
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      {...props}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.address} numberOfLines={1}>
            {address}
          </Text>
        </View>
        
        <View style={[
          styles.availabilityBadge,
          { backgroundColor: `${getAvailabilityColor()}20` }
        ]}>
          <Text style={[
            styles.availabilityText,
            { color: getAvailabilityColor() }
          ]}>
            {availableSlots}/{totalSlots} {getAvailabilityText()}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          {showDistance && (
            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="map-marker-distance"
                size={16}
                color="#666666"
              />
              <Text style={styles.detailText}>{distance}</Text>
            </View>
          )}
          
          {showPricing && (
            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="cash"
                size={16}
                color="#666666"
              />
              <Text style={styles.detailText}>{price}</Text>
            </View>
          )}
          
          <View style={styles.detailItem}>
            <MaterialCommunityIcons
              name="flash"
              size={16}
              color="#FF9800"
            />
            <Text style={styles.detailText}>{fastChargers} fast</Text>
          </View>
          
          <View style={styles.detailItem}>
            <MaterialCommunityIcons
              name="battery-charging"
              size={16}
              color="#2196F3"
            />
            <Text style={styles.detailText}>{slowChargers} slow</Text>
          </View>
        </View>
      </View>

      <View style={styles.availabilityBar}>
        <View
          style={[
            styles.availabilityFill,
            {
              width: `${availabilityPercentage}%`,
              backgroundColor: getAvailabilityColor(),
            }
          ]}
        />
      </View>

      <View style={styles.actionContainer}>
        <Text style={styles.bookingText}>
          Tap to book charging slot
        </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color="#2E64FE"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedContainer: {
    borderColor: '#2E64FE',
    borderWidth: 2,
    backgroundColor: '#F0F7FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#666666',
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  details: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  availabilityBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  availabilityFill: {
    height: '100%',
    borderRadius: 2,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookingText: {
    fontSize: 14,
    color: '#2E64FE',
    fontWeight: '500',
  },
});

export default StationCard;