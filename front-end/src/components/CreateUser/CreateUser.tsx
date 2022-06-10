import React, { FC } from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";
import { Controller, Control } from "react-hook-form";

export interface InputProps {
  name: string;
  control?: Control;
  label?: string;
  component?: JSX.Element;
}

const CreateUser: FC<InputProps> = ({
  name,
  control,
  component,
  label,
}) => {
  return (
    <>
      <IonItem>
        {label && (
          <IonLabel position="floating">{label}</IonLabel>
        )}
        <Controller
        
          name={name}
          control={control}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <IonInput
              onBlur={onBlur} // notify when input is touched
              onChange={onChange} // send value to hook form
            />
          )}
        />
      </IonItem>
    </>
  );
};

export default CreateUser;