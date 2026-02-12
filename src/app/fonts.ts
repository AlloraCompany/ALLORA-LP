import localFont from "next/font/local";

export const clover_grotesk = localFont({
  src: [
    { path: './fonts/CloverGrotesk-Black.woff', style: 'normal', weight: '900' },
    { path: './fonts/CloverGrotesk-Bold.woff', style: 'normal', weight: '700' },
    { path: './fonts/CloverGrotesk-ExtraBold.woff', style: 'normal', weight: '800' },
    { path: './fonts/CloverGrotesk-ExtraLight.woff', style: 'normal', weight: '200' },
    { path: './fonts/CloverGrotesk-Light.woff', style: 'normal', weight: '300' },
    { path: './fonts/CloverGrotesk-Medium.woff', style: 'normal', weight: '500' },
    { path: './fonts/CloverGrotesk-Regular.woff', style: 'normal', weight: '400' },
    { path: './fonts/CloverGrotesk-SemiBold.woff', style: 'normal', weight: '600' },
    { path: './fonts/CloverGrotesk-Thin.woff', style: 'normal', weight: '100' }
  ],
  variable: "--font-clover-grotesk-sans",
});

export const gotham = localFont({
  src: [
    { path: './fonts/GothamBold.ttf', style: 'normal', weight: '700' },
    { path: './fonts/GothamBoldItalic.ttf', style: 'italic', weight: '700' },
    { path: './fonts/GothamBook.ttf', style: 'normal', weight: '400' },
    { path: './fonts/GothamBookItalic.ttf', style: 'italic', weight: '400' },
    { path: './fonts/GothamLight.ttf', style: 'normal', weight: '300' },
    { path: './fonts/GothamLightItalic.ttf', style: 'italic', weight: '300' },
    { path: './fonts/GothamMedium.ttf', style: 'normal', weight: '500' },
    { path: './fonts/GothamMediumItalic.ttf', style: 'italic', weight: '500' },
    { path: './fonts/GothamMedium_1.ttf', style: 'normal', weight: '500' }
  ],
  variable: "--font-gotham"
})