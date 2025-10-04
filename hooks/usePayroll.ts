
import { useState, useCallback } from 'react';
import { type Payroll } from '../types';
import { MOCK_PAYROLLS } from '../constants';

export const usePayroll = () => {
  const [payrolls, setPayrolls] = useState<Payroll[]>(MOCK_PAYROLLS);

  const getPayrolls = useCallback(() => {
    return payrolls;
  }, [payrolls]);

  const getPayrollById = useCallback((id: string): Payroll | undefined => {
    return payrolls.find(p => p.id === id);
  }, [payrolls]);

  const addPayroll = useCallback((newPayrollData: Omit<Payroll, 'id'>) => {
    const newPayroll: Payroll = {
      ...newPayrollData,
      id: new Date().getTime().toString(), // simple unique id
    };
    setPayrolls(prev => [...prev, newPayroll]);
  }, []);

  const updatePayroll = useCallback((id: string, updatedData: Payroll) => {
    setPayrolls(prev => prev.map(p => p.id === id ? updatedData : p));
  }, []);

  const deletePayroll = useCallback((id: string) => {
    if (window.confirm('Are you sure you want to delete this payroll record?')) {
      setPayrolls(prev => prev.filter(p => p.id !== id));
    }
  }, []);
  
  const isPayrollNumberUnique = useCallback((payrollNumber: string, currentId?: string) => {
    return !payrolls.some(p => p.payrollNumber === payrollNumber && p.id !== currentId);
  }, [payrolls]);

  return { payrolls, getPayrolls, getPayrollById, addPayroll, updatePayroll, deletePayroll, isPayrollNumberUnique };
};
