import React, { useState, useMemo, useRef, useEffect } from 'react';
import { IonContent, IonPage, IonCard, IonCardContent, IonText, IonButton, IonIcon } from '@ionic/react';
import { fingerPrintOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { useIonViewWillEnter } from '@ionic/react';
import FloatingLightningBolts from '../../components/ui/FloatingLightningBolts/FloatingLightningBolts';
import VisaLogo from '../../components/svg/VisaLogo';
import MastercardLogo from '../../components/svg/MastercardLogo';
import NavbarMenu from '../../components/functional/NavbarMenu/NavbarMenu';
import 'swiper/css';
import styles from './Account.module.scss';

const cards = [
  { id: 1, name: 'Débito Santander', lastDigits: '6789', type: 'VISA', finger: 'índice' },
  { id: 2, name: 'Crédito OCA', lastDigits: '5678', type: 'MASTERCARD', finger: 'mayor' },
  { id: 3, name: 'Débito VISA Gold Itaú', lastDigits: '4567', type: 'VISA', finger: 'meñique' },
];

const Account: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const contentRef = useRef<HTMLIonContentElement | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleScroll = (event: CustomEvent) => {
    const { scrollTop } = event.detail;
    setIsScrolled(scrollTop > 0);
  };

  useIonViewWillEnter(() => {
    if (contentRef.current) {
      contentRef.current.scrollEvents = true;
    }
  });

  useEffect(() => {
    const content = contentRef.current;
    if (content) {
      content.addEventListener('ionScroll', handleScroll);
      return () => {
        content.removeEventListener('ionScroll', handleScroll);
      };
    }
  }, []);

  const memoizedFloatingLightningBolts = useMemo(() => <FloatingLightningBolts />, []);

  return (
    <IonPage id="main-content">
      <NavbarMenu isScrolled={isScrolled} />
      <IonContent fullscreen scrollEvents={true} ref={contentRef} className={styles.accountPage}>
        {memoizedFloatingLightningBolts}
        <div className={styles.pageContent}>
          <h1 className={styles.title}>Mis tarjetas</h1>
          <div className={styles.carouselContainer}>
            <Swiper
              onSlideChange={handleSlideChange}
              spaceBetween={50}
              slidesPerView={1}
              centeredSlides={true}
            >
              {cards.map((card) => (
                <SwiperSlide key={card.id}>
                  <IonCard className={styles.card}>
                    <IonCardContent className={styles.cardContent}>
                      <div className={styles.cardInfo}>
                        <IonText className={styles.cardName}>{card.name}</IonText>
                        <IonText className={styles.cardNumber}>Termina en {card.lastDigits}</IonText>
                      </div>
                      <div className={styles.cardLogo}>
                        {card.type === 'VISA' ? (
                          <VisaLogo width={60} height={20} />
                        ) : (
                          <MastercardLogo width={60} height={40} />
                        )}
                      </div>
                    </IonCardContent>
                  </IonCard>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={styles.indicatorContainer}>
            {cards.map((_, index) => (
              <div key={index} className={`${styles.indicator} ${index === activeIndex ? styles.active : ''}`} />
            ))}
          </div>
          <div className={styles.centeredContent}>
            <div className={styles.fingerprintContainer}>
              <IonIcon icon={fingerPrintOutline} className={styles.fingerprintIcon} />
              <IonText className={styles.fingerText}>Asociada a tu dedo {cards[activeIndex].finger}</IonText>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <IonButton expand="block" className={styles.customButton}>
              Administrar mis tarjetas
            </IonButton>
            <IonButton expand="block" className={styles.customButton}>
              Agregar tarjeta
            </IonButton>
          </div>        
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Account;