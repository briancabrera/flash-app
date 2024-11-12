import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IonButton, IonContent, IonPage } from '@ionic/react';
import styles from './CardDetail.module.scss';

const CardDetail: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const handleBack = () => {
    history.goBack()
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={styles.cardDetailContainer}>
          {/* Card detail content will be added here */}
          <h1>Card Detail for ID: {id}</h1>
          <IonButton onClick={handleBack} >go back</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CardDetail;