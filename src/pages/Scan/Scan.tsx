import React, { useEffect, useRef, useState } from 'react';
import { 
  IonPage, 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonButton,
  useIonRouter,
  useIonViewDidEnter,
  useIonViewWillLeave,
  IonText,
  IonIcon,
  IonSpinner
} from '@ionic/react';
import { Camera } from '@capacitor/camera';
import { AndroidSettings, IOSSettings, NativeSettings } from 'capacitor-native-settings';
import { close } from 'ionicons/icons';
import jsQR from 'jsqr';
import styles from './Scan.module.scss';

const Scan: React.FC = () => {
  const router = useIonRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanningRef = useRef(false);
  const scanIntervalRef = useRef<number | null>(null);

  const checkPermissions = async () => {
    try {
      const permission = await Camera.checkPermissions();
      if (permission.camera === 'granted') {
        console.log("Camera permission already granted");
        setPermissionGranted(true);
        startScanner();
      } else {
        setPermissionGranted(false);
      }
    } catch (error) {
      console.error('Error checking camera permissions:', error);
      setPermissionGranted(false);
    }
  };

  const openAppSettings = async () => {
    try {
      await NativeSettings.open({
        optionAndroid: AndroidSettings.ApplicationDetails,
        optionIOS: IOSSettings.App
      });
    } catch (error) {
      console.error('Error opening app settings:', error);
    }
  };

  const startScanner = async () => {
    console.log("Starting scanner");

    try {
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.onloadedmetadata = async () => {
          try {
            await videoRef.current?.play();
            console.log("Video is playing, starting QR scan");
            scanningRef.current = true;
            startScanInterval();
          } catch (error) {
            console.error('Error playing video:', error);
          }
        };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopScanner = () => {
    console.log("Stopping scanner");
    scanningRef.current = false;
    setPermissionGranted(null);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  };

  const startScanInterval = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    scanIntervalRef.current = setInterval(scan, 1000);
  };

  const scan = () => {
    if (!scanningRef.current) {
      console.log("Scanning stopped");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          console.log('QR Code detected', code.data);
          handleScanComplete(code.data);
        } else {
          console.log('Scanning for QR code...');
        }
      }
    } else {
      console.log('Video not ready, retrying...');
    }
  };

  useIonViewDidEnter(() => {
    console.log("View did enter, checking permissions");
    checkPermissions();
  });

  useIonViewWillLeave(() => {
    console.log("View will leave, stopping scanner");
    stopScanner();
  });

  useEffect(() => {
    return () => {
      console.log("Component unmounting, stopping scanner");
      stopScanner();
    };
  }, []);

  useEffect(() => {
    if (permissionGranted) {
      console.log("Permissions granted, starting scanner");
      startScanner();
    }
  }, [permissionGranted]);

  const handleScanComplete = (data: string) => {
    stopScanner();
    console.log('Scanned data:', data);
    router.push('/account');
  };

  const handleCancel = () => {
    stopScanner();
    router.push('/account');
  };

  return (
    <IonPage className={styles.scanPage}>
      <IonHeader className="ion-no-border">
        <IonToolbar className={styles.toolbar}>
          <IonButtons slot="end">
            <IonButton 
              onClick={handleCancel} 
              className={styles.cancelButton}
              size="large"
            >
              <IonIcon 
                icon={close} 
                className={styles.closeIcon}
                size="large"
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={styles.content}>
        {permissionGranted === null ? (
          <div className={styles.loaderContainer}>
            <IonSpinner name="crescent" />
            <IonText color="light">
              <p>Verificando permisos de cámara...</p>
            </IonText>
          </div>
        ) : permissionGranted ? (
          <div className={styles.scannerContainer}>
            <video 
              ref={videoRef} 
              className={styles.video}
              playsInline
              muted
              autoPlay
            />
            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={styles.scannerOverlay}>
              <div className={styles.scannerFrame} />
            </div>
            <div className={styles.scannerText}>
              Escanea el código QR de tu ticket
            </div>
          </div>
        ) : (
          <div className={styles.permissionDenied}>
            <IonText color="light">
              <h2>Permiso de cámara requerido</h2>
              <p>Por favor, concede permiso para usar la cámara para escanear el código QR.</p>
            </IonText>
            <IonButton onClick={openAppSettings}>Ir a Ajustes</IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Scan;