export interface Budget {
  id: number;
  title: string;
  month: string;
  year: string;
  expenses: Transac[];
  incomes: Transac[];
}

export interface Category {
  id: number;
  title: string;
  type: string;
  expenses: Transac[];
  incomes: Transac[];
  color?: string;
}

export interface Transac {
  id: number;
  date?: string;
  description: string;
  amount: number;
  createdAt?: string;
  budget?: Budget;
  category?: Category;
}

export interface Invest {
  id: number;
  initialAmount: number;
  currentAmount: number;
  returnAmount: number;
  monthlyInvest?: number;
  createdAt?: string;
  goals: Goal[];
}

export interface Goal {
  id: number;
  purpose: string;
  endingDate: string;
  amount: number;
  createdAt?: string;
  investment: Invest;
}

export interface Support {
  id: number;
  name: string;
  type: Type;
}

enum Type {
  Finance = "Finance",
  Immobilier = "Immobilier",
}
