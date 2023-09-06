export interface Budget {
  "@id"?: string;
  id: string;
  title: string;
  date: Date;
  formatedDate: string;
  status: string;
  transactions: Transaction[];
  createdAt?: Date;
  transactionsTotalExpense?: number;
  transactionsTotalIncome?: number;
  transactionsPercent?: number;
  transactionsDifferential?: number;
}

export interface Category {
  "@id"?: string;
  id: string;
  label: string;
  domain: Domain;
}

export interface Transaction {
  "@id"?: string;
  id: string;
  date?: string;
  label: string;
  amount: number;
  type: TransacType;
  category: string;
}

export interface Domain {
  "@id"?: string;
  id: string;
  label: string;
}

export interface Invest {
  "@id"?: string;
  id: string;
  initialAmount: number;
  currentAmount: number;
  returnAmount: number;
  monthlyInvest?: string;
  createdAt?: string;
  goals: Goal[];
}

export interface Goal {
  "@id"?: string;
  id: string;
  purpose: string;
  endingDate: string;
  amount: number;
  createdAt?: string;
  investment: Invest;
}

export interface Support {
  "@id"?: string;
  id: string;
  name: string;
  type: InvestType;
}

export interface MediaObject {
  "@id"?: string;
  filePath: string;
  mimeType: string;
  size: number;
}

export interface BankExtraction {
  "@id"?: string;
  id: string;
  month: string;
  mediaObject: MediaObject;
  budget: Budget;
}

export interface BankExtractionResponse {
  "@id"?: string;
  budget: Budget;
  month: string;
  transactions: Transaction[];
}

enum TransacType {
  Expense = "expense",
  Income = "income",
}

enum InvestType {
  Finance = "Finance",
  Immobilier = "Immobilier",
}
