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
    },
    {
      id: '3',
      name: 'Débito Scotiabank',
      type: 'visa',
      lastDigits: '5678'
    },
    {
      id: '4',
      name: 'Crédito Santander',
      type: 'mastercard',
      lastDigits: '9012'
    }
  ];

  const memoizedFloatingLightningBolts = useMemo(() => <FloatingLightningBolts />, []);

  return (
    <IonPage>
      <IonHeader className={styles.header}>
        <IonToolbar>
          <IonTitle>Flash</IonTitle>
          <IonButtons slot="end">
            <IonButton className={styles.cancelButton} onClick={() => history.push('/account')}>
              <IonIcon className={styles.closeIcon} icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={styles.content}>
        {memoizedFloatingLightningBolts}
        
        <h1 className={styles.title}>Mis tarjetas</h1>

        <IonList className={styles.cardsList}>
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

      <IonFooter className={styles.footer}>
        <IonToolbar>
          <IonButton 
            expand="block" 
            onClick={() => history.push('/card/new')}
            className={styles.addButton}
          >
            Agregar tarjeta
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Cards;