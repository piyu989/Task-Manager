import { createTheme } from '@mui/material'
import React from 'react'

const DarkTheme = createTheme({
    palette:{
        mode:"dark",
        background:{
            default:"0c071b"
        },
        text:{
            // primary:"fff"
        },primary:{
            main:"rgba(215,106,255,0.507)"
        }
    }
})

export default DarkTheme