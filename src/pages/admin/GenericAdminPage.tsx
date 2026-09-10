import React, { useState } from 'react';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import { Search, Plus, Filter } from 'lucide-react';
import { TableColumn } from '../../data/mockAdminData';
import { clsx } from 'clsx';
import { useAdmin } from '../../store/AdminContext';

interface GenericAdminPageProps {
  title: string;
  description: string;
  columns: TableColumn[];
  categoryKey: string;
}

export default function GenericAdminPage({ title, description, columns, categoryKey }: GenericAdminPageProps) {
  const { data, addItem } = useAdmin();
  const tableData = data[categoryKey] || [];
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = { ...formData };
    
    // Auto-generate some IDs for realism if the first column is an ID
    if (columns[0].key === 'id' || columns[0].key === 'txn_id') {
      const prefix = columns[0].key === 'txn_id' ? 'TXN' : categoryKey.substring(0, 3).toUpperCase();
      newItem[columns[0].key] = `${prefix}-${Math.floor(Math.random() * 9000) + 1000}`;
    }

    addItem(categoryKey, newItem);
    setIsModalOpen(false);
    setFormData({});
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Header 
        title={title} 
        subtitle={description}
        actions={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            Add {title.slice(0, -1)}
          </button>
        }
      />
      <main className="p-8 max-w-7xl w-full mx-auto space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-80 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder={`Search ${title.toLowerCase()}...`} 
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg flex items-center gap-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-semibold text-slate-500 tracking-wider">
                {columns.map((col, index) => (
                  <th key={col.key} className={clsx("py-3.5 px-4", index === columns.length - 1 && col.isStatus ? "" : "")}>
                    {col.label}
                  </th>
                ))}
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {tableData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="py-8 text-center text-slate-500">
                    No {title.toLowerCase()} found.
                  </td>
                </tr>
              ) : null}
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-slate-50/75 transition">
                  {columns.map((col) => (
                    <td key={col.key} className="py-3.5 px-4">
                      {col.isStatus ? (
                        <span className={clsx(
                          "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border",
                          row[col.key] === "Active" || row[col.key] === "Published" || row[col.key] === "Paid" || row[col.key] === "Sent" || row[col.key] === "Completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : row[col.key] === "Upcoming" || row[col.key] === "Scheduled" || row[col.key] === "Draft"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        )}>
                          {row[col.key] || 'Pending'}
                        </span>
                      ) : (
                        <span className={clsx("font-medium", col.key === columns[0].key ? "text-slate-800" : "text-slate-600")}>
                          {row[col.key] || '-'}
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button className="font-medium text-indigo-600 hover:text-indigo-700">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Add ${title.slice(0, -1)}`}>
        <form onSubmit={handleAdd} className="space-y-4">
          {columns.map((col) => {
            if (col.key === 'id' || col.key === 'txn_id') return null; // Auto-generated
            return (
              <div key={col.key} className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">{col.label}</label>
                {col.isStatus ? (
                  <select 
                    required
                    onChange={(e) => handleInputChange(col.key, e.target.value)}
                    value={formData[col.key] || ''}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="" disabled>Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Completed">Completed</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Published">Published</option>
                    <option value="Paid">Paid</option>
                    <option value="Sent">Sent</option>
                  </select>
                ) : (
                  <input 
                    type={col.label.toLowerCase().includes('date') ? 'date' : 'text'}
                    required
                    onChange={(e) => handleInputChange(col.key, e.target.value)}
                    value={formData[col.key] || ''}
                    placeholder={`Enter ${col.label.toLowerCase()}`}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                )}
              </div>
            );
          })}
          <div className="pt-2 flex gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition">Add</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
