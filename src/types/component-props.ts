export const sizes = ['sm', 'md', 'lg'] as const;
export type Size = typeof sizes[number];

export const variants = ['text', 'contained', 'outlined'] as const;
export type Variant = typeof variants[number];
