import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// HOC fonksiyonu: WrappedComponent'in etrafında bir "loading" durumu sarar
const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    // Eğer yükleme durumu varsa sadece "Loading" gösterecek
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }
    
    // Yükleme durumu yoksa WrappedComponent'i (orijinal bileşen) gösterilecek
    return <WrappedComponent {...props} />;
  };
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default withLoading;
