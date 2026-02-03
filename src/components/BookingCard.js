// src/components/BookingCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BookingCard = ({
  stationName,
  date,
  time,
  duration,
  chargerType,
  status,
  cost,
  bookingId,
  stationAddress,
  onPress,
  onCancel,
  onRate,
  rating,
  showActions = true,
  ...props
}) => {
  const getStatusConfig = () => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return { color: '#4CAF50', icon: 'check-circle', label: 'Confirmed' };
      case 'completed':
        return { color: '#2196F3', icon: 'checkbox-marked-circle', label: 'Completed' };
      case 'cancelled':
        return { color: '#FF3B30', icon: 'close-circle', label: 'Cancelled' };
      case 'pending':
        return { color: '#FF9800', icon: 'clock-time-three', label: 'Pending' };
      case 'active':
        return { color: '#4CAF50', icon: 'play-circle', label: 'Active' };
      default:
        return { color: '#666666', icon: 'circle', label: status };
    }
  };

  const statusConfig = getStatusConfig();
  const isUpcoming = status?.toLowerCase() === 'confirmed' || status?.toLowerCase() === 'pending';
  const isCompleted = status?.toLowerCase() === 'completed';
  const canRate = isCompleted && rating === undefined;

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
      {...props}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.stationName} numberOfLines={1}>
            {stationName}
          </Text>
          {bookingId && (
            <Text style={styles.bookingId}>Booking ID: {bookingId}</Text>
          )}
        </View>
        
        <View style={[
          styles.statusBadge,
          { backgroundColor: `${statusConfig.color}20` }
        ]}>
          <MaterialCommunityIcons
            name={statusConfig.icon}
            size={14}
            color={statusConfig.color}
          />
          <Text style={[styles.statusText, { color: statusConfig.color }]}>
            {statusConfig.label}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="calendar" size={16} color="#666666" />
            <Text style={styles.detailText}>{formatDate(date)}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="clock-outline" size={16} color="#666666" />
            <Text style={styles.detailText}>{time}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <MaterialCommunityIcons
              name={chargerType === 'fast' ? 'flash' : 'battery-charging'}
              size={16}
              color="#666666"
            />
            <Text style={styles.detailText}>
              {chargerType === 'fast' ? 'Fast' : 'Slow'}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="timelapse" size={16} color="#666666" />
            <Text style={styles.detailText}>{duration}h</Text>
          </View>
        </View>

        {stationAddress && (
          <Text style={styles.address} numberOfLines={1}>
            {stationAddress}
          </Text>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.costContainer}>
          <Text style={styles.costLabel}>Total</Text>
          <Text style={styles.cost}>${typeof cost === 'number' ? cost.toFixed(2) : cost}</Text>
        </View>

        {showActions && (
          <View style={styles.actions}>
            {isUpcoming && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onCancel}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            )}
            
            {canRate ? (
              <TouchableOpacity
                style={styles.rateButton}
                onPress={onRate}
              >
                <Text style={styles.rateText}>Rate</Text>
              </TouchableOpacity>
            ) : rating !== undefined && (
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <MaterialCommunityIcons
                    key={star}
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={18}
                    color="#FFD700"
                  />
                ))}
              </View>
            )}
            
            <TouchableOpacity
              style={styles.viewButton}
              onPress={onPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#2E64FE"
              />
            </TouchableOpacity>
          </View>
        )}
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
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  stationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  bookingId: {
    fontSize: 12,
    color: '#666666',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  details: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
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
  address: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  costContainer: {
    alignItems: 'flex-start',
  },
  costLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  cost: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E64FE',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cancelButton: {
    backgroundColor: '#FFF2F2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  cancelText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  rateButton: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  rateText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  viewButton: {
    padding: 4,
  },
});

export default BookingCard;