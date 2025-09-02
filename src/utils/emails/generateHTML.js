export const signupTemplate = (otp, email) => `
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Email Verification</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            position: relative;
        }
        
        .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #FF6B6B, #4ECDC4, #45B7D1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        
        .header::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-top: 10px solid #764ba2;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 400;
        }
        
        .content {
            padding: 40px 30px;
            text-align: center;
        }
        
        .welcome-text {
            font-size: 18px;
            color: #2D3748;
            margin-bottom: 16px;
            font-weight: 500;
        }
        
        .email-text {
            font-size: 16px;
            color: #4A5568;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        
        .email-highlight {
            color: #667eea;
            font-weight: 600;
        }
        
        .otp-section {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            border: 2px dashed #CBD5E0;
        }
        
        .otp-label {
            font-size: 14px;
            color: #718096;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 12px;
            font-weight: 500;
        }
        
        .otp-code {
            font-size: 32px;
            font-weight: 700;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: 4px;
            font-family: 'Courier New', monospace;
        }
        
        .instructions {
            font-size: 16px;
            color: #4A5568;
            line-height: 1.6;
            margin: 20px 0;
        }
        
        .warning {
            background: #FFF5F5;
            border: 1px solid #FEB2B2;
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
            font-size: 14px;
            color: #C53030;
        }
        
        .footer {
            background: #F7FAFC;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #E2E8F0;
        }
        
        .footer p {
            font-size: 14px;
            color: #718096;
            margin-bottom: 8px;
        }
        
        .social-links {
            margin-top: 20px;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #667eea;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 20px 10px;
            }
            
            .header, .content, .footer {
                padding: 20px;
            }
            
            .otp-code {
                font-size: 28px;
                letter-spacing: 2px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>✨ تحقق من بريدك الإلكتروني</h1>
            <p>نحن سعداء لانضمامك إلينا!</p>
        </div>
        
        <div class="content">
            <div class="welcome-text">مرحباً بك! 👋</div>
            <div class="email-text">
                تم إرسال رمز التحقق إلى: <span class="email-highlight">${email}</span>
            </div>
            
            <div class="otp-section">
                <div class="otp-label">رمز التحقق الخاص بك</div>
                <div class="otp-code">${otp}</div>
            </div>
            
            <div class="instructions">
                قم بإدخال هذا الرمز في صفحة التسجيل لإكمال عملية إنشاء حسابك الجديد.
            </div>
            
            <div class="warning">
                ⚠️ هذا الرمز صالح لمدة 10 دقائق فقط لأسباب أمنية.
            </div>
        </div>
        
        <div class="footer">
            <p>إذا لم تطلب هذا الرمز، يمكنك تجاهل هذا البريد الإلكتروني بأمان.</p>
            <p>&copy; 2025 شركتك. جميع الحقوق محفوظة.</p>
            <div class="social-links">
                <a href="#">الدعم الفني</a> | 
                <a href="#">سياسة الخصوصية</a> | 
                <a href="#">اتصل بنا</a>
            </div>
        </div>
    </div>
</body>
</html>
`;

