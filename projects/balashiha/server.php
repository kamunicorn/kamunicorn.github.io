<?php

$client = array();
$post_keys = ['mail', 'name', 'phone'];
setlocale(LC_ALL, "ru_RU.UTF-8"); // для правильного разбора русских символов
$patterns = [];
$patterns['mail'] = "/[^-.@_a-z0-9]/i";
$patterns['name'] = "/[^a-zа-яё ]/ui";
$patterns['phone'] = "/[\D]/i";

foreach ($post_keys as $key) {
    if (isset($_POST['user-' . $key])) {
        $client[$key] = preg_replace($patterns[$key], '', $_POST['user-' . $key]);
    } else {
        $client[$key] = 'undefined'; // значение не задано
    }
}

$receiver = [];
$receiver['mail'] = 'vera.kamunicorn@gmail.com';
$receiver['name'] = 'Вера Перелыгина';

function get_letter_body($arr) {
    $message = '<h3>Данные клиента:</h3>';
    foreach ($arr as $key => $value) {
        $message .= "<p>$key = $value</p>";
    }
    return $message;
}

require_once 'PHPMailer/PHPMailerAutoload.php';
$letter = new PHPMailer(true);

// Настройка вывода сообщений об ошибках
$letter->setLanguage('ru', 'PHPMailer/language/phpmailer.lang-ru.php');
$letter->SMTPDebug = 0;

// Настройки SMTP
$letter->isSMTP();
$letter->SMTPAuth = true;
$letter->SMTPSecure = 'ssl';

// Настройки отправителя
$letter->Host = 'ssl://smtp.mail.ru';
$letter->Port = 465;
$letter->Username = 'логин@mail.ru'; // логин
$letter->Password = 'пароль'; // пароль
$letter->setFrom('логин@mail.ru', 'Имя');        

// Кому
$letter->addAddress($receiver['mail'], $receiver['name']);

// Настройки письма
$letter->isHTML(true);
$letter->CharSet = 'UTF-8';
$letter->Subject = 'Отправлено через PHPMailer'; // Тема
$letter_body = get_letter_body($client);
$letter->msgHTML($letter_body); // Тело письма
// Приложение
$letter->addAttachment('img/our-foto/foto-3.jpg', 'Фото с завода.jpg');

if ( $letter->send() ) {
    echo 'true'; // Письмо отправлено
} else {
    echo 'false'; // Письмо не отправлено
    // echo 'Ошибка: ' . $letter->ErrorInfo;
}

?>