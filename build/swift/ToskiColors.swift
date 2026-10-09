//  ToskiColors.swift
//  Gerado por scripts/build-tokens.ts a partir de tokens/tokens.json. Não edite à mão.
//  Plataforma: mobile (iOS). Nomes iguais aos do app.
//
//  Uso: Text("Olá").foregroundStyle(ToskiColors.textPrimary)
//  As cores semânticas mudam sozinhas entre claro e escuro. Não depende de Asset Catalog.

import SwiftUI
#if canImport(UIKit)
import UIKit
#elseif canImport(AppKit)
import AppKit
#endif

public enum ToskiColors {
    // MARK: Marca (iguais nos dois temas)

    /// Pelo da Paçoca. Destaque no escuro.
    public static let caramelo = fixed(0xDB9A5B)
    /// Destaque no claro.
    public static let ferrugem = fixed(0xA9541F)
    /// Contornos e detalhes da mascote.
    public static let creme = fixed(0xF4E4CC)
    /// Fundo claro.
    public static let papel = fixed(0xF7F1E8)
    /// Texto no claro e fundo no escuro.
    public static let carvao = fixed(0x231B17)

    // MARK: Semânticas — compartilhadas com a web

    /// Fundo das telas
    public static let background         = dynamic(light: 0xF7F1E8, dark: 0x231B17)
    /// Cards, listas, campos
    public static let surface            = dynamic(light: 0xFFFFFF, dark: 0x2E241D)
    /// Fundos suaves, caixas de ícone, chips
    public static let tint               = dynamic(light: 0xF3E4CF, dark: 0x3A2D23)
    /// Círculo atrás da Paçoca
    public static let heroBackground     = dynamic(light: 0xEFDCC2, dark: 0x33271F)
    /// Texto principal
    public static let textPrimary        = dynamic(light: 0x231B17, dark: 0xF7F1E8)
    /// Texto de apoio, rótulos
    public static let textSecondary      = dynamic(light: 0x6B5648, dark: 0xC2AE98)
    /// Bordas e divisores
    public static let border             = dynamic(light: 0xE6D8C4, dark: 0x43352B)
    /// Botão principal, aba ativa, links
    public static let accent             = dynamic(light: 0xA9541F, dark: 0xDB9A5B)
    /// Ferrugem escura (no escuro, caramelo claro): botão de texto da tela Erro, links ao passar o mouse
    public static let accentDeep         = dynamic(light: 0x7E3C14, dark: 0xE8B27C)
    /// Texto sobre o destaque
    public static let onAccent           = dynamic(light: 0xFFF8EE, dark: 0x231B17)
    /// Atrasados, alertas, ações destrutivas
    public static let critical           = dynamic(light: 0xA3341A, dark: 0xF09A78)
    /// Fundo de alertas
    public static let criticalBackground = dynamic(light: 0xF8E0D4, dark: 0x45261A)
    /// Borda de cards atrasados
    public static let criticalBorder     = dynamic(light: 0xEBC0AA, dark: 0x6A3A26)
    /// Em dia, concluído
    public static let success            = dynamic(light: 0x3F6E3B, dark: 0x9CC48F)
    /// Fundo de status positivo
    public static let successBackground  = dynamic(light: 0xE4EEDC, dark: 0x2C3A27)
    /// Opção selecionada do controle segmentado
    public static let segmentSelected    = dynamic(light: 0xFFFFFF, dark: 0x4A3A2E)
    /// Barra de abas
    public static let tabBar             = dynamic(light: 0xFFFDF9, dark: 0x1B1511)
    /// Aba inativa
    public static let tabIdle            = dynamic(light: 0x7D6858, dark: 0xA08B78)
    /// Contorno do corpo da Paçoca
    public static let mascotOutline      = dynamic(light: 0x000000, lightAlpha: 0, dark: 0xF4E4CC, darkAlpha: 1)
    /// Focinho da Paçoca
    public static let mascotNose         = dynamic(light: 0x231B17, dark: 0x100C0A)

    // MARK: Semânticas — só do app