export const forgetPasswordTemplate = (otp, email) => `
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Password Reset Verification</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            position: relative;
        }
        
        .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #FF6B6B, #FF8E53, #FF6B9D);
        }
        
        .header {
            background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        
        .header::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-top: 10px solid #feb47b;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 400;
        }
        
        .content {
            padding: 40px 30px;
            text-align: center;
        }
        
        .security-icon {
            font-size: 48px;
            margin-bottom: 20px;
        }
        
        .message-text {
            font-size: 18px;
            color: #2D3748;
            margin-bottom: 16px;
            font-weight: 500;
        }
        
        .email-text {
            font-size: 16px;
            color: #4A5568;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        
        .email-highlight {
            color: #ff7e5f;
            font-weight: 600;
        }
        
        .otp-section {
            background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            border: 2px dashed #FC8181;
        }
        
        .otp-label {
            font-size: 14px;
            color: #A0AEC0;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 12px;
            font-weight: 500;
        }
        
        .otp-code {
            font-size: 32px;
            font-weight: 700;
            background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: 4px;
            font-family: 'Courier New', monospace;
        }
        
        .instructions {
            font-size: 16px;
            color: #4A5568;
            line-height: 1.6;
            margin: 20px 0;
        }
        
        .security-note {
            background: #F0FFF4;
            border: 1px solid #9AE6B4;
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
            font-size: 14px;
            color: #2F855A;
        }
        
        .footer {
            background: #F7FAFC;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #E2E8F0;
        }
        
        .footer p {
            font-size: 14px;
            color: #718096;
            margin-bottom: 8px;
        }
        
        .social-links {
            margin-top: 20px;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #ff7e5f;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 20px 10px;
            }
            
            .header, .content, .footer {
                padding: 20px;
            }
            
            .otp-code {
                font-size: 28px;
                letter-spacing: 2px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>🔐 تحقق من هويتك</h1>
            <p>كلمة مرور جديدة في الطريق</p>
        </div>
        
        <div class="content">
            <div class="security-icon">🛡️</div>
            <div class="message-text">طلب إعادة تعيين كلمة المرور</div>
            <div class="email-text">
                تم إرسال رمز التحقق إلى: <span class="email-highlight">${email}</span>
            </div>
            
            <div class="otp-section">
                <div class="otp-label">رمز التحقق الأمني</div>
                <div class="otp-code">${otp}</div>
            </div>
            
            <div class="instructions">
                استخدم هذا الرمز لتأكيد هويتك ومتابعة عملية إعادة تعيين كلمة المرور.
            </div>
            
            <div class="security-note">
                🔒 لحمايتك، هذا الرمز صالح لمدة 15 دقيقة فقط.
            </div>
        </div>
        
        <div class="footer">
            <p>إذا لم تطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذا البريد وتغيير كلمة مرورك فوراً.</p>
            <p>&copy; 2025 شركتك. محمي بأعلى معايير الأمان.</p>
            <div class="social-links">
                <a href="#">الدعم الفني</a> | 
                <a href="#">الأمان</a> | 
                <a href="#">اتصل بنا</a>
            </div>
        </div>
    </div>
</body>
</html>
`;

