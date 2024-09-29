import React from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonFooter, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion'
import FloatingLightningBolts from '../../components/ui/FloatingLightningBolts/FloatingLightningBolts';
import './Login.scss';

const Login: React.FC = () => {
  const history = useHistory();

  const goBack = () => {
    history.push('/home');
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.125
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <IonPage className="login-page">
      <IonContent fullscreen>
        <FloatingLightningBolts />
        <div className="content-container">
          <h1 className="flash-logo">Flash</h1>
          <motion.div
            className="form-container"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <IonInput 
                className="custom-input" 
                placeholder="Documento" 
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <IonInput 
                className="custom-input" 
                type="password" 
                placeholder="Contraseña" 
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <IonButton expand="block" className="custom-button">
                Iniciar sesión
              </IonButton>
            </motion.div>
            <motion.div className="link-container" variants={itemVariants}>
              <IonButton fill="clear" className="login-problem-button">
                Problemas para iniciar sesión
              </IonButton>
              <IonButton fill="clear" className="back-button" onClick={goBack}>
                Volver
              </IonButton>
            </motion.div>
          </motion.div>
        </div>
      </IonContent>
      <IonFooter className="ion-no-border">
          <IonText className="footer-text">
            Flash 2024 todos los derechos reservados
          </IonText>
      </IonFooter>
    </IonPage>
  );
};

export default Login;