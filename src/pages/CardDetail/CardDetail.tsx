import React, { useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { 
  IonButton, 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonFooter,
  IonAlert,
  IonList
} from '@ionic/react';
import { close, chevronBack, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import styles from './CardDetail.module.scss';
import FloatingLightningBolts from '../../components/ui/FloatingLightningBolts/FloatingLightningBolts';

interface CardInfo {
  id: string;
  name: string;
  type: 'visa' | 'mastercard';
  number: string;
  expirationDate: string;
  cvv: string;
}

export default function CardDetail() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showFullNumber, setShowFullNumber] = useState(false);
  const [showCVV, setShowCVV] = useState(false);

  const [cardInfo, setCardInfo] = useState<CardInfo>({
    id,
    name: 'Débito Santander',
    type: 'visa',
    number: '4111111111116789',
    expirationDate: '12/25',
    cvv: '123'
  });

  const handleBack = () => history.goBack();
  const goHome = () => history.push('/account');
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleDelete = () => setShowDeleteAlert(true);
  const confirmDelete = () => history.goBack();
  const toggleNumberVisibility = () => setShowFullNumber(!showFullNumber);
  const toggleCVVVisibility = () => setShowCVV(!showCVV);

  const memoizedFloatingLightningBolts = useMemo(() => <FloatingLightningBolts />, []);

  const formatCardNumber = (number: string) => {
    return number.replace(/(\d{4})/g, '$1 ').trim();
  };

  const maskedNumber = formatCardNumber(cardInfo.number.replace(/\d(?=\d{4})/g, "*"));
  const maskedCVV = '***';

  return (
    <IonPage>
      <IonHeader className={styles.header}>
        <IonToolbar>
          <IonTitle>Flash</IonTitle>
          <IonButtons slot="start">
            <IonButton className={styles.backButton} onClick={handleBack}>
              <IonIcon className={styles.backIcon} icon={chevronBack} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton className={styles.cancelButton} onClick={goHome}>
              <IonIcon className={styles.closeIcon} icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={styles.content}>
        {memoizedFloatingLightningBolts}
        
        <h1 className={styles.title}>Detalle de tarjeta</h1>

        <IonCard className={styles.cardContainer}>
          <IonCardContent>
            <IonList className={styles.cardList}>
              <IonItem className={styles.cardItem}>
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <span>Nombre de la tarjeta</span>
                  </div>
                  {isEditing ? (
                    <IonInput 
                      value={cardInfo.name} 
                      onIonChange={e => setCardInfo({ ...cardInfo, name: e.detail.value! })}
                      className={styles.input}
                    />
                  ) : (
                    <span className={styles.value}>{cardInfo.name}</span>
                  )}
                </div>
              </IonItem>

              <IonItem className={styles.cardItem}>
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <span>Tipo</span>
                  </div>
                  <span className={styles.value}>{cardInfo.type.toUpperCase()}</span>
                </div>
              </IonItem>

              <IonItem className={styles.cardItem}>
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <span>Número</span>
                    <IonButton 
                      fill="clear" 
                      onClick={toggleNumberVisibility}
                      className={styles.toggleButton}
                    >
                      <IonIcon icon={showFullNumber ? eyeOffOutline : eyeOutline} />
                    </IonButton>
                  </div>
                  <span className={styles.value}>
                    {showFullNumber ? formatCardNumber(cardInfo.number) : maskedNumber}
                  </span>
                </div>
              </IonItem>

              <IonItem className={styles.cardItem}>
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <span>Vencimiento</span>
                  </div>
                  <span className={styles.value}>{cardInfo.expirationDate}</span>
                </div>
              </IonItem>

              <IonItem className={styles.cardItem}>
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <span>CVV</span>
                    <IonButton 
                      fill="clear" 
                      onClick={toggleCVVVisibility}
                      className={styles.toggleButton}
                    >
                      <IonIcon icon={showCVV ? eyeOffOutline : eyeOutline} />
                    </IonButton>
                  </div>
                  <span className={styles.value}>
                    {showCVV ? cardInfo.cvv : maskedCVV}
                  </span>
                </div>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>

      <IonFooter className={styles.footer}>
        <IonToolbar>
          {isEditing ? (
            <div className={styles.footerButtons}>
              <IonButton expand="block" onClick={() => setIsEditing(false)} className={styles.footerButton}>
                Cancelar
              </IonButton>
              <IonButton expand="block" onClick={handleSave} className={styles.footerButton}>
                Guardar
              </IonButton>
            </div>
          ) : (
            <div className={styles.footerButtons}>
              <IonButton expand="block" onClick={handleEdit} className={styles.footerButton}>
                Editar
              </IonButton>
              <IonButton expand="block" onClick={handleDelete} className={styles.footerButton}>
                Eliminar
              </IonButton>
            </div>
          )}
        </IonToolbar>
      </IonFooter>

      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header="¿Estás seguro?"
        message="¿Estás seguro de que quieres eliminar esta tarjeta?"
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
            role: 'destructive',
            handler: confirmDelete
          }
        ]}
      />
    </IonPage>
  );
}