export const resetPasswordTemplate = (link) => `
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Reset Your Password</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            position: relative;
        }
        
        .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #4ECDC4, #44A08D, #667eea);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 50px 30px;
            text-align: center;
            position: relative;
        }
        
        .header::after {
            content: '';
            position: absolute;
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-top: 15px solid #764ba2;
        }
        
        .lock-icon {
            font-size: 56px;
            margin-bottom: 16px;
            display: block;
        }
        
        .header h1 {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 12px;
        }
        
        .header p {
            font-size: 18px;
            opacity: 0.9;
            font-weight: 400;
        }
        
        .content {
            padding: 50px 30px;
            text-align: center;
        }
        
        .message-text {
            font-size: 20px;
            color: #2D3748;
            margin-bottom: 24px;
            font-weight: 600;
        }
        
        .description {
            font-size: 16px;
            color: #4A5568;
            line-height: 1.7;
            margin-bottom: 40px;
            max-width: 480px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .button-container {
            margin: 40px 0;
        }
        
        .reset-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 18px 40px;
            text-decoration: none;
            border-radius: 50px;
            font-size: 18px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .reset-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
        }
        
        .link-text {
            background: #F7FAFC;
            border: 1px solid #E2E8F0;
            border-radius: 8px;
            padding: 16px;
            margin: 30px 0;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            color: #718096;
            word-break: break-all;
            text-align: left;
        }
        
        .security-tips {
            background: #EDF2F7;
            border-radius: 12px;
            padding: 24px;
            margin: 30px 0;
            text-align: left;
        }
        
        .security-tips h3 {
            color: #2D3748;
            font-size: 16px;
            margin-bottom: 12px;
            font-weight: 600;
        }
        
        .security-tips ul {
            color: #4A5568;
            font-size: 14px;
            line-height: 1.6;
            padding-left: 20px;
        }
        
        .security-tips li {
            margin-bottom: 8px;
        }
        
        .footer {
            background: #F7FAFC;
            padding: 40px 30px;
            text-align: center;
            border-top: 1px solid #E2E8F0;
        }
        
        .footer p {
            font-size: 14px;
            color: #718096;
            margin-bottom: 8px;
        }
        
        .footer-links {
            margin-top: 24px;
        }
        
        .footer-links a {
            display: inline-block;
            margin: 0 15px;
            color: #667eea;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
            color: #5a6fd8;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 20px 10px;
            }
            
            .header, .content, .footer {
                padding: 25px 20px;
            }
            
            .reset-button {
                padding: 16px 32px;
                font-size: 16px;
            }
            
            .header h1 {
                font-size: 28px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <span class="lock-icon">🔓</span>
            <h1>إعادة تعيين كلمة المرور</h1>
            <p>دعنا نساعدك في استعادة الوصول لحسابك</p>
        </div>
        
        <div class="content">
            <div class="message-text">🔑 كلمة مرور جديدة في انتظارك</div>
            <div class="description">
                انقر على الزر أدناه لإنشاء كلمة مرور جديدة وآمنة لحسابك. ستتم إعادة توجيهك إلى صفحة آمنة لإكمال العملية.
            </div>
            
            <div class="button-container">
                <a href="${link}" class="reset-button">🚀 إعادة تعيين كلمة المرور</a>
            </div>
            
            <div class="link-text">
                أو انسخ هذا الرابط في متصفحك: ${link}
            </div>
            
            <div class="security-tips">
                <h3>💡 نصائح أمنية مهمة:</h3>
                <ul>
                    <li>استخدم كلمة مرور قوية تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز</li>
                    <li>لا تشارك كلمة المرور مع أي شخص آخر</li>
                    <li>قم بتفعيل المصادقة الثنائية لحماية إضافية</li>
                    <li>هذا الرابط صالح لمدة 24 ساعة فقط</li>
                </ul>
            </div>
        </div>
        
        <div class="footer">
            <p>إذا لم تطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذا البريد والتواصل مع فريق الدعم الفني.</p>
            <p>&copy; 2025 شركتك. نحن نحمي خصوصيتك وأمانك.</p>
            <div class="footer-links">
                <a href="#">🆘 الدعم الفني</a> | 
                <a href="#">🔒 الأمان والخصوصية</a> | 
                <a href="#">📞 اتصل بنا</a>
            </div>
        </div>
    </div>
</body>
</html>
`;

