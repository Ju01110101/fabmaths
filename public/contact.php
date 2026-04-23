<?php
header('Content-Type: application/json');

// Get raw POST body
$input = json_decode(file_get_contents('php://input'), true);

// $role = trim($input['role'] ?? '');
$name = trim($input['name'] ?? '');
$contact = trim($input['contact'] ?? '');
$message = trim($input['message'] ?? '');

if (!$name || !$contact) {
  http_response_code(400);
  echo json_encode(['error' => 'Missing required fields']);
  exit;
}

// Detect contact type
if (filter_var($contact, FILTER_VALIDATE_EMAIL)) {
  $contactType = 'Email';
// } elseif (preg_match('/^\+?\d{7,15}$/', $contact)) {
} elseif (preg_match('/^\+?[\d\s\-\(\)]{7,20}$/', $contact)) {
  $contactType = 'Phone';
} else {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid contact field']);
  exit;
}

// Email setup
$to = 'contact@fabricepallaud.com, fabpallaud@gmail.com, fabrice@fab-maths.com';
$subject = "New Contact Form Submission from $name";
// $body = "Role: $role\nName: $name\n$contactType: $contact\nMessage: $message";
$body = "Name: $name\n$contactType: $contact\nMessage: $message";
$headers = "From: no-reply@fab-maths.com\r\nReply-To: $contact";

if (mail($to, $subject, $body, $headers)) {
  echo json_encode(['success' => true]);
} else {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to send email']);
}
?>