    /// Texto sobre crítico
    public static let onCritical         = dynamic(light: 0xFFF8EE, dark: 0x231B17)
    /// Interruptor desligado
    public static let switchOff          = dynamic(light: 0xDCCDB9, dark: 0x5A4A3D)
    /// Fundo do toast (invertido)
    public static let toastBackground    = dynamic(light: 0x231B17, dark: 0xF7F1E8)
    /// Texto do toast
    public static let toastText          = dynamic(light: 0xF7F1E8, dark: 0x231B17)
    /// Ação do toast (Desfazer, Abrir)
    public static let toastAction        = dynamic(light: 0xE8B27C, dark: 0xA9541F)
    /// Fundo atrás de painéis
    public static let scrim              = dynamic(light: 0x140E0A, lightAlpha: 0.45, dark: 0x140E0A, darkAlpha: 0.45)
    /// Contorno e costura da bolinha
    public static let ballOutline        = dynamic(light: 0xF7F1E8, dark: 0xF4E4CC)
    /// Texto e elementos apagados (dia fora do mês, texto miúdo do PDF)
    public static let faint              = dynamic(light: 0xB3A190, dark: 0x6E5D50)
    /// Linhas finas internas (grade do gráfico, linhas do PDF)
    public static let divider            = dynamic(light: 0xEDE3D6, dark: 0x43352B)
    /// Borda mais forte (botão do Google no login)
    public static let borderStrong       = dynamic(light: 0xDCCDB9, dark: 0x5A4A3D)
    /// Barra do valor antigo (troca de ração)
    public static let barInactive        = dynamic(light: 0xDCCDB9, dark: 0x6E5D50)
    /// Cartão de destaque (plano de saúde, Fase 2)
    public static let featureCard        = dynamic(light: 0xA9541F, dark: 0x7E3C14)
    /// Texto sobre o cartão de destaque
    public static let onFeatureCard      = dynamic(light: 0xFFF8EE, dark: 0xFFF8EE)
    /// Caixa translúcida sobre o destaque
    public static let onAccentSubtle     = dynamic(light: 0xFFF8EE, lightAlpha: 0.18, dark: 0xFFF8EE, darkAlpha: 0.18)
    /// Fundo do cadeado (recurso do Plus, pet congelado)
    public static let lockBackground     = dynamic(light: 0xDB9A5B, dark: 0x3A2D23)
    /// Ícone do cadeado
    public static let onLock             = dynamic(light: 0xFFF8EE, dark: 0xF7F1E8)
    /// Fundo do alerta do sistema (ex.: desconectar calendário)
    public static let alertBackground    = dynamic(light: 0xF7F1E8, dark: 0x3A2D23)
    /// Fundo do aviso de notificação
    public static let bannerBackground   = dynamic(light: 0xFFFDF9, lightAlpha: 0.92, dark: 0x2E241D, darkAlpha: 0.92)
    /// Fundo atrás da prévia do PDF
    public static let previewBackdrop    = dynamic(light: 0xEDE3D6, dark: 0x1B1511)
    /// Cartões das miniaturas de tema (Aparência)
    public static let themePreviewCard   = dynamic(light: 0xA9541F, lightAlpha: 0.35, dark: 0xA9541F, darkAlpha: 0.35)

    // MARK: Pets

    /// Cores dos avatares dos pets, na ordem de cadastro.
    public static let petAvatars: [Color] = [fixed(0xDB9A5B), fixed(0x8FA07C), fixed(0xE2C79A), fixed(0xC9B8A6), fixed(0xB7C4D1), fixed(0xD8C0D6)]
    /// Bolinhas do calendário por pet (visão Todos).
    public static let petCalendarDots: [Color] = [
            dynamic(light: 0xC27A3A, dark: 0xDB9A5B),
            dynamic(light: 0x6F8A5C, dark: 0x9DB089),
            dynamic(light: 0xA0814A, dark: 0xE2C79A),
            dynamic(light: 0x87755F, dark: 0xC9B8A6),
            dynamic(light: 0x5B7792, dark: 0xB7C4D1),
            dynamic(light: 0x94688F, dark: 0xD8C0D6)
    ]
    /// Inicial sobre o avatar.
    public static let onPetAvatar = fixed(0x231B17)
    /// Avatar da usuária (não é cor de pet).
    public static let avatarUser = fixed(0xE8B27C)

    // MARK: Black Friday (tema fixo da campanha)

    public enum BlackFriday {
        public static let background = ToskiColors.fixed(0x120D0A)
        public static let surface = ToskiColors.fixed(0x2E241D)
        public static let accent = ToskiColors.fixed(0xDB9A5B)
        public static let text = ToskiColors.fixed(0xF7F1E8)
        public static let textSecondary = ToskiColors.fixed(0xCDB9A3)
    }

    // MARK: Auxiliares

    private static func components(_ hex: UInt32) -> (CGFloat, CGFloat, CGFloat) {
        (CGFloat((hex >> 16) & 0xFF) / 255, CGFloat((hex >> 8) & 0xFF) / 255, CGFloat(hex & 0xFF) / 255)
    }

    fileprivate static func fixed(_ hex: UInt32, alpha: CGFloat = 1) -> Color {
        let (r, g, b) = components(hex)
        return Color(.sRGB, red: r, green: g, blue: b, opacity: alpha)
    }

