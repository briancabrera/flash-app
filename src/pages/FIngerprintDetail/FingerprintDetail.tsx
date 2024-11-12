import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IonButton, IonContent, IonPage } from '@ionic/react';
import styles from './FingerprintDetail.module.scss';

const FingerprintDetail: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const handleBack = () => {
    history.goBack()
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={styles.cardDetailContainer}>
          {/* Fingerprint detail content will be added here */}
          <h1>Fingerprint Detail for ID: {id}</h1>
          <IonButton onClick={handleBack} >go back</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FingerprintDetail;