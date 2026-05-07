import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { ArrowLeft, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

const Transfer = () => {
    const [accounts, setAccounts] = useState([]);
    const [formData, setFormData] = useState({
        sender_account_id: '',
        receiver_account_number: '',
        amount: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', msg: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const res = await api.get('/accounts/my');
                setAccounts(res.data);
                if (res.data.length > 0) {
                    setFormData(prev => ({ ...prev, sender_account_id: res.data[0].id }));
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchAccounts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', msg: '' });

        try {
            await api.post('/transactions/transfer', formData);
            setStatus({ type: 'success', msg: '¡Transferencia realizada con éxito!' });
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (err) {
            setStatus({ type: 'error', msg: err.response?.data?.error || 'Error al procesar transferencia' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8 flex flex-col items-center">
            <div className="w-full max-w-2xl">
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-blue-100/60 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    Volver al Dashboard
                </button>

                <div className="glass-card p-8">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <div className="bg-primary-600 p-2 rounded-lg">
                            <Send size={20} />
                        </div>
                        Realizar Transferencia
                    </h2>

                    {status.msg && (
                        <div className={`p-4 rounded-xl mb-8 flex items-center gap-3 ${status.type === 'success' ? 'bg-green-500/20 text-green-200 border border-green-500/30' : 'bg-red-500/20 text-red-200 border border-red-500/30'}`}>
                            {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                            {status.msg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-blue-100/60 mb-2">Cuenta de Origen</label>
                            <select 
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                value={formData.sender_account_id}
                                onChange={(e) => setFormData({...formData, sender_account_id: e.target.value})}
                            >
                                {accounts.map(acc => (
                                    <option key={acc.id} value={acc.id} className="bg-[#1e293b]">
                                        {acc.account_type} - {acc.balance.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-blue-100/60 mb-2">Número de Cuenta Destino</label>
                            <input 
                                type="text"
                                required
                                placeholder="Ej: 1234567890"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                value={formData.receiver_account_number}
                                onChange={(e) => setFormData({...formData, receiver_account_number: e.target.value})}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-blue-100/60 mb-2">Monto (CLP)</label>
                                <input 
                                    type="number"
                                    required
                                    placeholder="0"
                                    min="1"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-100/60 mb-2">Descripción (Opcional)</label>
                                <input 
                                    type="text"
                                    placeholder="Ej: Pago arriendo"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary-600/20 flex items-center justify-center gap-3 mt-4"
                        >
                            {loading ? 'Procesando...' : (
                                <>
                                    <Send size={20} />
                                    Confirmar Transferencia
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Transfer;
