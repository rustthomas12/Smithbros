const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const {
            fullName,
            email,
            phone,
            zipCode,
            projectType,
            projectSize,
            squareFootage,
            timeline,
            budget,
            description,
            permits,
            design,
            financing,
            estimate
        } = req.body;

        if (!fullName || !email || !phone || !projectType || !description) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const additionalServices = [];
        if (permits) additionalServices.push('Permits & Planning Assistance');
        if (design) additionalServices.push('Design Assistance');
        if (financing) additionalServices.push('Financing Options');

        const emailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #8B4513; color: white; padding: 20px; text-align: center; }
                    .content { background: #f9f9f9; padding: 20px; }
                    .section { margin-bottom: 20px; }
                    .label { font-weight: bold; color: #8B4513; }
                    .estimate { background: #8B4513; color: white; padding: 15px; text-align: center; font-size: 24px; margin: 20px 0; border-radius: 5px; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>New Quote Request</h1>
                        <p>Smith Brothers Construction</p>
                    </div>
                    <div class="content">
                        <div class="section">
                            <p class="label">Client Information:</p>
                            <p><strong>Name:</strong> ${fullName}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Phone:</strong> ${phone}</p>
                            <p><strong>Zip Code:</strong> ${zipCode}</p>
                        </div>
                        
                        <div class="section">
                            <p class="label">Project Details:</p>
                            <p><strong>Project Type:</strong> ${projectType}</p>
                            <p><strong>Project Size:</strong> ${projectSize}</p>
                            <p><strong>Square Footage:</strong> ${squareFootage}</p>
                            <p><strong>Timeline:</strong> ${timeline}</p>
                            <p><strong>Budget Range:</strong> ${budget}</p>
                        </div>
                        
                        <div class="estimate">
                            Rough Estimate: ${estimate}
                        </div>
                        
                        <div class="section">
                            <p class="label">Project Description:</p>
                            <p>${description}</p>
                        </div>
                        
                        ${additionalServices.length > 0 ? `
                        <div class="section">
                            <p class="label">Additional Services Requested:</p>
                            <ul>
                                ${additionalServices.map(service => `<li>${service}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                    </div>
                    <div class="footer">
                        <p>This quote request was submitted through smithbrothersconstruction.com</p>
                        <p>Please respond within 24 hours</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const emailText = `
New Quote Request - Smith Brothers Construction

Client Information:
Name: ${fullName}
Email: ${email}
Phone: ${phone}
Zip Code: ${zipCode}

Project Details:
Project Type: ${projectType}
Project Size: ${projectSize}
Square Footage: ${squareFootage}
Timeline: ${timeline}
Budget Range: ${budget}

Rough Estimate: ${estimate}

Project Description:
${description}

${additionalServices.length > 0 ? `Additional Services Requested:\n${additionalServices.join('\n')}` : ''}

---
This quote request was submitted through smithbrothersconstruction.com
        `;

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@smithbrothersconstruction.com';

        const emailData = await resend.emails.send({
            from: 'Smith Brothers Construction <onboarding@resend.dev>',
            to: [adminEmail],
            replyTo: email,
            subject: `New Quote Request from ${fullName} - ${projectType}`,
            html: emailHtml,
            text: emailText
        });

        console.log('Email sent successfully:', emailData);

        const confirmationEmail = await resend.emails.send({
            from: 'Smith Brothers Construction <onboarding@resend.dev>',
            to: [email],
            subject: 'Quote Request Received - Smith Brothers Construction',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #8B4513; color: white; padding: 20px; text-align: center; }
                        .content { background: #f9f9f9; padding: 20px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Thank You, ${fullName}!</h1>
                        </div>
                        <div class="content">
                            <p>We have received your quote request for your ${projectType} project.</p>
                            <p>One of our team members will review your request and contact you within 24 hours to discuss your project in detail.</p>
                            <p><strong>Your Rough Estimate:</strong> ${estimate}</p>
                            <p>Please note that this is a preliminary estimate. We'll provide a detailed quote after our consultation.</p>
                            <p>If you have any immediate questions, please don't hesitate to call us at (555) 123-4567.</p>
                            <p>Best regards,<br>
                            Charles, William, and Michael Smith<br>
                            Smith Brothers Construction</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `Thank you, ${fullName}!\n\nWe have received your quote request for your ${projectType} project.\n\nOne of our team members will review your request and contact you within 24 hours.\n\nYour Rough Estimate: ${estimate}\n\nBest regards,\nSmith Brothers Construction`
        });

        console.log('Confirmation email sent:', confirmationEmail);

        res.status(200).json({ 
            success: true, 
            message: 'Quote request submitted successfully',
            emailId: emailData.id
        });

    } catch (error) {
        console.error('Error processing quote:', error);
        res.status(500).json({ 
            error: 'Failed to process quote request',
            details: error.message 
        });
    }
};
