import { useState } from "react";

export const useUsername = (defaultShow: boolean, onDisappear: () => void) => {
  const [showUserForm, setShowUserForm] = useState(defaultShow);

  const onConfirm = () => {
    setShowUserForm(false);

    setTimeout(() => {
      onDisappear();
    }, 400);
  };

  const onPass = () => {
    setShowUserForm(false);

    // setTimeout(() => {
    //   onDisappear();
    // }, 100);
  };

  return {
    showUserForm,
    onConfirm,
    onPass,
  };
};
