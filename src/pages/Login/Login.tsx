import React from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonFooter, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import FloatingLightningBolts from '../../components/ui/FloatingLightningBolts/FloatingLightningBolts';
import './Login.scss';

const Login: React.FC = () => {
  const history = useHistory();

  const goBack = () => {
    history.push('/home');
  };

  return (
    <IonPage className="login-page">
      <IonContent fullscreen>
        <FloatingLightningBolts />
        <div className="content-container">
          <h1 className="flash-logo">Flash</h1>
          <div className="form-container">
            <IonInput 
              className="custom-input" 
              placeholder="Documento" 
            />
            <IonInput 
              className="custom-input" 
              type="password" 
              placeholder="Contraseña" 
            />
            <IonButton expand="block" className="custom-button">
              Iniciar sesión
            </IonButton>
            <div className="link-container">
              <IonButton fill="clear" className="login-problem-button">
                Problemas para iniciar sesión
              </IonButton>
              <IonButton fill="clear" className="back-button" onClick={goBack}>
                Volver
              </IonButton>
            </div>
          </div>
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