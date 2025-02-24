import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FormularioTicket from './pages/FormularioTicket';
import ListaTickets from './pages/ListaTickets';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <nav className="bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src="https://www.sanpablolavictoria.com.pe/wp-content/uploads/2024/10/logo.png" 
                  alt="Clínica San Pablo La Victoria"
                  className="h-16"
                />
              </div>
              <div className="flex gap-6">
                <Link 
                  to="/" 
                  className="text-purple-700 hover:text-purple-900 font-semibold px-4 py-2 rounded-lg hover:bg-purple-50 transition duration-200"
                >
                  Crear Ticket
                </Link>
                <Link 
                  to="/tickets" 
                  className="text-purple-700 hover:text-purple-900 font-semibold px-4 py-2 rounded-lg hover:bg-purple-50 transition duration-200"
                >
                  Ver Tickets
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<FormularioTicket />} />
            <Route path="/tickets" element={<ListaTickets />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;