export const welcomeTemplate = (userName) => `
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome to Our Platform</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 650px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
            position: relative;
        }
        
        .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7);
            animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 60px 30px;
            text-align: center;
            position: relative;
        }
        
        .welcome-icon {
            font-size: 64px;
            margin-bottom: 20px;
            display: block;
            animation: bounce 2s ease-in-out infinite;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        
        .header h1 {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 12px;
        }
        
        .header p {
            font-size: 18px;
            opacity: 0.9;
            font-weight: 400;
        }
        
        .content {
            padding: 50px 30px;
            text-align: center;
        }
        
        .welcome-message {
            font-size: 24px;
            color: #2D3748;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .user-name {
            color: #667eea;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .description {
            font-size: 18px;
            color: #4A5568;
            line-height: 1.7;
            margin-bottom: 40px;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin: 40px 0;
        }
        
        .feature-card {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 12px;
            padding: 30px 20px;
            text-align: center;
            transition: transform 0.3s ease;
            border: 1px solid #E2E8F0;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .feature-icon {
            font-size: 32px;
            margin-bottom: 12px;
            display: block;
        }
        
        .feature-title {
            font-size: 16px;
            font-weight: 600;
            color: #2D3748;
            margin-bottom: 8px;
        }
        
        .feature-desc {
            font-size: 14px;
            color: #718096;
            line-height: 1.5;
        }
        
        .cta-section {
            background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
            border-radius: 16px;
            padding: 40px 30px;
            margin: 40px 0;
            border: 2px solid #E2E8F0;
        }
        
        .cta-title {
            font-size: 20px;
            color: #2D3748;
            font-weight: 600;
            margin-bottom: 16px;
        }
        
        .cta-description {
            font-size: 16px;
            color: #4A5568;
            margin-bottom: 24px;
            line-height: 1.6;
        }
        
        .get-started-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .get-started-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
        }
        
        .footer {
            background: linear-gradient(135deg, #2D3748 0%, #4A5568 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        
        .footer-content {
            max-width: 400px;
            margin: 0 auto;
        }
        
        .footer h3 {
            font-size: 18px;
            margin-bottom: 16px;
            font-weight: 600;
        }
        
        .footer p {
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 12px;
            line-height: 1.6;
        }
        
        .footer-links {
            margin-top: 24px;
            padding-top: 24px;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .footer-links a {
            display: inline-block;
            margin: 0 15px;
            color: #E2E8F0;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
            color: #ffffff;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 20px 10px;
            }
            
            .header, .content, .footer {
                padding: 30px 20px;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
                gap: 15px;
            }
            
            .header h1 {
                font-size: 28px;
            }
            
            .welcome-message {
                font-size: 20px;
            }
            
            .reset-button, .get-started-button {
                padding: 14px 28px;
                font-size: 16px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <span class="welcome-icon">🎉</span>
            <h1>أهلاً وسهلاً!</h1>
            <p>مرحباً بك في رحلتك الجديدة معنا</p>
        </div>
        
        <div class="content">
            <div class="welcome-message">
                مرحباً <span class="user-name">${userName}</span>! 🌟
            </div>
            
            <div class="description">
                نحن متحمسون لانضمامك إلى مجتمعنا! تم إنشاء حسابك بنجاح ويمكنك الآن الاستفادة من جميع الميزات المتاحة على منصتنا.
            </div>
            
            <div class="features-grid">
                <div class="feature-card">
                    <span class="feature-icon">⚡</span>
                    <div class="feature-title">سرعة فائقة</div>
                    <div class="feature-desc">تجربة سريعة ومتجاوبة</div>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">🔒</span>
                    <div class="feature-title">أمان تام</div>
                    <div class="feature-desc">حماية متقدمة لبياناتك</div>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">🎯</span>
                    <div class="feature-title">سهولة الاستخدام</div>
                    <div class="feature-desc">واجهة بديهية ومريحة</div>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">🌟</span>
                    <div class="feature-title">ميزات حصرية</div>
                    <div class="feature-desc">أدوات متطورة ومبتكرة</div>
                </div>
            </div>
            
            <div class="cta-section">
                <div class="cta-title">🚀 هل أنت مستعد للبدء؟</div>
                <div class="cta-description">
                    ابدأ استكشاف المنصة واكتشف كل الإمكانيات الرائعة التي تنتظرك!
                </div>
                <a href="#" class="get-started-button">ابدأ الآن</a>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-content">
                <h3>نحن هنا لمساعدتك! 💪</h3>
                <p>إذا كان لديك أي أسئلة أو تحتاج إلى مساعدة، فريق الدعم الفني متاح لك على مدار الساعة.</p>
                <p>&copy; 2025 شركتك. رحلة نجاحك تبدأ هنا.</p>
            </div>
            <div class="footer-links">
                <a href="#">🏠 الصفحة الرئيسية</a> | 
                <a href="#">📚 دليل المستخدم</a> | 
                <a href="#">💬 الدعم الفني</a> | 
                <a href="#">📧 اتصل بنا</a>
            </div>
        </div>
    </div>
</body>
</html>
`;