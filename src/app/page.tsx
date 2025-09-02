// src/app/page.tsx
"use client";

import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import Head from 'next/head';

interface Paciente {
  cc: string;
  nombre: string;
  apellido: string;
  edad: number;
  peso: number;
  altura: number;
  genero?: string;
  imc: number | null;
}

type StatusMessage = {
  type: 'success' | 'error';
  text: string;
};

const initialFormData = {
  cc: '', nombre: '', apellido: '', edad: '', peso: '', altura: '', genero: '',
};

export default function Home() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState<StatusMessage | null>(null);

  const fetchPacientes = async () => {
    try {
      const res = await fetch('/api/pacientes');
      const data = await res.json();
      if (res.ok) {
        setPacientes(data);
      } else { throw new Error(data.error); }
    } catch (error: any) {
      setMessage({ type: 'error', text: `Error al cargar pacientes: ${error.message}` });
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch('/api/pacientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...formData,
            edad: parseInt(formData.edad),
            peso: parseFloat(formData.peso),
            altura: parseFloat(formData.altura),
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: `Paciente registrado` });
        setFormData(initialFormData);
        fetchPacientes();
      } else { throw new Error(data.error); }
    } catch (error: any) {
      setMessage({ type: 'error', text: `${error.message}` });
    }
  };
  
  const getImcClassification = (imc: number | null) => {
    if (imc === null) return <span className="text-gray-400">N/A</span>;
    const styles = 'px-2 py-1 text-xs font-semibold rounded-full';
    if (imc < 18.5) return <span className={`${styles} bg-blue-900 text-blue-200`}>Bajo peso</span>;
    if (imc <= 24.9) return <span className={`${styles} bg-green-900 text-green-200`}>Peso normal</span>;
    if (imc <= 29.9) return <span className={`${styles} bg-yellow-900 text-yellow-200`}>Sobrepeso</span>;
    return <span className={`${styles} bg-red-900 text-red-200`}>Obesidad</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      <Head>
        <title>Calculadora de IMC</title>
      </Head>
      <main className="container mx-auto px-6 py-12">
        <header className="text-center">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-md">Calculadora de IMC</h1>
          <p className="mt-2 text-gray-400">Registra pacientes y consulta su clasificación de IMC</p>
        </header>

        {/* FORMULARIO */}
        <section className="mt-12 max-w-2xl mx-auto bg-gray-800 p-10 rounded-2xl shadow-xl border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">Registrar Nuevo Paciente</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="cc" placeholder="Cédula (CC)" value={formData.cc} onChange={handleChange} required 
                className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required 
                className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required 
                className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <input type="number" name="edad" placeholder="Edad" value={formData.edad} onChange={handleChange} required 
                className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <input type="number" step="0.01" name="peso" placeholder="Peso (kg, ej: 70.5)" value={formData.peso} onChange={handleChange} required 
                className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <input type="number" step="0.01" name="altura" placeholder="Altura (m, ej: 1.75)" value={formData.altura} onChange={handleChange} required 
                className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <select name="genero" value={formData.genero} onChange={handleChange} 
                className="md:col-span-2 w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">Seleccionar género (opcional)</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
              </select>
              <button type="submit" 
                className="md:col-span-2 w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Registrar Paciente
              </button>
          </form>
          {message && (
            <div className={`mt-6 text-center p-4 rounded-lg text-sm font-medium shadow-sm ${
              message.type === 'success' ? 'bg-green-900 text-green-200 border border-green-700' 
              : 'bg-red-900 text-red-200 border border-red-700'}`}>
              {message.text}
            </div>
          )}
        </section>

        {/* TABLA PACIENTES */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">Pacientes Registrados</h2>
          <div className="overflow-x-auto bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
            <table className="min-w-full divide-y divide-gray-700 text-sm">
              <thead className="bg-gray-700 text-gray-200">
                  <tr>
                      <th className="px-6 py-3 text-left font-semibold">CC</th>
                      <th className="px-6 py-3 text-left font-semibold">Nombre Completo</th>
                      <th className="px-6 py-3 text-center font-semibold">IMC</th>
                      <th className="px-6 py-3 text-center font-semibold">Clasificación</th>
                  </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {pacientes.length > 0 ? pacientes.map((p) => (
                  <tr key={p.cc} className="hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4 font-mono text-gray-200">{p.cc}</td>
                      <td className="px-6 py-4 text-gray-100">{p.nombre} {p.apellido}</td>
                      <td className="px-6 py-4 text-center font-bold text-lg text-blue-400">{p.imc}</td>
                      <td className="px-6 py-4 text-center">{getImcClassification(p.imc)}</td>
                  </tr>
                )) : (
                  <tr>
                      <td colSpan={4} className="text-center py-12 text-gray-500">No hay pacientes registrados.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
