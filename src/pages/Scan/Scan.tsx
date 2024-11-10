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
  useIonViewWillLeave
} from '@ionic/react';
import jsQR from 'jsqr';
import styles from './Scan.module.scss';

const Scan: React.FC = () => {
  const router = useIonRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setScanning(true);
      requestAnimationFrame(scan);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopScanner = () => {
    setScanning(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useIonViewDidEnter(() => {
    startScanner();
  });

  useIonViewWillLeave(() => {
    stopScanner();
  });

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const scan = () => {
    if (!scanning) return;

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
          requestAnimationFrame(scan);
        }
      }
    } else {
      requestAnimationFrame(scan);
    }
  };

  const handleScanComplete = (data: string) => {
    stopScanner();
    // Handle the scanned QR code data here
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
            >
              Cancelar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={styles.content}>
        <div className={styles.scannerContainer}>
          <video ref={videoRef} className={styles.video} />
          <canvas ref={canvasRef} className={styles.canvas} />
          <div className={styles.scannerOverlay}>
            <div className={styles.scannerFrame} />
          </div>
          <div className={styles.scannerText}>
            Escanea el código QR de tu ticket
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Scan;