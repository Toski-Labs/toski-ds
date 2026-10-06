//  ToskiTokens.swift
//  Gerado por scripts/build-tokens.ts a partir de tokens/tokens.json. Não edite à mão.
//  Plataforma: mobile (iOS). Medidas dos componentes e animações do app.
//
//  Uso: .frame(height: ToskiComponent.Button.Large.height)
//       ToskiMotionTokens.Ball.Slow.duration

import CoreGraphics

/// Medidas dos componentes do app (pt). Toque mínimo de 44 pt mesmo quando o desenho é menor. Raios por nome de ToskiRadius.
public enum ToskiComponent {
    public enum Button {
        public enum Large {
            public static let height: CGFloat = 54
            public static let radius = "button"
            public static let fontSize: CGFloat = 17
            public static let secondaryFontSize: CGFloat = 16
        }
        public enum Card {
            public static let height: CGFloat = 46
            public static let radius = "buttonSmall"
            public static let fontSize: CGFloat = 15
        }
        public enum Text {
            public static let height: CGFloat = 48
            public static let radius = "button"
            public static let fontSize: CGFloat = 16
            public static let horizontalPadding: CGFloat = 4
        }
        public enum Link {
            public static let height: CGFloat = 44
            public static let fontSize: CGFloat = 15
        }
        public enum LinkSmall {
            public static let fontSize: CGFloat = 14
        }
    }
    public enum Pill {
        public static let height: CGFloat = 40
        public static let radius: CGFloat = 20
        public static let fontSize: CGFloat = 14
        public static let horizontalPadding: CGFloat = 16
    }
    public enum CircleButton {
        public static let regular: CGFloat = 44
        public static let critical: CGFloat = 48
    }
    public enum Chip {
        public enum Filter {
            public static let height: CGFloat = 44
            public static let fontSize: CGFloat = 15
            public static let trailing: CGFloat = 16
        }
        public enum Option {
            public static let height: CGFloat = 38
            public static let fontSize: CGFloat = 14.5
            public static let trailing: CGFloat = 14
        }
        public enum Compact {
            public static let height: CGFloat = 36
            public static let fontSize: CGFloat = 14
            public static let trailing: CGFloat = 12
        }
    }
    public enum Tag {
        public enum Small {
            public static let height: CGFloat = 26
            public static let fontSize: CGFloat = 12.5
        }
        public enum Medium {
            public static let height: CGFloat = 32
            public static let fontSize: CGFloat = 14
        }
    }
    public enum Row {
        public static let height: CGFloat = 50
        public static let heightWithIcon: CGFloat = 48
        public static let iconSide: CGFloat = 30
        public static let gap: CGFloat = 8
    }
    public enum FormRow {
        public static let height: CGFloat = 50
        public static let heightWithSubtitle: CGFloat = 58
        public static let verticalPadding: CGFloat = 10
        public static let subtitleFontSize: CGFloat = 12.5
        public static let valueButtonHeight: CGFloat = 36
    }
    public enum Segmented {
        public static let itemHeight: CGFloat = 38
        public static let trackPadding: CGFloat = 3
        public static let fontSize: CGFloat = 14
    }
    public enum Stepper {
        public static let side: CGFloat = 36
    }
    public enum TextField {
        public static let height: CGFloat = 50
        public static let fontSize: CGFloat = 15.5
        public static let lineHeight: CGFloat = 1.4
    }
    public enum ProgressBar {
        public static let height: CGFloat = 6
    }
    public enum LoadingDots {
        public static let diameter: CGFloat = 8
        public static let spacing: CGFloat = 8
    }
    public enum SyncSpinner {
        public static let size: CGFloat = 14
    }
    public enum TabBar {
        public static let itemHeight: CGFloat = 49
        public static let topPadding: CGFloat = 8
        public static let borderHeight: CGFloat = 1
        public static let safeAreaOverlap: CGFloat = 8
    }
    public enum BottomPanel {
        public static let handleWidth: CGFloat = 40
        public static let handleHeight: CGFloat = 5
        public static let maxHeightFraction: CGFloat = 0.9
        public static let scrimOpacity: CGFloat = 0.45
    }
    public enum Toast {
        public static let minHeight: CGFloat = 56
        public static let spacing: CGFloat = 10
        public static let leadingPadding: CGFloat = 16
        public static let padding: CGFloat = 6
        public static let offsetAboveTabBar: CGFloat = 16
    }
    public enum Mascot {
        public static let width: CGFloat = 156
        public static let discSide: CGFloat = 200
        public static let fallenBallWidth: CGFloat = 168
        public static let ballSide: CGFloat = 37
    }
}

/// Animações (docs/design/assets/animacoes.md do app). Tempos em segundos, distâncias em pt/px. Curvas no formato cubic-bezier(x1, y1, x2, y2).
public enum ToskiMotionTokens {
    public enum Curve {
        public static let easeInOut: [Double] = [0.42, 0, 0.58, 1]
        public static let easeOut: [Double] = [0, 0, 0.58, 1]
    }
    /// Bolinha da Paçoca: sobe de 0 a 45%, fica no alto até 60% e desce até 100% (ease-in-out em cada trecho). Para com "reduzir movimento".
    public enum Ball {
        public static let keyframes: [Double] = [0, 0.45, 0.6, 1]
        public static let viewBoxWidth: Double = 222
        public enum Slow {
            public static let duration: Double = 1.8
            public static let rise: Double = 14
        }
        public enum Fast {
            public static let duration: Double = 1.2
            public static let rise: Double = 16
        }
    }
    /// Três pontinhos de carregando: opacidade sobe até 40%, desce até 80% e fica baixa até o fim. Continuam com "reduzir movimento".
    public enum Dots {
        public static let duration: Double = 1.2
        public static let delays: [Double] = [0, 0.2, 0.4]
        public static let keyframes: [Double] = [0, 0.4, 0.8, 1]
        public static let low: Double = 0.25
        public static let high: Double = 1
    }
    /// Ícone de sincronizando: uma volta por ciclo. Continua com "reduzir movimento".
    public enum Spinner {
        public static let duration: Double = 0.9
    }
    /// Painel inferior: snappy de 0,3 s; com "reduzir movimento", ease-in-out de 0,2 s. Volta do arrasto: snappy 0,2 s.
    public enum Panel {
        public static let duration: Double = 0.3
        public static let reducedDuration: Double = 0.2
        public static let dragReturnDuration: Double = 0.2
    }
    /// Toast entra deslizando 16 pt com ease-out em 0,25 s (com "reduzir movimento", ease-in-out de 0,2 s). Fica 4 s sem ação, 6 s com ação e 10 s com VoiceOver.
    public enum Toast {
        public static let enterDuration: Double = 0.25
        public static let curve = "easeOut"
        public static let slide: Double = 16
        public static let reducedDuration: Double = 0.2
        public enum Visible {
            public static let withoutAction: Double = 4
            public static let withAction: Double = 6
            public static let voiceOver: Double = 10
        }
    }
    /// Pressionado e desabilitado (opacidade).
    public enum Interaction {
        public static let pressedOpacity: Double = 0.7
        public static let disabledOpacity: Double = 0.5
    }
}
