import { NextRequest, NextResponse } from 'next/server';
import pool from '../../utils/postgres';

export async function POST(req: NextRequest) {

  function compare(s : string, S :string){
    return (s===S);
  }

  const { username, password } = await req.json();

  console.log("Received login request:", { username, password });

  try {
    const client = await pool.connect();
    console.log("Database connection established");

    try {
      const query = `
        SELECT * FROM credentials
        WHERE username = $1 OR email = $1
      `;

      const result = await client.query(query, [username]);
      console.log("Query result:", result.rows);

      if (result.rows.length === 0) {
        client.release();
        console.log("Invalid username or email");
        return NextResponse.json({ message: 'Invalid username or email' }, { status: 401 });
      }

      const user = result.rows[0];
      const isPasswordValid = await compare(password, user.password);
      console.log("Password valid:", isPasswordValid);

      if (!isPasswordValid) {
        client.release();
        console.log("Invalid password");
        return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
      }

      client.release();
      console.log("Login successful:", user);
      return NextResponse.json({ message: 'Login successful', user }, { status: 200 });
    } catch (queryError) {
      client.release();
      console.error('Error executing query:', queryError);
      return NextResponse.json({ message: 'Error executing query', error: queryError }, { status: 500 });
    }
  } catch (dbError) {
    console.error('Database connection error:', dbError);
    return NextResponse.json({ message: 'Database connection error', error: dbError }, { status: 500 });
  }
}
