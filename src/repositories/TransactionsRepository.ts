import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const income = this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'income'){
        return total += transaction.value; 
      }else{
        return total
      }
    }, 0);

    const outcome = this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'outcome'){
        return total += transaction.value; 
      }else{
        return total
      }
    }, 0);

    const total = this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'outcome'){
        return total -= transaction.value; 
      }else{
        return total += transaction.value;
      }
    }, 0);

    const balance: Balance = {
      income,
      outcome,
      total
    }

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transactionCreated = new Transaction({ title, value, type });
    this.transactions.push(transactionCreated);

    return transactionCreated;
  }
}

export default TransactionsRepository;
