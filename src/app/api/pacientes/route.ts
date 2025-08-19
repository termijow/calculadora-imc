// src/app/api/pacientes/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

type Paciente = {
  cc: string;
  nombre: string;
  apellido: string;
  edad: number;
  peso: number;
  altura: number;
  genero?: string;
  imc?: number;
};

const pool = new Pool({
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT || '5432'),
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

export async function GET() {
  try {
    const query = 'SELECT * FROM pacientes ORDER BY nombre;';
    const result = await pool.query(query);
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

// Función para el método POST
export async function POST(request: Request) {
  try {
    const body = await request.json() as Paciente;
    const { cc, nombre, apellido, edad, peso, altura, genero } = body;

    if (!cc || !nombre || !apellido || !edad || !peso || !altura) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios.' }, { status: 400 });
    }

    const query = `
      INSERT INTO pacientes (cc, nombre, apellido, edad, peso, altura, genero)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [cc, nombre, apellido, edad, peso, altura, genero];
    const result = await pool.query(query, values);
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    console.error('Error al agregar un paciente:', error);
    if (error.code === '23505') {
      return NextResponse.json({ error: 'La cedula ya existe.' }, { status: 409 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}