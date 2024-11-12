import React from 'react';
import { 
  IonMenu, 
  IonContent, 
  IonList, 
  IonItem, 
  IonIcon, 
  IonLabel, 
  IonButtons, 
  IonMenuButton, 
  IonHeader, 
  IonToolbar, 
  IonTitle,
  useIonRouter
} from '@ionic/react';
import { 
  personOutline, 
  notificationsOutline, 
  cardOutline, 
  timeOutline, 
  lockClosedOutline, 
  settingsOutline, 
  logOutOutline 
} from 'ionicons/icons';
import { menuController } from '@ionic/core';
import FloatingLightningBolts from '../../ui/FloatingLightningBolts/FloatingLightningBolts';
import styles from './NavbarMenu.module.scss';

const NavbarMenu: React.FC = () => {
  const ionRouter = useIonRouter();

  const handleLogout = async () => {
    console.log('Logout function called'); // Agregamos este console.log para verificar
    try {
      await menuController.close();
      ionRouter.push('/', 'root');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      <IonMenu contentId="main-content" className={styles.menu} type="overlay">
        <div className={styles.menuHeader}>
          <div className={styles.profileSection}>
            <FloatingLightningBolts />
            <h2>Hola, Nombre</h2>
          </div>
        </div>
        <IonContent className={styles.menuContent}>
          <IonList lines="none">
            <IonItem button detail={false}>
              <IonIcon icon={personOutline} slot="start" />
              <IonLabel>Información personal</IonLabel>
            </IonItem>
            <IonItem button detail={false}>
              <IonIcon icon={notificationsOutline} slot="start" />
              <IonLabel>Notificaciones</IonLabel>
            </IonItem>
            <IonItem button detail={false}>
              <IonIcon icon={cardOutline} slot="start" />
              <IonLabel>Pagos</IonLabel>
            </IonItem>
            <IonItem button detail={false}>
              <IonIcon icon={timeOutline} slot="start" />
              <IonLabel>Historial</IonLabel>
            </IonItem>
            <IonItem button detail={false}>
              <IonIcon icon={lockClosedOutline} slot="start" />
              <IonLabel>Pin de seguridad</IonLabel>
            </IonItem>
            <IonItem button detail={false}>
              <IonIcon icon={settingsOutline} slot="start" />
              <IonLabel>Configuración</IonLabel>
            </IonItem>
            <hr className={styles.menuDivider} />
            <IonItem 
              button 
              detail={false} 
              className={styles.logoutItem}
              onClick={handleLogout}
            >
              <IonIcon icon={logOutOutline} slot="start" />
              <IonLabel>Cerrar Sesión</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
        <footer className={styles.menuFooter}>
          <p>Flash alpha v0.10.0</p>
        </footer>
      </IonMenu>
      <IonHeader className={styles.header}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Flash</IonTitle>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default NavbarMenu;