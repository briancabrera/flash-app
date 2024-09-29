import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonFooter, IonText, IonDatetime, IonModal, IonSelect, IonSelectOption, IonSpinner } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingLightningBolts from '../../components/ui/FloatingLightningBolts/FloatingLightningBolts';
import './Register.scss';

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    documento: '',
    email: '',
    telefono: '',
    pais: 'uruguay',
    contrasena: '',
    repiteContrasena: '',
    codigoSeguridad: ['', '', '', '']
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const securityCodeRefs = useRef<(HTMLIonInputElement | null)[]>([]);

  const history = useHistory();

  const handleInputChange = useCallback((event: CustomEvent) => {
    const { name, value } = event.target as HTMLIonInputElement;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }, []);

  const handleDateChange = useCallback((value: string | string[] | null | undefined) => {
    if (value) {
      const dateValue = Array.isArray(value) ? value[0] : value;
      const date = new Date(dateValue);
      const formattedDate = format(date, 'dd/MM/yy');
      setFormData(prevData => ({ ...prevData, fechaNacimiento: formattedDate }));
      setShowDatePicker(false);
    }
  }, []);

  const handleSecurityCodeChange = useCallback((index: number, event: CustomEvent) => {
    const inputElement = event.target as HTMLIonInputElement;
    const value = inputElement.value;

    if (typeof value === 'string') {
      const numericValue = value.replace(/[^0-9]/g, '').slice(-1);
      setFormData(prevData => {
        const newCode = [...prevData.codigoSeguridad];
        newCode[index] = numericValue;
        return { ...prevData, codigoSeguridad: newCode };
      });
      
      if (numericValue && index < 3) {
        setTimeout(() => {
          securityCodeRefs.current[index + 1]?.setFocus();
        }, 0);
      }
    }
  }, []);

  const handleSecurityCodeKeyDown = useCallback((index: number, event: React.KeyboardEvent) => {
    if (event.key === 'Backspace' && formData.codigoSeguridad[index] === '' && index > 0) {
      setTimeout(() => {
        securityCodeRefs.current[index - 1]?.setFocus();
      }, 0);
    }
  }, [formData.codigoSeguridad]);

  useEffect(() => {
    if (step === 5) {
      securityCodeRefs.current[0]?.setFocus();
    }
  }, [step]);

  const isStepValid = useCallback(() => {
    switch (step) {
      case 1:
        return formData.nombre.trim() !== '' && formData.apellido.trim() !== '';
      case 2:
        return formData.fechaNacimiento !== '';
      case 3:
        return formData.documento.trim() !== '' && formData.email.trim() !== '' && formData.telefono.trim() !== '';
      case 4:
        return formData.contrasena.trim() !== '' && formData.repiteContrasena.trim() !== '' && formData.contrasena === formData.repiteContrasena;
      case 5:
        return formData.codigoSeguridad.every(digit => digit !== '');
      default:
        return false;
    }
  }, [step, formData]);

  const nextStep = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    if (isStepValid() && step < 5) {
      setStep(prevStep => prevStep + 1);
    }
  }, [isStepValid, step]);

  const prevStep = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    if (step > 1) {
      setStep(prevStep => prevStep - 1);
    }
  }, [step]);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    if (isStepValid()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 3000);
    }
  }, [isStepValid]);

  const handleStartUsingAccount = useCallback(() => {
    history.push('/account');
  }, [history]);

  const renderStep = useMemo(() => {
    const stepContent = [
      // Step 1
      (
        <>
          <h2 className="step-title">¿Cómo te llamás?</h2>
          <IonInput 
            name="nombre" 
            value={formData.nombre} 
            onIonChange={handleInputChange} 
            placeholder="Nombre" 
            className="custom-input" 
            required
          />
          <IonInput 
            name="apellido" 
            value={formData.apellido} 
            onIonChange={handleInputChange} 
            placeholder="Apellido" 
            className="custom-input" 
            required
          />
        </>
      ),
      // Step 2
      (
        <>
          <h2 className="step-title">¿Cuántos años tenés?</h2>
          <p className="step-subtitle">Es necesario ser mayor de edad para usar Flash.</p>
          <IonButton 
            expand="block" 
            className="custom-button date-button" 
            onClick={() => setShowDatePicker(true)}
          >
            {formData.fechaNacimiento || 'Fecha de nacimiento'}
          </IonButton>
          <IonModal isOpen={showDatePicker}>
            <IonDatetime
              presentation="date"
              onIonChange={(e) => handleDateChange(e.detail.value)}
            />
          </IonModal>
        </>
      ),
      // Step 3
      (
        <>
          <h2 className="step-title">Un poco sobre vos</h2>
          <p className="step-subtitle">Estos datos nos van a permitir ayudarte en caso de que tengas problemas con tu cuenta.</p>
          <IonInput 
            name="documento" 
            value={formData.documento} 
            onIonChange={handleInputChange} 
            placeholder="Documento" 
            className="custom-input" 
            required
          />
          <IonInput 
            name="email" 
            value={formData.email} 
            onIonChange={handleInputChange} 
            placeholder="Email" 
            type="email"
            className="custom-input" 
            required
          />
          <IonInput 
            name="telefono" 
            value={formData.telefono} 
            onIonChange={handleInputChange} 
            placeholder="Teléfono" 
            type="tel"
            className="custom-input" 
            required
          />
          <IonSelect 
            name="pais" 
            value={formData.pais} 
            onIonChange={handleInputChange} 
            className="custom-select"
            interface="popover"
          >
            <IonSelectOption value="uruguay">Uruguay</IonSelectOption>
            <IonSelectOption value="argentina">Argentina</IonSelectOption>
          </IonSelect>
        </>
      ),
      // Step 4
      (
        <>
          <h2 className="step-title">Ya falta poco</h2>
          <p className="step-subtitle">Creá una contraseña. Mínimo de 8 caracteres, usá letras y números.</p>
          <IonInput 
            name="contrasena" 
            value={formData.contrasena} 
            onIonChange={handleInputChange} 
            placeholder="Contraseña" 
            type="password"
            className="custom-input" 
            required
          />
          <IonInput 
            name="repiteContrasena" 
            value={formData.repiteContrasena} 
            onIonChange={handleInputChange} 
            placeholder="Repite contraseña" 
            type="password"
            className="custom-input" 
            required
          />
        </>
      ),
      // Step 5
      (
        <>
          <h2 className="step-title">Por último</h2>
          <p className="step-subtitle">Creá tu código de seguridad</p>
          <div className="security-code-container">
            {formData.codigoSeguridad.map((digit, index) => (
              <IonInput
                key={index}
                ref={el => securityCodeRefs.current[index] = el}
                value={digit}
                type="tel"
                inputmode="numeric"
                maxlength={1}
                className="security-code-input"
                onIonChange={(e) => handleSecurityCodeChange(index, e)}
                onKeyDown={(e) => handleSecurityCodeKeyDown(index, e)}
                required
              />
            ))}
          </div>
          <IonButton 
            expand="block" 
            className="custom-button" 
            onClick={handleSubmit}
            disabled={!isStepValid()}
          >
            Finalizar
          </IonButton>
        </>
      ),
    ];

    if (isLoading) {
      return (
        <motion.div
          className="loader-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <IonSpinner name="crescent" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Creando tu cuenta...
          </motion.p>
        </motion.div>
      );
    }

    if (isSuccess) {
      return (
        <motion.div
          className="success-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="success-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {formData.nombre}, estamos listos para que comiences a usar tu cuenta
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <IonButton 
              expand="block" 
              className="custom-button" 
              onClick={handleStartUsingAccount}
            >
              Comenzar
            </IonButton>
          </motion.div>
        </motion.div>
      );
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {stepContent[step - 1]}
        </motion.div>
      </AnimatePresence>
    );
  }, [step, formData, handleInputChange, handleDateChange, handleSecurityCodeChange, handleSecurityCodeKeyDown, handleSubmit, isStepValid, showDatePicker, isLoading, isSuccess, handleStartUsingAccount]);

  const memoizedFloatingLightningBolts = useMemo(() => <FloatingLightningBolts />, []);

  return (
    <IonPage className="register-page">
      <IonContent fullscreen>
        {memoizedFloatingLightningBolts}
        <motion.div 
          className="page-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="header">
            <h1 className="flash-logo">Flash</h1>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="form-container">
            {renderStep}
          </form>
          {!isLoading && !isSuccess && (
            <motion.div 
              className="navigation-buttons"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <IonButton fill="clear" className="nav-button prev-button" onClick={prevStep} disabled={step === 1}>
                {'<'}
              </IonButton>
              <div className="step-indicator">{step}/5</div>
              <IonButton fill="clear" className="nav-button next-button" onClick={nextStep} disabled={step === 5 || !isStepValid()}>
                {'>'}
              </IonButton>
            </motion.div>
          )}
        </motion.div>
      </IonContent>
      <IonFooter className="ion-no-border">
          <IonText className="footer-text">
            Flash 2024 todos los derechos reservados
          </IonText>
      </IonFooter>
    </IonPage>
  );
};

export default Register;