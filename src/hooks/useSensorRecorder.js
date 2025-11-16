// src/hooks/useSensorRecorder.js
import { useEffect, useState } from "react";
import { startSensorListeners } from "../sensors/SensorService";

export default function useSensorRecorder(isRecording) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!isRecording) return;

    let latestRow = {};

    const stop = startSensorListeners(
      accData => {
        latestRow = {
          timestamp: Date.now(),
          acc_x: accData.x,
          acc_y: accData.y,
          acc_z: accData.z,
        };
        setData(prev => [...prev, latestRow]);
      },
      gyroData => {
        if (!latestRow.timestamp) return;
        latestRow.gyro_x = gyroData.x;
        latestRow.gyro_y = gyroData.y;
        latestRow.gyro_z = gyroData.z;
      }
    );

    return () => stop();
  }, [isRecording]);

  return data;
}
