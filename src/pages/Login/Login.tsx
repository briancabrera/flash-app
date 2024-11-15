import React, { useEffect } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonFooter, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion'
import { Keyboard } from '@capacitor/keyboard';
import FloatingLightningBolts from '../../components/ui/FloatingLightningBolts/FloatingLightningBolts';
import styles from './Login.module.scss';

const Login: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    // Configurar el comportamiento del teclado
    Keyboard.setAccessoryBarVisible({ isVisible: false });
    Keyboard.setScroll({ isDisabled: true });
  }, []);

  const goBack = () => {
    history.push('/home');
  };

  const login = () => {
    history.push('/account');
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
    <IonPage className={styles.loginPage}>
      <IonContent fullscreen>
        <FloatingLightningBolts />
        <div className={styles.contentContainer}>
          <h1 className={styles.flashLogo}>Flash</h1>
          <motion.div
            className={styles.formContainer}
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <IonInput 
                className={styles.customInput} 
                placeholder="Documento" 
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <IonInput 
                className={styles.customInput} 
                type="password" 
                placeholder="Contraseña" 
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <IonButton expand="block" className={styles.customButton} onClick={login}>
                Iniciar sesión
              </IonButton>
            </motion.div>
            <motion.div className={styles.linkContainer} variants={itemVariants}>
              <IonButton fill="clear" className={styles.loginProblemButton}>
                Problemas para iniciar sesión
              </IonButton>
              <IonButton fill="clear" className={styles.backButton} onClick={goBack}>
                Volver
              </IonButton>
            </motion.div>
          </motion.div>
        </div>
      </IonContent>
      <IonFooter className={`ion-no-border ${styles.footer}`}>
        <IonText className={styles.footerText}>
          Flash alpha v0.11.2
        </IonText>
      </IonFooter>
    </IonPage>
  );
};

export default Login;