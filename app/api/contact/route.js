import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.WEB3FORMS_KEY;
    
    if (!apiKey) {
      console.error('Web3Forms API key is missing!');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    console.log('Sending email via Web3Forms...');
    console.log('From:', name, '(' + email + ')');
    console.log('Subject:', subject);

    // Using Web3Forms API
    const web3formsResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: apiKey,
        subject: `[Zakat Onboard] ${subject}`,
        from_name: name,
        email: email,
        message: message,
        to_email: 'ismaiabbasi2003@gmail.com'
      })
    });

    const responseData = await web3formsResponse.json();
    
    console.log('Web3Forms Response:', responseData);

    if (web3formsResponse.ok && responseData.success) {
      console.log('✅ Email sent successfully!');
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully!'
      });
    } else {
      console.error('❌ Web3Forms error:', responseData);
      return NextResponse.json(
        { error: responseData.message || 'Failed to send email' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
