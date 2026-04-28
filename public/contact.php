<?php

/**
 * Contact Form Handler
 */
session_start();

// ─── Anti-bot: Referer check ────────────────────────────────────────────────
// Only accept submissions that come from our own domain.
// $allowedHosts = ['fab-maths.com', 'www.fab-maths.com'];
// $referer      = $_SERVER['HTTP_REFERER'] ?? '';
// $refererHost  = parse_url($referer, PHP_URL_HOST);

// if (!in_array($refererHost, $allowedHosts, true)) {
//   http_response_code(403);
//   exit('Forbidden');
// }

// ─── Anti-bot: Honeypot field (should always be empty) ──────────────────────
$honeypot = $_POST['full_name_confirm'] ?? '';

if (!empty($honeypot)) {
  header('Location: /thank-you');
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $token = bin2hex(random_bytes(32));
  $_SESSION['csrf'] = $token;

  header('Content-Type: text/plain');
  echo $token;
  exit;
}

// Restrict access to POST requests only
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  exit('Method Not Allowed');
}

$csrfSession = $_SESSION['csrf'] ?? '';
$csrfPost    = $_POST['csrf'] ?? '';

if (!$csrfSession || !$csrfPost || !hash_equals($csrfSession, $csrfPost)) {
  header('Location: /thank-you');
  exit;
}

unset($_SESSION['csrf']);


// ─── Collect & sanitize input ────────────────────────────────────────────────
// strip_tags removes any HTML/JS injection attempts; substr caps field length.

$name    = substr(strip_tags(trim($_POST['name']    ?? '')), 0, 100);
$email   = substr(strip_tags(trim($_POST['email']   ?? '')), 0, 254);
$message = substr(strip_tags(trim($_POST['message'] ?? '')), 0, 1000);

// Optional fields — uncomment in PHP when the Vue form sends them
// $role    = substr(strip_tags(trim($_POST['role']    ?? '')), 0, 50);
// $phone   = substr(strip_tags(trim($_POST['phone']   ?? '')), 0, 30);
// $contact = substr(strip_tags(trim($_POST['contact'] ?? '')), 0, 30);

// ─── Helper: redirect back with error ────────────────────────────────────────
/**
 * Redirects back to the form with error details and previous input.
 * @param string $errorType  Short error key used by the Vue page.
 */
$redirectWithError = function (string $errorType) use ($name, $email, $message): void {
  $params = http_build_query([
    'error' => $errorType,
    'name'  => $name,
    'email' => $email,
    'message' => $message,
    // 'role'  => $role,
    // 'phone' => $phone,
    // 'contact' => $contact,
  ]);
  header("Location: /landing-v01?{$params}#contact-form");
  exit;
};

// ─── Validate required fields ────────────────────────────────────────────────
// Message (and the optional fields below) are not required.
if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $redirectWithError('invalid_input');
}

// ─── Build & send email ──────────────────────────────────────────────────────
$to      = 'contact@fabricepallaud.com, fabpallaud@gmail.com, fabrice@fab-maths.com';
$subject = "New Contact Form Submission from {$name}";

$messageText = !empty($message) ? $message : '[No message provided]';

// Uncomment lines below as the optional fields are enabled in the form
$body  = "Name: {$name}\n";
// $body .= "Role: {$role}\n";
$body .= "Email: {$email}\n";
// $body .= "Phone: {$phone}\n";
// $body .= "WhatsApp / Contact: {$contact}\n";
$body .= "\nMessage:\n{$messageText}";

$headers =
  "From: no-reply@fab-maths.com\r\n" .
  "Reply-To: {$email}\r\n" .
  "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $body, $headers)) {
  header('Location: /thank-you');
} else {
  $redirectWithError('server_error');
}
exit;
