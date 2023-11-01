import { createContext, FC, useContext, useState } from "react";

type HeaderProviderProps = {
  children: React.ReactNode;
  defaultIsFixed?: boolean;
  defaultShowNavigation?: boolean;
};

type HeaderProviderState = {
  isFixed: boolean;
  setIsFixed: (isFixed: boolean) => void;
  showNavigation: boolean;
  setShowNavigation: (showNavigation: boolean) => void;
};

const initialState: HeaderProviderState = {
  isFixed: true,
  setIsFixed: () => null,
  showNavigation: false,
  setShowNavigation: () => null,
};

const HeaderProviderContext = createContext<HeaderProviderState>(initialState);

export const HeaderProvider: FC<HeaderProviderProps> = ({
  children,
  defaultIsFixed = true,
  defaultShowNavigation = false,
  ...props
}) => {
  const [isFixed, setIsFixed] = useState(defaultIsFixed);
  const [showNavigation, setShowNavigation] = useState(defaultShowNavigation);

  const value = {
    isFixed,
    setIsFixed,
    showNavigation,
    setShowNavigation,
  };

  return (
    <HeaderProviderContext.Provider {...props} value={value}>
      {children}
    </HeaderProviderContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useHeader = () => {
  const context = useContext(HeaderProviderContext);

  if (context === undefined) {
    throw new Error("useHeader must be within a HeaderProvider");
  }

  return context;
};
