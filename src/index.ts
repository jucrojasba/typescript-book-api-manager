import { router } from "./router";

const $root = document.getElementById('root') as HTMLElement;

if (!$root) {
    throw new Error("Ocurrio un error");
}

router();