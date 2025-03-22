import { Transaction } from '../types/transaction';
import { utils } from 'ethers';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export type ExportFormat = 'csv' | 'json' | 'xlsx' | 'pdf';

interface ExportOptions {
  format: ExportFormat;
  fileName?: string;
  includeGasInfo?: boolean;
  dateFormat?: string;
}

const formatDate = (date: Date, format: string = 'YYYY-MM-DD'): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes);
};

const getHeaders = (includeGasInfo: boolean = false): string[] => {
  const baseHeaders = [
    'Date',
    'Type',
    'Amount',
    'Address',
    'Status',
    'Network',
    'Transaction Hash'
  ];

  return includeGasInfo
    ? [...baseHeaders, 'Gas Price', 'Gas Limit', 'Gas Fee', 'Nonce']
    : baseHeaders;
};

const getTransactionRow = (tx: Transaction, includeGasInfo: boolean = false, dateFormat: string = 'YYYY-MM-DD'): (string | number)[] => {
  const baseRow = [
    formatDate(tx.date, dateFormat),
    tx.type,
    tx.amount,
    tx.address,
    tx.status,
    tx.network || 'Unknown',
    tx.hash || 'N/A'
  ];

  if (includeGasInfo) {
    return [
      ...baseRow,
      tx.gasPrice || 'N/A',
      tx.gasLimit || 'N/A',
      tx.fee || 'N/A',
      tx.nonce || 'N/A'
    ];
  }

  return baseRow;
};

export const exportTransactions = async (
  transactions: Transaction[],
  options: ExportOptions
): Promise<void> => {
  const {
    format,
    fileName = `transactions_${new Date().toISOString().split('T')[0]}`,
    includeGasInfo = false,
    dateFormat = 'YYYY-MM-DD'
  } = options;

  const headers = getHeaders(includeGasInfo);
  const rows = transactions.map(tx => getTransactionRow(tx, includeGasInfo, dateFormat));

  switch (format) {
    case 'csv':
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
      
      const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(csvBlob, `${fileName}.csv`);
      break;

    case 'json':
      const jsonContent = JSON.stringify(transactions, null, 2);
      const jsonBlob = new Blob([jsonContent], { type: 'application/json' });
      saveAs(jsonBlob, `${fileName}.json`);
      break;

    case 'xlsx':
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
      XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
      XLSX.writeFile(wb, `${fileName}.xlsx`);
      break;

    case 'pdf':
      // For PDF generation, you'll need to implement a PDF library like pdfmake
      // This is a placeholder for PDF generation logic
      throw new Error('PDF export not implemented yet');

    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
};

// Helper function to format transaction amounts with proper decimals
export const formatAmount = (amount: string, decimals: number = 18): string => {
  try {
    return utils.formatUnits(amount, decimals);
  } catch {
    return amount;
  }
}; 