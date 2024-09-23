export enum InvoiceTransactionStatus {
    PAID = 'Payé',
    CANCELLED = 'Annulé',
    PENDING = 'En Attente',
    CREDIT = 'A crédit',
    UNPAID = 'Impayé',
    LOST = 'Perte'
}
export enum MethodPayment {
    CASH  = 'En espèce',
    OM = 'Orange Money',
    MOMO = 'Mobile Money',
}
export enum AlertConfig {
    ACTIVED = 'Activé',
    DESACTIVED = 'Désactivé'
}