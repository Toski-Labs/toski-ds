// Gerado por scripts/build-tokens.ts a partir de tokens/tokens.json. Não edite à mão.
// Tokens da web, exportados pelo pacote como `tokens`.

export const tokens = {
  "brand": {
    "caramelo": "#DB9A5B",
    "ferrugem": "#A9541F",
    "creme": "#F4E4CC",
    "papel": "#F7F1E8",
    "carvao": "#231B17"
  },
  "light": {
    "background": "#F7F1E8",
    "surface": "#FFFFFF",
    "tint": "#F3E4CF",
    "hero": "#EFDCC2",
    "ink": "#231B17",
    "muted": "#6B5648",
    "line": "#E6D8C4",
    "accent": "#A9541F",
    "accent-hover": "#7E3C14",
    "on-accent": "#FFF8EE",
    "critical": "#A3341A",
    "critical-bg": "#F8E0D4",
    "critical-line": "#EBC0AA",
    "success": "#3F6E3B",
    "success-bg": "#E4EEDC",
    "segment": "#FFFFFF",
    "tabbar": "#FFFDF9",
    "tab-idle": "#7D6858",
    "mascot-outline": "transparent",
    "mascot-nose": "#231B17",
    "accent-text": "#94481A",
    "link": "#94481A",
    "ball-outline": "#EFDCC2",
    "phone-ring": "transparent",
    "footer": "#231B17",
    "footer-ink": "#F7F1E8",
    "footer-muted": "#C2AE98",
    "footer-line": "#43352B"
  },
  "dark": {
    "background": "#231B17",
    "surface": "#2E241D",
    "tint": "#3A2D23",
    "hero": "#33271F",
    "ink": "#F7F1E8",
    "muted": "#C2AE98",
    "line": "#43352B",
    "accent": "#DB9A5B",
    "accent-hover": "#E8B27C",
    "on-accent": "#231B17",
    "critical": "#F09A78",
    "critical-bg": "#45261A",
    "critical-line": "#6A3A26",
    "success": "#9CC48F",
    "success-bg": "#2C3A27",
    "segment": "#4A3A2E",
    "tabbar": "#1B1511",
    "tab-idle": "#A08B78",
    "mascot-outline": "#F4E4CC",
    "mascot-nose": "#100C0A",
    "accent-text": "#DB9A5B",
    "link": "#E8B27C",
    "ball-outline": "#F4E4CC",
    "phone-ring": "#43352B",
    "footer": "#1B1511",
    "footer-ink": "#F7F1E8",
    "footer-muted": "#C2AE98",
    "footer-line": "#43352B"
  },
  "font": {
    "family": "Outfit",
    "stack": [
      "Outfit Variable",
      "Outfit",
      "system-ui",
      "sans-serif"
    ],
    "weights": {
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    }
  },
  "radius": {
    "icon": 12,
    "button": 14,
    "card": 18,
    "panel": 28,
    "focus": 6
  },
  "layout": {
    "container": 1168,
    "gutter": 24
  },
  "motion": {
    "curve": {
      "easeInOut": [
        0.42,
        0,
        0.58,
        1
      ],
      "easeOut": [
        0,
        0,
        0.58,
        1
      ]
    },
    "ball": {
      "keyframes": [
        0,
        0.45,
        0.6,
        1
      ],
      "viewBoxWidth": 222,
      "slow": {
        "duration": 1.8,
        "rise": 14
      },
      "fast": {
        "duration": 1.2,
        "rise": 16
      }
    },
    "dots": {
      "duration": 1.2,
      "delays": [
        0,
        0.2,
        0.4
      ],
      "keyframes": [
        0,
        0.4,
        0.8,
        1
      ],
      "low": 0.25,
      "high": 1
    },
    "spinner": {
      "duration": 0.9
    },
    "panel": {
      "duration": 0.3,
      "reducedDuration": 0.2,
      "dragReturnDuration": 0.2
    },
    "toast": {
      "enterDuration": 0.25,
      "curve": "easeOut",
      "slide": 16,
      "reducedDuration": 0.2,
      "visible": {
        "withoutAction": 4,
        "withAction": 6,
        "voiceOver": 10
      }
    },
    "interaction": {
      "pressedOpacity": 0.7,
      "disabledOpacity": 0.5
    }
  },
  "icons": [
    "help",
    "settings",
    "alert",
    "archive",
    "download",
    "bath",
    "bug",
    "search",
    "dog",
    "lock",
    "calendar-export",
    "calendar-dot",
    "calendar",
    "camera",
    "phone",
    "check",
    "chevron-down",
    "chevron-right",
    "chevron-left",
    "microchip",
    "share",
    "contact",
    "copy",
    "heart",
    "document-lines",
    "document-off",
    "document",
    "edit",
    "star",
    "close",
    "filter",
    "cat",
    "globe",
    "info",
    "home",
    "bell-off",
    "bell",
    "external-link",
    "location",
    "more",
    "plus",
    "message",
    "snow",
    "weight",
    "people",
    "paw",
    "plan",
    "next",
    "food",
    "receipt",
    "clock",
    "medicine",
    "repeat",
    "spinner",
    "theme",
    "grooming",
    "vaccine",
    "vet",
    "arrow-down",
    "arrow-up",
    "arrow-right",
    "flask",
    "list",
    "mail",
    "alert-circle",
    "undo",
    "end",
    "pause",
    "triangle"
  ]
} as const;

export type ToskiTokens = typeof tokens;
export type ToskiColorName = keyof typeof tokens.light;
