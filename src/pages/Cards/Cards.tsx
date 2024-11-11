import React from 'react';
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
import { close, chevronForward, addOutline } from 'ionicons/icons';
import styles from './Cards.module.scss';

interface Card {
  id: string;
  name: string;
  type: 'visa' | 'mastercard';
  lastDigits: string;
}

const Cards: React.FC = () => {
  const history = useHistory();
  
  // Mock data for cards
  const cards: Card[] = [
    {
      id: '1',
      name: 'Débito Santander',
      type: 'visa',
      lastDigits: '6789'
    },
    {
      id: '2',
      name: 'Crédito BBVA',
      type: 'mastercard',
      lastDigits: '4321'
    }
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>Flash</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/account')}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={styles.content}>
        <h1 className={styles.title}>Mis tarjetas</h1>

        <IonList>
          {cards.map(card => (
            <IonCard key={card.id} className={styles.cardItem} onClick={() => history.push(`/card/${card.id}`)}>
              <IonCardContent>
                <IonItem lines="none" detail={false} className={styles.cardItemContent}>
                  <IonLabel>
                    <h2>{card.name}</h2>
                    <p>{card.type === 'visa' ? 'VISA' : 'MasterCard'}</p>
                    <p>Termina en {card.lastDigits}</p>
                  </IonLabel>
                  <IonIcon icon={chevronForward} slot="end" />
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonButton 
            expand="block" 
            onClick={() => history.push('/card/new')}
            className={styles.addButton}
          >
            <IonIcon icon={addOutline} slot="start" />
            Agregar tarjeta
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Cards;