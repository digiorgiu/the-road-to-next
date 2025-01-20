import { MyBig } from "@/lib/big"

function toCents(amount: number) {
    return new MyBig(amount).mul(100).toNumber()
}

function fromCents(amount: number) {
    return new MyBig(amount).div(100).toNumber()
}

function formatCurrency(amount: number) {
    return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(fromCents(amount))
}

export { formatCurrency, fromCents, toCents }