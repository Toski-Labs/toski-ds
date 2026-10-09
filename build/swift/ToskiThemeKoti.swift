//  ToskiThemeKoti.swift
//  Gerado por scripts/build-tokens.ts a partir de tokens/tokens.json. Não edite à mão.
//  Tema de produto: Koti. Só o que muda em relação ao ToskiColors (destaque e ligados a ele).
//
//  Uso: Text("Olá").foregroundStyle(ToskiKotiTheme.accent)
//  Os neutros, critical e success continuam em ToskiColors.

import SwiftUI
#if canImport(UIKit)
import UIKit
#elseif canImport(AppKit)
import AppKit
#endif

public enum ToskiKotiTheme {
    // MARK: Marca do produto

    /// Destaque do Koti no claro.
    public static let ameixa = fixed(0x7A3F6E)
    /// Destaque no escuro.
    public static let ameixaClaro = fixed(0xD9A6CC)

    // MARK: Destaque (troca as de mesmo nome em ToskiColors)

    /// Fundos suaves, caixas de ícone, chips
    public static let tint = dynamic(light: 0xF0E1EC, dark: 0x3A2436)
    /// Círculo atrás dos mascotes
    public static let heroBackground = dynamic(light: 0xE8D2E1, dark: 0x46293F)
    /// Botão principal, aba ativa, links
    public static let accent = dynamic(light: 0x7A3F6E, dark: 0xD9A6CC)
    /// Destaque mais profundo (no escuro, mais claro): botão de texto da tela Erro, links ao passar o mouse
    public static let accentDeep = dynamic(light: 0x5E2F55, dark: 0xE8C2DD)
    /// Texto sobre o destaque
    public static let onAccent = dynamic(light: 0xFFF8EE, dark: 0x231B17)
    /// Ação do toast (Desfazer, Abrir)
    public static let toastAction = dynamic(light: 0xE6BFDB, dark: 0x7A3F6E)
    /// Cartão de destaque (plano de saúde, Fase 2)
    public static let featureCard = dynamic(light: 0x7A3F6E, dark: 0x5E2F55)
    /// Fundo do cadeado (recurso do Plus, pet congelado)
    public static let lockBackground = dynamic(light: 0x8A5280, dark: 0x3A2436)
    /// Cartões das miniaturas de tema (Aparência)
    public static let themePreviewCard = dynamic(light: 0x7A3F6E, lightAlpha: 0.35, dark: 0x7A3F6E, darkAlpha: 0.35)

    // MARK: Membros da casa

    /// Nomes dos membros, na ordem de cadastro.
    public static let memberNames = ["ameixaClaro", "caramelo", "salvia", "azulejo", "coral"]
    /// Fundo do avatar de cada membro (igual nos dois modos).
    public static let memberAvatars: [Color] = [fixed(0xD9A6CC), fixed(0xDB9A5B), fixed(0x8FA876), fixed(0x7CC6C4), fixed(0xE08A7A)]
    /// Check e calendário: no claro uma variante mais escura (≥ 3:1), no escuro o próprio avatar.
    public static let memberMarks: [Color] = [
            dynamic(light: 0xB6549D, dark: 0xD9A6CC),
            dynamic(light: 0xAD6826, dark: 0xDB9A5B),
            dynamic(light: 0x698051, dark: 0x8FA876),
            dynamic(light: 0x398482, dark: 0x7CC6C4),
            dynamic(light: 0xD04E36, dark: 0xE08A7A)
    ]

    // MARK: Black Friday

    public enum BlackFriday {
        public static let accent = fixed(0xD9A6CC)
    }

    // MARK: Auxiliares

    private static func components(_ hex: UInt32) -> (CGFloat, CGFloat, CGFloat) {
        (CGFloat((hex >> 16) & 0xFF) / 255, CGFloat((hex >> 8) & 0xFF) / 255, CGFloat(hex & 0xFF) / 255)
    }

    private static func fixed(_ hex: UInt32, alpha: CGFloat = 1) -> Color {
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
