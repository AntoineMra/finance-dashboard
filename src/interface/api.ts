export interface Budget {
  '@id'?: string;
  id: string;
  title: string;
  date: Date;
  formatedDate: string;
  status: string;
  transactions: Transac[];
  createdAt?: Date;
}

export interface Category {
  id: string;
  label: string;
  domain: Domain;
}

export interface Transac {
  id: string;
  date?: string;
  label: string;
  amount: number;
  type: TransacType;
  category: Category;
}

export interface Domain {
  id: string;
  label: string;
}

export interface Invest {
  id: string;
  initialAmount: number;
  currentAmount: number;
  returnAmount: number;
  monthlyInvest?: string;
  createdAt?: string;
  goals: Goal[];
}

export interface Goal {
  id: string;
  purpose: string;
  endingDate: string;
  amount: number;
  createdAt?: string;
  investment: Invest;
}

export interface Support {
  id: number;
  name: string;
  type: InvestType;
}

enum TransacType {
  Expense = "expense",
  Income = "income",
}

enum InvestType {
  Finance = "Finance",
  Immobilier = "Immobilier",
}
