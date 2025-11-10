// Функция для загрузки Telegram Web Apps SDK
export function loadTelegramSDK(callback) {
    var script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.onload = function() {
        console.log('Telegram Web Apps SDK загружен успешно');
        if (callback) callback();
    };
    document.head.appendChild(script);
}

// Функция для получения информации о пользователе
export function getTelegramUserInfo() {

    if (window.Telegram && window.Telegram.WebApp) {
	
        const tg = window.Telegram.WebApp;
        const user = tg.initDataUnsafe.user;

        if (user) {
            // Вернуть информацию о пользователе
            return {
                id: user.id,
                username: user.username || '',
				userFirstName: user.first_name || '',
				userLastName: user.last_name || ''
            };
        } else {
            console.log('Не удалось получить информацию о пользователе.');
            return null;
        }
    } else {
        console.log('Telegram Web Apps SDK не загружен или приложение не запущено внутри Telegram.');
        return null;
    }
	
}