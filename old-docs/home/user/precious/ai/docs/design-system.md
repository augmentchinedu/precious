# Augment Plus Design System

**Author:** Sage, Design Manager
**Version:** 1.0
**Date:** 2026-02-17

## 1. Introduction

This document outlines the foundational design system for the Augment Plus platform. Its purpose is to ensure visual consistency, improve user experience, and streamline the development process. All new components should adhere to these guidelines.

## 2. Color Palette

Our color palette is designed to be clean, modern, and accessible.

-   **Primary:** `#42b983` (Vibrant Green) - Used for primary calls-to-action, active states, and key highlights.
-   **Secondary:** `#35495e` (Dark Slate Blue) - Used for major headings, sub-headings, and important secondary elements.
-   **Accent/Neutral Gray:** `#f4f4f8` (Light Gray) - Used for backgrounds of containers or cards to create separation.
-   **Text (Primary):** `#333333` (Dark Gray) - Used for main body text and paragraphs.
-   **Text (Secondary):** `#555555` (Medium Gray) - Used for supplementary text.
-   **Border/Lines:** `#eeeeee` (Light Silver) - Used for separators and borders.

## 3. Typography

We will use a clean, sans-serif font stack for readability and a modern feel.

-   **Font Family:** `'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif`
-   **Headings:**
    -   `h1`: 2.5rem, bold, color: `var(--primary)`
    -   `h2`: 2rem, bold, color: `var(--secondary)`
    -   `h3`: 1.5rem, bold, color: `var(--secondary)`
-   **Body Text:**
    -   `p`: 1rem (16px), normal weight, color: `var(--text-primary)`

## 4. Component Guidelines

### Links
-   **Default State:** `color: var(--primary)`, `text-decoration: none`, `font-weight: bold`
-   **Hover State:** `text-decoration: underline`

### Containers & Cards
-   **Background:** `var(--accent-gray)` or `white`
-   **Padding:** `1.5rem`
-   **Border:** `1px solid var(--border-lines)`
-   **Border Radius:** `8px`
-   **Box Shadow:** `0 2px 8px rgba(0, 0, 0, 0.1)` for a subtle lift effect.

### Buttons
-   **Primary Button:**
    -   `background-color: var(--primary)`
    -   `color: white`
    -   `padding: 0.75rem 1.5rem`
    -   `border: none`
    -   `border-radius: 4px`
-   **Secondary Button:**
    -   `background-color: transparent`
    -   `color: var(--primary)`
    -   `border: 2px solid var(--primary)`
