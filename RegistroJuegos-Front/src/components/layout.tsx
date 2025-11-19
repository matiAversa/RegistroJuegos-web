import React, { ReactNode, useState } from "react";

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const handleUserMenuToggle = () => setUserMenuOpen((open) => !open);

    const [refreshKey, setRefreshKey] = useState(0);
    const recargarTodo = () => setRefreshKey(prev => prev + 1);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            {/* Sidebar */}
            <aside style={{
                width: 220,
                background: "#222b3a",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                paddingTop: 30,
                boxShadow: "2px 0 4px rgba(0,0,0,0.03)"
            }}>
                <nav>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        <li onClick={() => console.log("presiono")} style={{ padding: "18px 30px", cursor: "pointer", fontWeight: 500 }}>Todos los juegos</li>
                        <li style={{ padding: "18px 30px", cursor: "pointer", fontWeight: 500 }}>Mis juegos</li>
                        <li style={{ padding: "18px 30px", cursor: "pointer", fontWeight: 500 }}>Recomendar Juegos</li>
                    </ul>
                </nav>
            </aside>

            {/* Main and Header */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Topbar */}
                <header
                    style={{
                        height: 60,
                        background: "#375a7f",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 32px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.04)"
                    }}
                >
                    <h1 style={{ margin: 0, fontWeight: 700, fontSize: 22 }}>
                        Organizador de Juegos
                    </h1>
                    <div style={{ position: "relative" }}>
                        <button
                            aria-label="Menú de usuario"
                            style={{
                                background: "none",
                                border: "none",
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: 16,
                                cursor: "pointer",
                                padding: 10,
                                borderRadius: 6
                            }}
                            onClick={handleUserMenuToggle}
                        >
                            Menú &#x25BC;
                        </button>
                        {userMenuOpen && (
                            <ul
                                style={{
                                    position: "absolute",
                                    right: 0,
                                    marginTop: 6,
                                    background: "#fff",
                                    color: "#222b3a",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                                    borderRadius: 4,
                                    listStyle: "none",
                                    minWidth: 130,
                                    padding: 0,
                                    zIndex: 20
                                }}
                            >
                                <li
                                    style={{
                                        padding: "12px 18px",
                                        cursor: "pointer",
                                        borderBottom: "1px solid #eee"
                                    }}
                                    onClick={() => {
                                        setUserMenuOpen(false);
                                        alert("Editar perfil");
                                    }}
                                >
                                    Editar perfil
                                </li>
                                <li
                                    style={{
                                        padding: "12px 18px",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => {
                                        localStorage.removeItem("mi_jwt");
                                        recargarTodo();
                                    }}
                                >
                                    Cerrar sesión
                                </li>
                            </ul>
                        )}
                    </div>
                </header>
                <main style={{ padding: 32, background: "#f6f8fc", flex: 1 }}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;