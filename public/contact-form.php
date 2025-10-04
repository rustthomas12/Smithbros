<?php
session_start();

// Configuration
$to_email = "name@amatteroftax.org";
$from_email = "noreply@amatteroftax.org";
$subject_prefix = "A Matter of Tax - Contact Form";

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to validate email
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Function to generate CAPTCHA
function generate_captcha() {
    $num1 = rand(1, 10);
    $num2 = rand(1, 10);
    $_SESSION['captcha_answer'] = $num1 + $num2;
    return "$num1 + $num2 = ?";
}

// Function to verify CAPTCHA
function verify_captcha($user_answer) {
    return isset($_SESSION['captcha_answer']) &&
           intval($user_answer) === $_SESSION['captcha_answer'];
}

// Initialize response
$response = array('success' => false, 'message' => '');

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = sanitize_input($_POST['name'] ?? '');
    $email = sanitize_input($_POST['email'] ?? '');
    $phone = sanitize_input($_POST['phone'] ?? '');
    $message = sanitize_input($_POST['message'] ?? '');
    $captcha_answer = sanitize_input($_POST['captcha'] ?? '');

    // Validation
    $errors = array();

    if (empty($name)) {
        $errors[] = "Name is required";
    }

    if (empty($email)) {
        $errors[] = "Email is required";
    } elseif (!validate_email($email)) {
        $errors[] = "Invalid email format";
    }

    if (empty($message)) {
        $errors[] = "Message is required";
    }

    // CAPTCHA verification
    if (!verify_captcha($captcha_answer)) {
        $errors[] = "Incorrect answer to the math question";
    }

    // Honeypot field check (hidden field that should be empty)
    if (!empty($_POST['website'])) {
        $errors[] = "Spam detected";
    }

    // Rate limiting check (simple session-based)
    if (isset($_SESSION['last_submission']) &&
        time() - $_SESSION['last_submission'] < 60) {
        $errors[] = "Please wait at least 60 seconds between submissions";
    }

    if (empty($errors)) {
        // Prepare email
        $email_subject = $subject_prefix . " - " . $name;
        $email_body = "New contact form submission:\n\n";
        $email_body .= "Name: $name\n";
        $email_body .= "Email: $email\n";
        $email_body .= "Phone: $phone\n";
        $email_body .= "Message:\n$message\n\n";
        $email_body .= "Submitted on: " . date('Y-m-d H:i:s') . "\n";
        $email_body .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";

        $headers = "From: $from_email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();

        // Send email
        if (mail($to_email, $email_subject, $email_body, $headers)) {
            $response['success'] = true;
            $response['message'] = "Thank you for your message! We'll get back to you soon.";
            $_SESSION['last_submission'] = time();
            unset($_SESSION['captcha_answer']);
        } else {
            $response['message'] = "Sorry, there was an error sending your message. Please try again.";
        }
    } else {
        $response['message'] = implode(", ", $errors);
    }

    // Return JSON response for AJAX requests
    if (!empty($_POST['ajax'])) {
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }
}

// Generate new CAPTCHA for display
$captcha_question = generate_captcha();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - A Matter of Tax</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: #f8fafc;
            margin: 0;
            padding: 20px;
        }

        .form-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .form-title {
            text-align: center;
            color: #2563eb;
            font-size: 2rem;
            margin-bottom: 30px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
            color: #374151;
        }

        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e5e7eb;
            border-radius: 5px;
            font-size: 16px;
            transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #2563eb;
        }

        .captcha-group {
            background: #f3f4f6;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        .captcha-question {
            font-weight: 600;
            margin-bottom: 10px;
            color: #374151;
        }

        .honeypot {
            display: none;
        }

        .submit-btn {
            background: #2563eb;
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            transition: background-color 0.3s;
        }

        .submit-btn:hover {
            background: #1d4ed8;
        }

        .message {
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            font-weight: 500;
        }

        .message.success {
            background: #dcfce7;
            color: #166534;
            border: 1px solid #bbf7d0;
        }

        .message.error {
            background: #fef2f2;
            color: #dc2626;
            border: 1px solid #fecaca;
        }

        .back-link {
            text-align: center;
            margin-top: 30px;
        }

        .back-link a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
        }

        .back-link a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h1 class="form-title">Contact A Matter of Tax</h1>

        <?php if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST['ajax']) === false): ?>
            <div class="message <?php echo $response['success'] ? 'success' : 'error'; ?>">
                <?php echo htmlspecialchars($response['message']); ?>
            </div>
        <?php endif; ?>

        <?php if (!$response['success'] || $_SERVER["REQUEST_METHOD"] !== "POST"): ?>
        <form method="POST" action="contact-form.php" id="contactForm">
            <div class="form-group">
                <label for="name">Full Name *</label>
                <input type="text" id="name" name="name" required
                       value="<?php echo isset($_POST['name']) ? htmlspecialchars($_POST['name']) : ''; ?>">
            </div>

            <div class="form-group">
                <label for="email">Email Address *</label>
                <input type="email" id="email" name="email" required
                       value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>">
            </div>

            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone"
                       value="<?php echo isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : ''; ?>">
            </div>

            <div class="form-group">
                <label for="message">Message *</label>
                <textarea id="message" name="message" rows="5" required
                          placeholder="Please describe how we can help you with your tax needs..."><?php echo isset($_POST['message']) ? htmlspecialchars($_POST['message']) : ''; ?></textarea>
            </div>

            <!-- Honeypot field for spam protection -->
            <div class="honeypot">
                <label for="website">Website</label>
                <input type="text" id="website" name="website" tabindex="-1">
            </div>

            <!-- CAPTCHA -->
            <div class="captcha-group">
                <div class="captcha-question">
                    Security Question: <?php echo $captcha_question; ?>
                </div>
                <input type="number" name="captcha" required placeholder="Enter the answer">
            </div>

            <input type="hidden" name="ajax" value="0">
            <button type="submit" class="submit-btn">Send Message</button>
        </form>
        <?php endif; ?>

        <div class="back-link">
            <a href="website.html">← Back to Website</a>
        </div>
    </div>

    <script>
        // Optional: AJAX form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            formData.set('ajax', '1');

            fetch('contact-form.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message ' + (data.success ? 'success' : 'error');
                messageDiv.textContent = data.message;

                const existingMessage = document.querySelector('.message');
                if (existingMessage) {
                    existingMessage.remove();
                }

                this.parentNode.insertBefore(messageDiv, this);

                if (data.success) {
                    this.reset();
                    // Reload page to get new CAPTCHA
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        });
    </script>
</body>
</html>