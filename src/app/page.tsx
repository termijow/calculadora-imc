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
    if (imc === null) return <span className="text-gray-500">N/A</span>;
    const styles = 'px-2 py-1 text-xs font-semibold rounded-full';
    if (imc < 18.5) return <span className={`${styles} bg-blue-100 text-blue-800`}>Bajo peso</span>;
    if (imc <= 24.9) return <span className={`${styles} bg-green-100 text-green-800`}>Peso normal</span>;
    if (imc <= 29.9) return <span className={`${styles} bg-yellow-100 text-yellow-800`}>Sobrepeso</span>;
    return <span className={`${styles} bg-red-100 text-red-800`}>Obesidad</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Head>
        <title>Calculadora de IMC</title>
      </Head>
      <main className="container mx-auto px-4 py-10">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Calculadora de IMC</h1>
        </header>

        <section className="mt-12 max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Registrar Nuevo Paciente</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="cc" placeholder="Cédula (CC)" value={formData.cc} onChange={handleChange} required className="input-style" />
              <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required className="input-style" />
              <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required className="input-style" />
              <input type="number" name="edad" placeholder="Edad" value={formData.edad} onChange={handleChange} required className="input-style" />
              <input type="number" step="0.01" name="peso" placeholder="Peso (kg, ej: 70.5)" value={formData.peso} onChange={handleChange} required className="input-style" />
              <input type="number" step="0.01" name="altura" placeholder="Altura (m, ej: 1.75)" value={formData.altura} onChange={handleChange} required className="input-style" />
              <select name="genero" value={formData.genero} onChange={handleChange} className="md:col-span-2 input-style">
                  <option value="">Seleccionar género (opcional)</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
              </select>
              <button type="submit" className="md:col-span-2 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Registrar Paciente
              </button>
          </form>
          {message && (
            <div className={`mt-4 text-center p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message.text}
            </div>
          )}
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Pacientes Registrados</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                  <tr>
                      <th className="th-style">CC</th>
                      <th className="th-style">Nombre Completo</th>
                      <th className="th-style text-center">IMC</th>
                      <th className="th-style text-center">Clasificación</th>
                  </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pacientes.length > 0 ? pacientes.map((p) => (
                  <tr key={p.cc} className="hover:bg-gray-50">
                      <td className="td-style font-mono">{p.cc}</td>
                      <td className="td-style">{p.nombre} {p.apellido}</td>
                      <td className="td-style text-center font-bold text-lg text-blue-600">{p.imc}</td>
                      <td className="td-style text-center">{getImcClassification(p.imc)}</td>
                  </tr>
                )) : (
                  <tr>
                      <td colSpan={4} className="text-center py-10 text-gray-500">No hay pacientes registrados.</td>
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