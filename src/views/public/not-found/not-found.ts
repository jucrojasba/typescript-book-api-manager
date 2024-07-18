import './not-found.css'

export function notFoundView(){
    const $root = document.getElementById('root') as HTMLElement;
    $root.innerHTML = `
    <div class="root-container">
    <div class="not-found-container">
        <h1>404 Not Found</h1>
        <p>La página que busca no fue encontrada.</p>
    </div>
    </div>;
    `;
}