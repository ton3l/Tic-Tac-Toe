//Fluxo começa no EventListener das células. (linha 67)
window.player = 0;
const win = new CustomEvent('win', {
    detail: {
        'cells': Array.from(document.querySelectorAll('.cell'))
    } 
});


function cellsChecker(cells) {
    let diagonal1 = cells[0].innerHTML;
    let diagonal2 = cells[4].innerHTML;
    let diagonal3 = cells[8].innerHTML;

    if(diagonal1 && diagonal1 == diagonal2 && diagonal1 == diagonal3) {
        document.dispatchEvent(win);
        return;
    }
    
    diagonal1 = cells[6].innerHTML;
    diagonal3 = cells[2].innerHTML;
    
    if(diagonal1 && diagonal1 == diagonal2 && diagonal1 == diagonal3) {
        document.dispatchEvent(win);
        return;
    }

    for(let i = 0; i < cells.length; i+=3) {        
        const square1 = cells[i].innerHTML
        const square2 = cells[i + 1].innerHTML
        const square3 = cells[i + 2].innerHTML
        
        if(!square1) continue;
        
        if(square1 == square2 && square1 == square3) {
            document.dispatchEvent(win);
            return;
        }
    }
}

document.addEventListener('win', event => {
    event.detail.cells.forEach(cell => {
        var old_element = cell;
        var new_element = old_element.cloneNode(true);
        try { old_element.parentNode.replaceChild(new_element, old_element) } catch (e) {}; //Da erro, mas funciona
    });

    if(window.player % 2 !== 0) {
        document.querySelector('#vencedor').innerHTML = 'X';
        return;
    }

    document.querySelector('#vencedor').innerHTML = 'O';
})

function winTester() {
    let cells = Array.from(document.querySelectorAll('.cell'));

    cellsChecker(cells);
    
    cells.sort( (a, b) => { return Number(a.id) - Number(b.id); } );//Ordena as células pelo id, que está seguindo a ordem das colunas
    
    cellsChecker(cells);
}

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        if(cell.innerHTML) return;
        
        if (window.player % 2 === 0) {
            cell.innerHTML = 'X';
            window.player = 1;
            window.winTester();
            return;
        }

        cell.innerHTML = 'O';
        window.player = 0;
        window.winTester();
        return;
    })
});

document.querySelector('button').addEventListener('click', () => {
    window.location.reload();
});
