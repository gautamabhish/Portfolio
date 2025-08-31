import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface GUIThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

const GUIThemeContext = createContext<GUIThemeContextProps | undefined>(undefined);

export const useGUITheme = () => {
    const context = useContext(GUIThemeContext);
    if (!context) {
        throw new Error('useGUITheme must be used within a GUIThemeProvider');
    }
    return context;
};

interface GUIThemeProviderProps {
    children: ReactNode;
}

export const GUIThemeProvider: React.FC<GUIThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light');

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <GUIThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </GUIThemeContext.Provider>
    );
};