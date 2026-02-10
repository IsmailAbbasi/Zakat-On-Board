# Contributing to Zakat Onboard

Thank you for your interest in contributing to Zakat Onboard! 🎉

## Getting Started

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Zakat-On-Board.git
   cd Zakat-On-Board
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up your own Supabase project:**
   - Go to [supabase.com](https://supabase.com) and create a free account
   - Create a new project
   - Follow the setup instructions in `SUPABASE_SETUP.md`

5. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your Supabase credentials.

6. **Run the development server:**
   ```bash
   npm run dev
   ```

## Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test them locally

3. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a Pull Request from your fork to the main repository

## Guidelines

- Write clear, descriptive commit messages
- Test your changes thoroughly before submitting
- Follow the existing code style (JavaScript/JSX, 4-space indentation)
- Update documentation if needed

## Need Help?

Feel free to open an issue if you need help or have questions!
