import React, { useState } from 'react';
import { ClipboardList, ImagePlus } from 'lucide-react';

interface Ticket {
  id: string;
  problema: string;
  area: string;
  piso: string;
  imagen: string;
  timestamp: number;
  atendido: boolean;
}

function FormularioTicket() {
  const [problema, setProblema] = useState('');
  const [area, setArea] = useState('');
  const [piso, setPiso] = useState('');
  const [imagen, setImagen] = useState('');

  const pisos = [
    'Piso -6',
    'Piso -5',
    'Piso -4',
    'Piso -3',
    'Piso -2',
    'Piso -1',
    'Piso SS',
    'Piso 1',
    'Piso 2',
    'Piso 3',
    'Piso 4',
    'Piso 5',
    'Piso 6',
    'Piso 7',
    'Piso 8',
    'Piso 9',
    'Piso 10',
    'Piso 11',
    'Piso 12'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nuevoTicket: Ticket = {
      id: Date.now().toString(),
      problema,
      area,
      piso,
      imagen,
      timestamp: Date.now(),
      atendido: false
    };

    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    localStorage.setItem('tickets', JSON.stringify([...tickets, nuevoTicket]));

    setProblema('');
    setArea('');
    setPiso('');
    setImagen('');

    alert('Ticket creado exitosamente');
  };

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-8">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="bg-purple-100 p-2 sm:p-3 rounded-full">
            <ClipboardList className="text-purple-600 w-5 h-5 sm:w-7 sm:h-7" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Crear Nuevo Ticket</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ¿Cuál es el problema?
            </label>
            <textarea
              value={problema}
              onChange={(e) => setProblema(e.target.value)}
              required
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              rows={3}
              placeholder="Describe el problema detalladamente..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ¿En qué área se encuentra?
            </label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
              placeholder="Ej: Emergencia, Consulta Externa..."
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ¿En qué piso está?
            </label>
            <select
              value={piso}
              onChange={(e) => setPiso(e.target.value)}
              required
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-white appearance-none cursor-pointer"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              }}
            >
              <option value="">Seleccione un piso</option>
              {pisos.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Imagen del problema
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImagenChange}
                className="hidden"
                id="imagen-input"
              />
              <label 
                htmlFor="imagen-input"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <ImagePlus className="text-gray-400 w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-sm text-gray-500">
                  Click para subir una imagen
                </span>
              </label>
              {imagen && (
                <img
                  src={imagen}
                  alt="Vista previa"
                  className="mt-4 max-w-full sm:max-w-xs mx-auto rounded-lg"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-xl hover:bg-purple-700 transition duration-200 font-semibold shadow-lg shadow-purple-100"
          >
            Enviar Ticket
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
          Orden de atención
        </h2>
        <div className="space-y-3">
          {JSON.parse(localStorage.getItem('tickets') || '[]')
            .filter((ticket: Ticket) => !ticket.atendido)
            .sort((a: Ticket, b: Ticket) => a.timestamp - b.timestamp)
            .map((ticket: Ticket, index: number) => (
              <div
                key={ticket.id}
                className="bg-purple-50 p-4 rounded-xl border border-purple-100"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-semibold text-purple-900">Ticket #{index + 1}</span>
                  <span className="text-purple-600">{ticket.area} - {ticket.piso}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FormularioTicket;