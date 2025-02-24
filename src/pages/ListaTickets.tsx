import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';

interface Ticket {
  id: string;
  problema: string;
  area: string;
  piso: string;
  imagen: string;
  timestamp: number;
  atendido: boolean;
}

function ListaTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    setTickets(storedTickets);
  }, []);

  const toggleAtendido = (id: string) => {
    const nuevosTickets = tickets.map(ticket =>
      ticket.id === id ? { ...ticket, atendido: !ticket.atendido } : ticket
    );
    setTickets(nuevosTickets);
    localStorage.setItem('tickets', JSON.stringify(nuevosTickets));
  };

  const borrarAtendidos = () => {
    const ticketsPendientes = tickets.filter(ticket => !ticket.atendido);
    setTickets(ticketsPendientes);
    localStorage.setItem('tickets', JSON.stringify(ticketsPendientes));
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Lista de Tickets</h1>
        <button
          onClick={borrarAtendidos}
          className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-xl hover:bg-red-600 transition duration-200 shadow-lg shadow-red-100 text-sm sm:text-base"
        >
          <Trash2 size={20} />
          Borrar Atendidos
        </button>
      </div>

      <div className="grid gap-6">
        {tickets
          .sort((a, b) => b.timestamp - a.timestamp)
          .map(ticket => (
            <div
              key={ticket.id}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden ${
                ticket.atendido ? 'border-l-8 border-green-500' : 'border-l-8 border-yellow-500'
              }`}
            >
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                        {ticket.area}
                      </h3>
                      <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {ticket.piso}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(ticket.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleAtendido(ticket.id)}
                    className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl transition duration-200 font-semibold text-sm sm:text-base whitespace-nowrap ${
                      ticket.atendido
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    }`}
                  >
                    {ticket.atendido ? (
                      <>
                        <CheckCircle size={20} />
                        Atendido
                      </>
                    ) : (
                      <>
                        <XCircle size={20} />
                        Pendiente
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Descripción del Problema:</h4>
                  <p className="text-gray-600 text-sm sm:text-base">{ticket.problema}</p>
                </div>

                {ticket.imagen && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Imagen Adjunta:</h4>
                    <div className="relative w-full overflow-hidden rounded-xl">
                      <img
                        src={ticket.imagen}
                        alt="Problema"
                        className="w-full max-w-2xl mx-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ListaTickets;