import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { 
    Wallet, 
    ArrowUpRight, 
    ArrowDownLeft, 
    CreditCard, 
    History, 
    LogOut, 
    User as UserIcon,
    ArrowRightLeft,
    ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [accRes, transRes] = await Promise.all([
                    api.get('/accounts/my'),
                    api.get('/transactions/my')
                ]);
                setAccounts(accRes.data);
                setTransactions(transRes.data);
            } catch (err) {
                console.error('Error fetching data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const totalBalance = accounts.reduce((acc, curr) => acc + parseFloat(curr.balance), 0);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando tu banca...</div>;

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
            {/* Header */}
            <header className="max-w-6xl mx-auto flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                    <div className="bg-primary-600 p-2 rounded-xl">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold gradient-text">Banco Kraper</h1>
                        <p className="text-xs text-blue-200/40">Premium Digital Banking</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-medium">{user.full_name}</p>
                        <p className="text-xs text-blue-200/40">{user.role}</p>
                    </div>
                    <button 
                        onClick={logout}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors text-red-400"
                        title="Cerrar Sesión"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Accounts & Quick Actions */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Welcome & Total Balance */}
                    <div className="glass-card p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Hola, {user.full_name.split(' ')[0]} 👋</h2>
                            <p className="text-blue-100/60">Este es el resumen de tus finanzas hoy.</p>
                        </div>
                        <div className="text-right">
                            <p className="text-blue-100/60 text-sm mb-1 font-medium">Saldo Total Unificado</p>
                            <p className="text-4xl font-black text-white">
                                {totalBalance.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                            </p>
                        </div>
                    </div>

                    {/* Cards Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {accounts.map((acc, index) => (
                            <div key={acc.id} className={`glass-card p-6 relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform ${index === 1 ? 'border-primary-500/30' : ''}`}>
                                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary-600/10 rounded-full blur-3xl group-hover:bg-primary-600/20 transition-colors"></div>
                                <div className="flex justify-between items-start mb-10 relative z-10">
                                    <div>
                                        <p className="text-xs font-semibold text-blue-100/40 uppercase tracking-widest">{acc.account_type}</p>
                                        <p className="text-lg font-bold mt-1">{acc.balance.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                                    </div>
                                    <CreditCard className="text-primary-400" size={24} />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-sm font-mono tracking-widest text-blue-100/60 mb-1">**** **** **** {acc.card_number.slice(-4)}</p>
                                    <div className="flex justify-between items-end">
                                        <p className="text-xs text-blue-100/30">CUENTA: {acc.account_number}</p>
                                        <div className="w-10 h-6 bg-white/10 rounded-md"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-4">
                        <button 
                            onClick={() => navigate('/transfer')}
                            className="bg-primary-600 hover:bg-primary-700 px-6 py-4 rounded-2xl flex items-center gap-3 transition-all flex-1 min-w-[150px] justify-center"
                        >
                            <ArrowRightLeft size={20} />
                            <span className="font-semibold">Transferir</span>
                        </button>
                        <button className="bg-white/5 hover:bg-white/10 px-6 py-4 rounded-2xl flex items-center gap-3 transition-all border border-white/10 flex-1 min-w-[150px] justify-center">
                            <ArrowDownLeft size={20} />
                            <span className="font-semibold text-blue-100">Recibir</span>
                        </button>
                        {user.role === 'Admin' && (
                            <button 
                                onClick={() => navigate('/admin')}
                                className="bg-purple-600/20 hover:bg-purple-600/30 px-6 py-4 rounded-2xl flex items-center gap-3 transition-all border border-purple-500/30 flex-1 min-w-[150px] justify-center"
                            >
                                <ShieldCheck size={20} className="text-purple-400" />
                                <span className="font-semibold text-purple-200">Admin</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Column: Recent Transactions */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <History size={18} className="text-primary-400" />
                            Transacciones Recientes
                        </h3>
                    </div>
                    <div className="glass-card overflow-hidden">
                        <div className="max-h-[600px] overflow-y-auto">
                            {transactions.length === 0 ? (
                                <div className="p-10 text-center text-blue-100/20 italic">
                                    No hay movimientos aún
                                </div>
                            ) : (
                                transactions.map((t) => (
                                    <div key={t.id} className="p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors flex items-center gap-4">
                                        <div className={`p-2 rounded-lg ${t.type === 'deposit' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                            {t.type === 'deposit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold truncate">{t.description || (t.type === 'transfer' ? 'Transferencia' : 'Abono')}</p>
                                            <p className="text-[10px] text-blue-100/40">{new Date(t.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <p className={`text-sm font-bold ${t.type === 'deposit' ? 'text-green-400' : 'text-blue-200'}`}>
                                            {t.type === 'deposit' ? '+' : '-'}{parseFloat(t.amount).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
