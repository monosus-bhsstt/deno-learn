import { serve } from "https://deno.land/std@0.139.0/http/server.ts";
serve((req) => new Response("Hello, world!"));
