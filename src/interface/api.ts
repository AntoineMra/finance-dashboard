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
  type: TransacType;
  domain: Domain;
}

export interface Transaction {
  "@id"?: string;
  id: string;
  date?: string;
  budget?: string;
  label: string;
  amount: number;
  type: TransacType;
  category: string;
  comment: string;
}

export interface Domain {
  "@id"?: string;
  id: string;
  label: string;
  color: string;
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

export interface Memo {
  "@id"?: string;
  id: string;
  content: string;
  date: Date;
  formatedDate: string;
  status: string;
  createdAt?: Date;
}

export interface Support {
  "@id"?: string;
  id: string;
  name: string;
  type: InvestType;
}

export interface MediaObject {
  "@id"?: string;
  id: string;
  filePath: string;
  mimeType: string;
  size: number;
}

export interface BankExtraction {
  "@id"?: string;
  id: string;
  month: string;
  mediaObject: string;
  budget: string;
}

export interface BankTranslation {
  "@id"?: string;
  id: string;
  bankLabel: string;
  customLabel: string;
  category: string;
  status: string;
}

export interface BankExtractionResponse {
  "@id"?: string;
  budget: Budget;
  month: string;
  validatedTransactions: Transaction[];
  draftTransactions: DraftObject[];
}

export interface DraftObject {
  translation: BankTranslation;
  transaction: Transaction;
}

enum TransacType {
  Expense = "expense",
  Income = "income",
}

enum InvestType {
  Finance = "Finance",
  Immobilier = "Immobilier",
}
