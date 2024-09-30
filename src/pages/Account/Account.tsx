import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonCard, IonCardContent, IonText, IonButton, IonIcon, IonMenu, IonList, IonItem } from '@ionic/react';
import { chevronBackOutline, chevronForwardOutline, fingerPrintOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import './Account.scss';

const cards = [
  { id: 1, name: 'CARD NAME', lastDigits: '6789', type: 'VISA', finger: 'índice' },
  { id: 2, name: 'CARD NAME', lastDigits: '5678', type: 'MASTERCARD', finger: 'mayor' },
  { id: 3, name: 'CARD NAME', lastDigits: '4567', type: 'VISA', finger: 'meñique' },
];

const Account: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const goToPrevSlide = () => {
    if (swiper) swiper.slidePrev();
  };

  const goToNextSlide = () => {
    if (swiper) swiper.slideNext();
  };

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>Menu Item 1</IonItem>
            <IonItem>Menu Item 2</IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content" className="account-page">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Flash</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <div className="page-content">
            <h1 className="title">Mis tarjetas</h1>
            <div className="carousel-container">
              <IonIcon icon={chevronBackOutline} className="nav-arrow left" onClick={goToPrevSlide} />
              <Swiper
                onSwiper={setSwiper}
                onSlideChange={handleSlideChange}
                spaceBetween={50}
                slidesPerView={1}
                centeredSlides={true}
              >
                {cards.map((card) => (
                  <SwiperSlide key={card.id}>
                    <IonCard className="card">
                      <IonCardContent>
                        <div className="card-content">
                          <IonText className="card-name">{card.name}</IonText>
                          <IonText className="card-number">Termina en {card.lastDigits}</IonText>
                          <IonText className="card-type">{card.type}</IonText>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </SwiperSlide>
                ))}
              </Swiper>
              <IonIcon icon={chevronForwardOutline} className="nav-arrow right" onClick={goToNextSlide} />
            </div>
            <div className="indicator-container">
              {cards.map((_, index) => (
                <div key={index} className={`indicator ${index === activeIndex ? 'active' : ''}`} />
              ))}
            </div>
            <div className="fingerprint-container">
              <IonIcon icon={fingerPrintOutline} className="fingerprint-icon" />
              <IonText className="finger-text">Asociada a tu dedo {cards[activeIndex].finger}</IonText>
            </div>
            <div className="button-container">
              <IonButton expand="block" className="custom-button">
                Administrar mis tarjetas
              </IonButton>
              <IonButton expand="block" className="custom-button">
                Agregar tarjeta
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Account;