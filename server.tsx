/** @jsx h */
import { serve } from "https://deno.land/std@0.139.0/http/server.ts";
import { h, ssr } from "https://crux.land/nanossr@0.0.4";
import { Client } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
// import { config } from "https://deno.land/x/dotenv/mod.ts";

// const ENV = config();
const client = new Client({
  user: "postgres",
  database: "postgres",
  hostname: Deno.env.host,
  password: Deno.env.pw,
  port: "5432",
});

const connection = client.connect

type Comment = {
  name: string;
  comment: string;
  date:Date
}


serve(async (req: Request) => {
  if (req.method === "POST") {
    const form = await req.formData();
    await client.queryObject(
      "insert into Comments (name,comment) values ($1, $2)",
      [form.get("name"),form.get("comment")],
    )
    return new Response("", {
      status: 303,
      headers: {
        location:"/"
      }
    })
  }
  await connection;
  const result = await client.queryObject<Comment>("select * from Comments")
  return ssr(()=> <App comments={result.rows}/>)
})

function App(props:{comments:Comment[]}) {
  return (
    <div class="px-8 py-4">
      <h1 class="font-semibold text-2xl">Hello Deno</h1>
      <p class="mt-2 text-gray-500">Welcome to example page!</p>
      <ul>

      {props.comments.map((comment) => (
        <li>
            {comment.name} &gt; {comment.comment}{" "}
            <span class="text-gray-500 text-sm">
              ({comment.date.toLocaleString("ja")})
            </span>
          </li>
        ))}
      </ul>
      <form action="/" method="POST" class="mt-4 flex gap-2">
        <input name="name" placeholder="name" class="border rounded px-2" />
        <input
          name="comment"
          placeholder="comment"
          class="border rounded px-2"
        />
        <input type="submit" value="コメント" class="rounded px-2" />
      </form>

    </div>
  );
}