    private static func dynamic(light: UInt32, lightAlpha: CGFloat = 1, dark: UInt32, darkAlpha: CGFloat = 1) -> Color {
        #if canImport(UIKit)
        return Color(UIColor { traits in
            let isDark = traits.userInterfaceStyle == .dark
            let (r, g, b) = components(isDark ? dark : light)
            return UIColor(red: r, green: g, blue: b, alpha: isDark ? darkAlpha : lightAlpha)
        })
        #elseif canImport(AppKit)
        return Color(NSColor(name: nil) { appearance in
            let isDark = appearance.bestMatch(from: [.darkAqua, .aqua]) == .darkAqua
            let (r, g, b) = components(isDark ? dark : light)
            return NSColor(srgbRed: r, green: g, blue: b, alpha: isDark ? darkAlpha : lightAlpha)
        })
        #else
        return fixed(light, alpha: lightAlpha)
        #endif
    }
}

public enum ToskiRadius {
    /// Caixa de ícone
    public static let iconBox: CGFloat = 12
    /// Botões
    public static let button: CGFloat = 14
    /// Cards
    public static let card: CGFloat = 18
    /// Painéis, faixas e painel inferior
    public static let sheet: CGFloat = 28
    /// Caixa de seleção
    public static let checkbox: CGFloat = 7
    /// Amostra de cor
    public static let swatch: CGFloat = 3
    /// Página do PDF
    public static let pdfPage: CGFloat = 4
    /// Elementos pequenos
    public static let small: CGFloat = 9
    /// Botão de card
    public static let buttonSmall: CGFloat = 12
    /// Trilho do controle segmentado
    public static let segmentTrack: CGFloat = 12
    /// Campos
    public static let input: CGFloat = 14
    /// Tiles
    public static let tile: CGFloat = 16
    /// Aviso de notificação
    public static let notification: CGFloat = 22
    /// Ícone do app: raio 22 num lado de referência 96 (escala com o lado)
    public static let appIconRadius: CGFloat = 22
    public static let appIconSide: CGFloat = 96
    /// Raio do ícone para um lado qualquer (proporcional ao de referência).
    public static func appIcon(side: CGFloat) -> CGFloat { side * appIconRadius / appIconSide }
}

/// Valores do box-shadow do canvas (x = 0). Em SwiftUI o radius é blur / 2. Iguais no claro e no escuro.
public enum ToskiShadow {
    public struct Style: Sendable {
        public let y: CGFloat
        public let blur: CGFloat
        public let color: Color
        public let opacity: Double
        /// Raio para .shadow(color:radius:x:y:) do SwiftUI.
        public var radius: CGFloat { blur / 2 }
    }

    public static let knob = Style(y: 1, blur: 3, color: ToskiColors.fixed(0x000000), opacity: 0.25)
    public static let raised = Style(y: 1, blur: 3, color: ToskiColors.fixed(0x231B17), opacity: 0.15)
    public static let floating = Style(y: 8, blur: 24, color: ToskiColors.fixed(0x231B17), opacity: 0.22)
    public static let sheet = Style(y: -8, blur: 32, color: ToskiColors.fixed(0x231B17), opacity: 0.18)
}

public enum ToskiSpacing {
    public static let xs: CGFloat = 4
    public static let s: CGFloat = 8
    public static let m: CGFloat = 12
    public static let l: CGFloat = 16
    public static let xl: CGFloat = 20
    public static let xxl: CGFloat = 24
    public static let screenPadding: CGFloat = 20
}

public enum ToskiSize {
    public static let minTouchTarget: CGFloat = 44
    public static let primaryButtonHeight: CGFloat = 54
    public static let avatarSmall: CGFloat = 24
    public static let avatar: CGFloat = 48
    public static let avatarLarge: CGFloat = 76
}

public enum ToskiFont {
    /// Nome da família registrada no app (adicione os .ttf do Outfit em "Fonts provided by application").
    public static let family = "Outfit"

    public struct Style: Sendable {
        public let size: CGFloat
        public let weight: Font.Weight
        /// Espaçamento entre letras em em (multiplique pelo tamanho para pontos).
        public let tracking: CGFloat
        public let uppercase: Bool

        public init(size: CGFloat, weight: Font.Weight, tracking: CGFloat = 0, uppercase: Bool = false) {
            self.size = size
            self.weight = weight
            self.tracking = tracking
            self.uppercase = uppercase
        }

        /// Fonte Outfit que acompanha o Tamanho do Texto do sistema.
        public var font: Font { .custom(ToskiFont.family, size: size).weight(weight) }
        /// Tracking em pontos, para .tracking(_:).
        public var trackingPoints: CGFloat { tracking * size }
    }

    public static let largeTitle = Style(size: 28, weight: .semibold, tracking: -0.01)
    public static let title = Style(size: 22, weight: .semibold)
    public static let headline = Style(size: 17, weight: .semibold)
    public static let body = Style(size: 16, weight: .regular)
    public static let callout = Style(size: 15, weight: .regular)
    public static let subheadline = Style(size: 14, weight: .regular)
    public static let footnote = Style(size: 13, weight: .regular)
    public static let sectionLabel = Style(size: 13, weight: .semibold, tracking: 0.06, uppercase: true)
    public static let caption = Style(size: 12, weight: .regular)
    public static let tabLabel = Style(size: 11, weight: .medium)
}
