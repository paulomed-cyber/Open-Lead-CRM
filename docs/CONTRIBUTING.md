# Contributing to Open Lead CRM

First off, thank you for considering contributing to Open Lead CRM! It's people like you that make Open Lead CRM such a great tool.

## How Can I Contribute?

### Reporting Bugs
- Use the GitHub issue tracker.
- Check if the bug has already been reported.
- Be clear and concise, providing steps to reproduce.

### Suggesting Enhancements
- Open a GitHub issue.
- Describe the feature and why it would be useful.

### Pull Requests
1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code follows the existing style (ESLint + Prettier).
6. Issue the pull request!

## Development Process

### Coding Standards
- Use **TypeScript** for all logic.
- Use **Tailwind CSS** for styling.
- Follow **Conventional Commits** for commit messages.
- Use **Lucide Icons** for consistent iconography.

### Commit Messages
Format: `<type>(<scope>): <subject>`

Example types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Project Structure
- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable React components.
- `lib/`: Shared utilities and database client.
- `prisma/`: Database schema and seeds.

## License
By contributing, you agree that your contributions will be licensed under its MIT License.
