import React from 'react';
import { IonContent, IonPage, IonButton, IonFooter, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion'
import FloatingLightningBolts from '../../components/ui/FloatingLightningBolts/FloatingLightningBolts';
import './Home.scss';

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
    <IonPage className="home-page">
      <IonContent fullscreen>
        <FloatingLightningBolts />
        <div className="content-container">
          <h1 className="flash-logo">Flash</h1>
          <div className="button-container">
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <IonButton expand="block" className="custom-button" onClick={goToLogin}>
                Iniciar sesión
              </IonButton>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <IonButton expand="block" className="custom-button" onClick={goToRegister}>
                Registrarme
              </IonButton>
            </motion.div>
          </div>
        </div>
      </IonContent>
      <IonFooter className="ion-no-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <IonText className="footer-text">
            Flash 2024 todos los derechos reservados
          </IonText>
        </motion.div>
      </IonFooter>
    </IonPage>
  );
};

export default Home;