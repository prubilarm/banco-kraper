import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { ArrowLeft, Shield, TrendingUp, Users, Activity, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllTransactions = async () => {
            try {
                const res = await api.get('/transactions/all');
                setTransactions(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllTransactions();
    }, []);

    const totalVolume = transactions.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando panel de control...</div>;

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-blue-100/60 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    Volver al Dashboard
                </button>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <div className="bg-purple-600 p-2 rounded-xl">
                            <Shield size={24} />
                        </div>
                        Panel Administrativo
                    </h2>
                    <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 text-xs text-blue-100/40">
                        Modo Administrador Activo
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="glass-card p-6 border-l-4 border-l-blue-500">
                        <div className="flex justify-between items-center mb-4">
                            <TrendingUp className="text-blue-400" size={24} />
                            <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded">VOLUMEN</span>
                        </div>
                        <p className="text-sm text-blue-100/60 mb-1">Volumen Total Transado</p>
                        <p className="text-2xl font-bold">{totalVolume.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                    </div>
                    <div className="glass-card p-6 border-l-4 border-l-purple-500">
                        <div className="flex justify-between items-center mb-4">
                            <List className="text-purple-400" size={24} />
                            <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-1 rounded">OPERACIONES</span>
                        </div>
                        <p className="text-sm text-blue-100/60 mb-1">Total de Movimientos</p>
                        <p className="text-2xl font-bold">{transactions.length}</p>
                    </div>
                    <div className="glass-card p-6 border-l-4 border-l-green-500">
                        <div className="flex justify-between items-center mb-4">
                            <Activity className="text-green-400" size={24} />
                            <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-1 rounded">ESTADO</span>
                        </div>
                        <p className="text-sm text-blue-100/60 mb-1">Estado del Sistema</p>
                        <p className="text-2xl font-bold text-green-400">Operativo</p>
                    </div>
                </div>

                {/* All Transactions Table */}
                <div className="glass-card overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex items-center gap-3">
                        <List size={20} className="text-primary-400" />
                        <h3 className="font-bold">Historial Global de Transacciones</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-xs text-blue-100/40 uppercase tracking-widest">
                                <tr>
                                    <th className="p-4 font-medium">Usuario</th>
                                    <th className="p-4 font-medium">Tipo</th>
                                    <th className="p-4 font-medium">Monto</th>
                                    <th className="p-4 font-medium">Fecha</th>
                                    <th className="p-4 font-medium">Descripción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {transactions.map((t) => (
                                    <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-4 text-sm font-medium">{t.user_name || 'N/A'}</td>
                                        <td className="p-4">
                                            <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${t.type === 'deposit' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                                {t.type}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm font-bold">
                                            {parseFloat(t.amount).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                        </td>
                                        <td className="p-4 text-xs text-blue-100/40">{new Date(t.created_at).toLocaleString()}</td>
                                        <td className="p-4 text-sm text-blue-100/60 italic">{t.description || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
