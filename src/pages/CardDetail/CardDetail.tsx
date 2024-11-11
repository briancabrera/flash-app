import React from 'react';
import { useParams } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import styles from './CardDetail.module.scss';

const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={styles.cardDetailContainer}>
          {/* Card detail content will be added here */}
          <h1>Card Detail for ID: {id}</h1>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CardDetail;