/** Formats a rupee amount with thousands separators, e.g. 185000 -> "₹185,000". */
export const formatCurrency = (value: number): string => `₹${value.toLocaleString()}`;
