# Contact Form Email Setup Guide

## Quick Setup (5 minutes)

Your contact form is ready! Users can now visit `/contact` and send you messages. To enable actual emails to **ismaiabbasi2003@gmail.com**, follow these simple steps:

### Option 1: Web3Forms (Recommended - FREE & Easy)

1. **Get Free API Key:**
   - Visit: https://web3forms.com/
   - Click "Get Started Free"
   - Enter your email: `ismaiabbasi2003@gmail.com`
   - Verify your email
   - Copy your Access Key

2. **Add API Key to Your Project:**
   - Open `.env.local` file
   - Add this line:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
   ```

3. **Update the API File:**
   Open `app/api/contact/route.js` and replace line 26:
   ```javascript
   // Change this:
   access_key: 'YOUR_WEB3FORMS_KEY',
   
   // To this:
   access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
   ```

4. **Restart Server:**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

**That's it!** Now when users submit the contact form, you'll receive emails at `ismaiabbasi2003@gmail.com` 📧

---

### How It Works

1. User clicks "Contact Us" button on homepage
2. Opens `/contact` page with dark-themed form
3. User enters:
   - Their name
   - Their email (so you can reply)
   - Subject (General Inquiry, Sponsorship, etc.)
   - Message
4. Clicks "SEND MESSAGE"
5. **You receive email** at `ismaiabbasi2003@gmail.com` with:
   - User's name and email
   - Their message
   - Reply-to automatically set to their email

---

### Option 2: Simple Alternative (No Signup Required)

If you don't want to use Web3Forms, you can use **Formspree**:

1. Replace the API code with:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, subject, message })
});
```

Get form ID from: https://formspree.io/

---

### Testing

1. Visit http://localhost:3000
2. Click "Contact Us" button
3. Fill out the form
4. Submit
5. Check `ismaiabbasi2003@gmail.com` for the email!

---

## Features ✨

- Dark themed modern design
- Mobile responsive
- Email validation
- Loading states
- Success/error messages
- Dropdown for subject categories
- Clean, professional layout

**No middleman - users send you messages directly!**
