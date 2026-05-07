import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ShieldCheck, 
    Smartphone, 
    Zap, 
    Globe, 
    ArrowRight, 
    CheckCircle2, 
    Lock, 
    CreditCard 
} from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0f172a] text-white">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-primary-600 p-2 rounded-lg">
                        <ShieldCheck size={24} />
                    </div>
                    <span className="text-xl font-bold gradient-text">Banco Kraper</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-blue-100/60">
                    <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
                    <a href="#seguridad" className="hover:text-white transition-colors">Seguridad</a>
                    <a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={() => navigate('/login')}
                        className="text-sm font-semibold hover:text-primary-400 transition-colors"
                    >
                        Iniciar Sesión
                    </button>
                    <button 
                        onClick={() => navigate('/register')}
                        className="bg-primary-600 hover:bg-primary-700 px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary-600/20"
                    >
                        Abrir Cuenta
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="animate-in slide-in-from-left duration-700">
                    <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 px-4 py-1 rounded-full text-primary-400 text-xs font-bold mb-6">
                        <Zap size={14} />
                        LA BANCA DEL FUTURO, HOY
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                        Tu dinero en la <br />
                        <span className="gradient-text">Era Digital.</span>
                    </h1>
                    <p className="text-lg text-blue-100/60 mb-10 max-w-lg leading-relaxed">
                        Gestiona tus finanzas con la tecnología más avanzada, seguridad de nivel militar y una experiencia de usuario diseñada para la simplicidad.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                            onClick={() => navigate('/register')}
                            className="bg-white text-black hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl"
                        >
                            Comienza Gratis <ArrowRight size={20} />
                        </button>
                        <button className="glass px-8 py-4 rounded-2xl font-bold hover:bg-white/5 transition-all">
                            Ver Beneficios
                        </button>
                    </div>
                </div>

                <div className="relative animate-in zoom-in duration-1000">
                    <div className="absolute -inset-4 bg-primary-500/20 rounded-full blur-3xl opacity-30"></div>
                    <div className="glass-card p-8 relative z-10 border-white/20 transform hover:rotate-2 transition-transform duration-500">
                        <div className="flex justify-between items-start mb-16">
                            <ShieldCheck className="text-primary-400" size={32} />
                            <div className="w-12 h-8 bg-white/10 rounded-md"></div>
                        </div>
                        <div className="space-y-4">
                            <p className="text-xl font-mono tracking-widest text-blue-100/80">**** **** **** 8842</p>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] text-blue-100/40 uppercase">Titular</p>
                                    <p className="text-sm font-bold uppercase tracking-wider">CLIENTE PREMIUM</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-blue-100/40 uppercase">Expira</p>
                                    <p className="text-sm font-bold">12/28</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Floating elements */}
                    <div className="absolute -top-10 -right-10 glass p-4 rounded-2xl shadow-2xl hidden md:block animate-bounce duration-[3000ms]">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-500/20 p-2 rounded-lg text-green-400">
                                <ArrowRight size={16} />
                            </div>
                            <div>
                                <p className="text-[10px] text-blue-100/40">Recibiste</p>
                                <p className="text-xs font-bold text-white">+ $1.250.000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="servicios" className="py-24 bg-black/20 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">¿Por qué elegir <span className="gradient-text">Banco Kraper?</span></h2>
                        <p className="text-blue-100/40 max-w-2xl mx-auto">Diseñamos cada función pensando en tu tranquilidad y rapidez financiera.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="glass-card p-10 hover:border-primary-500/50 transition-colors group">
                            <div className="bg-primary-600/20 w-14 h-14 rounded-2xl flex items-center justify-center text-primary-400 mb-6 group-hover:scale-110 transition-transform">
                                <Lock size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Seguridad Total</h3>
                            <p className="text-blue-100/60 text-sm leading-relaxed">
                                Encriptación de extremo a extremo y autenticación biométrica para que solo tú tengas acceso a tu dinero.
                            </p>
                        </div>
                        <div className="glass-card p-10 hover:border-primary-500/50 transition-colors group">
                            <div className="bg-primary-600/20 w-14 h-14 rounded-2xl flex items-center justify-center text-primary-400 mb-6 group-hover:scale-110 transition-transform">
                                <Zap size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Transferencias Instantáneas</h3>
                            <p className="text-blue-100/60 text-sm leading-relaxed">
                                Envía y recibe dinero en segundos a cualquier banco de Chile, sin comisiones ocultas y con notificaciones en tiempo real.
                            </p>
                        </div>
                        <div className="glass-card p-10 hover:border-primary-500/50 transition-colors group">
                            <div className="bg-primary-600/20 w-14 h-14 rounded-2xl flex items-center justify-center text-primary-400 mb-6 group-hover:scale-110 transition-transform">
                                <Smartphone size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">App Móvil Premium</h3>
                            <p className="text-blue-100/60 text-sm leading-relaxed">
                                Toda la potencia de un banco en tu bolsillo con nuestra aplicación diseñada para iOS y Android.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section id="seguridad" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                                <p className="text-4xl font-black mb-2">99%</p>
                                <p className="text-xs text-blue-100/40 uppercase font-bold tracking-widest">Satisfacción</p>
                            </div>
                            <div className="bg-primary-600/20 p-8 rounded-3xl border border-primary-500/20 mt-8">
                                <p className="text-4xl font-black mb-2">24/7</p>
                                <p className="text-xs text-blue-100/40 uppercase font-bold tracking-widest">Soporte</p>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-4xl font-bold mb-8 leading-tight">Expertos en proteger <br />lo que más te importa.</h2>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <CheckCircle2 className="text-green-400 mt-1" size={20} />
                                <div>
                                    <p className="font-bold">Monitoreo Antifraude</p>
                                    <p className="text-sm text-blue-100/60">Sistemas inteligentes que detectan actividad inusual al instante.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <CheckCircle2 className="text-green-400 mt-1" size={20} />
                                <div>
                                    <p className="font-bold">Soporte Prioritario</p>
                                    <p className="text-sm text-blue-100/60">Un equipo de expertos siempre listo para ayudarte en lo que necesites.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-primary-400" size={20} />
                        <span className="font-bold tracking-wider">BANCO KRAPER</span>
                    </div>
                    <p className="text-xs text-blue-100/30 text-center md:text-left">
                        © 2024 Banco Kraper Chile. Todos los derechos reservados. <br />
                        Institución financiera regulada y supervisada.
                    </p>
                    <div className="flex gap-6">
                        <Globe size={18} className="text-blue-100/40 cursor-pointer hover:text-white transition-colors" />
                        <ArrowRight size={18} className="text-blue-100/40 cursor-pointer hover:text-white transition-colors" />
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
