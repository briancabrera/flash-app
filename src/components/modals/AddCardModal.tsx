import React, { useState } from 'react';
import {
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonInput,
  IonText,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import styles from './AddCardModal.module.scss';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cardData: any) => void;
}

const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    expiration: '',
    cvv: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className={styles.modal}>
      <div className={styles.modalContent}>
        <IonHeader className={styles.header}>
          <IonToolbar>
            <IonButtons slot="end">
              <IonButton onClick={onClose}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className={styles.content}>
          <form onSubmit={handleSubmit}>
            <IonCard className={styles.card}>
              <IonCardContent className={styles.cardContent}>
                <div className={styles.inputGroup}>
                  <IonText className={styles.label}>Nombre de la tarjeta</IonText>
                  <IonInput
                    value={formData.name}
                    onIonChange={e => handleInputChange('name', e.detail.value!)}
                    className={styles.input}
                    placeholder="Ej: Débito Santander"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <IonText className={styles.label}>Número</IonText>
                  <IonInput
                    type="text"
                    value={formData.number}
                    onIonChange={e => handleInputChange('number', e.detail.value!)}
                    className={styles.input}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <IonText className={styles.label}>Vencimiento</IonText>
                  <IonInput
                    value={formData.expiration}
                    onIonChange={e => handleInputChange('expiration', e.detail.value!)}
                    className={styles.input}
                    placeholder="MM/YY"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <IonText className={styles.label}>CVV</IonText>
                  <IonInput
                    type="text"
                    value={formData.cvv}
                    onIonChange={e => handleInputChange('cvv', e.detail.value!)}
                    className={styles.input}
                    placeholder="123"
                    required
                  />
                </div>
              </IonCardContent>
            </IonCard>

            <IonButton 
              expand="block" 
              type="submit"
              className={styles.submitButton}
            >
              Agregar tarjeta
            </IonButton>
          </form>
        </IonContent>
      </div>
    </IonModal>
  );
};

export default AddCardModal;