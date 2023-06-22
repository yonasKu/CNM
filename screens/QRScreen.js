import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  useCameraDevices,
  Camera,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {useSharedValue, useValue} from 'react-native-reanimated';
import {BarcodeFormat, scanBarcodes} from 'vision-camera-code-scanner';
import {windowWidth} from '../utils/dimensions';
import {center} from '@turf/turf';
import {useNavigation} from '@react-navigation/native';
import {getCurrentLocation} from '../utils/helperFunction';
import {fetchRoute} from '../utils/Routeutils';

const QRScreen = () => {
  const categories = ['All', 'Electronics', 'Clothing', 'Books'];
  const [cameraPermission, setCameraPermission] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setscannedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showTravelButton, setShowTravelButton] = useState(false);

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState([39.289615, 8.5641967]);

  useEffect(() => {
    getCurrentLocation()
      .then(location => {
        console.log('Latitude:', location.latitude);
        console.log('Longitude:', location.longitude);
        console.log('Heading:', location.heading);
        setUserLocation([location.longitude, location.latitude]);
      })
      .catch(error => {
        console.error('Error obtaining current location:', error);
        //alert('Error obtaining current location:', error);
      });
  }, []);

  console.log(userLocation);

  const handleRoutePress = async coord => {
    setIsLoading(true);

    if (userLocation.length === 0) {
      alert(
        'Could not fetch your location. Please turn your location on or try again.',
      );
      setIsLoading(false);
      return;
    }

    try {
      // Call fetchRoute with the origin and destination variables
      const route = await fetchRoute(userLocation, coord);
      navigation.navigate('Route', {route});
      console.log(userLocation, coord);
      //console.log(route);
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching the route. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const cameraPermissionStatus = await Camera.requestCameraPermission();
        setCameraPermission(cameraPermissionStatus === 'authorized');
      } catch (error) {
        setCameraError(error);
      }
    })();
  }, []);

  const devices = useCameraDevices();
  const cameraDevice = devices.back;
  const detectorResult = useSharedValue('');

  const handleScanButtonPress = () => {
    setShowScanner(true);
    setShowTravelButton(true);
    setErrorMessage(null);
  };

  const handleStopScanButtonPress = () => {
    setShowScanner(false);
    
    const scannedValue = detectorResult.value;
    try {
      const parsedValue = JSON.parse(scannedValue);
      if (Array.isArray(parsedValue)) {
        // Scanned value is an array
        setscannedData(parsedValue);
      } else {
        // Scanned value is not an array
        throw new Error('Scanned value is not an array.');
      }
    } catch (error) {
      // Error occurred while parsing scanned value
      setscannedData(null);
      setErrorMessage('Unknown QR data. Please scan again.');
      console.error(error);
    }
  };

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE]);
    const barcodesStr = detectedBarcodes
      .map(barcode => barcode.displayValue)
      .join('');
    if (barcodesStr) {
      console.log('Barcodes:', barcodesStr);
      detectorResult.value = barcodesStr;
    }
  }, []);

  if (cameraError) {
    return (
      <View style={styles.container}>
        <Text>Camera error: {cameraError.message}</Text>
      </View>
    );
  }
  console.log('travel', scannedData);

  if (!cameraPermission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1C6758" />
      </View>
    );
  }

  if (!cameraDevice) {
    return (
      <View style={styles.container}>
        <Text>No camera device available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {showScanner ? (
          <Camera
            style={styles.camera}
            device={cameraDevice}
            isActive
            frameProcessor={frameProcessor}
            frameProcessorFps={2}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Press button to scan QR code</Text>
          </View>
        )}
        {showScanner && (
          <TouchableOpacity
            style={styles.stopScanButton}
            onPress={handleStopScanButtonPress}>
            <Text style={styles.stopScanButtonText}>Stop Scan</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.resultContainer}>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : (
          <Text style={styles.resultText}>{scannedData}</Text>
        )}
      </View>
      <View>
        {showTravelButton && (
          <TouchableOpacity
            style={styles.TravelButton}
            onPress={() => {
              handleRoutePress(scannedData);
            }}>
            <Text style={styles.TravelButtonText}>Travel</Text>
          </TouchableOpacity>
        )}
      </View>
      {!showScanner && (
        <TouchableOpacity
          style={styles.scanButton}
          onPress={handleScanButtonPress}>
          <Text style={styles.scanButtonText}>Scan QR Code</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default QRScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2E6',
  },
  cameraContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  scanButton: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2089dc',
  },
  scanButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  stopScanButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    padding: 10,
    backgroundColor: '#2089dc',
    borderRadius: 5,
  },
  stopScanButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  TravelButton: {
    width: 150,
    alignitems: 'center',
    position: 'absolute',
    bottom: 30,
    left: windowWidth / 2.85,
    padding: 10,
    backgroundColor: '#2089dc',
    borderRadius: 5,
  },
  TravelButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
  },
});
