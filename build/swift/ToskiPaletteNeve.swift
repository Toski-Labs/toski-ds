//  ToskiPaletteNeve.swift
//  Gerado por scripts/build-tokens.ts a partir de tokens/tokens.json. Não edite à mão.
//  Paleta: Neve. Só o que muda em relação ao ToskiColors (fundo, texto, neutros, vidro e mascote).
//
//  Uso: Text("Olá").foregroundStyle(ToskiNevePalette.textPrimary)
//  O destaque, critical, heroBackground e toastAction vêm do tema de produto (ToskiPawtaTheme) e do ToskiColors.
//  onAccent: a paleta vence o tema (no escuro, a cor do texto sobre o destaque depende do fundo).
//  A sombra do vidro desta paleta é ToskiShadow.glassNeve.

import SwiftUI
#if canImport(UIKit)
import UIKit
#elseif canImport(AppKit)
import AppKit
#endif

public enum ToskiNevePalette {
    /// Fundo das telas
    public static let background = dynamic(light: 0xF5F5F7, dark: 0x121214)
    /// Texto principal
    public static let textPrimary = dynamic(light: 0x1C1C1E, dark: 0xF5F5F7)
    /// Texto de apoio, rótulos
    public static let textSecondary = dynamic(light: 0x666669, dark: 0xA1A1A6)
    /// Aba inativa
    public static let tabIdle = dynamic(light: 0x6E6E73, dark: 0xA1A1A6)
    /// Texto sobre o destaque
    public static let onAccent = dynamic(light: 0xFFF8EE, dark: 0x121214)
    /// Preenchimento neutro da Nova XP: fundo dos botões secundários, chips e ícones em círculo
    public static let neutralFill = dynamic(light: 0xE5E5EA, dark: 0x2C2C2E)
    /// Vidro: botões e cartões translúcidos sobre o fundo (Nova XP). Junto com glassBorder e a sombra glass
    public static let glass = dynamic(light: 0xFFFFFF, lightAlpha: 0.62, dark: 0x2C2C2E, darkAlpha: 0.62)
    /// Borda de 1 pt do vidro
    public static let glassBorder = dynamic(light: 0x88888C, dark: 0x68686D)
    /// Barra de abas em vidro (Nova XP)
    public static let tabGlass = dynamic(light: 0xFAFAFC, lightAlpha: 0.78, dark: 0x1C1C1E, darkAlpha: 0.8)
    /// Contorno do círculo de marcar como feito
    public static let checkLine = dynamic(light: 0x8A8A8E, dark: 0x8E8E93)
    /// Fundo do selo (contador, aviso) sobre o fundo da tela
    public static let badgeBg = dynamic(light: 0xFFFFFF, dark: 0x2C2C2E)
    /// Linha do mascote
    public static let mLine = dynamic(light: 0x1C1C1E, dark: 0xF4E4CC)
    /// Olho e focinho do mascote
    public static let mInk = dynamic(light: 0x1C1C1E, dark: 0x100C0A)

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
