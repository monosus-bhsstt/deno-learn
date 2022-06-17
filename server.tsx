/** @jsx h */
import { serve } from "https://deno.land/std@0.139.0/http/server.ts";
import { h, ssr } from "https://crux.land/nanossr@0.0.4";

serve(() => ssr(() => <App />));

function App() {
  return (
    <div class="px-8 py-4">
      <h1 class="font-semibold text-2xl">Hello Deno</h1>
      <p class="mt-2 text-gray-500">Welcome to example page!</p>
    </div>
  );
}
