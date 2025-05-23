const http = require('http');

const server = http.createServer((req, res) => {
    // Устанавливаем заголовки CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Парсим URL для получения параметров
    const url = new URL(req.url, `http://${req.headers.host}`);
    const moodleLogin = url.searchParams.get('login');
    
    // Проверяем, совпадает ли логин с вашим
    if (moodleLogin === "is-32fiot-23-113") {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            status: "success",
            login: moodleLogin,
            personal_data: {
                surname: "Рудих",
                name: "Кароліна",
                course: "2",
                group: "ІС-32"
            }
        }));
    } else {
        res.writeHead(403, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            status: "error",
            message: "Невірний логін Moodle"
        }));
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});