
import { IonSlides, IonSlide } from "@ionic/react";
import React, {  useRef } from 'react';
// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 0,
  speed: 400
};

export interface BadgeInputProps {
    name: string;
    component?: JSX.Element;
  }
export const BadgeSlider: React.FC<BadgeInputProps> = () => {
  const mySlides = useRef<any>(null);

  // const [disablePrevBtn, setDisablePrevBtn] = useState(true);
  // const [disableNextBtn, setDisableNextBtn] = useState(false);

  const handleSlideChange = async () => {
    const swiper = await mySlides.current.getSwiper();
    console.log("Slide Index", swiper.activeIndex);
    // setDisablePrevBtn(swiper.isBeginning);
    // setDisableNextBtn(swiper.isEnd);
  };

  return (
      <>
        <IonSlides
            options={slideOpts}
            ref={mySlides}
            onIonSlideDidChange={handleSlideChange}
        >
        <IonSlide><img id = "Bronze" src='' width={50} height={50} alt='' /></IonSlide>
        <IonSlide><img id = "Silver" src='' width={50} height={50} alt='' /></IonSlide>
        <IonSlide><img id = "Gold" src='' width={50} height={50} alt='' /></IonSlide>
        </IonSlides>

    </>
  );
};

export default BadgeSlider;