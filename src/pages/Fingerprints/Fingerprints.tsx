import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonFooter
} from '@ionic/react';
import { close, chevronForward } from 'ionicons/icons';
import FloatingLightningBolts from '../../components/ui/FloatingLightningBolts/FloatingLightningBolts';
import styles from './FIngerprints.module.scss';

interface Fingerprint {
  id: string;
  name: string;
  card: string;
}

const Fingerprints: React.FC = () => {
  const history = useHistory();

  const handleAddFingerprint = () => { 
    history.push('/scan')
  }

  const handleBack = () => {
    history.goBack()
  }
  
  // Mock data for fingerprints
  const fingerprints: Fingerprint[] = [
    {
      id: '1',
      name: 'Pulgar derecho',
      card: 'Débito Santander'
    },
    {
      id: '2',
      name: 'Indice derecho',
      card: 'Crédito BBVA'
    },
    {
      id: '3',
      name: 'Pulgar izquierdo',
      card: 'Débito Scotiabank'
    },
    {
      id: '4',
      name: 'Mayor derecho',
      card: 'Crédito Santander'
    }
  ];

  const memoizedFloatingLightningBolts = useMemo(() => <FloatingLightningBolts />, []);

  return (
    <IonPage>
      <IonHeader className={styles.header}>
        <IonToolbar>
          <IonTitle>Flash</IonTitle>
          <IonButtons slot="end">
            <IonButton className={styles.cancelButton} onClick={handleBack}>
              <IonIcon className={styles.closeIcon} icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={styles.content}>
        {memoizedFloatingLightningBolts}
        
        <h1 className={styles.title}>Mis huellas</h1>

        <IonList className={styles.cardsList}>
          {fingerprints.map(fingerprint => (
            <IonCard key={fingerprint.id} className={styles.cardItem} onClick={() => history.push(`/fingerprint/${fingerprint.id}`)}>
              <IonCardContent>
                <IonItem lines="none" detail={false} className={styles.cardItemContent}>
                  <IonLabel>
                    <h2>{fingerprint.name}</h2>
                    <p>Tarjeta asociada:</p>
                    <p>{fingerprint.card}</p>
                  </IonLabel>
                  <IonIcon icon={chevronForward} slot="end" />
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>

      <IonFooter className={styles.footer}>
        <IonToolbar>
          <IonButton 
            expand="block" 
            onClick={handleAddFingerprint}
            className={styles.addButton}
          >
            Agregar huella
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Fingerprints;