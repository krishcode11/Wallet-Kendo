export interface Transaction {
  date: Date;
  type: 'Sent' | 'Received';
  amount: string;
  address: string;
  status: 'Pending' | 'Completed' | 'Failed';
  network?: string;
  hash?: string;
  fee?: string;
  nonce?: number;
  gasPrice?: string;
  gasLimit?: string;
  data?: string;
} 