export function formatCurrency (price:number) {
    return (Math.round(price) / 100).toFixed(2)
}