import { NextRequest, NextResponse } from 'next/server';
import pool from '../../utils/postgres';

export async function POST(req: NextRequest) {
    const { email, username, password } = await req.json();

    console.log("Received login request:", { email, username, password });

    try {
        const client = await pool.connect();
        console.log("Database connection established");

        try {
            const query = `
                SELECT * FROM credentials WHERE email = $1;
            `;
            const result = await client.query(query, [email]);
            console.log("Query result:", result.rows);

            if (result.rows.length === 0) {
                // Insert new values into the credentials table and get the generated consumer_id
                const getMaxConsumerIdQuery = `
                    SELECT MAX(consumer_id) AS max_consumer_id FROM credentials;
                `;
                const maxConsumerIdResult = await client.query(getMaxConsumerIdQuery);
                const maxConsumerId = maxConsumerIdResult.rows[0].max_consumer_id || 0; // default to 0 if no rows found
                const newConsumerId = maxConsumerId + 1;
                const q2 = `
                    INSERT INTO credentials (username, email, password)
                    VALUES ($1, $2, $3)
                    RETURNING consumer_id;
                `;
                const q2Result = await client.query(q2, [username, email, password]);
                const consumerid = q2Result.rows[0].consumer_id;
                console.log("Generated consumer_id:", consumerid);

                const q3 = `
                    INSERT INTO consumer (consumer_id, name, email, phone_number, blood_group, address, date_of_birth, height, weight)
                                  VALUES (${newConsumerId},$1,$2,'1234567890', 'B+', 'BITS GOA', '1995-06-15', 170, 70);
                `;
                await client.query(q3, [consumerid, email]);
                console.log("Values inserted into consumer");

                client.release(); 

                return NextResponse.redirect('/UserDashboard');
            } else {
                client.release(); // Release the client back to the pool

                return NextResponse.json({ message: 'User already exists' }, { status: 409 });
            }
        } catch (err) {
            console.error("Error running queries", err);
            client.release(); // Release the client back to the pool in case of an error

            return NextResponse.json({ message: 'Query error' }, { status: 500 });
        }
    } catch (err) {
        console.error("Database connection failed", err);

        return NextResponse.json({ message: 'Database connection error' }, { status: 500 });
    }
}
