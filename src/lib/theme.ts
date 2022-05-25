import { createTheme } from '@mui/material'

export const theme = createTheme({
    shadows: ["none"] as any,
    palette: {
        primary: {
            main: '#6A7280',
        },
        secondary: {
            main: "#ffffff",
            contrastText: "#000000",
            light: "#ffffff",
        }
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableTouchRipple: true,
            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                "body": {
                    background: 'rgb(55, 65, 81)'
                }
            }
        }
    },
})