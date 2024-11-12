import React from 'react';
import { IonContent, IonPage, IonButton, IonFooter, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion'
import FloatingLightningBolts from '../../components/ui/FloatingLightningBolts/FloatingLightningBolts';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const history = useHistory();

  const goToLogin = () => {
    history.push('/login');
  };

  const goToRegister = () => {
    history.push('/register');
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.5 }
    })
  };

  return (
    <IonPage className={styles.homePage}>
      <IonContent fullscreen>
        <FloatingLightningBolts />
        <div className={styles.contentContainer}>
          <h1 className={styles.flashLogo}>Flash</h1>
          <div className={styles.buttonContainer}>
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <IonButton expand="block" className={styles.customButton} onClick={goToLogin}>
                Iniciar sesión
              </IonButton>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <IonButton expand="block" className={styles.customButton} onClick={goToRegister}>
                Registrarme
              </IonButton>
            </motion.div>
          </div>
        </div>
      </IonContent>
      <IonFooter className={`ion-no-border ${styles.footer}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <IonText className={styles.footerText}>
            Flash alpha v0.11.0
          </IonText>
        </motion.div>
      </IonFooter>
    </IonPage>
  );
};

export default Home;