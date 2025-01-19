import { ThemeProvider as NextThemeProvider } from "next-themes"

type ThemeProviderProps = React.ComponentProps<typeof NextThemeProvider>

export default function ThemeProvider({children, ...props}: ThemeProviderProps) {
    return(
        <NextThemeProvider {...props}>
            {children}
        </NextThemeProvider>
    )
}