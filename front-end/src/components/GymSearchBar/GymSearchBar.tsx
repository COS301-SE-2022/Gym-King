import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonItem, IonLabel, IonInput, useIonModal, IonSearchbar,
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';

const SearchPage = ({
  onDismiss,
}: {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}) => {
  const inputRef = useRef<HTMLIonInputElement>(null);
  return (
      <IonContent className="ion-padding">
        <IonSearchbar></IonSearchbar>
      </IonContent>
  );
};

function GymSearchBar() {
  const [present, dismiss] = useIonModal(SearchPage, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === 'confirm') {
        }
      },
    });
  }

  return (
      <IonContent className="ion-padding">
        <IonSearchbar onClick={() => openModal()}>
        </IonSearchbar>
      </IonContent>
  );
}

export default GymSearchBar;