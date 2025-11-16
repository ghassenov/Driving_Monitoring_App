import { useEffect } from "react";
import { accelerometer, gyroscope, magnetometer, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";

export default function useSensors(onAccel, onGyro, onMag, active = true) {
  useEffect(() => {
    if (!active) return;

    setUpdateIntervalForType(SensorTypes.accelerometer, 100);
    setUpdateIntervalForType(SensorTypes.gyroscope, 100);
    setUpdateIntervalForType(SensorTypes.magnetometer, 200);

    const accSub = accelerometer.subscribe(onAccel, (err) => console.log("acc err", err));
    const gyroSub = gyroscope.subscribe(onGyro, (err) => console.log("gyro err", err));
    const magSub = magnetometer.subscribe(onMag, (err) => console.log("mag err", err));

    return () => {
      try { accSub.unsubscribe(); } catch {}
      try { gyroSub.unsubscribe(); } catch {}
      try { magSub.unsubscribe(); } catch {}
    };
  }, [active]);
}
