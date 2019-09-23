manager = () => {
    let dados = `
    <div class="my-container-flex">
        <div class="card-item-flex">
            <div>Population: 100</div>
            <div>Generation: 10</div>
            <div>Number of hit: 11/1000</div>
            <div>Best number of hit: 36</div>
        </div>
    </div>
    `
    const manager = document.getElementById("manager");
    manager.innerHTML = dados;
}