import { Client } from "https://deno.land/x/postgres@v0.15.0/mod.ts";

const client = new Client({
  user: "postgres",
  database: "postgres",
  hostname: "db.lmanxamngosufetdqmxk.supabase.co",
  password: "deno@001db!!!",
  port: "5432",
});

await client.connect();

{
  const result = await client.queryObject("select * from Comments");
  console.log(result.rows);
}
