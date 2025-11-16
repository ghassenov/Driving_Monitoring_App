import { accelerometer, gyroscope, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { map } from 'rxjs/operators';

/**
 * @param {function} onAccelerometer 
 * @param {function} onGyroscope 
 * @returns {function} 
 */
export function startSensorListeners(onAccelerometer, onGyroscope) {
  setUpdateIntervalForType(SensorTypes.accelerometer, 100); 
  setUpdateIntervalForType(SensorTypes.gyroscope, 100);     

  const accSubscription = accelerometer
    .pipe(map(({ x, y, z }) => ({ x, y, z })))
    .subscribe(onAccelerometer, error => console.log('Accelerometer error:', error));


  const gyroSubscription = gyroscope
    .pipe(map(({ x, y, z }) => ({ x, y, z })))
    .subscribe(onGyroscope, error => console.log('Gyroscope error:', error));

  return () => {
    accSubscription.unsubscribe();
    gyroSubscription.unsubscribe();
  };
}
