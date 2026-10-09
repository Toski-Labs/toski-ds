//  ToskiThemePetHealth.swift
//  Gerado por scripts/build-tokens.ts a partir de tokens/tokens.json. Não edite à mão.
//  Tema de produto: PetHealthTracker. Só o que muda em relação ao ToskiColors (destaque e ligados a ele).
//
//  Uso: Text("Olá").foregroundStyle(ToskiPetHealthTheme.accent)
//  Os neutros, critical e success continuam em ToskiColors.

import SwiftUI
#if canImport(UIKit)
import UIKit
#elseif canImport(AppKit)
import AppKit
#endif

public enum ToskiPetHealthTheme {
    // MARK: Marca do produto

    /// Destaque do PetHealthTracker no claro.
    public static let indigo = fixed(0x3E4C8A)
    /// Destaque no escuro.
    public static let lilas = fixed(0xA9B4E8)
    /// Fundo suave (círculo atrás dos mascotes no claro).
    public static let lilasClaro = fixed(0xE3E6F5)
    /// Círculo do ícone.
    public static let circuloIcone = fixed(0x5C69A4)

    // MARK: Destaque (troca as de mesmo nome em ToskiColors)

    /// Círculo atrás dos mascotes
    public static let heroBackground = dynamic(light: 0xE3E6F5, dark: 0x2A2E45)
    /// Botão principal, aba ativa, links
    public static let accent = dynamic(light: 0x3E4C8A, dark: 0xA9B4E8)
    /// Destaque mais profundo (no escuro, mais claro): botão de texto da tela Erro, links ao passar o mouse
    public static let accentDeep = dynamic(light: 0x2C376A, dark: 0xC9D0F2)
    /// Texto sobre o destaque
    public static let onAccent = dynamic(light: 0xFFF8EE, dark: 0x231B17)
    /// Ação do toast (Desfazer, Abrir)
    public static let toastAction = dynamic(light: 0xB7C0EE, dark: 0x3E4C8A)
    /// Cartão de destaque (plano de saúde, Fase 2)
    public static let featureCard = dynamic(light: 0x3E4C8A, dark: 0x2C376A)
    /// Fundo do cadeado (recurso do Plus, pet congelado)
    public static let lockBackground = dynamic(light: 0x5C69A4, dark: 0x3A2D23)
    /// Cartões das miniaturas de tema (Aparência)
    public static let themePreviewCard = dynamic(light: 0x3E4C8A, lightAlpha: 0.35, dark: 0x3E4C8A, darkAlpha: 0.35)

    // MARK: Mascotes

    public static let dog = fixed(0xB88250)
    public static let dogEar = fixed(0x6E4529)
    public static let cat = fixed(0x7C8199)
    public static let catEarInner = fixed(0xE8B4B0)
    public static let catNose = fixed(0xD98C8C)
    public static let outline = dynamic(light: 0x231B17, dark: 0xF4E4CC)
    public static let eye = dynamic(light: 0x231B17, dark: 0x100C0A)

    // MARK: Black Friday

    public enum BlackFriday {
        public static let accent = fixed(0xA9B4E8)
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
