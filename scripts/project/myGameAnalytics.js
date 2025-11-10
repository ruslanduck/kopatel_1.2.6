// Функция для загрузки Telegram Web Apps SDK
export async function loadGAScript(callback) {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/gameanalytics@4.4.7/dist/GameAnalytics.min.js';
    script.onload = function() {
        console.log('GameAnalytics загружен успешно');
        if (callback) callback();
    };
    document.head.appendChild(script);
}