import { createContext, FC, useContext, useState } from "react";

type HeaderOptions = {
  show: boolean;
  fixed: boolean;
  showNavigation: boolean;
  showUser: boolean;
  showTheme: boolean;
  showLoginButton: boolean;
};

type HeaderProviderProps = {
  children: React.ReactNode;
  defaultShow?: HeaderOptions["show"];
  defaultFixed?: HeaderOptions["fixed"];
  defaultShowNavigation?: HeaderOptions["showNavigation"];
  defaultShowUser?: HeaderOptions["showUser"];
  defaultShowTheme?: HeaderOptions["showTheme"];
  defaultShowLoginButton?: HeaderOptions["showLoginButton"];
};

type HeaderProviderState = {
  options: HeaderOptions;
  setOptions: (opt: HeaderOptions) => void;
};

const initialState: HeaderProviderState = {
  options: {
    show: true,
    fixed: true,
    showNavigation: true,
    showUser: true,
    showTheme: true,
    showLoginButton: false,
  },
  setOptions: () => undefined,
};

const HeaderProviderContext = createContext<HeaderProviderState>(initialState);

export const HeaderProvider: FC<HeaderProviderProps> = ({
  children,
  defaultShow = true,
  defaultFixed = true,
  defaultShowNavigation = true,
  defaultShowUser = true,
  defaultShowTheme = true,
  defaultShowLoginButton = false,
  ...props
}) => {
  const [options, setOptions] = useState<HeaderOptions>({
    show: defaultShow,
    fixed: defaultFixed,
    showNavigation: defaultShowNavigation,
    showUser: defaultShowUser,
    showTheme: defaultShowTheme,
    showLoginButton: defaultShowLoginButton,
  });

  const value = {
    options,
    setOptions,
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
