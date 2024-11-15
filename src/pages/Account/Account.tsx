import React, { useMemo, useRef } from 'react';
import { IonContent, IonPage, IonCard, IonCardContent, IonText, IonButton, IonIcon, IonList, IonModal } from '@ionic/react';
import { lockClosedOutline, addOutline, chevronForwardOutline } from 'ionicons/icons';
import { useIonViewWillEnter } from '@ionic/react';
import { motion } from 'framer-motion';
import FloatingLightningBolts from '../../components/ui/FloatingLightningBolts/FloatingLightningBolts';
import VisaLogo from '../../components/svg/VisaLogo';
import MastercardLogo from '../../components/svg/MastercardLogo';
import NavbarMenu from '../../components/functional/NavbarMenu/NavbarMenu';
import { useHistory } from 'react-router';
import styles from './Account.module.scss';
import AddCardModal from '../../components/modals/AddCardModal';

const cards = [
  { id: 1, name: 'Débito Santander', lastDigits: '6789', type: 'VISA' },
  { id: 2, name: 'Crédito OCA', lastDigits: '5678', type: 'MASTERCARD' },
  { id: 3, name: 'Débito VISA Gold Itaú', lastDigits: '4567', type: 'VISA' },
];

const Account: React.FC = () => {
  const [showAddCardModal, setShowAddCardModal] = React.useState(false);
  const contentRef = useRef<HTMLIonContentElement | null>(null);
  const history = useHistory();

  const handlePaymentHistory = () => {
    history.push('/payment-history');
  };

  const handleCardClick = (id: number) => {
    history.push(`/card/${id}`);
  };

  useIonViewWillEnter(() => {
    if (contentRef.current) {
      contentRef.current.scrollEvents = true;
    }
  });

  const memoizedFloatingLightningBolts = useMemo(() => <FloatingLightningBolts />, []);

  return (
    <IonPage id="main-content">
      <NavbarMenu />
      <IonContent fullscreen ref={contentRef} className={styles.accountPage}>
        {memoizedFloatingLightningBolts}
        <div className={styles.pageContent}>
          <h1 className={styles.title}>Mi cuenta</h1>
          
          <motion.div 
            className={styles.faceRecognitionContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <IonIcon icon={lockClosedOutline} className={styles.lockIcon} />
            <IonText className={styles.faceTitle}>
              Pago con reconocimiento facial
            </IonText>
            <IonText className={styles.faceDescription}>
              Todas tus tarjetas están protegidas
            </IonText>
          </motion.div>

          <motion.div 
            className={styles.cardsSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={styles.cardsSectionHeader}>
              <h2 className={styles.sectionTitle}>Tarjetas vinculadas</h2>
              <IonButton 
                fill="clear" 
                className={styles.addButton}
                onClick={() => setShowAddCardModal(true)}
              >
                <IonIcon icon={addOutline} />
              </IonButton>
            </div>
            
            <div className={styles.cardsListContainer}>
              <IonList className={styles.cardsList}>
                {cards.map((card) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IonCard 
                      className={styles.cardItem}
                      onClick={() => handleCardClick(card.id)}
                    >
                      <IonCardContent className={styles.cardContent}>
                        <div className={styles.cardInfo}>
                          <IonText className={styles.cardName}>{card.name}</IonText>
                          <IonText className={styles.cardNumber}>•••• {card.lastDigits}</IonText>
                        </div>
                        <div className={styles.cardRight}>
                          {card.type === 'VISA' ? (
                            <VisaLogo width={40} height={13} />
                          ) : (
                            <MastercardLogo width={40} height={25} />
                          )}
                          <IonIcon icon={chevronForwardOutline} className={styles.cardArrow} />
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </motion.div>
                ))}
              </IonList>
            </div>
          </motion.div>

          <motion.div 
            className={styles.buttonContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <IonButton 
              expand="block" 
              className={styles.customButton} 
              onClick={handlePaymentHistory}
            >
              Historial de pagos
            </IonButton>
          </motion.div>
        </div>

        <AddCardModal 
          isOpen={showAddCardModal}
          onClose={() => setShowAddCardModal(false)}
          onSubmit={(cardData: any) => {
            // Handle the new card data here
            console.log(cardData);
            setShowAddCardModal(false);
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default Account;